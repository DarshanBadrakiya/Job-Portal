import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const TestimonialSection = () => {
    const testimonials = [
        {
            name: "John Doe",
            role: "Software Engineer",
            photo: "https://media.istockphoto.com/id/1230749818/photo/portrait-of-smiling-male-owner-of-fashion-store-standing-in-front-of-clothing-display.jpg?s=612x612&w=0&k=20&c=xoWhF-hrQcbMEPDYncHiHF8HJX2YgmYt7T-KLCPZIpY=",
            feedback: "This platform helped me land my dream job within a month. The process was seamless and efficient!"
        },
        {
            name: "Jane Smith",
            role: "Project Manager",
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLWltO_RzTpY_bKJ5glRBmGHEPbuUj3YnrVQ&s",
            feedback: "Great user experience! I found amazing job opportunities that matched my skills perfectly."
        },
        {
            name: "Alex Johnson",
            role: "Graphic Designer",
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRTpUJUFYstvXBuWsxjzB4vCbKLmoP93yuNQ&s",
            feedback: "The design and functionality are top-notch. Highly recommend this platform for job seekers."
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    return (
        <div className="testimonial-section bg-gray-100 p-8">
            <h2 className="text-2xl text-[#720b97] font-semibold text-center mb-6">What Our Users Say</h2>
            <div className="container mx-auto px-4">
                <Slider {...settings}>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card text-center p-6 bg-white shadow rounded-lg">
                            <img
                                src={testimonial.photo}
                                alt={`${testimonial.name}`}
                                className="mx-auto w-24 h-24 rounded-full object-cover mb-4"
                            />
                            <h3 className="text-lg font-bold">{testimonial.name}</h3>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                            <p className="text-gray-700 mt-4">{testimonial.feedback}</p>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default TestimonialSection;
