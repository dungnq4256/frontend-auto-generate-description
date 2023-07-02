import AppLineChart from "general/components/AppLineChart";
import BaseLayout from "general/components/BaseLayout";
import Header from "general/components/Header";
import SideBar from "general/components/SideBar";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import AppButton from "general/components/AppButton";
import statisticalApi from "api/statisticalApi";
import Utils from "general/utils/Utils";
import BaseDropdown from "general/components/BaseForm/BaseDropdown";
import AppData from "general/constants/AppData";
import moment from "moment/moment";

function StatisticalScreen(props) {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [selectedOption, setSelectedOption] = useState("theLastSevenDays");
    const [dataKeyY, setDataKeyY] = useState("Tổng số token");
    const [countDays, setCountDays] = useState(1);
    console.log(countDays);
    const [statisticData, setStatisticData] = useState({
        totalPromptTokens: 0,
        totalCompletionTokens: 0,
        totalTokens: 0,
        totalCost: 0,
        totalQuerys: 0,
        averagePromptTokens: 0,
        averageCompletionTokens: 0,
        averageTokens: 0,
        averageCost: 0,
        averageQuerys: 0,
    });
    // console.log(startDate, endDate);
    const [data, setData] = useState([]);
    console.log(data);
    useEffect(() => {
        const fetchData = async () => {
            if (selectedOption !== "other") {
                const res = await statisticalApi.getStatisticalData({
                    fromDate: Utils.getTime(selectedOption).fromDate,
                    toDate: Utils.getTime(selectedOption).toDate,
                });
                if (res.result === "success") {
                    const data1 = [];
                    res?.data?.map((item) =>
                        data1.push({
                            "Token đầu vào": item.totalPromptTokens,
                            "Token đầu ra": item.totalCompletionTokens,
                            "Tổng số token":
                            item.totalPromptTokens +
                            item.totalCompletionTokens,
                            date: Utils.formatDateTime(item.date, "DD/MM/YYYY"),
                            "Số truy vấn": item.queryQuantity,
                        })
                    );
                    setData(data1);
                }
            }
        };
        fetchData();
    }, [selectedOption]);

    const handleGetStatistical = async () => {
        setSelectedOption("other");
        endDate.setHours(23, 59, 59, 999);
        const res = await statisticalApi.getStatisticalData({
            fromDate: Utils.formatDateTime(startDate, "YYYY-MM-DD HH:mm:ss"),
            toDate: Utils.formatDateTime(endDate, "YYYY-MM-DD HH:mm:ss"),
        });
        if (res.result === "success") {
            const data2 = [];
            res?.data?.map((item) =>
                data2.push({
                    "Token đầu vào": item.totalPromptTokens,
                    "Token đầu ra": item.totalCompletionTokens,
                    "Tổng số token":
                        item.totalPromptTokens + item.totalCompletionTokens,
                    date: Utils.formatDateTime(item.date, "DD/MM/YYYY"),
                    "Số truy vấn": item.queryQuantity,
                })
            );
            setData(data2);
        }
    };

    useEffect(() => {
        let totalPromptTokens = 0;
        let totalCompletionTokens = 0;
        let totalQuerys = 0;
        setCountDays(
            selectedOption === "other"
                ? moment(endDate).diff(moment(startDate), "days") + 1
                : Utils.getTime(selectedOption).countDays
        );
        data.forEach((item) => {
            totalPromptTokens += item["Token đầu vào"];
            totalCompletionTokens += item["Token đầu ra"];
            totalQuerys += item["Số truy vấn"];
        });
        let totalTokens = totalPromptTokens + totalCompletionTokens;
        let totalCost = Utils.formatCurrency(
            Math.ceil((totalTokens * 0.02 * 23585) / 1000),
            " VNĐ",
            "."
        );
        let averageCost = Utils.formatCurrency(
            Math.ceil((totalTokens * 0.02 * 23585) / 1000 / countDays),
            " VNĐ",
            "."
        );
        let averageQuerys = Utils.formatCurrency(
            Math.ceil((totalTokens * 0.02 * 23585) / 1000 / totalQuerys),
            " VNĐ",
            "."
        );
        setStatisticData({
            ...statisticData,
            totalPromptTokens: totalPromptTokens,
            totalCompletionTokens: totalCompletionTokens,
            totalQuerys: totalQuerys,
            totalTokens: totalTokens,
            totalCost: totalCost,
            averagePromptTokens: Math.ceil(totalPromptTokens / countDays),
            averageCompletionTokens: Math.ceil(
                totalCompletionTokens / countDays
            ),
            averageTokens: Math.ceil(totalTokens / countDays),
            averageCost: averageCost,
            averageQuerys: averageQuerys,
        });
    }, [data]);

    return (
        <div className="d-flex w-100">
            <div>
                <SideBar selected="statistic" />
            </div>
            <div className="d-flex flex-column flex-grow-1">
                <Header>
                    {/* Code header ở đây */}
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <h5 className="w-100 m-0 text-center">
                            TRANG THỐNG KÊ
                        </h5>
                    </div>
                </Header>
                <BaseLayout>
                    {/* Code layout ở đây */}
                    <div className="StatisticScreen row d-flex justify-content-center ">
                        <div className="col-12">
                            <div className="card bg-white">
                                {/* <div className="card-header">
                                    <div className="card-title d-flex justify-content-between py-3 px-4 m-0">
                                        <div className="m-0">Cài đặt</div>
                                    </div>
                                </div> */}
                                <div className="card-body w-100 h-100 row p-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        {selectedOption !== "other" && (
                                            <div className="d-flex flex-fill align-items-center fs-5 fw-bold mb-2 ms-4">
                                                Thống kê từ{" "}
                                                {Utils.formatDateTime(
                                                    Utils.getTime(
                                                        selectedOption
                                                    ).fromDate,
                                                    "DD/MM/YYYY"
                                                )}{" "}
                                                đến{" "}
                                                {Utils.formatDateTime(
                                                    Utils.getTime(
                                                        selectedOption
                                                    ).toDate,
                                                    "DD/MM/YYYY"
                                                )}{" "}
                                                theo{" "}
                                                <div className="ms-4 w-25">
                                                    <BaseDropdown
                                                        options={
                                                            AppData.statisticTypeOptions
                                                        }
                                                        name="statisticType"
                                                        dropdownInitialValue="Tổng số token"
                                                        value={dataKeyY}
                                                        onValueChanged={(
                                                            value
                                                        ) => setDataKeyY(value)}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {selectedOption === "other" && (
                                            <div className="d-flex flex-fill align-items-center fs-5 fw-bold mb-2 ms-4">
                                                Thống kê từ{" "}
                                                {Utils.formatDateTime(
                                                    startDate,
                                                    "DD/MM/YYYY"
                                                )}{" "}
                                                đến{" "}
                                                {Utils.formatDateTime(
                                                    endDate,
                                                    "DD/MM/YYYY"
                                                )}{" "}
                                                theo{" "}
                                                <div className="ms-4 w-25">
                                                    <BaseDropdown
                                                        options={
                                                            AppData.statisticTypeOptions
                                                        }
                                                        name="statisticType"
                                                        dropdownInitialValue="Tổng số token"
                                                        value={dataKeyY}
                                                        onValueChanged={(
                                                            value
                                                        ) => setDataKeyY(value)}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div>
                                            <div className="overlay-button-wrapper mt-2 mb-4 me-2 py-1 px-2">
                                                <input
                                                    type="checkbox"
                                                    id="dropdownMenuFilter"
                                                />
                                                <label
                                                    className="d-flex justify-content-center align-items-center m-0"
                                                    htmlFor="dropdownMenuFilter"
                                                    id="overlay-button"
                                                >
                                                    Lọc theo ngày
                                                    <i className="fas fa-sort-down ms-2 mb-1"></i>
                                                </label>
                                                <div
                                                    className="p-2 bg-white rounded"
                                                    id="overlay"
                                                >
                                                    <div className="row">
                                                        <div className="col-6 pe-1 mb-2">
                                                            <div
                                                                className={`option-element p-2 text-center rounded ${
                                                                    selectedOption ===
                                                                        "theLastSevenDays" &&
                                                                    "option-element_active"
                                                                }`}
                                                                onClick={() =>
                                                                    setSelectedOption(
                                                                        "theLastSevenDays"
                                                                    )
                                                                }
                                                            >
                                                                7 ngày gần đây
                                                            </div>
                                                        </div>
                                                        <div className="col-6 ps-1 mb-2">
                                                            <div
                                                                className={`option-element p-2 text-center rounded ${
                                                                    selectedOption ===
                                                                        "today" &&
                                                                    "option-element_active"
                                                                }`}
                                                                onClick={() =>
                                                                    setSelectedOption(
                                                                        "today"
                                                                    )
                                                                }
                                                            >
                                                                Hôm nay
                                                            </div>
                                                        </div>
                                                        <div className="col-6 pe-1 mb-2">
                                                            <div
                                                                className={`option-element p-2 text-center rounded ${
                                                                    selectedOption ===
                                                                        "yesterday" &&
                                                                    "option-element_active"
                                                                }`}
                                                                onClick={() =>
                                                                    setSelectedOption(
                                                                        "yesterday"
                                                                    )
                                                                }
                                                            >
                                                                Hôm qua
                                                            </div>
                                                        </div>
                                                        <div className="col-6 ps-1 mb-2">
                                                            <div
                                                                className={`option-element p-2 text-center rounded ${
                                                                    selectedOption ===
                                                                        "lastWeek" &&
                                                                    "option-element_active"
                                                                }`}
                                                                onClick={() =>
                                                                    setSelectedOption(
                                                                        "lastWeek"
                                                                    )
                                                                }
                                                            >
                                                                Tuần trước
                                                            </div>
                                                        </div>
                                                        <div className="col-6 pe-1 mb-2">
                                                            <div
                                                                className={`option-element p-2 text-center rounded ${
                                                                    selectedOption ===
                                                                        "currentMonth" &&
                                                                    "option-element_active"
                                                                }`}
                                                                onClick={() =>
                                                                    setSelectedOption(
                                                                        "currentMonth"
                                                                    )
                                                                }
                                                            >
                                                                Tháng hiện tại
                                                            </div>
                                                        </div>
                                                        <div className="col-6 ps-1 mb-2">
                                                            <div
                                                                className={`option-element p-2 text-center rounded ${
                                                                    selectedOption ===
                                                                        "lastMonth" &&
                                                                    "option-element_active"
                                                                }`}
                                                                onClick={() =>
                                                                    setSelectedOption(
                                                                        "lastMonth"
                                                                    )
                                                                }
                                                            >
                                                                Tháng trước
                                                            </div>
                                                        </div>
                                                        <div className="col-12 d-flex">
                                                            <ReactDatePicker
                                                                className="react-datepicker_input w-100 p-2 rounded"
                                                                placeholderText="Chọn ngày bắt đầu và kết thúc"
                                                                selectsRange={
                                                                    true
                                                                }
                                                                startDate={
                                                                    startDate
                                                                }
                                                                endDate={
                                                                    endDate
                                                                }
                                                                onChange={(
                                                                    update
                                                                ) => {
                                                                    setDateRange(
                                                                        update
                                                                    );
                                                                }}
                                                                isClearable={
                                                                    true
                                                                }
                                                            />
                                                            {startDate &&
                                                                endDate && (
                                                                    <AppButton
                                                                        beforIcon={
                                                                            <i className="fa-solid fa-arrow-right"></i>
                                                                        }
                                                                        className="btn-blue ms-2"
                                                                        onClick={
                                                                            handleGetStatistical
                                                                        }
                                                                    />
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <AppLineChart
                                        data={data}
                                        dataKeyX="date"
                                        dataKeyY={dataKeyY}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            <div className="card bg-white">
                                <div className="card-body w-100 h-100 row p-4">
                                    <div className="col-6 d-flex justify-content-center align-items-start">
                                        <div className="statistic-name mb-1 me-2">
                                            Tổng số truy vấn
                                        </div>
                                        <div className="statistic-data">
                                            {statisticData.totalQuerys}
                                        </div>
                                    </div>
                                    <div className="col-6 d-flex justify-content-center align-items-start">
                                        <div className="statistic-name mb-1 me-2">
                                            Chi phí trung bình
                                        </div>
                                        <div className="statistic-data">
                                            {statisticData.averageQuerys}/truy vấn
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            <div className="card bg-white">
                                <div className="card-body w-100 h-100 row p-4">
                                    <div className="col-3 mb-4">
                                        <div className="statistic-name mb-1">
                                            Tổng số token
                                        </div>
                                        <div className="statistic-data">
                                            {statisticData.totalTokens}
                                        </div>
                                    </div>
                                    <div className="col-3 mb-4">
                                        <div className="statistic-name mb-1">
                                            Tổng số token đầu vào
                                        </div>
                                        <div className="statistic-data">
                                            {statisticData.totalPromptTokens}
                                        </div>
                                    </div>
                                    <div className="col-3 mb-4">
                                        <div className="statistic-name mb-1">
                                            Tổng số token đầu ra
                                        </div>
                                        <div className="statistic-data">
                                            {
                                                statisticData.totalCompletionTokens
                                            }
                                        </div>
                                    </div>
                                    <div className="col-3 mb-4">
                                        <div className="statistic-name mb-1">
                                            Tổng chi phí
                                        </div>
                                        <div
                                            className="statistic-data"
                                            style={{ color: "#0088ff" }}
                                        >
                                            {statisticData.totalCost}
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="statistic-name mb-1">
                                            Token trung bình
                                        </div>
                                        <div className="statistic-data">
                                            {statisticData.averageTokens}/ngày
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="statistic-name mb-1">
                                            Token đầu vào trung bình
                                        </div>
                                        <div className="statistic-data">
                                            {statisticData.averagePromptTokens}
                                            /ngày
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="statistic-name mb-1">
                                            Token đầu ra trung bình
                                        </div>
                                        <div className="statistic-data">
                                            {
                                                statisticData.averageCompletionTokens
                                            }
                                            /ngày
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="statistic-name mb-1">
                                            Chi phí trung bình
                                        </div>
                                        <div
                                            className="statistic-data"
                                            style={{ color: "#0088ff" }}
                                        >
                                            {statisticData.averageCost}/ngày
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BaseLayout>
            </div>
        </div>
    );
}

StatisticalScreen.propTypes = {};

export default StatisticalScreen;
