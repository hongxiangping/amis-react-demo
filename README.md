# amis React demo 示例项目

## 一、说明
1. 参照 [官方源代码](https://github.com/baidu/amis)和[官网示例代码](https://github.com/aisuda/amis-react-starter) 实现。
2. 主要依赖如下：

amis ^6.0.0（包含amis-ui、amis-core）

axios ^1.4.0

react ^18.2.0

react-dom ^18.2.0

react-router-dom ^6.21.2（包含react-router）

vite ^5.0.11

@vitejs/plugin-react ^4.2.1

## 二、使用方法
1. 安装依赖
```
pnpm install
```
需要稍等片刻

2. 启动
```
pnpm dev
```
访问：http://localhost:8888

3. 页面开发

（1）在/src/pages目录下新建文件夹

（2）然后在对应文件夹下创建jsx文件，命名导出或默认导出一个json对象，json对象的内容需参考[Amis官方文档](https://aisuda.bce.baidu.com/amis/zh-CN/docs/index)进行配置。

也可使用官方提供的[可视化编辑器](https://aisuda.github.io/amis-editor-demo)来生成。官方提供的编辑器的相关网页由github.io部署，访问速度较慢，甚至无法访问。可以下载Amis可视化编辑器的[源码](https://github.com/aisuda/amis-editor-demo)进行本地化部署，部署方法见文末“三、Amis可视化编辑器的本地化部署”。

（3）在src\Navigations.jsx的navigations常量中增加如下类似配置，以便生成菜单和路由。
```
      {
        label: '示例页面',
        icon: 'fa fa-th',
        badge: 3,
        badgeClassName: 'bg-info',
        children: [
          {
            label: '简单页面',
            path: '/examples/index',
            component: EasyPageSchema
          },
          {
            label: '表单页面',
            path: '/examples/form',
            component: FormPageSchema
          }
        ]
      }
```
（4）启动状态下浏览器页面会自动刷新，可即时查看效果

4. 打包
```
pnpm build
```

## 三、Amis可视化编辑器的本地化部署
   注：适用于5.6.2、6.0.0（最新版本）版本的源码，其他较低版本暂未验证。

1. 源代码获取：https://github.com/aisuda/amis-editor-demo

2. 调试（开发）模式下运行

（1）安装依赖：npm install

备注：若使用pnpm安装依赖，很多包都找不到，要根据报错一个一个重新安装，比如：（还有一些没有一一列明）babel-loader、params-replace-loader、 ts-loader、 @babel/runtime等  

（2）将src目录下index.html中的“https://unpkg.com/animate.css@4.1.1/animate.min.css” 修改为 “https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css”

（3）将配置文件amis.config.js中的所有assetsPublicPath参数的值修改为“/”

（4）调试模式运行：npm run dev

（5）浏览器访问：localhost:80 ，查看是否正产运行

3. 编译及部署

（1）编译： npm run build

（2）将demo-6.0.0文件夹下的打包内容部署到nginx

4. 此外，还可以直接使用源代码中打包好的各个版本进行部署

以下以demo-5.6.2为例：

（1）找到源代码中的“demo-5.6.2”文件夹，全部拷贝出来。

（2）修改index.html中的“https://unpkg.com/animate.css@4.1.1/animate.min.css” 为 “https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css”

（3）使用开发工具（vs-code）将工程中所有的“https://aisuda.github.io/amis-editor-demo/demo-5.6.2/” 进行全局替换，替换为“/”

（4）将所有文件拷贝到nginx的html目录进行发布。

注意：部署到nginx后，可以正常运行，但是schema.json是404【不用管，官方示例也是同样的问题】。
