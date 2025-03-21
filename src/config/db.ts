import { IStorageUsage } from "@/types/history";

export enum Stores {
  // eslint-disable-next-line no-unused-vars
  HistoryItems = "historyItems",
}

const dbName = "imageEditorDB";

export const initDB = (storeName: Stores, version: number = 1): Promise<boolean> => {
  return new Promise((resolve) => {
    const request = indexedDB.open(dbName, version);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" });
      }
    };

    request.onsuccess = () => {
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

export const addData = <T>(storeName: Stores, data: T, version: number = 1): Promise<T | string | null> => {
  return new Promise((resolve) => {
    const request = indexedDB.open(dbName, version);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.add(data);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve("Unknown error");
      }
    };
  });
};

export const getStoreData = <T>(storeName: Stores): Promise<T[]> => {
  return new Promise((resolve) => {
    const request = indexedDB.open(dbName);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const res = store.getAll();
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
};

export const deleteData = (storeName: string, key: string, version: number = 1): Promise<boolean> => {
  return new Promise((resolve) => {
    const request = indexedDB.open(dbName, version);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const res = store.delete(key);

      // add listeners that will resolve the Promise
      res.onsuccess = () => {
        resolve(true);
      };
      res.onerror = () => {
        resolve(false);
      };
    };
  });
};

export const getStorageUsagePercentage = async (): Promise<IStorageUsage> => {
  try {
    const estimate = await navigator.storage.estimate();
    console.log(estimate);
    if (!estimate.quota || !estimate.usage) {
      throw new Error("Không thể lấy thông tin dung lượng");
    }

    const usedPercentage = Math.round((estimate.usage / estimate.quota) * 100);

    // Xác định màu sắc dựa trên phần trăm dung lượng đã sử dụng
    let color = "green"; // Mặc định là màu xanh
    if (usedPercentage >= 80) {
      color = "red"; // Dung lượng sử dụng trên 80% -> màu đỏ
    } else if (usedPercentage >= 50) {
      color = "yellow"; // Dung lượng sử dụng từ 50% đến 80% -> màu vàng
    }

    return { percentage: usedPercentage, color };
  } catch (error) {
    console.error("Không thể lấy thông tin dung lượng", error);
    return { percentage: 0, color: "gray" }; // Nếu gặp lỗi, trả về 0 và màu xám
  }
};
