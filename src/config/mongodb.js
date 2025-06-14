import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "~/config/environment";

// Khởi tạo đối tượng trelloDatabaseInstance ban đầu là null, vì chưa connect
let trelloDatabaseInstance = null;

// Khởi tạo đối tượng mongoClientInstance để connect đến MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Hàm kết nối đến DB
export const CONNECT_DB = async () => {
  // Gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect();

  // Kết nối thành công thì lấy ra Database theo tên và gán ngược lại vào biến trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

// Hàm đóng kết nối đến DB
export const CLOSE_DB = async () => {
  // Nếu trelloDatabaseInstance đã được khởi tạo thì đóng kết nối
  if (trelloDatabaseInstance) {
    await mongoClientInstance.close();
    trelloDatabaseInstance = null; // Đặt lại về null sau khi đóng kết nối
  } else {
    throw new Error("Database not initialized. Cannot close connection.");
  }
};

export const GET_DB = () => {
  // Nếu trelloDatabaseInstance đã được khởi tạo thì trả về nó
  if (trelloDatabaseInstance) return trelloDatabaseInstance;

  // Nếu chưa được khởi tạo thì ném ra lỗi
  throw new Error(
    "Database not initialized. Please connect to the database first."
  );
};
