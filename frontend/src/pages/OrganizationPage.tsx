import { useEffect, useState } from "react";
import api from "../api/axios";

export default function OrganizationPage() {
  const [org, setOrg] = useState<any>(null);
  const [orgForm, setOrgForm] = useState<any>({});

  const [commanderForm, setCommanderForm] = useState<any>({});
  const [financeForm, setFinanceForm] = useState<any>({});

  const orgId = org?.organizationId;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await api.get("/organization");
    const data = res.data[0]; // ใช้ตัวแรก (MAIN)

    setOrg(data);
    setOrgForm(data);

    setCommanderForm(data?.commander || {});
    setFinanceForm(data?.finance || {});
  };

  const handleChange = (e: any, setForm: any, form: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveOrganization = async () => {
    await api.patch(`/organization/${orgId}`, orgForm);
    fetchData();
  };

  const saveCommander = async () => {
    await api.patch(`/organization/${orgId}/commander`, commanderForm);
    fetchData();
  };

  const saveFinance = async () => {
    await api.patch(`/organization/${orgId}/finance`, financeForm);
    fetchData();
  };

  if (!org) return <div className="p-4">Loading...</div>;

  return (
    <div className="container py-4">

      {/* ================= ORGANIZATION ================= */}
      <div className="card p-3 mb-4">
        <h4>🏢 หน่วยงาน</h4>

        <table className="table">
          <tbody>
            <tr>
              <td>ชื่อหน่วยงาน</td>
              <td>
                <input
                  className="form-control"
                  name="organizationName"
                  value={orgForm.organizationName || ""}
                  onChange={(e) => handleChange(e, setOrgForm, orgForm)}
                />
              </td>
            </tr>

            <tr>
              <td>ยศ</td>
              <td>
                <input
                  className="form-control"
                  name="rank"
                  value={orgForm.rank || ""}
                  onChange={(e) => handleChange(e, setOrgForm, orgForm)}
                />
              </td>
            </tr>

            <tr>
              <td>ชื่อ</td>
              <td>
                <input
                  className="form-control"
                  name="firstName"
                  value={orgForm.firstName || ""}
                  onChange={(e) => handleChange(e, setOrgForm, orgForm)}
                />
              </td>
            </tr>

            <tr>
              <td>นามสกุล</td>
              <td>
                <input
                  className="form-control"
                  name="lastName"
                  value={orgForm.lastName || ""}
                  onChange={(e) => handleChange(e, setOrgForm, orgForm)}
                />
              </td>
            </tr>

            <tr>
              <td>ตำแหน่ง</td>
              <td>
                <input
                  className="form-control"
                  name="position"
                  value={orgForm.position || ""}
                  onChange={(e) => handleChange(e, setOrgForm, orgForm)}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button className="btn btn-primary" onClick={saveOrganization}>
          💾 บันทึกหน่วยงาน
        </button>
      </div>

      {/* ================= COMMANDER ================= */}
      <div className="card p-3 mb-4">
        <h4>👮 ผู้กำกับ</h4>

        <table className="table">
          <tbody>
            <tr>
              <td>ยศ</td>
              <td>
                <input
                  className="form-control"
                  name="rank"
                  value={commanderForm.rank || ""}
                  onChange={(e) =>
                    handleChange(e, setCommanderForm, commanderForm)
                  }
                />
              </td>
            </tr>

            <tr>
              <td>ชื่อ</td>
              <td>
                <input
                  className="form-control"
                  name="firstName"
                  value={commanderForm.firstName || ""}
                  onChange={(e) =>
                    handleChange(e, setCommanderForm, commanderForm)
                  }
                />
              </td>
            </tr>

            <tr>
              <td>นามสกุล</td>
              <td>
                <input
                  className="form-control"
                  name="lastName"
                  value={commanderForm.lastName || ""}
                  onChange={(e) =>
                    handleChange(e, setCommanderForm, commanderForm)
                  }
                />
              </td>
            </tr>

            <tr>
              <td>ตำแหน่ง</td>
              <td>
                <input
                  className="form-control"
                  name="position"
                  value={commanderForm.position || ""}
                  onChange={(e) =>
                    handleChange(e, setCommanderForm, commanderForm)
                  }
                />
              </td>
            </tr>

            <tr>
              <td>ตำแหน่งเต็ม</td>
              <td>
                <input
                  className="form-control"
                  name="fullPosition"
                  value={commanderForm.fullPosition || ""}
                  onChange={(e) =>
                    handleChange(e, setCommanderForm, commanderForm)
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button className="btn btn-warning" onClick={saveCommander}>
          💾 บันทึกผู้กำกับ
        </button>
      </div>

      {/* ================= FINANCE ================= */}
      <div className="card p-3">
        <h4>💰 การเงิน</h4>

        <table className="table">
          <tbody>
            <tr>
              <td>ยศ</td>
              <td>
                <input
                  className="form-control"
                  name="rank"
                  value={financeForm.rank || ""}
                  onChange={(e) =>
                    handleChange(e, setFinanceForm, financeForm)
                  }
                />
              </td>
            </tr>

            <tr>
              <td>ชื่อ</td>
              <td>
                <input
                  className="form-control"
                  name="firstName"
                  value={financeForm.firstName || ""}
                  onChange={(e) =>
                    handleChange(e, setFinanceForm, financeForm)
                  }
                />
              </td>
            </tr>

            <tr>
              <td>นามสกุล</td>
              <td>
                <input
                  className="form-control"
                  name="lastName"
                  value={financeForm.lastName || ""}
                  onChange={(e) =>
                    handleChange(e, setFinanceForm, financeForm)
                  }
                />
              </td>
            </tr>

            <tr>
              <td>ตำแหน่ง</td>
              <td>
                <input
                  className="form-control"
                  name="position"
                  value={financeForm.position || ""}
                  onChange={(e) =>
                    handleChange(e, setFinanceForm, financeForm)
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button className="btn btn-success" onClick={saveFinance}>
          💾 บันทึกการเงิน
        </button>
      </div>
    </div>
  );
}