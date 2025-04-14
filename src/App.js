/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  
    super(); 
    this.state = {
      accountBalance: 0.00,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  componentDidMount() {
    fetch("https://johnnylaicode.github.io/api/credits.json")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ creditList: data }, this.updateAccountBalance);
      });

    fetch("https://johnnylaicode.github.io/api/debits.json")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ debitList: data }, this.updateAccountBalance);
      });
  }

  handleLogin = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  updateAccountBalance = () => {
    const totalCredit = this.state.creditList.reduce((sum, credit) => sum + credit.amount, 0);
    const totalDebit = this.state.debitList.reduce((sum, debit) => sum + debit.amount, 0);
    const newBalance = totalCredit - totalDebit;
    this.setState({accountBalance: newBalance});
  };

  // Add a new credit
  addCredit = (event) => {
    event.preventDefault();
    const newCredit = {
      id: Date.now(),
      amount: parseFloat(event.target.amount.value),
      description: event.target.description.value,
      date: new Date().toISOString(),
    };
    this.setState((prevState) => ({
      creditList: [...prevState.creditList, newCredit],
    }), this.updateAccountBalance);
  };

  // Add a new debit
  addDebit = (event) => {
    event.preventDefault();
    const newDebit = {
      id: this.state.debitList.length + 1,
      amount: parseFloat(event.target.amount.value),
      description: event.target.description.value,
      date: new Date().toISOString(),
    };
    this.setState((prevState) => ({
      debitList: [...prevState.debitList, newDebit],
    }), this.updateAccountBalance);
  };

  render() {  
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit} accountBalance={this.state.accountBalance}/>) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance}/>) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/Bank-Of-React">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;