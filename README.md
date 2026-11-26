# Nhật Nguyệt Tử Vi

Landing page lập lá số Tử Vi và luận sơ lược, làm theo góp ý của nhóm (Zalo "[TV00x] Học bài thôiii", 23/11/2026):

- Chỉ hiện 3 mục: **Tổng quan**, **Thiên bàn**, **Bản thân** (Quan Lộc, Tài Bạch, Tật Ách). Bản online luận sơ lược; luận đủ 9 mục là phần đặt lịch.
- Chỗ tên ghi "Chủ mệnh – [Tên]".
- Nền sáng, watermark, nét vẽ trang trí; bảng màu Color Hunt `#FFEFD2 #6AB0AF #F5A89A #FFF2A5`.
- Landing page đặt lịch với chuyên gia.

Góp ý lần 2 của cô giáo Myn (26/11/2026):

- Câu giới thiệu: "xem tác động của môi trường xã hội đến tính cách, công việc, tài chính, sức khỏe"; bỏ dòng "an sao theo hệ Thái Thứ Lang".
- Nhập ngày sinh theo dương lịch hoặc âm lịch (có ô tháng nhuận), hiện ngay ngày quy đổi; ngày âm không tồn tại thì báo lỗi.
- Chính tinh chữ to, viết hoa; phụ tinh chữ nhỏ. Độ sáng ghi trong ngoặc: `(M)`, `(V)`, `(Đ)`, `(B)`, `(H)`.
- Màu sao theo ngũ hành: Kim xám, Mộc xanh lá, Thủy đen, Hỏa đỏ, Thổ vàng đất (bảng `HANH_THEM` trong `app.js` + `STAR_EL` của `lib/ansao.js`).
- Sao tốt cột trái, sao xấu cột phải, giữ cả trên điện thoại.
- Thiên bàn thêm âm dương thuận/nghịch lý và quan hệ Mệnh – Cục.
- Nền tranh thủy mặc mờ trên lá số (`assets/thuy-mac.svg`).

## Chạy

Site tĩnh, không cần build. ES module nên phải mở qua HTTP (mở thẳng file:// không chạy):

```bash
python3 -m http.server 8010
```

Mở http://localhost:8010.

## Cấu trúc

| File | Nội dung |
|---|---|
| `index.html` | Trang: hero + form lập lá số, kết quả, đặt lịch |
| `assets/config.js` | **Sửa ở đây**: link đặt lịch, tên chuyên gia, giá |
| `assets/laso.js` | Lập lá số trên trình duyệt, chuẩn hoá như `tools/lap-la-so.mjs` bên repo `tuvi` |
| `assets/mo-ta.js` | Nội dung luận sơ lược (bản nháp, **chờ cô giáo duyệt**) |
| `assets/app.js` | Vẽ lá số, 3 mục luận, làm sáng sao/cung khi chọn mục |
| `assets/style.css` | Giao diện, bảng màu |
| `assets/watermark.svg` | Watermark tạm (Nhật + Nguyệt). Thay bằng file của Myn: ghi đè file này hoặc đổi `--watermark` trong `style.css` |
| `assets/thuy-mac.svg` | Nền tranh thủy mặc (núi, sương, thuyền) tự vẽ, phủ mờ lên lá số qua `#laso::after` |
| `lib/ansao.js`, `lib/lich.js` | An sao, âm lịch: chép từ repo `tuvi` (commit `ba4908e`) |
| `data/do-sang.json` | Độ sáng theo tuvivietnam, rút từ `tuvi/data/do-sang-tvvn.json` |

Lá số tính hoàn toàn trên máy người xem, không gửi dữ liệu đi đâu.

Khi sửa `lib/` hoặc bảng độ sáng bên `tuvi`, chép lại sang đây.

## Đưa lên mạng (miễn phí)

- **Cloudflare Pages** hoặc **GitHub Pages**: trỏ vào thư mục gốc repo, không cần lệnh build.
- Tên miền: `nhatnguyettuvi.online` (khoảng 29k năm đầu) hoặc dùng tạm subdomain miễn phí `*.pages.dev` / `*.github.io`.

## Còn thiếu trước khi go-live

- File watermark của Myn.
- Link đặt lịch, tên và giá trong `assets/config.js`.
- Cô giáo duyệt nội dung `assets/mo-ta.js`.
- Cô giáo duyệt hành của các sao mà nguồn ghi khác nhau: Tham Lang (đang để Thủy), Thiên Lương (Mộc), Hóa Quyền (Mộc).
