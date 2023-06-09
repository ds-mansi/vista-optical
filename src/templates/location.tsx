import * as React from "react";
import Banner from "../components/locationDetail/banner";
import Cta from "../components/commons/cta";
import Contact from "../components/locationDetail/contact";
import ApiCall from "../Apis/ApiCall";
import Nearby from "../components/locationDetail/Nearby";
import { CustomFieldDebuggerReactProvider } from "@yext/custom-field-debugger";
import { JsonLd } from "react-schemaorg";
import Opening from "../components/commons/openClose";
import { nearByLocation } from "../types/nearByLocation";
import Logo from "../images/logo-header.svg";
import offerBanner from "../images/offer-banner.jpg";
import IframeMap from "../components/locationDetail/IframeMap";
import "../index.css";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  TransformProps,
  HeadConfig,
} from "@yext/pages";
import PageLayout from "../components/layouts/PageLayout";
import { fetch } from "@yext/pages/util";
import Nav from "../components/layouts/Nav";
import Footer from "../components/layouts/footer";
import Menu from "../components/locationDetail/Menu";
import PhotoSlider from "../components/locationDetail/PhotoSlider";
import PhotoGallery from "../components/locationDetail/PhotoGallery";
import About from "../components/locationDetail/About";
import Breadcrumb from "../components/layouts/Breadcrumb";
import CustomMap from "../components/locationDetail/CustomMap";
import BreadCrumbs from "../components/layouts/Breadcrumb";
import StoreHighlight from "../components/locationDetail/SoreHighlight";
import OpenClose from "../components/commons/openClose";
import Faq from "../components/locationDetail/Faqs";
import { StaticData } from "../../sites-global/staticData";

import {
  apikey_for_entity,
  baseuRL,
  stagingBaseurl,
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
  favicon,
} from "../../sites-global/global";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import FeaturesBrand from "../components/locationDetail/FeaturesBrand";
import { Fade, Slide } from "react-awesome-reveal";
import MgmTimber from "../components/locationDetail/MgmTimber";
import { AnswerExperienceConfig } from "../config/answersHeadlessConfig";
import Header from "../components/layouts/header";
import Explore from "../components/locationDetail/explore";
import NearByLocation from "../components/locationDetail/Nearby";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "locations",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "hours",
      "slug",
      "c_drName",
      "timezone",
      "yextDisplayCoordinate",
      "displayCoordinate",
      "cityCoordinate",
      "c_abouts",
      "c_faq.question",
      "c_faq.answer",
      "c_category",
      "c_brandText",
      "c_brandSlider",
      "c_exploreSection",
      "c_categoryName",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryParents.c_addressRegionDisplayName",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
let url = "";
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  var name: any = document.name?.toLowerCase();
  var mainPhone: any = document.mainPhone;
  var country: any = document.address.countryCode?.toLowerCase();
  var region: any = document.address.region?.toLowerCase().replaceAll(" ", "-");
  var initialregion: any = region.toString();
  var finalregion: any = initialregion.replaceAll(" ", "-");
  var city: any = document.address.city?.toLowerCase()?.replaceAll(" ", "-");
  var initialrcity: any = city.toString();
  var finalcity: any = initialrcity.replaceAll(" ", "-");
  var string: any = name.toString();
  let result1: any = string.replaceAll(" ", "-");
  var link =
    country +
    "/" +
    region +
    "/" +
    city +
    "/" +
    document?.slug?.toString() +
    ".html";
  // var link=document.id.toString()
  // console.log(link, "link");
  if (!document.slug) {
    url = `/${link}.html`;
  } else {
    url = `/${link}`;
  }

  return url;
};
/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.c_meta_title
      ? document.c_meta_title
      : `${document.name} Store of  Vista Optical`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : `Find the ${document.name} Vista Store in ${document.address.city}. We stock high-quality, robust products at competitive rates.`
          }`,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "author",
          content: StaticData.Brandname,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "robots",
          content: "noindex, nofollow",
        },
      },

      {
        type: "link",
        attributes: {
          // rel: "canonical",
          // href: `${
          //   document._site.c_canonical ? document.c_canonical : stagingBaseurl
          // }${
          //   document.slug ? document.slug : `${document.name.toLowerCase()}`
          // }.html`,
        },
      },

      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : `Find the ${document.name} Vista Store in ${document.address.city}. We stock high-quality, robust products at competitive rates.`
          }`,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          href: favicon,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${document.name}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:image",
          content: favicon,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:card",
          content: "summary",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:title",
          content: document.c_meta_title
            ? document.c_meta_title
            : `${document.name} Store of  Vista Optical`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : `Find the ${document.name} Vista Store in ${document.address.city}. We stock high-quality, robust products at competitive rates.`
          }`,
        },
      },
      /// twitter tag
    ],
  };
};
// type ExternalApiData = TemplateProps & { externalApiData: nearByLocation };
// export const transformProps: TransformProps<ExternalApiData> = async (
//   data: any
// ) => {

