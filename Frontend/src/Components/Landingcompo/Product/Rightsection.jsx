import React from "react";

const Rightsection = ({
  imgurl,
  productname,
  description,

  learnmore,
  googlePlay,
  appStore,
}) => {
  return (
    <div className="mt-20 container px-5 md:px-20  grid gap-10  md:grid-cols-2">
      <div className="flex  md:col-span-1 justify-center flex-col gap-5">
        <h4 className="text-2xl font-semibold opacity-80">{productname}</h4>
        <p className="text-md opacity-90">{description}</p>
        <div className="flex flex-start">
        <a href="" className="text-blue-700 text-center text-lg">
          {learnmore}
        </a>
</div>
        <div className="flex  max-sm:justify-center   md:flex-row gap-5 ">
          <img src={appStore} className="w-[100px] cursor-pointer" alt="" />
          <img src={googlePlay} alt="" className="w-[100px]" />
        </div>
      </div>
      <div className="flex md:col-span-1 items-center">
        <img src={imgurl} alt="" />
      </div>
    </div>
  );
};

export default Rightsection;
