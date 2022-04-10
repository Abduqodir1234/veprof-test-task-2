import { NextFunction, Response } from "express";
import Joi, { options } from "joi";
import { Request2 } from "../verifyToken";

const UserRegisterSchema = Joi.object({
    email:Joi.string().email().required(),
    emailVerified:Joi.boolean().required(),
    phoneNumber:Joi.string().pattern(/^[0-9]+$/).valid(null),
    photoURL:Joi.string().uri().valid(null),
    uid:Joi.string().required(),
    displayName:Joi.string().valid(null),
})



export const UserRegisterSchemaValidator = async (req:Request2,res:Response,next:NextFunction)=>{
    try{
        const resVal = UserRegisterSchema.validate(req.body)
        if(resVal.error){
            return res.status(400).json({error:true,msg:resVal.error?.details[0].message}) 
        }
        else{
            next()
        }
    }
    catch(e){
        return res.status(500).json({error:true,msg:e})
    }
}