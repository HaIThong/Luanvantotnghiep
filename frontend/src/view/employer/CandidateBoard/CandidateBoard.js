import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./CandidateBoard.css";

export default function CandidateBoard() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]); // Danh sách ứng viên sau khi lọc
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
  const [showModal, setShowModal] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState(null);
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyLink, setCompanyLink] = useState("");
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const storedCandidates =
      JSON.parse(localStorage.getItem("postedCandidates")) || [];

    const sampleCandidates = [
      {
        firstname: "Văn Si",
        lastname: "Nguyễn",
        gender: 0,
        dob: "1995-05-12",
        email: "vana@example.com",
        phone: "0123456789",
        address: "Cần Thơ",
        objective: "Tìm kiếm công việc lập trình viên Frontend.",
        avatar: "/image/LevanSi.jpg",
      },
      {
        firstname: "Thanh Tùng",
        lastname: "Nguyễn",
        gender: 0,
        dob: "1994-07-22",
        email: "thib@example.com",
        phone: "0987654321",
        address: "TP Hồ Chí Minh",
        objective: "Ca sĩ.",
        avatar: "/image/Sontung.jpg",
      },
      {
        firstname: "Ngọc Bích",
        lastname: "Lê",
        gender: 1,
        dob: "1993-03-15",
        email: "ngocbich@example.com",
        phone: "0912233445",
        address: "Hà Nội",
        objective: "Nhân viên kế toán.",
        avatar: "/image/avt.png",
      },
      {
        firstname: "Hoàng",
        lastname: "Trần",
        gender: 0,
        dob: "1990-11-20",
        email: "hoangtran@example.com",
        phone: "0976655443",
        address: "Đà Nẵng",
        objective: "Quản lý dự án IT.",
        avatar: "/image/avt.png",
      },
      {
        firstname: "Mai Hương",
        lastname: "Nguyễn",
        gender: 1,
        dob: "1992-09-12",
        email: "maihuong@example.com",
        phone: "0988877665",
        address: "Hải Phòng",
        objective: "Chuyên viên marketing.",
        avatar: "/image/avt.png",
      },
      {
        firstname: "Minh Anh",
        lastname: "Phạm",
        gender: 0,
        dob: "1989-06-10",
        email: "minhanh@example.com",
        phone: "0933225566",
        address: "Huế",
        objective: "Kỹ sư phần mềm.",
        avatar: "/image/avt.png",
      },
      {
        firstname: "Thùy Linh",
        lastname: "Đặng",
        gender: 1,
        dob: "1996-01-25",
        email: "thuylinh@example.com",
        phone: "0901122334",
        address: "Cần Thơ",
        objective: "Chuyên viên tuyển dụng.",
        avatar: "/image/avt.png",
      },
      {
        firstname: "Anh Dũng",
        lastname: "Vũ",
        gender: 0,
        dob: "1997-07-07",
        email: "anhdung@example.com",
        phone: "0945678901",
        address: "Quảng Nam",
        objective: "Thiết kế đồ họa.",
        avatar: "/image/avt.png",
      },
      {
        firstname: "Hồng Nhung",
        lastname: "Phạm",
        gender: 1,
        dob: "1995-12-01",
        email: "hongnhung@example.com",
        phone: "0977554433",
        address: "Vĩnh Long",
        objective: "Chuyên viên nghiên cứu thị trường.",
        avatar: "/image/avt.png",
      },
      {
        firstname: "Văn Lộc",
        lastname: "Ngô",
        gender: 0,
        dob: "1991-04-16",
        email: "vanloc@example.com",
        phone: "0967788990",
        address: "Phú Quốc",
        objective: "Nhân viên IT support.",
        avatar: "/image/avt.png",
      },
      {
        firstname: "Khánh Linh",
        lastname: "Trần",
        gender: 1,
        dob: "1994-08-19",
        email: "khanhlinh@example.com",
        phone: "0922334455",
        address: "Hà Nội",
        objective: "Chuyên viên phân tích dữ liệu.",
        avatar: "/image/avt.png",
      },
      // Thêm các ứng viên khác...
    ];

    const combinedCandidates = [...storedCandidates, ...sampleCandidates];
    setCandidates(combinedCandidates);
    setFilteredCandidates(combinedCandidates); // Khởi tạo danh sách hiển thị
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const results = candidates.filter(
      (candidate) =>
        candidate.firstname.toLowerCase().includes(term) ||
        candidate.lastname.toLowerCase().includes(term) ||
        candidate.address.toLowerCase().includes(term) ||
        candidate.objective.toLowerCase().includes(term)
    );
    setFilteredCandidates(results);
  };

  const handleShowModal = (candidate) => {
    setCurrentCandidate(candidate);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentCandidate(null);
    setCompanyLogo("");
    setCompanyLink("");
    setCompanyName("");
  };

  const handleSendMessage = () => {
    if (!currentCandidate || !companyName.trim()) {
      alert("Vui lòng nhập tên công ty trước khi gửi!");
      return;
    }

    const newMessage = {
      sender: companyName,
      content: document.getElementById("contactMessage").value,
      timestamp: new Date().toISOString(),
      companyLogo,
      companyLink,
    };

    const messages = JSON.parse(localStorage.getItem("candidateMessages")) || [];
    const candidateIndex = candidates.indexOf(currentCandidate);
    const candidateMessages = messages.find(
      (item) => item.candidateId === candidateIndex
    );

    if (candidateMessages) {
      candidateMessages.messages.push(newMessage);
    } else {
      messages.push({
        candidateId: candidateIndex,
        messages: [newMessage],
      });
    }

    localStorage.setItem("candidateMessages", JSON.stringify(messages));
    alert("Đã gửi liên hệ thành công!");
    handleCloseModal();
  };

  return (
    <div className="candidate-board bg-white">
      <h2 className="candidate-title"></h2>

      {/* Thanh tìm kiếm */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm ứng viên..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="candidate-grid">
        {filteredCandidates.map((candidate, index) => (
          <div
            className="candidate-card"
            key={index}
            onClick={() => handleShowModal(candidate)}
            style={{ cursor: "pointer" }}
          >
            <div className="candidate-avatar">
              <img
                src={candidate.avatar || "https://via.placeholder.com/150"}
                alt={`${candidate.firstname} ${candidate.lastname}`}
              />
            </div>
            <div className="candidate-info">
              <h4>{candidate.lastname + " " + candidate.firstname}</h4>
              <p>
                <strong>Giới tính:</strong>{" "}
                {candidate.gender === 0 ? "Nam" : "Nữ"}
              </p>
              <p>
                <strong>Ngày sinh :</strong> {candidate.dob}
              </p>
              <p>
                <strong>Địa chỉ :</strong> {candidate.address}
              </p>
              <p>
                <strong>Email:</strong> {candidate.email}
              </p>
              <p>
                <strong>Vị trí muốn ứng tuyển:</strong> {candidate.objective}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Liên hệ ứng viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentCandidate && (
            <>
              <p>
                <strong>Họ và tên:</strong>{" "}
                {currentCandidate.lastname + " " + currentCandidate.firstname}
              </p>
              <p>
                <strong>Email:</strong> {currentCandidate.email}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {currentCandidate.phone}
              </p>
              <Form>
                <Form.Group className="mb-3" controlId="companyNameInput">
                  <Form.Label>Tên công ty</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên công ty"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="contactMessage">
                  <Form.Label>Nội dung liên hệ</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Nhập nội dung liên hệ với ứng viên"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="companyLogoUpload">
                  <Form.Label>Tải lên logo công ty</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setCompanyLogo(event.target.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="companyLinkInput">
                  <Form.Label>Link đến trang công ty</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Nhập URL công ty"
                    value={companyLink}
                    onChange={(e) => setCompanyLink(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSendMessage}>
            Gửi liên hệ
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
