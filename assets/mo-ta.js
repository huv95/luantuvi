// Nội dung luận sơ lược cho bản online ("luận sương sương", góp ý nhóm 23/11/2026).
// BẢN NHÁP: viết theo cách luận phổ biến, chờ cô giáo duyệt trước khi go-live.
// Mỗi chính tinh: menh (tính cách), quan (công việc), tai (tiền bạc), tat (sức khỏe).

export const CHINH_TINH = {
  'Tử Vi': {
    menh: 'đĩnh đạc, có lòng tự trọng cao, thích được tôn trọng và có xu hướng làm chủ',
    quan: 'hợp vai trò quản lý, lãnh đạo, công việc có vị thế và tiếng nói',
    tai: 'tiền đến qua địa vị và uy tín, biết giữ thể diện khi chi tiêu',
    tat: 'chú ý tiêu hóa, dạ dày và huyết áp khi căng thẳng',
  },
  'Thiên Cơ': {
    menh: 'thông minh, nhanh nhạy, giỏi tính toán, hay suy nghĩ và hay thay đổi kế hoạch',
    quan: 'hợp công việc cần mưu tính: kỹ thuật, kế hoạch, tư vấn, phân tích',
    tai: 'kiếm tiền bằng trí óc, thu nhập thay đổi theo giai đoạn',
    tat: 'dễ mệt thần kinh, mất ngủ; chú ý gan và chân tay',
  },
  'Thái Dương': {
    menh: 'cởi mở, thẳng thắn, hào phóng, thích giúp người và thích được ghi nhận',
    quan: 'hợp công việc giao tiếp nhiều, giáo dục, công vụ, truyền thông',
    tai: 'tiền đến công khai, rõ ràng; dễ chi rộng vì người khác',
    tat: 'chú ý mắt, đầu, huyết áp',
  },
  'Vũ Khúc': {
    menh: 'cương quyết, thực tế, làm việc dứt khoát, coi trọng tiền bạc và kết quả',
    quan: 'hợp tài chính, ngân hàng, kinh doanh, kỹ thuật cơ khí',
    tai: 'là tài tinh, có khả năng kiếm và quản lý tiền tốt',
    tat: 'chú ý phổi, hô hấp, răng và xương',
  },
  'Thiên Đồng': {
    menh: 'hiền hòa, dễ gần, thích an nhàn, hưởng thụ, ít tranh giành',
    quan: 'hợp công việc dịch vụ, chăm sóc, môi trường ổn định ít áp lực',
    tai: 'tiền đến từ từ, đủ dùng; hay tiêu cho sở thích',
    tat: 'chú ý thận, bàng quang, tiết niệu',
  },
  'Liêm Trinh': {
    menh: 'có nguyên tắc, nhiều cá tính, nóng nảy nhưng thẳng, sống có trước có sau',
    quan: 'hợp công việc có kỷ luật: pháp lý, hành chính, quân đội, kỹ thuật',
    tai: 'tiền kiếm bằng năng lực, cần tránh việc liên quan giấy tờ không rõ ràng',
    tat: 'chú ý tim mạch, máu và bệnh âm ỉ',
  },
  'Thiên Phủ': {
    menh: 'ôn hòa, chín chắn, thận trọng, biết lo xa và giữ gìn',
    quan: 'hợp quản lý, hành chính, kho quỹ, công việc trong tổ chức ổn định',
    tai: 'là kho tiền, có khả năng tích lũy và giữ của',
    tat: 'chú ý dạ dày, đường ruột; về trung niên dễ tăng cân',
  },
  'Thái Âm': {
    menh: 'nhẹ nhàng, tinh tế, giàu cảm xúc, chu đáo và kín đáo',
    quan: 'hợp công việc cần sự tỉ mỉ: tài chính, nghệ thuật, chăm sóc, bất động sản',
    tai: 'tiền đến đều, biết tích góp; hợp giữ của bằng nhà đất',
    tat: 'chú ý mắt, thận, nội tiết',
  },
  'Tham Lang': {
    menh: 'năng động, ham học hỏi, giỏi giao tiếp, nhiều ham muốn và thích hưởng thụ',
    quan: 'hợp kinh doanh, bán hàng, giao tế, nghệ thuật, ăn uống giải trí',
    tai: 'kiếm tiền nhanh nhờ giao tiếp, nhưng dễ tiêu cho hưởng thụ',
    tat: 'chú ý gan, thận và thói quen ăn uống',
  },
  'Cự Môn': {
    menh: 'ăn nói có lý lẽ, thích tranh luận, hay nghi ngờ và đào sâu vấn đề',
    quan: 'hợp nghề dùng lời nói: luật, giảng dạy, tư vấn, bán hàng, truyền thông',
    tai: 'kiếm tiền bằng miệng lưỡi, chuyên môn; dễ hao vì thị phi',
    tat: 'chú ý răng miệng, tiêu hóa, dạ dày',
  },
  'Thiên Tướng': {
    menh: 'đứng đắn, có trách nhiệm, thích công bằng, hay giúp người',
    quan: 'hợp vai trò điều phối, giữ quy chuẩn, hành chính, nhân sự',
    tai: 'tiền đến từ uy tín và công việc ổn định',
    tat: 'chú ý da, đường tiết niệu',
  },
  'Thiên Lương': {
    menh: 'hiền lành, đứng đắn, thích che chở và khuyên bảo người khác',
    quan: 'hợp y tế, giáo dục, tư vấn, công việc phục vụ cộng đồng',
    tai: 'tiền bạc vừa phải, hay được người giúp lúc khó',
    tat: 'có sao giải, bệnh thường gặp thầy thuốc tốt; chú ý dạ dày',
  },
  'Thất Sát': {
    menh: 'mạnh mẽ, quyết đoán, dám làm dám chịu, không thích bị ràng buộc',
    quan: 'hợp công việc cạnh tranh, mở đường, kỹ thuật, quân sự, tự kinh doanh',
    tai: 'tiền vào ra mạnh, có lúc lớn có lúc hụt',
    tat: 'chú ý thương tích, phổi, hô hấp',
  },
  'Phá Quân': {
    menh: 'thích đổi mới, phá cách, dám mạo hiểm, khó chịu với lối mòn',
    quan: 'hợp công việc nhiều thay đổi: khởi nghiệp, kỹ thuật, sáng tạo',
    tai: 'tiền đến bất ngờ và đi cũng nhanh, cần kỷ luật chi tiêu',
    tat: 'chú ý tiêu hóa, khí huyết; cẩn thận va chạm',
  },
};

