import {React, useEffect, useState} from "react";
import { Navigate, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import JobCard from "./JobCard";


function JobList({user, getJobs, applyToJob}) {

    const [formData, setFormData] = useState({});
    const [jobs, setJobs] = useState([]);

    

    useEffect(() => {
        refreshJobs();
    }, []);

    if(Object.keys(user).length < 1){
        return(<h3 style={{color:"black"}}>Not Authorized</h3>);
    }

    async function refreshJobs(search={}) {
        let tempJobs = await getJobs(search);
        setJobs(tempJobs);
    }

    /** Send {item} to parent
     *    & clear form. */
  
    const handleSubmit = async evt => {
        evt.preventDefault();
        await refreshJobs(formData);
    };
    
      /** Update local state w/curr state of input elem */
    
    const handleChange = evt => {
        const { name, value }= evt.target;
            setFormData(fData => ({
                ...fData,
                [name]: value
            }));
    };

    return (
    <section>
        <Card>
            <CardBody>
                <CardTitle className="font-weight-bold text-center">
                    Jobs
                </CardTitle>

                <form onSubmit={handleSubmit}>
                    <input
                        type="Text"
                        id="title"
                        name="title"
                        value={formData.info}
                        placeholder="Enter job title"
                        onChange={handleChange}
                        required
                    />
                    <button>Search</button>
                </form>
                <br/><br/>
                {
                    jobs.map(job => {
                        return <JobCard user={user} applyJob={applyToJob} job={job} />;
                    })
                }
            </CardBody>
        </Card>
    </section>
    );
}

export default JobList;