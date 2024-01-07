import React, { useState, useEffect } from "react";
import JoblyApi from "../api";

function CompaniesRoute() {
    const [companies, setCompanies] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getCompanies() {
            try {
                const companyData = await JoblyApi.getCompanies();
                setCompanies(companyData);
            } catch (err) {
                setError(err);
            }
        }
        getCompanies();
    }, []);

    if (error) return <p>Error loading companies.</p>;
    if (!companies) return <p>Loading companies...</p>;

    return (
        <div>
            <h1>Companies</h1>
            <ul>
                {companies.map(company => (
                    <li key={company.handle}>{company.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default CompaniesRoute;
