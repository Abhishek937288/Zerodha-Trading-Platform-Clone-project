import { assets } from "@/assets/assets";
import React from "react";
import { Popover } from "@radix-ui/themes";


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
              <a href="#" className="text-blue-700">
                Homepage
              </a>{" "}
              /
              <a href="#" className="text-blue-700">
                TradingQnA
              </a>{" "}
              /
              <a href="#" className="text-blue-700">
                Twitter
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

          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="px-4 py-2 bg-white rounded border-none">
                Bio <i className="fa-solid fa-angle-down opacity-80"></i>
              </button>
            </Popover.Trigger>

            <Popover.Content
              side="bottom"
              align="center"
              avoidCollisions={false}
              className="bg-white p-4 shadow-md rounded h-60 w-80 max-sm:h-[50vh] max-sm:w-[80vw]"
            >
              <p className="text-center">
                Nikhil is an astute and experienced investor, and he heads financial planning at Zerodha. An avid reader, he always appreciates a good game of chess.
              </p>
            </Popover.Content>
          </Popover.Root>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center ">
          <img src={assets.Kailash} className="rounded-full w-60" alt="" />
          <p>Dr. Kailash Nadh</p>
          <p>CTO</p>

          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="px-4 py-2 bg-white rounded border-none">
                Bio <i className="fa-solid fa-angle-down opacity-80"></i>
              </button>
            </Popover.Trigger>

            <Popover.Content
              side="bottom"
              align="center"
              avoidCollisions={false}
              className="bg-white p-4 shadow-md rounded h-60 w-80 max-sm:h-[50vh] max-sm:w-[80vw]"
            >
              <p className="text-center">
                Kailash has a PhD in Artificial Intelligence & Computational Linguistics, and is the brain behind all our technology and products. He has been a developer from his adolescence and continues to write code every day.
              </p>
            </Popover.Content>
          </Popover.Root>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center ">
          <img src={assets.Venu} className="rounded-full w-60" alt="" />
          <p>Venu Madhav</p>
          <p>COO</p>

          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="px-4 py-2 bg-white rounded border-none">
                Bio <i className="fa-solid fa-angle-down opacity-80"></i>
              </button>
            </Popover.Trigger>

            <Popover.Content
              side="bottom"
              align="center"
              avoidCollisions={false}
              className="bg-white p-4 shadow-md rounded h-60 w-80 max-sm:h-[50vh] max-sm:w-[80vw]"
            >
              <p className="text-center">
                Venu is the backbone of Zerodha taking care of operations and ensuring that we are compliant to rules and regulations. He has over a dozen certifications in financial markets and is also proficient in technical analysis. Workouts, cycling, and adventuring is what he does outside of Zerodha.
              </p>
            </Popover.Content>
          </Popover.Root>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center ">
          <img src={assets.hasan} className="rounded-full w-60" alt="" />
          <p>Hanan Delvi</p>
          <p>CCO</p>
          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="px-4 py-2 bg-white rounded border-none">
                Bio <i className="fa-solid fa-angle-down opacity-80"></i>
              </button>
            </Popover.Trigger>

            <Popover.Content
              side="bottom"
              align="center"
              avoidCollisions={false}
              className="bg-white p-4 shadow-md rounded h-60 w-80 max-sm:h-[50vh] max-sm:w-[80vw]"
            >
              <p className="text-center">
                We take pride in the way we support our clients, and Hanan is
                responsible for this with his never ending flow of energy. He is
                the man behind many of our support initiatives that have helped
                us stay ahead of the game. A free thinker, Hanan can be seen
                posing as one in his free time.
              </p>
            </Popover.Content>
          </Popover.Root>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center ">
          <img src={assets.seema} className="rounded-full w-60" alt="" />
          <p>Seema Patil</p>
          <p>Director</p>

          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="px-4 py-2 bg-white rounded border-none">
                Bio <i className="fa-solid fa-angle-down opacity-80"></i>
              </button>
            </Popover.Trigger>

            <Popover.Content
              side="bottom"
              align="center"
              avoidCollisions={false}
              className="bg-white p-4 shadow-md rounded h-60 w-80 max-sm:h-[50vh] max-sm:w-[80vw]"
            >
              <p className="text-center">
                Seema who has lead the quality team since the beginning of Zerodha, is now a director. She is an extremely disciplined fitness enthusiast.
              </p>
            </Popover.Content>
          </Popover.Root>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center ">
          <img src={assets.Karthik} className="rounded-full w-60" alt="" />
          <p>Karthik Rangappa</p>
          <p>Chief of Education</p>

          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="px-4 py-2 bg-white rounded border-none">
                Bio <i className="fa-solid fa-angle-down opacity-80"></i>
              </button>
            </Popover.Trigger>

            <Popover.Content
              side="bottom"
              align="center"
              avoidCollisions={false}
              className="bg-white p-4 shadow-md rounded h-60 w-80 max-sm:h-[50vh] max-sm:w-[80vw]"
            >
              <p className="text-center">
                Karthik "Guru" Rangappa single handledly wrote Varsity, Zerodha's massive educational program. He heads investor education initiatives at Zerodha and loves stock markets, classic rock, single malts, and photography.
              </p>
            </Popover.Content>
          </Popover.Root>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center ">
          <img src={assets.Austin} className="rounded-full w-60" alt="" />
          <p>Austin Prakesh</p>
          <p>Director Strategy</p>

          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="px-4 py-2 bg-white rounded border-none">
                Bio <i className="fa-solid fa-angle-down opacity-80"></i>
              </button>
            </Popover.Trigger>

            <Popover.Content
              side="bottom"
              align="center"
              avoidCollisions={false}
              className="bg-white p-4 shadow-md rounded h-60 w-80 max-sm:h-[50vh] max-sm:w-[85vw]"
            >
              <p className="text-center">
                Austin is a successful self-made entrepreneur from Singapore. His area of specialty revolves around helping organisations including grow by optimizing revenue streams and creating growth strategies. He is a boxing enthusiast and loves collecting exquisite watches.
              </p>
            </Popover.Content>
          </Popover.Root>
        </div>
         <div className="flex flex-col gap-2 items-center justify-center ">
          <img src={assets.abhi} className="rounded-full w-57 h-57" alt="" />
          <p>Abhishek Mankumbare</p>
          <p>Web Developer</p>

          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="px-4 py-2 bg-white rounded border-none">
                Bio <i className="fa-solid fa-angle-down opacity-80"></i>
              </button>
            </Popover.Trigger>

            <Popover.Content
              side="bottom"
              align="center"
              avoidCollisions={false}
              className="bg-white p-4 shadow-md rounded h-60 w-80 max-sm:h-[50vh] max-sm:w-[85vw]"
            >
              <p className="text-center">
               I’m a passionate MERN stack developer from India, exploring web projects and building innovative solutions. I enjoy learning new technologies, solving problems, and creating efficient applications that add value.
              </p>
            </Popover.Content>
          </Popover.Root>
        </div>
      </div>
    </div>
  );
};

export default Team;
