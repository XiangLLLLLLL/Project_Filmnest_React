import axios from "axios";
import { Collapse } from "bootstrap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Toast } from "../../js/customSweetAlert";
import GrayScreenLoading from "../../components/GrayScreenLoading";
import getNewTime from "../../helpers/getNewTime";
const apiBase = import.meta.env.VITE_API_BASE;

export default function ProjectIntroQA() {
  const { id } = useParams();
  const [projectFaqs, setProjectFaqs] = useState([]);
  const [faqsIsOpen, setFaqsIsOpen] = useState([]);
  const faqsCollapseRef = useRef([]);
  const faqsCollapseInstances = useRef([]);
  const [params, setParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //處理params
  useLayoutEffect(() => {
    if (id) {
      const paramsArray = id.split("&");
      let paramsObj = {};
      paramsArray.forEach((param) => {
        let [key, value] = param.split("=");
        paramsObj[key] = Number(value);
      });
      setParams(paramsObj);
    }
  }, [id]);


  useLayoutEffect(() => {
    if (params.projectId) {
      (async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${apiBase}/faqs?projectId=${params.projectId}`
          );
          setProjectFaqs(response.data);
          setFaqsIsOpen(
            response.data.map((item) => {
              return { id: item.id, isOpen: false };
            })
          );
        } catch (error) {
          if (error) {
            Toast.fire({
              icon: "error",
              title: "最新消息取得失敗",
            });
          }
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [params]);

  useEffect(() => {
    faqsCollapseRef.current.forEach((item, index) => {
      if (item) {
        faqsCollapseInstances.current[index] = new Collapse(item, {
          toggle: false,
        });
      }
    });
  }, [projectFaqs]);

  const handleCollapse = (id) => {
    setFaqsIsOpen((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      );
    });

    const index = projectFaqs.findIndex((item) => item.id === id);
    faqsCollapseInstances.current[index].toggle();
  };

  return (
    <>
      <Helmet>
        <title>常見問題</title>
      </Helmet>
      <div className="container pt-8 pb-10 py-md-15">
        {projectFaqs.map((item, index) => {
          return (
            <div className="row mb-5" key={item.id}>
              <div className="col-10 mx-auto">
                <div className="border border-0 border-primary-5 rounded box-shadow">
                  <button
                    className={`text-white py-3 px-4 w-100 fs-5 d-flex flex-column flex-lg-row justify-content-start justify-content-lg-between border-1 ${
                      faqsIsOpen[index].isOpen
                        ? "bg-primary-6"
                        : "bg-primary-10"
                    }`}
                    type="button"
                    onClick={() => handleCollapse(item.id)}
                  >
                    <span className="d-flex justify-content-between">
                      <span className="fs-base">
                        Q{index + 1}:
                        <span className="fs-base ms-lg-3">{item.title}</span>
                      </span>
                      {faqsIsOpen[index].isOpen ? (
                        <i className="bi bi-chevron-up fs-sm d-lg-none"></i>
                      ) : (
                        <i className="bi bi-chevron-down fs-sm d-lg-none"></i>
                      )}
                    </span>
                    <span className="d-flex align-self-start align-items-center">
                      <span className="fs-sm text-primary-5 me-2">
                        {getNewTime(item.date)}
                      </span>
                      {faqsIsOpen[index].isOpen ? (
                        <i className="bi bi-chevron-up fs-7 d-none d-lg-block"></i>
                      ) : (
                        <i className="bi bi-chevron-down fs-7 d-none d-lg-block"></i>
                      )}
                    </span>
                  </button>
                  <div
                    className="collapse "
                    ref={(el) => (faqsCollapseRef.current[index] = el)}
                  >
                    <div className="card card-body">{item.content}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <GrayScreenLoading isLoading={isLoading} />
    </>
  );
}
