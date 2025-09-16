import holdingModel from "../Models/holdingsModel.js";

export const holdings = async (req,res)=>{
    const holding = await holdingModel.find({userId:req.userId});
    if(!holding){
        return res.status(400).json({data:null,success:false,message:"holdings not found"})
    }else{
       return res.status(200).json({data:holding,success:true,message:"holdings found successfully"}) 
    }
}