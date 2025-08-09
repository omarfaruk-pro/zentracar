import { Outlet } from "react-router";
import Header from "../default/Header";
import Footer from "../default/Footer";

export default function DefaultLayout() {
  return (
    <>
      <Header></Header>
      <div className="min-h-[calc(100vh-383px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  )
}
