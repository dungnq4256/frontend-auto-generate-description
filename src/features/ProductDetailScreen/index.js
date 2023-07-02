import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import Header from "general/components/Header";
import BaseLayout from "general/components/BaseLayout";
import AppButton from "general/components/AppButton";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";

function ProductDetailScreen(props) {
    return (
        <div>
            <Header>
                <div className="d-flex w-100 justify-content-between align-items-center">
                    <div className="d-flex btn-back">
                        <AppButton className="btn-cancel">
                            <i className="fas fa-chevron-left"></i>{" "}
                            <span>Quay lại danh sách sản phẩm</span>
                        </AppButton>
                    </div>
                </div>
            </Header>
            <BaseLayout>
                <div className="container w-75 p-3 bg-white rounded m-auto d-grid">
                    <div className="row">
                        <div className="col-5 d-flex align-items-center justify-content-center">
                            <img
                                src="https://imgs.viettelstore.vn/Images/Product/ProductImage/dien-thoai/Apple/iPhone%2014%20Pro%20Max%20128/iPhone-14-Pro-Max-3.jpg"
                                alt="product detail"
                                style={{
                                    maxWidth: "300px",
                                    maxHeight: "500px",
                                }}
                            />
                        </div>
                        <div className="col-7">
                            <h1>IPhone 14 Pro Max 256GB</h1>
                            <p>
                                <b>Code: </b>
                                <span>SP001</span>
                            </p>
                            <p>
                                <b>Quantity: </b>
                                <span>1000</span>
                            </p>
                            <p>
                                <b>Price: </b>
                                <span>100(USD)</span>
                            </p>
                            <p>
                                <b>Sold amount: </b>
                                <span>500</span>
                            </p>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <ReactMarkdown
                                children={"### What is cool about this phone?"}
                            />
                            <ReactMarkdown
                                children={
                                    "+ 256GB of RAM\n + Purprle color fancy\n + It is very cheap. It's only 1000 USD"
                                }
                            />
                        </div>
                    </div>
                </div>
            </BaseLayout>
        </div>
    );
}

ProductDetailScreen.propTypes = {};

export default ProductDetailScreen;
