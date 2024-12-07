import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
const Signup = () => {
    const [input,setInput] = useState({
        fullname:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
        file:""
    });
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]:e.target.value});

    }
    const changeFileHandler = (e) => {
        setInput({...input,file:e.target.files?.[0]});
    }
    const submitHandler =  async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname",input.fullname);
        formData.append("email",input.email);
        formData.append("phoneNumber",input.phoneNumber);
        formData.append("password",input.password);
        formData.append("role",input.role);
        if(input.file){
            formData.append("file",input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register` , formData , {
                headers:{'Content-Type':"multipart/form-data"},
                withCredentials:true
            });
            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error Message:', error.message);
            }
        }finally{
            dispatch(setLoading(false))
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/home")
        }
    })
    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="w-1/2 border border-grey-200 rounded-md p-4 my-10">
                    <h1 className="font-bold text-xl mb-5">Sign Up</h1>
                    <div className="my-2">
                        <Label>Full Name</Label>
                        <Input type="text" value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder="Enter full name" className="mt-1 w-full" />
                    </div>
                    <div className="my-2">
                        <Label>Email</Label>
                        <Input type="text" value={input.email} name="email" onChange={changeEventHandler} placeholder="Enter email" className="mt-1 w-full" />
                    </div>
                    <div className="my-2">
                        <Label>Phone Number</Label>
                        <Input type="text" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder="Enter phone number" className="mt-1 w-full" />
                    </div>
                    <div className="my-3">
                        <Label>Password</Label>
                        <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="Enter password" className="mt-1 w-full" />
                    </div>
                    <div className="flex items-center justify-between">
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="Candidate" checked={input.role == 'Candidate'} onChange={changeEventHandler} className="cursor-pointer"/>
                                <Label htmlFor="option-one">Candidate</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                            <Input type="radio" name="role" value="Recruiter" checked={input.role == 'Recruiter'} onChange={changeEventHandler} className="cursor-pointer"/>
                            <Label htmlFor="option-two">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className="flex items-center ">
                            <Label>Profile</Label>
                            <Input accept="image/*" onChange={changeFileHandler} type="file" className="cursor-pointer"/>
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</Button> :                    <Button className="w-full my-4" type="submit">Signup</Button>
                    }
                    <span className="text-sm">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup;