import React from "react";
import styled from "styled-components";

const PretendardText = (props) => {
  return <PretendardTextWrapper {...props} />;
};

export default PretendardText;

const PretendardTextWrapper = styled.div.attrs((props) => {})`
  font-family: "Pretendard";
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  display: block;
`;
