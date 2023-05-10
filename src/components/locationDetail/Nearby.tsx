// import * as React from "react";
// import ApiCall from "../../Apis/ApiCall";
// import Address from "../commons/Address";
// import GetDirection from "../commons/GetDirection";
// import OpenClose from "../commons/openClose";
// import timesvg from "../../images/watch-icn.svg";
// import mapimage from "../../images/map.svg";
// import Phonesvg from "../../images/phone.svg";
// // import time from "../../images/time.svg"
// import {
//   Addresssvg,
//   mobilesvg,
//   View_Store,
// } from "../../../sites-global/global";
// import { Splide, SplideSlide } from "@splidejs/react-splide";
// import { Link } from "@yext/pages/components";
// import phone from "../../images/phone.svg";
// import { StaticData } from "../../../sites-global/staticData";
// import { time } from "../../images/time.svg";

// export default function Nearby(props: any) {
  
//   const [neabyData, setnearbyData] = React.useState(props.externalApiData.response.results);
//   const metersToMiles = (meters: number) => {

//     const miles = meters * 0.000621371;
//     return miles.toFixed(2);
//   }
//   // console.log("neabyData", neabyData);

//   return (
//     <>
//       {/* <Splide
//         id="splide-nearby"
//         options={{
//           rewind: false,
//           type: "slide",
//           perPage: 3,
//           perMove: 1,
//           arrows: false,
//           drag: false,
//           pagination: false,
//           lazyLoad: "nearby",
//           breakpoints: {
//             1279: {
//               perPage: 1,
//               drag: true,
//               pagination: true,
//               arrows: false,
//               type: "splide",
//             },
//           },
//         }}
//       > */}
//       {neabyData?.entities?.map((location: any, index: number) => {
//         console.log(location,"location")
//         let url = "";
//         // console.log(location.slug,"id")
//         var name: any = location.name?.toLowerCase();
//         var mainPhone: any = location.mainPhone;
//         var country: any = location.address.countryCode?.toLowerCase();
//         var region: any = location.address.region?.toLowerCase().replaceAll(" ", "-");
//         var initialregion: any = region.toString();
//         var finalregion: any = initialregion.replaceAll(" ", "-");
//         var city: any = location.address.city?.toLowerCase()?.replaceAll(" ", "-");
//         var initialrcity: any = city.toString();
//         var finalcity: any = initialrcity.replaceAll(" ", "-");
//         var string: any = name.toString();
//         let result1: any = string.replaceAll(" ", "-");
//         var link =
//           country +
//           "/" +
//           region +
//           "/" +
//           city +
//           "/" +
//           location.slug?.toString() +
//           ".html";
//         // console.log(link,"link")
//         // var link=location.id?.toString()
//         if (!location.slug) {
//           url = `/${link}.html`;
//         } else {
//           url = `/${link}`;
//         }
//         // console.log(url,"url")

//         if (index > 0) {
//           return (
//             <>
//               {/* <SplideSlide key={index}> */}
//               <div className="nearby-card">
//                 <div className="location-name-miles icon-row">
//                   <h2 style={{alignItems:"center"}}>
//                     <Link
//                       className="inline-block notHighlight"
//                       data-ya-track={`${location.name}`}
//                       eventName={`${location.name}`}
//                       rel="noopener noreferrer"
//                       href={`/${link}`}
//                     >
//                       {location.name}
//                     </Link>
//                   </h2>
//                   <div className="distance">
//                     {neabyData?.distances.map((res: any) => {
//                       if (res.id == location.meta.id)
//                         return (
//                           <div className="distance flex">
//                             {metersToMiles(res.distanceMiles)}
//                             <p style={{marginLeft:"5px"}}> miles</p>
//                           </div>
//                         );
//                     })}
//                   </div>
//                 </div>
//                 <div className="flex" >
//                 <div style={{width:"62%"}}>
//                 <div className="icon-row content-col flex">
//                   {/* <img src={mapimage} style={{height:"25px"}}/> */}
//                   <Address address={location.address} />
//                 </div>

