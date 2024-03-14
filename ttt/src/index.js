import * as React from "react";
import * as ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route, Link, useParams} from "react-router-dom"


function Color({ color, word }) {
    return (
        <h1 style={{ color: `${ color }` }}>{ word }</h1>
    );
}


function ColorContainer() {
    const url = "https://api.datamuse.com/sug?s="
    const params = useParams();
    const [word, setWord] = React.useState("");
    React.useEffect(() => {
        fetch(url + params.color).then(
            response => response.json()).then(
                json => {
                    const r = Math.floor(Math.random() * json.length/3)
                    setWord(json[r].word);
                }
            )
        }, []);

    return (
        <Color color={ params.color } word={ word } />
    );
}


function ColorChooser({ colors }) {
    return (
        <ul>
            {colors.map((color, i) => (
                <li key={ i }>
                    <Link to={`/colors/${color}` }>{ color }</Link>
                </li>
            ))}
        </ul>
    );
}


ColorChooser.defaultProps = {
    colors: ["red", "green", "blue", "orange", "purple"]

}


function App(){
    return (
        <Router>
            <Routes>
                <Route path ="/" element={ <ColorChooser/> }/>
                <Route path="/colors/:color"
                element={ <ColorContainer /> }/>
            </Routes>
        </Router>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById( "root" ));

root.render(<App  />);