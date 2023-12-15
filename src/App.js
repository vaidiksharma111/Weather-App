import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './components/Login';
import Register from './components/Register';
import Detail from './components/Detail';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/detail" component={Detail} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
