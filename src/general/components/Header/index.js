import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

Header.propTypes = {
};

function Header(props) {
    return (
        <div
            className="d-flex align-items-center sticky-top shadow-sm px-5 py-2 bg-white"
            style={{ minHeight: "55px" }}
        >
            {props.children}
        </div>
    );
}

export default Header;
