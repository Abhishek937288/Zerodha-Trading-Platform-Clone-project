import Openaccount from "@/Components/Landingcompo/Common/Openaccount";
import Hero from "../../Components/Landingcompo/Product/Hero";
import Leftsection from "../../Components/Landingcompo/Product/Leftsection";
import Rightsection from "../../Components/Landingcompo/Product/Rightsection";
import Universe from "../../Components/Landingcompo/Product/Universe";
import { assets } from "../../assets/assets";

const Productpage = () => {
  return (
    <>
      <Hero />
      <Leftsection
        imgurl={assets.Productkite}
        productname="Kite"
        description="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
        trydemo="Try demo →"
        learnmore="
Learn more → "
        googlePlay={assets.appstoreBadge}
        appStore={assets.googlePlayBadge}
      />
      <Rightsection
        imgurl={assets.console}
        productname="Console"
        description="The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations."
        learnmore="
Learn more → "
        googlePlay={assets.appstoreBadge}
        appStore={assets.googlePlayBadge}
      />
      <Leftsection
        imgurl={assets.coin}
        productname="Coin"
        description="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
        trydemo="Coin →"
        googlePlay={assets.appstoreBadge}
        appStore={assets.googlePlayBadge}
      />
      <Rightsection
        imgurl={assets.kiteconnectPng}
        productname="Kite Connect API"
        description="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."
        learnmore="
Kite Connect  → "
        googlePlay={assets.appstoreBadge}
        appStore={assets.googlePlayBadge}
      />
      <Leftsection
        imgurl={assets.varsity}
        productname="Varsity mobile"
        description="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go."
        googlePlay={assets.appstoreBadge}
        appStore={assets.googlePlayBadge}
      />

      <Universe />
      <Openaccount/>
    </>
  );
};

export default Productpage;
