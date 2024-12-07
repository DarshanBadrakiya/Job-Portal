import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
    const navigate = useNavigate();

    // Function to calculate how many days ago the job was posted
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    // Calculate the number of days ago the job was posted
    const daysAgo = daysAgoFunction(job?.createdAt);

    return (
        <div className="p-5 rounded-md shadow-xl bg-white border-gray-100 w-full sm:w-80 md:w-96 lg:w-1/3 xl:w-1/4">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    {daysAgo === 0 ? "Today" : `${daysAgo} days ago`}
                </p>
            </div>
            <div className="flex items-center gap-2 my-2">
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500">{job?.location}</p>
                </div>
            </div>
            <div>
                <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                <p className="text-sm text-gray-600">{job?.description}</p>
            </div>
            <div className="flex items-center gap-2 mt-4 flex-wrap">
                <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position}</Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType}</Badge>
                <Badge className="text-[#7209b7] font-bold" variant="ghost">{job?.salary} LPA</Badge>
            </div>
            <div className="flex items-center gap-4 mt-4">
                <Button
                    className="bg-[#7209b7] hover:bg-[#5e08a7]" // Updated hover color for better contrast
                    onClick={() => { navigate(`/description/${job?._id}`) }}
                >
                    Details
                </Button>
            </div>
        </div>
    );
}

export default Job;
