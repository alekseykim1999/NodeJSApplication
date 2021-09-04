import React, { Component } from 'react';
import EditComponent from './EditComponent';
import AddComponent from './AddComponent';
import { ZERO_MODE, ADD_MODE, RMV_MODE, CHG_MODE } from '../../const/const';
import Button from 'react-bootstrap/Button';
import './DataPage.css';
export default class DataPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      mode: ZERO_MODE,
      selectedUser: undefined

    }

    this.addDataClick = this.addDataClick.bind(this)
    this.changeDataClick = this.changeDataClick.bind(this)
    this.removeDataClick = this.removeDataClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }


  componentDidMount() {
    this.callBackendAPI()
      .then(result => {
        this.setState({
          data: result
        });
      })
      .catch(err => console.log(err))
  }



  addDataClick() {
    this.setState({ mode: ADD_MODE });
  }

  changeDataClick() {
    this.setState({ mode: CHG_MODE });
  }
  removeDataClick() {
    this.setState({ mode: RMV_MODE });
  }


  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body
  }


  handleClick(e) {

    var text = e.currentTarget.querySelector('.Info');
    var currentUser =
    {
      _id: text.querySelector('.StudentId').innerHTML,
      name: text.querySelector('.StudentName').innerHTML,
      age: text.querySelector('.StudentAge').innerHTML,
      university: text.querySelector('.StudentUniv').innerHTML
    }
    this.setState({ selectedUser: currentUser }); 
  }



  async deleteUser(id) {
    if (id !== null && id !== undefined) {

      await fetch("/deleteData/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
      });
      window.location.reload();

    }
    else {
      alert("User Is Not Selected!")
    }



  }

  render() {
    let component;
    const mode = this.state.mode;
    switch (mode) {
      case ADD_MODE:
        component = <AddComponent />
        break;
      case CHG_MODE:
        component = <EditComponent user={this.state.selectedUser} />
        break;
      case RMV_MODE:
        component = <div>
          <label>User To Delete {this.state.selectedUser?._id} ({this.state.selectedUser?.name})</label>
          <br></br>
          <Button className="btn btn-danger" onClick={() => this.deleteUser(this.state.selectedUser?._id)}>Delete</Button>
        </div>
        break;
      default:
        component = null
        break;
    }

    return (
      <div className="DataPage">
        <br />
        <table className="list-group List">
          {
            this.state.data.map(user =>
              <tr className="list-group-item ListItem Student" onClick={this.handleClick} >
                <div className="Info"className="Info">
                <td className="StudentId" hidden>{user._id}</td>
                <td className="StudentName" width="200" >{user.name}</td>
                <td className="StudentAge" width="40">{user.age}</td>
                <td className="StudentUniv" width="40">{user.university}</td>
                </div>
              </tr>)
          }
        </table>
        <br />
        <div className="WorkBlock">
          <Button variant="outline-primary" onClick={this.addDataClick}>Add Data</Button>
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