//   var location = `${data.document.yextDisplayCoordinate ? data.document.yextDisplayCoordinate.latitude : data.document.displayCoordinate.latitude},${data.document.yextDisplayCoordinate ? data.document.yextDisplayCoordinate.longitude : data.document.displayCoordinate.longitude}`;

//     const url = `${AnswerExperienceConfig.endpoints.verticalSearch}?experienceKey=${AnswerExperienceConfig.experienceKey}&api_key=${AnswerExperienceConfig.apiKey}&v=20220511&version=${AnswerExperienceConfig.experienceVersion}&locale=${AnswerExperienceConfig.locale}&location=${location}&locationRadius=${AnswerExperienceConfig.locationRadius}&verticalKey=${AnswerExperienceConfig.verticalKey}&limit=4&retrieveFacets=true&skipSpellCheck=false&sessionTrackingEnabled=true&source=STANDARD`;
//  console.log(url)
//   const externalApiData = (await fetch(url).then((res: any) =>
//     res.json()

//   )) as nearByLocation;
//   return { ...data, externalApiData };
// };



type ExternalApiData = TemplateProps & { externalApiData: nearByLocation };
export const transformProps: TransformProps<ExternalApiData> = async (
  data: any
) => {
  const url = `https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query?locationRadius=1600000&experienceKey=${AnswerExperienceConfig.experienceKey}&api_key=${AnswerExperienceConfig.apiKey}&v=20220511&version=STAGING&locale=${AnswerExperienceConfig.locale}&input=&location=${data.document.yextDisplayCoordinate.latitude},${data.document.yextDisplayCoordinate.longitude}&verticalKey=locations&limit=4&retrieveFacets=true&skipSpellCheck=false&session_id=9107c465-4f13-489e-a435-87754c56c5c2&sessionTrackingEnabled=true&sortBys=[]&source=STANDARD`;
  const externalApiData = (await fetch(url).then((res: any) =>
    res.json()
  )) as nearByLocation;
  return { ...data, externalApiData };
};

type ExternalApiRenderData = TemplateRenderProps & {
  externalApiData: nearByLocation;
};


