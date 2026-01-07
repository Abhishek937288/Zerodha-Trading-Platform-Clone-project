import { Routes, Route } from "react-router-dom";
import  { Toaster } from "react-hot-toast";

import Landingpagelayout from "./Layouts/Landingpagelayout";
import Dashboardpagelayout from "./Layouts/Dashboardpagelayout";
import Commonpagelayout from "./Layouts/Commonpagelayout";

import Homepage from "./Pages/Landingpages/Homepage";
import Productpage from "./Pages/Landingpages/Productpage";
import Pricingpage from "./Pages/Landingpages/Pricingpage";
import Supportpage from "./Pages/Landingpages/Supportpage";
import Aboutpage from "./Pages/Landingpages/Aboutpage";
import Positionspage from "./Pages/Dashboardpages/Positionspage";

import Signuppage from "./Pages/Commonpages/Signuppage";
import Signinpage from "./Pages/Commonpages/Signinpage";
import Verifyotppage from "./Pages/Commonpages/Verifyotppage";
import Forgotpasspage from "./Pages/Commonpages/Forgotpasspage";
import Newpasswordpage from "./Pages/Commonpages/Newpasswordpage";

import Appspage from "./Pages/Dashboardpages/Appspage";
import Dashboardpage from "./Pages/Dashboardpages/Dashboardpage";
import Fundspage from "./Pages/Dashboardpages/Fundspage";
import Holdingspage from "./Pages/Dashboardpages/Holdingspage";
import Orderspage from "./Pages/Dashboardpages/Orderspage";
import DashboardInnerLayout from "./Layouts/DashboardInnerLayout";
import Watchlist from "./Components/Dashboardcompo/Common/Watchlist";
import { getuserData } from "./Mutation/authMutationFn.js";
import { useQuery } from "@tanstack/react-query";
import { userAuthstore } from "./Store/authStore";
import { useEffect } from "react";
import { PublicLayout } from "./Layouts/PublicLayout";
import Loading from "./Components/Commoncompo/Common/Loading";

function App() {
  const { setUser } = userAuthstore();

  const {
    data,
    isPending: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getuserData,
  });
  
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  if(isUserLoading){
    return <Loading/>
  }

  return (
    <div className="">
      <Routes>
        <Route element={<Landingpagelayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/Productpage" element={<Productpage />} />
          <Route path="/Pricingpage" element={<Pricingpage />} />
          <Route path="/Supportpage" element={<Supportpage />} />
          <Route path="/Aboutpage" element={<Aboutpage />} />
        </Route>

        <Route element={<Commonpagelayout />}>
          <Route element={<PublicLayout/>}>
            <Route path="/Signuppage" element={<Signuppage />} />
            <Route path="/Signinpage" element={<Signinpage />} />
            <Route path="/Verifyotppage" element={<Verifyotppage />} />
            <Route path="/Forgotpasspage" element={<Forgotpasspage />} />
            <Route
              path="/Newpasswordpage/:forgotpasstoken"
              element={<Newpasswordpage />}
            />
          </Route>
        </Route>

        <Route path="/Dashboard" element={<Dashboardpagelayout />}>
          <Route element={<DashboardInnerLayout />}>
            <Route index element={<Dashboardpage />} />
            <Route path="Watchlist" element={<Watchlist />} />
            <Route path="Dashboardpage" element={<Dashboardpage />} />
            <Route path="Appspage" element={<Appspage />} />
            <Route path="Fundspage" element={<Fundspage />} />
            <Route path="Holdingspage" element={<Holdingspage />} />
            <Route path="Orderspage" element={<Orderspage />} />
            <Route path="Positionspage" element={<Positionspage />} />
          </Route>
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
