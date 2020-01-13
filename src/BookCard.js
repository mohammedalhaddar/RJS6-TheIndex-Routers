import React from "react";
import { Link } from "react-router-dom";

function BookCard(props) {
  const book = props.book;

  return (
    <div className="col-lg-4 col-md-6 col-12">
        <span>Authors: </span>
        {
            book.authors.map(( auth, index) => <Link key={index} style={{padding: "5px"}} to={`/authors/${auth.id}`}>{auth.name}</Link>) 
        }
        <div className="card-body">
          <h5 className="card-title">
            <span>{book.title}</span>
          </h5>
          <Link to={`/books/${book.color}`} ><small className="card-text">{book.color}</small></Link>
        </div>
    </div>
  );
}

export default BookCard;
