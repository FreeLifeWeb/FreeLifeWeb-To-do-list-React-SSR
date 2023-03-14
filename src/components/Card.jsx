import React, { useState } from 'react';

export default function Card({
  user, error, el, deleteHandler, submitOneHandler,
}) {
  const [edit, SetEdit] = useState(false);
  const [input, setInput] = useState('' || el.title);
  const [status, setStatus] = useState(el.status);
  // console.log(error);
  const changeStatus = () => {
    SetEdit(!edit);
  };

  const handlerChange = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = async (e, userId) => {
    e.preventDefault();
    const response = await fetch(`/edit/${el.id}/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });
    const data = await response.json();
    // console.log(data);
    if (response) {
      setInput(data.title);
      SetEdit(!edit);
    }
  };

  const changeToDoSt = async (e) => {
    e.preventDefault();
    const response = await fetch(`/status/${el.id}`, {
      method: 'POST',
    });
    if (response.ok) {
      setStatus(!status);
    }
  };

  return (
    <div className="col mb-5">
      <div className="card" style={{ width: '18rem' }}>
        <p style={{ margin: 10, color: 'red' }}>
          #id-client:
          {' '}
          {el.userId}
        </p>
        <img src="./колб.jpg" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">My toDo</h5>
          <p className="card-text" style={{ textDecoration: !status ? 'none' : 'line-through' }}>{input}</p>
          <p style={{ color: 'red' }}>{error}</p>
          {!edit ? (
            <>
              <button type="button" onClick={(e) => submitOneHandler(e, el.id)} className="btn btn-primary" style={{ marginRight: 7 }}>More</button>
              <button type="button" onClick={changeStatus} className="btn btn-info" style={{ marginRight: 7 }}>Edit</button>
              {user.id !== el.userId ? (<button type="button" className="btn btn-danger disable" onClick={(e) => deleteHandler(e, el.id, el.userId)} disabled style={{ marginRight: 7 }}>Delete</button>) : (<button type="button" className="btn btn-danger" onClick={(e) => deleteHandler(e, el.id, el.userId)} style={{ marginRight: 7 }}>Delete</button>)}
              <button type="button" onClick={changeToDoSt} className="btn" style={{ backgroundColor: !status ? 'green' : 'red' }}>V</button>
            </>
          )
            : (
              <form onSubmit={(e) => submitHandler(e, el.userId)}>
                <input type="text" className="form-control" name="title" value={input} onChange={handlerChange} aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Save</button>
              </form>
            )}
        </div>
      </div>
    </div>
  );
}
