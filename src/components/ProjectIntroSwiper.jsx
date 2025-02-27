// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Thumbs } from "swiper/modules";

import { useEffect, useRef, useState } from "react";

import { useParams } from "react-router"; // xiang 2025/02/27 intro路由調整

import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ProjectIntroSwiper() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [otherImages, setOtherImages] = useState([]);

  const swiperRef = useRef();

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // 取得劇照資料
  const { id } = useParams(); // xiang 2025/02/27 intro路由調整
  useEffect(() => {
    const projectData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/projects/${id}`); // xiang 2025/02/27 intro路由調整

        setOtherImages(res.data.otherImages);
      } catch (error) {
        console.log("取得專案資料失敗：", error);
      }
    };
    projectData();
  }, []);

  // 手機版 Navigation
  const handlePrevSlide = () => {
    swiperRef.current.slidePrev();
  };

  const handleNextSlide = () => {
    swiperRef.current.slideNext();
  };

  return (
    <>
      <main className="mx-auto px-xxl-0" style={{ maxWidth: 660 }}>
        {/* 上方大圖的 Swiper */}
        <Swiper
          modules={[Thumbs, Navigation]}
          thumbs={{ swiper: thumbsSwiper }}
          spaceBetween={24}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          className="rounded overflow-hidden mb-0 mb-md-1 mb-lg-2 mb-xxl-3"
        >
          {otherImages.map((image) => (
            <SwiperSlide key={image.id} className="project-intro-main-swiper-slide">
              <img className="rounded" src={image.imageUrl} alt="外送員" />
            </SwiperSlide>
          ))}
          <button
            type="button"
            className={`project-intro-unstyled-btn swiper-button-prev projectIntroSwiper-button-prev d-flex d-md-none 
                ${isBeginning ? "hidden-btn" : ""}`}
            onClick={handlePrevSlide}
          ></button>
          <button
            type="button"
            className={`project-intro-unstyled-btn swiper-button-next projectIntroSwiper-button-next d-flex d-md-none 
                ${isEnd ? "hidden-btn" : ""}`}
            onClick={handleNextSlide}
          ></button>
        </Swiper>

        {/* 下方圖片的 Swiper */}
        <Swiper modules={[Thumbs]} watchSlidesProgress onSwiper={setThumbsSwiper} slidesPerView={3} spaceBetween={24} className="projectIntroSwiper d-none d-md-block">
          {otherImages.map((image) => (
            <SwiperSlide key={image.id} className="swiper-slide">
              <img className="rounded small-slide-image" src={image.imageUrl} alt="外送員" />
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </>
  );
}
