import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export default function FavoriteVideo() {
  // 路由跳轉至專案介紹頁時，重製滾輪捲軸
  useEffect(() => {
    // 將滾動行為設為 auto 避免有捲動過程的動畫
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>收藏影音</title>
      </Helmet>

      <div className="container">
        <h1>收藏影音</h1>
      </div>
    </>
  );
}
