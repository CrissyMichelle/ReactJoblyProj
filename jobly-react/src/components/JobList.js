import React, { useState, useContext } from "react";
import JobCard from "./JobCard";
import JoblyApi from "../api";
import { AuthContext } from "./AuthContext";

function JobList({ jobs, appliedJobs, handleApply }) {
    return (
        <ul>
            {jobs.map((job) => (
                <JobCard
                    key={job.id}
                    job={job}
                    handleApply={handleApply}
                    hasApplied={appliedJobs.has(job.id)}
                />
            ))}
        </ul>
    );
}

export default JobList;
