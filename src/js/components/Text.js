import React from "react";

const textInfo = [
  {
    title: "모니터링",
    desc: "AWS CloudWatch Metric-Data를 활용하여 모니터링 진행",
    src: "/",
  },
  {
    title: "지표 수집 및 분석",
    desc: "AWS CloudWatch를 통해 일주일 동안의 CPU 사용률 지표를 수집 및 분석",
    src: "/",
  },
  {
    title: "인스턴스 타입 추천",
    desc: "수집된 데이터를 분석하여 사용자의 현재 워크로드 사용량에 맞는 인스턴스 타입 추천",
    src: "/",
  },
];

const Text = (props) => {
  return (
    <section id="textType" className={`text__wrap ${props.element}`}>
      <span>{props.title}</span>
      <h2 className="text_sub_title">서비스 안내</h2>
      <div className="text__inner container">
        {textInfo.map((text, key) => (
          <div className={`text t${key + 1}`} key={key}>
            <h3 className="text__title">{text.title}</h3>
            <p className="text__desc">{text.desc}</p>
            {/*<a className="text__btn" href={text.src}>
              AWS 더보기
        </a>*/}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Text;
