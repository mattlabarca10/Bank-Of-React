/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Credits = (props) => {
  // Create the list of Credit items
  const creditsView = () => {
    const { credits } = props;
    return credits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each credits JSON array element
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    });
  }
  return (
    <div>
      <h1>Credits</h1>
      <AccountBalance accountBalance={props.accountBalance} />
      {creditsView()}
      <form onSubmit={props.addCredit}>
        <input type="text" name="description" placeholder="description"/>
        <input type="number" name="amount" placeholder="amount"  step="0.01"/>
        <button type="submit">Add Credit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;