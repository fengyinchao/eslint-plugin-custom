export const { meta, create } = {
  meta: {
    docs: {
      description: '在 StyleSheet.create 中生成该声明',
      category: 'suggestion',
      recommended: false,
    },
    fixable: 'code', // or "code" or "whitespace"
  },

  create: function create(context): Record<string, unknown> {
    let targetNode = null;
    return {
      MemberExpression: node => {
        if (node.object?.name === 'styles') {
          const targetKey = node.property.name;
          if (!targetNode || !targetNode.range) {
            return;
          }
          if (targetNode.properties.some(property => property?.key?.name === targetKey)) {
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
        if (targetNode) {
          return;
        }
        if (node?.callee?.object?.name === 'StyleSheet') {
          if (node?.arguments[0]?.type === 'CallExpression') {
            targetNode = node?.arguments[0].arguments[0];
          } else {
            targetNode = node?.arguments[0];
          }
        }
      },
    };
  },
};
