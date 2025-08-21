import React from "react";
import { assets } from "../../../assets/assets";

const Footer = () => {
  return (
    <div className="w-full bg-gray-100">
    <footer className=" container mx-auto  px-5 h-full mt-20 flex flex-col gap-10">
      <div className=" grid grid-cols-1 md:grid-cols-3 lg:md:grid-cols-6 pt-10 gap-20 h-full">
        <div className=" md:col-span-2 flex flex-col gap-5">
          <img src={assets.logo} className="w-[60%]" alt="" />
          <p>
            © 2010 - 2025, Zerodha Broking Ltd. <br /> All rights reserved.
          </p>
          <span className="border-b border-slate-200 flex gap-5 pb-2">
            {" "}
            <i className="fa-brands fa-x-twitter"></i>{" "}
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-linkedin-in"></i>
          </span>
          <span className="border-b border-slate-200 flex gap-5 pb-2">
            <br />
            <i className="fa-brands fa-youtube"></i>
            <i className="fa-brands fa-whatsapp"></i>
            <i className="fa-brands fa-telegram"></i>
          </span>
        </div>
        <div className="flex flex-col  gap-3">
          <p className="text-lg  font-semibold opacity-80">Account </p>
          <ul className="flex flex-col  gap-3">
            <li className="text-sm"> <a href="" className="hover:text-blue-700 ">Minor demat account </a></li>
            <li  className="text-sm"><a href="" className="hover:text-blue-700 ">Open demat account </a></li>
            <li  className="text-sm"><a href=""  className="hover:text-blue-700 ">Minor demat account</a></li>
            <li  className="text-sm"> <a href="" className="hover:text-blue-700 ">NRI demat account</a></li>
            <li  className="text-sm"><a href=""className="hover:text-blue-700 " >Commodity</a></li>
            <li  className="text-sm"> <a href=""className="hover:text-blue-700 " >Dematerialisation</a></li>
            <li  className="text-sm"> <a href="" className="hover:text-blue-700 ">MTF</a></li>
            <li  className="text-sm"> <a href=""className="hover:text-blue-700 " >Referral program</a></li>
          </ul>
        </div>
        <div className="flex flex-col  gap-3">
          <p className="text-lg   font-semibold opacity-80">Support </p>
          <ul className="flex flex-col  gap-3">
            <li className="text-sm"> <a href="" className="hover:text-blue-700 ">Contact us </a></li>
            <li  className="text-sm"><a href="" className="hover:text-blue-700 ">Support portal </a></li>
            <li  className="text-sm"><a href=""  className="hover:text-blue-700 ">How to file a complaint?</a></li>
            <li  className="text-sm"> <a href="" className="hover:text-blue-700 ">Status of your complaints</a></li>
            <li  className="text-sm"><a href=""className="hover:text-blue-700 " >Bulletin</a></li>
            <li  className="text-sm"> <a href=""className="hover:text-blue-700 " >Circular</a></li>
            <li  className="text-sm"> <a href="" className="hover:text-blue-700 ">Z-Connect blog</a></li>
            <li  className="text-sm"> <a href=""className="hover:text-blue-700 " >Downloads</a></li>
          </ul>
        </div>
       <div className="flex flex-col  gap-3">
          <p className="text-lg  font-semibold opacity-80">Company </p>
          <ul className="flex flex-col  gap-3">
            <li className="text-sm"> <a href="" className="hover:text-blue-700 ">About </a></li>
            <li  className="text-sm"><a href="" className="hover:text-blue-700 ">Philosophy </a></li>
            <li  className="text-sm"><a href=""  className="hover:text-blue-700 ">Press & media</a></li>
            <li  className="text-sm"> <a href="" className="hover:text-blue-700 ">Careers</a></li>
            <li  className="text-sm"><a href=""className="hover:text-blue-700 " >Zerodha Cares (CSR)</a></li>
            <li  className="text-sm"> <a href=""className="hover:text-blue-700 " >Zerodha.tech</a></li>
            <li  className="text-sm"> <a href="" className="hover:text-blue-700 ">MTF</a></li>
            <li  className="text-sm"> <a href=""className="hover:text-blue-700 " >Open sourcem</a></li>
          </ul>
        </div>
        <div className="flex flex-col  gap-3">
          <p className="text-lg   font-semibold opacity-80">Quick links </p>
          <ul className="flex flex-col  gap-3">
            <li className="text-sm"> <a href="" className="hover:text-blue-700 ">Upcoming IPOs </a></li>
            <li  className="text-sm"><a href="" className="hover:text-blue-700 ">Brokerage chargest </a></li>
            <li  className="text-sm"><a href=""  className="hover:text-blue-700 ">Market holidays</a></li>
            <li  className="text-sm"> <a href="" className="hover:text-blue-700 ">Economic calendar</a></li>
            <li  className="text-sm"><a href=""className="hover:text-blue-700 " >Calculators</a></li>
            <li  className="text-sm"> <a href=""className="hover:text-blue-700 " >Markets</a></li>
            <li  className="text-sm"> <a href="" className="hover:text-blue-700 ">Sectors</a></li>
            
          </ul>
        </div>
      </div>
      <div className=" text-xs text-gray-600">
        <p>
          Zerodha Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration
          no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha
          Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Commodity Trading
          through Zerodha Commodities Pvt. Ltd. MCX: 46025; NSE-50001 – SEBI
          Registration no.: INZ000038238 Registered Address: Zerodha Broking
          Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public
          School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For
          any complaints pertaining to securities broking please write to
          complaints@zerodha.com, for DP related to dp@zerodha.com. Please
          ensure you carefully read the Risk Disclosure Document as prescribed
          by SEBI | ICF
        </p>

        <p className="mt-4">
          Attention investors: 1) Stock brokers can accept securities as margins
          from clients only by way of pledge in the depository system w.e.f
          September 01, 2020. 2) Update your e-mail and phone number with your
          stock broker / depository participant and receive OTP directly from
          depository on your e-mail and/or mobile number to create pledge. 3)
          Check your securities / MF / bonds in the consolidated account
          statement issued by NSDL/CDSL every month.
        </p>

        <p className="mt-4">
          Procedure to file a complaint on SEBI SCORES: Register on SCORES
          portal. Mandatory details for filing complaints on SCORES: Name, PAN,
          Address, Mobile Number, E-mail ID. Benefits: Effective Communication,
          Speedy redressal of the grievances
        </p>

        <p className="mt-4">
          Investments in securities market are subject to market risks; read all
          the related documents carefully before investing.
        </p>

        <p className="mt-4">
          "Prevent unauthorised transactions in your account. Update your mobile
          numbers/email IDs with your stock brokers. Receive information of your
          transactions directly from Exchange on your mobile/email at the end of
          the day. Issued in the interest of investors. KYC is one time exercise
          while dealing in securities markets - once KYC is done through a SEBI
          registered intermediary (broker, DP, Mutual Fund etc.), you need not
          undergo the same process again when you approach another
          intermediary." Dear Investor, if you are subscribing to an IPO, there
          is no need to issue a cheque. Please write the Bank account number and
          sign the IPO application form to authorize your bank to make payment
          in case of allotment. In case of non allotment the funds will remain
          in your bank account. As a business we don't give stock tips, and have
          not authorized anyone to trade on behalf of others. If you find anyone
          claiming to be part of Zerodha and offering such services, please
          create a ticket here
        </p>

        <div className="flex justify-center flex-wrap gap-3 py-4 text-sm">
          <a
            href=""
            className="text-m text-gray-950 hover:text-blue-700   text-sm  "
          >
            NSE
          </a>
          <a
            href=""
            className="text-m text-gray-950 hover:text-blue-700   text-sm  "
          >
            BSE
          </a>
          <a
            href=""
            className="text-m text-gray-950 hover:text-blue-700   text-sm  "
          >
            Terms & conditions
          </a>
          <a
            href=""
            className="text-m text-gray-950 hover:text-blue-700   text-sm  "
          >
            Policies & procedures
          </a>
          <a
            href=""
            className="text-m text-gray-950 hover:text-blue-700   text-sm  "
          >
            Privacy policy
          </a>
          <a
            href=""
            className="text-m text-gray-950 hover:text-blue-700   text-sm  "
          >
            Disclosure
          </a>
          <a
            href=""
            className="text-m text-gray-950 hover:text-blue-700   text-sm  "
          >
            For invenstor's attention
          </a>
          <a
            href=""
            className="text-m text-gray-950 hover:text-blue-700   text-sm  "
          >
            investor charter
          </a>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
