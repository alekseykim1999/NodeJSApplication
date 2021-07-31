import React, { Component } from 'react';

export default class AddComponent extends Component {


  constructor(props)
  {
      super(props);
      this.state = {
        path : "/addData",
        name:"",
        age:"",
        university:""
      }
      this.onTodoChange = this.onTodoChange.bind(this)
  }

  
  onTodoChange(event) 
  {
        this.setState({name: event.target.value});
  }

  render()
  {
      return (
        <div>
          <h1>Add Data</h1>
          <form action={this.state.path} method="post">
            <label>Name</label><br/>
            <input type="text" name="NumOne" onChange={this.onTodoChange} value={this.state.name}/><br/><br/>
            <label>Age</label><br/>
            <input type="number" name="NumTwo" /><br/><br/>
            <label>University</label><br/>
            <input type="text" name="NumThree" /><br/><br/>
            <input type="submit" value="Send" />
          </form>
       </div>
      );
    }
    
}
  