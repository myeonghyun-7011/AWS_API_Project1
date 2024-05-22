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
            AWS EC2 인스턴스의 CPU 사용률을 모니터링하고, 이를 기반으로 가장
            비용 효율적인 온디맨드 요금을 제공하는 인스턴스 타입을
            추천해드립니다. 이 서비스는 CloudWatch 지표를 활용하여 인스턴스의
            성능과 비용을 최적화하는 데 도움이 됩니다.
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
            AWS RDS 인스턴스의 CPU 사용률을 모니터링하고, 이를 기반으로 가장
            비용 효율적인 인스턴스 타입을 추천해드립니다. <br />이 서비스는
            CloudWatch 지표를 활용하여 인스턴스의 성능과 비용을 최적화하는 데
            도움이 됩니다.
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
