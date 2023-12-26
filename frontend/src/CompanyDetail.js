import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import JobCard from "./JobCard";
import JoblyApi from "./api";


function CompanyDetail({user, getCompany}) {

    const [company, setCompany] = useState({});
    const [isLoading, setLoading] = useState(true);

    const {name} = useParams();

    useEffect(() => {
        async function fetchCompany(){
            const c = await getCompany(name);
            setCompany(c);
            setLoading(false);
        }

        fetchCompany();
        
    }, []);

    if(Object.keys(user).length < 1){
        return(<h3 style={{color:"black"}}>Not Authorized</h3>);
    }

    if(isLoading) {
        return (<h3>Loading..</h3>);
    }

    return (
    <section>
        <Card>
            <CardBody>
                <CardTitle className="font-weight-bold text-center">
                    <h2>{company.name}</h2>
                </CardTitle>
                <CardText className="font-italic">
                    {company.description}
                </CardText>
                <h4>Jobs at {company.name}</h4>
                {
                    company.jobs.map(job => {
                        return <JobCard user={user} job={job} applyJob={JoblyApi.applyJob.bind(JoblyApi)} />;
                    })
                }
            </CardBody>
        </Card>
    </section>
    );
}

export default CompanyDetail;