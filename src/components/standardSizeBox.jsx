import React from "react";
import styled from "styled-components";
import PretendardText from "./pretendardText";
import { useMediaQuery } from "react-responsive";

const StandardSizeBox = ({ title, value, style }) => {
  const isMobile = useMediaQuery({ query: "(max-resolution: 430px)" });

  return (
    <StandardSizeBoxWrapper style={style}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F2F2F2",
          padding: "15px 0",
        }}
      >
        <PretendardText
          style={{
            color: "#111",
            fontSize: isMobile ? "12px" : "18px",
            fontWeight: "400",
            fontSize: isMobile ? "18px" : "27px",
            fontSize: isMobile ? "-0.35px" : "-0.6px",
          }}
        >
          {title}
        </PretendardText>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          padding: "15px 0",
        }}
      >
        <PretendardText
          style={{
            color: "#111",
            fontSize: isMobile ? "12px" : "18px",
            fontWeight: "400",
            fontSize: isMobile ? "18px" : "27px",
            fontSize: isMobile ? "-0.35px" : "-0.6px",
          }}
        >
          {value}
        </PretendardText>
      </div>
    </StandardSizeBoxWrapper>
  );
};

export default StandardSizeBox;

const StandardSizeBoxWrapper = styled.div.attrs((props) => {})`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
`;
