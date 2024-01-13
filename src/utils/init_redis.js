import { createClient } from "redis";

const redisClient = createClient({
  host: "127.0.0.1",
  port: 6379,
});
(async () => {
  await redisClient.connect();
})();

redisClient.on("connect", () => {
  console.log("Connected to redis client");
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));

export default redisClient;
