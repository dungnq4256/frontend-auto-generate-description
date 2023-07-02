import React, { useRef } from "react";
import PropTypes from "prop-types";
import icPageUp from "../../../assets/icons/PageUp.png";
import "./style.scss";

BaseLayout.propTypes = {};

function BaseLayout(props) {
    const PageUp = useRef();
    const handleScrollTop = () => {
        document.documentElement.scrollTop = 0;
    };
    window.onscroll = function () {
        if (PageUp.current) {
            PageUp.current.style.display =
                document.documentElement.scrollTop > 450 ? "block" : "none";
            PageUp.current.style.animation = "scroll-to-top-animation 0.5s";
        }
    };
    return (
        <div className="BaseLayout w-100 flex-grow-1 align-self-center d-flex flex-column justify-content-between p-3">
            {props.children}
            <div className="fixed-button">
                <button
                    ref={PageUp}
                    id="page-up-dashboard"
                    style={{
                        marginBottom: "0px",
                        display: "none",
                    }}
                    onClick={handleScrollTop}
                >
                    <img src={icPageUp} alt="scroll to top button" />
                </button>
            </div>
        </div>
    );
}

export default BaseLayout;
