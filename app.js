// const http = require("http");

// const hostname = "127.0.0.1";
// const port = 3001;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World");
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const express = require("express");
const app = express();

const path = require("path");
//도메인 주소 등이 다를 때 보안 상의 이유로 api 호출을 차단하는 것이며 해결하기 위해 cors 미들웨어 사용
const cors = require("cors");

const port = 3001;

app.set("port", port);

app.use(cors());

app.use(async (ctx, next) => {
  const now = new Date();
  console.log("모든 요청에 다 실행");
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
  console.log(
    `========== ${now.toLocaleString()}, ${new Date() - now + "ms"} ==========`
  );
  console.log(ctx);
});

app.on("error", (err, ctx) => {
  logger.error(">>>", err);
});

// // Secure
// app.use(helmet({ frameguard: false }));
// app.use(cors({ credentials: true }));

// // static 폴더 설정
// app.use(serve(__dirname + "/public"));

// router 등록
router.use(require("./routers/index").routes());
app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => {
  console.log(`Server running at ${port}/`);
});
