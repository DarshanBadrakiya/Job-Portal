const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.job);
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto my-20">
            <h1 className="text-4xl font-bold sm:text-3xl md:text-4xl">
                <span className="text-[#6a38c2]">Latest & Top</span> Job Openings
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
                {allJobs.length <= 0 ? (
                    <span>No Job Available</span>
                ) : (
                    allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                )}
            </div>
        </div>
    );
};
