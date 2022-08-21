export const { meta, create } = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'FED规范: 文件头必须要有注释',
    },
  },
  create: function create(context): Record<string, unknown> {
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
};
