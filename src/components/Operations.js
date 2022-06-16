import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Transaction from './Transaction';


class Operations extends Component {
    constructor() {
        super()
    }


    render() {
        let accountData = this.props.accountData
        return (
            <div className='operationsDesign center'>
                <h1 >Insert Transactions</h1>
                <div>
                    <input className='inputDesign' value={this.props.searchedWord} onChange={this.props.updateSearched} placeholder="Transaction Amount"></input>
                </div>
                <div>
                    <input className='inputDesign' value={this.props.searchedWord} onChange={this.props.updateSearched} placeholder="Transaction Vendor"></input>
                </div>
                <div>
                    <input className='inputDesign' value={this.props.searchedWord} onChange={this.props.updateSearched} placeholder="Transaction Category"></input>
                </div>
                <div className='buttons'>
                <button id='depositButton' name='add' onClick={this.pushTransaction}>Deposit</button>
                <button id='withdrawButton'  name='substract' onClick={this.pushTransaction}>Withdraw</button>
                </div>
            </div>
        )
    }
}

export default Operations;            