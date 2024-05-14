import Head from "next/head";
import HomeSection from "@/components/HomeSection";

import modelsLarge from "/public/model-s-Large.avif";
import modelsSmall from "/public/model-s-Small.avif";

import modelyLarge from "/public/model-y-Large.avif";
import modelySmall from "/public/model-y-Small.avif";

import model3Large from "/public/model-3-Large.avif";
import model3Small from "/public/model-3-Small.avif";

import modelxLarge from "/public/model-x-Large.avif";
import modelxSmall from "/public/model-x-Small.avif";

import solarPanelLarge from "/public/solarPanelLarge.avif";
import solarPanelSmall from "/public/solarPanelSmall.avif";

import solarRoofLarge from "/public/solarRoofLarge.avif";
import solarRoofSmall from "/public/solarRoofSmall.avif";

import Accessories from "/public/Accessories.jpeg";
import type { StaticImageData } from "next/image";

interface HomeSectionData {
  model: string;
  order: string;
  orderlink: string;
  btn1: string;
  btn2?: string;
  imgDesktop: StaticImageData;
  imgMobile: StaticImageData;
  alt: string;
  copyright?: boolean;
  key: string;
  textColor?: string;
  id: string;
}

export default function Home() {
  const data: HomeSectionData[] = [
    {
      model: "Model S",
      order: "Order Online for ",
      orderlink: "Touchless Delivery",
      btn1: "custom order",
      btn2: "test drive",
      imgDesktop: modelsLarge, // Desktop image (dimension: 4320 × 2700)
      imgMobile: modelsSmall, // Mobile image, can be different (dimension: 1125 × 2436)
      alt: "Model S",
      key: "1",
      id: "model-s",
    },
    {
      model: "Model Y",
      order: "Order Online for ",
      orderlink: "Touchless Delivery",
      btn1: "custom order",
      btn2: "test drive",
      imgDesktop: modelyLarge,
      imgMobile: modelySmall,
      alt: "Model Y",
      key: "2",
      id: "model-y",
    },
    {
      model: "Model 3",
      order: "Order Online for ",
      orderlink: "Touchless Delivery",
      btn1: "custom order",
      btn2: "test drive",
      imgDesktop: model3Large,
      imgMobile: model3Small,
      alt: "Model 3",
      key: "3",
      id: "model-3",
    },
    {
      model: "Model X",
      order: "Order Online for ",
      orderlink: "Touchless Delivery",
      btn1: "custom order",
      btn2: "test drive",
      imgDesktop: modelxLarge,
      imgMobile: modelxSmall,
      alt: "Model X",
      key: "4",
      id: "model-x",
    },
    {
      model: "Solar Panels",
      order: "Lowest Cost Solar Panels in America",
      orderlink: "",
      btn1: "order now",
      btn2: "learn more",
      imgDesktop: solarPanelLarge,
      imgMobile: solarPanelSmall,
      alt: "Solar Panels",
      key: "5",
      textColor: "#a2a4a6",
      id: "solar-panels",
    },
    {
      model: "Solar Roof",
      order: "Produce Clean Energy From Your Roof",
      orderlink: "",
      btn1: "order now",
      btn2: "learn more",
      imgDesktop: solarRoofLarge,
      imgMobile: solarRoofSmall,
      alt: "Solar Roof",
      key: "6",
      id: "solar-roof",
    },
    {
      model: "Accessories",
      order: "",
      orderlink: "",
      btn1: "Shop now",
      imgDesktop: Accessories,
      imgMobile: Accessories,
      alt: "Accessories",
      copyright: true,
      key: "7",
      id: "accessories",
    },
  ];
  return (
    <main>
      <Head>
        <title>Electric Cars, Solar & Clean Energy | Tesla</title>
      </Head>
      <div
        className="overflow-y-scroll h-screen snap-y snap-mandatory scroll-snap-type"
        style={{ WebkitOverflowScrolling: "touch" }}>
        {data.map((item) => (
          <HomeSection
            key={item.key}
            model={item.model}
            order={item.order}
            orderlink={item.orderlink}
            btn1={item.btn1}
            btn2={item.btn2}
            imgDesktop={item.imgDesktop}
            imgMobile={item.imgMobile}
            alt={item.alt}
            copyright={item.copyright}
            textColor={item.textColor}
            id={item.id}
          />
        ))}
      </div>
    </main>
  );
}
