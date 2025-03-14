import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
const apiBase = import.meta.env.VITE_API_BASE;
import Card from "../components/Card";

export default function AboutStudio() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navItems = ["進行中", "已結案", "其他作品集"];
  const [userId, setUserId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [length,setlength] = useState("");
  const { id } = useParams();
  // 提案者資料
  const [studioProfile, setStudioProfile] = useState({});
  // 取得提案者資料
  const getStudioProfile = async () => {
    let idArray = id.split("=");
    let idObj = { [idArray[0]]: Number(idArray[1]) };
    const { projectId } = idObj;
    try {
      const res = await axios.get(`${apiBase}/projects?_expand=studio&id=${projectId}`);
      const studioProfile = res.data[0].studio.studioProfile;
      setStudioProfile(studioProfile);
      setUserId(res.data[0].studio.userId);
      
    } catch (error) {
      console.log(error);
    }
  };

  // 取得專案資料
  const getProjectData = async () => {
    try {
      const response = await axios.get(`${apiBase}/projects?studioId=${userId}`);
      setProjects(response.data);
      setlength(response.data.length)
    } catch (error) {
      console.log(error);
    }
  };

  // 元件初始化
  useEffect(() => {
    getStudioProfile();
  }, []);
  useEffect(() => {
    if (userId) {
      getProjectData();
    }
  }, [userId]);

  const { email, endTime, groupName, personResponsible, phone, startTime, studioFb, studioIg, studioImageUrl, studioLine, teamIntro } = studioProfile;

  return (
    <>
      <div className="container mt-20 pb-15">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div className="border-bottom border-primary-4 pb-8 mb-8">
              <div className="row flex-md-row flex-column">
                <div className="col-lg-4 col-md-5 text-center">
                  <img src={studioImageUrl} className="img-fluid object-fit-cover img-director" style={{ height: 264, width: 264 }} alt={groupName} />
                </div>
                <div className="col-lg-8 col-md-7">
                  <div className="d-flex flex-column h-100">
                    <h3 className="fs-6 fs-md-4 mb-3">{groupName}</h3>
                    <p className="fs-sm">
                      <i className="bi bi-person" />
                      {personResponsible}
                    </p>
                    <div id="connectUs" className="rounded-1 p-4 mt-auto" style={{ background: "#FFFFFF1A", border: "1px solid #606060" }}>
                      <div className="d-flex justify-content-between mb-2">
                        <h3 className="fs-sm mb-0">聯絡我們</h3>
                        <ul className="list-unstyled d-flex align-self-end mb-0">
                          <li>
                            <a href={studioFb}>
                              <i className="bi bi-facebook fs-base social-media-hover"></i>
                            </a>
                          </li>
                          <li className="mx-2">
                            <a href={studioIg}>
                              <i className="bi bi-instagram fs-base social-media-hover"></i>
                            </a>
                          </li>
                          <li>
                            <a href={studioLine}>
                              <i className="bi bi-line fs-base social-media-hover"></i>
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div className="d-flex justify-content-between">
                        <ul className="list-unstyled mb-0">
                          <li className="fs-sm mb-1">
                            <a href={`tel:${phone}`}>
                              <i className="bi bi-telephone" /> {phone}
                            </a>
                          </li>
                          <li className="fs-sm mb-1">
                            <a href={email}>
                              <i className="bi bi-envelope" /> {email}
                            </a>
                          </li>
                          <li className="fs-sm">
                            <i className="bi bi-clock" /> {startTime}~{endTime}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="teamIntro">
              <h3 className="fs-7 mb-3 d-flex align-items-center">
                <span className="me-2">。{personResponsible}</span>
                <span className="fs-sm fw-normal">導演/攝影</span>
              </h3>
              <p className="mb-0">{teamIntro}</p>
            </div>
          </div>
        </div>
      </div>
      <nav>
        <ul className="nav bg-primary-6 justify-content-center">
          {navItems.map((item, index) => (
            <li className="nav-item border-0" key={index}>
              <button
                className="nav-link link-primary-1 text-center border-0 position-relative"
                style={{
                  backgroundColor: "transparent",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    position: "relative",
                    paddingBottom: "5px",
                    overflow: "hidden",
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {item}{item === "進行中" && `(${length})`}
                  <span
                    className="underline-effect"
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      height: "2px",
                      width: hoveredIndex === index ? "100%" : "0%",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transition: "width 0.3s ease-in-out",
                    }}
                  ></span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="container py-5 py-lg-20">
        <div className="row">
          <Card projects={projects} isSwiper={false} />
        </div>
      </div>
    </>
  );
}
