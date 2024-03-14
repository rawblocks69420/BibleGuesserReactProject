import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactDOMClient from "react-dom/client";

const refrenceEquality = (arr1, arr2) => arr1 === arr2;

function valueEquality(arr1,arr2){
    for (let i = 0; i<arr1.length; i++) {
        if (arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

class MyList extends React.Component {
    state = {
        // make an array [0,1,2,... 4999]
        items: new Array(5000).fill(null).map((v,i) => i)
    }

    render() {
        return (
            <ul>
                {
                    this.state.items.map((item) => (
                       <li key={ item }>{ item } </li> 
                    ))
                }
            </ul>
        )
    }
}

const root = ReactDOMClient.createRoot(document.getElementById("root"));

const myList = React.createRef();

ReactDOM.flushSync(() => {
    root.render(<MyList ref = { myList } />);
});

for (let i = 0; i<100; i++) {
    myList.current.setState(state => ({
        items: [0, ...state.items.slice(1)]
    }));
}