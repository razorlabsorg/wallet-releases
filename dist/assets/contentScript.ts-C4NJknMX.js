import { M as MESSAGE_TYPE, E as ETHEREUM_LISTENER_TYPE, A as APTOS_LISTENER_TYPE, S as SUI_LISTENER_TYPE } from "./index-DCiertCK.js";
window.addEventListener(
  "message",
  (event) => {
    if (event.data?.isRazor && event.data?.type === MESSAGE_TYPE.REQUEST__WEB_TO_CONTENT_SCRIPT) {
      const { data } = event;
      const toBackgroundMessage = {
        line: data.line,
        type: MESSAGE_TYPE.REQUEST__CONTENT_SCRIPT_TO_BACKGROUND,
        origin: event.origin,
        messageId: data.messageId,
        message: data.message
      };
      void chrome.runtime.sendMessage(toBackgroundMessage);
    }
  }
);
chrome.runtime.onMessage.addListener(
  (request, _, sendResponse) => {
    if (request?.type === MESSAGE_TYPE.RESPONSE__CONTENT_SCRIPT_TO_BACKGROUND) {
      sendResponse();
      const toWebMessage = {
        response: request.response,
        message: request.message,
        messageId: request.messageId,
        isRazor: true,
        type: MESSAGE_TYPE.RESPONSE__WEB_TO_CONTENT_SCRIPT
      };
      window.postMessage(toWebMessage);
    }
  }
);
chrome.runtime.onMessage.addListener(
  (request, _, sendResponse) => {
    const types = (() => {
      if (request.line === "ETHEREUM")
        return Object.values(ETHEREUM_LISTENER_TYPE);
      if (request.line === "APTOS")
        return Object.values(APTOS_LISTENER_TYPE);
      if (request.line === "SUI")
        return Object.values(SUI_LISTENER_TYPE);
      return [];
    })();
    if (types.includes(request?.type)) {
      sendResponse();
      const toWebMessage = {
        line: request.line,
        type: request.type,
        isRazor: true,
        message: request.message
      };
      window.postMessage(toWebMessage);
    }
  }
);
const injectScript = () => {
  try {
    const script = document.createElement("script");
    const url = chrome.runtime.getURL("injectScript.js");
    script.setAttribute("src", url);
    script.setAttribute("type", "module");
    const container = document.head || document.documentElement;
    container.insertBefore(script, container.firstElementChild);
    container.removeChild(script);
    console.log("Razor Wallet Injected Successfully");
  } catch (error) {
    console.error("Razor Wallet Injection failed", error);
  }
};
injectScript();
