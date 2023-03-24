import * as React from "react";
import HeaderMarker from "../../images/HeaderMarker.svg";

type props = {
  _site: any;
  logo: any;
  nav: any;
};

const Header = (props: any) => {
  // console.log(props, "props");
  React.useEffect(() => {
    document.body.setAttribute("id", "body");
  });

  // header nav
  const headernav = props?.nav?.navHeading?.map((navbar: any) => {
    // console.log(navbar.label, "label");
    return (
      <>
        <ul>
          <li style={{ marginRight: "70px", padding: "2px", fontSize: "15px" }}>
            <a href={navbar.link}>{navbar.label}</a>
          </li>
        </ul>
      </>
    );
  });

  // header nav icon
  const navicon = props?.nav?.navPhoto?.map((icon: any) => {
    // console.log(icon.url,"url123")
    return (
      <>
        <img src={icon.url} style={{ paddingRight: "20px" }} />
      </>
    );
  });
  return (
    <>
      <div>
        <p style={{ color: "#002C73", fontSize: "12px", marginLeft: "150px" }}>
          {props._site.c_upperHeaderText}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: "40px",
        }}
      >
        <img
          src={props.logo.url}
          style={{
            height: "65px",
            width: "140px",
            margin: "10px 50px 10px 150px",
          }}
        />
        <div
          style={{
            display: "flex",
          }}
        >
          <img src={HeaderMarker} style={{ height: "30px" }} />
          <form>
            <input
              placeholder={props._site.c_searchHeading}
              type="text"
              style={{
                border: "1px solid black",
                fontSize: "14px",
                padding: "5px 15px",
                paddingRight: "40px",
                borderTopLeftRadius: "4px",
                borderBottomLeftRadius: "4px",
              }}
            />
            <a href={props._site.c_storeHead.link}>
              <button
                style={{
                  backgroundColor: "#002C73",
                  color: "white",
                  fontWeight: "bold",
                  padding: "7px 15px",
                  fontSize: "13px",
                  marginRight: "15px",
                  borderTopRightRadius: "4px",
                  borderBottomRightRadius: "4px",
                }}
              >
                {props._site.c_storeHead.label}
              </button>
            </a>
            <a href={props._site.c_examCta.link}>
              <button
                style={{
                  backgroundColor: "#0077B4",
                  color: "white",
                  fontWeight: "bold",
                  padding: "7px",
                  fontSize: "13px",
                  borderRadius:"4px"
                }}
              >
                {props._site.c_examCta.label}
              </button>
            </a>
          </form>
        </div>
      </div>
      <div className="flex" style={{ backgroundColor: "#002C73" }}>
        <div className="flex" style={{ color: "white", paddingLeft: "150px" }}>
          {headernav}
        </div>
        <div
          style={{
            display: "flex",
            height: "35px",
            padding: "4px",
            marginLeft: "20%",
          }}
        >
          {navicon}
        </div>
      </div>
    </>
  );
};

export default Header;