const Location: Template<ExternalApiRenderData> = ({
  relativePrefixToRoot,
  path,
  document,
  __meta,
  externalApiData,
}) => {
  const {
    _site,
    address,
    slug,
    hours,
    mainPhone,
    photoGallery,
    c_banner_image,
    c_canonical,
    description,
    additionalHoursText,
    timezone,
    yextDisplayCoordinate,
    displayCoordinate,
    cityCoordinate,
    name,
    dm_directoryParents,
    c_abouts,
    c_brandSlider,
    c_brandText,
    c_exploreSection,
    c_faq,
    c_category,
    c_categoryName,
  } = document;
console.log(externalApiData,"externalApiData")
  let templateData = { document: document, __meta: __meta };
  let hoursSchema = [];
  let breadcrumbScheme = [];
  for (var key in hours) {
    if (hours.hasOwnProperty(key)) {
      let openIntervalsSchema = "";
      if (key !== "holidayHours") {
        if (hours[key].isClosed) {
          openIntervalsSchema = {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: key,
          };
        } else {
          let end = "";
          let start = "";
          if (typeof hours[key].openIntervals != "undefined") {
            let openIntervals = hours[key].openIntervals;
            for (var o in openIntervals) {
              if (openIntervals.hasOwnProperty(o)) {
                end = openIntervals[o].end;
                start = openIntervals[o].start;
              }
            }
          }
          openIntervalsSchema = {
            "@type": "OpeningHoursSpecification",
            closes: end,
            dayOfWeek: key,
            opens: start,
          };
        }
      } else {
      }

      hoursSchema.push(openIntervalsSchema);
    }
  }
  document.dm_directoryParents &&
    document?.dm_directoryParents?.map((i: any, index: any) => {
      if (i.meta.entityType.id == "ce_country") {
        document.dm_directoryParents[index].name =
          document.dm_directoryParents[index].name;
        document.dm_directoryParents[index].slug =
          document.dm_directoryParents[index].slug;

        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id":
              stagingBaseurl +
              document.dm_directoryParents[index].slug +
              ".html",
            name: i.name,
          },
        });
      } else if (i.meta.entityType.id == "ce_region") {
        let url = "";
        document?.dm_directoryParents?.map((j: any) => {
          if (
            j.meta.entityType.id != "ce_region" &&
            j.meta.entityType.id != "ce_city" &&
            j.meta.entityType.id != "ce_root"
          ) {
            // console.log(j, "j");
            url = url + j.slug;
          }
        });
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id":
              stagingBaseurl +
              url +
              "/" +
              document.dm_directoryParents[index].slug +
              ".html",
            name: i.name,
          },
        });
      } else if (i.meta.entityType.id == "ce_city") {
        let url = "";
        document?.dm_directoryParents?.map((j: any) => {
          if (
            j.meta.entityType.id != "ce_city" &&
            j.meta.entityType.id != "ce_root"
          ) {
            // console.log(j, "j");
            url = url + "/" + j.slug;
          }
        });
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id":
              stagingBaseurl +
              url +
              "/" +
              document.dm_directoryParents[index].slug +
              ".html",
            name: i.name,
          },
        });
      }
    });

  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 4,
    item: {
      "@id": stagingBaseurl + path,
      name: document.name,
    },
  });
  let imageurl = photoGallery
    ? photoGallery?.map((element: any) => {
        return element.image.url;
      })
    : null;
  // console.log(document);

  return (
    <>
      <JsonLd<Store>
        item={{
          "@context": "https://schema.org",
          "@type": "DepartmentStore",
          name: name,
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.countryCode,
          },
          openingHoursSpecification: hoursSchema,
          description: description,
          image: imageurl,
          telephone: mainPhone,
          url: `${c_canonical ? c_canonical : stagingBaseurl}${
            slug ? slug : `${name}`
          }.html`,
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",

          itemListElement: breadcrumbScheme,
        }}
      />

      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={""}>
          <Header
            _site={_site}
            logo={_site.c_logo}
            nav={_site.c_headerNavbar}
          />
          <PageLayout global={_site} banner={_site.c_banner} />
          <BreadCrumbs
            name={name}
            parents={dm_directoryParents}
            baseUrl={relativePrefixToRoot}
            address={address}
          ></BreadCrumbs>
          <div className="container">
            <div className="banner-text banner-dark-bg justify-center text-center">
              <h1 className="font-bold">{name}</h1>
              {/* <div className="openClosestatus detail-page closeing-div">
                <OpenClose timezone={timezone} hours={hours} />
              </div> */}
            </div>
          </div>
          <div className="location-information">
            <Contact
              address={address}
              phone={mainPhone}
              latitude={
                yextDisplayCoordinate
                  ? yextDisplayCoordinate.latitude
                  : displayCoordinate?.latitude
              }
              yextDisplayCoordinate={yextDisplayCoordinate}
              longitude={
                yextDisplayCoordinate
                  ? yextDisplayCoordinate.longitude
                  : displayCoordinate?.longitude
              }
              hours={hours}
              additionalHoursText={additionalHoursText}
            ></Contact>
            {hours ? (
              <div className="map-sec" id="map_canvas">
                <CustomMap
                  prop={
                    yextDisplayCoordinate
                      ? yextDisplayCoordinate
                      : displayCoordinate
                  }
                />
              </div>
            ) : (
              <div className="map-sec without-hours" id="map_canvas">
                <CustomMap
                  prop={
                    yextDisplayCoordinate
                      ? yextDisplayCoordinate
                      : displayCoordinate
                  }
                />
              </div>
            )}
          </div>
          {/* about section */}

          <div style={{ position: "relative" }}>
            <img src={c_abouts?.aboutImg?.url} alt="" />
            <div
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                margin: "70px 80px 0px 0px",
              }}
            >
              <h1>{c_abouts?.aboutHeading}</h1>
              <p style={{ marginTop: "20px" }}>{c_abouts?.aboutDesc}</p>
              {/* <button className="about-btn"> */}
              <br />
              <a className="about-btn" href={c_abouts?.aboutCta?.link}>
                {c_abouts?.aboutCta?.label}
              </a>
              {/* </button> */}
            </div>
          </div>
          {/* about end */}
          {/* brand slider start */}
          <h2
            style={{
              textAlign: "center",
              color: "#002C73",
              padding: "25px 0px 5px 0px",
            }}
          >
            {c_brandText}
          </h2>
          <PhotoSlider brand={c_brandSlider} />
          {/* brand slider end */}

          {/* category section start */}
          <h2 style={{ color: "#002C73", textAlign: "center" }}>
            {c_categoryName}
          </h2>
          <div className="flex" style={{ justifyContent: "center" }}>
            {c_category?.map((ca: any) => {
              return (
                <>
                  {ca.categoryImg?.map((ci: any) => {
                    return (
                      <img
                        src={ci.url}
                        style={{
                          width: "350px",
                          height: "195px",
                          marginLeft: "30px",
                        }}
                        alt=""
                      />
                    );
                  })}
                </>
              );
            })}
          </div>
          <div
            className="flex"
            style={{
              gap: "206px",
              fontSize: "25px",
              justifyContent: "center",
              paddingBottom: "10px",
              paddingTop: "10px",
            }}
          >
            {c_category?.map((ca: any) => {
              return (
                <>
                  <h4>{ca?.categoryName}</h4>
                </>
              );
            })}
          </div>
          <div
            className="flex m-auto"
            style={{ gap: "270px", justifyContent: "center" }}
          >
            {c_category?.map((ca: any) => {
              return (
                <>
                  {/* <button className="category-btn"> */}
                  <a className="category-btn" href={ca?.categoryCTA?.link}>
                    {ca?.categoryCTA?.label}
                  </a>
                  {/* </button> */}
                </>
              );
            })}
          </div>
          {/*  category section end */}
          {/* faq start */}
          {c_faq ? (
            <div className="w-full  pt-8">
              <h4 className="sec_heading  text-[30px] text-center pt-4 text-[#002C73]">
                How can we help ?
              </h4>
              {<Faq prop={c_faq} />}
            </div>
          ) : (
            <></>
          )}
          {/* faq end */}
          {externalApiData?.response?.results?.length > 0 ? (
          <div className="nearby-sec">
            <div className="container">
              <div className="sec-title">
                <h2 className="">{StaticData.NearStoretext}</h2>
              </div>
              <div className="nearby-sec-inner">
                {/* {yextDisplayCoordinate ||
                cityCoordinate ||
                displayCoordinate ? (
                  <Nearby externalApiData={externalApiData} />
              ) : (
                  ""
                )}  */}
                  <NearByLocation
                prop={externalApiData}
                parents={dm_directoryParents}
                baseUrl={relativePrefixToRoot}
                coords={yextDisplayCoordinate}
                slug={slug}
              />
              </div>
            </div>
            {/* <button className="view-more-btn"> */}
            <a className="view-more-btn" href="/index.html">
              <p style={{ paddingLeft: "25%" }}>View More Location</p>
            </a>
            {/* </button> */}
          </div>
           ) : (
            ""
          )}

          {/* explore section start */}
          <Explore prop={c_exploreSection} />
          {/* explore section end */}
          <Footer
            _site={_site}
            fheading={_site?.c_footerNavbarHeading}
            fnav={_site?.c_footerNav}
            tandc={_site?.c_footerTAndC}
          />
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};

export default Location;
