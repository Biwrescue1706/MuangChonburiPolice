// src/pages/OrganizationPage.tsx
import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import api from "../api/axios";
import { toast } from "../utils/toast";

type FormValue = string | number | null | undefined;
type FormState = Record<string, FormValue>;

type OrganizationData = {
  organizationId?: string | number;
  commander?: unknown;
  finance?: unknown;
  [key: string]: unknown;
};

type ModalType = "org" | "commander" | "finance";

function toFormState(value: unknown): FormState {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  const result: FormState = {};

  for (const [key, entry] of Object.entries(value)) {
    if (
      typeof entry === "string" ||
      typeof entry === "number" ||
      entry === null
    ) {
      result[key] = entry;
    }
  }

  return result;
}

function getOrganizationRecord(payload: unknown): OrganizationData | null {
  if (Array.isArray(payload)) {
    const first = payload[0];
    return first && typeof first === "object" && !Array.isArray(first)
      ? (first as OrganizationData)
      : null;
  }

  if (!payload || typeof payload !== "object") {
    return null;
  }

  const record = payload as Record<string, unknown>;

  if (record.organization && typeof record.organization === "object") {
    return getOrganizationRecord(record.organization);
  }

  if (record.data !== undefined) {
    return getOrganizationRecord(record.data);
  }

  return payload as OrganizationData;
}

