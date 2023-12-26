import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import RoutesJobly from './RoutesJobly';
import JoblyApi from './api';
import { createContext, useEffect, useState } from 'react';


function App() {

  const [user, setUser] = useState({});

  useEffect(()=>{

    async function getUser() {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      const u = await JoblyApi.refreshLogin.bind(JoblyApi)(token, username);
      setUser(u);
    }

    if(localStorage.getItem("token")) getUser();
    
  }, []);


  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={user}/>
        <main>
          <RoutesJobly user={user} updateUser={setUser} />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
