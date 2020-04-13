const { Nuxt, Builder } = require("nuxt-edge");
const request = require("request-promise-native");
const getPort = require("get-port");

const config = require("../example/nuxt.config");
config.dev = false;

let nuxt, port;

const url = (path) => `http://localhost:${port}${path}`;
const get = (path) => request(url(path));

describe("basic", () => {
  beforeAll(async () => {
    nuxt = new Nuxt(config);
    await nuxt.ready();
    await new Builder(nuxt).build();
    port = await getPort();
    await nuxt.listen(port);
  }, 60000);

  afterAll(async () => {
    await nuxt.close();
  });

  test("render", async () => {
    const html = await get("/");
    expect(html).toMatchSnapshot();
  });
});
