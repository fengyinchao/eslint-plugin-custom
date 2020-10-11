"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.meta = void 0;
_a = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Rx.js 中禁止使用 first 操作符',
        },
        fixable: 'code',
    },
    create: function create(context) {
        return {
            CallExpression: node => {
                if (node.callee.name === 'first') {
                    context.report({
                        node,
                        message: '禁止使用 first 操作符',
                        fix: function (fixer) {
                            const fixes = [];
                            if (node.arguments.length === 0) {
                                fixes.push(fixer.replaceText(node, 'take(1)'));
                            }
                            else {
                                fixes.push(fixer.insertTextAfter(node, ',take(1)'));
                                fixes.push(fixer.replaceTextRange([node.callee.range[0], node.callee.range[1]], 'filter'));
                            }
                            return fixes;
                        },
                    });
                }
            },
        };
    },
}, exports.meta = _a.meta, exports.create = _a.create;
//# sourceMappingURL=no-first.js.map