import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import Footer from "./Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const params = useParams();
    const jobId = params.id;
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
    const navigate = useNavigate();

    const applyJobHandle = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
                withCredentials: true
            });
            if (res.data.success) {
                setIsApplied(true);
                const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updateSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
            }
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen max-w-7xl mx-auto my-10">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <Button onClick={() => { navigate("/jobs") }} className="mt-1 outline-none bg-white text-black hover:bg-white">
                                <ArrowLeft />
                            </Button>
                            <h1 className="font-bold text-xl">{singleJob?.title}</h1>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <Badge className="text-blue-700 font-bold" variant="ghost">{singleJob?.position} Positions</Badge>
                            <Badge className="text-[#F83002] font-bold" variant="ghost">{singleJob?.jobType}</Badge>
                            <Badge className="text-[#7209b7] font-bold" variant="ghost">{singleJob?.salary} LPA</Badge>
                        </div>
                    </div>
                    <Button onClick={isApplied ? null : applyJobHandle} disabled={isApplied}
                        className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
                <h1 className="border-b-2 border-b-gray-300 font-medium py-4 text-lg font-bold">Job Description</h1>
                <div className="my-5 flex flex-col gap-3">
                    <h1 className="font-bold text-lg my-1">Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h1>
                    <h1 className="font-bold text-lg my-1">Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
                    <h1 className="font-bold text-lg my-1">Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
                    <h1 className="font-bold text-lg my-1">Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel} Years</span></h1>
                    <h1 className="font-bold text-lg my-1">Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span></h1>
                    <h1 className="font-bold text-lg my-1">Total Applications: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span></h1>
                    <h1 className="font-bold text-lg my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span></h1>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default JobDescription;
