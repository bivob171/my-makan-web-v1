"use client";
import { PopupContext, PopupProvider } from "@/Context/successPopupContext";
import { SuccessPopUp } from "../Component/PopUp/SuccessPopUp";
import { useContext } from "react";

export default function Layout({ children }) {
  const { responseMessage, setResponseMessage, popupMassage, setPopupMassage } =
    useContext(PopupContext);

  return (
    <div>
      <div>{children}</div>

      <SuccessPopUp
        visible={popupMassage}
        closePopUp={setPopupMassage}
        massage={responseMessage}
      />
    </div>
  );
}
