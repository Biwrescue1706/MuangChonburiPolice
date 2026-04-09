// src/page/statusPerson/PersonStatus0page.tsx
import { useEffect, useState } from "react";
import { usePersonStatus0 } from "../../hooks/usePersonStatus0";
import PersonTable from "../../components/statusPerson/PersonTable";
import PersonCard from "../../components/statusPerson/PersonCard";

export default function PersonStatus0Page() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);

  // responsive
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // hook (logic ทั้งหมดอยู่ในนี้แล้ว)
  const {
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
  } = usePersonStatus0();

  return (
    <div className="p-4">
      <h1 className="mb-3 text-center">📌 รายการรอส่ง ศพฐ</h1>

      {/* ===== BULK ACTION ===== */}
      <div className="d-flex justify-content-end mb-2 gap-2">
        <button
          className="btn btn-secondary"
          onClick={() => {
            setSelectMode((prev: boolean) => !prev);
            setSelectedIds([]);
          }}
        >
          {selectMode ? "ยกเลิกเลือก" : "เลือก"}
        </button>

        {selectMode && (
          <button className="btn btn-success" onClick={handleBulkSend}>
            ส่งที่เลือก ({selectedIds.length})
          </button>
        )}
      </div>

      {/* ===== CONTENT ===== */}
      {isDesktop ? (
        <PersonTable
          persons={persons}
          loading={loading}
          selectedIds={selectedIds}
          selectMode={selectMode}
          toggleSelect={toggleSelect}
          toggleSelectAll={toggleSelectAll}
          handleUpdateStatus={handleUpdateStatus}
          handleDelete={handleDelete}
handleExportPDF={handleExportPDF}
        />
      ) : (
        <PersonCard
          persons={persons}
          loading={loading}
          selectedIds={selectedIds}
          selectMode={selectMode}
          toggleSelect={toggleSelect}
 handleUpdateStatus={handleUpdateStatus}
          handleDelete={handleDelete}
         handleExportPDF={handleExportPDF}
        />
      )}
    </div>
  );
}