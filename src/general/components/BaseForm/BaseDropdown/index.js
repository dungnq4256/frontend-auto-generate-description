import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import "./style.scss";
import BaseSearchBar from "../BaseSearchBar";
import AppInfoTooltip from "general/components/AppInfoTooltip";
import AppButton from "general/components/AppButton";

BaseDropdown.propTypes = {
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
    text: PropTypes.string,
    searchInput: PropTypes.bool,
    options: PropTypes.array,

    containerClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    selectClassName: PropTypes.string,
    value: PropTypes.string,
    onValueChanged: PropTypes.func,

    dropdownInitialValue: PropTypes.string,
    require: PropTypes.bool,
    additionalElement: PropTypes.element,
    popover: PropTypes.bool,
    popoverText: PropTypes.string,
    popoverElement: PropTypes.element,

    searchName: PropTypes.string,
    textPagination: PropTypes.string,
    searchPlaceholder: PropTypes.string,
    searchValue: PropTypes.string,
    onSubmitSearch: PropTypes.func,
    onPrevPage: PropTypes.func,
    onNextPage: PropTypes.func,
    disabledPrevBtn: PropTypes.bool,
    disabledNextBtn: PropTypes.bool,
};

BaseDropdown.defaultProps = {
    label: "",
    disabled: false,
    searchInputAndPagination: false,
    text: "",
    options: [],
    containerClassName: "",
    labelClassName: "text-muted",
    selectClassName: "",
    value: "",
    onValueChanged: null,
    dropdownInitialValue: "",
    require: false,
    additionalElement: null,
    popover: false,
    popoverText: "",
    popoverElement: <></>,

    searchName: "",
    textPagination: "",
    searchPlaceholder: "",
    searchValue: "",
    onSubmitSearch: null,
    onPrevPage: null,
    onNextPage: null,
    disabledPrevBtn: false,
    disabledNextBtn: false,
};

function BaseDropdown(props) {
    // MARK: --- Params ---
    const {
        name,
        label,
        disabled,
        searchInputAndPagination,
        text,
        options,
        containerClassName,
        labelClassName,
        selectClassName,
        value,
        onValueChanged,
        dropdownInitialValue,
        require,
        additionalElement,
        popover,
        popoverText,
        popoverElement,
        searchName,
        textPagination,
        searchPlaceholder,
        searchValue,
        onSubmitSearch,
        onPrevPage,
        onNextPage,
        disabledPrevBtn,
        disabledNextBtn,
    } = props;
    const showError = false;
    const [dropdownValue, setDropdownValue] = useState(dropdownInitialValue);

    // MARK: --- Functions ---
    function handleOptionChanged(e) {
        if (onValueChanged) {
            onValueChanged(e);
        }
    }
    useEffect(() => {
        if (value && options.length > 0) {
            setDropdownValue(
                options.filter((item) => item.value === value)[0]?.text
            );
        } else {
            setDropdownValue(dropdownInitialValue);
        }
    }, [value, options]);

    return (
        <div className={`BaseDropdown w-100 ${containerClassName}`}>
            {label && (
                <div className={`${require && "d-flex flex-row"}`}>
                    <label className={labelClassName} htmlFor={name}>
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
            <div className={` ${selectClassName}`}>
                <Dropdown
                    className={`BaseDropdown_Dropdown rounded ${
                        disabled && "BaseDropdown_Disabled"
                    } ${showError && "BaseDropdown_Dropdown-invalid"}`}
                >
                    <Dropdown.Toggle
                        id={name}
                        disabled={disabled}
                        className={`BaseDropdown_Toggle w-100 py-2 cursor-pointer d-flex flex-row align-items-center justify-content-between shadow-none`}
                        value={value}
                        variant=""
                    >
                        <p className="BaseDropdown_Text m-0 q-max-line-1">
                            {dropdownValue}
                        </p>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {searchInputAndPagination && (
                            <div className="pb-2 border-bottom">
                                <BaseSearchBar
                                    name={searchName}
                                    placeholder={searchPlaceholder}
                                    value={searchValue}
                                    onSubmit={onSubmitSearch}
                                    className="mx-2"
                                />
                            </div>
                        )}
                        <div className="BaseDropdown_ItemGroup">
                            {options.length > 0 ? (
                                options.map((item, index) => {
                                    return (
                                        <Dropdown.Item
                                            key={index}
                                            value={item.value}
                                            onClick={() => {
                                                setDropdownValue(item.text);
                                                handleOptionChanged(item.value);
                                            }}
                                            className="py-2 d-flex flex-row align-items-center justify-content-between"
                                        >
                                            <span className="BaseDropdown_Text">
                                                {item.text}
                                            </span>
                                            {item.value === value && (
                                                <i className="fas fa-check text-primary"></i>
                                            )}
                                        </Dropdown.Item>
                                    );
                                })
                            ) : (
                                <div className="d-flex align-items-center justify-content-center flex-column">
                                    {additionalElement && (
                                        <div>{additionalElement}</div>
                                    )}
                                </div>
                            )}
                        </div>
                        {searchInputAndPagination && (
                            <div className="BaseDropdown_Arrow d-flex justify-content-between align-items-center pt-2 border-top mx-3">
                                <div
                                    style={{
                                        fontSize: "0.8rem",
                                        fontWeight: "500",
                                        opacity: "0.8",
                                    }}
                                >
                                    {textPagination}
                                </div>
                                <div className="d-flex">
                                    <AppButton
                                        beforIcon={
                                            <i className="fa-solid fa-arrow-left"></i>
                                        }
                                        disabled={disabledPrevBtn}
                                        className="btn-icon"
                                        onClick={onPrevPage}
                                    />
                                    <AppButton
                                        beforIcon={
                                            <i className="fa-solid fa-arrow-right"></i>
                                        }
                                        className="btn-icon ms-1"
                                        disabled={disabledNextBtn}
                                        onClick={onNextPage}
                                    />
                                </div>
                            </div>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                {text.length > 0 && (
                    <span className="form-text text-muted">{text}</span>
                )}
            </div>
        </div>
    );
}

export default BaseDropdown;
