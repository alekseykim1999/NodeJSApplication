import React, { Component } from 'react';

export default class FormComponent extends Component {


  //будет в качестве props получать тип операции с родительского компонента
  constructor(props)
  {
      super(props);
      this.sendToServer = this.sendToServer.bind(this)
    
  }


  sendToServer()
  {
    if(this.props.formMode=="ADD")
    {

      alert("Will Add")
      //логика по отправке запроса к серверу на добавление
    }
    else if(this.props.formMode=="CHG")
    {
      alert("Will Change")
      //логика по отправке запроса к серверу на изменение
    }
  }
  render()
    {
      return (
        <div>
          {this.props.formMode}
          <input type="text"/>
          <input type="text"/>
          <input type="text"/>
          <button onClick={this.sendToServer}>Save</button>
       </div>
      );
    }
    
}
  