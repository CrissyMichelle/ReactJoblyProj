import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";

function CompanyDetailRoute() {
    const { handle } = useParams();

    const [company, setCompany] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function getCompany() {
            try{
                let companyData = await JoblyApi.getCompany(handle);

                if (isMounted) {
                    setCompany(companyData);
                }
            } catch (error) {
                console.log(error);
                setErrors(error);
            }
        }
        getCompany();

        return () => {
            isMounted = false;
        };
    }, [handle]);

    if (errors) return <p>Error loading company details.</p>;
    if (!company) return <p>Loading... ...</p>;

    return(
        <section>
            <h2>{company.name}</h2>
            <p>
                {company.description}
            </p>
            <h3>Available Jobs</h3>
                <ul>
                    {company.jobs.map((job, index) => (
                        <li key={index}>{job.title}{job.salary}<button>Apply</button></li>
                    ))}
                </ul>
        </section>
    );
}

export default CompanyDetailRoute;
