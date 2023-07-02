const AppData = {
    // pagination
    perPageItems: [
        { value: 5 },
        { value: 10 },
        { value: 15 },
        { value: 20 },
        { value: 30 },
        { value: 50 },
    ],
    statisticTypeOptions: [
        { text: "Tổng số token", value: "Tổng số token" },
        { text: "Token đầu vào", value: "Token đầu vào" },
        { text: "Token đầu ra", value: "Token đầu ra" },
    ],
    filterStatisticDataOptions: [
        { text: "7 ngày gần đây", value: "theLastSevenDays" },
        { text: "Hôm nay", value: "today" },
        { text: "Hôm qua", value: "yesterday" },
        { text: "Tuần trước", value: "lastWeek" },
        { text: "Tháng hiện tại", value: "currentMonth" },
        { text: "Tháng trước", value: "lastMonth" },
    ],
    // basePrompt: `Bạn là một chuyên gia tiếp thị và một nhân viên bán hàng có kinh nghiệm.
    // Hãy tạo một bản markdown giúp tạo mô tả cho [Sản phẩm].
    // Nội dung cần làm nổi bật những tính năng của sản phẩm đó,
    // giúp cho khách hàng hiểu được lợi ích mà sản phẩm mang lại.
    // Hãy kiểm tra lại nội dung mà mình viết ra để tránh lặp lại nội dung.
    // Nếu có các đường link trong [Link ảnh] thì thêm !()[đường link] vào vị trí hợp lý trong bản markdown để hiển thị ảnh sản phẩm.
    // Cố gắng tạo bản markdown theo đúng [Yêu cầu khác] được cung cấp dưới đây.
    // Và cuối cùng hãy tận dụng những thông tin được bổ sung để tạo ra một đầu ra chất lượng nhất.
    // Thông tin bổ sung:
    // Tên sản phẩm: [nameProduct],
    // Loại sản phẩm: [category],
    // Hãy sử dụng thông tin sản phẩm đưuọc cung cấp như sau: [inforProduct]
    // Link ảnh : [imgProduct],
    // Yêu cầu khác: [otherRequirements]
    // `,
    // SEOPrompt: `Bạn là một chuyên gia SEO có nhiều năm kinh nghiệm
    // trong việc viết SEO cho các sản phẩm [sản phẩm] thuộc [danh mục].
    // Nhiệm vụ của bạn là viết một SEO cho [sản phẩm] và giúp nó có thể
    // hiện lên top tìm kiếm của google hay bring. Đầu tiên bạn cần suy
    // nghĩ xem [sản phẩm] có chủ đề như thế nào để hấp dẫn và tối ưu nhất.
    // Bạn cần tự mình đặt các câu hỏi: đối tượng khách hàng của sản phẩm là ai?.
    // Thông tin khách hàng hướng đến cho sản phẩm mà bạn cung cấp là gì ?
    // ( ví dụ như tính năng, giá cả, uy tín ...)
    // Tiếp theo hãy xác định những từ khóa cần thiết để viết nội dung chuẩn SEO
    // hiệu quả tăng độ hiện diện đối với người dùng. Sau đó hãy hiển thị nội dung
    // theo như sau với title là chủ đề của sản phẩm, phần description cần viết ngắn gọn và xúc tích.
    // Kết quả chỉ trả về như sau:
    // "Title: [Hãy viết tiêu đề của bạn ở đây]
    // Description: [Hãy viết kết quả của bạn vào đây]"
    // Và cuối cùng, hãy tận dụng những thông tin mà khách hàng nhập vào để tạo ra
    // một đầu ra chất lượng nhất.`,

    //category
    categoryOptions: [
        { text: "Sách", value: "Sách" },
        { text: "Đồ gia dụng", value: "Đồ gia dụng" },
        { text: "Quần áo", value: "Quần áo" },
        { text: "Điện thoại", value: "Điện thoại" },
        { text: "Bàn phím", value: "Bàn phím" },
        { text: "Laptop", value: "Laptop" },
        { text: "Máy tính bảng", value: "Máy tính bảng" },
        { text: "Đồ ăn", value: "Đồ ăn" },
        { text: "Đồ uống", value: "Đồ uống" },
        { text: "Thuốc", value: "Thuốc" },
        { text: "Nhà", value: "Nhà" },
        { text: "Đồ chơi", value: "Đồ chơi" },
    ],

    //categoryPrompt
    // categoryPromptOptions: [
    //     {
    //         text: "Mặc định",
    //         value: "Mặc định",
    //     },
    //     {
    //         text: "Thiết bị điện tử",
    //         value: `[Thông tin sản phẩm] hiển thị dưới dạng bảng`,
    //     },
    //     {
    //         text: "Thời trang",
    //         value: `[Thông tin sản phẩm] hiển thị dưới dạng bảng, Có Kiểu dáng, Màu sắc, Chất liệu, Kích cỡ, Xu hướng, Phong cách, Cách bảo quản.
    //             Nếu [Thông tin sản phẩm] không cung cấp thuộc tính gì thì không thêm vào thuộc tính đó`,
    //     },
    //     {
    //         text: "Đồ gia dụng",
    //         value: `Cung cấp đầy đủ thông tin về sản phẩm, bao gồm kích thước,Tên sản phẩm, Thương hiệu, chất liệu và tính năng chính.
    //         Làm nổi bật được những lợi ích phục vụ những nhu cầu sinh hoạt thiết yếu trong gia đình.`,
    //     },
    //     {
    //         text: "Sách",
    //         value: `Có Tên sách, Tác giả, Thể loại, Tóm tắt nội dung, Nhà xuất bản, Năm xuất bản.
    //             Nếu [Thông tin sản phẩm] không cung cấp thuộc tính gì thì không thêm vào thuộc tính đó`,
    //     },
    //     {
    //         text: "Thuốc",
    //         value: `Phải có Công dụng, Liều lượng, Cách dùng, Thành phần, Tác dụng phụ, Cảnh báo, Bảo quản.
    //         Nếu [Thông tin sản phẩm] không cung cấp thuộc tính gì thì không thêm vào thuộc tính đó`,
    //     },
    //     {
    //         text: "Thiết bị y tế",
    //         value: `Có Tên sản phẩm, Thương hiệu, Chức năng chính, Kích thước, Trọng lượng, Thông số kỹ thuật, Chất liệu.
    //     Nếu [Thông tin sản phẩm] không cung cấp thuộc tính gì thì không thêm vào thuộc tính đó`,
    //     },
    //     {
    //         text: "Bất động sản",
    //         value: `Có Loại bất động sản, Địa chỉ, Diện tích, Số phòng, Tiện ích xung quanh, Hạ tầng giao thông, Nội thất, Pháp lý, Giá cả, Thông tin liên hệ.
    //     Nếu [Thông tin sản phẩm] không cung cấp thuộc tính gì thì không thêm vào thuộc tính đó`,
    //     },
    //     {
    //         text: "Đồ chơi",
    //         value: `Có Tên sản phẩm, Thương hiệu, Độ tuổi phù hợp, Chất liệu, Kích thước, Màu sắc, Chức năng chính, Hướng dẫn sử dụng, Thông tin cảnh báo an toàn
    //     Nếu [Thông tin sản phẩm] không cung cấp thuộc tính gì thì không thêm vào thuộc tính đó`,
    //     },
    //     {
    //         text: "Thực phẩm",
    //         value: `Có Tên sản phẩm, Thương hiệu, Thành phần, Hạn sử dụng, Khối lượng tịnh, Giá trị dinh dưỡng, Điều kiện bảo quản, Chứng nhận an toàn thực phẩm, Xuất xứ.
    //     Nếu [Thông tin sản phẩm] không cung cấp thuộc tính gì thì không thêm vào thuộc tính đó`,
    //     },
    // ],

    settingValueDefault: {
        temperature: localStorage.getItem("temperature") || 0.6,
        maxToken: localStorage.getItem("max_token") || 1500,
        topP: localStorage.getItem("top_p") || 0.9,
        stop: localStorage.getItem("stop") || "",
    },
};

export default AppData;
