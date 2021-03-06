import React from 'react';
import Checkbox from './Checkbox';

export default function FormItem(props) {
    const {data, changeStatus, label} = props;
    const handleChange = (checked) => changeStatus(data.id, checked);
    const className = 'todo-item ui-state-default ' + (data.completed === true ? 'completed' : 'pending');

    console.log({data});
    console.log(props);
    // TODO: parse Store.js object keys, if value is boolean - use checkbox, if string or number - text input
    return (
        <li className={className}>
            <div className="checkbox">
                <label>
                    <h3>{props.label}</h3>
                    <Checkbox checked={data.completed} onChange={handleChange}/> {data.text}
                </label>
            </div>
        </li>
    );
}
