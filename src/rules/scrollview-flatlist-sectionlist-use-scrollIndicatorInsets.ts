export const { meta, create } = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'RN 中 scrollview-flatlist-sectionlist 请添加 scrollIndicatorInsets',
    },
    fixable: 'code',
  },
  create: function create(context): Record<string, unknown> {
    return {
      JSXElement: node => {
        if (
          node.openingElement?.type === 'JSXOpeningElement' &&
          ['ScrollView', 'FlatList', 'SectionList'].includes(node.openingElement?.name?.name)
        ) {
          const attributes = node.openingElement?.attributes ?? [];
          if (attributes.some(attr => attr.name?.name === 'scrollIndicatorInsets')) {
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
};
