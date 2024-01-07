import React from "react";

function JobCard( {job }) {
    return (
        <li>
            {job.title} - Salary: {job.salary}
            <button>Apply</button>
        </li>
    );
}

export default JobCard;
