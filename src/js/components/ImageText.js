import React from 'react'

const ImgText = ( props ) => {
    return (
        <section id="imgTextType" className={`imgText__wrap ${props.element}`}>
            <h2 className="blind">{props.title}</h2>
            <div className="imgText__inner container">
                <div className="imgText__txt">
                    <span className="small">이미지 텍스트 유형01</span>
                    <h3 className="title">유용한 사이트 살펴보기</h3>
                    <p className="desc">웹디자이너, 웹 퍼블리셔, 프론트앤드 개발자를 위한 유용한 사이트입니다.</p>
                    <ul className="list">
                        <li><a href="/">튜토리얼 사이트</a></li>
                        <li><a href="/">레퍼런스 사이트</a></li>
                        <li><a href="/">웹폰트 사이트</a></li>
                        <li><a href="/">CSS 사이트</a></li>
                        <li><a href="/">WebGL 사이트</a></li>
                        <li><a href="/">Youtube 사이트</a></li>
                    </ul>
                </div>
                <div className="imgText__img img1">
                    <a href="/">레퍼런스 사이트</a>
                </div>
                <div className="imgText__img img2">
                    <a href="/" className="blue">튜토리얼 사이트</a>
                </div>
            </div>
        </section>
    )
}

export default ImgText