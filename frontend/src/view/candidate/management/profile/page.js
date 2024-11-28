import { useContext, useEffect, useState } from "react";
import { CandidateContext } from "../layouts/CandidateLayout";
import { useNavigate } from "react-router-dom";
import jobApi from "../../../../api/job";
import PersonalInfor from "./components/personalInformation";
import Education from "./components/educations/Education";
import Experience from "./components/experiences/Experience";
import Project from "./components/projects/Project";
import Skill from "./components/skills/Skill";
import Certificate from "./components/certificates/Certificate";
import Prize from "./components/prizes";
import Activity from "./components/activities/Activity";
import dayjs from "dayjs";
import './page.css';

export default function Profile() {
  const [jobSuggestions, setJobSuggestions] = useState([]);
  const { personal } = useContext(CandidateContext); // Lấy thông tin ứng viên
  const nav = useNavigate();

  const getSuggestedJobs = async () => {
    try {
      const keyword = personal?.objective || ""; // Sử dụng mục tiêu nghề nghiệp
      const res = await jobApi.getList({
        keyword, // Từ khóa từ mục tiêu nghề nghiệp
      });
      setJobSuggestions(res.data);
    } catch (error) {
      console.error("Error fetching job suggestions:", error);
    }
  };

  useEffect(() => {
    if (personal) {
      getSuggestedJobs(); // Gọi API khi có thông tin cá nhân
    }
  }, [personal]); // Lắng nghe sự thay đổi của thông tin cá nhân

  return (
    <div className="container-profile">
      <div style={{ width: "70%", margin: "auto" }}>
        <PersonalInfor />
        <Education />
        <Experience />
        <Project />
        <Skill />
        <Certificate />
        <Prize />
        <Activity />
      </div>

      <div className="job-suggestions">
        <h2 className="suggestions-title">Công việc gợi ý cho bạn</h2>
        <div className="job-list">
          {jobSuggestions.length > 0 ? (
            jobSuggestions.map((job) => (
              <div
                className="job-card pointer1"
                key={`job_${job.id}`}
                onClick={() => nav(`/jobs/${job.id}`)}
              >
                <div className="job-card-header">
                  <img
                    src={job.employer?.logo || "default-logo.png"}
                    alt={`${job.employer?.name} logo`}
                    className="job-card-logo"
                  />
                  <div>
                    <h4 className="job-card-title">{job.jname}</h4>
                    <p className="job-card-company">{job.employer?.name}</p>
                  </div>
                </div>
                <div className="job-card-details">
                  <span>{job.min_salary || "Thoả thuận"} triệu VND</span>
                  <span>{job.locations[0]?.name}</span>
                  <span>
                    Còn{" "}
                    {dayjs().diff(job.expire_at, "day") <= 30
                      ? dayjs(job.expire_at).diff(new Date(), "day")
                      : "30+"}{" "}
                    ngày
                  </span>
                </div>
                <button className="job-card-button">Xem chi tiết</button>
              </div>
            ))
          ) : (
            <p className="no-jobs-message">Không có công việc gợi ý hiện tại.</p>
          )}
        </div>
      </div>
    </div>
  );
}
