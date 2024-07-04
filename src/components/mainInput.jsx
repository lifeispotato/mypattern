import React from "react";
import styled from "styled-components";
import PretendardText from "./pretendardText";
import { useMediaQuery } from "react-responsive";

function MainInput({
  type,
  placeholder,
  value,
  onChange,
  onClick,
  disabled,
  style,
  dataPlaceholder,
  onKeyDown,
  step,
  isCm,
}) {
  const isMobile = useMediaQuery({ query: "(max-width: 430px)" });

  return (
    <MainInputContainer>
      <MainInputWrapper
        $isMobile={isMobile}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        data-placeholder={dataPlaceholder}
        value={value || ""}
        onChange={onChange}
        onClick={onClick}
        onKeyDown={onKeyDown}
        step={step}
        style={{
          ...style,
        }}
      />
      {isCm && <CmText>cm</CmText>}
    </MainInputContainer>
  );
}

export default MainInput;

const MainInputContainer = styled.div.attrs((props) => {})`
  width: 100%;
  position: relative;
`;

const MainInputWrapper = styled.input.attrs((props) => {})`
  width: 100%;
  height: ${(props) => (props.$isMobile ? "38px" : "55px")};
  padding: ${(props) => (props.$isMobile ? "10px" : " 14px 15px")};
  border-radius: 4px;
  border: 1px solid #ebebeb;
  background: #fff;
  font-family: Pretendard;
  font-size: ${(props) => (props.$isMobile ? "12px" : " 18px")};
  font-style: normal;
  font-weight: 400;
  line-height: ${(props) => (props.$isMobile ? "18px" : " 27px")};
  letter-spacing: ${(props) => (props.$isMobile ? "-0.35px" : " -0.6px")};
  color: #111111;

  &::placeholder {
    font-family: Pretendard;
    font-size: ${(props) => (props.$isMobile ? "12px" : " 18px")};
    font-style: normal;
    font-weight: 400;
    line-height: ${(props) => (props.$isMobile ? "18px" : " 27px")};
    letter-spacing: ${(props) => (props.$isMobile ? "-0.35px" : " -0.6px")};
    color: #777777;
  }

  &:focus {
    outline: none;
  }
`;

const CmText = styled(PretendardText).attrs((props) => {})`
  color: #111;
  font-size: ${(props) => (props.$isMobile ? "12px" : " 14px")};
  font-weight: 600;
  line-height: ${(props) => (props.$isMobile ? "18px" : " 21px")};
  letter-spacing: ${(props) => (props.$isMobile ? "-0.35px" : " -0.6px")};
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
`;
