import React, { useEffect, useState } from 'react';
import "./Dashboard.css";

export default function Dashboard() {
  const [courses, setCourses] = useState([]); // Lưu danh sách khóa học
  const [filteredCourses, setFilteredCourses] = useState([]); // Lưu danh sách khóa học đã lọc
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    // Sử dụng JSON mẫu
    const fetchCourses = async () => {
      try {
        const data = {
          results: [
            {
              title: "Học JavaScript Cơ Bản",
              description: "Khóa học này giúp bạn làm quen với JavaScript.",
              image_url: "/image/javascript.png",
              link: "https://fullstack.edu.vn/courses/javascript-co-ban",
            },
            {
              title: "Học Python cho Người Mới Bắt Đầu",
              description: "Khóa học này dạy Python từ cơ bản đến nâng cao.",
              image_url: "/image/python.png",
              link: "https://codelearn.io/learning/python-co-ban?tab=syllabus",
            },
            {
              title: "Lập Trình Web với ReactJS",
              description: "Tìm hiểu cách xây dựng ứng dụng web hiện đại với ReactJS.",
              image_url: "/image/reactjs.png",
              link: "https://react.dev/",
            },
            {
              title: "Phát Triển API với Node.js",
              description: "Học cách xây dựng API mạnh mẽ với Node.js và Express.",
              image_url: "/image/nodejs.png",
              link: "https://nodejs.org/fr",
            },
            {
              title: "Machine Learning",
              description: "Khám phá các khái niệm Machine Learning.",
              image_url: "/image/machi.png",
              link: "https://www.cit.ctu.edu.vn/%7Edtnghi/ml/index.html",
            },
            {
              title: "Phát Triển Ứng Dụng Di Động với Flutter",
              description: "Xây dựng ứng dụng di động đẹp mắt với Flutter.",
              image_url: "/image/flutter.png",
              link: "https://flutter.dev/",
            },
            {
                title: "Phát hiện tấn công mạng",
                description: "nghiên cứu tấn công mạng và phát hiện tấn công mạng.",
                image_url: "/image/phtcm.png",
                link: "https://www.cit.ctu.edu.vn/%7Edtnghi/nid/index.html",
              },
              {
                title: "Tối Ưu Hóa SEO Cho Website",
                description: "Tìm hiểu cách tối ưu hóa website để tăng thứ hạng tìm kiếm.",
                image_url: "/image/seo.jpg",
                link: "https://aznet.vn/toi-uu-hoa-seo-cho-website.html",
              },
              {
                title: "Học C++ Cơ Bản Đến Nâng Cao",
                description: "Khóa học này sẽ hướng dẫn bạn làm chủ ngôn ngữ C++.",
                image_url: "/image/c++.png",
                link: "https://fullstack.edu.vn/courses/lap-trinh-c-co-ban-toi-nang-cao",
              },
              {
                title: "Thiết Kế UI/UX Chuyên Nghiệp",
                description: "Khám phá cách thiết kế giao diện người dùng ấn tượng.",
                image_url: "/image/figma.png",
                link: "https://www.figma.com/",
              },
          ],
        };

        if (Array.isArray(data.results)) {
          setCourses(data.results);
          setFilteredCourses(data.results); // Ban đầu danh sách đã lọc giống danh sách đầy đủ
        } else {
          setCourses([]);
          setFilteredCourses([]);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Đã xảy ra lỗi khi tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Lọc danh sách khóa học theo từ khóa tìm kiếm
  useEffect(() => {
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  if (loading) {
    return <div className="text-center">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
    <div className="container py-5">
      {/* Thanh tìm kiếm */}
      <div className="search-bar mb-4">
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm khóa học..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCourses.length === 0 ? (
        <p className="text-center">Không tìm thấy khóa học nào.</p>
      ) : (
        <div className="courses-grid">
          {filteredCourses.map((course, index) => (
            <div key={index} className="course-card shadow-sm">
              <img
                src={course.image_url}
                alt={course.title}
                className="course-image"
              />
              <div className="course-content">
                <h4 className="course-title">{course.title}</h4>
                <p className="course-description">{course.description}</p>
                <a
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-3"
                >
                  Tham Gia Ngay
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
