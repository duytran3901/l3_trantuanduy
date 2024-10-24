import axios from "axios";

export const getData = async (url, params = {}) => {
  try {
    const response = await axios.get(url, { params });
    return response?.data;
  } catch (error) {
    handleError(error);
  }
};

export const postData = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response?.data;
  } catch (error) {
    handleError(error);
  }
};

export const putData = async (url, data) => {
  try {
    const response = await axios.put(url, data);
    return response?.data;
  } catch (error) {
    handleError(error);
  }
};

export const delData = async (url) => {
  try {
    const response = await axios.delete(url);
    return response?.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        console.error("Bad Request: ", error);
        alert("Yêu cầu không hợp lệ. Vui lòng kiểm tra lại thông tin.");
        // yêu cầu người dùng kiểm tra lại thông tin cần thiết
        break;
      case 401:
        console.error("Unauthorized: ", error);
        alert("Không có quyền truy cập. Vui lòng đăng nhập lại.");
        // chuyển hướng đến trang đăng nhập
        break;
      case 404:
        console.error("Not Found: ", error);
        alert("Không tìm thấy tài nguyên. Vui lòng kiểm tra lại URL.");
        // chuyển hướng đến trang lỗi 404
        break;
        case 500:
          console.error("Internal Server Error: ", error);
          alert("Lỗi máy chủ. Thử lại sau 5 giây.");
          // tự động kết nối lại sau 5-10 giây trong 3 lần. nếu không được thì báo lỗi cho người dùng.
          break;
        case 502:
          console.error("Bad Gateway: ", error);
          alert("Cổng không hợp lệ. Thử lại sau 5 giây.");
          // tự động kết nối lại sau 5-10 giây trong 3 lần. nếu không được thì báo lỗi cho người dùng.
          break;
        case 503:
          console.error("Service Unavailable: ", error);
          alert("Dịch vụ tạm thời không khả dụng. Thử lại sau 5 giây.");
          // tự động kết nối lại sau 5-10 giây trong 3 lần. nếu không được thì báo lỗi cho người dùng.
          break;
      default:
        console.error("Unexpected error: ", error);
        alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  } else {
    console.error("API error: ", error);
    alert("Lỗi mạng. Vui lòng kiểm tra kết nối và thử lại.");
  }
};