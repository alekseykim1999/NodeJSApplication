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

    //сохранить путь POST запроса здесь
    //при срабатывании переходит на страницу appData. Надо, чтоб оставалось здесь
    if(this.props.formMode=="ADD")
    {
      //логика по отправке запроса к серверу на добавление
    }
    else if(this.props.formMode=="CHG")
    {
      //логика по отправке запроса к серверу на изменение
    }
  }
  render()
    {
      return (
        <div>
          {this.props.formMode}
          <form action="/addData" method="post">
            <label>Поле 1</label><br/>
            <input type="text" name="NumOne" /><br/><br/>
            <label>Поле 2</label><br/>
            <input type="number" name="NumTwo" /><br/><br/>
            <input type="submit" value="Send" onClick={this.sendToServer} />
          </form>
       </div>
      );
    }
    
}
  