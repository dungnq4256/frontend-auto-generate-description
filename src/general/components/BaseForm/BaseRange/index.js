import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import "./style.scss";

BaseRange.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func,
    label: PropTypes.string,
    className: PropTypes.string,
    additionLabelClassName: PropTypes.string,
    additionalInputClassName: PropTypes.string,
    labelStyle: PropTypes.object,
    require: PropTypes.bool,
};

BaseRange.defaultProps = {
    label: "",
    value: 0,
    min: 0,
    max: 100,
    step: 1,
    onChange: null,
    className: "form-group",
    additionLabelClassName: "text-muted",
    labelStyle: {},
    require: false,
};

function BaseRange(props) {
    const {
        name,
        value,
        min,
        max,
        step,
        onChange,
        label,
        className,
        additionLabelClassName,
        labelStyle,
        require,
    } = props;
    return (
        <div className="BaseRange w-100">
            <div className={className}>
                {label && (
                    <div className="d-flex flex-row">
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
                        <input
                            className="ms-auto"
                            type="number"
                            value={value}
                            min={min}
                            max={max}
                            step={step}
                            onChange={onChange}
                            style={{
                                maxWidth: "50px",
                                border: "none",
                                height: "24px",
                                fontSize: "12px",
                                textAlign: "end",
                            }}
                        />
                    </div>
                )}
                <Form.Range
                    value={value}
                    onChange={onChange}
                    min={min}
                    max={max}
                    step={step}
                />
            </div>
        </div>
    );
}

export default BaseRange;
