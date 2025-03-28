import HistoryCard from "@/components/history/history-card";
import HistoryHeader from "@/components/history/history-header";
import { deleteData, getStorageUsagePercentage, getStoreData, initDB, Stores } from "@/config/db";
import { IHistory, IStorageUsage } from "@/types/history";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const HistoryPage = () => {
  const [t] = useTranslation("global");
  const [historyData, setHistoryData] = useState<IHistory[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [storageUsage, setStorageUsage] = useState<IStorageUsage>({ percentage: 0, color: "gray" });

  const getHistoryData = async () => {
    if (!historyData) setIsLoading(true);
    const history = await getStoreData<IHistory>(Stores.HistoryItems);
    setHistoryData(history);
    setIsLoading(false);
    // get storage usage after getting history data
    const usage = await getStorageUsagePercentage();
    console.log(usage);
    setStorageUsage(usage);
  };

  const handleDelete = async (id: string) => {
    if (confirm(t("confirm-delete")) == true) {
      await deleteData(Stores.HistoryItems, id);
      getHistoryData();
    }
  };

  const resetIndexedDB = async () => {
    if (confirm(t("confirm-clear")) == true) {
      indexedDB.deleteDatabase("imageEditorDB");
      await initDB(Stores.HistoryItems);
      getHistoryData();
      toast.success(t("toast.success.image-clear"));
    }
  };

  useEffect(() => {
    getHistoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HistoryHeader storageUsage={storageUsage} resetStorage={resetIndexedDB} />
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">{t("image-history")}</h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-50">
            <LoaderCircle className="animate-spin h-15 w-15 text-blue-600" />
          </div>
        ) : historyData && historyData.length === 0 ? (
          <div className="text-center p-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500">{t("no-image-history")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {historyData
              ?.sort((his1, his2) => his2.timestamp - his1.timestamp)
              .map((history) => <HistoryCard key={history.id} handleDelete={handleDelete} {...history} />)}
          </div>
        )}
      </div>
    </>
  );
};

export default HistoryPage;
