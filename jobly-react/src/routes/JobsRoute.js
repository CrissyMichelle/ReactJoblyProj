import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import JobList from "../components/JobList";

function JobsRoute() {
    const [jobs, setJobs] = useState(null);
    const [isLoading, sestIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchJobs() {
            try {
                const jobData = await JoblyApi.getJobs();
                setJobs(jobData);
            } catch (err) {
                setError(err);
            } finally {
                sestIsLoading(false);
            }
        }
        fetchJobs();
    }, []);

    if (error) return <p>Error loading jobs.</p>;
    if (isLoading) return <p>Loading jobs...</p>;

    return (
        <div>
            <h1>Jobs</h1>
            <JobList jobs={jobs} />
        </div>
    );
}

export default JobsRoute;
