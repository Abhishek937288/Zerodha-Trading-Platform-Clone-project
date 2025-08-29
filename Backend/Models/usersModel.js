import mongoose from "mongoose";


const userShema = new mongoose.Schema({
username:{
    type : String,
    required : true
},
email :{
    type : String,
    required : true
},
password : {
    type : String,
    required : true
},
isVerified :{
    type:Boolean,
    default:false
},
verificationToken : String,
verificationTokenEpiresAt:Date,
resetPasswordToken:String,
resetPasswordTokenEpiresAt:Date
});

const userModel = mongoose.model("User", userShema);
export default  userModel;