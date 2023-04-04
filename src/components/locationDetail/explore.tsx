import * as React from "react";

type explore = {
  prop: any;
};
const Explore = (explore: any) => {
  return (
    <>
      <div style={{ position: "relative" }}>
        <img src={explore?.prop?.exploreImg?.url} alt="" />
        <div
          style={{
            position: "absolute",
            top: "0",
            padding: "70px",
            right: "0",
          }}
        >
          <h1 className="font-semibold text-2xl">
            {explore?.prop?.exploreHeading}
          </h1>
          <p className="my-2 pb-3">{explore?.prop?.exploreDesc}</p>

          <a
            href={explore?.prop?.exploreCta?.link}
            className="explore-btn bg-[#002C73] text-white mt-1"
            style={{ padding: "15px" }}
          >
            {explore?.prop?.exploreCta?.label}
          </a>
        </div>
      </div>
    </>
  );
};

export default Explore;
