import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import usePersonHistory from "../hooks/usePersonHistory";
import useSelection from "../hooks/useSelection";
import usePersonActions from "../hooks/usePersonActions";

import PersonCardList from "../components/PersonCardList";
import PersonTable from "../components/PersonTable";

export default function PersonHistoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status");

  // ===== search =====
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // ===== responsive =====
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ===== data =====
  const { persons, loading, fetchPersons } = usePersonHistory(
    statusParam,
    firstName,
    lastName
  );

  // ===== selection =====
  const {
    selectMode,
    setSelectMode,
    selectedIds,
    setSelectedIds,
    toggleSelect,
    handleSelectAll,
  } = useSelection(persons);

  // ===== actions =====
  const {
    handleDelete,
    handleUpdateStatus,
    handleBulkSend,
    handleExportPDF,
  } = usePersonActions({
    persons,
    selectedIds,
    setSelectedIds,
    selectMode,
    setSelectMode,
    fetchPersons,
  });

  // ===== filter style =====
  const active = (value: string | null, color: string) =>
    statusParam === value
      ? `btn-${color} text-white shadow fw-bold`
      : `btn-${color} text-white opacity-75`;

  return (
    <div className="p-4 main-content">
      <h2 className="mb-3 text-center">📄 ประวัติทั้งหมด</h2>

      {/* SEARCH */}
      <div className="mb-3 d-flex gap-2 align-items-center flex-wrap">
        <input
          type="text"
          className="form-control form-control-sm flex-grow-1"
          placeholder="ค้นหาชื่อ"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          className="form-control form-control-sm flex-grow-1"
          placeholder="ค้นหานามสกุล"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => {
            setFirstName("");
            setLastName("");
          }}
        >
          ล้าง
        </button>
      </div>

      {/* BULK */}
      <div className="d-flex justify-content-end mb-2 gap-2">
        <button
          className="btn btn-secondary"
          onClick={() => {
            setSelectMode((prev) => !prev);
            setSelectedIds([]);
          }}
        >
          {selectMode ? "ยกเลิกเลือก" : "เลือก"}
        </button>

        {selectMode && (
          <>
            <button
              className="btn btn-outline-primary"
              onClick={handleSelectAll}
            >
              {selectedIds.length ===
              persons.filter((p) => p.status < 3).length
                ? "ยกเลิกเลือกทั้งหมด"
                : "เลือกทั้งหมด"}
            </button>

            <button className="btn btn-success" onClick={handleBulkSend}>
              อัปเดตสถานะ (+1) ({selectedIds.length})
            </button>
          </>
        )}
      </div>

      {/* FILTER */}
      <div className="mb-3 d-flex gap-2 flex-wrap">
        <button
          className={`btn btn-sm ${active(null, "secondary")}`}
          onClick={() => setSearchParams({})}
        >
          ทั้งหมด
        </button>

        <button
          className={`btn btn-sm ${active("0", "warning")}`}
          onClick={() => setSearchParams({ status: "0" })}
        >
          รอส่ง ศพฐ
        </button>

        <button
          className={`btn btn-sm ${active("1", "info")}`}
          onClick={() => setSearchParams({ status: "1" })}
        >
          ส่ง ศพฐ แล้ว
        </button>

        <button
          className={`btn btn-sm ${active("2", "primary")}`}
          onClick={() => setSearchParams({ status: "2" })}
        >
          รับจาก ศพฐ แล้ว
        </button>

        <button
          className={`btn btn-sm ${active("3", "success")}`}
          onClick={() => setSearchParams({ status: "3" })}
        >
          ส่งคืน ต้นสังกัด แล้ว
        </button>
      </div>

      {/* CONTENT */}
      {isMobile ? (
        <PersonCardList
          persons={persons}
          loading={loading}
          selectMode={selectMode}
          selectedIds={selectedIds}
          toggleSelect={toggleSelect}
          handleDelete={handleDelete}
          handleUpdateStatus={handleUpdateStatus}
          handleExportPDF={handleExportPDF}
        />
      ) : (
        <PersonTable
          persons={persons}
          loading={loading}
          selectMode={selectMode}
          selectedIds={selectedIds}
          toggleSelect={toggleSelect}
          handleSelectAll={handleSelectAll}
          handleDelete={handleDelete}
          handleUpdateStatus={handleUpdateStatus}
          handleExportPDF={handleExportPDF}
        />
      )}
    </div>
  );
}