import { BrowserRouter, Route, useHistory,Switch } from 'react-router-dom';
import './App.css';
import History from './Screen/History';
import Home from './Screen/Home';
import Login from './Screen/Login'
import Signup from './Screen/Signup';
function Router(){
  const his=useHistory()
  if(!localStorage.getItem('user')){
    his.push("/Login")
  }
  return(
    <Switch>
      <Route  component={Login} path="/Login" exact />
      <Route  component={Signup} path="/Signup" exact />
      <Route component={Home} path="/" exact/>
      <Route component={History} path="/history" exact/>
    </Switch>
  )
}
function App() {

  return (
    <BrowserRouter>
    <Router/>
    </BrowserRouter>
  );
}

export default App;
