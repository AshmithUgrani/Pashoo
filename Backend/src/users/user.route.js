const express = require('express');
const User = require('./user.model');
const generateToken = require('../middleware/generateToken');
const verfiyToken = require('../middleware/verifyToken');
const router = express.Router();


// Register endpoint
router.post('/register', async (req, res) => {      //This creates a POST route at /register which listens for incoming requests.
    try {
        const { username, email, password } = req.body;   //Extracting data from req.body
        const user = new User({ username,email, password }); //A new instance of the User model is created using the data from the request body
        await user.save();
        
        res.status(201).send({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).send({ message: "An error occured" });
    }
});

//Login user endpoint
router.post('/login',async(req,res)=>{
    const{email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).send({messege:'User not found'});
        }
        const isMatch= await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).send({message:'Password  not match'});
        }
        const token=await generateToken(user._id);  //token will generate here
        // console.log(token);
         res.cookie('token',token,      //setting it to cookie
            {
               httpOnly:true,
               secure:true,
               sameSite:'None'
            })

       res.status(200).send({messege:'logged in sucessfull',token,user:{
        _id:user._id,
        email:user.email,
        username:user.username,
        role:user.role,
        profileImage:user.profileImage,
        bio:user.bio,
        profession:user.profession
       },
    });
    }catch(error){
        res.status(500).send({ message: "Error logged in user" });
    }
    
});

//logoutendpoint
router.post('/logout',(req,res)=>{
    res.clearCookie('token');
    res.status(200).send({message:"logged out Sucessfully"});
});

//delete a user
router.delete('/users/:id',async (req,res)=>{
    try{
        const{id}=req.params;
        const user=await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ message: "User deletd Sucessfully" });
    }catch(error){
        console.error("Error deleting user",error);
        res.status(500).send({ message: "Error deleting user" });
    }
});

//all users
router.get("/users",async (req,res)=>{
    try{
        const users=await User.find({},'id email role').sort({createdAt:-1});
        res.status(200).send(users)
    }catch(error){
        console.error("Error fetching users",error);
        res.status(500).send({ message: "Error deleting user" });
    
    }
});

//update user role
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send({ message: 'User role updated successfully', user });
    } catch (error) {
        console.error("Error updating user role", error);
        res.status(500).send({ message: "Error updating user role" });
    }
});

//update profile
router.patch('/edit-profile',async(req,res)=>{
    try{
        //destructuring the user model
        const{userId,username,profileImage,bio,profession}=req.body;
        if(!userId){
            return res.status(404).send({ message: 'User ID is required' });
        }
        const user=await User.findById(userId);
        // console.log(user);/
        if(!user){
            return res.status(404).send({ message: 'User not found' });
        }
        //update profile
        if(username!==undefined) user.username=username;
        if(profileImage!==undefined) user.profileImage=profileImage;
        if(bio!==undefined) user.bio=bio;
        if(profession!==undefined) user.profession=profession;

        await user.save();
        res.status(200).send({ message: 'Profile updated successfully', user:{
        _id:user._id,
        email:user.email,
        username:user.username,
        role:user.role,
        profileImage:user.profileImage,
        bio:user.bio,
        profession:user.profession
        },
    });
        
        
    }catch(error){
        console.error("Error updating user Profile", error);
        res.status(500).send({ message: "Error updating user Profile" });
    }
})

module.exports = router;