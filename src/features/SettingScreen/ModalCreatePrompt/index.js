import promptApi from "api/promptApi";
import BaseTextArea from "general/components/BaseForm/BaseTextArea";
import BaseTextField from "general/components/BaseForm/BaseTextField";
import DialogModal from "general/components/DialogModal";
import ToastHelper from "general/helpers/ToastHelper";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

ModalCreatePrompt.propTypes = {
    show: PropTypes.bool,
    updateData: PropTypes.func,
    onClose: PropTypes.func,
    icon: PropTypes.string,
    description: PropTypes.string,
    onExecute: PropTypes.func,
};
ModalCreatePrompt.defaultProps = {
    show: null,
    updateData: null,
    onClose: null,
    icon: "",
    description: "",
    onExecute: null,
};

function ModalCreatePrompt(props) {
    const { show, onClose, updateData, icon, description, onExecute } = props;
    const [promptOnChange, setPromptOnChange] = useState({
        name: "",
        value: "",
    });
    const resetText = () => {
        setPromptOnChange({
            name: "",
            value: "",
        });
    };

    const handleClose = () => {
        resetText();
        if (onClose) {
            onClose();
        }
    };
    const handelCreatePrompt = async () => {
        try {
            const res = await promptApi.createPrompt(promptOnChange);
            console.log(res);
            if (res.result === "success") {
                ToastHelper.showSuccess("Thêm gợi ý thành công!");
                updateData(true);
                resetText();
            }
            if (onExecute) {
                onExecute();
            }
        } catch (error) {
            ToastHelper.showError("Thêm gợi ý thất bại!");
        }
    };

    return (
        <DialogModal
            show={show}
            onClose={handleClose}
            icon={icon}
            size="lg"
            description={description}
            onExecute={handelCreatePrompt}
            title={"Thêm gợi ý"}
            textBtnCancel={"Hủy"}
            textBtnExecute={"Xác nhận"}
        >
            <div className="d-flex flex-column justify-content-center align-items-center w-100">
                <div className="row mb-3 bg-white border-1 shadow-sm rounded w-100 py-2">
                    <div className="col-4 d-flex justify-content-end align-items-center">
                        <div className="fs-6 me-3">Tên danh mục: </div>
                    </div>
                    <div className="col-8 d-flex justify-content-start align-items-center">
                        <BaseTextField
                            name="promptName"
                            placeholder="Nhập tên danh mục..."
                            value={promptOnChange.name}
                            onChange={(e) =>
                                setPromptOnChange({
                                    ...promptOnChange,
                                    name: e.target.value,
                                })
                            }
                            error="Chưa nhập tên danh mục"
                        />
                    </div>
                </div>
                <div className="row mb-3 bg-white border-1 shadow-sm rounded w-100 py-2">
                    <div className="col-4 d-flex justify-content-end align-items-center">
                        <div className="fs-6 me-3">Gợi ý danh mục: </div>
                    </div>
                    <div className="col-8 d-flex justify-content-start align-items-center">
                        <BaseTextArea
                            name="categoryAddress"
                            rows={10}
                            placeholder="Nhập gợi ý danh mục..."
                            value={promptOnChange.value}
                            onChange={(e) =>
                                setPromptOnChange({
                                    ...promptOnChange,
                                    value: e.target.value,
                                })
                            }
                            error="Chưa nhập gợi ý danh mục"
                        />
                    </div>
                </div>
            </div>
        </DialogModal>
    );
}

export default ModalCreatePrompt;
