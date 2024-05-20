import React from "react";

const textInfo = [
  {
    title: "EC2",
    desc: "자바스크립트의 기본 메서드를 통해 검색 스크립트를 완성하는 튜토리얼입니다. 메서드를 통해 쉽게 검색을 만들 수 있습니다",
    src: "/",
  },
  {
    title: "RDS",
    desc: "주관식 및 객관식 퀴즈를 통해 데이터를 주고 받는 방법에 대해서 익히는 튜토리얼입니다.",
    src: "/",
  },
  {
    title: "S3",
    desc: "마우스를 통해 요소를 움직이고, 효과를 주는 스크립트 튜토리얼입니다. 다양한 효과를 통해 스크립트를 익힐 수 있습니다.",
    src: "/",
  },
];

const Text = (props) => {
  return (
    <section id="textType" className={`text__wrap ${props.element}`}>
      <span>{props.title}</span>
      <h2 className="mb70">서비스 안내</h2>
      <div className="text__inner container">
        {textInfo.map((text, key) => (
          <div className={`text t${key + 1}`} key={key}>
            <h3 className="text__title">{text.title}</h3>
            <p className="text__desc">{text.desc}</p>
            <a className="text__btn" href={text.src}>
              AWS 더보기
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Text;
