import { assets } from "@/assets/assets";
import React from "react";

const Team = () => {
  return (
    <div className="mt-10 container px-10 md:px-40">
      <div className="">
        <div className="flex  justify-center">
          <h3 className="text-center text-2xl font-semibold opacity-80">
            People
          </h3>
        </div>
        <div className="mt-10 w-full grid md:grid-cols-2 gap-10">
          <div className=" w-full flex flex-col items-center  gap-2">
            <img
              src={assets.nithinkamath}
              alt=""
              className="rounded-full w-75 "
            />
            <p className="text-lg font-semibold opacity-80">Nithin Kamath</p>
            <p className="opacity-80 text-lg">Founder, CEO</p>
          </div>
          <div className="flex flex-col gap-7 justify-center">
            <p className="opacity-80 text-lg">
              Nithin bootstrapped and founded Zerodha in 2010 to overcome the
              hurdles he faced during his decade long stint as a trader. Today,
              Zerodha has changed the landscape of the Indian broking industry.
            </p>
            <p className="opacity-80 text-lg">
              He is a member of the SEBI Secondary Market Advisory Committee
              (SMAC) and the Market Data Advisory Committee (MDAC).
            </p>
            <p className="opacity-80 text-lg">Playing basketball is his zen.</p>
            <p className="opacity-80 text-lg">
              Connect on{" "}
              <a href="" className="text-blue-700">
                Homepage / <a href="" className="text-blue-700"></a>TradingQnA /
                <a href="" className="text-blue-700"></a>Twitter
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3  gap-20 ">
        <div className="flex flex-col gap-2 items-center justify-center ">
          <img src={assets.Nikhil} className="rounded-full w-60" alt="" />
          <p>Nikhil Kamath</p>
          <p>Co-founder & CFO</p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center ">
          <img src={assets.Kailash} className="rounded-full w-60" alt="" />
          <p>Dr. Kailash Nadh</p>
          <p>CTO</p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center ">
          <img src={assets.Venu} className="rounded-full w-60" alt="" />
          <p>Venu Madhav</p>
          <p>COO</p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center ">
          <img src={assets.hasan} className="rounded-full w-60" alt="" />
          <p>Hanan Delvi</p>
          <p>CCO</p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center ">
          <img src={assets.seema} className="rounded-full w-60" alt="" />
          <p>Seema Patil</p>
          <p>Director</p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center ">
          <img src={assets.Karthik} className="rounded-full w-60" alt="" />
          <p>Karthik Rangappa</p>
          <p>Chief of Education</p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center ">
          <img src={assets.Austin} className="rounded-full w-60" alt="" />
          <p>Austin Prakesh</p>
          <p>Director Strategy</p>
        </div>
      </div>
    </div>
  );
};

export default Team;
