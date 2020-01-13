import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import BookList from "./BookList";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class App extends Component {
  state = {
    authors: [],
    books: [],
    loadingAuths: true,
    loadingBooks: true
  };

  fetchAllAuthors = async () => {
    const res = await instance.get("/api/authors/");
    return res.data;
  };

  async componentDidMount() {
    try {
      const authors = await this.fetchAllAuthors();
      this.setState({
        authors: authors,
        loadingAuths: false
      });
    } catch (err) {
      console.error(err);
    }

    try{
      let books = await axios.get("https://the-index-api.herokuapp.com/api/books/")
      books = books.data;
      this.setState({
        books: books,
        loadingBooks: false
      })

    }catch(err){
      console.log(err);
    }
  }

  getContentView = () => {
    if (this.state.loadingAuths || this.state.loadingBooks) {
      return <Loading />;
    } else {
      return (
        <Switch>
          <Redirect exact from="/" to="/authors" />
          <Route exact path="/books" render={() => <BookList key={0} books={this.state.books}></BookList> }></Route>
          <Route exact path="/books/:bookColor" render= {(props) => <BookList key={1} {...props} books={this.state.books}></BookList> }/>
          <Route path="/authors/:authorID" component={AuthorDetail} />
          <Route
            path="/authors/"
            render={props => (
              <AuthorsList {...props} authors={this.state.authors} />
            )}
          />
        </Switch>
      );
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
