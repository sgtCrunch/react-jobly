import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";


function CompanyCard({company}) {

    return (
    <section>
        <Card>
            <CardBody>
                <CardTitle className="font-weight-bold text-center">
                    <a href={`/companies/${company.handle}`}>{company.name}</a>
                </CardTitle>
                <CardText className="font-italic">
                    {company.description}
                </CardText>
            </CardBody>
        </Card>
    </section>
    );
}

export default CompanyCard;