/*==================================================
src/components/AccountBalance.js

The AccountBalance component displays account balance. It is included in other page views.
==================================================*/
import React, {Component} from 'react';


class AccountBalance extends Component {
  // Display account balance passed from props rounded to 2 decimal places
  render() {
    return (
      <div>
        <p>Account Balance: ${this.props.accountBalance.toFixed(2)}</p>
      </div>
    );
  }
}

export default AccountBalance;