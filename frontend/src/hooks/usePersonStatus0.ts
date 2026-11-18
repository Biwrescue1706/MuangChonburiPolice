import { generatePDF, type GeneratePDFData } from "../utils/generatePDF";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../api/axios";
import { toast } from "../utils/toast";

export interface PersonStatus0 extends GeneratePDFData {
  personId: string;
  status: number;
}

interface PersonApiResponse {
  data?: PersonStatus0[];
}

interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
  };
}

interface BulkStatusResponse {
  updated: number;
}

export const usePersonStatus0 = () => {
  const [persons, setPersons] = useState<PersonStatus0[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectMode, setSelectMode] = useState(false);

  const fetchPersons = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get<PersonApiResponse>("/person/getall?status=0");
      setPersons(res.data.data ?? []);
    } catch {
      toast("error", "โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleExportPDF = async (person: PersonStatus0) => {
    try {
      await generatePDF(person);
    } catch (err) {
      console.error(err);
      toast("error", "สร้าง PDF ไม่สำเร็จ");
    }
  };

  useEffect(() => {
    fetchPersons();
  }, [fetchPersons]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === persons.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(persons.map((person) => person.personId));
    }
  };

  const handleUpdateStatus = async (person: PersonStatus0) => {
    const confirm = await Swal.fire({
      title: "ยืนยันการส่ง?",
      icon: "question",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.patch(`/person/${person.personId}/status`, {
        status: 1,
      });

      toast("success", "ส่งเรียบร้อย");
      await fetchPersons();
    } catch (err) {
      const error = err as ApiError;
      toast("error", "ส่งไม่สำเร็จ", error.response?.data?.error);
    }
  };

  const handleBulkSend = async () => {
    if (!selectMode) {
      return toast("warning", "กรุณากดเลือกก่อน");
    }

    if (selectedIds.length === 0) {
      return toast("warning", "เลือกข้อมูลก่อน");
    }

    const confirm = await Swal.fire({
      title: "ยืนยันการส่ง?",
      text: `จำนวน ${selectedIds.length} รายการ`,
      icon: "question",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await api.patch<BulkStatusResponse>("/person/bulk/status", {
        personIds: selectedIds,
        status: 1,
      });

      setSelectedIds([]);
      toast("success", `ส่งแล้ว ${res.data.updated} รายการ`);
      await fetchPersons();
    } catch (err) {
      const error = err as ApiError;
      toast("error", "ส่งไม่สำเร็จ", error.response?.data?.error);
    }
  };

  const handleDelete = async (person: PersonStatus0) => {
    const confirm = await Swal.fire({
      title: "ยืนยันการลบ?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/person/${person.personId}`);

      setSelectedIds((prev) => prev.filter((id) => id !== person.personId));

      toast("success", "ลบเรียบร้อย");
      await fetchPersons();
    } catch (err) {
      const error = err as ApiError;
      toast("error", "ลบไม่สำเร็จ", error.response?.data?.error);
    }
  };

  return {
    persons,
    loading,
    selectedIds,
    selectMode,
    setSelectMode,
    setSelectedIds,
    toggleSelect,
    toggleSelectAll,
    handleUpdateStatus,
    handleBulkSend,
    handleDelete,
    handleExportPDF,
    refetch: fetchPersons,
  };
};
