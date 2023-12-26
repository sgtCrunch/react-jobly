import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

function Home({user}) {

  let welcome = "SIGN UP NOW"; 

  if(Object.keys(user).length > 0) welcome = "Welcome back, " + user.username;

  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h1 className="font-weight-bold">
              Jobly
            </h1>
            <h4>All the jobs in one, convenient place.</h4>
            <h3>{welcome}</h3>
          </CardTitle>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;