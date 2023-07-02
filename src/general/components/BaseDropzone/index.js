import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";

BaseDropzone.propTypes = {
    parentCallback: PropTypes.func,
    isClear: PropTypes.bool,
};
BaseDropzone.defaultProps = {
    parentCallback: null,
    isClear: false,
};

function BaseDropzone(props) {
    const { parentCallback, isClear } = props;
    const [images, setImages] = useState([]);
    const [clearImg, setClearImg] = useState(isClear);
    const [isDrapping, setIsDrapping] = useState(false);
    const fileInputRef = useRef(null);
    useEffect(() => {
        parentCallback(images);
    }, [images]);
    useEffect(() => {
        setImages([]);
    }, [isClear]);
    const selectFiles = () => {
        fileInputRef.current.click();
    };
    const onFileSelect = (e) => {
        const files = e.target.files;
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split("/")[0] !== "image") continue;
            if (!images.some((e) => e.name === files[i].name)) {
                setImages((prevImages) => [
                    ...prevImages,
                    files[i],
                    // {
                    //     name: files[i].name,
                    //     url: URL.createObjectURL(files[i]),
                    // },
                ]);
            }
        }
    };
    const deleteImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };
    const onDragOver = (e) => {
        e.preventDefault();
        setIsDrapping(true);
        e.dataTransfer.dropEffect = "copy";
    };
    const onDragLeave = (e) => {
        e.preventDefault();
        setIsDrapping(false);
    };
    const onDrop = (e) => {
        e.preventDefault();
        setIsDrapping(false);
        const files = e.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split("/")[0] !== "image") continue;
            if (!images.some((e) => e.name === files[i].name)) {
                setImages((prevImages) => [...prevImages, files[i]]);
            }
        }
    };
    return (
        <div className="BaseDropzone w-100">
            <div
                className="drag-area"
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                {isDrapping ? (
                    <span>Kéo thả ảnh vào đây</span>
                ) : (
                    <div>
                        Kéo thả ảnh hoặc{" "}
                        <span
                            className="btn-upload"
                            role="button"
                            onClick={selectFiles}
                        >
                            tải ảnh từ thiết bị
                        </span>
                    </div>
                )}
                <input
                    className="d-none"
                    type="file"
                    name="file"
                    multiple
                    ref={fileInputRef}
                    onChange={onFileSelect}
                />
            </div>
            <div className="img-list w-100 d-flex justify-content-start align-items-start flex-wrap">
                {images.map((fileImg, index) => (
                    <div className="image-item m-2" key={index}>
                        <span
                            className="delete-img d-flex justify-content-center align-items-center rounded-circle"
                            onClick={() => deleteImage(index)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </span>
                        <img
                            src={URL.createObjectURL(fileImg)}
                            alt={fileImg.name}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BaseDropzone;
