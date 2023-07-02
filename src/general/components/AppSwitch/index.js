import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

AppSwitch.propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};
AppSwitch.defaultProps = {
    className: "",
    checked: false,
    onChange: null,
};

function AppSwitch(props) {
    const { className, checked, onChange } = props;
    return (
        <label className={`AppSwitch ${className}`}>
            <input type="checkbox" id="AppSwitch" checked={checked} onChange={onChange} />
            <div>
                <span></span>
            </div>
        </label>
    );
}

export default AppSwitch;
