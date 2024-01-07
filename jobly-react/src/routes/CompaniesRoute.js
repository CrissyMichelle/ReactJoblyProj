import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import CompanyCard from "../components/CompanyCard";

function CompaniesRoute() {
    const [companies, setCompanies] = useState(null);
    // search and filter state managed locally
    const [searchTerm, setSearchTerm] = useState("");
    const [minEmployees, setMinEmployees] = useState("");
    const [maxEmployees, setMaxEmployees] = useState("");

    const [error, setError] = useState(null);

    function handleSearch(event) {
        event.preventDefault();
        fetchCompanies(); // makes the API call onSubmit
    };

    const fetchCompanies = async () => {
        try {
            const filters = {
                nameLike: searchTerm || undefined,
                minEmployees: minEmployees !== "" ? parseInt(minEmployees) : undefined,
                maxEmployees: maxEmployees !== "" ? parseInt(maxEmployees) : undefined
            };
            const companyData = await JoblyApi.getCompanies(filters);
            console.log(companyData);
            setCompanies(companyData);
        } catch (err) {
            console.error("API Error: ", err);
            setError(err);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []); // run effect on initial mounting of component

    if (error) return <p>Error loading companies.</p>;
    if (!companies) return <p>Loading companies...</p>;

    return (
        <div>
            <h1>Companies</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search companies by name"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Minimum number of employees"
                    value={minEmployees}
                    onChange={e => setMinEmployees(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Maximum number of employees"
                    value={maxEmployees}
                    onChange={e => setMaxEmployees(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <div>
                {companies.map(company => (
                    <CompanyCard key={company.handle} company={company} />
                ))}
            </div>
        </div>
    );
}

export default CompaniesRoute;
