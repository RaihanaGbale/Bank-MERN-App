import React, { Component } from 'react'

class Transaction extends Component {
    data = this.props.data
    deleteTransaction = () => this.props.deleteTransaction(data._id)
    render() {
        return (<div className="transaction">
            <div>{data.vendor}</div>
            <div>{data.amount}</div>
            <div>{data.category}</div>
            <button onClick={this.deleteTransaction}>
                Delete
            </button>
        </div>)
    }
}

export default Transaction