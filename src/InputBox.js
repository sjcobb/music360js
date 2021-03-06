import React, {Component} from 'react';
// import enhance from '../hoc/wrapInputBox';

// function InputBox(props) {
class InputBox extends Component {
    // console.log('InputBox -> props: ', props);
    // const { value, handleChange, handleKeyUp } = props;

    constructor(props) {
        super(props);
        this.state = {
            // value: this.props.value
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // const { value, handleChange, handleKeyUp } = props;
    }

    handleChange(e) {
        // console.log({e});
        // console.log('e.target.value: ', e.target.value);
        // console.log('handleChange -> this: ', this);

        // const {value} = e.target.value;
        // this.setState(value);
        // this.props.onChange(value);

        this.setState({value: e.target.value});
    }

    handleKeyUp(e) {
        console.log({e});
    }

    render() {

        // const { value } = this.props;

        return (
            <input autoFocus
                type="text"
                className="form-control input"
                value={this.state.value}
                onKeyUp={this.handleKeyUp}
                onChange={this.handleChange}
                placeholder="Add New"
            />
        );
    }
}

// export default enhance(InputBox);
export default InputBox;
