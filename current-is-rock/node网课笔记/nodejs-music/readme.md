## 开课吧  node音乐项目
> 2018年8月的项目 但是不影响，先把精髓学了才好学别的项目

### 项目功能
1. 登录
2. 注册
3. 添加音乐
4. 播放音乐
5. 编辑音乐
6. 删除音乐

### 项目依赖
```
npm i  koa  koa-router koa-art-template art-template  koa-bodyparser  koa-static koa-session captchapng2  koa-formidable mysql -S
```
1. 项目框架 koa
2. 路由系统 koa-router
3. 页面渲染koa-art-template(依赖art-template)
4. 处理文字请求体数据  koa-bodyparser
5. 处理静态文件 koa-static
6. 处理登录后的session   koa-session
7. 生成验证码 captchapng2
8. 处理文件上传的 请求体数据  koa-formidable
9. 连接数据库  mysql
   1. 查找结果是数组![52759876950](assets/1527598769506.png)


## 模板拆分引用及继承
中部留坑
```
main.html
{{block 'content'}}
默认内容
{{/block}}
    
{{extend './layout/main.html'}}
{{block 'content'}}
子页面内容
{{/block}}
```


### MVC
C：接收数据 生成视图
路由： url --> 做什么事（controller来安排，业务经理）
controller： 接收数据 响应页面


### api流程
router注册 --> controller逻辑  ---> models弄数据库搞数据


### 关于formidable处理文件及字符串
用bodyParser不太好处理文件
数据库里面存的是路径，而不是存文件
配置
 // 设置上传目录，否则在用户的temp目录下
    uploadDir:uploadDir,
    // 默认根据文件算法生成hash字符串（文件名），无后缀
    keepExtensions:true


### 重定向和重写URL
重定向：响应浏览器，让其再请求
重写URL：服务器内部的调用(首页跳转),静态资源也要重写，过滤掉public,要在路由处理前

### 中间件
中间件改写传参
module.exports = (options) => {
   return async () => {}
}

### 数据库相关
result.affectedRows !== 1    判断是否操作成功

### 加密
后端加密是王道，注册登录同算法，前端加密不靠谱
npm找个包就可以的

### 验证码 npm包 captchapng2
返回一个二进制流，img标签能处理

### 一个问题？ 为什么要有静态资源处理中间件，他是干什么的

### 处理歌词滚动
1. ajax获取歌词数据
2. 解析歌词 {"0":"告白气球", "4":"词：方文山"}
3. 分析dom结构
4. 开始滚动，滚动需要随着歌曲的播放实际来，播放的秒数和词会产生关联
5. 给当前播放的标签加样式
```
解析歌词函数
1.以换行符切割字符串，
2.遍历该数组，以正则来匹配数据，其中获取到时间和歌词
      regex = /\[(\d{2})\:\d{2}\:\d{2}](.*)/ 小括号捕获
      exec() == res[]   res[0]是原匹配，后面的就是捕获的 
3.计算时间作为key,将其与歌词为对象添加属性
4.返回这个对象
```
- 补充： 关于歌词匹配时间精确度，要看歌词文件的密度
   四舍五入， Math.round()


### 权限控制
1. 请求url是否以/user开头，是则直接放行
2. 否则验证session里面是否有user,没有则请求跳转到登录页面
> 补充，关于持久登录是用localStroage来做的也就是关闭页面后不用再重写登录，会保存你的信息到本地


### 部署
- node.js是基于V8引擎解析并执行的所以不同于其他后端语言，需要先编译后才能再服务器运行（即node.js不需要编译就能执行）
- node.js自身又包含服务器（不依赖apache，tomcat之类的），所以当启动了Nodejs的程序，就会在当前机器的公网IP并监听端口运行服务器。即在[ip:端口]上提供服务

### PM2
保障服务器不会挂掉，挂掉会自动重启
1. 安装 npm i -g pm2
2. pm2 start ./xxx.js --name projectname  //起别名
> 其他命令
>  pm2 examples    //查看常用操作
   pm2 [start | restart | stop | delete] all | name | id   //重启
   pm2 list        //查看启动的
   pm2 show name | id    查看信息
   pm2 flush             清空日志
   pm2 log nmae | id     查看日志


### nginx 请求分发
配置具体localhost的负载均衡
```
# 声明代理的服务器
upstream mytest {
   ip_hash; #共享session 通过IP来辨识共有的cookie和session的值
   server localhost:8888 weight=1;  越小概率越高 
   server localhost:9999 weight=1;
}
server {
   listen              80;
   server_name   localhost;
   location / {
      root    html;
      index   index.html;
      # 如果访问/   代理去mytest网站 需要在上面声明
      proxy_pass  http://mytest;    
   }
}
```

### art-template代码压缩、混淆需要配置生产模式
NODE_ENV === 'production'

### session共享
upstream 使用内置ip_hash来标识session
   - 为每个IP地址来区分session
   - 同IP同cookie

### 写出来的bug真的搞笑😀
localhost  写成 loaclhost
from   写成  form