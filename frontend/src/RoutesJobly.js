import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompanyDetail from "./CompanyDetail";
import Profile from "./Profile";
import SignUp from "./SignUp";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import Login from "./Login";
import Home from "./Home";
import JoblyApi from "./api";
import Logout from "./Logout";


function RoutesJobly({user, updateUser}) {
    
    return (
        <Routes>
            <Route exact path="/" element={<Home user={user}/>}/>
            <Route exact path="/profile" element={<Profile user={user} setUser={updateUser} updateUser={JoblyApi.updateUser.bind(JoblyApi)}/>}/>
            <Route exact path="/signup" element={<SignUp addUser={JoblyApi.registerUser.bind(JoblyApi)} updateUser={updateUser}/>}/>
            <Route exact path="/companies" element={<CompanyList user={user} getCompanies={JoblyApi.getCompanies.bind(JoblyApi)}/>}/>
            <Route exact path="/jobs" element={<JobList  user={user} getJobs={JoblyApi.getJobs.bind(JoblyApi)} applyToJob={JoblyApi.applyJob.bind(JoblyApi)}/>}/>
            <Route exact path="/login" element={<Login loginUser={JoblyApi.loginUser.bind(JoblyApi)} updateUser={updateUser}/>}/>
            <Route exact path="/logout" element={<Logout logout={JoblyApi.logout.bind(JoblyApi)} updateUser={updateUser}/>}/>
            <Route path="/companies/:name" element={<CompanyDetail user={user} getCompany={JoblyApi.getCompany.bind(JoblyApi)}/>}/>
            <Route element={<p>Hmmm. I can't seem to find what you want.</p>}/>
        </Routes>
    );
}

export default RoutesJobly;
