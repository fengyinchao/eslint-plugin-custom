# eslint-plugin-custom

这是一个自定义规则的 ESLint Plugin，用于规范业务代码，当前支持规则有：

- [x] file-header-annotation
      文件头必须要有注释
- [x] no-first
      rxjs 中不允许使用 no-first
- [x] no-useless-optional-chain
      ngrx reducer 中创建 selector 时不要冗余使用可选链特性
- [x] normal-timer
      electron 渲染进程中使用 setTimeout/setInterval 要加 window, 以区分 nodejs
- [x] use-onpush
      Angular 组件请使用 onpush 而非 default
- [x] extract-log-url
      Angular 组件中打日志时 clog 参数请使用枚举，支持将 clog 参数自动提取生成枚举文件

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
