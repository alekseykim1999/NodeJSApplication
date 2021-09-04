import React from 'react';

const EditComponent = (props) => {

  function EditFormListener(e)
  {
    e.preventDefault();
    const form = document.forms["EditForm"];
    const name = form.elements["NumOne"].value;
    const age = form.elements["NumTwo"].value;
    const university = form.elements["NumThree"].value;
    const id = props.user?._id;
    EditUser(id, name, age, university);
  }


  async function EditUser(id, userName, userAge, userUniversity) 
  {

    if(id!==null && id!==undefined)
    {
      const response = await fetch("/chgData/" + id, 
      {
          method: "PUT",
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
    else{
      alert("User Is Not Selected!")
    }
  
  }


  return (
        <div>
          <label>Edit Data for ID {props.user?._id} ({props.user?.name})</label>
          <form name="EditForm" onSubmit={EditFormListener}>
            <label>Name</label><br/>
            <input type="text" name="NumOne" defaultValue={props.user?.name} 
            /><br/><br/>
            <label>Age</label><br/>
            <input type="number" name="NumTwo" defaultValue={props.user?.age}/><br/><br/>
            <label>University</label><br/>
            <input type="text" name="NumThree" defaultValue={props.user?.university}/><br/><br/>
            <input type="submit" value="Edit Student" className="btn btn-success" />
          </form>
       </div>
  );
    
}

export default EditComponent;
  