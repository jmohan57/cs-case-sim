import Image from "next/image";
import bgImage from "/public/images/bg.jpg";

export default () => (
  <Image
    src={bgImage}
    alt="Background image"
    width={1920}
    height={1080}
    priority
    placeholder="blur"
    style={{
      objectFit: "cover",
      filter: "brightness(0.8)",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "fixed",
      height: "100%",
      width: "100%",
      zIndex: -1,
    }}
  />
);
