import React from "react";
import JobCard from "./JobCard";

function JobList({ jobs }) {
    return (
        <ul>
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
            ))}
        </ul>
    );
}

export default JobList;
