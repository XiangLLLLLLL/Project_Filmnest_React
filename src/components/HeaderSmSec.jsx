import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../slice/userSlice";
import { useNavigate } from "react-router";
import axios from "axios";
import { Toast } from "../js/customSweetAlert";
const apiBase = import.meta.env.VITE_API_BASE;

export default function HeaderSmSec() {
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.user.profile.userId);
  const handleLogout = async () => {
    try {
      await axios.patch(`${apiBase}/users/${id}`, { token: "" });
      document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      Toast.fire({
        icon: "success",
        title: "登出成功",
      });
      dispatch(setLogout());
      navigate("/");
    } catch (error) {
      if (error) {
        Toast.fire({
          icon: "error",
          title: "登出失敗",
        });
      }
    }
  };
  return (
    <>
      <div className="py-3 container">
        <Link className="me-3" to="/">
          <img src="close_white.png" alt="close" style={{ width: "20px" }} />
        </Link>
        <Link to="/">
          <img src="https://github.com/s851218/Project-FilmNest/blob/main/assets/images/logo.png?raw=true" alt="logo" />
        </Link>
      </div>
      <ul className="nav flex-column">
        {profile.token ? (
          <Link to="/headerSm" className="d-flex align-items-center fw-bolder btn btn-primary-8 btn-main border-0 border-bottom">
            <div>
              <i className="bi bi-chevron-left me-3"></i>
            </div>
            <div>返回</div>
          </Link>
        ) : (
          <Link to="/login" className="btn btn-primary-8 btn-main border-0 border-bottom fw-bolder">
            登入 / 註冊
          </Link>
        )}
        <Link to="/personalCenter/profile" className="nav-item btn-main border-bottom">
          個人頁面
        </Link>
        <Link to="/personalCenter/favoriteProject" className="nav-item btn-main">
          收藏專案
        </Link>
        <Link to="/personalCenter/orderRecords/orderRecordsAll" className="nav-item btn-main">
          訂單紀錄
        </Link>
        <Link to="/personalCenter/favoriteVideo" className="nav-item btn-main border-bottom">
          收藏影音
        </Link>
        <Link to="/personalCenter/viewRecords" className="nav-item btn-main border-bottom">
          觀看紀錄
        </Link>
        <Link className="nav-item btn-main" onClick={handleLogout}>
          登出
        </Link>
      </ul>
    </>
  );
}
