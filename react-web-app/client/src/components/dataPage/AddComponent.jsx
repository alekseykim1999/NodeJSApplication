import React, { Component } from 'react';

export default function AddComponent() {
  
  function AddFormistener(e)
  {
    e.preventDefault();
    const form = document.forms["AddForm"];
    const name = form.elements["NumOne"].value;
    const age = form.elements["NumTwo"].value;
    const university = form.elements["NumThree"].value;
    CreateUser(name, age, university);
  }


  async function CreateUser(userName, userAge, userUniversity) {
  
    const response = await fetch("/addData", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            name: userName,
            age: parseInt(userAge, 10),
            university: userUniversity
        })
    });
    if (response.ok === true) {
        const user = await response.json();
        window.location.reload();
    }
  }
  return (
        <div>
          <h1>Add Data</h1>
          <form name = "AddForm" onSubmit={AddFormistener}>
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
  