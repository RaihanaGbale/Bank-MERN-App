import React, { Component } from 'react';
import './App.css';
import Transactions from './components/Transactions';
import Operations from './components/Operations';
import Axios from 'axios';
import InsufficientFunds from './components/InsufficientFunds';
import Breakdown from './components/Breakdown';

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      balance: 0,
      insufficientFunds: false,
      categories: {}
    }
  }

  async getTransactions() {
    const response = await Axios.get("http://localhost:8080/transactions")
    let amounts = response.data.map(d => d.amount)
    let balance = amounts.reduce(function (total, num) { return total + num }, 0)
    let categories = this.breakdown(response.data)
    this.setState({
      data: response.data,
      balance,
      categories
    })
  }

  async componentDidMount() {
    await this.getTransactions()
  }


  changeStatus = (param) => {
    let insufficientFunds = insufficientFunds
    this.setState({
      insufficientFunds: param
    })
  }
  pushTransaction = async (trans) => {
    await Axios.post(`http://localhost:7899/transaction`, trans)
    this.getTransactions()
  }

  getClassName = (num) => {
    if (num > 0) {
      return "positive"
    }
    else return "negative"
  }

  breakdown = (data) => {
    console.log(data)
    let categories = { ...this.state.categories }
    data.forEach(d => {
      if (categories[d.category]){   
        console.log(categories[d.category])
      categories[d.category]= Number(categories[d.category]) + Number(d.amount) }
      else{
      categories[d.category] = Number(d.amount)
      }})
    return categories
  }

  render() {
    return (
      <div id="app">
        <h1 id="balance" className={this.getClassName(this.state.balance)}>Balance: ${this.state.balance}</h1>
        <Transactions data={this.state.data} getClassName={this.getClassName} />
        <Breakdown categories={this.state.categories} />
      </div>
    )
  }
}

export default App;