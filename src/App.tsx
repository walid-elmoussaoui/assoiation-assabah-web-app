/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Founder from "./pages/Founder";
import Booking from "./pages/Booking";
import Activities from "./pages/Activities";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="founder" element={<Founder />} />
          <Route path="activities" element={<Activities />} />
          <Route path="booking" element={<Booking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
