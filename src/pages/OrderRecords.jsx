import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, Outlet, useLocation } from "react-router";
import PersonalCenterSidebar from "../components/PersonalCenterSidebar";

export default function OrderRecords() {
  // 路由跳轉至專案介紹頁時，重製滾輪捲軸
  useEffect(() => {
    // 將滾動行為設為 auto 避免有捲動過程的動畫
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const onePageLayout = ["orderRecordsAll","orderRecordsSuccess","orderRecordsFailed","orderRecordsUnpaid"];
  const pathSegments = location.pathname.split("/");
  const currentRoute = pathSegments[pathSegments.length - 1];
  const shouldOnePageLayout = onePageLayout.includes(currentRoute);
  const activeStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "rgba(255, 255, 255, 0.2)" : "",
    borderRadius: "12px 12px 0 0",
  });

  return (
    <>
      <Helmet>
        <title>訂單紀錄</title>
      </Helmet>
      {shouldOnePageLayout ? (<>
        <div className="d-block d-lg-none w-100 mb-5 bg-primary-8">
            <PersonalCenterSidebar />
        </div>
        <div className="container">
          <h1 className="pb-5 border-bottom border-secondary fs-6">訂單紀錄</h1>
          <div className="border-bottom border-secondary">
            <ul className="list-unstyled row row-cols-4 text-center pt-5 mb-0">
              <li className="col">
                <NavLink className="w-100 d-block py-3" to="orderRecordsAll" style={activeStyle}>
                  所有訂單紀錄
                </NavLink>
              </li>
              <li className="col">
                <NavLink className="w-100 d-block py-3" to="orderRecordsSuccess" style={activeStyle}>
                  成功訂單紀錄
                </NavLink>
              </li>
              <li className="col">
                <NavLink className="w-100 d-block py-3" to="orderRecordsFailed" style={activeStyle}>
                  退款/退貨紀錄
                </NavLink>
              </li>
              <li className="col">
                <NavLink className="w-100 d-block py-3" to="orderRecordsUnpaid" style={activeStyle}>
                  未付款訂單紀錄
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </>) : (
        <div>
          <Outlet />
        </div>
      )}
    </>
  );
}
