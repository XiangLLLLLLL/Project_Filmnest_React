import axios from "axios";
import Swiper from "swiper/bundle";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../slice/categorySlice";
import Card from "../components/Card";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";

const apiBase = import.meta.env.VITE_API_BASE;

export default function Home() {
  // 路由跳轉頁面時，重製滾輪捲軸
  useEffect(() => {
    // 將滾動行為設為 auto 避免有捲動過程的動畫
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  }, []);

  const [projects, setProjects] = useState([]);
  const [sortProjects, setSortProjects] = useState([]);
  const swiperBannerRef = useRef(null);
  const swiperRef = useRef(null);
  const swiper2Ref = useRef(null);
  const swiperCategoryRef = useRef(null);
  const swiperSloganRef = useRef(null);
  const dispatch = useDispatch();

  const getProjectsData = async () => {
    try {
      const response = await axios.get(`${apiBase}/projects`);
      setProjects(response.data.map((item) => item));
      setSortProjects(
        response.data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } catch (error) {
      console.log("取得產品失敗");
    }
  };

  useEffect(() => {
    getProjectsData();
  }, []);

  useEffect(() => {
    // index-banner
    const indexBannerSwiper = new Swiper(swiperBannerRef.current, {
      slidesPerView: 1,
      loop: true,
      autoplay: true,
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
      },
    });
    // index-projectcard 精選專案
    const indexProjectcardSwiper = new Swiper(swiperRef.current, {
      slidesPerView: 1.1, // 每次顯示的幻燈片數量
      spaceBetween: 24, // 兩張圖片之間的間距
      navigation: {
        // 啟用左右箭頭
        nextEl: ".indexcard-button-next",
        prevEl: ".indexcard-button-prev",
      },
      pagination: {
        // 啟用下方的點點導航
        el: ".indexcard-pagination",
        clickable: true,
        type: "bullets",
        updateOnWindowResize: true,
      },
      breakpoints: {
        992: {
          slidesPerView: 3.1,
        },
        576: {
          slidesPerView: 2.1,
        },
      },
    });

    // index-projectcard 最新專案
    const indexProjectcardSwiper2 = new Swiper(swiper2Ref.current, {
      slidesPerView: 1.1, // 每次顯示的幻燈片數量
      spaceBetween: 24, // 兩張圖片之間的間距
      navigation: {
        // 啟用左右箭頭
        nextEl: ".indexcard2-button-next",
        prevEl: ".indexcard2-button-prev",
      },
      pagination: {
        // 啟用下方的點點導航
        el: ".indexcard2-pagination",
        clickable: true,
      },
      breakpoints: {
        992: {
          slidesPerView: 3.1,
        },
        576: {
          slidesPerView: 2.1,
        },
      },
    });
    // index-category 類別
    const indexCaregorySwiper = new Swiper(swiperCategoryRef.current, {
      slidesPerView: 2,
      spaceBetween: 8,
      grid: {
        fill: "row",
        rows: 4,
      },
      pagination: {
        el: ".indexcategory-pagination",
        clickable: true,
      },

      breakpoints: {
        992: {
          slidesPerView: 4,
          spaceBetween: 32,
          grid: {
            fill: "row",
            rows: 2,
          },
        },
      },
    });
    // index-slogan
    const indexSlogaSwiper = new Swiper(swiperSloganRef.current, {
      slidesPerView: 3,
      spaceBetween: 8,
      breakpoints: {
        992: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      },
    });
    return () => {
      indexBannerSwiper.destroy();
      indexProjectcardSwiper.destroy();
      indexProjectcardSwiper2.destroy();
      indexCaregorySwiper.destroy();
      indexSlogaSwiper.destroy();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>影巢 FilmNest</title>
        <meta
          name="description"
          content="這是影巢的首頁，探索專案與贊助專案。"
        />
      </Helmet>
      <section className="index-banner">
        <div className="index-banner-container">
          <div className="swiper indexbannerswiper" ref={swiperBannerRef}>
            <div className="swiper-wrapper">
              <div className="swiper-slide h-auto">
                <div className="index-banner-text-bg h-100 text-balance">
                  <div className="container index-banner-text h-100 d-flex flex-column">
                    <h1 className="fs-6 fs-lg-xxl mb-3 mb-lg-6">
                      點燃創意，成就影視夢想
                    </h1>
                    <p className="fs-sm fs-lg-7 mb-8 mb-lg-15">
                      為影視創作者打造專屬募資平台，
                      <br />
                      支持獨立製作與學生創作，點燃影視夢想。
                      <br />
                      加入我們，讓你的創意被發現，讓更多故事成為現實。
                    </p>
                    <div className="mt-auto">
                      <Link
                        to="/"
                        className="btn btn-primary fw-bolder py-3 px-5"
                      >
                        我想贊助
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {projects.map((project) => {
                return (
                  <div className="swiper-slide h-auto" key={project.id}>
                    <div
                      className="index-banner-text-bg  h-100 text-balance"
                      style={{
                        backgroundImage: `url(${project.projectImage})`,
                      }}
                    >
                      <div className="container index-banner-text h-100 d-flex flex-column">
                        <h1 className="fs-6 fs-lg-xxl mb-3 mb-lg-6 justify-content-center justify-content-lg-start">
                          {project.projectTitle}
                        </h1>
                        <p className="fs-sm fs-lg-7 mb-8 mb-lg-15">
                          {project.summary}
                        </p>
                        <div className="mt-auto">
                          <Link
                            to={`/projects/projectId=${project.id}`}
                            className="btn btn-primary fw-bolder py-3 px-5"
                          >
                            我想贊助
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="swiper-scrollbar indexbannerswiper-scrollbar"></div>
          </div>
        </div>
      </section>
      <section className="index-projectcard position-relative">
        <div className="container pt-18 pb-11 py-lg-20">
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="fs-7 fs-lg-6 mb-0 text-white">精選專案</h2>
              <div className="d-flex align-items-center">
                <div>
                  <div className="swiper-button-prev indexcard-button-prev custom-style-prev d-none d-md-flex"></div>
                </div>
                <div className="swiper-pagination indexcard-pagination custom-style-pagination d-none d-md-flex"></div>
                <div>
                  <div className="swiper-button-next indexcard-button-next custom-style-next d-none d-md-flex"></div>
                </div>
                <Link
                  to="/projectExplore"
                  className="fs-sm fs-lg-base d-block mb-0 text-nowrap ms-5 link-light"
                >
                  查看更多
                </Link>
              </div>
            </div>
            <div
              ref={swiperRef}
              className="swiper indexcard pb-16 pb-lg-20 pt-7 ps-3"
              style={{ marginLeft: "-12px", overflow: "hidden" }}
            >
              <div className="swiper-wrapper">
                <Card projects={projects} isSwiper={true} />
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="fs-7 fs-lg-6 mb-0 text-white">最新專案</h2>
              <div className="d-flex align-items-center">
                <div>
                  <div className="swiper-button-prev indexcard2-button-prev custom-style-prev d-none d-md-flex"></div>
                </div>
                <div className="swiper-pagination indexcard2-pagination custom-style-pagination d-none d-md-flex"></div>
                <div>
                  <div className="swiper-button-next indexcard2-button-next custom-style-next d-none d-md-flex"></div>
                </div>
                <Link
                  to="/projectExplore"
                  className="fs-sm fs-lg-base d-block mb-0 text-nowrap ms-5 link-light"
                >
                  查看更多
                </Link>
              </div>
            </div>
            <div
              ref={swiper2Ref}
              className="swiper indexcard2 pb-16 pb-lg-20 pt-7 ps-3"
              style={{ marginLeft: "-12px", overflow: "hidden" }}
            >
              <div className="swiper-wrapper">
                <Card projects={sortProjects} isSwiper={true} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="index-category">
        <div className="container">
          <div className="mb-5 mb-lg-20">
            <h2 className="fs-7 fs-lg-3 mb-0 text-center">你可以找到 ...</h2>
          </div>
          <div
            ref={swiperCategoryRef}
            className="swiper indexcategory p-3"
            style={{ marginRight: "-12px", marginLeft: "-12px" }}
          >
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="d-flex align-items-center justify-content-center py-4 py-lg-6 bg-primary-9 rounded indexcategory-card">
                  <img
                    src="喜劇.png"
                    className="indexcategory-img"
                    alt="喜劇"
                  />
                  <Link
                    to="/projectExplore"
                    onClick={() => dispatch(setCategory("喜劇"))}
                    className="stretched-link"
                  >
                    <h3 className="fs-base fs-lg-7 ms-3 ms-lg-5 mb-0">喜劇</h3>
                  </Link>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="d-flex align-items-center justify-content-center py-4 py-lg-6 bg-primary-9 rounded indexcategory-card">
                  <img
                    src="愛情.png"
                    className="indexcategory-img"
                    alt="愛情"
                  />
                  <Link
                    to="/projectExplore"
                    onClick={() => dispatch(setCategory("愛情"))}
                    className="stretched-link"
                  >
                    <h3 className="fs-base fs-lg-7 ms-3 ms-lg-5 mb-0">愛情</h3>
                  </Link>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="d-flex align-items-center justify-content-center py-4 py-lg-6 bg-primary-9 rounded indexcategory-card">
                  <img
                    src="恐怖.png"
                    className="indexcategory-img"
                    alt="恐怖"
                  />
                  <Link
                    to="/projectExplore"
                    onClick={() => dispatch(setCategory("恐怖"))}
                    className="stretched-link"
                  >
                    <h3 className="fs-base fs-lg-7 ms-3 ms-lg-5 mb-0">恐怖</h3>
                  </Link>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="d-flex align-items-center justify-content-center py-4 py-lg-6 bg-primary-9 rounded indexcategory-card">
                  <img
                    src="懸疑.png"
                    className="indexcategory-img"
                    alt="懸疑"
                  />
                  <Link
                    to="/projectExplore"
                    onClick={() => dispatch(setCategory("懸疑"))}
                    className="stretched-link"
                  >
                    <h3 className="fs-base fs-lg-7 ms-3 ms-lg-5 mb-0">懸疑</h3>
                  </Link>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="d-flex align-items-center justify-content-center py-4 py-lg-6 bg-primary-9 rounded indexcategory-card">
                  <img
                    src="科幻.png"
                    className="indexcategory-img"
                    alt="科幻"
                  />
                  <Link
                    to="/projectExplore"
                    onClick={() => dispatch(setCategory("科幻"))}
                    className="stretched-link"
                  >
                    <h3 className="fs-base fs-lg-7 ms-3 ms-lg-5 mb-0">科幻</h3>
                  </Link>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="d-flex align-items-center justify-content-center py-4 py-lg-6 bg-primary-9 rounded indexcategory-card">
                  <img
                    src="紀錄片.png"
                    className="indexcategory-img"
                    alt="紀錄片"
                  />
                  <Link
                    to="/projectExplore"
                    onClick={() => dispatch(setCategory("紀錄片"))}
                    className="stretched-link"
                  >
                    <h3 className="fs-base fs-lg-7 ms-3 ms-lg-5 mb-0">
                      紀錄片
                    </h3>
                  </Link>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="d-flex align-items-center justify-content-center py-4 py-lg-6 bg-primary-9 rounded indexcategory-card">
                  <img
                    src="動畫.png"
                    className="indexcategory-img"
                    alt="動畫"
                  />
                  <Link
                    to="/projectExplore"
                    onClick={() => dispatch(setCategory("動畫"))}
                    className="stretched-link"
                  >
                    <h3 className="fs-base fs-lg-7 ms-3 ms-lg-5 mb-0">動畫</h3>
                  </Link>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="d-flex align-items-center justify-content-center py-4 py-lg-6 bg-primary-9 rounded indexcategory-card">
                  <img
                    src="實驗電影.png"
                    className="indexcategory-img"
                    alt="實驗電影"
                  />
                  <Link
                    to="/projectExplore"
                    onClick={() => dispatch(setCategory("實驗電影"))}
                    className="stretched-link"
                  >
                    <h3 className="fs-base fs-lg-7 ms-3 ms-lg-5 mb-0">
                      實驗電影
                    </h3>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="index-case position-relative">
        <div className="container pb-18 pt-0 py-lg-30">
          <div>
            <h2 className="mb-5 mb-lg-30">成功案例</h2>
          </div>
          <div className="row g-0 mb-10 mb-lg-40">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="pe-lg-13">
                <img src="/image45.png" className="img-fluid" alt="image 46" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="ps-lg-1">
                <h3 className="fs-base fs-lg-6 mb-4 mb-lg-8 ps-3 ps-lg-4 border-start border-4 border-white">
                  開心工作室
                </h3>
                <p className="fs-sm fs-lg-base mb-4 mb-lg-5 p-3 p-lg-5 bg-primary-9 rounded-3">
                  成功募資電影的經驗讓我深刻理解了市場調研的重要性。了解目標觀眾和投資者的需求，並根據他們的期望來調整計劃，能夠大大提高募資成功的機會。有效的推廣和積極的社交媒體策略也非常重要，它們能夠幫助..
                </p>

                <button
                  type="button"
                  className="btn btn-secondary w-100 w-lg-auto py-4 px-5 d-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <h4 className="fs-base mb-0 mx-auto d-flex align-items-center">
                    完整查看
                    <span className="material-symbols-outlined fs-7 ps-2">
                      arrow_forward
                    </span>
                  </h4>
                </button>

                <div
                  className="modal fade index-modal"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-scrollable modal-xl">
                    <div className="modal-content border-1 rounded-4 border-primary-5">
                      <div className="modal-header index-modal-header align-items-start border-0 rounded-0">
                        <button
                          type="button"
                          className="btn-close btn-index-close btn-white"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body index-modal-body">
                        <div className="border-4 border-start border-white mb-3 mb-md-10 ps-4">
                          <h4 className="fs-sm fs-md-7 text-primary-3 mb-1">
                            成功案例
                          </h4>
                          <h3 className="fs-base fs-md-3">開心工作室</h3>
                        </div>
                        <p className="fs-sm fs-md-base">
                          成功募資電影的經驗讓我深刻理解了市場調研的重要性。了解目標觀眾和投資者的需求,並根據他們的期望來調整計劃,能夠大大提高募資成功的機會。有效的推廣和積極的社交媒體策略也非常重要,它們能夠幫助…
                          <br />
                          <br />
                          成功募資電影的經驗讓我深刻理解了市場調研的重要性。了解目標觀眾和投資者的需求,並根據他們的期望來調整計劃,能夠大大提高募資成功的機會。有效的推廣和積極的社交媒體策略也非常重要,它們能夠幫助…
                          <br />
                          <br />
                          成功募資電影的經驗讓我深刻理解了市場調研的重要性。了解目標觀眾和投資者的需求,並根據他們的期望來調整計劃,能夠大大提高募資成功的機會。有效的推廣和積極的社交媒體策略也非常重要,它們能夠幫助…
                          <br />
                          <br />
                          成功募資電影的經驗讓我深刻理解了市場調研的重要性。了解目標觀眾和投資者的需求,並根據他們的期望來調整計劃,能夠大大提高募資成功的機會。有效的推廣和積極的社交媒體策略也非常重要,它們能夠幫助…
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row flex-row-reverse g-0 mb-10 mb-lg-40">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="ps-lg-13">
                <img src="/image46.png" className="img-fluid" alt="image 46" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="pe-lg-1">
                <h3 className="fs-base fs-lg-6 mb-4 mb-lg-8 ps-3 ps-lg-4 border-start border-4 border-white">
                  張先生
                </h3>
                <p className="fs-sm fs-lg-base mb-4 mb-lg-5 p-3 p-lg-5 bg-primary-9 rounded-3">
                  在電影募資過程中，我學到了如何將想法具體化並與投資者建立信任。關鍵在於準備周全的計劃書和展示影片，讓投資者能夠清晰理解項目的潛力和回報。同時，透明的溝通和積極的互動也是成功募資，...
                </p>

                <button
                  type="button"
                  className="btn btn-secondary w-100 w-lg-auto py-4 px-5 d-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2"
                >
                  <h4 className="fs-base mb-0 mx-auto d-flex align-items-center">
                    完整查看
                    <span className="material-symbols-outlined fs-7 ps-2">
                      arrow_forward
                    </span>
                  </h4>
                </button>

                <div
                  className="modal fade index-modal"
                  id="exampleModal2"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-scrollable modal-xl">
                    <div className="modal-content border-1 rounded-4 border-primary-5">
                      <div className="modal-header index-modal-header2 align-items-start border-0 rounded-0">
                        <button
                          type="button"
                          className="btn-close btn-index-close btn-white"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body index-modal-body">
                        <div className="border-4 border-start border-white mb-3 mb-md-10 ps-4">
                          <h4 className="fs-sm fs-md-7 text-primary-3 mb-1">
                            成功案例
                          </h4>
                          <h3 className="fs-base fs-md-3">張先生</h3>
                        </div>
                        <p className="fs-sm fs-md-base">
                          在電影募資過程中，我學到了如何將想法具體化並與投資者建立信任。關鍵在於準備周全的計劃書和展示影片，讓投資者能夠清晰理解項目的潛力和回報。同時，透明的溝通和積極的互動也是成功募資。
                          <br />
                          <br />
                          在電影募資過程中，我學到了如何將想法具體化並與投資者建立信任。關鍵在於準備周全的計劃書和展示影片，讓投資者能夠清晰理解項目的潛力和回報。同時，透明的溝通和積極的互動也是成功募資。
                          <br />
                          <br />
                          在電影募資過程中，我學到了如何將想法具體化並與投資者建立信任。關鍵在於準備周全的計劃書和展示影片，讓投資者能夠清晰理解項目的潛力和回報。同時，透明的溝通和積極的互動也是成功募資。
                          <br />
                          <br />
                          在電影募資過程中，我學到了如何將想法具體化並與投資者建立信任。關鍵在於準備周全的計劃書和展示影片，讓投資者能夠清晰理解項目的潛力和回報。同時，透明的溝通和積極的互動也是成功募資。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-0">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="pe-lg-13">
                <img src="/image44.png" className="img-fluid" alt="image 46" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="ps-lg-1">
                <h3 className="fs-base fs-lg-6 mb-4 mb-lg-8 ps-3 ps-lg-4 border-start border-4 border-white">
                  林先生
                </h3>
                <p className="fs-sm fs-lg-base mb-4 mb-lg-5 p-3 p-lg-5 bg-primary-9 rounded-3">
                  成功募資電影的經驗讓我深刻體會到創意與實踐的結合至關重要。精心策劃的影片提案和吸引人的預告片能夠有效地展示項目的魅力，而建立專業且有經驗的團隊則增強了投資者的信心。透過與投資者...
                </p>

                <button
                  type="button"
                  className="btn btn-secondary w-100 w-lg-auto py-4 px-5 d-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal3"
                >
                  <h4 className="fs-base mb-0 mx-auto d-flex align-items-center">
                    完整查看
                    <span className="material-symbols-outlined fs-7 ps-2">
                      arrow_forward
                    </span>
                  </h4>
                </button>

                <div
                  className="modal fade index-modal"
                  id="exampleModal3"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-scrollable modal-xl">
                    <div className="modal-content border-1 rounded-4 border-primary-5">
                      <div className="modal-header index-modal-header3 align-items-start border-0 rounded-0">
                        <button
                          type="button"
                          className="btn-close btn-index-close btn-white"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body index-modal-body">
                        <div className="border-4 border-start border-white mb-3 mb-md-10 ps-4">
                          <h4 className="fs-sm fs-md-7 text-primary-3 mb-1">
                            成功案例
                          </h4>
                          <h3 className="fs-base fs-md-3">林先生</h3>
                        </div>
                        <p className="fs-sm fs-md-base">
                          成功募資電影的經驗讓我深刻體會到創意與實踐的結合至關重要。精心策劃的影片提案和吸引人的預告片能夠有效地展示項目的魅力，而建立專業且有經驗的團隊則增強了投資者的信心。透過與投資者。
                          <br />
                          <br />
                          成功募資電影的經驗讓我深刻體會到創意與實踐的結合至關重要。精心策劃的影片提案和吸引人的預告片能夠有效地展示項目的魅力，而建立專業且有經驗的團隊則增強了投資者的信心。透過與投資者。
                          <br />
                          <br />
                          成功募資電影的經驗讓我深刻體會到創意與實踐的結合至關重要。精心策劃的影片提案和吸引人的預告片能夠有效地展示項目的魅力，而建立專業且有經驗的團隊則增強了投資者的信心。透過與投資者。
                          <br />
                          <br />
                          成功募資電影的經驗讓我深刻體會到創意與實踐的結合至關重要。精心策劃的影片提案和吸引人的預告片能夠有效地展示項目的魅力，而建立專業且有經驗的團隊則增強了投資者的信心。透過與投資者。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="slogan">
        <div className="container py-10 py-lg-30">
          <h2 className="fs-6 fs-lg-2 text-center mb-5 mb-lg-10 position-relative z-1">
            孵化你的電影夢<span className="d-none d-lg-inline">，</span>
            <span className="d-lg-none">
              <br />
            </span>
            成就每一個精彩故事
          </h2>
          <div
            className="swiper sloganswiper mb-5 mb-lg-10"
            ref={swiperSloganRef}
          >
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="py-2 py-lg-5 text-center slogan-card-bg">
                  <h3 className="fs-7 fs-lg-1">42</h3>
                  <h4 className="fs-sm fs-lg-7">累積專案</h4>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="py-2 py-lg-5 text-center slogan-card-bg">
                  <h3 className="fs-7 fs-lg-1">4,837,261</h3>
                  <h4 className="fs-sm fs-lg-7">累積金額</h4>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="py-2 py-lg-5 text-center slogan-card-bg">
                  <h3 className="fs-7 fs-lg-1">2,947</h3>
                  <h4 className="fs-sm fs-lg-7">贊助人數</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center position-relative z-1">
            <Link
              to="/aboutProposal"
              className="btn btn-primary py-3 px-5 fw-bolder"
            >
              我要提案
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
