import React from "react";
import { Link } from "react-router-dom";

function CompanyCard( { company }) {
    return (
        <div className="company-card">
            <img src={company.logoUrl} alt={`${company.name} logo`} />
            <Link to={'/companies/${company.handle}'}>
                <h2>{company.name}</h2>
            </Link>
            <p>{company.description}</p>
            <p>Number of Employees: {company.numEmployees}</p>
        </div>
    )
}

export default CompanyCard;
