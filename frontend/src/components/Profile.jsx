import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAllAppliedJob from "@/hooks/useGetAllAppliedJob";

const isResume = true;

const Profile = () => {
    useGetAllAppliedJob();
    const [open, setOpen] = useState(false);
    
    const { user } = useSelector(store => store.auth);
    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
                <div className="flex flex-col sm:flex-row justify-between">
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                        <Avatar className="h-24 w-24">
                            <AvatarImage alt="profile" src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
                        </Avatar>
                        <div>
                            <h1 className="text-xl font-medium">{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} variant="outline" className="sm:text-right">
                        <Pen />
                    </Button>
                </div>
                <div className="my-5">
                    <div className="flex items-center gap-3 my-2">
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div>
                    <h1 className="text-lg">Skills</h1>
                    <div className="flex flex-wrap items-center gap-1 mb-5">
                        {
                            user?.profile.skills.length !== 0 ? user?.profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>) :
                                <span>NA</span>
                        }
                    </div>
                </div>
                <div className="grid w-full max-w-full items-center gap-1.5">
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                <h1 className="text-lg font-bold my-5">Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
}

export default Profile;
