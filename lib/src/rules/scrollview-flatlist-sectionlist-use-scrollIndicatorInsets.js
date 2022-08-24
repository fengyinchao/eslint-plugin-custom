'use strict';
var _a;
Object.defineProperty(exports, '__esModule', { value: true });
exports.create = exports.meta = void 0;
(_a = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'RN 中 scrollview-flatlist-sectionlist 请添加 scrollIndicatorInsets',
    },
    fixable: 'code',
  },
  create: function create(context) {
    return {
      JSXElement: node => {
        var _a, _b, _c, _d, _e;
        if (
          ((_a = node.openingElement) === null || _a === void 0 ? void 0 : _a.type) === 'JSXOpeningElement' &&
          ['ScrollView', 'FlatList', 'SectionList'].includes(
            (_c = (_b = node.openingElement) === null || _b === void 0 ? void 0 : _b.name) === null || _c === void 0
              ? void 0
              : _c.name,
          )
        ) {
          const attributes =
            (_e = (_d = node.openingElement) === null || _d === void 0 ? void 0 : _d.attributes) !== null &&
            _e !== void 0
              ? _e
              : [];
          if (
            attributes.some(attr => {
              var _a;
              return ((_a = attr.name) === null || _a === void 0 ? void 0 : _a.name) === 'scrollIndicatorInsets';
            })
          ) {
            return;
          }
          const targetNode = node.openingElement;
          context.report({
            node,
            message: 'RN 中 scrollview-flatlist-sectionlist 请添加 scrollIndicatorInsets',
            fix: function (fixer) {
              const fixes = [];
              fixes.push(
                fixer.insertTextAfterRange(
                  [targetNode.range[0], node.closingElement ? targetNode.range[1] - 1 : targetNode.range[1] - 2],
                  'scrollIndicatorInsets={{right: 1}}',
                ),
              );
              return fixes;
            },
          });
        }
      },
    };
  },
}),
  (exports.meta = _a.meta),
  (exports.create = _a.create);
//# sourceMappingURL=scrollview-flatlist-sectionlist-use-scrollIndicatorInsets.js.map
