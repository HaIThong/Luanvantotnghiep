import React, { useState } from "react";
import "./Blog.css";
import BlogDetail from "./BlogDetail"; // Import BlogDetail component

export default function Blog() {
  const blogPosts = [
    // Dữ liệu mẫu (giữ nguyên)
    {
      id: 1,
      title: "Cách Viết CV Chuyên Nghiệp",
      description: "Hướng dẫn cách viết CV ấn tượng để thu hút nhà tuyển dụng.",
      image_url: "/image/cvtips.png",
      icon: "📄",
      content: `
        <h3>Tại sao CV quan trọng?</h3>
        <p>CV là tài liệu đầu tiên mà nhà tuyển dụng xem xét, vì vậy bạn cần đảm bảo rằng nó rõ ràng, ngắn gọn và chuyên nghiệp. Một CV ấn tượng sẽ giúp bạn nổi bật và tăng cơ hội phỏng vấn.</p>
        
        <h3>Các phần cần có trong CV</h3>
        <ol>
          <li><b>Thông tin cá nhân:</b> Bao gồm họ tên, số điện thoại, email, và địa chỉ. Đảm bảo email và số điện thoại chính xác, dễ liên lạc.</li>
          <li><b>Mục tiêu nghề nghiệp:</b> Viết ngắn gọn, tập trung vào giá trị bạn muốn mang lại cho công ty và mục tiêu dài hạn của bạn.</li>
          <li><b>Kinh nghiệm làm việc:</b> 
            <ul>
              <li>Liệt kê công việc gần đây nhất trước.</li>
              <li>Nêu rõ vị trí, tên công ty, thời gian làm việc và trách nhiệm chính.</li>
              <li>Sử dụng các động từ mạnh và số liệu cụ thể (nếu có). Ví dụ: "Tăng doanh số 20% trong 6 tháng."</li>
            </ul>
          </li>
          <li><b>Học vấn:</b> Đề cập đến bằng cấp cao nhất, trường học và thời gian học. Nếu có thành tích nổi bật, hãy liệt kê.</li>
          <li><b>Kỹ năng:</b> Chọn lọc các kỹ năng phù hợp với công việc ứng tuyển. Ví dụ: "Kỹ năng giao tiếp, sử dụng thành thạo MS Office, quản lý dự án."</li>
          <li><b>Chứng chỉ (nếu có):</b> Các chứng chỉ liên quan như ngoại ngữ, chuyên ngành, hoặc khóa học online.</li>
          <li><b>Sở thích (tùy chọn):</b> Liệt kê các sở thích phù hợp với văn hóa công ty hoặc công việc.</li>
        </ol>
        
        <h3>Mẹo để CV nổi bật</h3>
        <ul>
          <li>Sử dụng định dạng đơn giản, dễ đọc (Arial hoặc Times New Roman, cỡ chữ 12pt, khoảng cách dòng 1.15).</li>
          <li>Đảm bảo CV không dài quá 2 trang.</li>
          <li>Tùy chỉnh CV phù hợp với từng công việc cụ thể (cá nhân hóa).</li>
          <li>Tránh lỗi chính tả và ngữ pháp.</li>
          <li>Sử dụng từ khóa liên quan đến ngành nghề trong mô tả công việc.</li>
        </ul>
        
        <h3>Những lỗi cần tránh</h3>
        <ul>
          <li>Thông tin sai lệch hoặc phóng đại.</li>
          <li>Đưa quá nhiều thông tin không liên quan.</li>
          <li>Thiếu thông tin liên hệ.</li>
          <li>Sử dụng ngôn ngữ không chuyên nghiệp.</li>
        </ul>
        
        <h3>Tài liệu bổ sung</h3>
        <p>Nếu có, hãy đính kèm thêm một thư xin việc (cover letter) để làm rõ lý do bạn phù hợp với vị trí này và thể hiện sự quan tâm đến công ty.</p>
      `,
    },
    {
      id: 2,
      title: "Kỹ Năng Phỏng Vấn Thành Công",
      description: "Những mẹo để tự tin và nổi bật trong buổi phỏng vấn.",
      image_url: "/image/Interview.png",
      icon: "🎤",
      content: `
        <h3>Chuẩn bị trước buổi phỏng vấn</h3>
        <ul>
          <li><b>Nghiên cứu công ty:</b> Tìm hiểu về lịch sử, sứ mệnh, sản phẩm hoặc dịch vụ, và văn hóa làm việc của công ty.</li>
          <li><b>Hiểu rõ vị trí ứng tuyển:</b> Xem lại mô tả công việc và xác định các kỹ năng cần thiết.</li>
          <li><b>Chuẩn bị câu hỏi:</b> Luyện tập trả lời các câu hỏi phổ biến như "Hãy giới thiệu về bản thân bạn" hoặc "Tại sao bạn phù hợp với vị trí này?"</li>
          <li><b>Thực hành:</b> Luyện tập phỏng vấn với bạn bè hoặc qua video để cải thiện kỹ năng giao tiếp.</li>
        </ul>
    
        <h3>Trong buổi phỏng vấn</h3>
        <ul>
          <li><b>Thể hiện tự tin:</b> Duy trì giao tiếp bằng mắt, sử dụng ngôn ngữ cơ thể tích cực, và nói rõ ràng.</li>
          <li><b>Đặt câu hỏi:</b> Hỏi nhà tuyển dụng về công ty, đội ngũ làm việc, hoặc kỳ vọng công việc. Điều này thể hiện sự quan tâm của bạn.</li>
          <li><b>Tránh nói tiêu cực:</b> Không nên nói xấu công ty cũ hoặc đồng nghiệp trước đây.</li>
        </ul>
    
        <h3>Sau buổi phỏng vấn</h3>
        <p>Gửi email cảm ơn đến nhà tuyển dụng để bày tỏ sự trân trọng và nhấn mạnh lại lý do bạn phù hợp với vị trí.</p>
      `,
    },
    {
      id: 3,
      title: "5 Nguyên Tắc Khi Tìm Việc",
      description: "Những điều bạn cần nhớ để tìm việc hiệu quả.",
      image_url: "/image/findjob.png",
      icon: "🔍",
      content: `
        <h3>1. Đặt mục tiêu nghề nghiệp rõ ràng</h3>
        <p>Xác định ngành nghề, vị trí và mục tiêu dài hạn bạn muốn đạt được. Điều này sẽ giúp bạn tập trung vào các cơ hội phù hợp.</p>
    
        <h3>2. Tối ưu hóa hồ sơ LinkedIn</h3>
        <p>Liên tục cập nhật thông tin trên hồ sơ LinkedIn, thêm các dự án bạn đã thực hiện và kết nối với những người trong ngành.</p>
    
        <h3>3. Sử dụng mạng lưới quan hệ</h3>
        <p>Hỏi thăm bạn bè, gia đình, hoặc đồng nghiệp cũ để tìm kiếm cơ hội mới. Quan hệ cá nhân là một trong những cách hiệu quả nhất để tìm việc.</p>
    
        <h3>4. Tập trung vào chất lượng thay vì số lượng</h3>
        <p>Thay vì gửi CV hàng loạt, hãy tùy chỉnh CV và thư xin việc cho từng vị trí ứng tuyển. Nhà tuyển dụng sẽ đánh giá cao sự cá nhân hóa này.</p>
    
        <h3>5. Luôn sẵn sàng học hỏi</h3>
        <p>Tham gia các khóa học trực tuyến hoặc hội thảo để nâng cao kỹ năng. Điều này không chỉ giúp bạn cải thiện bản thân mà còn tạo ấn tượng với nhà tuyển dụng.</p>
      `,
    },
    {
      id: 4,
      title: "Cách Đàm Phán Lương Hiệu Quả",
      description: "Mẹo giúp bạn đàm phán lương thành công trong buổi phỏng vấn.",
      image_url: "/image/salary.png",
      icon: "💰",
      content: `
        <h3>Bước 1: Nghiên cứu mức lương thị trường</h3>
        <p>Tìm hiểu mức lương trung bình cho vị trí bạn ứng tuyển bằng cách sử dụng các nền tảng như Glassdoor, Payscale, hoặc khảo sát trong ngành.</p>
    
        <h3>Bước 2: Đánh giá giá trị của bản thân</h3>
        <ul>
          <li>Xem xét kỹ năng, kinh nghiệm và thành tựu của bạn có gì đặc biệt để làm cơ sở đàm phán.</li>
          <li>Chuẩn bị các ví dụ cụ thể để chứng minh giá trị bạn mang lại.</li>
        </ul>
    
        <h3>Bước 3: Kỹ năng đàm phán</h3>
        <ul>
          <li><b>Không nói số trước:</b> Để nhà tuyển dụng đưa ra mức lương trước để bạn có thể đàm phán.</li>
          <li><b>Tập trung vào giá trị:</b> Nhấn mạnh vào đóng góp của bạn thay vì chỉ tập trung vào con số.</li>
          <li><b>Đề xuất phạm vi:</b> Đưa ra một khoảng lương (ví dụ: 20 - 25 triệu/tháng) thay vì một con số cụ thể.</li>
        </ul>
    
        <h3>Bước 4: Xử lý phản đối</h3>
        <p>Nếu nhà tuyển dụng không thể đáp ứng mức lương mong muốn, hãy thảo luận về các phúc lợi khác như ngày nghỉ, bảo hiểm, hoặc cơ hội thăng tiến.</p>
      `,
    },
    {
      id: 5,
      title: "Làm Thế Nào Để Tìm Việc Nhanh?",
      description: "Các bước cần làm để tìm việc hiệu quả và nhanh chóng.",
      image_url: "/image/findjobfast.png",
      icon: "🚀",
      content: `
        <h3>Bước 1: Cập nhật CV và portfolio</h3>
        <p>Đảm bảo CV của bạn phản ánh chính xác kỹ năng và kinh nghiệm mới nhất. Portfolio (nếu có) nên trình bày rõ ràng các dự án của bạn.</p>
    
        <h3>Bước 2: Sử dụng nền tảng tìm việc</h3>
        <ul>
          <li>Đăng ký tài khoản trên các trang việc làm uy tín như VietnamWorks, TopCV, hoặc LinkedIn.</li>
          <li>Đăng ký nhận thông báo việc làm theo từ khóa phù hợp.</li>
        </ul>
    
        <h3>Bước 3: Liên hệ trực tiếp</h3>
        <p>Gửi email đến các công ty bạn quan tâm, ngay cả khi họ không đăng tin tuyển dụng. Điều này thể hiện sự chủ động của bạn.</p>
      `,
    },
    {
      id: 6,
      title: "Hướng Dẫn Làm Việc Từ Xa",
      description: "Những kỹ năng cần có để làm việc từ xa hiệu quả.",
      image_url: "/image/workfar.png",
      icon: "🏠",
      content: `
        <h3>1. Quản lý thời gian</h3>
        <p>Lập lịch làm việc rõ ràng và ưu tiên các nhiệm vụ quan trọng. Sử dụng công cụ như Google Calendar hoặc Trello để theo dõi công việc.</p>
    
        <h3>2. Giao tiếp hiệu quả</h3>
        <p>Đảm bảo bạn sử dụng các công cụ giao tiếp như Slack, Microsoft Teams, hoặc Zoom một cách hiệu quả để giữ liên lạc với đồng nghiệp.</p>
    
        <h3>3. Tạo không gian làm việc riêng</h3>
        <p>Dành một góc làm việc yên tĩnh, không bị phân tâm để tập trung tối đa.</p>
    
        <h3>4. Đảm bảo kết nối</h3>
        <p>Kiểm tra đường truyền internet, thiết lập các phần mềm hỗ trợ làm việc từ xa và luôn có kế hoạch dự phòng nếu xảy ra sự cố.</p>
      `,
    },
    
    
    // Các bài viết khác...
  ];

  const [selectedPostId, setSelectedPostId] = useState(null); // Quản lý bài viết được chọn
  const [searchKeyword, setSearchKeyword] = useState(""); // Quản lý từ khóa tìm kiếm

  // Lọc bài viết dựa trên từ khóa tìm kiếm
  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      post.description.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const selectedPost = blogPosts.find((post) => post.id === selectedPostId);

  return (
    <div className="blog container py-5">
      {selectedPost ? (
        <BlogDetail
          post={selectedPost}
          onBack={() => setSelectedPostId(null)} // Truyền callback để quay lại
        />
      ) : (
        <div className="blog-list">
          <h2 className="text-center mb-4">Hướng Dẫn Tìm Việc & Phỏng Vấn</h2>

          {/* Thanh tìm kiếm */}
          <div className="search-bar mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm bài viết..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>

          {/* Danh sách bài viết */}
          <div className="row">
            {filteredPosts.map((post) => (
              <div key={post.id} className="col-md-4 mb-4">
                <div className="blog-card shadow-sm">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="blog-image"
                  />
                  <div className="blog-content p-3">
                    <h4 className="blog-title">{post.title}</h4>
                    <p className="blog-description">{post.description}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => setSelectedPostId(post.id)}
                    >
                      Đọc Thêm
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredPosts.length === 0 && (
              <p className="text-center">Không tìm thấy bài viết nào.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
