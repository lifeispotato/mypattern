import { useEffect, useRef, useState } from "react";
import PretendardText from "../components/pretendardText";
import MainInput from "../components/mainInput";
import SizeBox from "../components/sizeBox";
import StandardSizeBox from "../components/standardSizeBox";
import { standardSize } from "../constant/size";
import { useMediaQuery } from "react-responsive";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { route } from "../router/route";

function Formpage() {
  const navigate = useNavigate();
  const divRef = useRef(null);
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
    if (submission) {
      onClickDownloadButton();
      return;
    }

    let topSize = "";
    let bottomSize = "";

    if (shoulder <= 35) {
      topSize = "size55";
    } else if (shoulder <= 36) {
      topSize = "size66";
    } else if (shoulder <= 37) {
      topSize = "size77";
    } else if (shoulder <= 38) {
      topSize = "size88";
    } else if (shoulder >= 38.5) {
      topSize = "size99";
    }
    if (waist <= 26) {
      bottomSize = "size55";
    } else if (waist <= 28) {
      bottomSize = "size66";
    } else if (waist <= 30) {
      bottomSize = "size77";
    } else if (waist <= 32) {
      bottomSize = "size88";
    } else if (waist >= 34) {
      bottomSize = "size99";
    }

    localStorage.setItem("name", name);
    localStorage.setItem("shoulder", shoulder);
    localStorage.setItem("chest", chest);
    localStorage.setItem("sleeve", sleeve);
    localStorage.setItem("waist", waist);
    localStorage.setItem("top", top);
    localStorage.setItem("bottom", bottom);
    localStorage.setItem("pattern", pattern);
    localStorage.setItem("topSize", topSize);
    localStorage.setItem("bottomSize", bottomSize);

    // setSubmission(true);
    navigate(route.result);
    window.parent.postMessage({ action: "navigate" }, "*");
  };

  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    const updateScrollHeight = () => {
      if (divRef.current) {
        const newScrollHeight = divRef.current.scrollHeight;
        setScrollHeight(newScrollHeight);
        console.log("Scroll Height:", newScrollHeight);

        let message = { height: newScrollHeight };
        window.top.postMessage(message, "*");
      }
    };

    updateScrollHeight();

    // MutationObserver 설정
    const observer = new MutationObserver(updateScrollHeight);
    if (divRef.current) {
      observer.observe(divRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    // 윈도우 리사이즈 이벤트 추가
    window.addEventListener("resize", updateScrollHeight);

    // 클린업 함수
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScrollHeight);
    };
  }, []); // 빈 배열로 설정하여 컴포넌트가 마운트될 때 한 번만 실행

  const onClickDownloadButton = () => {
    const target = document.getElementById("download");
    if (!target) {
      return alert("사진 저장에 실패했습니다.");
    }
    html2canvas(target).then((canvas) => {
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.href = canvas.toDataURL("image/png");
      link.download = "여리패턴.png"; // 다운로드 이미지 파일 이름
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div
      ref={divRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "580px",
      }}
    >
      <div
        id="download"
        style={{
          width: "100%",
          padding: isMobile ? "23px" : "40px",
        }}
      >
        <div>
          <PretendardText
            style={{
              color: "#111",
              fontSize: isMobile ? "18px" : "35px",
              fontWeight: "600",
              lineHeight: isMobile ? "25.2px" : submission ? "49px" : "56px",
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
            marginTop: isMobile ? "17px" : "30px",
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
              type={"number"}
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
              type={"number"}
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
              type={"number"}
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
              type={"number"}
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
              type={"number"}
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
              type={"number"}
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
              style={{
                maxWidth: isMobile ? "52px" : "100%",
                height: isMobile ? "52px" : "auto",
              }}
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
                  fontSize: isMobile ? "12px" : "18px",
                  fontWeight: "600",
                  lineHeight: isMobile ? "18px" : "27px",
                  letterSpacing: isMobile ? "-0.35px" : "-0.6px",
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
      </div>
      <div
        style={{
          width: "100%",
          padding: isMobile ? "0 23px" : "0 40px",
          paddingBottom: isMobile ? "23px" : "40px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: submission ? "163px" : "100%",
            padding: isMobile ? "8.66px 0" : "15px 0",
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
            // marginTop: isMobile ? "17px" : submission ? "60px" : "30px",
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
            {submission ? "다운로드 하기" : "제출하기"}
          </PretendardText>
        </div>
      </div>
    </div>
  );
}

export default Formpage;
