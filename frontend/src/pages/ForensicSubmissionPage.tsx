// src/pages/ForensicSubmissionPage.tsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Person {
  personId: string;
  fullName: string;
  purpose?: string;
  receiptBookNo?: string;
  receiptNo?: string;
  receiptDate?: string;
}

interface StatusHistoryItem {
  historyId: string;
  person: Person;
}

export default function ForensicSubmissionPage() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [submissionNo, setSubmissionNo] = useState("");

  const fetchData = async (selectedDate: string) => {
    try {
      setLoading(true);

      const res = await api.get(`/status-history/date/${selectedDate}`);

      const data = (res.data.data || [])
        .map((item: StatusHistoryItem) => item.person)
        .filter(Boolean);

      const uniquePersons = data.filter(
        (person: Person, index: number, self: Person[]) =>
          index === self.findIndex((p) => p.personId === person.personId),
      );

      uniquePersons.sort((a: Person, b: Person) => {
        const bookA = Number(a.receiptBookNo || 0);
        const bookB = Number(b.receiptBookNo || 0);

        if (bookA !== bookB) {
          return bookA - bookB;
        }

        const noA = Number(a.receiptNo || 0);
        const noB = Number(b.receiptNo || 0);

        return noA - noB;
      });

      setPersons(uniquePersons);
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
      setPersons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(date);
  }, []);

  const togglePerson = (personId: string) => {
    setSelectedIds((prev) =>
      prev.includes(personId)
        ? prev.filter((id) => id !== personId)
        : [...prev, personId],
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === persons.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(persons.map((p) => p.personId));
    }
  };

  const handleGenerate = async () => {
    try {
      if (selectedIds.length === 0) {
        alert("กรุณาเลือกบุคคล");
        return;
      }

      const res = await api.post("/forensic-submission/create", {
        submissionNo,
        personIds: selectedIds,
      });

      await Swal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "สร้างรายการเรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 1500,
      });

      console.log(res.data);

      navigate(`/forensic-submission/list`);
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="container py-4 main-content">
      <div className="bg-white rounded-xl shadow border">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">ออกหนังสือส่ง ศพฐ.</h1>
        </div>

        <div className="p-4">
          <div className="row g-2 mb-3">
            <div className="col-md-3">
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-primary w-100"
                onClick={() => fetchData(date)}
              >
                ค้นหา
              </button>
            </div>

            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="เลขหนังสือนำส่ง"
                value={submissionNo}
                onChange={(e) => setSubmissionNo(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <button className="btn btn-danger w-100" onClick={handleGenerate}>
                ออก PDF ศพฐ.
              </button>
            </div>
          </div>

          <div className="alert alert-info">
            เลือกแล้ว {selectedIds.length} คน
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th className="text-center" style={{ width: "60px" }}>
                    <input
                      type="checkbox"
                      checked={
                        persons.length > 0 &&
                        selectedIds.length === persons.length
                      }
                      onChange={toggleAll}
                    />
                  </th>

                  <th className="text-center" style={{ width: "80px" }}>
                    ลำดับ
                  </th>

                  <th>ชื่อ และ ชื่อสกุล</th>

                  <th>เรื่องที่ขออนุญาต</th>

                  <th className="text-center">เล่มที่</th>

                  <th className="text-center">เลขที่</th>

                  <th className="text-center">ลงวันที่</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center">
                      กำลังโหลด...
                    </td>
                  </tr>
                ) : persons.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center">
                      ไม่พบข้อมูล
                    </td>
                  </tr>
                ) : (
                  persons.map((person, index) => (
                    <tr key={person.personId}>
                      <td className="text-center">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(person.personId)}
                          onChange={() => togglePerson(person.personId)}
                        />
                      </td>

                      <td className="text-center">{index + 1}</td>

                      <td>{person.fullName}</td>

                      <td>{person.purpose || "-"}</td>

                      <td className="text-center">
                        {person.receiptBookNo || "-"}
                      </td>

                      <td className="text-center">{person.receiptNo || "-"}</td>

                      <td className="text-center">
                        {person.receiptDate || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
