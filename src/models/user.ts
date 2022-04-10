import {Schema,model,Document} from "mongoose"


export interface UserDocument extends Document{
    email:string,
    emailVerified:boolean,
    phoneNumber:string,
    photoURL:string,
    uid:number,
    displayName:string,
    role?:"super" | "ordinary"
}

let UserSchema = new Schema({
    email:String,
    emailVerified:Boolean,
    phoneNumber:String,
    photoURL:String,
    uid:String,
    displayName:String,
    role:{
        type:String,
        enum:{
            values:['super',"ordinary"],
            message:"{VALUE} is supported",
        },
        default:"ordinary"
    }
},{timestamps:true})

const Users = model("users",UserSchema)
export default Users