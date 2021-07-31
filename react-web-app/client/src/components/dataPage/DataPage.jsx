import React, { Component } from 'react';
import EditComponent from './EditComponent';
import AddComponent from './AddComponent';
import { ReactDOM } from 'react';
export default class DataPage extends Component {


  


  constructor(props)
  {
      super(props);
      
      this.state = {
        data : [],
        mode: "ZERO",
        selectedUser : undefined
    
      }
      this.addDataClick = this.addDataClick.bind(this)
      this.changeDataClick = this.changeDataClick.bind(this)
      this.removeDataClick = this.removeDataClick.bind(this)
      this.handleClick = this.handleClick.bind(this)
  }
    
  
    componentDidMount()
    {
      this.callBackendAPI()
      .then(result => {
        this.setState({
          data: result
        });
      }).
      catch(err=>console.log(err))
    }
  
    

    addDataClick()
    {
      
      this.setState({mode : "ADD"});
    }

    changeDataClick()
    {
      this.setState({mode : "CHG"});
    }
    removeDataClick()
    {
      this.setState({mode : "RMV"});
    }
  
  
    callBackendAPI = async() =>
    {
      const response = await fetch('/express_backend');
      const body =  await response.json();

      if(response.status !== 200)
      {
        throw Error(body.message)
      }
  
      return body
    }


    handleClick(e) 
    {
      var text = e.currentTarget.innerHTML;
      var arrayOfStrings = text.split("-");

    
      var currentUser = {
        name : arrayOfStrings[0],
        age : arrayOfStrings[1],
        university : arrayOfStrings[2]
      }
      this.setState({selectedUser : currentUser});
    }
    
    render()
    {
      let component;
      const mode = this.state.mode;

    
      if(mode=="ZERO")
        component=null
      else if(mode=="RMV")
      {
        component=<div>Select User To Be Deleted</div>
      }
      else if(mode=="CHG")
      {
        component=<EditComponent user={this.state.selectedUser}/>
      }
      else if(mode=="ADD")
      {
        component=<AddComponent />
      }
     
     
      return (
        <div>
          <br/>
          {
            this.state.data.map(user=>
              <div>
              <a href="#" onClick={this.handleClick}>{user.name}-{user.age}-{user.university}</a>
              <br/>
              </div>)
          }
          <br/>
          <button onClick={this.addDataClick}>Add Data</button>
          <button onClick={this.changeDataClick}>Change Data</button>
          <button onClick={this.removeDataClick}> Remove Data</button>
          <div>
            {component}
          </div>
         
       </div>
      );
    }
    
}
  