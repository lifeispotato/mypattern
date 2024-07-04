import React from "react";
import styled from "styled-components";
import PretendardText from "./pretendardText";

const SizeBox = ({ title, value, isCm }) => {
  return (
    <SizeBoxWrapper>
      <PretendardText
        style={{
          color: "#777",
          fontSize: "18px",
          fontWeight: "400",
          lineHeight: "27px",
          letterSpacing: "-0.6px",
        }}
      >
        {title}
      </PretendardText>
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        <PretendardText
          style={{
            color: "#111",
            fontSize: "18px",
            fontWeight: "600",
            lineHeight: "27px",
            letterSpacing: "-0.6px",
          }}
        >
          {value}
        </PretendardText>
        {isCm ? (
          <PretendardText
            style={{
              color: "#111",
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "21px",
              letterSpacing: "-0.6px",
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
  padding: 14px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
