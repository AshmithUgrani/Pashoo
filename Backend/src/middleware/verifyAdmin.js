const verifyAdmin=(req,res,next)=>{   //it will perform the Admin action
  if(req.role !== 'admin'){
    return res.status(403).send({success:false , message:"Your are not authorized to perfpm this action"});
  }
}
module.exports=verifyAdmin;