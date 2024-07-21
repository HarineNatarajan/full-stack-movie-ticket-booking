import express from "express";
import { addAdmin, adminLogin, deleteAdmin, getAdminById, getAdmins, updateAdmin } from "../controller/admin-controller.js";

const adminRouter = express.Router();

adminRouter.post("/signup", addAdmin);
adminRouter.post("/login", adminLogin);
adminRouter.get("/", getAdmins);
adminRouter.get("/:id", getAdminById);
adminRouter.put("/:id", updateAdmin); // Add update admin route
adminRouter.delete("/:id", deleteAdmin);

export default adminRouter;