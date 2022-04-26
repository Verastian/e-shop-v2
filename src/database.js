import { connect } from "mongoose";
import { MONGODB_URI } from "./config";

(async () => {
  try {
    const db = await connect(MONGODB_URI);
    console.log(`${db.connection.name}`);
  } catch (e) {
    console.error(e);
  }
})();
