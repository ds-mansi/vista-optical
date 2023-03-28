import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import BreadCrumbs from "../components/layouts/Breadcrumb";
import constant from "../constant";
import Banner from "../components/locationDetail/banner";
import { StaticData } from "../../sites-global/staticData";
import PageLayout from "../components/layouts/PageLayout";
import {
  favicon,
  regionNames,
  stagingBaseurl,
} from "../../sites-global/global";
import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";

/**
 * Required when Knowledge Graph data is used for a template.
 */
var currentUrl = "";
export const config: TemplateConfig = {
  stream: {
    $id: "ce_country",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["ce_country"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  currentUrl = "/" + document.slug.toString().replaceAll(" ", "-") + ".html";
  return "/" + document.slug.toString().replaceAll(" ", "-") + ".html";
};

// export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
//   return [`index-old/${document.id.toString()}`];
// };

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: `${
      document.c_meta_title
        ? document.c_meta_title
        : `Bumper to Bumper in ${document.name} | Find a Local Store`
    }`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
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
          name: "description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : `Use this page to find your nearest Bumper store in ${document.name} and discover the location details you need to visit us today.`
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
          name: "keywords",
          content: document.name,
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
          rel: "canonical",
          href: `${
            stagingBaseurl
              ? stagingBaseurl + document.slug + ".html"
              : "/" + document.slug + ".html"
          }`,
        },
      },
      //   // /og tags

      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: `/${
            document.slug ? document.slug : `${document.name.toLowerCase()}`
          }.html`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : `Find Bumper Store in ${document.name}. We stock high-quality, robust products at competitive rates.`
          }`,
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
          name: "twitter:url",
          content: `/${
            document.slug ? document.slug : `${document.name.toLowerCase()}`
          }.html`,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : `Find Bumper Store in ${document.name}. We stock high-quality, robust products at competitive rates.`
          }`,
        },
      },
    ],
  };
};

const country: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const { description, dm_directoryChildren, dm_directoryParents, c_tagline } =
    document;
  const {
    name,
    slug,
    c_globalData,
    _site,
    c_metaDescription,
    c_metaTitle,
    __meta,
  } = document;
  // console.log(dm_directoryChildren,"dm_directoryChildren");
  // condition of slug acc to count of cities in region
  // slug on country page if state contains more than 1 cities or region contain only one city

  const childrenDivs = dm_directoryChildren
    ? dm_directoryChildren.map((entity: any) => {
        // console.log(entity, "entity");
        let detlslug;

        let mainSlug = "";
        if (entity.dm_baseEntityCount == 1) {
          let cityChild = entity.dm_directoryChildren
            ? entity.dm_directoryChildren
            : null;
          let childCityName = cityChild.map((res: any) => {
            let storesName = res.dm_directoryChildren;
            let storesChildName = storesName.map((stores: any) => {
              return stores.name;
            });
            let cityName = res.name.toLowerCase().replaceAll(" ", "-");
            let slugUrl = cityName + "/" + storesChildName;
            return slugUrl;
          });
          mainSlug = "this";
          return (
            <li className=" storelocation-category">
              <a
                key={entity.slug}
                href={
                  slug +
                  "/" +
                  entity.name.toLowerCase().replaceAll(" ", "-") +
                  "/" +
                  childCityName +
                  ".html"
                }
              >
                {entity.name} ({entity.dm_baseEntityCount})
              </a>
            </li>
          );
        }
        return (
          <li className=" storelocation-category">
            <a key={entity.slug} href={slug + "/" + entity.slug + ".html"}>
              {entity.name} ({entity.dm_baseEntityCount})
            </a>
          </li>
        );
      })
    : null;

  // let bannerimage = c_locatorBannerImage ? c_locatorBannerImage.map((element: any) => {
  //   return element.url
  // }) : null;

  return (
    <>
      {/* header call */}
      <Header _site={_site} logo={_site.c_logo} nav={_site.c_headerNavbar} />
      {/* header ends */}
      <PageLayout global={_site} banner={_site.c_banner} />
      {/* breadcrumb call */}
      <BreadCrumbs
        name={regionNames.of(name)}
        address={undefined}
        parents={dm_directoryParents}
        baseUrl={relativePrefixToRoot}
      ></BreadCrumbs>
      {/* breadcrumb end */}
      {/* <div className="location-dtl">
          <Banner name={regionNames.of(name)} c_bannerImage={bannerimage} />
        </div> */}

      <div className="content-list">
        <div className="container">
          <div className="sec-title">
            <h2 style={{ textAlign: "center" }}>
              {StaticData.AllRegion} {regionNames.of(name)}{" "}
            </h2>
          </div>

          <ul className="region-list">{childrenDivs}</ul>
        </div>
      </div>
      {/* Footer starts */}
      <Footer
        _site={_site}
        fheading={_site.c_footerNavbarHeading}
        fnav={_site.c_footerNav}
        tandc={_site.c_footerTAndC}
      />
      {/* footer ends */}
    </>
  );
};

export default country;
