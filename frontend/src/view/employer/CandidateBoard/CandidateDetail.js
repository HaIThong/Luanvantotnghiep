import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CandidateDetail.css";

export default function CandidateDetail() {
  const { id } = useParams(); // Lấy ID ứng viên từ URL
  const [candidate, setCandidate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy danh sách ứng viên từ localStorage
    const storedCandidates =
      JSON.parse(localStorage.getItem("postedCandidates")) || [];
    const sampleCandidates = [
      {
        firstname: "Nguyễn",
        lastname: "Văn A",
        gender: 0,
        dob: "1995-05-12",
        email: "vana@example.com",
        phone: "0123456789",
        address: "Hà Nội",
        objective: "Tìm kiếm công việc lập trình viên Frontend.",
        avatar: "https://via.placeholder.com/150",
      },
      // Các ứng viên mẫu khác...
    ];

    const combinedCandidates = [...storedCandidates, ...sampleCandidates];
    const foundCandidate = combinedCandidates[parseInt(id)]; // Tìm ứng viên theo ID
    setCandidate(foundCandidate);
  }, [id]);

  if (!candidate) {
    return <div>Đang tải thông tin...</div>;
  }

  return (
    <div className="candidate-detail">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        Quay lại
      </button>
      <div className="detail-container">
        <img
          src={candidate.avatar || "https://via.placeholder.com/150"}
          alt={`${candidate.firstname} ${candidate.lastname}`}
          className="candidate-avatar"
        />
        <div className="candidate-info">
          <h4>{candidate.lastname + " " + candidate.firstname}</h4>
          <p>
            <strong>Giới tính:</strong> {candidate.gender === 0 ? "Nam" : "Nữ"}
          </p>
          <p>
            <strong>Ngày sinh:</strong> {candidate.dob}
          </p>
          <p>
            <strong>Email:</strong> {candidate.email}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {candidate.phone}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {candidate.address}
          </p>
          <p>
            <strong>Mục tiêu:</strong> {candidate.objective}
          </p>
        </div>
      </div>
    </div>
  );
}
