import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const register = async (req,res) => {
    try{
        const {fullname,email,phoneNumber,password,role} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        };
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content,{
            resource_type:"image"
        })
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User already exists with this email",
                success:false
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
            profile:{
                profilePhoto : cloudResponse.secure_url
            }
        })
        return res.status(201).json({
            message:"Account created successfully",
            success:true
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
<<<<<<< HEAD
            message: "An error occurred during login",
=======
            message: "An error occurred during Register",
>>>>>>> 25389394d2d6b8f5e3237fca9e39570702c51623
            success: false,
        });
    }
}
export const login =  async (req,res) => {
    try{
        const {email,password,role} = await req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        };
        let user = await User.findOne({email});
        console.log(user);
        if(!user){
            return res.status(400).json({
                message:"Incorrect email address",
                success:false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect password",
                success:false
            })
        }
        if(role != user.role){
            return res.status(400).json({
                message:"Account doesn't exist with current role",
                success:false
            }) 
        }
        const tokenData = {
            userId : user._id
        }
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY , {expiresIn:'1d'});

        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
            httpOnly: true,                  // Prevent access from JavaScript
            secure: true, // Use HTTPS in production
            sameSite: 'none',
            
        })
        .json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true,
    });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "An error occurred during login",
            success: false,
        });
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "none",
            // Prevent CSRF attacks
        });
        return res.status(200).json({
            message: "Logout successful",
            success: true,
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({
            message: "Server error during logout",
            success: false,
        });
    }
};


export const updateProfile = async (req,res)=>{
    try {
        const {fullname,email,phoneNumber,bio,skills} = req.body;
        const file = req.file;   

        const fileUri = getDataUri(file);

        const cloudResponse = await cloudinary.uploader.upload(fileUri.content,{
            resource_type:"auto"
        });

        console.log(cloudResponse)

        let skillsArray;
        if(skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id;
        let user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message:"User not found",
                success:false
            })
        }
        if(await User.findOne({email}) && email!=user.email){
            return res.status(400).json({
                message:"User exist with this email",
                success:false
            })
        }


        if(fullname){ user.fullname = fullname}
        if(email){ user.email = email}
        if(phoneNumber){ user.phoneNumber = phoneNumber}
        if(bio){ user.profile.bio = bio}
        if(skills){ user.profile.skills = skillsArray}
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url 
            user.profile.resumeOriginalName = file.originalname
        }
        await user.save();

        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).json({
            message:"Profile Updated Successfully",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}
