import {  Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Spinner from "./layouts/spinner";

const LayoutPages = lazy(() => import("./pages/layout"));
const Home = lazy(() => import("./pages/home/page"));
const TermsAndConditions = lazy(() => import("./pages/Terms&Conditions/page"));
const LayoutAuth = lazy(() => import("./pages/auth/layout"));
const SignIn = lazy(() => import("./pages/auth/signIn"));
const SignUp = lazy(() => import("./pages/auth/signUp"));
const AboutUs = lazy(() => import("./pages/aboutUs/page"));
const PrivacyPolicy = lazy(() => import("./pages/privacyPolicy/page"));
const FAQ = lazy(() => import("./pages/faq/page"));
const ContactUs = lazy(() => import("./pages/contactUs/page"));
const BlogDetails = lazy(() => import("./pages/blog/blog"));
const PropertyDetails = lazy(() => import("./pages/property/property"));
const Destinations = lazy(() => import("./pages/property/page"));
const ListYourProperty = lazy(() => import("./pages/listYourProperty/page"));
const NotFound = lazy(() => import("./pages/404_Page/404Page"));
const UserProperties = lazy(() => import("./pages/userProperties/page"));

function App() {
  return (
      <Suspense fallback={<Spinner/>}>
        <Routes>
          <Route element={<LayoutPages />} path="/*">
            <Route path="" element={<Home />} />
            <Route path="terms&conditions" element={<TermsAndConditions />} />
            <Route path="aboutUs" element={<AboutUs />} />
            <Route path="privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="FAQs" element={<FAQ />} />
            <Route path="contactUs" element={<ContactUs />} />
            <Route path="blog/:id" element={<BlogDetails />} />
            <Route path="property/:id" element={<PropertyDetails />} />
            <Route path="destinations" element={<Destinations />} />
            <Route path="listYourProperty" element={<ListYourProperty />} />
            <Route path="properties" element={<UserProperties />} />
            <Route element={<LayoutAuth />} path="auth/*">
              <Route element={<SignIn />} path="signIn" />
              <Route element={<SignUp />} path="signUp" />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
   
  );
}

export default App;
