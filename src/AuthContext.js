import promptApi from "api/promptApi";
import Utils from "general/utils/Utils";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [promptOptions, setPromptOptions] = useState([]);
    const [promptList, setPromptList] = useState([]);
    const [basePrompt, setBasePrompt] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res_prompt = await promptApi.getAllPrompts({
                name: "",
                page: 0,
                size: 5,
            });
            const res_base_prompt = await promptApi.getBasePrompts();
            console.log(res_prompt);
            if (res_base_prompt.result === "success") {
                const data = res_base_prompt.data;
                setBasePrompt(data[0]);
            }
            if (res_prompt.result === "success") {
                const data = res_prompt.data.promptList;
                setPromptList(data);
                let arr_prompt = Utils.toOption(data);
                setPromptOptions(arr_prompt);
            }
        };
        fetchData();

        return () => {};
    }, []);

    return (
        <AuthContext.Provider
            value={{
                promptOptions,
                promptList,
                basePrompt,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
