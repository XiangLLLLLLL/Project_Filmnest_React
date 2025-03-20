import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

{
  /* <script src="https://code.jquery.com/jquery-3.7.1.js" />
<!-- Bootstrap DatePicker 日期選擇器模組.JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.10.0/js/bootstrap-datepicker.min.js" />
<!-- Bootstrap DatePicker 日期選擇器模組.中文 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.10.0/locales/bootstrap-datepicker.zh-TW.min.js" />
<!-- Bootstrap DatePicker 日期選擇器模組.CSS -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.10.0/css/bootstrap-datepicker.min.css" rel="stylesheet" /> */
}

export default function CreatePropsal() {
  // 路由跳轉至專案介紹頁時，重製滾輪捲軸
  useEffect(() => {
    // 將滾動行為設為 auto 避免有捲動過程的動畫
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  }, []);

  {
    /*
    email: "電子信箱"
    endTime: "服務時間(迄)"
    groupName: "團隊名稱"
    personResponsible: "負責人"
    phone: "電話"
    startTime: "服務時間(起)"
    studioFb: "FB"
    studioIg: "IG"
    studioImageUrl: "大頭貼"
    studioLine: "LINE"
    teamIntro: "團隊簡介"
  */
  }

  const { register, handleSubmit, control , formState:{errors} } = useForm({
    defaultValues: {
      groupName: "",
      personResponsible: "",
      email: "",
      phone: "",
      studioImageUrl: "",
      startTime: "",
      endTime: "",
      studioFb: "",
      studioIg: "",
      studioLine: "",
      teamIntro: "",
    },
  });

  const watch = useWatch({ control });
  useEffect(() => {
    console.log(watch);
  }, [watch]);

  const onSubmit = () => {};

  useEffect(()=>{
    console.log(errors);
    
  },[errors])

  return (
    <>
      <div className="container pt-20 pt-xl-40 pb-10 pb-md-15 pb-xl-30 text-center">
        <h1 className="text-center mb-5 mb-sm-8 mb-md-10">發起專案</h1>
        <form>
          <div className="container">
            <div className="row justify-content-center mb-5 mb-sm-8 mb-md-10 text-start">
              <fieldset className="payment-fieldset col-12 col-md-10">
                <legend className="payment-lengend">專案基本資訊</legend>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="projectName" className="form-label required">
                    專案名稱
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.projectName ? "is-invalid": ""}`}
                    id="projectName"
                    {...register("projectName",{
                      required: {
                        value: true,
                        message: "*必填欄位，限制30字"
                      },
                      maxLength: {
                        value: 30,
                        message: "*超出字數上限，限制30字"
                      }
                    })}
                  />
                  { errors.projectName ? (<div className="invalid-feedback">{errors?.projectName?.message}</div>) : (<p className="fs-sm mb-0 mt-1">限制30字</p>) }
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="projectType" className="form-label required">
                    專案類型
                  </label>
                  <select
                    className={`form-select ${errors.projectType ? "is-invalid": ""}`}
                    id="projectType"
                    defaultValue="請選擇專案類型"
                    {...register("projectType",{
                      validate: {
                        value: value => value !== "請選擇專案類型" || "*請選擇有效專案類型",
                      }
                    })}
                  >
                    <option selected>請選擇專案類型</option>
                    <option value="喜劇">喜劇</option>
                    <option value="愛情">愛情</option>
                    <option value="恐怖">恐怖</option>
                    <option value="懸疑">懸疑</option>
                    <option value="科幻">科幻</option>
                    <option value="紀錄片">紀錄片</option>
                    <option value="動畫">動畫</option>
                    <option value="實驗電影">實驗電影</option>
                  </select>
                  { errors.projectType && <div className="invalid-feedback">{errors?.projectType?.message}</div> }
                </div>
                <div className="mb-3 mb-md-5">
                  <label
                    htmlFor="projectdIntroduction"
                    className="form-label required"
                  >
                    專案簡介
                  </label>
                  <textarea
                    className={`form-control ${errors.projectdIntroduction ? "is-invalid": ""}`}
                    name="projectdIntroduction"
                    id="projectdIntroduction"
                    {...register("projectdIntroduction",{
                      required: {
                        value: true,
                        message: "*必填欄位，限制80字"
                      },
                      maxLength: {
                        value: 80,
                        message: "*超出字數上限，限制80字"
                      }
                    })}
                  />
                  { errors.projectdIntroduction ? (<div className="invalid-feedback">{errors?.projectdIntroduction?.message}</div>) : (<p className="fs-sm mb-0 mt-1">限制80字</p>) }
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="target" className="form-label required">
                    目標金額
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    className={`form-control ${errors.target ? "is-invalid": ""}`}
                    id="target"
                    {...register("target",{
                      required: {
                        value: true,
                        message: "*必填欄位"
                      },
                      pattern: {
                        value: /^[1-9]\d*$/,
                        message: "*格式錯誤，只能輸入大於0的整數"
                      }
                    })}
                  />
                  { errors.target && (<div className="invalid-feedback">{errors?.target?.message}</div>) }
                </div>
                <div className="mb-3 mb-md-5">
                  <h3 className="fs-base fw-normal lh-base required">募資時間</h3>
                  <div className="container px-0">
                    <div className="row daterange">
                      <div className="col-6">
                        <small>
                          <label
                            htmlFor="inputDate1"
                            className="form-label required"
                          >
                            起始時間
                          </label>
                        </small>
                        <input
                          type="text"
                          id="inputDate1"
                          placeholder="起始時間"
                          className="form-control"
                        />
                      </div>
                      <div className="col-6">
                        <small>
                          <label
                            htmlFor="inputDate2"
                            className="form-label required"
                          >
                            結束時間
                          </label>
                        </small>
                        <input
                          type="text"
                          id="inputDate2"
                          placeholder="結束時間"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="row justify-content-center mb-5 mb-sm-8 mb-md-10 text-start">
              <fieldset className="payment-fieldset col-12 col-md-10">
                <legend className="payment-lengend">提案人資訊</legend>
                <div className="mb-3 mb-md-5">
                  <label
                    htmlFor="personResponsible"
                    className="form-label required"
                  >
                    提案負責人
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.personResponsible ? "is-invalid": ""}`}
                    id="personResponsible"
                    {...register("personResponsible",{
                      required: {
                        value: true,
                        message: "*必填欄位"
                      }
                    })}
                  />
                  { errors.personResponsible && (<div className="invalid-feedback">{errors?.personResponsible?.message}</div>) }
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="groupName" className="form-label required">
                    提案單位
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.groupName ? "is-invalid": ""}`}
                    id="groupName"
                    {...register("groupName",{
                      required: {
                        value: true,
                        message: "*必填欄位"
                      }
                    })}
                  />
                  { errors.groupName && (<div className="invalid-feedback">{errors?.groupName?.message}</div>) }
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="teamIntro" className="form-label required">
                    提案人/團隊介紹
                  </label>
                  <textarea
                    className={`form-control ${errors.teamIntro ? "is-invalid": ""}`}
                    name="teamIntro"
                    id="teamIntro"
                    rows={3}
                    {...register("teamIntro",{
                      required: {
                        value: true,
                        message: "*必填欄位，限制300字"
                      },
                      maxLength: {
                        value: 300,
                        message: "*超出字數上限，限制300字"
                      }
                    })}
                  />
                  {/* <p className="fs-sm mb-0 mt-1">限制300字</p> */}
                  { errors.teamIntro ? (<div className="invalid-feedback">{errors?.teamIntro?.message}</div>) : (<p className="fs-sm mb-0 mt-1">限制300字</p>) }
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="email" className="form-label required">
                    聯絡信箱
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid": ""}`}
                    id="email"
                    {...register("email",{
                      required: {
                        value: true,
                        message: "*必填欄位"
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "*Email 格式錯誤"
                      }
                    })}
                  />
                  { errors.email && <div className="invalid-feedback">{errors?.email?.message}</div> }
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="tel" className="form-label required">
                    連絡電話
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${errors.phone ? "is-invalid": ""}`}
                    id="tel"
                    {...register("phone",{
                      required: {
                        value: true,
                        message: "*必填欄位"
                      },
                      pattern: {
                        value: /^(0[2-8]\d{7}|09\d{8})$/,
                        message: "電話格式錯誤，請輸入有效的台灣電話號碼"
                      }
                    })}
                  />
                  { errors.phone && (<div className="invalid-feedback">{errors?.phone?.message}</div>) }
                </div>
              </fieldset>
            </div>
          </div>
        </form>

        <button
          type="button"
          className="btn btn-primary fw-bolder py-3 px-5 w-100 w-md-auto"
          onClick={handleSubmit(onSubmit)}
        >
          送出
        </button>
      </div>
    </>
  );
}
