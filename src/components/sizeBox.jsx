import React from "react";
import styled from "styled-components";
import PretendardText from "./pretendardText";
import { useMediaQuery } from "react-responsive";

const SizeBox = ({ title, value, isCm }) => {
  const isMobile = useMediaQuery({ query: "(max-resolution: 430px)" });

  return (
    <SizeBoxWrapper $isMobile={isMobile}>
      <PretendardText
        style={{
          color: "#777",
          fontSize: isMobile ? "12px" : "18px",
          fontWeight: "400",
          fontSize: isMobile ? "18px" : "27px",
          fontSize: isMobile ? "-0.35px" : "-0.6px",
        }}
      >
        {title}
      </PretendardText>
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        <PretendardText
          style={{
            color: "#111",
            fontSize: isMobile ? "12px" : "18px",
            fontWeight: "600",
            fontSize: isMobile ? "18px" : "27px",
            fontSize: isMobile ? "-0.35px" : "-0.6px",
          }}
        >
          {value}
        </PretendardText>
        {isCm ? (
          <PretendardText
            style={{
              color: "#111",
              fontSize: isMobile ? "12px" : "14px",
              fontWeight: "600",
              fontSize: isMobile ? "18px" : "21px",
              fontSize: isMobile ? "-0.35px" : "-0.6px",
            }}
          >
            cm
          </PretendardText>
        ) : null}
      </div>
    </SizeBoxWrapper>
  );
};

export default SizeBox;

const SizeBoxWrapper = styled.div.attrs((props) => {})`
  width: 100%;
  background-color: #f6f6f6;
  border-radius: 4px;
  padding: ${(props) => (props.$isMobile ? "10px" : " 14px 15px")};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
