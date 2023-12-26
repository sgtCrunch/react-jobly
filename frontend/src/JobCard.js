import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";


function JobCard({user, job, applyJob}) {

    const [disabled, setDisabled] = useState(() => {
        
        if(user.applications.length > 0 && user.applications.find(j => j === job.id)){
            return [true, "Applied"];
        }
        return [false, "Apply"];
    });

    async function applyToJob() {
        await applyJob(job.id);
        setDisabled([true, "Applied"]);
    }

    return (
    <section>
        <Card>
            <CardBody>
                <CardTitle className="font-weight-bold text-center">
                    {job.title}
                </CardTitle>
                <CardText className="font-italic">
                    test {job.companyName}
                </CardText>
                <br/>
                <br/>
                Salary: {job.salary}
                <br/>
                Equity: {job.equity}
                <br/>
                <br/>
                <button onClick={applyToJob} disabled={disabled[0]}>{disabled[1]}</button>
            </CardBody>
        </Card>
    </section>
    );
}

export default JobCard;