const app = require("./app");

const PORT = process.env.PORT || 9494;
module.exports = app.listen(PORT);
