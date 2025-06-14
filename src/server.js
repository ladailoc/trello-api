/* eslint-disable no-console */
import express from "express";
import exitHook from "async-exit-hook";
import { CONNECT_DB, CLOSE_DB, GET_DB } from "~/config/mongodb";
import { env } from "~/config/environment";

const START_SERVER = () => {
  const app = express();

  app.get("/", async (req, res) => {
    console.log(await GET_DB().listCollections().toArray());
    res.end("<h1>Hello World!</h1><hr>");
  });

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `Hi ${env.AUTHOR}, Server running at http://${env.APP_HOST}:${env.APP_PORT}/`
    );
  });

  // Thực hiện cleanup server dừng
  exitHook(() => {
    CLOSE_DB();
  });
};

// Cách 1: Sử dụng Promise
// CONNECT_DB()
//   .then(() => console.log("Connected to MongoDB Atlas successfully!"))
//   .then(() => START_SERVER())
//   .catch((err) => {
//     console.error("Error connecting to MongoDB Atlas:", err);
//     process.exit(0); // Exit the process if connection fails
//   });

// Cách 2: Sử dụng async/await (IIFE - Immediately Invoked Function Expression)
(async () => {
  try {
    await CONNECT_DB();
    console.log("Connected to MongoDB Atlas successfully!");

    // Khởi động server sau khi kết nối thành công
    START_SERVER();
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
    process.exit(0);
  }
})();
