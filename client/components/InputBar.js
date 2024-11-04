"use client";
import { useState } from "react";
import SendButton from "@/components/SendButton";
import { userHistory } from "@/app/page";
import { Get_emoji} from "@/app/globals";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("[LOG]", e.target[0].value);
    let emoji = Get_emoji();
    const maxAttempts = 1200; 
    let attempts = 0;

    while (emoji === "" && attempts < maxAttempts) {
        await delay(100); 
        emoji = Get_emoji();
        attempts++;
    }

    if (emoji !== "") {
        console.log("[Emoji LOG]", emoji);
        return emoji;
    } else {
        console.error("Failed to retrieve emoji from WebSocket within 2 minutes.");
        return null; 
    }
};



const InputBar = ({ setResponse, setInput, setIsSendClicked }) => {
    const [userInput, setUserInput] = useState("");
    const data = {
        message_data: userInput,
    };

    return (
        <>
            <form 
            className="flex-col relative items-center gap-10" 
            onSubmit={async (e) => {
                const resp = await handleSubmit(e);
                setResponse(resp);
                setInput(userInput);
                userHistory.push({ input: userInput, response: resp, timestamp: new Date() });
                setUserInput("");
                console.log(userHistory);
            }}>
                <div className="flex relative w-[100%]">
                    <textarea
                        name="userInput"
                        placeholder="Enter your text here"
                        className="no-scrollbar transition transform hover:shadow-2xl active:shadow-2xl flex-1 shadow-xl border-gray-300 border-[0.5px] rounded-[10px] p-[1rem] pb-10 resize-none focus:outline-none min-h-[150px] max-h-[500px]"
                        wrap="soft"
                        value={userInput}
                        onChange={(event) => setUserInput(event.target.value)}
                    ></textarea>
                </div>
                <div className="absolute bottom-[1rem] right-[1rem]">
                    <SendButton
                        onClick={() => {
                            setIsSendClicked(true);
                        }}
                        isActive={userInput !== ""}
                        data={data}
                    />
                </div>
            </form>
        </>
    );
};

export default InputBar;
