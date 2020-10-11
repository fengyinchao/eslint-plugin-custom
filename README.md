# eslint-plugin-custom

这是一个自定义规则的 ESLint Plugin，用于规范业务代码，当前支持规则有：

- [x] no-first
      rxjs 中不允许使用 no-first

## Installation

```
$ npm install @fengyinchao/eslint-plugin-custom --save-dev
```

## Usage

Add `@fengyinchao/custom` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["@fengyinchao/custom"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "@fengyinchao/custom/rule-name": 2
  }
}
```
