"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.meta = void 0;
_a = {
    meta: {
        docs: {
            description: 'use window.setTimeout insteadof setTimeout in render process, same to setInterval',
            category: 'suggestion',
            recommended: true,
        },
        fixable: 'code',
    },
    create: function create(context) {
        return {
            CallExpression(node) {
                if (node.callee.name === 'setTimeout' || node.callee.name === 'setInterval') {
                    const filePath = context.getFilename();
                    const isInMainProcess = filePath.includes('platforms');
                    if (!isInMainProcess) {
                        context.report({
                            node,
                            message: 'window.setTimeout insteadof setTimeout, same to setInterval',
                            fix(fixer) {
                                const fixes = [];
                                fixes.push(fixer.insertTextBefore(node, 'window.'));
                                return fixes;
                            },
                        });
                    }
                }
            },
        };
    },
}, exports.meta = _a.meta, exports.create = _a.create;
//# sourceMappingURL=normal-timer.js.map