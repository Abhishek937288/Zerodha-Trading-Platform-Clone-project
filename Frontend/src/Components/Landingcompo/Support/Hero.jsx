import React from "react";

const Hero = () => {
  return (
    <div className="w-full h-[100vh] md:h-[60vh] max-sm:h-[100vh] flex md:flex-row items-center justify-center  bg-blue-700">
      <div className="container max-sm:mt-15 mb-15  grid md:grid-cols-2 gap-10 md:gap-40 px-5 md:px-10">
        <div className="flex flex-col  gap-10 ">
          <p className="text-white text-xl">Support portal</p>
          <div className=" flex flex-col gap-5">
            <p className="text-white text-md">
              Search for an answer or browse help topics <br /> to create a
              ticket
            </p>
            <input
              type="text"
              className="text-center h-15 w-100 max-sm:w-60  text-sm opacity-80 outline-0 bg-white rounded-lg"
              placeholder="Eg :how do I activat F&O,why my order is getting rejected..."
            />
            <div className="flex gap-2 flex-col md:flex-row max-sm:mt-10 text-white">
              <a href="" className="underline text-sm opacity-80">
                Track account opening
              </a>
              <a href="" className="underline text-sm opacity-80">
                Track segement activation{" "}
              </a>
              <a href="" className="underline text-sm opacity-80">
                intraday
              </a>
              <a href="" className="underline text-sm opacity-80">
                margins
              </a>
              <a href="" className="underline text-sm opacity-80">
                kite user manual
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-center">
            <a href="" className="underline  text-white text-sm opacity-80">Track tickets</a>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-white">Featured</p>
            <p className="text-white">1.<a href="" className="underline text-sm opacity-80">  Current takeovers and Delisting - January 2024</a></p>
            <p className="text-white">2.<a href="" className="underline text-sm opacity-80">  Latest Intraday leyerages - MIS & Co</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
