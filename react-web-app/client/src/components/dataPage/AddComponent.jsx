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
      
  }

  
 
  render()
  {
      return (
        <div>
          <h1>Add Data</h1>
          <form action={this.state.path} method="post">
            <label>Name</label><br/>
            <input type="text" name="NumOne" /><br/><br/>
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
  