import * as React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const PhotoSlider = (props: any) => {
  const { brand } = props;
  // console.log(brand,"brand")
  const photos = brand?.map((element: any) => (
    <SplideSlide>
      <img
        src={element.brandImg.url}
        style={{
          height: "72%",
          width: "34%",
          display: "block",
          margin: "auto",
        }}
        alt=""
      />
      <h3 style={{ textAlign: "center", color: "#002C73", fontWeight: "bold" }}>
        {element?.brandName}
      </h3>
    </SplideSlide>
  ));

  return (
    <>
      <Splide aria-label="Photo Slider">{photos}</Splide>
    </>
  );
};

export default PhotoSlider;
