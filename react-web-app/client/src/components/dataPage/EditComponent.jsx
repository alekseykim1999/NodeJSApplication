import React, { Component } from 'react';

export default class EditComponent extends Component {


  constructor(props)
  {
      super(props);
      this.state = {
        path : "/chgData",
        name:this.props.user.name,
        age:this.props.user.age,
        university:this.props.user.university
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
          <h1>Edit Data</h1>
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
  