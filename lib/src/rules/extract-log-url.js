"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.meta = void 0;
const fs = require("fs");
const path = require("path");
function pascalCase(input) {
    if (input.includes('-')) {
        input = input.split('-');
        return input[0].charAt(0).toUpperCase() + input[0].slice(1) + input[1].charAt(0).toUpperCase() + input[1].slice(1);
    }
    else {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }
}
function getEnumKey(input) {
    let suffix = '.component.ts';
    if (input.endsWith('.effect.ts')) {
        suffix = '.effect.ts';
    }
    else if (input.endsWith('.service.ts')) {
        suffix = '.service.ts';
    }
    const basename = path.basename(input, suffix);
    const keyEnum = pascalCase(basename) + 'Log';
    return keyEnum;
}
_a = {
    meta: {
        docs: {
            description: 'Angular 组件中 clog 参数不能为字符串，请用枚举',
            category: 'suggestion',
        },
        fixable: 'code',
    },
    create: function create(context) {
        const strings = []; // 收集 clog 的 url
        let timer; // 计时器，用于衡量创建文件的时机
        let key; // 待生成的文件中的枚举key
        let keyEnum; // 待生成的文件中的枚举名
        let fileContent = 'export enum __PLACEHOLDER__ {'; // 待生成的文件内容
        let targetFileName;
        const map = new Map();
        return {
            CallExpression: node => {
                if (node.callee.property && node.callee.property.name === 'clog' && node.arguments[0].type === 'Literal') {
                    // 制作文件内容
                    const string = node.arguments[0].value;
                    if (!strings.includes(string)) {
                        strings.push(string);
                        const splitString = string.split('/');
                        key = pascalCase(splitString[splitString.length - 1]);
                        if (map.has(key)) {
                            const count = map.get(key);
                            map.set(key, count + 1);
                            key = key + count;
                        }
                        else {
                            map.set(key, 2);
                        }
                        fileContent += `${key}='${string}',`;
                    }
                    // AST 结束遍历时生成文件
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        // 获取待生成的文件路径
                        targetFileName = context.getFilename();
                        if (targetFileName.endsWith('component.ts')) {
                            targetFileName = targetFileName.replace('.component.ts', '-log.ts');
                        }
                        else {
                            return;
                        }
                        if (!fs.existsSync(targetFileName)) {
                            fs.writeFile(targetFileName, (fileContent + '}').replace('__PLACEHOLDER__', keyEnum), 'utf8', function (error) {
                                if (error) {
                                    return false;
                                }
                                // eslint-disable-next-line no-console
                                console.log(targetFileName + ' 写入成功');
                            });
                        }
                    }, 1);
                    keyEnum = getEnumKey(context.getFilename());
                    // auto import
                    const root = context.getAncestors().find(item => item.type === 'Program');
                    let hasAlreadyImported = false;
                    if (root.body.some(item => item.type === 'ImportDeclaration' && item.specifiers[0].local.name === keyEnum)) {
                        hasAlreadyImported = true;
                    }
                    context.report({
                        node,
                        message: 'Angular 组件中 clog 参数不能为字符串，请用枚举',
                        fix: function (fixer) {
                            const fixes = [];
                            fixes.push(fixer.replaceText(node.arguments[0], `${keyEnum}.${key}`));
                            const targetImport = `\nimport {${keyEnum}} from './${path.basename(context.getFilename(), '.component.ts')}-log';`;
                            !hasAlreadyImported && fixes.push(fixer.insertTextAfter(root.body[0], targetImport));
                            return fixes;
                        },
                    });
                }
            },
        };
    },
}, exports.meta = _a.meta, exports.create = _a.create;
//# sourceMappingURL=extract-log-url.js.map