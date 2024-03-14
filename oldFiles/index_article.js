import * as React from "react";
import * as ReactDOM from "react-dom/client";

// Why a generator for ids instead of a simple counter variable?
// Maybe the generator is a way to avoid a race condition?
const id = (function* () {
  for (let i = 1; true; i++) yield i;
})();

class ArticleList extends React.Component {
    render() {
        const {articles, onClickToggle, onClickRemove } = this.props;
        return (
            <ul>
                { articles.map((i) => (
                <li key={ i.id } >
                    <a href={ `#${ i.id }` } title="Toggle Summary"
                    onClick={ onClickToggle.bind(null, i.id) } >
                    { i.title }
                    </a>
                    &nbsp;
                    <a href={ `#${ i.id }` } title="Remove"
                    onClick={ onClickRemove.bind(null, i.id) } >
                    &#10007; { /* ✗ */ }
                    </a>
                    <p style={ { display: i.display } }>{ i.summary }</p>
                </li>
                ))}
            </ul>
        );
    }
}


class MyFeature extends React.Component {
  state = {
    articles: [
      { id: id.next().value, title: "Article 1",
        summary: "Article 1 Summary", display: "none" },
        // Using .value after id.next() gets the number out of the
        // object returned from the generator.  (Not done this way
        // in the book, but makes more sense to me.)

      { id: id.next().value, title: "Article 2",
        summary: "Article 2 Summary", display: "none" },
      { id: id.next().value, title: "Article 3",
        summary: "Article 3 Summary", display: "none" },
      { id: id.next().value, title: "Article 4",
        summary: "Article 4 Summary", display: "none" }
    ],
    // For title and summary inputs used when adding a new article.
    title: "", summary: ""
  };

  // Keep state title and summary consistent with what's in the
  // corresponding input elements.
  onChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  };
  onChangeSummary = (e) => {
    this.setState({ summary: e.target.value });
  };

  onClickAdd = () => {
    this.setState((state) => ({ // Extra parentheses so that => LHS
                                // is object expression rather than
                                // block with return statement.
      articles: [
        ...state.articles,
        { id: id.next().value, title: state.title,
          summary: state.summary, display: "none" }
      ],
      // Why not articles.push(...)?  This makes a whole new array
      // and replaces the old rather than modifying the old.
      
      // Clear input elements after adding new article.
      title: "", summary: ""
    }));
  };

  // When this function is assigned to an element's onClick in the
  // code below, it's like this:  onClick={ this.onClickRemove.bind(null, i.id) }
  // Why is .bind(null, i.id) needed?  null means the "this" reference
  // in the (onClickRemove) function will be left alone; the second argument,
  // i.id, will be passed to onClick remove's id parameter.
  onClickRemove = (id) => {
    this.setState((state) => ({
      ...state,
      articles: state.articles.filter((article) => (article.id !== id))
      // Note that filter will create a new array rather than modifying the
      // old one.
    }));
  };

  onClickToggle = (id) => {
    this.setState((state) => {
      const articles = [...state.articles] // Makes a copy.
      const index = articles.findIndex((article) => (article.id === id));
      /*
      articles[index] = {
        ...articles[index],
        display: articles[index].display ? "" : "none"
          // Previous line works because "" is treated as false.
      };
      */
      articles[index].display = articles[index].display ? "" : "none";
      return { ...state, articles };
    });
  };

  render() {
    const { articles, title, summary } = this.state;

    return (
      <section>
        <header>
          <h1>Articles</h1>
          <input placeholder="Title" value={ title } onChange={ this.onChangeTitle } />
          <input placeholder="Summary" value={ summary } onChange={ this.onChangeSummary } />
          <button onClick={ this.onClickAdd }>Add</button>
        </header>
        <article>
            <ArticleList articles = { articles } onClickToggle = 
            { this.onClickToggle } onClickRemove = {this.onClickRemove}/>
        </article>
      </section>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MyFeature />);