function getImageUrl(value: FormValue): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export default function OrganizationPage() {
  const [org, setOrg] = useState<OrganizationData | null>(null);
  const [orgForm, setOrgForm] = useState<FormState>({});
  const [commanderForm, setCommanderForm] = useState<FormState>({});
  const [financeForm, setFinanceForm] = useState<FormState>({});

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);

  const orgId = org?.organizationId;

  const applyOrganizationData = useCallback((data: OrganizationData | null) => {
    if (!data) {
      setOrg(null);
      setOrgForm({});
      setCommanderForm({});
      setFinanceForm({});
      return;
    }

    setOrg(data);
    setOrgForm(toFormState(data));
    setCommanderForm(toFormState(data.commander));
    setFinanceForm(toFormState(data.finance));
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoadError(false);

      const res = await api.get<unknown>("/organization");
      const organization = getOrganizationRecord(res.data);

      if (!organization) {
        applyOrganizationData(null);
        setLoadError(true);
        return false;
      }

      applyOrganizationData(organization);
      return true;
    } catch (error) {
      console.error("Load organization error:", error);
      applyOrganizationData(null);
      setLoadError(true);
      return false;
    } finally {
      setLoading(false);
    }
  }, [applyOrganizationData]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    setForm: Dispatch<SetStateAction<FormState>>,
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setSignatureFile(null);
  };

  const openModal = (type: ModalType) => {
    setModalType(type);
    setSignatureFile(null);
    setShowModal(true);
  };

  const saveOrganization = async () => {
    if (orgId === undefined || orgId === null) {
      toast("error", "ไม่พบข้อมูลหน่วยงาน");
      return;
    }

    try {
      await api.patch(`/organization/${orgId}`, orgForm);
      toast("success", "บันทึกหน่วยงานสำเร็จ");
      await fetchData();
      closeModal();
    } catch (error) {
      console.error("Save organization error:", error);
      toast("error", "บันทึกไม่สำเร็จ");
    }
  };

  const saveCommander = async () => {
    if (orgId === undefined || orgId === null) {
      toast("error", "ไม่พบข้อมูลหน่วยงาน");
      return;
    }

    try {
      let signatureUrl = commanderForm.signatureImage;

      if (signatureFile) {
        const formData = new FormData();
        formData.append("file", signatureFile);

        const res = await api.post<{ url: string }>(
          `/organization/${orgId}/upload-signature`,
          formData,
        );

        signatureUrl = res.data.url;
      }

      await api.patch(`/organization/${orgId}/commander`, {
        ...commanderForm,
        signatureImage: signatureUrl,
      });

      toast("success", "บันทึกผู้กำกับสำเร็จ");
      await fetchData();
      closeModal();
    } catch (error) {
      console.error("Save commander error:", error);
      toast("error", "บันทึกไม่สำเร็จ");
    }
  };

  const saveFinance = async () => {
    if (orgId === undefined || orgId === null) {
      toast("error", "ไม่พบข้อมูลหน่วยงาน");
      return;
    }

    try {
      await api.patch(`/organization/${orgId}/finance`, financeForm);
      toast("success", "บันทึกการเงินสำเร็จ");
      await fetchData();
      closeModal();
    } catch (error) {
      console.error("Save finance error:", error);
      toast("error", "บันทึกไม่สำเร็จ");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f7f9] px-4 py-8">
        <div className="mx-auto flex min-h-[360px] max-w-6xl items-center justify-center rounded-2xl border border-gray-100 bg-white">
          <div className="text-center">
            <div className="mx-auto mb-4 h-11 w-11 animate-spin rounded-full border-[3px] border-gray-200 border-t-[#79243a]" />
            <p className="text-sm font-semibold text-gray-600">
              กำลังโหลดข้อมูลหน่วยงาน
            </p>
            <p className="mt-1 text-xs text-gray-400">กรุณารอสักครู่...</p>
          </div>
        </div>
      </div>
    );
  }

  if (loadError || !org) {
    return (
      <div className="min-h-screen bg-[#f6f7f9] px-4 py-8">
        <div className="mx-auto flex min-h-[360px] max-w-6xl flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-3xl text-rose-600">
            !
          </div>
          <h2 className="text-lg font-bold text-gray-800">
            ไม่สามารถโหลดข้อมูลหน่วยงานได้
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
            กรุณาตรวจสอบการเชื่อมต่อหรือข้อมูลที่ได้รับจากเซิร์ฟเวอร์
          </p>
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              void fetchData();
            }}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#79243a] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5e192c] active:scale-[0.98]"
          >
            ลองโหลดอีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  const cards = [
    {
      type: "org" as const,
      icon: "▦",
      title: "ข้อมูลหน่วยงาน",
      subtitle: "ข้อมูลสถานีและรายละเอียดหน่วยงาน",
      name: orgForm.organizationName || "-",
      detail: orgForm.fullNameWithRank || "-",
      position: orgForm.position || "-",
      accent: "bg-[#79243a]",
      soft: "bg-[#f8edf0]",
      text: "text-[#79243a]",
      number: "01",
    },
    {
      type: "commander" as const,
      icon: "♙",
      title: "ผู้กำกับ",
      subtitle: "ข้อมูลผู้บังคับบัญชาของหน่วยงาน",
      name: commanderForm.fullNameWithRank || "-",
      detail: commanderForm.fullPosition || commanderForm.position || "-",
      position: commanderForm.position || "-",
      accent: "bg-[#315b83]",
      soft: "bg-[#edf3f9]",
      text: "text-[#315b83]",
      number: "02",
    },
    {
      type: "finance" as const,
      icon: "฿",
      title: "ข้อมูลการเงิน",
      subtitle: "ข้อมูลเจ้าหน้าที่ผู้รับผิดชอบการเงิน",
      name: financeForm.fullNameWithRank || "-",
      detail: financeForm.position || "-",
      position: financeForm.position || "-",
      accent: "bg-[#39765d]",
      soft: "bg-[#edf5f0]",
      text: "text-[#39765d]",
      number: "03",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-3 py-5 sm:px-6 sm:py-7 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-7 overflow-hidden rounded-2xl bg-[#76243a] shadow-[0_8px_28px_rgba(75,20,38,0.12)]">
          <div className="relative px-5 py-7 sm:px-8 sm:py-9">
            <div className="pointer-events-none absolute -right-10 -top-24 h-72 w-72 rounded-full border-[35px] border-white/[0.04]" />
            <div className="pointer-events-none absolute -bottom-28 right-40 h-64 w-64 rounded-full border-[25px] border-white/[0.04]" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-white/75">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e8c58a]" />
                  SYSTEM CONFIGURATION
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  ข้อมูลหน่วยงาน
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
                  จัดการข้อมูลสถานี ผู้บังคับบัญชา และผู้รับผิดชอบด้านการเงิน
                  สำหรับใช้งานภายในระบบ
                </p>
              </div>

              <div className="w-full rounded-xl border border-white/15 bg-white/[0.09] px-4 py-3 sm:max-w-[280px]">
                <p className="text-[11px] font-medium text-white/55">
                  หน่วยงานที่กำลังใช้งาน
                </p>
                <p className="mt-1 break-words text-sm font-semibold text-white">
                  {orgForm.organizationName || "-"}
                </p>
              </div>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-[#d5a96c] via-[#f0d6a8] to-[#d5a96c]" />
        </div>

        <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              ตั้งค่าข้อมูลหลัก
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              เลือกหัวข้อที่ต้องการตรวจสอบหรือแก้ไขข้อมูล
            </p>
          </div>
          <span className="mt-2 text-xs font-medium text-gray-400 sm:mt-0">
            ทั้งหมด {cards.length} รายการ
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <section
              key={card.type}
              className="group overflow-hidden rounded-2xl border border-[#e9eaed] bg-white shadow-[0_2px_8px_rgba(20,30,50,0.035)] transition duration-200 hover:-translate-y-1 hover:border-gray-200 hover:shadow-[0_12px_30px_rgba(20,30,50,0.08)]"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.soft} ${card.text} text-2xl font-semibold`}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{card.title}</h3>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold tracking-wider text-gray-300">
                  {card.number}
                </span>
              </div>

              <div className="p-5">
                <div className="min-h-[112px]">
                  <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-400">
                    ชื่อ / หน่วยงาน
                  </p>
                  <p className="break-words text-lg font-bold leading-7 text-gray-800">
                    {card.name}
                  </p>
                  <p className="mt-1 break-words text-sm leading-6 text-gray-500">
                    {card.detail}
                  </p>
                </div>

                <div className="mt-4 rounded-xl border border-gray-100 bg-[#f8f9fb] px-4 py-3">
                  <p className="text-[11px] font-semibold text-gray-400">
                    ตำแหน่ง
                  </p>
                  <p className="mt-1 break-words text-sm font-semibold text-gray-700">
                    {card.position}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => openModal(card.type)}
                  className={`mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl ${card.accent} px-4 text-sm font-semibold text-white transition hover:brightness-90 active:scale-[0.98]`}
                >
                  <span className="text-base">✎</span>
                  แก้ไขข้อมูล
                </button>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-6 flex gap-3 rounded-xl border border-[#eadfc9] bg-[#fffaf1] px-4 py-4 sm:px-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f5e9d1] text-lg text-[#98713a]">
            i
          </div>
          <div>
            <p className="text-sm font-bold text-[#795b2e]">ข้อควรทราบ</p>
            <p className="mt-1 text-sm leading-6 text-[#8b7654]">
              ข้อมูลหน่วยงานและผู้กำกับจะถูกนำไปใช้ในการสร้างเอกสารและ PDF
              ของระบบโดยอัตโนมัติ กรุณาตรวจสอบความถูกต้องก่อนบันทึก
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#151923]/55 p-3 backdrop-blur-[3px] sm:p-5"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-white/30 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.22)]">
            <div className="relative overflow-hidden bg-[#76243a] px-5 py-5 text-white sm:px-6">
              <div className="pointer-events-none absolute -right-8 -top-16 h-40 w-40 rounded-full border-[18px] border-white/[0.06]" />
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.18em] text-white/55">
                    EDIT INFORMATION
                  </p>
                  <h2 className="mt-1 text-lg font-bold sm:text-xl">
                    {modalType === "org" && "แก้ไขข้อมูลหน่วยงาน"}
                    {modalType === "commander" && "แก้ไขข้อมูลผู้กำกับ"}
                    {modalType === "finance" && "แก้ไขข้อมูลการเงิน"}
                  </h2>
                  <p className="mt-1 text-xs text-white/60">
                    แก้ไขรายละเอียดและกดบันทึกเมื่อดำเนินการเสร็จ
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-lg text-white transition hover:bg-white/20"
                  aria-label="ปิดหน้าต่าง"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="overflow-y-auto p-5 sm:p-6">
              {modalType === "org" && (
                <div className="space-y-5">
                  <div className="rounded-lg border border-[#f0e2e6] bg-[#fcf7f8] px-4 py-3">
                    <p className="text-sm font-bold text-[#76243a]">
                      รายละเอียดหน่วยงาน
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      ข้อมูลพื้นฐานของสถานีและชื่อผู้ลงนาม
                    </p>
                  </div>

                  <Field
                    label="ชื่อหน่วยงาน"
                    name="organizationName"
                    value={orgForm.organizationName}
                    onChange={(e) => handleChange(e, setOrgForm)}
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="ยศ"
                      name="rank"
                      value={orgForm.rank}
                      onChange={(e) => handleChange(e, setOrgForm)}
                    />

                    <Field
                      label="ตำแหน่ง"
                      name="position"
                      value={orgForm.position}
                      onChange={(e) => handleChange(e, setOrgForm)}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="ชื่อ"
                      name="firstName"
                      value={orgForm.firstName}
                      onChange={(e) => handleChange(e, setOrgForm)}
                    />

                    <Field
                      label="นามสกุล"
                      name="lastName"
                      value={orgForm.lastName}
                      onChange={(e) => handleChange(e, setOrgForm)}
                    />
                  </div>
                </div>
              )}

              {modalType === "commander" && (
                <div className="space-y-5">
                  <div className="rounded-lg border border-[#dce8f2] bg-[#f5f9fc] px-4 py-3">
                    <p className="text-sm font-bold text-[#315b83]">
                      ข้อมูลผู้บังคับบัญชา
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      ระบุยศ ชื่อ ตำแหน่ง และลายเซ็น
                    </p>
                  </div>

                  <Field
                    label="ยศเต็ม"
                    name="fullRank"
                    value={commanderForm.fullRank}
                    onChange={(e) => handleChange(e, setCommanderForm)}
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="ยศ"
                      name="rank"
                      value={commanderForm.rank}
                      onChange={(e) => handleChange(e, setCommanderForm)}
                    />

                    <Field
                      label="ตำแหน่ง"
                      name="position"
                      value={commanderForm.position}
                      onChange={(e) => handleChange(e, setCommanderForm)}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="ชื่อ"
                      name="firstName"
                      value={commanderForm.firstName}
                      onChange={(e) => handleChange(e, setCommanderForm)}
                    />

                    <Field
                      label="นามสกุล"
                      name="lastName"
                      value={commanderForm.lastName}
                      onChange={(e) => handleChange(e, setCommanderForm)}
                    />
                  </div>

                  <Field
                    label="ตำแหน่งเต็ม"
                    name="fullPosition"
                    value={commanderForm.fullPosition}
                    onChange={(e) => handleChange(e, setCommanderForm)}
                  />

                  <div className="rounded-xl border border-gray-200 p-4">
                    <label
                      htmlFor="signatureFile"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      ลายเซ็น
                    </label>
                    <p className="mb-3 text-xs leading-5 text-gray-400">
                      เลือกรูปภาพลายเซ็นเพื่ออัปโหลดแทนลายเซ็นเดิม
                    </p>

                    <input
                      id="signatureFile"
                      type="file"
                      accept="image/*"
                      className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-600 outline-none transition file:mr-3 file:rounded-md file:border-0 file:bg-[#315b83] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:border-[#315b83] focus:border-[#315b83] focus:ring-4 focus:ring-[#315b83]/10"
                      onChange={(e) =>
                        setSignatureFile(e.target.files?.[0] ?? null)
                      }
                    />

                    {signatureFile && (
                      <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/50 p-3">
                        <p className="mb-2 text-xs font-semibold text-blue-700">
                          ตัวอย่างลายเซ็นใหม่
                        </p>
                        <img
                          src={URL.createObjectURL(signatureFile)}
                          className="max-h-24 max-w-full object-contain"
                          alt="ตัวอย่างลายเซ็นใหม่"
                        />
                      </div>
                    )}

                    {!signatureFile &&
                      getImageUrl(commanderForm.signatureImage) && (
                        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
                          <p className="mb-2 text-xs font-semibold text-gray-500">
                            ลายเซ็นปัจจุบัน
                          </p>
                          <img
                            src={getImageUrl(commanderForm.signatureImage)}
                            className="max-h-24 max-w-full object-contain"
                            alt="ลายเซ็นปัจจุบัน"
                          />
                        </div>
                      )}
                  </div>
                </div>
              )}

              {modalType === "finance" && (
                <div className="space-y-5">
                  <div className="rounded-lg border border-[#dcebe2] bg-[#f4f9f6] px-4 py-3">
                    <p className="text-sm font-bold text-[#39765d]">
                      ข้อมูลผู้รับผิดชอบการเงิน
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      ระบุข้อมูลเจ้าหน้าที่ที่รับผิดชอบด้านการเงิน
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="ยศ"
                      name="rank"
                      value={financeForm.rank}
                      onChange={(e) => handleChange(e, setFinanceForm)}
                    />

                    <Field
                      label="ตำแหน่ง"
                      name="position"
                      value={financeForm.position}
                      onChange={(e) => handleChange(e, setFinanceForm)}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="ชื่อ"
                      name="firstName"
                      value={financeForm.firstName}
                      onChange={(e) => handleChange(e, setFinanceForm)}
                    />

                    <Field
                      label="นามสกุล"
                      name="lastName"
                      value={financeForm.lastName}
                      onChange={(e) => handleChange(e, setFinanceForm)}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-gray-100 bg-[#fafbfc] p-4 sm:flex-row sm:justify-end sm:px-6">
              <button
                type="button"
                onClick={closeModal}
                className="h-11 rounded-lg border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
              >
                ยกเลิก
              </button>

              <button
                type="button"
                onClick={async () => {
                  if (modalType === "org") {
                    await saveOrganization();
                  } else if (modalType === "commander") {
                    await saveCommander();
                  } else if (modalType === "finance") {
                    await saveFinance();
                  }
                }}
                className="h-11 rounded-lg bg-[#76243a] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5e192c] active:scale-[0.98]"
              >
                บันทึกข้อมูล
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: FormValue;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Field({ label, name, value, onChange }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-gray-700"
      >
        {label}
      </label>

      <input
        id={name}
        type="text"
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className="h-11 w-full rounded-lg border border-gray-200 bg-[#fafbfc] px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-[#79243a] focus:bg-white focus:ring-4 focus:ring-[#79243a]/10"
      />
    </div>
  );
}
