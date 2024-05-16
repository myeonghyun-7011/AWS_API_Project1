import React from 'react'

const Footer = ( props ) => {
    return (
        <footer id="footerType" className={`footer__wrap ${props.element}`}>
            <h2 className="blind">푸터 영역</h2>
            <div className="footer__inner container">
                <div className="footer__right">
                    2022 Webstoryboy. Portfolio is Power<br />All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer