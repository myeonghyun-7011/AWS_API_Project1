import React from "react";

const Image = (props) => {
  return (
    <section id="imageType" className={`imageType__wrap ${props.element}`}>
      <h2>{props.title}</h2>
      <p>최적의 비용 맞춤 검색</p>
      <div className="image__inner container">
        <article className="image img1">
          <h3 className="image__title">강아지계의 연예인</h3>
          <p className="image__desc">
            최근 연예인들 사이에서 키우는 강아지로 유명해진 비숑프리제는
            생김새가 아주 작은 바빗과 매우 흡사하여 바비숑이라는
          </p>
          <a className="image__btn" href="/">
            자세히 보기
          </a>
        </article>
        <article className="image img2">
          <h3 className="image__title">강아지계의 마스코트</h3>
          <p className="image__desc">
            최근 연예인들 사이에서 키우는 강아지로 유명해진 비숑프리제는
            생김새가 아주 작은 바빗과 매우 흡사하여 바비숑이라는
          </p>
          <a className="image__btn yellow" href="/">
            자세히 보기
          </a>
        </article>
      </div>
    </section>
  );
};

export default Image;
