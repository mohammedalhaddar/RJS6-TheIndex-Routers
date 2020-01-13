import React, { Component } from "react";

// Components
import AuthorCard from "./AuthorCard";
import SearchBar from "./SearchBar";

class AuthorsList extends Component {
  state = {
    filteredAuthors: this.props.authors
  };

  filterAuthors = query => {
    query = query.toLowerCase();
    let filteredAuthors = this.props.authors.filter(author =>
      `${author.first_name} ${author.last_name}`.toLowerCase().includes(query)
    );
    this.setState({ filteredAuthors: filteredAuthors });
  };  

  render() {
    const authorCards = this.state.filteredAuthors.map(author => (
      <AuthorCard key={author.id} author={author} />
    ));

    return (
      <div>
        <h3>Authors</h3>
        <SearchBar onChange={this.filterAuthors} />
        <div className="row">{authorCards}</div>
      </div>
    );
  }
}

export default AuthorsList;
