import React from 'react';

export default function OneCard({ Onetodo }) {
  return (
    <div className="container d-flex justify-content-center align-item-center" style={{ marginTop: 40 }}>
      <div className="card" style={{ width: '25rem' }}>
        <img src="../колб.jpg" className="card-img-top" alt="деловая колбаса..." />
        <div className="card-body">
          <h5 className="card-title">My toDo</h5>
          <p className="card-text">{Onetodo.title}</p>
        </div>
      </div>
    </div>
  );
}
