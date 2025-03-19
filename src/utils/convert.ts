import toast from "react-hot-toast";

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

export function parseStatusCode(error: Error): number {
  const regex = /\[(\d+)[\s\w]*\]/;

  const match = regex.exec(error.message);
  if (match === null) {
    throw new SyntaxError("Couldn't parse the status code from the message: " + error.message);
  }

  const status = parseInt(match[1]);
  if (status === 400) {
    toast.error("Invalid API key");
  } else if (status === 500) {
    toast.error("Internal Server Error");
  } else {
    toast.error("Something went wrong");
  }
  return status;
}
