import { Routes, Route } from "react-router-dom";

import Landingpagelayout from "./Layouts/Landingpagelayout";
import Dashboardpagelayout from "./Layouts/Dashboardpagelayout";
import Commonpagelayout from "./Layouts/Commonpagelayout";

import Homepage from "./Pages/Landingpages/Homepage";
import Productpage from "./Pages/Landingpages/Productpage";
import Pricingpage from "./Pages/Landingpages/Pricingpage";
import Supportpage from "./Pages/Landingpages/Supportpage";

import Signuppage from "./Pages/Commonpages/Signuppage";

import Appspage from "./Pages/Dashboardpages/Appspage";
import Dashboardpage from "./Pages/Dashboardpages/Dashboardpage";
import Fundspage from "./Pages/Dashboardpages/Fundspage";
import Holdingspage from "./Pages/Dashboardpages/Holdingspage";
import Orderspage from "./Pages/Dashboardpages/Orderspage";
import Positionspage from "./Pages/Dashboardpages/Positionspage";

function App() {
  return (  
    <>
      <Routes>
        <Route element={<Landingpagelayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/Productpage" element={<Productpage />} />
          <Route path="/Pricingpage" element={<Pricingpage />} />
          <Route path="/Supportpage" element={<Supportpage />} />
        </Route>

        <Route element={<Commonpagelayout />}>
          <Route path="/Signuppage" element={<Signuppage />} />
        </Route>

        <Route element={<Dashboardpagelayout />}>
          <Route path="/Appspage" element={<Appspage />} />
          <Route path="/Dashboardpage" element={<Dashboardpage />} />
          <Route path="/Fundspage" element={<Fundspage />} />
          <Route path="/Holdingspage" element={<Holdingspage />} />
          <Route path="/Orderspage" element={<Orderspage />} />
          <Route path="/Positionspage" element={<Positionspage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