//                 <div className="icon-row closeing-div flex">
//                   {/* <img src={time}/> */}
//                   <div style={{ display: "inline-block" }}>
//                     <img
//                       src={timesvg}
//                       style={{ height: "25px", width: "25px" }}
//                       alt=""
//                     />
//                   </div>
//                   <div>
//                     {location.hours ? (
//                       <div
//                         className="flex open-now-string items-center "
//                         data-id={`main-shop-${location.id}`}
//                       >
//                         <OpenClose
//                           timezone={location.timezone}
//                           hours={location.hours}
//                           deliveryHours={location.hours}
//                         ></OpenClose>
//                       </div>
//                     ) : (
//                       <div className="closeddot notHighlight red-dot">
//                         <div className="hours-info text-lg font-second-main-font closeddot">
//                           Closed
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex ml-1 mt-2">
//                   <img src={phone} style={{ height: "30px"}} alt=""/>
//                   {/* <div>{mainPhone}</div> */}
//                   <Link
//                     eventName={"PhoneNumber"}
//                     href={`tel:${mainPhone}`}
//                     rel="noopener noreferrer"
//                   >
//                     {mainPhone}
//                   </Link>
//                 </div>
//                 </div>
//                 <div className="button-bx">
//                   <Link
//                     className="btn"
//                     data-ya-track={`viewstore-${location.name}`}
//                     eventName={`viewstore-${location.name}`}
//                     rel="noopener noreferrer"
//                     href={`/${link}`}
//                   >
//                     {/* <div dangerouslySetInnerHTML={{__html: View_Store}}/> */}
//                     STORE DETAILS
//                   </Link>
//                   <GetDirection
//                     buttonText={
//                       props.c_getDirectionsCTAText
//                         ? props.c_getDirectionsCTAText
//                         : "Get directions"
//                     }
//                     address={location.address}
//                     latitude={
//                       location.displayCoordinate
//                         ? location.displayCoordinate.latitude
//                         : location.yextDisplayCoordinate.latitude
//                     }
//                     longitude={
//                       location.displayCoordinate
//                         ? location.displayCoordinate.longitude
//                         : location.yextDisplayCoordinate.longitude
//                     }
//                   />
//                 </div>
//                 </div>
//               </div>
//               {/* </SplideSlide> */}
//             </>
//           );
//         }
//       })}
//       {/* </Splide> */}
//     </>
//   );
// }



import * as React from "react";
import { useEffect, useState } from "react";
import "@splidejs/react-splide/css";
import { Address, Link } from "@yext/pages/components";
import OpenClose from "../commons/openClose";
import GetDirection from "../commons/GetDirection";
import timesvg from "../../images/watch-icn.svg";
import mapimage from "../../images/map.svg";
import Phone from "../../images/phone.svg";
// import { svgIcons } from "../../types/svgicon";

// Defining a helper function to convert meters to miles
const metersToMiles = (kilometers: number) => {
  const miles = kilometers * 0.000621371192;
  return miles.toFixed(2);
}
// import { slugify } from "../../types/constants";
type props = {
  prop: any;
  parents: any;
  baseUrl: any;
  coords: any;
  slug: any;
};
/**
 * Component for Near By Locations
 * @param entities 
 * @returns HTML Element
 */
