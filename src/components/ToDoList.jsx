import React, { useState } from 'react';
import Card from './Card';

export default function ToDoList({ allPosts, user }) {
  const [allCards, setAllCards] = useState(allPosts || []);
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    // console.log('8888888888', user.id);
    e.preventDefault();
    const response = await fetch(`/new/${user.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
    });
    const result = await response.json();
    setAllCards((prev) => ([...prev, result]));
    e.target.reset();
  };

  const deleteHandler = async (e, id, userId) => {
    e.preventDefault();
    const response = await fetch(`/delete/${id}/${userId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setAllCards((prev) => prev.filter((el) => el.id !== id));
    } else {
      const data = await response.json();
      // console.log('sfdggbf', data);
      setError(data.message);
    }
  };

  const submitOneHandler = async (e, id) => {
    e.preventDefault();
    const response = await fetch(`/oneCard/${id}`, {
      method: 'GET',
    });
    window.location.href = `/oneCard/${id}`;
  };
  return (
    <>
      <div className="container mt-5">
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputText" className="form-label" style={{ color: 'white' }}>ToDo:</label>
            <input name="title" type="text" defaultValue="" className="form-control" id="exampleInputText" placeholder="Enter ToDo" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      <div className="container mt-5">
        <div className="row">
          {allCards && allCards?.map((el) => <Card deleteHandler={deleteHandler} error={error} submitOneHandler={submitOneHandler} user={user} el={el} key={el.id} />)}
        </div>
      </div>
    </>
  );
}
