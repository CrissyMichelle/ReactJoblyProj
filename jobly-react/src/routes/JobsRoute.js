import React, { useState, useEffect } from "react";
import JoblyApi from "../api";

function JobsRoute() {
    const [jobs, setJobs] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getJobs() {
            try {
                const jobData = await JoblyApi.getJobs();
                setJobs(jobData);
            } catch (err) {
                setError(err);
            }
        }
        getJobs();
    }, []);

    if (error) return <p>Error loading jobs.</p>;
    if (!jobs) return <p>Loading jobs...</p>;

    return (
        <div>
            <h1>Jobs</h1>
            <ul>
                {jobs.map(job => (
                    <li key={job.handle}>{job.name}{job.salary}<button>Apply</button></li>
                ))}
            </ul>
        </div>
    );
}

export default JobsRoute;
