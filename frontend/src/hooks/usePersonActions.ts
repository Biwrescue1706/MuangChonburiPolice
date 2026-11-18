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

interface Person extends Partial<GeneratePDFData> {
  personId: string;
  status: number;
  [key: string]: unknown;
}

interface ApiErrorResponse {
  error?: string;
  message?: string;
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

  return (
    axiosError.response?.data?.error ??
    axiosError.response?.data?.message ??
    axiosError.message
  );
}

function toPDFData(person: Person): GeneratePDFData {
  return {
    fingerprintDate: person.fingerprintDate ?? null,
    organizationName: person.organizationName ?? null,
    prefix: person.prefix ?? null,
    fullName: person.fullName ?? null,
    birthDate: person.birthDate ?? null,
    fullNameWithRank: person.fullNameWithRank ?? null,
    rank: person.rank ?? null,
    purpose: person.purpose ?? null,
    requestingAgency: person.requestingAgency ?? null,
    citizenId: person.citizenId ?? null,
    birthDay: person.birthDay ?? null,
    birthMonth: person.birthMonth ?? null,
    birthYear: person.birthYear ?? null,
    nationality: person.nationality ?? null,
    ethnicity: person.ethnicity ?? null,
    height: person.height ?? null,
    weight: person.weight ?? null,
    bodyType: person.bodyType ?? null,
    skinColor: person.skinColor ?? null,
    distinguishingMarks: person.distinguishingMarks ?? null,
    behavior: person.behavior ?? null,
    address: person.address ?? null,
    occupation: person.occupation ?? null,
    workplaceAddress: person.workplaceAddress ?? null,
    father: person.father ?? null,
    mother: person.mother ?? null,
    spouse: person.spouse ?? null,
    fullNameOrg: person.fullNameOrg ?? null,
    position: person.position ?? null,
    receiptBookNo: person.receiptBookNo ?? null,
    receiptNo: person.receiptNo ?? null,
    receiptDate: person.receiptDate ?? null,
    money: person.money ?? null,
    moneyText: person.moneyText ?? null,
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
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
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
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
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
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
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
      const pdfData = toPDFData(person);

      console.log("PDF person data:", person);
      console.log("PDF mapped data:", pdfData);

      await generatePDF(pdfData);
    } catch (err) {
      console.error("สร้าง PDF ไม่สำเร็จ:", err);
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