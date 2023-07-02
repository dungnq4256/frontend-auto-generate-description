import React from "react";
import PropTypes from "prop-types";
import AppInfoTooltip from "../AppInfoTooltip";

AppLabel.propTypes = {
    className: PropTypes.string,
    htmlFor: PropTypes.string,
    text: PropTypes.string,
    require: PropTypes.bool,
    popover: PropTypes.bool,
    popoverText: PropTypes.string,
    popoverElement: PropTypes.element,
};

AppLabel.defaultProps = {
    className: "",
    htmlFor: "",
    text: "",
    require: false,
    popover: false,
    popoverText: "",
    popoverElement: <></>,
};

function AppLabel(props) {
    const {
        className,
        htmlFor,
        text,
        require,
        popover,
        popoverText,
        popoverElement,
    } = props;
    return (
        <div className="d-flex align-items-center mb-2">
            <label className={`label-muted mb-0  ${className}`} htmlFor={htmlFor}>
                {text}
            </label>
            {require && (
                <span
                    className="font-weight-boldest ms-1"
                    style={{ color: "#E92E4E" }}
                >{`*`}</span>
            )}
            {popover && (
                <AppInfoTooltip
                    popoverText={popoverText}
                    popoverElement={popoverElement}
                />
            )}
        </div>
    );
}

export default AppLabel;
