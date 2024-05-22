import React from "react";

const Image = (props) => {
  return (
    <section id="imageType" className={`imageType__wrap ${props.element}`}>
      <h2>{props.title}</h2>
      {/*<p>최적의 비용 맞춤 검색</p>*/}
      <div className="image__inner container">
        <article className="image img1">
          <h3 className="image__title">EC2</h3>
          <p className="image__desc">
            설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명
          </p>
          <a
            className="image__btn"
            href="https://aws.amazon.com/ko/ec2/pricing/on-demand/"
            target="_blank"
            rel="noopener noreferrer"
          >
            자세히 보기
          </a>
        </article>
        <article className="image img2">
          <h3 className="image__title">RDS</h3>
          <p className="image__desc">
            설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명
          </p>
          <a
            className="image__btn yellow"
            href="https://aws.amazon.com/ko/rds/pricing/"
            target="_blank"
            rel="noopener noreferrer"
          >
            자세히 보기
          </a>
        </article>
      </div>
    </section>
  );
};

export default Image;
