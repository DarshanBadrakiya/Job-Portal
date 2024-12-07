const FeaturedBlogs = () => {
    const blogs = [
        {
            title: "10 Tips to Ace Your Job Interview",
            description: "Learn essential strategies and tips to make a lasting impression during your next job interview.",
            image: "https://via.placeholder.com/300x200",
            link: "#"
        },
        {
            title: "Top Skills Employers Look For in 2024",
            description: "Discover the most in-demand skills across industries to stay competitive in the job market.",
            image: "https://via.placeholder.com/300x200",
            link: "#"
        },
        {
            title: "Remote Work: Pros, Cons, and How to Excel",
            description: "Explore the rise of remote work and how you can thrive while working from home.",
            image: "https://via.placeholder.com/300x200",
            link: "#"
        }
    ];

    return (
        <div className="featured-blogs p-9">
            <h2 className="text-2xl text-[#7209b7] font-semibold text-center mb-6">Career Advice & Blogs</h2>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogs.map((blog, index) => (
                    <a
                        key={index}
                        className="blog-card text-black hover:text-black shadow rounded overflow-hidden"
                    >
                        <img 
                            src={blog.image} 
                            alt={blog.title} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg text-[#7209b7] font-bold mb-2">{blog.title}</h3>
                            <p className="text-gray-600 text-sm">{blog.description}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default FeaturedBlogs;