// Câu thêm theo độ sáng chung của chính tinh trong cung.
export const DO_SANG = {
  tot: 'Chính tinh ở thế sáng (miếu, vượng, đắc) nên mặt tốt nổi trội.',
  xau: 'Chính tinh hãm nên mặt tốt yếu đi, dễ lộ mặt hạn chế; cần cố gắng nhiều hơn.',
};

// Một số phụ tinh hay gặp khi đóng cung Mệnh.
export const PHU_TINH_MENH = {
  'Tả Phù': 'có người giúp sức', 'Hữu Bật': 'có người giúp sức',
  'Thiên Khôi': 'gặp quý nhân', 'Thiên Việt': 'gặp quý nhân',
  'Văn Xương': 'sáng dạ, có khiếu văn chương', 'Văn Khúc': 'khéo léo, có năng khiếu',
  'Lộc Tồn': 'biết giữ của, sống tự lập', 'Hóa Lộc': 'có lộc, dễ được việc',
  'Hóa Quyền': 'có quyền, có tiếng nói', 'Hóa Khoa': 'có danh tiếng, học hành tốt',
  'Thiên Mã': 'năng động, hay di chuyển',
  'Kình Dương': 'cứng rắn, nóng nảy', 'Đà La': 'chậm mà chắc, hay lo lâu',
  'Hỏa Tinh': 'nóng nảy, bốc đồng', 'Linh Tinh': 'nóng vội, hay lo âu',
  'Địa Không': 'suy nghĩ khác người, dễ hụt cơ hội', 'Địa Kiếp': 'đời có khúc ngoặt bất ngờ',
  'Hóa Kỵ': 'hay vướng thị phi, tự làm khó mình',
};

// Thân cư cung nào: hậu vận (sau khoảng 30 tuổi) đặt trọng tâm ở đâu.
export const THAN_CU = {
  'Mệnh': 'Thân cư Mệnh: tự lập, sống theo ý mình, tiền vận và hậu vận cùng một hướng.',
  'Phúc Đức': 'Thân cư Phúc Đức: hậu vận coi trọng gia đình, dòng họ và đời sống tinh thần.',
  'Quan Lộc': 'Thân cư Quan Lộc: hậu vận lấy công việc, sự nghiệp làm trọng tâm.',
  'Thiên Di': 'Thân cư Thiên Di: hậu vận hay đi xa, ra ngoài nhiều, quan hệ rộng.',
  'Tài Bạch': 'Thân cư Tài Bạch: hậu vận chú trọng tiền bạc, giỏi xoay xở tài chính.',
  'Phu Thê': 'Thân cư Phu Thê: hậu vận gắn với vợ chồng, người phối ngẫu ảnh hưởng lớn.',
};

export const TUONG_SINH = {
  'Mệnh Sinh Cục': 'Mệnh sinh Cục: mình nuôi dưỡng hoàn cảnh, phải bỏ công sức nhiều nhưng ổn định.',
  'Cục Sinh Mệnh': 'Cục sinh Mệnh: hoàn cảnh nâng đỡ bản thân, là cách tốt.',
  'Mệnh Khắc Cục': 'Mệnh khắc Cục: chế ngự được hoàn cảnh nhưng hao sức.',
  'Cục Khắc Mệnh': 'Cục khắc Mệnh: hoàn cảnh hay gây áp lực, cần bền bỉ.',
  'Bình Hòa': 'Mệnh và Cục cùng hành: hòa hợp, ít trở ngại từ hoàn cảnh.',
};
