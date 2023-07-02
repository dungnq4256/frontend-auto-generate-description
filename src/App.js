import { AuthProvider } from "AuthContext";
import CreateProductScreen from "features/CreateProductScreen";
import SettingScreen from "features/SettingScreen";
import StatisticalScreen from "features/StatisticalScreen";
import AppToast from "general/components/AppToast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
require("bootstrap/dist/js/bootstrap.min");

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SettingScreen />} />
                    <Route path="/statistic" element={<StatisticalScreen />} />
                    <Route path="/create" element={<CreateProductScreen />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <AppToast />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
