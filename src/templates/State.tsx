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
import PageLayout from "../components/layouts/PageLayout";
import { favicon, stagingBaseurl } from "../../sites-global/global";
import { StaticData } from "../../sites-global/staticData";
import Footer from "../components/layouts/footer";
import Header from "../components/layouts/header";
import { Link } from "@yext/pages/components";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "ce_region",
    filter: {
      entityTypes: ["ce_region"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.id",
      "dm_directoryParents.dm_baseEntityCount",
      "dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.id",
      // "c_globalData.c_headerLinks1",
      // "c_globalData.c_footerLinks",
      // "c_globalData.facebookPageUrl",
      // "c_globalData.twitterHandle",
      // "c_globalData.instagramHandle",
      // "c_globalData.address",
      // "c_globalData.c_phoneNumber",
      // "c_globalData.c_companyrn",
      // "c_globalData.c_tikTok",
      //seo section
      // "c_canonical",
      // "c_metaDescription",
      // "c_metaTitle",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  // console.log(document.slug, " document.slug");
  let url = "";
  document?.dm_directoryParents?.map((i: any) => {
    if (i.meta.entityType.id == "ce_country") {
      url += i.slug + "/";
    }
  });
  url += document.slug.toString();

  return url + ".html";
};

// export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
//   return [`index-old/${document.id.toString()}`];
// };

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  var canonical = "";
  document?.dm_directoryParents?.map((entity: any) => {
    canonical = entity.slug.toLowerCase();
  });

  return {
    title: `${
      document.c_meta_title
        ? document.c_meta_title
        : `Kurt Geiger Stores in ${document.name} | Find a Local Store`
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
              : `Use this page to find your nearest Kurt Geiger store in ${document.name} and discover the location details you need to visit us today.`
          }`,
        },
      },

      //   {
      //     type: "meta",
      //     attributes: {
      //       name: "title",
      //       content: `${document.c_metaTitle}`,
      //     },
      //   },
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
              ? stagingBaseurl + canonical + "/" + document.slug + ".html"
              : "/" + document.slug + ".html"
          }`,
        },
      },
      //   // /og tags

      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: `${
            stagingBaseurl
              ? stagingBaseurl + canonical + "/" + document.slug + ".html"
              : "/" + document.slug + ".html"
          }`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : `Find Kurt Geiger Store in ${document.name}. We stock high-quality, robust products at competitive rates.`
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
              : `Find Kurt Geiger Store in ${document.name}. We stock high-quality, robust products at competitive rates.`
          }`,
        },
      },
    ],
  };
};

const region: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    name,
    _site,
    slug,
    address,
    c_banner_image,
    c_bannerHeading,
    dm_directoryParents,
    dm_directoryChildren,
  } = document;
  var sortedChildren = dm_directoryChildren?.sort(function (a: any, b: any) {
    var a = a.name;
    var b = b.name;
    return a < b ? -1 : a > b ? 1 : 0;
  });

  let slugString = "/";
  document.dm_directoryParents.forEach((e: any) => {
    slugString = e.slug + "/";
  });
  const childrenDivs =
    dm_directoryChildren &&
    dm_directoryChildren?.map((entity: any) => {
      let url: any = "";

      url = document.slug.toString();
      let url1: any = "";
      url1 = url.replace(/(\b\S.+\b)(?=.*\1)/g, "").trim();
      if (entity.dm_baseEntityCount == 1) {
        if (
          entity.dm_directoryChildren &&
          entity.dm_directoryChildren[0].slug
        ) {
          return (
            <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4">
              <Link
                key={entity.slug}
                href={
                  slug +
                  "/" +
                  entity.slug +
                  "/" +
                  entity.dm_directoryChildren[0].slug +
                  ".html"
                }
                //href={slug + "/" + entity.slug + ".html"}
                className="text-blue hover:text-red"
                eventName={entity.name}
              >
                {entity.name} ({entity.dm_baseEntityCount})
              </Link>
            </div>
          );
        } else {
          let name: any = entity.dm_directoryChildren[0].name.toLowerCase();
          let string: any = name.toString();
          let removeSpecialCharacters = string.replace(
            /[&\/\\#^+()$~%.'":*?<>{}!@]/g,
            ""
          );
          let result: any = removeSpecialCharacters.replaceAll("  ", "-");
          let finalString: any = result.replaceAll(" ", "-");
          url = `${entity.dm_directoryChildren[0].id}-${finalString}.html`;
          return (
            <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4">
              <Link
                key={entity.slug}
                href={slug + "/" + entity.slug + url}
                className="text-blue hover:text-red"
                rel="noopener noreferrer"
                eventName={`LocationName`}
              >
                {entity.name} ({entity.dm_baseEntityCount})
              </Link>
            </div>
          );
        }
      } else {
        return (
          <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4">
            <Link
              key={entity.slug}
              href={slug + "/" + entity.slug + ".html"}
              className="text-blue hover:text-red"
              rel="noopener noreferrer"
              eventName={`name`}
            >
              {entity.name} ({entity.dm_baseEntityCount})
            </Link>
          </div>
        );
      }
    });
  let templateData = { document: document };
  let breadcrumbScheme: any = [];
  let currentIndex: any = 0;
  dm_directoryParents &&
    dm_directoryParents?.map((i: any, index: any) => {
      currentIndex = index;
      if (index != 0) {
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id": `${stagingBaseurl}${i.slug}.html`,
            name: i.name,
          },
        });
      }
    });
  breadcrumbScheme.push({
    "@type": "ListItem",
    position: currentIndex + 1,
    item: {
      "@id": `${stagingBaseurl}${
        dm_directoryParents[1].slug
      }/${document.slug.toString()}.html`,
      name: document.name,
    },
  });

  // let bannerimage = c_banner_image && c_banner_image.image.url;
  return (
    <>
      <Header _site={_site} logo={_site.c_logo} nav={_site.c_headerNavbar} />
      <PageLayout global={_site} banner={_site.c_banner} />
      <BreadCrumbs
        name={name}
        parents={dm_directoryParents}
        baseUrl={relativePrefixToRoot}
        address={undefined}
      ></BreadCrumbs>
      {/* <div className="location-dtl">     <Banner name={c_bannerHeading?c_bannerHeading:name} c_bannerImage={bannerimage}  /></div> */}

      <div className="content-list">
        <div className="container">
          <div className="sec-title">
            <h2 style={{ textAlign: "center" }}>{name}</h2>
          </div>
          <ul className="region-list">{childrenDivs}</ul>
        </div>
      </div>

      <Footer
        _site={_site}
        fheading={_site?.c_footerNavbarHeading}
        fnav={_site?.c_footerNav}
        tandc={_site?.c_footerTAndC}
      />
    </>
  );
};
export default region;
