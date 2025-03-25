import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../features/slice/slice";

const styles: React.CSSProperties = {
  position: "absolute",
  border: "none",
  top: "80%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
};

const buttonStyles: React.CSSProperties = {
  backgroundColor: "orange",
  color: "white",
  border: "none",
  padding: "0.5rem 1rem",
  cursor: "pointer",
  borderRadius: "0.5rem",
};
interface PageState {
  page: {
    currentPage: string;
  };
}

const UI = () => {
  const currentPage = useSelector((state: PageState) => state.page.currentPage);
  const dispatch = useDispatch();
  return (
    <div style={{ ...styles, opacity: currentPage === "home" ? "" : "0" }}>
      {currentPage === "store" ? <title>Store 3d</title> : ""}
      <button
        onClick={() => {
          dispatch(setCurrentPage("store"));
          console.log(currentPage);
        }}
        style={buttonStyles}
      >
        ENTER
      </button>
    </div>
  );
};

export default UI;
