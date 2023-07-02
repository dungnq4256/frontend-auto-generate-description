import { AuthContext } from "AuthContext";
import promptApi from "api/promptApi";
import AppButton from "general/components/AppButton";
import BaseRange from "general/components/BaseForm/BaseRange";
import BaseSearchBar from "general/components/BaseForm/BaseSearchBar";
import BaseTextArea from "general/components/BaseForm/BaseTextArea";
import BaseTextField from "general/components/BaseForm/BaseTextField";
import BaseLayout from "general/components/BaseLayout";
import Header from "general/components/Header";
import AppData from "general/constants/AppData";
import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./style.scss";
import SideBar from "general/components/SideBar";
import ModalEditPrompt from "./ModalEditPrompt";
import ModalCreatePrompt from "./ModalCreatePrompt";
import ToastHelper from "general/helpers/ToastHelper";
import DialogModal from "general/components/DialogModal";
import Pagination from "general/components/Pagination";

function SettingScreen(props) {
    const { promptList, basePrompt } = useContext(AuthContext);
    const [filterPromptList, setFilterPromptList] = useState(promptList);
    const [basePromptList, setBasePromptList] = useState(basePrompt);
    const [isEditting, setIsEditting] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState({});
    const [showModalEditPrompt, setShowModalEditPrompt] = useState(false);
    const [showModalCreatePrompt, setShowModalCreatePrompt] = useState(false);
    const [showModalDeletePrompt, setShowModalDeletePrompt] = useState(false);
    const [isEdittingPromptDefault, setIsEdittingPromptDefault] =
        useState(false);
    const [settingValue, setSettingValue] = useState(
        AppData.settingValueDefault
    );
    const [filters, setFilters] = useState({
        name: "",
        page: 0,
        size: 5,
    });
    const updateData = (isUpdated) => {
        setIsUpdated(isUpdated);
    };
    const handleChangeSettingValue = () => {
        localStorage.setItem("temperature", settingValue.temperature);
        localStorage.setItem("max_token", settingValue.maxToken);
        localStorage.setItem("top_p", settingValue.topP);
        localStorage.setItem("stop", settingValue.stop);
        setIsEditting(false);
    };
    useEffect(() => {
        async function fetchData() {
            const res = await promptApi.getAllPrompts(filters);
            if (res.result === "success") {
                setFilterPromptList(res.data);
            }
        }
        fetchData();
    }, [filters, isUpdated == true]);
    const handleEditBasePrompt = async () => {
        const res = await promptApi.editBasePrompt({
            promptSEO: basePromptList.promptSEO,
        });
        if (res.result === "success") {
            ToastHelper.showSuccess(
                `Cập nhật gợi ý [SEO sản phẩm] thành công!`
            );
            setIsEdittingPromptDefault(false);
        } else ToastHelper.showError(`Cập nhật gợi ý [SEO sản phẩm] thất bại!`);
    };
    const handleDeletePrompt = async () => {
        const res = await promptApi.deletePrompt(selectedPrompt?.id);
        if (res.result === "success") {
            ToastHelper.showSuccess(
                `Xóa gợi ý danh mục [${selectedPrompt.name}] thành công!`
            );
            setIsUpdated(true);
        }
    };
    return (
        <div className="d-flex w-100">
            <div>
                <SideBar selected="setting" />
            </div>
            <div className="d-flex flex-column flex-grow-1">
                <Header>
                    {/* Code header ở đây */}
                    <h5 className="w-100 m-0 text-center">
                        TRANG CÀI ĐẶT GỢI Ý
                    </h5>
                </Header>
                <BaseLayout>
                    {/* Code layout ở đây */}
                    <div className="SettingScreen row d-flex justify-content-center ">
                        <div className="col-12">
                            <div className="card bg-white">
                                <div className="card-header">
                                    <div className="card-title d-flex justify-content-between py-3 px-4 m-0">
                                        <div className="m-0">Cài đặt</div>
                                    </div>
                                </div>
                                <div className="card-body row p-4">
                                    <div className="col-12 mb-3">
                                        <BaseTextField
                                            name="model"
                                            label="Model"
                                            disabled={true}
                                            value="text-davinci-003"
                                        />
                                    </div>
                                    <div className="col-6">
                                        <BaseRange
                                            name="temprature"
                                            label="Temprature"
                                            min={0}
                                            max={2}
                                            step={0.01}
                                            value={parseFloat(
                                                settingValue?.temperature
                                            )}
                                            onChange={(e) => {
                                                setSettingValue({
                                                    ...settingValue,
                                                    temperature: e.target.value,
                                                });
                                                setIsEditting(true);
                                            }}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <BaseRange
                                            name="maxToken"
                                            label="Maximum Token"
                                            min={1}
                                            max={4000}
                                            step={1}
                                            value={parseInt(
                                                settingValue?.maxToken
                                            )}
                                            onChange={(e) => {
                                                setSettingValue({
                                                    ...settingValue,
                                                    maxToken: e.target.value,
                                                });
                                                setIsEditting(true);
                                            }}
                                        />
                                    </div>
                                    {isEditting && (
                                        <div className="row col-6 col-lg-4 ms-auto mt-3">
                                            <div className="col-6">
                                                <AppButton
                                                    text="Lưu lại"
                                                    className="btn-blue w-100"
                                                    onClick={
                                                        handleChangeSettingValue
                                                    }
                                                />
                                            </div>
                                            <div className="col-6">
                                                <AppButton
                                                    text="Hủy"
                                                    className="btn-cancel w-100"
                                                    onClick={() => {
                                                        setSettingValue(
                                                            AppData.settingValueDefault
                                                        );
                                                        setIsEditting(false);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                            <div className="card bg-white">
                                <div className="card-header">
                                    <div className="card-title d-flex justify-content-between py-3 px-4 m-0">
                                        <div className="m-0">Gợi ý chung</div>
                                        {!isEdittingPromptDefault ? (
                                            <AppButton
                                                text="Chỉnh sửa"
                                                className="btn-blue"
                                                onClick={() =>
                                                    setIsEdittingPromptDefault(
                                                        true
                                                    )
                                                }
                                            />
                                        ) : (
                                            <div className="d-flex">
                                                <AppButton
                                                    text="Hủy"
                                                    className="btn-cancel"
                                                    onClick={() =>
                                                        setIsEdittingPromptDefault(
                                                            false
                                                        )
                                                    }
                                                />
                                                <AppButton
                                                    text="Lưu lại"
                                                    className="btn-blue ms-3"
                                                    onClick={
                                                        handleEditBasePrompt
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="card-body p-4">
                                    {/* <div className="row mb-4">
                                        <div className="col-4">
                                            <div className="title-prompt">
                                                {basePrompt && "Mô tả sản phẩm"}
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <BaseTextArea
                                                name="Prompt mặc định"
                                                placeholder="Nhập gợi ý..."
                                                rows={15}
                                                disabled={
                                                    !isEdittingPromptDefault
                                                }
                                                value={
                                                    basePrompt &&
                                                    basePrompt?.promptDesc
                                                }
                                            />
                                        </div>
                                    </div> */}
                                    <div className="row mb-4">
                                        <div className="col-4">
                                            <div className="title-prompt">
                                                SEO sản phẩm
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <BaseTextArea
                                                name="SEOPrompt"
                                                placeholder="Nhập gợi ý..."
                                                rows={18}
                                                disabled={
                                                    !isEdittingPromptDefault
                                                }
                                                value={
                                                    basePromptList &&
                                                    basePromptList?.promptSEO
                                                }
                                                onChange={(e) =>
                                                    setBasePromptList({
                                                        ...basePromptList,
                                                        promptSEO:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                            <div className="card bg-white">
                                <div className="card-header">
                                    <div className="card-title d-flex justify-content-between py-3 px-4 m-0">
                                        <div className="m-0">
                                            Danh sách gợi ý
                                        </div>
                                        <div className="w-50">
                                            <BaseSearchBar
                                                placeholder="Tìm kiếm gợi ý"
                                                value={filters.name}
                                                name="PromptFilter"
                                                onSubmit={(value) => {
                                                    setFilters({
                                                        ...filters,
                                                        name: value,
                                                    });
                                                }}
                                            />
                                        </div>
                                        <AppButton
                                            text="Thêm gợi ý"
                                            className="btn-blue"
                                            onClick={() =>
                                                setShowModalCreatePrompt(true)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="card-body row p-4">
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Danh mục</th>
                                                <th>Gợi ý danh mục</th>
                                                <th>Thực hiện</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filterPromptList?.promptList?.map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {filterPromptList?.page *
                                                                filterPromptList?.size +
                                                                index +
                                                                1}
                                                        </td>
                                                        <td>{item?.name}</td>
                                                        <td>{item?.value}</td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <AppButton
                                                                    // text="Sửa"
                                                                    beforIcon={
                                                                        <i className="fa-regular fa-pen-to-square"></i>
                                                                    }
                                                                    className="btn-green px-3 py-2 me-3"
                                                                    fontSize="0.9rem"
                                                                    onClick={() => {
                                                                        setShowModalEditPrompt(
                                                                            true
                                                                        );
                                                                        setSelectedPrompt(
                                                                            item
                                                                        );
                                                                    }}
                                                                />
                                                                <AppButton
                                                                    // text="Xóa"
                                                                    beforIcon={
                                                                        <i className="fa-regular fa-trash-can"></i>
                                                                    }
                                                                    className="btn-danger px-3 py-2"
                                                                    fontSize="0.9rem"
                                                                    onClick={() => {
                                                                        setShowModalDeletePrompt(
                                                                            true
                                                                        );
                                                                        setSelectedPrompt(
                                                                            item
                                                                        );
                                                                    }}
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </Table>
                                    <div className="d-flex align-items-center justify-content-center mt-0">
                                        <Pagination
                                            size={filterPromptList?.size}
                                            currentPage={
                                                filterPromptList?.page + 1 ?? 1
                                            }
                                            totalPages={
                                                filterPromptList?.totalPages
                                            }
                                            onChangePage={(newPage) => {
                                                setFilters({
                                                    ...filters,
                                                    page: newPage - 1,
                                                });
                                            }}
                                            onChangeSize={(newSize) => {
                                                setFilters({
                                                    ...filters,
                                                    page: 0,
                                                    size: newSize,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BaseLayout>
            </div>
            <ModalCreatePrompt
                updateData={updateData}
                show={showModalCreatePrompt}
                onClose={() => setShowModalCreatePrompt(false)}
            />
            <ModalEditPrompt
                updateData={updateData}
                promptInfo={selectedPrompt}
                show={showModalEditPrompt}
                onClose={() => setShowModalEditPrompt(false)}
            />
            <DialogModal
                show={showModalDeletePrompt}
                onClose={() => setShowModalDeletePrompt(false)}
                title="Xóa gợi ý danh mục"
                icon="fa-regular fa-trash-can text-primary"
                description={`Bạn có chắc chắn muốn xóa gợi ý danh mục ${selectedPrompt.name}?`}
                onExecute={handleDeletePrompt}
                textBtnCancel="Hủy"
                textBtnExecute="Xác nhận"
            />
        </div>
    );
}

SettingScreen.propTypes = {};

export default SettingScreen;
