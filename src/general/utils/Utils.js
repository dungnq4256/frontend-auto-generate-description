import axios from "axios";
import moment from "moment/moment";

const Utils = {
    isObject: (object) => {
        return object != null && typeof object === "object";
    },

    // Check object empty
    isObjectEmpty: (obj) => {
        return (
            Utils.isObjectNull(obj) ||
            (Object.keys(obj).length === 0 && obj.constructor === Object)
        );
    },

    // Check object null|undefined
    isObjectNull: (obj) => {
        return (
            obj === null ||
            obj === undefined ||
            obj === "NULL" ||
            obj === "null"
        );
    },
    shallowObjectEqual: (object1, object2) => {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (let key of keys1) {
            if (object1[key] !== object2[key]) {
                return false;
            }
        }

        return true;
    },
    toOption: (list) => {
        let arr = [];
        for (let i = 0; i < list?.length; i++) {
            arr.push({
                value: list[i].value,
                text: list[i].name,
            });
        }
        return arr;
    },

    // format currency VND

    /**
     *
     * @str {string,Number} str,number Dãy Cần Định Dạng
     * @currency {string} : Đơn Vị Theo sau Vd VND
     * @separation {string}: giá trị phân cách giữa các số
     * @returns {string} Xau da được định dạng
     */
    formatCurrency: (str, currency = "", separation = ".") => {
        const format = String(str).replace(/\B(?=(\d{3})+(?!\d))/g, separation);
        return format + currency;
    },


    // format date time
    formatDateTime: (sDateTime, sFormat = "DD/MM/YYYY HH:mm", utc = false) => {
        if (utc) {
            return moment(sDateTime).utc().format(sFormat);
        }
        return moment(sDateTime).local().format(sFormat);
    },
    getTime: (option = "theLastSevenDays") => {
        const currentDate = new Date();
        const fromDate = new Date(currentDate);
        const toDate = new Date(currentDate);
        switch (option) {
            case "today":
                break;
            case "yesterday":
                fromDate.setDate(currentDate.getDate() - 1);
                toDate.setDate(currentDate.getDate() - 1);
                break;
            case "lastWeek":
                const remainingDays =
                    currentDate.getDay() === 0 ? 7 : currentDate.getDay();
                fromDate.setDate(currentDate.getDate() - remainingDays - 6);
                toDate.setDate(currentDate.getDate() - remainingDays);
                break;
            case "theLastSevenDays":
                fromDate.setDate(currentDate.getDate() - 6);
                break;
            case "currentMonth":
                fromDate.setDate(1);
                toDate.setMonth(currentDate.getMonth() + 1, 0);
                break;
            case "lastMonth":
                fromDate.setMonth(currentDate.getMonth() - 1, 1);
                toDate.setDate(0);
                break;
            default:
                break;
        }
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(23, 59, 59, 999);
        return {
            fromDate: moment(fromDate).local().format("YYYY-MM-DD HH:mm:ss"),
            toDate: moment(toDate).local().format("YYYY-MM-DD HH:mm:ss"),
            countDays: moment(toDate).diff(moment(fromDate), "days") + 1,
        };
    },
    uploadCloudinary: async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "test_upload_image");
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dauptgx4q/upload",
                formData
            );
            if (res) {
                return res.data.secure_url;
            }
        } catch (error) {
            console.log({
                result: "failed",
                message: "Upload file to cloudinary failed",
                reason: error.message,
            });
        }
    },
};

export default Utils;
