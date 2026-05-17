import express from "express";

import {
  createKey,
  getKeys,
  getKeyById,
  updateKey,
  deleteKey,
} from "../controller/keyController.js";

import { verifyToken } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/role.js";

const route = express.Router();

route.post("/create", verifyToken, authorizeRoles("admin"), createKey);

route.get("/getallkeys", verifyToken, authorizeRoles("admin", "staff"), getKeys);

route.get("/getsinglekey/:id", verifyToken, authorizeRoles("admin", "staff"), getKeyById);

route.put("/update/:id", verifyToken, authorizeRoles("admin"), updateKey);

route.delete("/delete/:id", verifyToken, authorizeRoles("admin"), deleteKey);

export default route;