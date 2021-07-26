import React, { Component } from 'react';

export default class FormComponent extends Component {


  //будет в качестве props получать тип операции с родительского компонента
  constructor(props)
  {
      super(props);
      this.sendToServer = this.sendToServer.bind(this)
      
      this.state = {
        path : "",
    
      }
  }


  sendToServer()
  {

    
    //при срабатывании переходит на страницу appData. Надо, чтоб оставалось здесь
    if(this.props.formMode=="ADD")
    {
      this.setState({path:"/addData"});
    }
    else if(this.props.formMode=="CHG")
    {
      this.setState({path:"/chgData"});
    }
  }
  render()
    {
      return (
        <div>
          {this.props.formMode}
          <form action={this.state.path} method="post">
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
  