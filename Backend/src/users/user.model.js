const {Schema,model}=require('mongoose');
const bcrypt = require('bcrypt');

const userSchema=new Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{
        type:String,default:'user'
    },
    profileImage:String,
    bio:{type:String,maxlength:200},
    profession:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
});

//to save data on backend we use middleware

//hashing password
//pre works before saving data
userSchema.pre('save', async function (next) {      //converting into fixed length
    const user=this;
    if(!user.isModified('password')) return next();  //checks the password is modifed or not if not it calls the next method
    const hashedPassword=await bcrypt.hash(user.password,10);   //salt 10  //if it is modifed ,hash it using bcrypt.hash
    user.password=hashedPassword;             //After hashing, you replace the password field with the hashed value.
    next();                                //Finally, you call next() to proceed with saving the document.
})   

//match password
userSchema.methods.comparePassword=function(candidatePassword){
    return bcrypt.compare(candidatePassword,this.password);
}

const User=new model("user",userSchema);
module.exports=User;