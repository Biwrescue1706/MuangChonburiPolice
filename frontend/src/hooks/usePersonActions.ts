// src/hooks/usePersonActions.ts
import { useCallback } from "react";
import Swal from "sweetalert2";
import type { AxiosError } from "axios";
import { toast } from "../utils/toast";
import {
  generatePDF,
  type GeneratePDFData,
} from "../utils/generatePDF";
import api from "../api/axios";

interface Person {
  personId: string;
  status: number;
  prefix?: string | null;
  fullName?: string | null;
  [key: string]: unknown;
}

interface ApiErrorResponse {
  error?: string;
}

interface UsePersonActionsProps {
  persons: Person[];
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  selectMode: boolean;
  setSelectMode: React.Dispatch<React.SetStateAction<boolean>>;
  fetchPersons: () => void | Promise<void>;
}

function getApiError(err: unknown): string | undefined {
  if (typeof err !== "object" || err === null) {
    return undefined;
  }

  const axiosError = err as AxiosError<ApiErrorResponse>;
  return axiosError.response?.data?.error;
}

function toPDFData(person: Person): GeneratePDFData {
  return {
    prefix: person.prefix ?? null,
    fullName: person.fullName ?? null,
  };
}

export default function usePersonActions({
  persons,
  selectedIds,
  setSelectedIds,
  selectMode,
  setSelectMode,
  fetchPersons,
}: UsePersonActionsProps) {
  const handleDelete = useCallback(
    async (person: Person) => {
      const confirm = await Swal.fire({
        title: "ยืนยันการลบ?",
        icon: "warning",
        showCancelButton: true,
      });

      if (!confirm.isConfirmed) return;

      try {
        await api.delete(`/person/${person.personId}`);
        toast("success", "ลบเรียบร้อย");
        await fetchPersons();
      } catch (err: unknown) {
        toast("error", "ลบไม่สำเร็จ", getApiError(err));
      }
    },
    [fetchPersons],
  );

  const handleUpdateStatus = useCallback(
    async (person: Person) => {
      if (person.status >= 4) return;

      const nextStatus = person.status + 1;

      const confirm = await Swal.fire({
        title: "ยืนยันการเปลี่ยนสถานะ?",
        text: `${person.status} → ${nextStatus}`,
        icon: "question",
        showCancelButton: true,
      });

      if (!confirm.isConfirmed) return;

      try {
        await api.patch(`/person/${person.personId}/status`, {
          status: nextStatus,
        });

        toast("success", "อัปเดตสถานะแล้ว");
        await fetchPersons();
      } catch (err: unknown) {
        toast("error", "ไม่สำเร็จ", getApiError(err));
      }
    },
    [fetchPersons],
  );

  const handleBulkSend = useCallback(async () => {
    if (!selectMode) {
      toast("warning", "กรุณากดเลือกก่อน");
      return;
    }

    if (selectedIds.length === 0) {
      toast("warning", "เลือกข้อมูลก่อน");
      return;
    }

    const confirm = await Swal.fire({
      title: "ยืนยันการอัปเดตสถานะ?",
      text: `จำนวน ${selectedIds.length} รายการ`,
      icon: "question",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    const selectedPersons = selectedIds
      .map((id) => persons.find((person) => person.personId === id))
      .filter(
        (person): person is Person =>
          person !== undefined && person.status < 4,
      );

    const results = await Promise.allSettled(
      selectedPersons.map((person) =>
        api.patch(`/person/${person.personId}/status`, {
          status: person.status + 1,
        }),
      ),
    );

    const success = results.filter(
      (result) => result.status === "fulfilled",
    ).length;

    setSelectedIds([]);
    setSelectMode(false);

    if (success === selectedPersons.length) {
      toast("success", `อัปเดตแล้ว ${success} รายการ`);
    } else {
      toast(
        "warning",
        `อัปเดตสำเร็จ ${success} จาก ${selectedPersons.length} รายการ`,
      );
    }

    await fetchPersons();
  }, [
    selectMode,
    selectedIds,
    persons,
    setSelectedIds,
    setSelectMode,
    fetchPersons,
  ]);

  const handleExportPDF = useCallback(async (person: Person) => {
    try {
      await generatePDF(toPDFData(person));
    } catch {
      toast("error", "สร้าง PDF ไม่สำเร็จ");
    }
  }, []);

  return {
    handleDelete,
    handleUpdateStatus,
    handleBulkSend,
    handleExportPDF,
  };
}