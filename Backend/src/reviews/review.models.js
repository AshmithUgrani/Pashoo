const mongoose = require ("mongoose");

const ReviewSchema=new mongoose.Schema({
    comments:{
        type:String,
    },
    rating:{
        type:Number,required:true,
    },
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    productId:{type:mongoose.Schema.Types.ObjectId,ref:'product',required:true}
    },{timestamps:true});
const Reviews =mongoose.model("Review",ReviewSchema);
module.exports=Reviews;