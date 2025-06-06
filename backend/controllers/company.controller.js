import {Company} from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
export const registerCompany = async (req,res) =>{
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company Name is required",
                success:false
            })
        }
        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message:"Comapny with this name is already exist",
                success:false
            })
        }
        company = await Company.create({
            name:companyName,
            userId:req.id
        });
        return res.status(201).json({
            message:"Company registered successfully",
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}


export const getCompany = async (req, res) => {
    try {
        const userId = req.id; 
        console.log(userId)// Ensure `req.id` is set via middleware
        if (!userId) {
            return res.status(400).json({
                message: "User ID not found in request",
                success: false,
            });
        }

        const companies = await Company.find({ userId }); // Fetch companies for the logged-in user
        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No companies found for this user",
                success: false,
            });
        }

        return res.status(200).json({
            companies,
            success: true,
        });
    } catch (error) {
        console.error("Error fetching companies:", error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};


export const getCompanyById = async (req,res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }
        return res.status(200).json({
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const updateCompany = async (req,res) => {
    try {
        const {name,description,website,location} = req.body;
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content,{
            resource_type:"image"
        })
        const logo = cloudResponse.secure_url;
        const updateData = {name,description,website,location,logo};

        const company = await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }

        return res.status(200).json({
            message:"Company updated successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
