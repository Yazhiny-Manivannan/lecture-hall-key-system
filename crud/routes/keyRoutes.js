import express from "express";

import {
  createKey,
  getKeys,
  getKeyById,
  updateKey,
  deleteKey,
} from "../controller/keyController.js";

const route = express.Router();

route.post("/create", createKey);
route.get("/getallkeys", getKeys);
route.get("/getsinglekey/:id", getKeyById);
route.put("/update/:id", updateKey);
route.delete("/delete/:id", deleteKey);

export default route;