import { useEffect, useState } from "react";
import "./App.css";
import PretendardText from "./components/pretendardText";
import MainInput from "./components/mainInput";
import SizeBox from "./components/sizeBox";
import StandardSizeBox from "./components/standardSizeBox";
import { standardSize } from "./constant/size";
import { useMediaQuery } from "react-responsive";

function App() {
  const isMobile = useMediaQuery({ query: "(max-width: 430px)" });

  const [name, setName] = useState(null);
  const [shoulder, setShoulder] = useState(null);
  const [chest, setChest] = useState(null);
  const [sleeve, setSleeve] = useState(null);
  const [waist, setWaist] = useState(null);
  const [top, setTop] = useState(null);
  const [bottom, setBottom] = useState(null);
  const [pattern, setPattern] = useState(null);

  const [submission, setSubmission] = useState(false);

  const [topSize, setTopSize] = useState("size0");
  const [bottomSize, setBottomSize] = useState("size0");

  const checkSize = () => {
    if (shoulder <= 35) {
      setTopSize("size55");
    } else if (shoulder <= 36) {
      setTopSize("size66");
    } else if (shoulder <= 37) {
      setTopSize("size77");
    } else if (shoulder <= 38) {
      setTopSize("size88");
    } else if (shoulder >= 38.5) {
      setTopSize("size99");
    }
    if (waist <= 26) {
      setBottomSize("size55");
    } else if (waist <= 28) {
      setBottomSize("size66");
    } else if (waist <= 30) {
      setBottomSize("size77");
    } else if (waist <= 32) {
      setBottomSize("size88");
    } else if (waist >= 34) {
      setBottomSize("size99");
    }

    setSubmission(true);
  };

  return (
    <div
      style={{
        padding: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <PretendardText
          style={{
            color: "#111",
            fontSize: isMobile ? "18px" : "35px",
            fontWeight: "600",
            lineHeight: submission ? "49px" : "56px",
            letterSpacing: isMobile ? "-0.35px" : "-0.6px",
            textAlign: "center",
          }}
        >
          {submission ? (
            <>
              여리패턴
              <br />
              신체 치수 결과입니다.
            </>
          ) : (
            "온라인으로 신체 치수재기"
          )}
        </PretendardText>
        {submission ? null : (
          <PretendardText
            style={{
              color: "#444",
              fontSize: isMobile ? "12px" : "18px",
              fontWeight: "400",
              lineHeight: isMobile ? "18px" : "27px",
              letterSpacing: isMobile ? "-0.35px" : "-0.6px",
              textAlign: "center",
              marginTop: isMobile ? "8.66px" : "15px",
            }}
          >
            이제 집에서도 손쉽게 정확한 치수를 측정하고,
            <br />
            맞는 패턴을 추천해드립니다.
          </PretendardText>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isMobile ? "8.66px" : submission ? "10px" : "15px",
          width: "100%",
          marginTop: isMobile ? "17pxpx" : "30px",
        }}
      >
        {submission ? (
          <SizeBox title="이름" value={name} />
        ) : (
          <MainInput
            placeholder={"이름*"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        {submission ? (
          <SizeBox title="어깨" value={shoulder} isCm={true} />
        ) : (
          <MainInput
            placeholder={"어깨*"}
            value={shoulder}
            onChange={(e) => setShoulder(e.target.value)}
            isCm={true}
          />
        )}
        {submission ? (
          <SizeBox title="가슴둘레" value={chest} isCm={true} />
        ) : (
          <MainInput
            placeholder={"가슴둘레*"}
            value={chest}
            onChange={(e) => setChest(e.target.value)}
            isCm={true}
          />
        )}
        {submission ? (
          <SizeBox title="소매길이" value={sleeve} isCm={true} />
        ) : (
          <MainInput
            placeholder={"소매길이*"}
            value={sleeve}
            onChange={(e) => setSleeve(e.target.value)}
            isCm={true}
          />
        )}
        {submission ? (
          <SizeBox title="허리둘레" value={waist} isCm={true} />
        ) : (
          <MainInput
            placeholder={"허리둘레*"}
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            isCm={true}
          />
        )}
        {submission ? (
          <SizeBox title="상의총장" value={top} isCm={true} />
        ) : (
          <MainInput
            placeholder={"상의총장*"}
            value={top}
            onChange={(e) => setTop(e.target.value)}
            isCm={true}
          />
        )}
        {submission ? (
          <SizeBox title="하의총장" value={bottom} isCm={true} />
        ) : (
          <MainInput
            placeholder={"하의총장*"}
            value={bottom}
            onChange={(e) => setBottom(e.target.value)}
            isCm={true}
          />
        )}
      </div>
      {submission ? (
        <div
          style={{
            width: "100%",
            backgroundColor: "#f6f6f6",
            borderRadius: "4px",
            padding: isMobile ? "10px" : "14px 15px",
            display: "flex",
            justifyContent: "space-between",
            marginTop: isMobile ? "8.66px" : "10px",
          }}
        >
          <PretendardText
            style={{
              color: "#777",
              fontSize: isMobile ? "12px" : "18px",
              fontWeight: "400",
              lineHeight: isMobile ? "18px" : "27px",
              letterSpacing: isMobile ? "-0.35px" : "-0.6px",
            }}
          >
            패턴유형
          </PretendardText>
          <img
            src={`/pattern${pattern}.png`}
            alt=""
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      ) : (
        <div style={{ width: "100%", marginTop: "30px" }}>
          <PretendardText
            style={{
              color: "#111",
              fontSize: isMobile ? "12px" : "18px",
              fontWeight: "400",
              lineHeight: isMobile ? "18px" : "27px",
              letterSpacing: isMobile ? "-0.35px" : "-0.6px",
            }}
          >
            패턴 유형
          </PretendardText>
          <div
            style={{
              marginTop: "14px",
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                onClick={() => setPattern(num)}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  flex: "1 1 0", // Flex-grow, flex-shrink, flex-basis
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={`/pattern${num}.png`}
                  alt=""
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <img
                  src={`/radio_${pattern === num ? "a" : "d"}.png`}
                  alt=""
                  style={{
                    width: "18%",
                    height: "18%",
                    position: "absolute",
                    top: "5px",
                    left: "5px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {submission ? (
        <>
          <div style={{ width: "100%", marginTop: "40px" }}>
            <PretendardText
              style={{
                color: "#111",
                fontSize: isMobile ? "12px" : "18px",
                fontWeight: "600",
                lineHeight: isMobile ? "18px" : "27px",
                letterSpacing: isMobile ? "-0.35px" : "-0.6px",
              }}
            >
              상의 치수
            </PretendardText>
            <div style={{ display: "flex", marginTop: "15px" }}>
              <StandardSizeBox
                title="사이즈"
                value={standardSize[topSize]?.size}
              />
              <StandardSizeBox
                title="어깨"
                value={standardSize[topSize]?.shoulder}
              />
              <StandardSizeBox
                title="가슴 둘레"
                value={standardSize[topSize]?.chest}
              />
              <StandardSizeBox
                title="소매"
                value={standardSize[topSize]?.sleeve}
              />
              <StandardSizeBox
                title="총장"
                value={standardSize[topSize]?.top}
              />
            </div>
          </div>
          <div style={{ width: "100%", marginTop: "40px" }}>
            <PretendardText
              style={{
                color: "#111",
                fontSize: "18px",
                fontWeight: "600",
                lineHeight: "25.2px",
                letterSpacing: "-0.6px",
              }}
            >
              하의 치수
            </PretendardText>
            <div style={{ display: "flex", marginTop: "15px" }}>
              <StandardSizeBox
                title="사이즈"
                value={standardSize[bottomSize]?.size}
              />
              <StandardSizeBox
                title="가슴 둘레"
                value={standardSize[bottomSize]?.waist}
              />
              <StandardSizeBox
                title="총장"
                value={standardSize[bottomSize]?.bottom}
              />
            </div>
          </div>
        </>
      ) : null}

      {submission ? null : (
        <div
          style={{
            width: "100%",
            padding: "15px 0",
            backgroundColor:
              name &&
              shoulder &&
              chest &&
              sleeve &&
              waist &&
              top &&
              bottom &&
              pattern
                ? "#8E847D"
                : "#CCCCCC",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50px",
            cursor: "pointer",
            marginTop: isMobile ? "17px" : "30px",
          }}
          onClick={() => {
            if (
              name &&
              shoulder &&
              chest &&
              sleeve &&
              waist &&
              top &&
              bottom &&
              pattern
            ) {
              checkSize();
            }
          }}
        >
          <PretendardText
            style={{
              color: "#fff",
              fontSize: isMobile ? "12px" : "18px",
              fontWeight: "500",
              lineHeight: isMobile ? "18px" : "27px",
              letterSpacing: isMobile ? "-0.35px" : "-0.6px",
            }}
          >
            제출하기
          </PretendardText>
        </div>
      )}
    </div>
  );
}

export default App;
