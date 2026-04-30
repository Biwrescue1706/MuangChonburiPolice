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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= SAVE =================
  const saveOrganization = async () => {
    try {
      await api.patch(`/organization/${orgId}`, orgForm);
      toast("success", "บันทึกหน่วยงานสำเร็จ");
      fetchData();
    } catch {
      toast("error", "บันทึกไม่สำเร็จ");
    }
  };

  const saveCommander = async () => {
    try {
      const formData = new FormData();

      Object.keys(commanderForm).forEach((key) => {
        formData.append(key, commanderForm[key]);
      });

      if (signatureFile) {
        formData.append("signatureImage", signatureFile);
      }

      await api.patch(`/organization/${orgId}/commander`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast("success", "บันทึกผู้กำกับสำเร็จ");
      setSignatureFile(null);
      fetchData();
    } catch {
      toast("error", "บันทึกไม่สำเร็จ");
    }
  };

  const saveFinance = async () => {
    try {
      await api.patch(`/organization/${orgId}/finance`, financeForm);
      toast("success", "บันทึกการเงินสำเร็จ");
      fetchData();
    } catch {
      toast("error", "บันทึกไม่สำเร็จ");
    }
  };

  if (!org) return <div className="p-4">Loading...</div>;

  return (
    <div className="container py-4">
      {/* ===== หน่วยงาน ===== */}
      <div className="card p-3 mb-4">
        <h4>🏢 หน่วยงาน</h4>

        <div className="fw-semibold">{orgForm.organizationName}</div>
        <div>{orgForm.fullNameWithRank}</div>
        <div className="text-muted small">{orgForm.position}</div>

        <button
          className="btn btn-warning mt-2"
          onClick={() => {
            setModalType("org");
            setShowModal(true);
          }}
        >
          แก้ไข
        </button>
      </div>

      {/* ===== ผู้กำกับ ===== */}
      <div className="card p-3 mb-4">
        <h4>👮 ผู้กำกับ</h4>

        <div className="fw-semibold">{commanderForm.fullNameWithRank}</div>
        <div className="text-muted small">{commanderForm.position}</div>

        <button
          className="btn btn-warning mt-2"
          onClick={() => {
            setModalType("commander");
            setShowModal(true);
          }}
        >
          แก้ไข
        </button>
      </div>

      {/* ===== การเงิน ===== */}
      <div className="card p-3">
        <h4>💰 การเงิน</h4>

        <div className="fw-semibold">{financeForm.fullNameWithRank}</div>
        <div className="text-muted small">{financeForm.position}</div>

        <button
          className="btn btn-warning mt-2"
          onClick={() => {
            setModalType("finance");
            setShowModal(true);
          }}
        >
          แก้ไข
        </button>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5>
                {modalType === "org" && "แก้ไขหน่วยงาน"}
                {modalType === "commander" && "แก้ไขผู้กำกับ"}
                {modalType === "finance" && "แก้ไขการเงิน"}
              </h5>

              {/* ===== ORG ===== */}
              {modalType === "org" && (
                <>
                  <input
                    className="form-control mb-2"
                    name="organizationName"
                    value={orgForm.organizationName || ""}
                    onChange={(e) => handleChange(e, setOrgForm, orgForm)}
                  />
                  <input
                    className="form-control mb-2"
                    name="rank"
                    value={orgForm.rank || ""}
                    onChange={(e) => handleChange(e, setOrgForm, orgForm)}
                  />
                  <input
                    className="form-control mb-2"
                    name="firstName"
                    value={orgForm.firstName || ""}
                    onChange={(e) => handleChange(e, setOrgForm, orgForm)}
                  />
                  <input
                    className="form-control mb-2"
                    name="lastName"
                    value={orgForm.lastName || ""}
                    onChange={(e) => handleChange(e, setOrgForm, orgForm)}
                  />
                  <input
                    className="form-control mb-2"
                    name="position"
                    value={orgForm.position || ""}
                    onChange={(e) => handleChange(e, setOrgForm, orgForm)}
                  />
                </>
              )}

              {/* ===== COMMANDER ===== */}
              {modalType === "commander" && (
                <>
                  <label>ยศเต็ม</label>
                  <input
                    className="form-control mb-2"
                    name="fullRank"
                    value={commanderForm.fullRank || ""}
                    onChange={(e) =>
                      handleChange(e, setCommanderForm, commanderForm)
                    }
                  />
                  <label>ยศ</label>
                  <input
                    className="form-control mb-2"
                    name="rank"
                    value={commanderForm.rank || ""}
                    onChange={(e) =>
                      handleChange(e, setCommanderForm, commanderForm)
                    }
                  />
                  <label>ชื่อ</label>
                  <input
                    className="form-control mb-2"
                    name="firstName"
                    value={commanderForm.firstName || ""}
                    onChange={(e) =>
                      handleChange(e, setCommanderForm, commanderForm)
                    }
                  />
                  <label>นามสกุล</label>
                  <input
                    className="form-control mb-2"
                    name="lastName"
                    value={commanderForm.lastName || ""}
                    onChange={(e) =>
                      handleChange(e, setCommanderForm, commanderForm)
                    }
                  />
                  <label>ตำแหน่ง</label>
                  <input
                    className="form-control mb-2"
                    name="position"
                    value={commanderForm.position || ""}
                    onChange={(e) =>
                      handleChange(e, setCommanderForm, commanderForm)
                    }
                  />
                  <label>ตำแหน่งเต็ม</label>
                  <input
                    className="form-control mb-2"
                    name="fullPosition"
                    value={commanderForm.fullPosition || ""}
                    onChange={(e) =>
                      handleChange(e, setCommanderForm, commanderForm)
                    }
                  />
                  <label>ลายเซ็น</label>
                  <input
                    type="file"
                    className="form-control mb-2"
                    onChange={(e) =>
                      setSignatureFile(e.target.files?.[0] || null)
                    }
                  />
                  {signatureFile && (
                    <img
                      src={URL.createObjectURL(signatureFile)}
                      style={{ maxHeight: 80 }}
                    />
                  )}
                </>
              )}

              {/* ===== FINANCE ===== */}
              {modalType === "finance" && (
                <>
                  <label>ยศ</label>
                  <input
                    className="form-control mb-2"
                    name="rank"
                    value={financeForm.rank || ""}
                    onChange={(e) =>
                      handleChange(e, setFinanceForm, financeForm)
                    }
                  />
                  <label>ชื่อ</label>
                  <input
                    className="form-control mb-2"
                    name="firstName"
                    value={financeForm.firstName || ""}
                    onChange={(e) =>
                      handleChange(e, setFinanceForm, financeForm)
                    }
                  />
                  <label>นามสกุล</label>
                  <input
                    className="form-control mb-2"
                    name="lastName"
                    value={financeForm.lastName || ""}
                    onChange={(e) =>
                      handleChange(e, setFinanceForm, financeForm)
                    }
                  />
                  <label>ตำแหน่ง</label>
                  <input
                    className="form-control mb-2"
                    name="position"
                    value={financeForm.position || ""}
                    onChange={(e) =>
                      handleChange(e, setFinanceForm, financeForm)
                    }
                  />
                </>
              )}

              <div className="text-end">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setShowModal(false)}
                >
                  ยกเลิก
                </button>

                <button
                  className="btn btn-success"
                  onClick={async () => {
                    if (modalType === "org") await saveOrganization();
                    if (modalType === "commander") await saveCommander();
                    if (modalType === "finance") await saveFinance();
                    setShowModal(false);
                  }}
                >
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
