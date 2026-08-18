// src/pages/OrganizationPage.tsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "../utils/toast";

export default function OrganizationPage() {
  const [org, setOrg] = useState<any>(null);
  const [orgForm, setOrgForm] = useState<any>({});
  const [commanderForm, setCommanderForm] = useState<any>({});
  const [financeForm, setFinanceForm] = useState<any>({});

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<
    "org" | "commander" | "finance" | null
  >(null);

  const [signatureFile, setSignatureFile] = useState<File | null>(null);

  const orgId = org?.organizationId;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/organization");
      const data = res.data[0];

      setOrg(data);
      setOrgForm(data);
      setCommanderForm(data?.commander || {});
      setFinanceForm(data?.finance || {});
    } catch {
      toast("error", "โหลดข้อมูลไม่สำเร็จ");
    }
  };

  const handleChange = (e: any, setForm: any, form: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setSignatureFile(null);
  };

  const openModal = (type: "org" | "commander" | "finance") => {
    setModalType(type);
    setSignatureFile(null);
    setShowModal(true);
  };

  const saveOrganization = async () => {
    try {
      await api.patch(`/organization/${orgId}`, orgForm);
      toast("success", "บันทึกหน่วยงานสำเร็จ");
      await fetchData();
      closeModal();
    } catch {
      toast("error", "บันทึกไม่สำเร็จ");
    }
  };

  const saveCommander = async () => {
    try {
      let signatureUrl = commanderForm.signatureImage;

      if (signatureFile) {
        const formData = new FormData();
        formData.append("file", signatureFile);

        const res = await api.post(
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
    } catch {
      toast("error", "บันทึกไม่สำเร็จ");
    }
  };

  const saveFinance = async () => {
    try {
      await api.patch(`/organization/${orgId}/finance`, financeForm);
      toast("success", "บันทึกการเงินสำเร็จ");
      await fetchData();
      closeModal();
    } catch {
      toast("error", "บันทึกไม่สำเร็จ");
    }
  };

  if (!org) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex min-h-[300px] items-center justify-center rounded-3xl bg-white shadow-sm">
            <div className="text-center">
              <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#800020]" />
              <p className="font-semibold text-gray-500">
                กำลังโหลดข้อมูล...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const cards = [
    {
      type: "org" as const,
      icon: "🏢",
      title: "ข้อมูลหน่วยงาน",
      subtitle: "ข้อมูลสถานีและหน่วยงาน",
      name: orgForm.organizationName || "-",
      detail: orgForm.fullNameWithRank || "-",
      position: orgForm.position || "-",
      gradient: "from-[#800020] to-[#500014]",
    },
    {
      type: "commander" as const,
      icon: "👮",
      title: "ผู้กำกับ",
      subtitle: "ข้อมูลผู้บังคับบัญชา",
      name: commanderForm.fullNameWithRank || "-",
      detail: commanderForm.fullPosition || commanderForm.position || "-",
      position: commanderForm.position || "-",
      gradient: "from-blue-700 to-blue-900",
    },
    {
      type: "finance" as const,
      icon: "💰",
      title: "การเงิน",
      subtitle: "ข้อมูลผู้รับผิดชอบการเงิน",
      name: financeForm.fullNameWithRank || "-",
      detail: financeForm.position || "-",
      position: financeForm.position || "-",
      gradient: "from-emerald-600 to-emerald-800",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* HEADER */}
        <div className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-[#800020] via-[#6d001b] to-[#3d000e] p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white/60">
                <span>⚙️</span>
                <span>SETTINGS</span>
              </div>

              <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                ข้อมูลหน่วยงาน
              </h1>

              <p className="mt-2 text-sm text-white/65 sm:text-base">
                จัดการข้อมูลหน่วยงาน ผู้กำกับ และข้อมูลการเงิน
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-sm">
              <p className="text-xs text-white/50">หน่วยงานปัจจุบัน</p>
              <p className="mt-1 font-bold">
                {orgForm.organizationName || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.type}
              className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Card Header */}
              <div
                className={`bg-gradient-to-br ${card.gradient} p-5 text-white`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="mb-2 text-3xl">{card.icon}</div>

                    <h2 className="text-xl font-bold">{card.title}</h2>

                    <p className="mt-1 text-xs text-white/60">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold backdrop-blur-sm">
                    ข้อมูล
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <div className="mb-5">
                  <p className="mb-1 text-xs font-semibold text-gray-400">
                    ชื่อ / หน่วยงาน
                  </p>

                  <p className="break-words text-lg font-bold text-gray-900">
                    {card.name}
                  </p>

                  <p className="mt-1 break-words text-sm text-gray-500">
                    {card.detail}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-semibold text-gray-400">
                    ตำแหน่ง
                  </p>

                  <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                    {card.position}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => openModal(card.type)}
                  className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 text-sm font-bold text-white transition hover:bg-[#800020] active:scale-[0.98]"
                >
                  <span>✏️</span>
                  แก้ไขข้อมูล
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* INFORMATION */}
        <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-4">
          <div className="flex gap-3">
            <div className="text-xl">💡</div>

            <div>
              <p className="font-bold text-amber-900">หมายเหตุ</p>

              <p className="mt-1 text-sm leading-6 text-amber-800">
                ข้อมูลหน่วยงานและผู้กำกับจะถูกนำไปใช้ในการสร้างเอกสารและ PDF
                ของระบบโดยอัตโนมัติ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-5"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-[#800020] to-[#500014] px-5 py-4 text-white sm:px-6">
              <div>
                <p className="text-xs font-semibold text-white/60">
                  EDIT INFORMATION
                </p>

                <h2 className="mt-1 text-lg font-bold sm:text-xl">
                  {modalType === "org" && "แก้ไขข้อมูลหน่วยงาน"}
                  {modalType === "commander" && "แก้ไขข้อมูลผู้กำกับ"}
                  {modalType === "finance" && "แก้ไขข้อมูลการเงิน"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-lg text-white transition hover:bg-white/20"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-5 sm:p-6">
              {/* ORG */}
              {modalType === "org" && (
                <div className="space-y-4">
                  <Field
                    label="ชื่อหน่วยงาน"
                    name="organizationName"
                    value={orgForm.organizationName}
                    onChange={(e: any) =>
                      handleChange(e, setOrgForm, orgForm)
                    }
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="ยศ"
                      name="rank"
                      value={orgForm.rank}
                      onChange={(e: any) =>
                        handleChange(e, setOrgForm, orgForm)
                      }
                    />

                    <Field
                      label="ตำแหน่ง"
                      name="position"
                      value={orgForm.position}
                      onChange={(e: any) =>
                        handleChange(e, setOrgForm, orgForm)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="ชื่อ"
                      name="firstName"
                      value={orgForm.firstName}
                      onChange={(e: any) =>
                        handleChange(e, setOrgForm, orgForm)
                      }
                    />

                    <Field
                      label="นามสกุล"
                      name="lastName"
                      value={orgForm.lastName}
                      onChange={(e: any) =>
                        handleChange(e, setOrgForm, orgForm)
                      }
                    />
                  </div>
                </div>
              )}

              {/* COMMANDER */}
              {modalType === "commander" && (
                <div className="space-y-4">
                  <Field
                    label="ยศเต็ม"
                    name="fullRank"
                    value={commanderForm.fullRank}
                    onChange={(e: any) =>
                      handleChange(e, setCommanderForm, commanderForm)
                    }
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="ยศ"
                      name="rank"
                      value={commanderForm.rank}
                      onChange={(e: any) =>
                        handleChange(e, setCommanderForm, commanderForm)
                      }
                    />

                    <Field
                      label="ตำแหน่ง"
                      name="position"
                      value={commanderForm.position}
                      onChange={(e: any) =>
                        handleChange(e, setCommanderForm, commanderForm)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="ชื่อ"
                      name="firstName"
                      value={commanderForm.firstName}
                      onChange={(e: any) =>
                        handleChange(e, setCommanderForm, commanderForm)
                      }
                    />

                    <Field
                      label="นามสกุล"
                      name="lastName"
                      value={commanderForm.lastName}
                      onChange={(e: any) =>
                        handleChange(e, setCommanderForm, commanderForm)
                      }
                    />
                  </div>

                  <Field
                    label="ตำแหน่งเต็ม"
                    name="fullPosition"
                    value={commanderForm.fullPosition}
                    onChange={(e: any) =>
                      handleChange(e, setCommanderForm, commanderForm)
                    }
                  />

                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      ลายเซ็น
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      className="block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-600 outline-none transition file:mr-3 file:rounded-lg file:border-0 file:bg-[#800020] file:px-3 file:py-2 file:text-xs file:font-bold file:text-white hover:border-[#800020] focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/10"
                      onChange={(e) =>
                        setSignatureFile(e.target.files?.[0] || null)
                      }
                    />

                    {signatureFile && (
                      <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
                        <p className="mb-2 text-xs font-semibold text-gray-500">
                          ตัวอย่างลายเซ็นใหม่
                        </p>

                        <img
                          src={URL.createObjectURL(signatureFile)}
                          className="max-h-24 max-w-full object-contain"
                          alt="signature preview"
                        />
                      </div>
                    )}

                    {!signatureFile && commanderForm.signatureImage && (
                      <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
                        <p className="mb-2 text-xs font-semibold text-gray-500">
                          ลายเซ็นปัจจุบัน
                        </p>

                        <img
                          src={commanderForm.signatureImage}
                          className="max-h-24 max-w-full object-contain"
                          alt="current signature"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* FINANCE */}
              {modalType === "finance" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="ยศ"
                      name="rank"
                      value={financeForm.rank}
                      onChange={(e: any) =>
                        handleChange(e, setFinanceForm, financeForm)
                      }
                    />

                    <Field
                      label="ตำแหน่ง"
                      name="position"
                      value={financeForm.position}
                      onChange={(e: any) =>
                        handleChange(e, setFinanceForm, financeForm)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="ชื่อ"
                      name="firstName"
                      value={financeForm.firstName}
                      onChange={(e: any) =>
                        handleChange(e, setFinanceForm, financeForm)
                      }
                    />

                    <Field
                      label="นามสกุล"
                      name="lastName"
                      value={financeForm.lastName}
                      onChange={(e: any) =>
                        handleChange(e, setFinanceForm, financeForm)
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col-reverse gap-2 border-t border-gray-100 bg-gray-50 p-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="h-11 rounded-xl border border-gray-200 bg-white px-5 text-sm font-bold text-gray-600 transition hover:bg-gray-100"
              >
                ยกเลิก
              </button>

              <button
                type="button"
                onClick={async () => {
                  if (modalType === "org") await saveOrganization();
                  if (modalType === "commander") await saveCommander();
                  if (modalType === "finance") await saveFinance();
                }}
                className="h-11 rounded-xl bg-[#800020] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#650019] active:scale-[0.98]"
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

function Field({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-700">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#800020] focus:bg-white focus:ring-4 focus:ring-[#800020]/10"
      />
    </div>
  );
}