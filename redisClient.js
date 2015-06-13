var redis = require("redis"),
client = redis.createClient();
client.on("error", function (err) {
  throw err;
});

module.exports=client;
