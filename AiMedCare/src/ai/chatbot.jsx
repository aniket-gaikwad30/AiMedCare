import { useEffect } from "react";

export default function Chatbot() {
  useEffect(() => {
    
    const injectScript = document.createElement("script");
    injectScript.src = "https://cdn.botpress.cloud/webchat/v3.4/inject.js";
    injectScript.async = true;

    injectScript.onload = () => {
      
      const botScript = document.createElement("script");
      botScript.src =
        "https://files.bpcontent.cloud/2025/10/30/16/20251030160507-3CDA1GGA.js";
      botScript.defer = true;

      document.body.appendChild(botScript);
    };
    document.body.appendChild(injectScript);
  }, []);

  return <div id="aimedcare"></div>;
}
