import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [])
    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10">
                <div className="flex items-center gap-2">
                    <Button onClick={()=>{navigate("/")}} className="mt-1 outline-none bg-white text-black hover:bg-white"><ArrowLeft /></Button>
                    <h1 className="font-bold text-lg">Search Results ({allJobs.length})</h1>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-5">
                    {
                        allJobs.map((job, index) => {
                            return (
                                <Job job={job} key={job._id} />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Browse;