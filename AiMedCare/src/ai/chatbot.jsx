import { useEffect } from "react";

const ChatBot = () => {
  useEffect(() => {
    // Prevent duplicate initialization
    if (window.botpress) return;

    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v3.5/inject.js";
    script.async = true;

    script.onload = () => {
      window.botpress.init({
        botId: "3bea9fe9-77f4-4b31-afae-8a16d636bc53",
        clientId: "bc5356be-5dbe-4d8d-ba24-4d0768b21fc6",
        configuration: {
          version: "v2",
          botName: "AIMEDCARE",
          themeMode: "light",
          color: "#199ff7",
          variant: "solid",
          headerVariant: "glass",
          fontFamily: "inter",
          radius: 4,
          soundEnabled: false,
          feedbackEnabled: false,
          proactiveMessageEnabled: false,
          footer: "AIMEDCARE",
          additionalStylesheetUrl:
            "https://files.bpcontent.cloud/2025/12/08/13/20251208133457-VQ8L3GRE.css",
        },
      });
    };

    document.body.appendChild(script);
  }, []);

  return null;
};

export default ChatBot;
