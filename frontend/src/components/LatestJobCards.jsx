const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-all"
        >
            <div>
                <h1 className="font-medium text-lg sm:text-base md:text-lg">{job?.company?.name}</h1>
                <p className="text-sm text-gray-500">{job.location}</p>
            </div>
            <div>
                <h1 className="font-bold text-lg my-2 sm:text-base">{job?.title}</h1>
                <p className="text-sm text-gray-600 sm:text-xs">{job?.discription}</p>
            </div>
            <div className="flex items-center gap-2 mt-4 flex-wrap">
                <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position}</Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType}</Badge>
                <Badge className="text-[#7209b7] font-bold" variant="ghost">{job?.salary}LPA</Badge>
            </div>
        </div>
    );
};
