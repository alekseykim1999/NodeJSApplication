import React, { Component } from 'react';
import FormComponent from './FormComponent';

export default class DataPage extends Component {


  


  constructor(props)
  {
      super(props);
      
      this.state = {
        data : [],
        mode: "ZERO"
    
      }
      this.addDataClick = this.addDataClick.bind(this)
      this.changeDataClick = this.changeDataClick.bind(this)
      this.removeDataClick = this.removeDataClick.bind(this)
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

    
    render()
    {
      let component;
      const mode = this.state.mode;

    
      if(mode=="ZERO")
        component=null
      else
      {
          component=<FormComponent formMode={this.state.mode}/>
      }
     
      return (
        <div>
         
          {
            this.state.data.map(user=>
              <h1>{user.name}  {user.age} {user.university}</h1>)
          }
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
  