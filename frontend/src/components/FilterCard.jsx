import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
    },
    {
        filterType: "Role",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
    },
    {
        filterType: "Company",
        array: ["Amazon", "Google", "Flipkart", "Mircosoft"],
    },
];

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({});

    const changeHandler = (filterType, value) => {
        
        setSelectedFilters((prev) => ({
            ...prev,
            [filterType]: value,
        }));
    };
    const dispatch = useDispatch();
    useEffect(() => {
        const selectedValues = Object.values(selectedFilters).filter(Boolean); // Filters out undefined
        console.log("Selected Values:", selectedValues[0]);
        dispatch(setSearchedQuery(selectedValues[0]))
    }, [selectedFilters]);

    return (
        <div className="w-full bg-white p-3 rounded-md">
            <h1 className="text-lg font-bold">Filter Jobs</h1>
            <hr className="mt-3" />
            {filterData.map((data, groupIndex) => (
                <div key={groupIndex} className="mb-4">
                    <h1 className="text-lg font-bold mb-2">{data.filterType}</h1>
                    {data.array.map((item, index) => {
                        const itemId = `id${groupIndex}-${index}`;
                        return (
                            <div key={index} className="flex items-center space-x-2 my-2">
                                <Input
                                    id={itemId}
                                    name={data.filterType}
                                    className="h-4 w-4"
                                    type="radio"
                                    value={item}
                                    checked={selectedFilters[data.filterType] === item}
                                    onChange={() => changeHandler(data.filterType, item)}
                                />
                                <Label htmlFor={itemId}>{item}</Label>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default FilterCard;
