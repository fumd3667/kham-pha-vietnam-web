# Vietnam Discovery - Khám Phá Việt Nam 🇻🇳

Một trang web giới thiệu du lịch Việt Nam cao cấp, hiện đại với giao diện trực quan, hiệu ứng chuyển động mượt mà, tích hợp **Trợ lý ảo chatbot** và **Giỏ hàng đặt tour kèm thanh toán VietQR động**.

Dự án được xây dựng hoàn toàn bằng **HTML, CSS và JavaScript thuần (Vanilla)**, tối ưu hiệu năng và khả năng responsive trên mọi thiết bị.

---

## 🌟 Tính năng nổi bật

- **🎨 Thiết kế cao cấp & Giao diện kính mờ (Glassmorphism)**: Sử dụng các biến CSS tùy chỉnh, dải màu gradient đỏ-vàng hiện đại lấy cảm hứng từ quốc kỳ Việt Nam, kết hợp thanh điều hướng làm mờ hậu cảnh sang trọng.
- **✨ Hiệu ứng hoạt họa cuộn trang (Scroll Reveal)**: Tích hợp `IntersectionObserver` tự động kích hoạt hiệu ứng trượt và mờ ảo (`fade-in` & `slide-up`) khi người dùng cuộn tới từng phân đoạn.
- **📱 Responsive hoàn hảo**: Bố cục linh hoạt sử dụng Flexbox và Grid, hiển thị tối ưu từ màn hình máy tính lớn (Desktop) đến điện thoại thông minh nhỏ gọn (Mobile).
- **🧭 Scrollspy Menu**: Tự động nhận diện phân đoạn đang xem để cập nhật trạng thái hoạt động (active) trên thanh menu điều hướng khi cuộn.
- **💬 Trợ lý ảo chatbot du lịch**: Khung chat ảo phản hồi nhanh nhạy, có hiệu ứng ba dấu chấm đang soạn tin nhắn (`typing indicator`) và cung cấp thông tin du lịch hữu ích theo từ khóa.
- **🛒 Giỏ hàng đặt Tour (Booking Cart)**: Lưu thông tin đặt chỗ trực tiếp vào `localStorage` của trình duyệt. Người dùng có thể điều chỉnh số lượng người tham gia hoặc xóa tour linh hoạt.
- **💸 Hóa đơn & Quét mã VietQR động**: Giả lập cổng thanh toán hiện đại. Khi bấm thanh toán, hệ thống sử dụng API để tự động tạo mã QR ngân hàng Vietinbank hiển thị đúng số tiền cần trả và nội dung chuyển khoản chi tiết.

---

## 🛠️ Công nghệ sử dụng

- **Core**: HTML5, JavaScript (Vanilla ES6)
- **Styling**: CSS3 (Vanilla), Phông chữ **Montserrat** & **Inter** từ Google Fonts
- **Icons**: FontAwesome 6

---

## 🚀 Hướng dẫn khởi chạy cục bộ

Dự án không sử dụng bất kỳ thư viện hoặc công cụ đóng gói phức tạp nào, bạn có thể chạy dự án rất dễ dàng:

1. Tải toàn bộ thư mục về máy tính.
2. Mở trực tiếp tệp `index.html` trên bất kỳ trình duyệt nào (Chrome, Edge, Firefox, Safari).
3. **Khuyên dùng**: Để có trải nghiệm tốt nhất về hiệu ứng và liên kết, hãy mở thư mục bằng VS Code và sử dụng extension **Live Server** để chạy môi trường máy chủ cục bộ.

---

## 📂 Cấu trúc thư mục

```text
WEB/
├── index.html     # Cấu trúc nội dung chính của trang web
├── style.css      # Định dạng thiết kế, responsive và hiệu ứng hoạt họa
├── script.js     # Xử lý các sự kiện tương tác, chatbot và giỏ hàng
└── README.md      # Tài liệu hướng dẫn sử dụng dự án (Tệp tin này)
```
