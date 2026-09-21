import {getRoleById,getRoles,createRole,deleteRole,updateRole} from "../controllers/roleController.js";
import express from "express";
import validateObjectId from "../middleware/validateObjectId.js";
// import admin from "../middleware/admin.js";

const RoleRouter=express.Router()

RoleRouter.get("/",getRoles);
RoleRouter.get("/:id",validateObjectId , getRoleById);
RoleRouter.post("/",createRole);
RoleRouter.delete("/:id",validateObjectId,deleteRole);
RoleRouter.put("/:id",validateObjectId,updateRole);

export default RoleRouter;