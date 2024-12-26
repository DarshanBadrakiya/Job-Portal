import React, { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Scientist",
    "Graphic Designer",
    "Full Stack Developer"
]
const CategoryCarousel = () => {
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
        <div className="w-full mx-auto my-20">
            <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                className="w-full rounded-full py-2"
                                variant="outline"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};
export default CategoryCarousel;
