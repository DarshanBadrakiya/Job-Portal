import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        try {
            dispatch(setSearchedQuery(query));
            navigate("/browse");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="text-center">
            <div className="flex flex-col gap-5 my-10">
                <h1 className="text-5xl font-bold sm:text-4xl md:text-5xl">
                    Search, Apply & <br /> Get Your <span className="text-[#6a38c2]">Dream Jobs</span>
                </h1>
                <p className="text-lg sm:text-base md:text-lg">
                    Talent meets opportunity here and Elevate your career ambitions
                </p>
                <div className="flex w-full max-w-lg sm:max-w-md shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
                    <Input
                        placeholder="Find your dream job"
                        className="focus:outline-none outline-none border-none w-full"
                        onChange={(e) => setQuery(e.target.value)}
                        type="text"
                    />
                    <Button onClick={() => searchJobHandler(query)} className="rounded-r-full bg-[#6A38C2]">
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default HeroSection;
