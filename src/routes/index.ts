import { Router } from "express";
import UserRegister from "../views/user/register";
import { UserRegisterSchemaValidator } from "../middlewares/joi/register";
import verifyToken from "../middlewares/verifyToken";

const indexRouter = Router()

indexRouter.post("/register",verifyToken,UserRegisterSchemaValidator,UserRegister)


export default indexRouter