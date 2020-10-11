export const { meta, create } = {
  meta: {
    docs: {
      description: 'Angular 组件请使用 OnPush 策略',
      category: 'suggestion',
      recommended: false,
    },
    fixable: 'code', // or "code" or "whitespace"
  },

  create: function create(context): Record<string, unknown> {
    return {
      Decorator: node => {
        // console.log("===node2", node);

        if (
          node.expression.callee &&
          node.expression.callee.name === 'Component' &&
          node.expression.arguments[0].properties.every(item => item.key.name !== 'changeDetection')
        ) {
          const targetNodes = node.expression.arguments[0].properties;
          context.report({
            node,
            message: '组件请使用 OnPush 策略',
            fix: function (fixer) {
              const fixes = [];
              fixes.push(
                fixer.insertTextAfter(
                  targetNodes[targetNodes.length - 1],
                  ',\nchangeDetection: ChangeDetectionStrategy.OnPush',
                ),
              );
              // find correct import statement
              const root = context.getAncestors().find(item => item.type === 'Program');
              let importStatement = null;
              if (root) {
                importStatement = root.body.find(
                  item => item.type === 'ImportDeclaration' && item.source.value === '@angular/core',
                );
                let hasAlreadyImportChangeDetectionStrategy = false;
                hasAlreadyImportChangeDetectionStrategy =
                  importStatement &&
                  importStatement.specifiers.some(item => item.imported.name === 'ChangeDetectionStrategy');

                !hasAlreadyImportChangeDetectionStrategy &&
                  fixes.push(fixer.insertTextAfter(importStatement.specifiers[0], ',ChangeDetectionStrategy'));
              }

              return fixes;
            },
          });
        }
      },
    };
  },
};
