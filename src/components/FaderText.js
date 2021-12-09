import { Component } from "react";

class FaderText extends Component {
    state = { 
        className: "fail-fade-out",
        value: "",
    }

    displayIncorrect() {
        this.setState({value: "Incorrect"});
        this.setState({className: "fail-fade-in"});
        setTimeout(() => {
            this.setState({className: "fail-fade-out"});
        }, 2000);
    }

    displayCorrect() {
        this.setState({value: "Correct"});
        this.setState({className: "pass-fade-in"});
        setTimeout(() => {
            this.setState({className: "pass-fade-out"});
        }, 2000);
    }

    render() {
        return (
            <span className={this.state.className}>{this.state.value}</span>
        );
    }
}

export default FaderText