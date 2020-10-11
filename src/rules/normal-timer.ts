export const { meta, create } = {
  meta: {
    docs: {
      description: 'use window.setTimeout insteadof setTimeout in render process, same to setInterval',
      category: 'suggestion',
      recommended: true,
    },
    fixable: 'code', // or "code" or "whitespace"
  },

  create: function create(context): Record<string, unknown> {
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
};
