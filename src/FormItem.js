import React from 'react';
import Checkbox from './Checkbox';

export default function FormItem(props) {
    const {data, changeStatus} = props;
    const handleChange = (checked) => changeStatus(data.id, checked);
    const className = 'todo-item ui-state-default ' + (data.completed === true ? 'completed' : 'pending');

    // TODO: parse Store.js object keys, if value is boolean - use checkbox, if string or number - text input
    return (
        <li className={className}>
            <div className="checkbox">
                <label>
                    <Checkbox checked={data.completed} onChange={handleChange}/> {data.text}
                </label>
            </div>
        </li>
    );
}
