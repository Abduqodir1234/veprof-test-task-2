import { Response } from "express"
import { Request2 } from "../../middlewares/verifyToken"
import UserService from "../../services/users.service"

const UserRegister = async(req:Request2,res:Response)=>{
    const users = new UserService()
    let {error,msg,status} = await users.createUser(req.body)
    return res.status(status).json({msg:msg,error})
}
export default UserRegister