import React, { useEffect, useState } from 'react';
import Certificate from './components/certificates';
import Education from './components/educations';
import Experience from './components/experiences';
import Prize from './components/prizes';
import Project from './components/projects';
import Skill from './components/skills';
import Activity from './components/activities';
import PersonalInfor from './components/personalInformation';

export default function Profile() {
  const [jobSuggestions, setJobSuggestions] = useState([]);
  
  useEffect(() => {
    // Lấy dữ liệu hồ sơ người dùng và gửi tới API gợi ý công việc
    fetch('/api/job-suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalInfo: 'Thông tin cá nhân',
        education: 'Thông tin học vấn',
        skills: 'Kỹ năng',
        experience: 'Kinh nghiệm làm việc',
        // ... thêm các trường khác nếu cần
      }),
    })
      .then(response => response.json())
      .then(data => setJobSuggestions(data.jobs))
      .catch(error => console.error('Error fetching job suggestions:', error));
  }, []);

  return (
    <div className="px-5 pt-4 pb-5">
      <div style={{ width: '70%' }}>
        <PersonalInfor />
        <Education />
        <Experience />
        <Project />
        <Skill />
        <Certificate />
        <Prize />
        <Activity />
      </div>
      
      <div className="mt-5">
        <h2>Công việc gợi ý cho bạn</h2>
        {jobSuggestions.length > 0 ? (
          <ul>
            {jobSuggestions.map((job, index) => (
              <li key={index}>
                <h4>{job.title}</h4>
                <p>{job.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Không có công việc gợi ý hiện tại.</p>
        )}
      </div>
    </div>
  );
}
