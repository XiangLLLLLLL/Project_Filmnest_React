import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { setLogin } from "./slice/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { Alert } from "./js/customSweetAlert";
const apiBase = import.meta.env.VITE_API_BASE;

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  // 不顯示Header和Footer頁面
  const layoutHiddenRoutes = [
    "/headerSm",
    "/headerSmSec",
    "/headerSmSearch",
    "/adminHeaderSm",
  ];

  const shouldHideLayout = layoutHiddenRoutes.includes(location.pathname);

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)loginToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const checkLogin = async (token) => {
      try {
        const response = await axios.get(`${apiBase}/users?token=${token}`);
        const userData = response.data[0];
        dispatch(
          setLogin({
            token: userData.token,
            userId: userData.id,
            userName: userData.userProfile.userName,
            imageUrl: userData.userProfile.userImageUrl,
            hasStudio: userData.hasStudio,
          })
        );
      } catch (error) {
        if (error) {
          Alert.fire({
            icon: "error",
            title: "驗證失敗",
          });
        }
      }
    };

    if (token) {
      checkLogin(token);
    }
  }, [dispatch]);
  return (
    <>
      {!shouldHideLayout && <Header />}
      <Outlet />
      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default App;
