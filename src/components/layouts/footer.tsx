import * as React from "react";
type props = {
  _site: any;
  fheading: any;
  fnav: any;
  tandc: any;
};
// props call
const Footer = (props: any) => {
  // console.log(props, "links");
  //   console.log("copyright",props.copy.copyright)
  React.useEffect(() => {
    document.body.setAttribute("id", "body");
  });
  const toggle = () => {
    (document.getElementById("body") as HTMLInputElement).classList.toggle("");
  };

  const fhead = props?.fheading?.footerNavHead?.map((f: any) => {
    // console.log(f.label,"label")
    return (
      <ul>
        <li
          style={{ fontSize: "12px", marginRight: "100px", color: "#E7F6FE" }}
        >
          {f?.label}
        </li>
      </ul>
    );
  });

  const ftnav = props?.fnav?.fnav1?.map((nav: any) => {
    // console.log(nav.label,"lav")
    return (
      <ul>
        <li style={{ fontSize: "12px" }}>
          <a href={nav?.link}>{nav?.label}</a>
        </li>
      </ul>
    );
  });
  const ftnav2 = props?.fnav?.fnav2?.map((nav: any) => {
    // console.log(nav.label,"lav")
    return (
      <ul>
        <li style={{ fontSize: "12px" }}>
          <a href={nav?.link}>{nav?.label}</a>
        </li>
      </ul>
    );
  });
  const ftnav3 = props?.fnav?.fnav3?.map((nav: any) => {
    // console.log(nav.label,"lav")
    return (
      <ul>
        <li style={{ fontSize: "12px" }}><a href={nav.link}>{nav.label}</a></li>
      </ul>
    );
  });

  const tndc = props?.tandc?.footerTAndC?.map((t: any) => {
    // console.log(t.label,"label")
    return (
      <ul>
        <li
          style={{
            fontSize: "12px",
            paddingRight: "70px",
            paddingLeft: "50px",
          }}
        >
          <a href={t?.link}>{t?.label}</a>
        </li>
      </ul>
    );
  });

  //   console.log(props._site.c_footerRights,"hvsajdgvb")

  return (
    <>
      <div style={{ backgroundColor: "#002C73", color: "white" }}>
        <div className="flex" style={{ alignItems: "center" }}>
          <h2 style={{ padding: "50px 70px" }}>
            {props?._site?.c_footerMainHeading}
          </h2>
          <div className="flex m-auto" style={{ paddingLeft: "100px" }}>
            {fhead}
          </div>
        </div>
        <div className="flex" style={{ paddingBottom: "30px" }}>
          <div style={{ paddingLeft: "44%" }}>{ftnav}</div>
          <div style={{ paddingLeft: "8%" }}>{ftnav2}</div>
          <div style={{ paddingLeft: "6%" }}>{ftnav3}</div>
        </div>
        <hr style={{ width: "80%", margin: "auto" }} />
        <div
          className="flex"
          style={{
            justifyContent: "center",
            padding: "30px",
            paddingRight: "50px",
          }}
        >
          {tndc}
        </div>
        <hr style={{ width: "80%", margin: "auto" }} />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "10px", paddingBottom: "10px" }}>
            {props?._site?.c_footerRights?.right1}
            <br />
            {props?._site?.c_footerRights?.right2}
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
