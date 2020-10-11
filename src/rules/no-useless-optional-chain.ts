export const { meta, create } = {
  meta: {
    docs: {
      description: 'no-useless-optional-chain in ngrx',
      category: 'suggestion',
      recommended: true,
    },
    fixable: 'code',
  },

  create: function create(context): Record<string, unknown> {
    let parentSelectorName;
    return {
      VariableDeclarator(node) {
        if (node.init && node.init.callee && node.init.callee.name === 'createFeatureSelector') {
          parentSelectorName = node.id.name;
        }
      },
      CallExpression(node) {
        if (node.callee.name === 'createSelector') {
          const len = node.arguments.length;
          const lastEl = node.arguments[len - 1];
          const firstEl = node.arguments[0];
          if (
            firstEl &&
            firstEl.name === parentSelectorName &&
            lastEl.type === 'ArrowFunctionExpression' &&
            lastEl.body &&
            lastEl.body.type === 'OptionalMemberExpression'
          ) {
            context.report({
              node,
              message: 'Ngrx中不要使用多余的可选链',
              fix: function (fixer) {
                const fixes = [];
                fixes.push(fixer.removeRange([lastEl.body.object.range[1], lastEl.body.object.range[1] + 1]));
                return fixes;
              },
            });
          }
        }
      },
    };
  },
};
