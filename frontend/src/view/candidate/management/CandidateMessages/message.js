import CandidateMessages from "./CandidateMessages";

export default function Messages() {
  const candidateId = 0 // Lấy ID ứng viên hiện tại (cố định hoặc từ context)

  return (
    <div>
      {/* Các thông tin ứng viên */}
      <CandidateMessages candidateId={candidateId} />
    </div>
  );
}
