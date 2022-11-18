// @ts-check

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/** @type {Post[]} */
const posts = [
  {
    id: "my_first_post",
    title: "My first post",
    content: "first content",
  },
  {
    id: "my_second_post",
    title: "My second post",
    content: "second content",
  },
];

/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {*} body
 */

/**
 * @typedef Route
 * @property {RegExp} url
 * @property {'GET' | 'POST'} method
 * @property {(object) => Promise<APIResponse>} callback
 */

/** @type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: "GET",
    callback: async () => ({
      statusCode: 200,
      body: {
        posts: posts.map((post) => ({
          id: post.id,
          title: post.title,
          content: post.content,
        })),
        totalCount: posts.length,
      },
    }),
  },
  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/,
    method: "GET",
    async callback(req) {
      const RegResult = this.url.exec(req.url);

      if (!RegResult)
        return {
          statusCode: 404,
          body: "page not found",
        };

      console.log(RegResult[1]);

      return {
        statusCode: 200,
        body: posts.find((el) => el.id === RegResult[1]),
      };
    },
  },
  {
    url: /^\/posts$/,
    method: "POST",
    async callback(req) {
      const body = await new Promise((resolve) => {
        req.setEncoding("utf-8");
        req.on("data", (data) => {
          resolve(JSON.parse(data));
        });
      });

      posts.push({
        id: body.title.toLowerCase().replace(" ", ""),
        title: body.title,
        content: body.content,
      });

      return {
        statusCode: 200,
        body: "create success",
      };
    },
  },
];

module.exports = { routes };
