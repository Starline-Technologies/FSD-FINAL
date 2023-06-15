import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import bg from './img/bg.png';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
// import SignUp from './Components/SignUp/SignUp';
// import SignIn from './Components/SignIn/SignIn';
import { useGlobalContext } from './context/globalContext';
import SignupPage from './Components/Authentication/SignUp';
import SignInForm from './Components/Authentication/SignInForm';
import AdminPage from './Components/Authentication/Admin';
import AdminDas from './Components/Authentication/AdminDas';

import Navbar from './Components/Authentication/NavBar';

function App() {
  const [active, setActive] = useState(1);

  const global = useGlobalContext();
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (

    
    <Router>
      <Navbar />
      <Switch>
      <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/signin">
          <SignInForm />
        </Route>
        <Route path="/admin" exact component={AdminPage} />
        <Route path="/admin/dashboard" component={AdminDas} />

      
        <Route path="/">
          <DashboardStyled bg={bg} className="App">
            {orbMemo}
            <MainLayout>
              <Navigation active={active} setActive={setActive} />
              <main>
                {displayData()}
              </main>
            </MainLayout>
          </DashboardStyled>
        </Route>
      </Switch>
    </Router>
  );
}

const DashboardStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
