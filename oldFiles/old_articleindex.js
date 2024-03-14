import * as React from "react";
import * as ReactDOM from "react-dom/client";

const id = (function* () {
    for (let i = 1; true; i++) yield i;
    
})();


function AddArticle({ name, title, summary, onChangeTitle,
onChangeSummary, onClickAdd }) {
return (
    <section>
        <header>
            <h1>{ name }</h1>
            <input placeholder="Title" value={ title } onChange={ onChangeTitle } />
            <input placeholder="Summary" value={ summary } onChange={ onChangeSummary } />
            <button onClick={ onClickAdd }>Add</button>
        </header>
        <article>
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
        </article>
    </section>





);

}



// id.next().value