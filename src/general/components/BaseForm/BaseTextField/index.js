import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { useState } from "react";
import AppInfoTooltip from "general/components/AppInfoTooltip";

BaseTextField.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    text: PropTypes.string,
    className: PropTypes.string,
    additionLabelClassName: PropTypes.string,
    additionalInputClassName: PropTypes.string,
    autoComplete: PropTypes.string,
    labelStyle: PropTypes.object,
    require: PropTypes.bool,
    popover: PropTypes.bool,
    popoverText: PropTypes.string,
    popoverElement: PropTypes.element,
};

BaseTextField.defaultProps = {
    type: "text",
    label: "",
    value: "",
    placeholder: "",
    error: "",
    onChange: null,
    disabled: false,
    text: "",
    className: "form-group",
    additionLabelClassName: "text-muted",
    additionalInputClassName: "",
    autoComplete: "on",
    labelStyle: {},
    require: false,
    popover: false,
    popoverText: "",
    popoverElement: <></>,
};

function BaseTextField(props) {
    const {
        name,
        type,
        value,
        onChange,
        error,
        label,
        placeholder,
        disabled,
        text,
        className,
        additionLabelClassName,
        additionalInputClassName,
        autoComplete,
        labelStyle,
        require,
        popover,
        popoverText,
        popoverElement,
    } = props;

    const [currentType, setCurrentType] = useState(type);
    const [isError, setError] = useState(false);

    const handleOnBlur = () => {
        if (value.trim() === "") {
            setError(true);
        } else {
            setError(false);
        }
    };

    function handleShowPass() {
        if (currentType === "password") {
            setCurrentType("text");
        } else if (currentType === "text") {
            setCurrentType("password");
        }
    }

    return (
        <div className="BaseTextField w-100">
            <div className={className}>
                {label && (
                    <div className={"d-flex flex-row mb-2"}>
                        <label
                            className={additionLabelClassName}
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
                    className={`BaseTextField_Group rounded input-group ${
                        !disabled && "bg-white"
                    }  d-flex flex-row  justify-content-between ${
                        disabled && "BaseTextField_Disabled"
                    } ${
                        isError &&
                        error?.length > 0 &&
                        "BaseTextField_Group-invalid"
                    }`}
                >
                    <input
                        className={`ps-3 BaseTextField_Input w-100 rounded border-0 bg-transparent ${additionalInputClassName}`}
                        id={name}
                        disabled={disabled}
                        type={currentType}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        onBlur={handleOnBlur}
                    />
                    {type === "password" && (
                        <div
                            className="BaseTextField_Eye d-flex align-items-center justify-content-center cursor-pointer"
                            onClick={handleShowPass}
                        >
                            <i
                                className={`fas fa-eye${
                                    currentType === "text" ? "-slash" : ""
                                }`}
                            ></i>
                        </div>
                    )}
                </div>
                {text.length > 0 && (
                    <span className="form-text text-muted">{text}</span>
                )}
                {isError && error?.length > 0 && (
                    <div className="mt-1 me-2">
                        <div className="err-text-field">{error}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BaseTextField;
