const TrendingCompanies = () => {
    const companies = [
        { name: "Amazon", logo: "https://www.hrkatha.com/wp-content/uploads/amazon_logo_500500._V323939215_.png", link: "#" },
        { name: "Google", logo: "https://cdn2.hubspot.net/hubfs/53/image8-2.jpg", link: "#" },
        { name: "Microsoft", logo: "https://mailmeteor.com/logos/assets/PNG/Microsoft_Logo_512px.png", link: "#" },
        { name: "Apple", logo: "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png", link: "#" },
    ];

    return (
        <div className="trending-companies p-8 bg-white">
            <h2 className="text-2xl text-[#720b97] font-semibold text-center mb-6">Trending Companies</h2>
            <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                {companies.map((company, index) => (
                    <a 
                        key={index} 
                        className="company-card text-black hover:text-black shadow p-4 rounded flex flex-col items-center"
                    >
                        <img 
                            src={company.logo} 
                            alt={`${company.name} logo`} 
                            className="w-20 h-20 object-contain mb-4" 
                        />
                        <h4 className="text-lg font-medium">{company.name}</h4>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default TrendingCompanies;
