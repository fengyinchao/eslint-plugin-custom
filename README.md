# eslint-plugin-custom

这是一个自定义的 ESLint Plugin，用于规范业务代码

## Installation

```
$ npm install @vigor/eslint-plugin-custom --save-dev
```

## Usage

Add `@vigor/custom` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["@vigor/custom"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "@vigor/custom/rule-name": 2
  }
}
```
