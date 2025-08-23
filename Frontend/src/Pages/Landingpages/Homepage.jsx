import Award from "../../Components/Landingcompo/Home/Award";
import Education from "../../Components/Landingcompo/Home/Education";
import Hero from "../../Components/Landingcompo/Home/Hero";
import Pricing from "../../Components/Landingcompo/Home/Pricing";
import Openaccount from "../../Components/Landingcompo/Common/Openaccount";


const Homepage = () => {
  return (
    <>
      <Hero />
      <Award />
      <Pricing/>
      <Education />
      <Openaccount />
    </>
  );
};

export default Homepage;
