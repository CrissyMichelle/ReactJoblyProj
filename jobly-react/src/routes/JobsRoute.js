import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../api";
import JobList from "../components/JobList";
import { AuthContext } from "../components/AuthContext";

function JobsRoute() {
    const { currentUser } = useContext(AuthContext);
    const [jobs, setJobs] = useState(null);
    const [appliedJobs, setAppliedJobs] = useState(new Set());
    const [isLoading, sestIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchJobsAndUserApplications() {
            try {
                const jobData = await JoblyApi.getJobs();
                setJobs(jobData);

                // include applied-to jobs data along w/ user data
                const userData = await JoblyApi.getUser(currentUser);
                const appliedJobIds = new Set(userData.jobs.map(job => job.id));
                setAppliedJobs(appliedJobIds);
            } catch (err) {
                setError(err);
            } finally {
                sestIsLoading(false);
            }
        }
        fetchJobsAndUserApplications();
    }, [currentUser]);

    const handleApply = async (jobId) => {
        if (appliedJobs.has(jobId)) {
            console.log("Already applied to job: ", jobId);
            return;
        }

        try {
            await JoblyApi.applyToJob(currentUser, jobId);
            setAppliedJobs(new Set([...appliedJobs, jobId]));
            console.log("Applied to job", jobId);
        } catch (error) {
            console.error("Error applying to job: ", jobId, error);
        }
    };

    if (error) return <p>Error loading jobs.</p>;
    if (isLoading) return <p>Loading jobs...</p>;

    return (
        <div>
            <h1>Jobs</h1>
            <JobList jobs={jobs} appliedJobs={appliedJobs} handleApply={handleApply} />
        </div>
    );
}

export default JobsRoute;