const NearByLocation = (entities: props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const distance: any = []
    const arr: any = []
    entities.prop.response.results && entities.prop.response.results.map((i: any) => {
      distance.push(i.data.distanceKilometers)
    })

    entities.prop.response.results && entities.prop.response.results.map((i: any, index: any) => {
      // console.log(i,"i")
      arr.push({
        slug: i.data.slug,
        name: i.data.name,
        yextDisplayCoordinate: i.data.yextDisplayCoordinate,
        distance: entities.prop.response.results[index].distance,
        meta: i.data.id,
        mainphone:i.data.mainPhone,
        address:i.data.address,
        timezone:i.data.timezone,
        hours:i.data.hours
        // storename: i.data.c_store_name
      })
    })
    setData(arr);
  }, [setData]);


  return (
    <>

      <div className="container-xl">
        <div className="nearby-sec-inner">
          {data &&
            data.map((e: any, index: any) => {
// console.log(e,"e")
              // let url = "";
              // let slugString = "";
              // if (!e.slug) {
              //   if (e.storename) {
              //     slugString = e.meta + " " + e.storename;
              //     const newslug = slugify(slugString);
              //     url = `${newslug}`;
              //   }
              //   else {
              //     slugString = e.meta
              //     const newslug = slugify(slugString);
              //     url = `${newslug}`;
              //   }
              // } else {
              //   url = `${e.slug.toString()}`;
              // }

              // console.log(location,"location")
              let url = "";
              // console.log(e.slug,"id")
              var name: any = e.name?.toLowerCase();
              var mainPhone: any = e.mainPhone;
              var country: any = e?.address?.countryCode?.toLowerCase();
              var region: any = e?.address?.region?.toLowerCase()?.replaceAll(" ", "-");
              var initialregion: any = region?.toString();
              var finalregion: any = initialregion?.replaceAll(" ", "-");
              var city: any = e?.address?.city?.toLowerCase()?.replaceAll(" ", "-");
              var initialrcity: any = city?.toString();
              var finalcity: any = initialrcity?.replaceAll(" ", "-");
              var string: any = name?.toString();
              let result1: any = string?.replaceAll(" ", "-");
              var link =
                country +
                "/" +
                region +
                "/" +
                city +
                "/" +
                e?.slug?.toString() +
                ".html";
              // console.log(link,"link")
              //  link=e.id?.toString()
              if (!e?.slug) {
                url = `/${link}.html`;
              } else {
                url = `/${link}`;
              }
              if (index > 0) {
                return (

                  // <div className="near-location">
                  //   <h4>
                  //     {/* {svgIcons.addressPin} */}
                  //     {/* {e?.storename ? */}
                  //       <Link href={e.slug}>
                  //         {e?.name}</Link>
                      
                          
                  //   </h4>
                  //   <div className="store-phone">
                  //     <p>
                  //       ( {metersToMiles(e?.distance)} miles )
                  //     </p>
                  //   </div>

                  // </div>
                  <>
                     <div className="nearby-card">
                     <div className="location-name-miles icon-row">
                       <h2 style={{alignItems:"center"}}>
                         <Link
                           className="inline-block notHighlight"
                           data-ya-track={`${e.name}`}
                           eventName={`${e.name}`}
                           rel="noopener noreferrer"
                           href={`/${link}`}
                         >
                           {e.name}
                         </Link>
                       </h2>
                       <div className="distance">
                       ( {metersToMiles(e?.distance)} miles )
                       </div>
                     </div>
                     <div className="flex" >
                     <div style={{width:"62%"}}>
                     <div className="icon-row content-col flex">
                       {/* <img src={mapimage} style={{height:"25px"}}/> */}
                       <Address address={e?.address} />
                     </div>
     
                     <div className="icon-row closeing-div flex">
                       {/* <img src={time}/> */}
                       <div style={{ display: "inline-block" }}>
                         <img
                           src={timesvg}
                           style={{ height: "25px", width: "25px" }}
                           alt=""
                         />
                       </div>
                       <div>
                         {e.hours ? (
                           <div
                             className="flex open-now-string items-center "
                             data-id={`main-shop-${e.id}`}
                           >
                             <OpenClose
                               timezone={e.timezone}
                               hours={e.hours}
                               deliveryHours={e.hours}
                             ></OpenClose>
                           </div>
                         ) : (
                           <div className="closeddot notHighlight red-dot">
                             <div className="hours-info text-lg font-second-main-font closeddot">
                               Closed
                             </div>
                           </div>
                         )}
                       </div>
                     </div>
                     <div className="flex ml-1 mt-2">
                       {/* <img src={phone} style={{ height: "30px"}} alt=""/> */}
                       {/* <div>{mainPhone}</div> */}
                       <img src={Phone} style={{ height: "30px"}} alt=""/>
                       <Link
                         eventName={"PhoneNumber"}
                         href={`tel:${e.mainphone}`}
                         rel="noopener noreferrer"
                       >
                         {e.mainphone}
                       </Link>
                     </div>
                     </div>
                     <div className="button-bx">
                       <Link
                         className="btn"
                         data-ya-track={`viewstore-${e.name}`}
                         eventName={`viewstore-${e.name}`}
                         rel="noopener noreferrer"
                         href={`/${link}`}
                       >
                         {/* <div dangerouslySetInnerHTML={{__html: View_Store}}/> */}
                         STORE DETAILS
                       </Link>
                       <GetDirection
                         buttonText={
                         "Get directions"
                         }
                         address={e.address}
                         latitude={
                           e.displayCoordinate
                             ? e.displayCoordinate.latitude
                             : e.yextDisplayCoordinate.latitude
                         }
                         longitude={
                           e.displayCoordinate
                             ? e.displayCoordinate.longitude
                             : e.yextDisplayCoordinate.longitude
                         }
                       />
                     </div>
                     </div>
                   </div>
                   </>
                );
              }
            })}

        </div>
      </div>
    </>
  );
};
export default NearByLocation;