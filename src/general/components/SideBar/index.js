import AppResource from "general/constants/AppResource";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";
import "./style.scss";

SideBar.propTypes = {
    className: PropTypes.string,
    selected: PropTypes.string,
};

SideBar.defaultProps = {
    className: "",
    selected: "",
};

function SideBar(props) {
    const { className, selected } = props;
    const navigate = useNavigate();

    function handleNavigate(url) {
        navigate(url);
    }
    return (
        <div
            className={`SideBar d-inline-flex flex-column align-items-center ${className}`}
        >
            <div
                className="d-flex align-items-center justify-content-center w-100"
                style={{ height: "55px", borderBottom: "1px solid #323C55" }}
            >
                <NavLink to="/" className={`LogoSideBar`}>
                    <img
                        src={AppResource.images.imgLogo}
                        style={{ height: "30px", width: "auto" }}
                        alt=""
                    />
                </NavLink>
            </div>
            <div className="d-flex flex-column flex-fill align-items-center w-100">
                <div className="MenuSideBar w-100 mt-1">
                    <div onClick={() => handleNavigate("/")}>
                        <div
                            className={`MenuItem d-flex align-items-center ${
                                selected === "setting" && "MenuItem_active"
                            }`}
                            title="Cài đặt gợi ý"
                        >
                            <div className={`MenuItemName`}>Cài đặt gợi ý</div>
                        </div>
                    </div>
                    <div onClick={() => handleNavigate("/create")}>
                        <div
                            className={`MenuItem d-flex align-items-center ${
                                selected === "create-product" &&
                                "MenuItem_active"
                            }`}
                            title="Thêm sản phẩm"
                        >
                            <div className={`MenuItemName`}>Thêm sản phẩm</div>
                        </div>
                    </div>

                    <div onClick={() => handleNavigate("/statistic")}>
                        <div
                            className={`MenuItem d-flex align-items-center ${
                                selected === "statistic" && "MenuItem_active"
                            }`}
                            title="Trang thống kê"
                        >
                            <div className={`MenuItemName`}>Trang thống kê</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
