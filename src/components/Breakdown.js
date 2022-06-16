import React, { Component } from 'react';

class Breakdown extends Component {
    /*  constructor() {
         super()
         this.state = {
                 food: 0
             }    
        }
    

     breakdown= async ()=>{
         let categories = {...this.state.categories}
         console.log(this.props.data)
         await this.props.data.forEach(d=>{
             console.log(d.amount)
             if(categories[d.category]){
             this.setState({
                 [d.category] : [categories[d.category] + d.amount]
                 })}
                 else{
                 categories[d.category]=d.amount
                 this.setState({
                 categories
                 })}}
               )
     }

     async componentDidMount(){
      await this.breakdown()
     } */

    render() {
        console.log(this.props.categories)

        return <div id="breakdown">
            <h3>Breakdown:</h3>
            {Object.keys(this.props.categories).
                map(c => <div key={c}>{c}:
                    {this.props.categories[c]}</div>)}

        </div>
    }
}

export default Breakdown