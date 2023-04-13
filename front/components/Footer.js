import Link from "next/link";
import { useEffect, useState } from "react";
import axios from 'axios';
import Image from "next/future/image";

function Footer() {
    const [footerData, setFooterData] = useState(null)
    useEffect(() => {
        const fetchFooter = async () => {
            const { data } = await axios.get(process.env.NEXT_PUBLIC_API_HOST + "/api/index-page?populate[0]=HeaderLinks&populate[1]=Footer&populate[2]=Footer.navigationLinks");
            setFooterData(data.data.attributes.Footer);
        }
        fetchFooter();
    }, [])
    return (
        <footer className="footer">
            {footerData && <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <div className="footer-logo">
                            <a href="#" className="header-logo__title footer-logo__title">
                                <span className="header-logo__title--bold">{footerData.footerTitle.split('.')[0]}.</span>{footerData.footerTitle.split('.')[1]}</a>
                        </div>
                        <p className="footer__subscribe">{footerData.titleDescription}</p>
                        <form className="footer-form">
                            <label className="footer-form__label">
                                <input type="email" className="footer-form__input" placeholder="Enter your email" />
                            </label>
                        </form>
                        <div className="footer-social">
                            <a href={footerData.pinterestLink} className="footer-social__pinterest">
                                <Image src="/static/images/pinterest-icon.png" alt="pinterest icon" width={15} height={15}></Image>
                                
                            </a>
                            <a href={footerData.instagramLink} className="footer-social__pinterest">
                                <Image src="/static/images/instagram-icon.png" alt="instagram icon" width={15} height={15}></Image>
                                
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-3 offset-lg-1 col-md-4 offset-md-2 col-5 offset-1">
                        <nav className="footer-nav">
                            <div className="footer-nav__col">
                                {footerData.navigationLinks.map(item => {
                                    return (<Link href={item.linkUrl} key={item.id}>
                                        <a className="footer-nav__link">{item.linkName}</a>
                                    </Link>)
                                })}
                            </div>
                        </nav>
                    </div>
                    <div className="col-lg-4 offset-lg-1 col-6">
                        <div className="footer-about">
                            <div className="footer-about__title">About</div>
                            <pre className="footer-about__desc">
                                {footerData.aboutDescription}
                            </pre>
                        </div>
                    </div>
                </div>
                <div className="footer-etc">
                    <Image src="/static/images/paypal-icon.png" className="footer-etc__paypal" alt="paypal" width={30} height={20}></Image>
                    <div className="footer-etc__rights">© {new Date().getYear() + 1900} {footerData.footerTitle}</div>
                </div>
            </div>}
        </footer>
    );
}

export default Footer;