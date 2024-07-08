import { useEffect, useRef, useState } from "react";
import PretendardText from "../components/pretendardText";
import SizeBox from "../components/sizeBox";
import StandardSizeBox from "../components/standardSizeBox";
import { standardSize } from "../constant/size";
import { useMediaQuery } from "react-responsive";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

function ResultPage() {
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

  const [topSize, setTopSize] = useState("size0");
  const [bottomSize, setBottomSize] = useState("size0");

  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setShoulder(localStorage.getItem("shoulder"));
    setChest(localStorage.getItem("chest"));
    setSleeve(localStorage.getItem("sleeve"));
    setWaist(localStorage.getItem("waist"));
    setTop(localStorage.getItem("top"));
    setBottom(localStorage.getItem("bottom"));
    setPattern(localStorage.getItem("pattern"));
    setTopSize(localStorage.getItem("topSize"));
    setBottomSize(localStorage.getItem("bottomSize"));
  }, []);

  useEffect(() => {
    const updateScrollHeight = () => {
      if (divRef.current) {
        const newScrollHeight = divRef.current.scrollHeight;
        setScrollHeight(newScrollHeight);

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

  useEffect(() => {
    const handlePopState = (event) => {
      // 뒤로가기 버튼을 눌렀을 때 원하는 페이지로 리다이렉트
      navigate("/");
    };

    // popstate 이벤트 리스너 추가
    window.addEventListener("popstate", handlePopState);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 정리
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: isMobile ? "8.66px" : "10px",
            width: "100%",
          }}
        >
          <SizeBox title="이름" value={name} />
          <SizeBox title="어깨" value={shoulder} isCm={true} />
          <SizeBox title="가슴둘레" value={chest} isCm={true} />
          <SizeBox title="소매길이" value={sleeve} isCm={true} />
          <SizeBox title="허리둘레" value={waist} isCm={true} />
          <SizeBox title="상의총장" value={top} isCm={true} />
          <SizeBox title="하의총장" value={bottom} isCm={true} />
        </div>
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
            width: "163px",
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
          }}
          onClick={() => {
            onClickDownloadButton();
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
            다운로드 하기
          </PretendardText>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
