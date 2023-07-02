import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import AppInfoTooltip from "general/components/AppInfoTooltip";

BaseTextArea.propTypes = {
    name: PropTypes.string.isRequired,
    resizable: PropTypes.bool,
    error: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    rows: PropTypes.number,
    autoHeight: PropTypes.bool,
    additionLabelClassName: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    require: PropTypes.bool,
    text: PropTypes.string,
    labelStyle: PropTypes.object,
    className: PropTypes.string,
    popover: PropTypes.bool,
    popoverText: PropTypes.string,
    popoverElement: PropTypes.element,
};

BaseTextArea.defaultProps = {
    resizable: true,
    rows: 3,
    error: "",
    value: "",
    onChange: null,
    autoHeight: false,
    label: "",
    placeholder: "",
    additionLabelClassName: "text-muted",
    disabled: false,
    text: "",
    labelStyle: {},
    require: false,
    className: "",
    popover: false,
    popoverText: "",
    popoverElement: <></>,
};

function BaseTextArea(props) {
    // MARK: --- Params ---
    const {
        name,
        label,
        value,
        onChange,
        error,
        placeholder,
        additionLabelClassName,
        disabled,
        text,
        rows,
        autoHeight,
        require,
        resizable,
        labelStyle,
        className,
        popover,
        popoverText,
        popoverElement,
    } = props;

    const [isError, setError] = useState(false);
    const handleOnBlur = () => {
        if (value === null || value.trim() === "") {
            setError(true);
        } else {
            setError(false);
        }
    };
    return (
        <div className="BaseTextArea w-100">
            {label && (
                <div className={"d-flex flex-row mb-2"}>
                    <label
                        className={`${additionLabelClassName} m-0`}
                        htmlFor={name}
                        style={labelStyle}
                    >
                        {label}
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
            )}
            <div
                className={`BaseTextArea_Group rounded input-group ${
                    !disabled && "bg-white"
                }  d-flex flex-row  justify-content-between ${
                    disabled && "BaseTextArea_Disabled"
                } ${
                    isError && error.length > 0 && "BaseTextArea_Group-invalid"
                } ${className}`}
            >
                <textarea
                    id={name}
                    className={`ps-3 py-2 BaseTextArea_Input w-100 rounded border-0 bg-transparent ${
                        resizable ? "" : "resize-none"
                    }`}
                    rows={rows}
                    value={value ?? ""}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={placeholder}
                    onBlur={handleOnBlur}
                ></textarea>
            </div>
            {isError && (
                <div className="mt-1">
                    <div className="err-text-field">{error}</div>
                </div>
            )}

            <span className="form-text text-muted">{text}</span>
        </div>
    );
}

export default BaseTextArea;
