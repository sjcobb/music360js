import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./Dashboard.css";

import Checkbox from '../Checkbox';
import FormItem from '../FormItem';
import InputBox from '../InputBox';

import * as Tone from 'tone'
import { Chord } from "@tonaljs/tonal";
import * as recordingFirstNotes from '../assets/recording/1.json';
import Store from '../Store';

import updateStatus from '../services/sceneCustomizer';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            darkMode: true
        };
        this.sceneName = 'Default Scene';
        this.handleChange = this.handleChange.bind(this);
        this.sceneConfig = 'test';
    }

    handleChange(event) {
        // console.log({event});
        this.setState({ darkMode: !this.state.darkMode });
    }
      
    componentWillMount() {
        console.log('componentWillMount...');
    }
    
    componentDidMount() {
        console.log('componentDidMount...');
        // this.parseSceneConfig();
    }
    
    componentWillUnmount() {
        console.log('componentWillUnmount...');
    }
    
    componentDidUpdate() {
        console.log('componentDidUpdate...');
    }

    handleInputChange(e) {
        // console.log(e);
        // console.log(this);
        // const {checked} = e.target;

        // this.setState({checked});
        // this.props.onChange(checked);
    }

    handleKeyUp(e) {
        // console.log({e});
    }

    handleCheckboxChange(e) {
        // console.log(e);
        // console.log(this);
        // const {checked} = e.target;

        // this.setState({checked});
        // this.props.onChange(checked);
    }

    sceneConfigSection() {
        const sceneConfig = Store.view;
        return (
            <section className='sceneConfig'>
                {
                    Object.entries(sceneConfig).map(([key, val]) => 
                        <h3 key={key}>{key}: {val}</h3>
                    )
                }
            </section>
        );
    }

    changeStatus(itemId, completed) {
        console.log(itemId);
        console.log(completed);

        // const updatedList = updateStatus(this.state.list, itemId, completed);

        // this.setState({list: updatedList});
    }

    render() {

        // console.log(Checkbox);
        
        // this.parseSceneConfig();
        
        const { title } = this.props;

        // console.log(Store);
        // console.log(recordingFirstNotes);
        
        let modeClass = this.state.darkMode ? "dark-mode" : "light-mode";
        let checked = this.state.darkMode ? "checked" : "unchecked";

        const sceneSection = this.sceneConfigSection();
        // console.log({sceneSection});
        // {sceneSection.props.children}
        
        // return sceneSection;
        let skyboxChecked = true;

        const testFormItem = {
            id: 'testId',
            text: 'testLabel',
            completed: true,
        }

        const items = ['banana', 'apple', 'pear']

        return (
            <div className={`dashboard ${modeClass}`}>
                <h1>Dashboard Title: {title}</h1>
                <label className="checkbox">
                    <input 
                    type="checkbox" 
                    defaultChecked={checked} 
                    onChange={this.handleChange} />
                    {' '}Dark Mode
                </label>
                <p>{Store.view.activeInstrColor}</p>

                {/* <Checkbox checked={true} onChange={this.handleCheckboxChange}/> */}

                {/* <ul className="form-list">
                    {items.forEach(item => (
                        <li>{item}</li>
                    ))}
                </ul> */}

                {/* <FormItem key={testFormItem.id} data={testFormItem} changeStatus={this.changeStatus} /> */}

                {/* <div className="input-container">Input 1: <InputBox value='' onChange={this.handleInputChange} onKeyUp={this.handleKeyUp} /></div> */}
                {/* <div class="input-container">Input 2: <InputBox /></div> */}

                {/* {sceneSection} */}

                <section className='formSection'>
                    {
                        Object.entries(Store.view).map(([key, defaultValue]) => {
                            console.log({key});
                            console.log({defaultValue});
                            
                            if (defaultValue === true || defaultValue === false) {
                                return <FormItem label={key} key={key} data={defaultValue} changeStatus={this.changeStatus} />
                            } else {
                                return <InputBox label={key} value={defaultValue} onChange={this.handleInputChange} onKeyUp={this.handleKeyUp} />
                            }
                        })
                    }
                </section>

            </div>
        );
    }
}

export default hot(module)(Dashboard);
