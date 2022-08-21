'use strict';
var _a;
Object.defineProperty(exports, '__esModule', { value: true });
exports.create = exports.meta = void 0;
(_a = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'FED规范: 文件头必须要有注释',
    },
  },
  create: function create(context) {
    return {
      Program: node => {
        const sourceCode = context.getSourceCode().getText();
        if (!(sourceCode.includes('@description:') && sourceCode.includes('@author:'))) {
          context.report({
            node,
            message: 'FED规范: 文件头必须要有注释',
          });
        }
      },
    };
  },
}),
  (exports.meta = _a.meta),
  (exports.create = _a.create);
//# sourceMappingURL=file-header-annotation.js.map
