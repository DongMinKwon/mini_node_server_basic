// @ts-check

const http = require("http");
const { routes } = require("./route");

/*
  Post

  GET /posts

  GET /posts/:id{}

  POST /posts
*/

const server = http.createServer(async (req, res) => {
  const route = routes.find(
    (el) => req.url && el.url.test(req.url) && el.method === req.method
  );

  if (route) {
    const result = await route.callback(req);
    res.statusCode = result.statusCode;
    res.setHeader("Content-Type", "application/json; encoding=utf-8");
    res.end(JSON.stringify(result.body));
  } else {
    res.statusCode = 404;
    res.end("page not found");
  }
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log("server is opening in port 4000");
});
