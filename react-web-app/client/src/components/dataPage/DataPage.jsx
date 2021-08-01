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
        _id :arrayOfStrings[0],
        name : arrayOfStrings[1],
        age : arrayOfStrings[2],
        university : arrayOfStrings[3]
      }
      this.setState({selectedUser : currentUser});
    }
    


    async deleteUser(id)
    {

      if(id!=null && id!=undefined)
      {
        const response = await fetch("/deleteData/" + id, {
          method: "DELETE",
          headers: { "Accept": "application/json" }
        }); 
      }
      else{
        alert("Выберите пользователя")
      }
     
    
        
    }
    render()
    {
      let component;
      const mode = this.state.mode;

    
      if(mode=="ZERO")
        component=null
      else if(mode=="RMV")
        component=<div>
          <h1>User To Delete - {this.state.selectedUser?._id}</h1>
          <button onClick={() => this.deleteUser(this.state.selectedUser?._id)}>Delete</button>
          </div>
      else if(mode=="CHG")
        component=<EditComponent user={this.state.selectedUser}/>
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
              <a href="#" onClick={this.handleClick}>{user._id}-{user.name}-{user.age}-{user.university}</a>
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
  