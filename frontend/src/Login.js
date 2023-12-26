import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
  } from "reactstrap";
  



/** Form for loging in user.
 *
 * Has state for the info of the user; on submission,
 * sends {user} to fn rec'd from parent
 *
 */

const Login = ({ loginUser, updateUser }) => {
    const [formData, setFormData] = useState({});

    const navigate = useNavigate();

  
    /** Send {item} to parent
     *    & clear form. */
  
    const handleSubmit = async evt => {
      evt.preventDefault();
      const user = await loginUser(formData);
      localStorage.setItem("token", user.token);
      localStorage.setItem("username", user.username);
      updateUser(user);
      navigate(`/`);
    };
  
    /** Update local state w/curr state of input elem */
  
    const handleChange = evt => {
      const { name, value }= evt.target;
      setFormData(fData => ({
        ...fData,
        [name]: value
      }));
    };
  
    /** render form */
  
    return (

        <section className="col-md-4">
        <Card>
            <CardBody>
            <CardTitle className="font-weight-bold text-center">
                Login
            </CardTitle>
                <form onSubmit={handleSubmit}>

                    <br/>
                    <input
                        type="Text"
                        id="username"
                        name="username"
                        value={formData.info}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
                    <br/>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.info}
                        placeholder="password"
                        onChange={handleChange}
                        required
                    />
                    <br/><br/>
                    <button>Add</button>
                </form>
            </CardBody>
        </Card>
        </section>
      
    );
  };
  
  export default Login;
  