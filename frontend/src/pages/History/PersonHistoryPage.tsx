// src/pages/person/PersonHistoryPage.tsx

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import usePersonHistory from "../../hooks/usePersonHistory";
import useSelection from "../../hooks/useSelection";
import usePersonActions from "../../hooks/usePersonActions";

import PersonCardList from "../../components/PersonCardList";
import PersonTable from "../../components/PersonTable";

export default function PersonHistoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const statusParam = searchParams.get("status");

  // =========================================================
  // SEARCH
  // =========================================================
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // =========================================================
  // RESPONSIVE
  // < 1280 = Card
  // >= 1280 = Table
  // =========================================================
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 1280,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // =========================================================
  // DATA
  // =========================================================
  const {
    persons,
    allPersons,
    loading,
    fetchPersons,
  } = usePersonHistory(
    statusParam,
    firstName,
    lastName,
  );

  // =========================================================
  // SELECTION
  // =========================================================
  const {
    selectMode,
    setSelectMode,
    selectedIds,
    setSelectedIds,
    toggleSelect,
    handleSelectAll,
  } = useSelection(persons);

  // =========================================================
  // ACTIONS
  // =========================================================
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

  // =========================================================
  // COUNTS
  // =========================================================
  const statusCounts = {
    all: allPersons.length,
    s0: allPersons.filter((p) => p.status === 0).length,
    s1: allPersons.filter((p) => p.status === 1).length,
    s2: allPersons.filter((p) => p.status === 2).length,
    s3: allPersons.filter((p) => p.status === 3).length,
    s4: allPersons.filter((p) => p.status === 4).length,
  };

  // =========================================================
  // SORT
  // =========================================================
  const sortedPersons = [...persons].sort((a, b) => {
    // status
    if (a.status !== b.status) {
      return a.status - b.status;
    }

    // receipt book
    const bookA = Number(a.receiptBookNo) || 0;
    const bookB = Number(b.receiptBookNo) || 0;

    if (bookA !== bookB) {
      return bookA - bookB;
    }

    // receipt number
    const noA = Number(a.receiptNo) || 0;
    const noB = Number(b.receiptNo) || 0;

    return noA - noB;
  });

  // =========================================================
  // STATUS CONFIG
  // =========================================================
  const statusFilters = [
    {
      value: null,
      label: "ทั้งหมด",
      count: statusCounts.all,
      icon: "grid",
      active:
        "bg-[#800020] text-white shadow-lg shadow-[#800020]/20",
      inactive:
        "border-gray-200 bg-white text-gray-600 hover:border-[#800020]/30 hover:text-[#800020]",
    },
    {
      value: "0",
      label: "รอส่ง ศพฐ.",
      count: statusCounts.s0,
      icon: "clock",
      active:
        "bg-amber-500 text-white shadow-lg shadow-amber-500/20",
      inactive:
        "border-amber-200 bg-white text-amber-700 hover:bg-amber-50",
    },
    {
      value: "1",
      label: "เตรียมเอกสารส่ง ศพฐ. แล้ว",
      count: statusCounts.s1,
      icon: "document",
      active:
        "bg-cyan-600 text-white shadow-lg shadow-cyan-600/20",
      inactive:
        "border-cyan-200 bg-white text-cyan-700 hover:bg-cyan-50",
    },
    {
      value: "2",
      label: "ส่ง ศพฐ. แล้ว",
      count: statusCounts.s2,
      icon: "send",
      active:
        "bg-blue-600 text-white shadow-lg shadow-blue-600/20",
      inactive:
        "border-blue-200 bg-white text-blue-700 hover:bg-blue-50",
    },
    {
      value: "3",
      label: "รับจาก ศพฐ. แล้ว",
      count: statusCounts.s3,
      icon: "check",
      active:
        "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20",
      inactive:
        "border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50",
    },
    {
      value: "4",
      label: "ส่งคืนต้นสังกัดแล้ว",
      count: statusCounts.s4,
      icon: "return",
      active:
        "bg-red-600 text-white shadow-lg shadow-red-600/20",
      inactive:
        "border-red-200 bg-white text-red-700 hover:bg-red-50",
    },
  ];

  // =========================================================
  // ICON
  // =========================================================
  const Icon = ({
    type,
    size = 20,
  }: {
    type: string;
    size?: number;
  }) => {
    if (type === "grid") {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="4" width="6" height="6" rx="1" />
          <rect x="14" y="4" width="6" height="6" rx="1" />
          <rect x="4" y="14" width="6" height="6" rx="1" />
          <rect x="14" y="14" width="6" height="6" rx="1" />
        </svg>
      );
    }

    if (type === "clock") {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    }

    if (type === "document") {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3.5h8l4 4V20H6z" />
          <path d="M14 3.5V8h4" />
          <path d="M9 12h6" />
          <path d="M9 15.5h6" />
        </svg>
      );
    }

    if (type === "send") {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m21 3-7.5 18-3.5-8L3 9.5z" />
          <path d="M21 3 10 13" />
        </svg>
      );
    }

    if (type === "check") {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="8.5" />
          <path d="m8.5 12 2.5 2.5 4.8-5" />
        </svg>
      );
    }

    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 6-5 5 5 5" />
        <path d="M4 11h10a5 5 0 0 1 5 5v2" />
      </svg>
    );
  };

  // =========================================================
  // SEARCH CLEAR
  // =========================================================
  const clearSearch = () => {
    setFirstName("");
    setLastName("");
  };

  const hasSearch = firstName.trim() !== "" || lastName.trim() !== "";

  // =========================================================
  // RENDER
  // =========================================================
  return (
    <div className="min-h-screen bg-[#f6f7f9]">

      <main
        className="
          min-h-screen
          px-4
          pb-10
          pt-6

          min-[480px]:px-5

          min-[768px]:px-8
          min-[768px]:pt-8

          min-[1200px]:px-8
        "
      >

        <div className="mx-auto w-full max-w-[1500px]">

          {/* =================================================
              HEADER
          ================================================= */}
          <section className="
            relative
            overflow-hidden
            rounded-[26px]
            bg-gradient-to-br
            from-[#800020]
            via-[#700019]
            to-[#43000f]
            px-5
            py-6
            text-white
            shadow-xl
            shadow-[#800020]/10

            min-[480px]:px-7

            min-[768px]:px-9
            min-[768px]:py-7
          ">

            {/* Decoration */}
            <div className="
              pointer-events-none
              absolute
              -right-20
              -top-24
              h-64
              w-64
              rounded-full
              border
              border-white/10
            " />

            <div className="
              pointer-events-none
              absolute
              -bottom-32
              left-1/3
              h-56
              w-56
              rounded-full
              bg-white/[0.03]
              blur-2xl
            " />

            <div className="relative">

              <div className="
                flex
                flex-col
                gap-4

                min-[768px]:flex-row
                min-[768px]:items-center
                min-[768px]:justify-between
              ">

                <div>

                  <div className="
                    flex
                    items-center
                    gap-2
                    text-white/60
                  ">
                    <Icon type="document" size={17} />

                    <span className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                    ">
                      PERSON HISTORY
                    </span>
                  </div>

                  <h1 className="
                    mt-2
                    text-2xl
                    font-bold

                    min-[480px]:text-3xl

                    min-[768px]:text-4xl
                  ">
                    ประวัติบุคคล
                  </h1>

                  <p className="
                    mt-1
                    text-sm
                    text-white/65
                  ">
                    ตรวจสอบและจัดการข้อมูลบุคคลทั้งหมด
                  </p>

                </div>

                {/* Total */}
                <div className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/10
                  px-4
                  py-3
                  backdrop-blur-md
                ">

                  <div className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/10
                  ">
                    <Icon type="grid" size={21} />
                  </div>

                  <div>

                    <p className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-white/50
                    ">
                      รายการทั้งหมด
                    </p>

                    <p className="text-xl font-bold">
                      {statusCounts.all.toLocaleString("th-TH")}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              SEARCH
          ================================================= */}
          <section className="
            mt-5
            rounded-2xl
            border
            border-gray-100
            bg-white
            p-4
            shadow-sm

            min-[768px]:p-5
          ">

            <div className="
              flex
              items-center
              gap-2
            ">

              <div className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-[#800020]/10
                text-[#800020]
              ">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>
              </div>

              <div>

                <p className="text-sm font-bold text-gray-900">
                  ค้นหาข้อมูล
                </p>

                <p className="text-[10px] text-gray-400">
                  ค้นหาจากชื่อหรือชื่อสกุล
                </p>

              </div>

            </div>

            <div className="
              mt-4
              grid
              grid-cols-1
              gap-3

              min-[640px]:grid-cols-2

              min-[900px]:grid-cols-[1fr_1fr_auto]
            ">

              {/* First name */}
              <div className="relative">

                <label className="
                  mb-1.5
                  block
                  text-xs
                  font-semibold
                  text-gray-600
                ">
                  ชื่อ
                </label>

                <div className="relative">

                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="ค้นหาชื่อ..."
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-4
                      text-sm
                      text-gray-800
                      outline-none
                      transition

                      placeholder:text-gray-400

                      focus:border-[#800020]
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#800020]/10
                    "
                  />

                </div>

              </div>

              {/* Last name */}
              <div>

                <label className="
                  mb-1.5
                  block
                  text-xs
                  font-semibold
                  text-gray-600
                ">
                  นามสกุล
                </label>

                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="ค้นหานามสกุล..."
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    px-4
                    text-sm
                    text-gray-800
                    outline-none
                    transition

                    placeholder:text-gray-400

                    focus:border-[#800020]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#800020]/10
                  "
                />

              </div>

              {/* Clear */}
              <div className="
                flex
                items-end
              ">

                <button
                  type="button"
                  onClick={clearSearch}
                  disabled={!hasSearch}
                  className="
                    flex
                    h-11
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    px-5
                    text-sm
                    font-bold
                    text-gray-600
                    transition

                    hover:border-gray-300
                    hover:bg-gray-50

                    disabled:cursor-not-allowed
                    disabled:opacity-40

                    min-[900px]:w-auto
                  "
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 1 0 3-6.7" />
                    <path d="M3 4v6h6" />
                  </svg>

                  ล้าง
                </button>

              </div>

            </div>

          </section>

          {/* =================================================
              ACTION BAR
          ================================================= */}
          <section className="
            mt-4
            flex
            flex-col
            gap-3

            min-[768px]:flex-row
            min-[768px]:items-center
            min-[768px]:justify-between
          ">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#800020]">
                Management
              </p>

              <p className="mt-1 text-sm font-bold text-gray-800">
                จัดการรายการ
              </p>
            </div>

            <div className="
              flex
              flex-wrap
              gap-2
            ">

              <button
                type="button"
                onClick={() => {
                  setSelectMode((prev) => !prev);
                  setSelectedIds([]);
                }}
                className={`
                  flex
                  h-10
                  items-center
                  gap-2
                  rounded-xl
                  px-4
                  text-sm
                  font-bold
                  transition

                  ${
                    selectMode
                      ? "bg-gray-800 text-white shadow-lg"
                      : "border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50"
                  }
                `}
              >

                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path d="m8 12 2.5 2.5L16 9" />
                </svg>

                {selectMode ? "ยกเลิกเลือก" : "เลือก"}

              </button>

              {selectMode && (
                <>
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="
                      flex
                      h-10
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-blue-200
                      bg-blue-50
                      px-4
                      text-sm
                      font-bold
                      text-blue-700
                      transition

                      hover:bg-blue-100
                    "
                  >
                    {selectedIds.length ===
                    persons.filter((p) => p.status < 4).length
                      ? "ยกเลิกทั้งหมด"
                      : "เลือกทั้งหมด"}
                  </button>

                  <button
                    type="button"
                    onClick={handleBulkSend}
                    disabled={selectedIds.length === 0}
                    className="
                      flex
                      h-10
                      items-center
                      gap-2
                      rounded-xl
                      bg-emerald-600
                      px-4
                      text-sm
                      font-bold
                      text-white
                      shadow-sm
                      transition

                      hover:bg-emerald-700

                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >

                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m21 3-7.5 18-3.5-8L3 9.5z" />
                      <path d="M21 3 10 13" />
                    </svg>

                    อัปเดต +1 ({selectedIds.length})

                  </button>
                </>
              )}

            </div>

          </section>

          {/* =================================================
              STATUS FILTER
          ================================================= */}
          <section className="
            mt-4
            overflow-hidden
            rounded-2xl
            border
            border-gray-100
            bg-white
            p-4
            shadow-sm

            min-[768px]:p-5
          ">

            <div className="
              mb-3
              flex
              items-center
              justify-between
            ">

              <div>

                <p className="text-sm font-bold text-gray-900">
                  สถานะข้อมูล
                </p>

                <p className="text-[10px] text-gray-400">
                  เลือกสถานะเพื่อกรองรายการ
                </p>

              </div>

              {statusParam && (
                <button
                  type="button"
                  onClick={() => setSearchParams({})}
                  className="
                    text-xs
                    font-semibold
                    text-[#800020]
                    hover:underline
                  "
                >
                  ดูทั้งหมด
                </button>
              )}

            </div>

            <div className="
              flex
              gap-2
              overflow-x-auto
              pb-1
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            ">

              {statusFilters.map((filter) => {
                const active = statusParam === filter.value;

                return (
                  <button
                    key={filter.label}
                    type="button"
                    onClick={() => {
                      if (filter.value === null) {
                        setSearchParams({});
                      } else {
                        setSearchParams({
                          status: filter.value,
                        });
                      }
                    }}
                    className={`
                      flex
                      shrink-0
                      items-center
                      gap-2
                      rounded-xl
                      border
                      px-3.5
                      py-2.5
                      text-xs
                      font-bold
                      transition-all
                      duration-200

                      ${
                        active
                          ? filter.active
                          : filter.inactive
                      }
                    `}
                  >

                    <Icon
                      type={filter.icon}
                      size={17}
                    />

                    <span>
                      {filter.label}
                    </span>

                    <span
                      className={`
                        rounded-full
                        px-2
                        py-0.5
                        text-[10px]
                        ${
                          active
                            ? "bg-white/20"
                            : "bg-gray-100"
                        }
                      `}
                    >
                      {filter.count}
                    </span>

                  </button>
                );
              })}

            </div>

          </section>

          {/* =================================================
              RESULT HEADER
          ================================================= */}
          <div className="
            mt-6
            mb-3
            flex
            flex-wrap
            items-center
            justify-between
            gap-2
          ">

            <div>

              <h2 className="
                text-lg
                font-bold
                text-gray-900
              ">
                รายการข้อมูล
              </h2>

              <p className="mt-0.5 text-xs text-gray-400">
                พบ {sortedPersons.length.toLocaleString("th-TH")} รายการ
              </p>

            </div>

            <div className="
              rounded-lg
              bg-gray-100
              px-3
              py-1.5
              text-[10px]
              font-semibold
              text-gray-500
            ">
              {isMobile ? "มุมมองการ์ด" : "มุมมองตาราง"}
            </div>

          </div>

          {/* =================================================
              CONTENT
          ================================================= */}
          <section className="
            overflow-hidden
            rounded-2xl
            border
            border-gray-100
            bg-white
            shadow-sm
          ">

            {isMobile ? (
              <div className="p-3 min-[480px]:p-4">
                <PersonCardList
                  persons={sortedPersons}
                  loading={loading}
                  selectMode={selectMode}
                  selectedIds={selectedIds}
                  toggleSelect={toggleSelect}
                  handleDelete={handleDelete}
                  handleUpdateStatus={handleUpdateStatus}
                  handleExportPDF={handleExportPDF}
                />
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <PersonTable
                  persons={sortedPersons}
                  loading={loading}
                  selectMode={selectMode}
                  selectedIds={selectedIds}
                  toggleSelect={toggleSelect}
                  handleSelectAll={handleSelectAll}
                  handleDelete={handleDelete}
                  handleUpdateStatus={handleUpdateStatus}
                  handleExportPDF={handleExportPDF}
                />
              </div>
            )}

          </section>

        </div>
      </main>

    </div>
  );
}