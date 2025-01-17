# Changelog

## [2.5.0] - 2020-12-14

### 🔥 Improves

- 性能优化，提升接口加载速度

### 🚀 Features

- 支持关联嵌套
- 支持按创建时间、更新时间排序
- 支持隐藏创建时间、更新时间

### 🐛 Fix

- 修复隐藏字段在编辑界面显示的问题
- 修复多个 Markdown 字段只展示一个编辑的问题
- 修复图片上传存储异常的问题

## [2.4.0] - 2020-12-07

### 🚀 Features

- 支持复制内容模型
- 支持导出数据到 CSV/JSON 文件
- 支持修改系统内置的创建时间、修改时间等字段的属性
- 支持云托管部署 CMS 服务

### 🐛 Fix

- 修复 Webhook 监听全部内容编辑异常的问题

## [2.3.0] - 2020-11-19

### 🚀 Features

- 支持 RESTful API 访问内容数据
- Date 新增字符串存储类型

### 🐛 Fix

- 修复 Webhook 触发错误的问题
- 修复新建 Webhook 弹窗内容保留的问题

## [2.2.0] - 2020-11-16

### 🚀 Features

- 日期/日期时间类型支持选择存储格式化选项
- 图片/文件支持选择存储 HTTPS 链接格式
- 支持保存分页查询条件

### ⚡ Improve

- 优化图片展示方式
- 项目列卡片样式优化

### 🐛 Fix

- 修复菜单栏更新失败的问题

## [2.1.0] - 2020-10-15

### 🚀 Features

- 模型字段支持拖拽排序
- 支持模型的导入、导出
- 新增 JSON 对象内容类型
- 图片、文件类型支持数组模式，可上传多个图片、文件
- 支持通过 CSV，JSON Line 导入数据到内容集合中

### ⚡ Improve

- 文件展示优化
- 菜单栏集合默认展开
- 图片支持缩放与预览
- 优化数据表格展示，提示性能
- 优化代码类型定义 [#19](https://github.com/TencentCloudBase/cloudbase-extension-cms/pull/19) [@fantasticsoul](https://github.com/fantasticsoul)

### 🐛 Fix

- 修复关联数据搜索异常的问题
- 修复版本升级字段迁移的问题
- 修复其他已知问题
- 修复新增用户弹窗，新建按钮错误显示问题，表单信息未销毁的问题 [#29](https://github.com/TencentCloudBase/cloudbase-extension-cms/pull/29) [@geeeeeeeeeek](https://github.com/geeeeeeeeeek)

## [2.0.0] - 2020-09-24

### 🚀 Features

- 全新的 UI 交互设计，创造高效愉悦的使用体验
- 新增项目管理，支持内容资源隔离，企业级管理模式
- 全新的用户权限管理体系，基于自定义角色的资源级权限管理
- 全新的富文本编辑器，支持图片上传，带来新的使用体验
- 新增枚举、多行字符串等新类型
