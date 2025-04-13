/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
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

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  updateAccountBalance = () => {
    const totalCredit = this.state.creditList.reduce((sum, credit) => sum + credit.amount, 0);
    const totalDebit = this.state.debitList.reduce((sum, debit) => sum + debit.amount, 0);
    const newBalance = this.state.accountBalance + totalCredit - totalDebit;
    this.setState({accountBalance: newBalance});
  };

  // Add a new credit item to the list of credits
  addCredit = (event) => {
    event.preventDefault();
    const newCredit = {
      id: this.state.creditList.length + 1,
      amount: parseFloat(event.target.amount.value),
      description: event.target.description.value,
      date: new Date().toISOString(),
    };
    this.setState((prevState) => ({
      creditList: [...prevState.creditList, newCredit],
    }), this.updateAcctBalance);
  };

  // Add a new debit item to the list of debits
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
    }), this.updateAcctBalance);
  };

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
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