import { generatePDF } from "../utils/generatePDF";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../api/axios";
import { toast } from "../utils/toast";

export const usePersonStatus0 = () => {
  const [persons, setPersons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectMode, setSelectMode] = useState(false);

  const fetchPersons = async () => {
    try {
      setLoading(true);
      const res = await api.get("/person/getall?status=0");
      setPersons(res.data.data || []);
    } catch {
      toast("error", "โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };
const handleExportPDF = (person: any) => {
  generatePDF(person);
};

  useEffect(() => {
    fetchPersons();
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === persons.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(persons.map((p) => p.personId));
    }
  };

  const handleUpdateStatus = async (p: any) => {
    const confirm = await Swal.fire({
      title: "ยืนยันการส่ง?",
      icon: "question",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.patch(`/person/${p.personId}/status`, { status: 1 });
      toast("success", "ส่งเรียบร้อย");
      fetchPersons();
    } catch (err: any) {
      toast("error", "ส่งไม่สำเร็จ", err?.response?.data?.error);
    }
  };

  const handleBulkSend = async () => {
    if (!selectMode) return toast("warning", "กรุณากดเลือกก่อน");
    if (selectedIds.length === 0)
      return toast("warning", "เลือกข้อมูลก่อน");

    const confirm = await Swal.fire({
      title: "ยืนยันการส่ง?",
      text: `จำนวน ${selectedIds.length} รายการ`,
      icon: "question",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await api.patch("/person/bulk/status", {
        personIds: selectedIds,
        status: 1,
      });

      setSelectedIds([]);
      toast("success", `ส่งแล้ว ${res.data.updated} รายการ`);
      fetchPersons();
    } catch (err: any) {
      toast("error", "ส่งไม่สำเร็จ", err?.response?.data?.error);
    }
  };

  const handleDelete = async (p: any) => {
    const confirm = await Swal.fire({
      title: "ยืนยันการลบ?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/person/${p.personId}`);
      toast("success", "ลบเรียบร้อย");
      fetchPersons();
    } catch (err: any) {
      toast("error", "ลบไม่สำเร็จ", err?.response?.data?.error);
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
  };
};