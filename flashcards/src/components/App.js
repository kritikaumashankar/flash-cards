import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../App.css';
import NavBar from './NavBar';
import Home from './Home';
import FlashCards from './FlashCards';
class App extends React.Component {
  render(){
    return(
      <>
        <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/flashcardlist" component={FlashCards} />
          </Switch>
      </>
    )};
}

export default App;
