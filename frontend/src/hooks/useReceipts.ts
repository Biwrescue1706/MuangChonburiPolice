import { useEffect, useState } from "react";
import api from "../api/axios";

export interface Receipt {
  receiptId: string;
  receiptBookNo: string;
  receiptNo: string;
  fullName: string;
}

export default function useReceipts() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReceipts = async () => {
    try {
      const res = await api.get("/receipts");
      setReceipts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  return { receipts, loading, refetch: fetchReceipts };
}