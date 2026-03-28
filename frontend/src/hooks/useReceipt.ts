import { useEffect, useState } from "react";
import api from "../api/axios";

export function useReceipt(form: any, setForm: any) {
  const [receiptNumbers, setReceiptNumbers] = useState<number[]>([]);
  const allReceiptNumbers = Array.from({ length: 50 }, (_, i) => i + 1);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const res = await api.get("/receipt/latest");

        const bookNo = res.data?.bookNo ?? "";
        const usedNumbers: number[] = Array.isArray(res.data?.usedNumbers)
          ? res.data.usedNumbers
          : [];

        if (!bookNo) {
          setReceiptNumbers([]);
          return;
        }

        setForm((prev: any) => ({
          ...prev,
          receiptBookNo: bookNo,
        }));

        const availableNumbers = allReceiptNumbers.filter(
          (num) => !usedNumbers.includes(num),
        );

        setReceiptNumbers(availableNumbers);
      } catch {
        setReceiptNumbers([]);
      }
    };

    fetchReceipts();
  }, []);

  useEffect(() => {
    if (!form.receiptBookNo || form.receiptBookNo.length < 3) {
      return;
    }

    const fetchUsedNumbers = async () => {
      try {
        const res = await api.get(`/receipt/used/${form.receiptBookNo}`);

        const usedNumbers: number[] = Array.isArray(res.data?.usedNumbers)
          ? res.data.usedNumbers
          : [];

        const availableNumbers = allReceiptNumbers.filter(
          (num) => !usedNumbers.includes(num),
        );

        setReceiptNumbers(availableNumbers);
      } catch {
        setReceiptNumbers(allReceiptNumbers);
      }
    };

    fetchUsedNumbers();
  }, [form.receiptBookNo]);

  return { receiptNumbers };
}
