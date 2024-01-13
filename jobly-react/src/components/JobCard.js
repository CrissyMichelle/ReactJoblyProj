import React from "react";

function JobCard({ job, handleApply, hasApplied }) {
    return (
        <li>
            {job.title} - Salary: {job.salary}
            <button
                onClick={() => handleApply(job.id)}
                disabled={hasApplied}
            >
                {hasApplied? "Applied" : "Apply"}
            </button>
        </li>
    );
}

export default JobCard;
