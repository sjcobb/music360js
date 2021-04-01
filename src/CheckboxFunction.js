import React from 'react';

const Checkbox = ({ checked }) => (
  <div>
    <input type="checkbox" checked={checked} />
  </div>
);

Checkbox.defaultProps = {
  checked: false
};

export default Checkbox;
