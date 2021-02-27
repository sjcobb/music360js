import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./Dashboard.css";

import * as Tone from 'tone'
import { Chord } from "@tonaljs/tonal";
import * as recordingFirstNotes from '../assets/recording/1.json';
import Store from '../Store';

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
        console.log({event});
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

    sceneConfigSection() {
        const sceneConfig = Store.view;

        // for (const key in sceneConfig) {
        //     if (Object.hasOwnProperty.call(sceneConfig, key)) {
        //         const element = sceneConfig[key];
        //         console.log(element);
        //     }
        // }

        // this.sceneConfig = (
        return (
            <section className='sceneConfig'>
                {
                    Object.entries(sceneConfig).map(([key, val]) => 
                        <h2 key={key}>{key}: {val}</h2>
                    )
                }
            </section>
        );
        
    }

    render() {
        // this.parseSceneConfig();
        
        const { title } = this.props;

        // console.log(Store);
        // console.log(recordingFirstNotes);
        
        let modeClass = this.state.darkMode ? "dark-mode" : "light-mode";
        let checked = this.state.darkMode ? "checked" : "unchecked";

        const sceneSection = this.sceneConfigSection();
        console.log({sceneSection});
        // {sceneSection.props.children}
        
        // return sceneSection;

        return (
            <div className={`app ${modeClass}`}>
                <h1>Dashboard Title: {title}</h1>
                <label className="checkbox">
                    <input 
                    type="checkbox" 
                    defaultChecked={checked} 
                    onChange={this.handleChange} />
                    {' '}Dark Mode
                </label>
                <p>{Store.view.activeInstrColor}</p>
                {sceneSection}
            </div>
        );
    }
}

export default hot(module)(Dashboard);
