import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import PropTypes from "prop-types";

AppInfoTooltip.propTypes = {
    placement: PropTypes.string,
    popoverText: PropTypes.string,
    popoverElement: PropTypes.element,
};

AppInfoTooltip.defaultProps = {
    placement: "top",
    popoverText: "",
    popoverElement: <></>,
};

function AppInfoTooltip(props) {
    const { placement, popoverText, popoverElement } = props;
    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                <div>
                    <div>{popoverText}</div>
                    {popoverElement}
                </div>
            </Popover.Body>
        </Popover>
    );
    return (
        <div className="ms-2 d-flex align-items-center cursor-pointer">
            <OverlayTrigger placement={placement} overlay={popover}>
                <div
                    className="d-inline-flex justify-content-center align-items-center"
                    style={{
                        height: "12px",
                        width: "12px",
                        borderRadius: "6px",
                        border: "1px solid #0088ff",
                        color: "#0088ff",
                        fontSize: "6px",
                    }}
                >
                    <i className="fa-solid fa-info"></i>
                </div>
            </OverlayTrigger>
        </div>
    );
}
export default AppInfoTooltip;
