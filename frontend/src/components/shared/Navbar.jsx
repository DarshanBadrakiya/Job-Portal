import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
            }
        }
    }
    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div className="cursor-pointer" onClick={()=>navigate("/")}>
                    <h1 className="text-2xl font-bold">Job<span className="text-[#F83002]">Hunt</span></h1>
                </div>
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        {
                            user && user.role === 'Recruiter' ? (
                                <>
                                    <li><Link className="text-black" to="/admin/companies">Companies</Link></li>
                                    <li><Link className="text-black" to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li onClick={()=>window.location.reload()}><Link className="text-black" to="/">Home</Link></li>
                                    <li><Link className="text-black" to="/jobs">Jobs</Link></li>
                                    {/* <li><Link className="text-black" to="/browse">Browse</Link></li> */}
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className="flex items-center gap-2">
                                <Link to={"/login"}><Button variant="outline">Login</Button></Link>
                                <Link to={"/signup"}><Button className="bg-[#6A38c2] hover:bg-[#5b30a6]">Sign up</Button></Link>
                            </div>
                        ) : <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage className="object-cover" src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="">
                                    <div className="flex gap-2 space-y-2">
                                        <Avatar>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} alt="https://github.com/shadcn.png" />
                                            </Avatar>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">{user.fullname}</h4>
                                            <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col my-2 text-grey-600 ">
                                    {
                                        user && user.role === 'Candidate' && (
                                            <div className="flex w-fit items-center gap-2 cursor-pointer hover:outline-none">
                                            <User2 />
                                            <Button className="outline-none focus:outline-none hover:outline-none" variant="link"><Link className="text-black" to="/profile">View Profile</Link></Button>
                                        </div>
    
                                        )
                                    }
                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                        <LogOut />
                                        <Button onClick={logOutHandler} className="outline-none focus:outline-none hover:outline-none" variant="link">Logout</Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar;