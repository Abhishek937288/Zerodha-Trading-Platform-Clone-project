import React from "react";

const Hero = () => {
  return (
    <div className=" container flex mt-15  flex-col px-10 md:px-40  md:items-center gap-5 max-sm:px-5">   
      <div className="border-b border-gray-300 w-[80%] max-sm:[100%] max-sm:text-center  flex pb-30 md:items-center md:justify-center">
        <h4 className="text-2xl max-sm:text-lg font-semibold opacity-80">
          We pioneered the discount broking model in India. <br /> Now, we are breaking
          ground with our technology.
        </h4>
      </div>
      <div className=" grid md:grid-cols-2 gap-10 mt-5">
        <div className=" flex flex-col gap-5">
          <p className="text-lg opacity-80">We kick-started operations on the 15th of August, 2010 with the goal of breaking all barriers that traders and investors face in India in terms of cost, support, and technology. We named the company Zerodha, a combination of Zero and "Rodha", the Sanskrit word for barrier.</p>
          <p className="text-lg opacity-80">Today, our disruptive pricing models and in-house technology have made us the biggest stock broker in India.</p>
          <p className="text-lg opacity-80">Over 1.6+ crore clients place billions of orders every year through our powerful ecosystem of investment platforms, contributing over 15% of all Indian retail trading volumes.</p>
        </div>
        <div className=" flex flex-col gap-5">
          <p className="text-lg opacity-80">  addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.</p>
          <p className="text-lg opacity-80"> <a href="" className="text-blue-700">Rainmatter</a>, our fintech fund and incubator, has invested in several fintech startups with the goal of growing the Indian capital markets.</p>
          <p className="text-lg opacity-80">And yet, we are always up to something new every day. Catch up on the latest updates on our <a href="" className="text-blue-700">blog</a> or see what the media is <a href=" " className="text-blue-700">saying about us </a>or learn more about our business and product <a href="" className="text-blue-700">philosophies </a>.</p>
        </div>
      </div>
      
    </div>
  );
};

export default Hero;
