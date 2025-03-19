export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file); // Đọc file dưới dạng base64

    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string); // Trả về base64
      } else {
        reject("File không thể chuyển đổi thành base64");
      }
    };

    reader.onerror = () => {
      reject("Có lỗi xảy ra trong quá trình đọc file");
    };
  });
};
