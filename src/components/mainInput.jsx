import React from "react";
import styled from "styled-components";
import PretendardText from "./pretendardText";

function MainInput({
  type,
  placeholder,
  value,
  onChange,
  onClick,
  onError,
  disabled,
  style,
  dataPlaceholder,
  onKeyDown,
  step,
  helperText,
  isCm,
}) {
  return (
    <MainInputContainer>
      <MainInputWrapper
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        data-placeholder={dataPlaceholder}
        value={value || ""}
        onChange={onChange}
        onClick={onClick}
        onError={onError}
        onKeyDown={onKeyDown}
        step={step}
        style={{
          ...style,
          borderColor: `${onError ? "#FF003D" : "#ebebeb"}`,
        }}
      />
      {isCm && <CmText>cm</CmText>}
      {onError ? <HelperText onError={onError}>{helperText}</HelperText> : ""}
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
  height: 55px;
  padding: 14px 15px;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  background: #fff;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: -0.6px;
  color: #111111;

  &::placeholder {
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 21.25px;
    color: #777777;
  }

  &:focus {
    outline: none;
    border: 1px solid var(--sub-color-3, #27beff);
  }

  &:disabled {
    outline: none;
    border: 1px solid #d7dbe0;
    background: #eef2f3;
    color: #b8bfc4;
  }
`;

const CmText = styled(PretendardText).attrs((props) => {})`
  color: #111;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: -0.6px;
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
`;

const HelperText = styled(PretendardText).attrs((props) => {})`
  font-size: 14px;
  font-weight: 500;
  line-height: 22.75px;
  color: ${(props) => (props.onError ? "#FF003D" : "#808991")};
  margin-top: 3px;
`;
