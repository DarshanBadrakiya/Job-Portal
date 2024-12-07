import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetFilters } from "@/redux/jobSlice";
import StatsSection from "./StatsSection";
import TrendingCompanies from "./TrendingCompanies";
import FeaturedBlogs from "./FeaturedBlogs";
import TestimonialSection from "./TestimonialSection";

const Home = () => {
    useGetAllJobs();
    useGetAllCompanies();
    useGetAllAdminJobs();
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (user?.role === 'Recruiter') {
            navigate("/admin/companies");
            dispatch(resetFilters())
        }
    }, []);
    return (
        <>
            <Navbar />
            <HeroSection />
            <CategoryCarousel />
            <LatestJobs />
            <StatsSection/>
            <TrendingCompanies/>
            {/* <FeaturedBlogs/> */}
            <TestimonialSection/>
            <Footer />
        </>
    )
}

export default Home;
