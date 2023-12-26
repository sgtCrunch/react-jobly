import {React, useEffect, useState} from "react";
import { Navigate, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import CompanyCard from "./CompanyCard";


function CompanyList({user, getCompanies}) {
    const [formData, setFormData] = useState({});
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        refreshCompanies();
    }, []);

    if(Object.keys(user).length < 1){
        return(<h3 style={{color:"black"}}>Not Authorized</h3>);
    }

    async function refreshCompanies(search={}) {
        let comp = await getCompanies(search);
        setCompanies(comp);
    }

    /** Send {item} to parent
     *    & clear form. */
  
    const handleSubmit = async evt => {
        evt.preventDefault();
        await refreshCompanies(formData);
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
                    Companies
                </CardTitle>

                <form onSubmit={handleSubmit}>
                    <input
                        type="Text"
                        id="name"
                        name="name"
                        value={formData.info}
                        placeholder="Enter Company Name"
                        onChange={handleChange}
                        required
                    />
                    <button>Search</button>
                </form>
                <br/><br/>
                {
                    companies.map(company => {
                        return <CompanyCard company={company} />;
                    })
                }
            </CardBody>
        </Card>
    </section>
    );
}

export default CompanyList;