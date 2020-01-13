import React from "react";
import BookCard from "./BookCard";
import SearchBar from "./SearchBar";

class BookList extends React.Component{
    state = {
        filteredBooks: this.props.books,
        allBooks: this.props.books
    }

    componentDidMount(){
        if (this.props.match){
            this.setState({
                allBooks: this.props.books.filter( (book) => book.color === this.props.match.params.bookColor)
            })
        }
    }

    filterBooks = query => {
        query = query.toLowerCase();
        let filteredBooks = this.state.allBooks.filter(book =>
          book.title.toLowerCase().includes(query)
        );
        this.setState({ filteredBooks: filteredBooks });
      };

    render(){
        const bookCards = this.state.allBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ));
      
          return (
            <div>
              <h3>Books</h3>
              <SearchBar onChange={this.filterBooks} />
              <div className="row">{bookCards}</div>
            </div>
          );

    }
}


export default BookList;