# LeaferJS 编辑器

中文 | [English](./README.md)

## 📖 简介

LeaferJS 编辑器是一个基于 Vue 3、TypeScript 和 LeaferJS 构建的强大图形设计编辑器。它提供了直观的界面，用于创建、编辑和管理各种图形元素，支持实时属性编辑和 Monaco 代码编辑器集成。

## ✨ 特性

- 🎨 **丰富的图形支持**：创建和编辑多种形状，包括矩形、圆形、线条、多边形、星形、路径、箭头、图片和文本
- 🖊️ **实时编辑**：即时属性更新，可视化反馈
- 💻 **代码编辑器集成**：内置 Monaco 编辑器，支持高级 HTML/代码编辑
- 🎯 **图层管理**：完全控制元素 z-index，支持置顶/置底操作
- 🌓 **深色/浅色模式**：无缝主题切换
- 📤 **导入/导出**：
  - 将选中元素或整个画布导出为 JSON
  - 将画布导出为图片
  - 导入 JSON 模板
- 🎨 **可自定义背景**：支持透明度的画布背景颜色调整
- 🖱️ **右键菜单**：快速操作的右键菜单
- 📐 **属性面板**：为每种元素类型提供详细的属性编辑

## 🛠️ 技术栈

- **框架**：Vue 3（组合式 API + `<script setup>`）
- **语言**：TypeScript
- **构建工具**：Vite
- **UI 库**：Element Plus
- **图形引擎**：LeaferJS v1.9.12
- **代码编辑器**：Monaco Editor
- **样式**：SCSS

## 📦 安装

```bash
# 克隆仓库
git clone <repository-url>

# 进入项目目录
cd leaferjs-editor

# 安装依赖
npm install
```

## 🚀 使用

### 开发

```bash
npm run dev
```

### 构建

```bash
npm run build
```

### 预览

```bash
npm run preview
```

## 📋 支持的图形

| 图形 | 描述 |
|------|------|
| Rect（矩形） | 可自定义属性的矩形 |
| Ellipse（椭圆） | 圆形和椭圆形 |
| Line（线条） | 各种样式的直线 |
| Polygon（多边形） | 多边多边形 |
| Star（星形） | 可配置点数的星形 |
| Path（路径） | 自定义 SVG 路径 |
| Arrow（箭头） | 可自定义箭头头部的箭头 |
| Image（图片） | 支持变换的图片元素 |
| Text（文本） | 支持丰富格式的可编辑文本 |
| HTML（HTML） | 使用 Monaco 编辑器的 HTML 内容 |

## 🎮 核心功能

### 画布操作

- **背景颜色**：通过颜色选择器调整，支持 Alpha 通道
- **导出选项**：
  - 将整个画布导出为 JSON
  - 将选中元素导出为 JSON
  - 将画布导出为图片（PNG/JPG）
- **导入**：加载 JSON 模板以恢复画布状态

### 元素管理

- **创建**：从左侧面板配置添加新元素
- **选择**：点击选择元素进行编辑
- **编辑**：在右侧面板修改属性
- **图层控制**：
  - 移至顶层/底层
  - 上移/下移一层
  - 删除选中元素

### 代码编辑器

- 切换代码编辑器模式以创建高级 HTML 元素
- 内置 Monaco 编辑器，支持语法高亮
- 支持多种编程语言

## 🗂️ 项目结构

```
leaferjs-editor/
├── src/
│   ├── components/
│   │   ├── configs/          # 图形配置组件
│   │   ├── properties/       # 属性编辑器组件
│   │   └── RightMenu.vue     # 右键菜单
│   ├── types/                # TypeScript 类型定义
│   ├── utils/                # 工具函数
│   │   ├── element.ts        # 元素创建工具
│   │   ├── event.ts          # 事件处理器
│   │   └── file.ts           # 文件操作
│   ├── styles/               # 主题样式
│   ├── App.vue               # 主应用组件
│   ├── index.ts              # 核心编辑器逻辑
│   └── main.ts               # 应用入口点
├── public/                   # 静态资源
└── package.json              # 依赖和脚本
```

## 🔧 配置

### LeaferJS 插件

编辑器使用以下 LeaferJS 插件：

- `@leafer-in/arrow` - 箭头形状支持
- `@leafer-in/editor` - 编辑器功能
- `@leafer-in/export` - 导出功能
- `@leafer-in/html` - HTML 元素支持
- `@leafer-in/resize` - 调整大小操作
- `@leafer-in/text-editor` - 文本编辑
- `@leafer-in/viewport` - 视口管理

## 🎯 键盘快捷键

（如适用，请在此处添加您的键盘快捷键）

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

## 📝 许可证

本项目采用 MIT 许可证。

## 🙏 致谢

- [LeaferJS](https://www.leaferjs.com/) - 强大的画布图形框架
- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Element Plus](https://element-plus.org/) - Vue 3 UI 库
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - 代码编辑器

## 📧 联系方式

如有问题或需要支持，请在 GitHub 上提出 issue。

---

使用 ❤️ 和 Vue 3 + LeaferJS 制作

