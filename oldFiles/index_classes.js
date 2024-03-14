import * as React from "react";
import * as ReactDOM from "react-dom/client";

class MyButton extends React.Component {
  static defaultProps = { size: "30px", maxMs: 10000 };
  state = { text: "", disabled: false };
  static turn = "X";

  constructor(props) {
    super(props);
    const maxMs = this.props.maxMs

    setTimeout(() => {
      if (this.state.disabled === false)

        this.setState({ text: "?", disabled: true});

    }, 1000 + Math.floor(Math.random() * maxMs));

  }


  onClick = () => {
    // Note: need to use the => form in order to 
    // access "this". 
    this.setState({ text: MyButton.turn, disabled: true });
    MyButton.turn = (MyButton.turn === "X") ? "O" : "X";
  };

  render() {
    const size = this.props.size;
    const { text, disabled } = this.state;

    return (
      <button style={{ width: size, height: size }}
          onClick={ this.onClick } disabled={ disabled }>
        { text }
      </button>
    );
  }
}

class MyButtonRow extends React.Component {
  static defaultProps = { width: 3 };

  render() { 
    const width = this.props.width;
    const a = [];

    for (let i = 0; i < width; i++)
      a.push(<td key={ i }><MyButton size = {40} maxMs = {10000}/></td>);

    return (<tr>{ a }</tr>);
  }
}

class MyButtonGrid extends React.Component {
  static defaultProps = { size: 3 };

  render() {
    const size = this.props.size;
    const a = [];
    
    for (let i = 0; i < size; i++)
      a.push(<MyButtonRow key={ i } width={ size } />);
    
    return (<table><tbody>{ a }</tbody></table>);
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MyButtonGrid size = {5}/>);