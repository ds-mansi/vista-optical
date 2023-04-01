// src/template/404.tsx
import {
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  GetPath,
  Template,
  TemplateConfig,
} from "@yext/pages";
import * as React from "react";
import { favicon } from "../../sites-global/global";
import { StaticData } from "../../sites-global/staticData";
import Footer from "../components/layouts/footer";
import Header from "../components/layouts/header";
import PageLayout from "../components/layouts/PageLayout";
import "../index.css";
export const config: TemplateConfig = {
  stream: {
    $id: "404",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: ["name"],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityIds: ["global-data"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

// The path must be exactly 404.html
export const getPath: GetPath<TemplateProps> = () => {
  return "404.html";
};

// Add a title to the page
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => {
  return {
    title: "Not Found",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          href: favicon,
        },
      },
    ],
  };
};

// Template that will show as the page
const FourOhFour: Template<TemplateRenderProps> = ({ document }) => {
  const { _site } = document;
  return (
    <>
      <Header _site={_site} logo={_site.c_logo} nav={_site.c_headerNavbar} />
      <div className="bg-[#f1dfdf] w-auto text-center text-xs py-1 font-bold">
        {_site.c_error.headMain}
      </div>
      <div className="content-list">
        <div className="container flex">
          <img src={_site.c_error.errorImg.url} />
          <div className="left-0 mb-4 md:mb-7">
            <h1>{_site.c_error.errorHeading}</h1>
            <p>{_site.c_error.errorDesc}</p>
            <p>{_site.c_error.errorDesc2}</p>
            <button>
              {_site?.c_error?.errorCta?.map((error: any) => {
                return (
                  <ul>
                    <li className="text-[#0073B7] underline left-0 ">
                      <a href="/">{error.label}</a>
                    </li>
                  </ul>
                );
              })}
            </button>
            {/* <h1 className="" style={{ textAlign: "center" }}>
              {StaticData.PagenotFound}
            </h1>
            <p>{StaticData.cantfind_page}.</p>
            <p>{StaticData.Youcouldtry}</p> */}
            <div className="button-bx max-w-[45rem] !mx-auto !mt-5">
              {/* <a className="btn" href="javascript:history.back()">
                {StaticData.Previuspage} &gt;
              </a> */}
              <h4>{_site?.c_error?.searchHeading}</h4>
              <div className="mt-5">
                <a className="err-btn" href="/">
                  {StaticData.homePage} 
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer
        _site={_site}
        fheading={_site.c_footerNavbarHeading}
        fnav={_site.c_footerNav}
        tandc={_site.c_footerTAndC}
      />
    </>
  );
};

export default FourOhFour;
