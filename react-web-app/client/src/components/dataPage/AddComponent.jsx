import React from 'react';

export default function AddComponent() {
  
  function AddFormListener(e)
  {
    e.preventDefault();
    const form = document.forms["AddForm"];
    const name = form.elements["NumOne"].value;
    const age = form.elements["NumTwo"].value;
    const university = form.elements["NumThree"].value;
    CreateUser(name, age, university);
  }


  async function CreateUser(userName, userAge, userUniversity) 
  {
    const response = await fetch("/addData", 
    {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            name: userName,
            age: parseInt(userAge, 10),
            university: userUniversity
        })
    });
    if (response.ok === true) 
    {
        window.location.reload();
    }
  }


  return (
        <div>
          <label>Add Data</label>
          <form name="AddForm" onSubmit={AddFormListener}>
            <label>Name</label><br/>
            <input type="text" name="NumOne" /><br/><br/>
            <label>Age</label><br/>
            <input type="number" name="NumTwo" /><br/><br/>
            <label>University</label><br/>
            <input type="text" name="NumThree" /><br/><br/>
            <input type="submit" value="Add Student" className="btn btn-dark"/>
          </form>
       </div>
  );
}
  