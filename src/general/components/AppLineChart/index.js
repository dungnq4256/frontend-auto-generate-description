import PropTypes from "prop-types";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import "./style.scss";

AppLineChart.propTypes = {
    data: PropTypes.array,
    dataKeyX: PropTypes.string,
    dataKeyY: PropTypes.string,
};
AppLineChart.defaultProps = {
    data: [],
    dataKeyX: "",
    dataKeyY: "",
};
function AppLineChart(props) {
    const { data, dataKeyX, dataKeyY } = props;
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="#0088ff"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#0088ff"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <XAxis dataKey={dataKeyX} />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                    type="monotone"
                    activeDot={{ r: 6 }}
                    dataKey={dataKeyY}
                    stroke="#0088ff"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default AppLineChart;
