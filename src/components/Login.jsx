import React from 'react';

export default function Login() {
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
    });
    if (response.ok) {
      window.location.href = '/';
    }
  };
  return (
    <div className="container" style={{ marginTop: 65, width: 300 }}>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputLogin" className="form-label">Name:</label>
          <input name="name" type="text" className="form-control" id="exampleInputLogin" placeholder="Enter your name" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password:</label>
          <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter your password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
