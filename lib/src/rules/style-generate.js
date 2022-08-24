'use strict';
var _a;
Object.defineProperty(exports, '__esModule', { value: true });
exports.create = exports.meta = void 0;
(_a = {
  meta: {
    docs: {
      description: '在 StyleSheet.create 中生成该声明',
      category: 'suggestion',
      recommended: false,
    },
    fixable: 'code',
  },
  create: function create(context) {
    let targetNode = null;
    return {
      MemberExpression: node => {
        var _a;
        if (((_a = node.object) === null || _a === void 0 ? void 0 : _a.name) === 'styles') {
          const targetKey = node.property.name;
          if (!targetNode || !targetNode.range) {
            return;
          }
          if (
            targetNode.properties.some(property => {
              var _a;
              return (
                ((_a = property === null || property === void 0 ? void 0 : property.key) === null || _a === void 0
                  ? void 0
                  : _a.name) === targetKey
              );
            })
          ) {
            return;
          }
          context.report({
            node,
            message: '在 StyleSheet.create 中生成该声明',
            fix: function (fixer) {
              const fixes = [];
              fixes.push(
                fixer.insertTextAfterRange([targetNode.range[0], targetNode.range[1] - 1], `${targetKey}:{},\n`),
              );
              return fixes;
            },
          });
        }
      },
      CallExpression: node => {
        var _a, _b, _c;
        if (targetNode) {
          return;
        }
        if (
          ((_b =
            (_a = node === null || node === void 0 ? void 0 : node.callee) === null || _a === void 0
              ? void 0
              : _a.object) === null || _b === void 0
            ? void 0
            : _b.name) === 'StyleSheet'
        ) {
          if (
            ((_c = node === null || node === void 0 ? void 0 : node.arguments[0]) === null || _c === void 0
              ? void 0
              : _c.type) === 'CallExpression'
          ) {
            targetNode = node === null || node === void 0 ? void 0 : node.arguments[0].arguments[0];
          } else {
            targetNode = node === null || node === void 0 ? void 0 : node.arguments[0];
          }
        }
      },
    };
  },
}),
  (exports.meta = _a.meta),
  (exports.create = _a.create);
//# sourceMappingURL=style-generate.js.map
