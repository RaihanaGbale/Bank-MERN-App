import React, { Component } from 'react'
import Transaction from './Transaction';

class Transactions extends Component {
    render() {
        const data = this.props.data
        return (<div id="transactionsList">
            {data.map(d =>
                <Transaction key={d.amount}
                    data={d}
                    getClassName={this.props.getClassName} />)}
        </div>)
    }
}

export default Transactions
