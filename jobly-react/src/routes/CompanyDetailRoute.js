import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobList from "../components/JobList";

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
            <img src={company.logoUrl} alt={`${company.name} logo`} />
            <p>
                {company.description}
                <br />
                Number of Employees: {company.numEmployees}
            </p>
            <h3>Available Jobs</h3>
            <JobList jobs={company.jobs} />
        </section>
    );
}

export default CompanyDetailRoute;
