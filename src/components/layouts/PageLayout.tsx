import * as React from "react";
import Footer from "./footer";
import Nav from "./Nav";

type Props = {
  title?: string;
  _site?: any;
  global: any;
  children?: React.ReactNode;
  banner?: any;
};

const PageLayout = ({ title, _site, global, children, banner }: Props) => {
  // console.log(banner.bannerCta.label, "bannerimg");
  return (
    <>
      <div style={{ position: "relative" }}>
        <img src={banner.bannerImage.url} aria-readonly/>
        <div style={{ position: "absolute", top: "0" ,padding:"70px"}}>
          <h1>{banner.bannerLine1}</h1>
          <h3>{banner.bannerLine2}</h3>
          <button className="banner-btn">
            <a href={banner.bannerCta.link}>{banner.bannerCta.label}</a>
          </button>
        </div>
      </div>
    </>
  );
};

export default PageLayout;
