const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
const static = require("koa-static");
const { koaBody } = require("koa-body");

// 指定了静态文件的根目录
app.use(static(__dirname + "/public"));
app.use(static(__dirname + "/uploads"));

// 使用 koa-body 中间件来处理文件上传
app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: __dirname + "/uploads", // 设置文件上传目录
      keepExtensions: true, // 保持文件扩展名
    },
  })
);

// 设置路由处理函数
router.post("/upload", async (ctx) => {
  const file = ctx.request.files.file; // 获取上传的文件对象

  console.log("filePath: ", file.filepath); // 上传文件的新路径
  console.log("originalFilename: ", file.newFilename); // 上传文件的新名称
  console.log("newFilename: ", file.originalFilename); // 上传文件的原始名称

  ctx.body = {
    code: 0,
    message: "文件上传成功",
    data: { url: file.newFilename },
  };
});

// 将路由注册到应用
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
