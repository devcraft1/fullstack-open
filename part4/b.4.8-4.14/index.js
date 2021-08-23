const http = require("http");
const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

const server = http.createServer(app);

// const port = process.env.PORT || 3003;

server.listen(config.PORT, () => {
  logger.info(`server started on http://localhost:${config.PORT}`);
});
