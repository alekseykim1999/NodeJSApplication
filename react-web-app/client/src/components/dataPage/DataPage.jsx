import React, { Component } from 'react';
import EditComponent from './EditComponent';
import AddComponent from './AddComponent';
import { ReactDOM } from 'react';
import { ZERO_MODE, ADD_MODE, RMV_MODE, CHG_MODE } from '../../const/const';
import Button from 'react-bootstrap/Button';
import './DataPage.css';
export default class DataPage extends Component 
{

  constructor(props)
  {
      super(props);
      
      this.state = {
        data : [],
        mode: ZERO_MODE,
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
      this.setState({mode : ADD_MODE});
    }

    changeDataClick()
    {
      this.setState({mode : CHG_MODE});
    }
    removeDataClick()
    {
      this.setState({mode : RMV_MODE});
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
      var currentUser = 
      {
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
        window.location.reload();
      
      }
      else
      {
        alert("User Is Not Selected!")
      }
     
    
        
    }

    render()
    {
      let component;
      const mode = this.state.mode;
      switch (mode) {
        case ADD_MODE:
          component=<AddComponent/>
          break;
        case CHG_MODE:
          component=<EditComponent user={this.state.selectedUser}/>
          break;
        case RMV_MODE:
          component=<div>
                      <label>User To Delete {this.state.selectedUser?._id}</label>
                      <br></br>
                        <Button className="btn btn-danger" onClick={() => this.deleteUser(this.state.selectedUser?._id)}>Delete</Button>
                    </div>
          break;
        default:
          component=null
          break;
      }

      return (
        <div className="DataPage">
          <br/>
          <ul className="list-group List">
          {
            this.state.data.map(user=>
              <li className="list-group-item ListItem">
                <a className="Student" href="#" onClick={this.handleClick}>{user._id}-{user.name}-{user.age}-{user.university}</a>
              </li>)
          }
          </ul>
          <br/>
          <div className="WorkBlock">
            <Button variant="outline-primary"onClick={this.addDataClick}>Add Data</Button>
            <Button variant="outline-primary" onClick={this.changeDataClick}>Change Data</Button>
            <Button variant="outline-primary" onClick={this.removeDataClick}> Remove Data</Button>
          </div>
          <div className="FormBlock">
            {component}
          </div>
       </div>
      );
    } 
}
  