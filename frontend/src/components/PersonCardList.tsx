// src/components/PersonCardList.tsx

import { useNavigate } from "react-router-dom";

import {
  formatThaiDate,
  renderStatus,
  renderPriority,
  getStatusButton,
} from "../utils/personHelper";

export default function PersonCardList({
  persons,
  loading,
  selectMode,
  selectedIds,
  toggleSelect,
  handleDelete,
  handleUpdateStatus,
  handleExportPDF,
}: any) {
  const navigate = useNavigate();

  // =========================================================
  // SORT
  // =========================================================
  const sortedPersons = [...persons].sort((a, b) => {
    if (a.receiptBookNo !== b.receiptBookNo) {
      return (a.receiptBookNo || "").localeCompare(
        b.receiptBookNo || "",
      );
    }

    return (a.receiptNo || "").localeCompare(
      b.receiptNo || "",
      undefined,
      {
        numeric: true,
      },
    );
  });

  // =========================================================
  // ICON
  // =========================================================
  const Icon = ({
    type,
    size = 18,
  }: {
    type: string;
    size?: number;
  }) => {
    if (type === "receipt") {
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
          <path d="M6 3.5h12v17l-2.5-1.5-3.5 1.5-3.5-1.5L6 20.5z" />
          <path d="M9 8h6" />
          <path d="M9 11.5h6" />
          <path d="M9 15h4" />
        </svg>
      );
    }

    if (type === "calendar") {
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
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M8 3v4" />
          <path d="M16 3v4" />
          <path d="M4 9h16" />
        </svg>
      );
    }

    if (type === "building") {
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
          <path d="M4 21V5l8-2v18" />
          <path d="M12 8h8v13" />
          <path d="M7 8h2" />
          <path d="M7 12h2" />
          <path d="M7 16h2" />
          <path d="M15 12h2" />
          <path d="M15 16h2" />
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

    if (type === "eye") {
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
          <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    }

    if (type === "pdf") {
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
          <path d="M9 13h1.5a1.5 1.5 0 0 0 0-3H9v6" />
          <path d="M13 10v6" />
          <path d="M13 10h1.5a2 2 0 0 1 0 4H13" />
        </svg>
      );
    }

    if (type === "edit") {
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
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" />
        </svg>
      );
    }

    if (type === "delete") {
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
          <path d="M4 7h16" />
          <path d="M9 7V4h6v3" />
          <path d="M7 7l1 14h8l1-14" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      );
    }

    if (type === "arrow") {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h13" />
          <path d="m13 6 6 6-6 6" />
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
        <circle cx="12" cy="12" r="8.5" />
      </svg>
    );
  };

  // =========================================================
  // LOADING
  // =========================================================
  if (loading) {
    return (
      <div className="space-y-4">

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="
              animate-pulse
              rounded-2xl
              border
              border-gray-100
              bg-white
              p-5
              shadow-sm
            "
          >

            <div className="h-5 w-1/2 rounded bg-gray-200" />

            <div className="mt-4 space-y-3">

              <div className="h-4 w-3/4 rounded bg-gray-100" />
              <div className="h-4 w-2/3 rounded bg-gray-100" />
              <div className="h-4 w-1/2 rounded bg-gray-100" />

            </div>

            <div className="
              mt-5
              grid
              grid-cols-2
              gap-2
            ">
              <div className="h-10 rounded-xl bg-gray-100" />
              <div className="h-10 rounded-xl bg-gray-100" />
            </div>

          </div>
        ))}

      </div>
    );
  }

  // =========================================================
  // EMPTY
  // =========================================================
  if (!loading && persons.length === 0) {
    return (
      <div className="
        flex
        min-h-[280px]
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-gray-200
        bg-gray-50
        px-5
        text-center
      ">

        <div className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-white
          text-gray-300
          shadow-sm
        ">
          <Icon type="document" size={30} />
        </div>

        <h3 className="
          mt-4
          text-base
          font-bold
          text-gray-700
        ">
          ไม่พบข้อมูล
        </h3>

        <p className="
          mt-1
          text-xs
          text-gray-400
        ">
          ไม่พบรายการที่ตรงกับเงื่อนไขการค้นหา
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-4">

      {sortedPersons.map((p: any) => {

        const selected = selectedIds.includes(p.personId);

        return (
          <article
            key={p.personId}
            className={`
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              bg-white
              shadow-sm
              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:shadow-lg

              ${
                selected
                  ? "border-[#800020]/40 ring-2 ring-[#800020]/10"
                  : "border-gray-100"
              }
            `}
          >

            {/* =================================================
                TOP ACCENT
            ================================================= */}
            <div
              className={`
                absolute
                left-0
                top-0
                h-1
                w-full

                ${
                  p.status === 0
                    ? "bg-amber-400"
                    : p.status === 1
                      ? "bg-cyan-500"
                      : p.status === 2
                        ? "bg-blue-500"
                        : p.status === 3
                          ? "bg-emerald-500"
                          : "bg-red-500"
                }
              `}
            />

            <div className="p-4 min-[480px]:p-5">

              {/* =================================================
                  HEADER
              ================================================= */}
              <div className="
                flex
                items-start
                gap-3
              ">

                {/* Selection */}
                {selectMode && p.status < 4 && (
                  <label className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    transition

                    hover:border-[#800020]/30
                    hover:bg-[#800020]/5
                  ">

                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() =>
                        toggleSelect(
                          p.personId,
                          p.status,
                        )
                      }
                      className="
                        h-5
                        w-5
                        cursor-pointer
                        accent-[#800020]
                      "
                    />

                  </label>
                )}

                {/* Person Icon */}
                <div className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#800020]/10
                  text-[#800020]
                ">

                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M4.5 20c.7-3.2 3.3-5 7.5-5s6.8 1.8 7.5 5" />
                  </svg>

                </div>

                {/* Name */}
                <div className="min-w-0 flex-1">

                  <h3 className="
                    truncate
                    text-base
                    font-bold
                    text-gray-900

                    min-[480px]:text-lg
                  ">
                    {p.fullName || "-"}
                  </h3>

                  <p className="
                    mt-0.5
                    text-[10px]
                    text-gray-400
                  ">
                    รหัสบุคคล : {p.personId || "-"}
                  </p>

                </div>

              </div>

              {/* =================================================
                  RECEIPT
              ================================================= */}
              <div className="
                mt-5
                rounded-xl
                border
                border-gray-100
                bg-gray-50
                p-3
              ">

                <div className="
                  mb-3
                  flex
                  items-center
                  gap-2
                ">

                  <div className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-white
                    text-[#800020]
                    shadow-sm
                  ">
                    <Icon type="receipt" size={17} />
                  </div>

                  <p className="
                    text-xs
                    font-bold
                    text-gray-700
                  ">
                    ใบเสร็จรับเงิน
                  </p>

                </div>

                <div className="
                  grid
                  grid-cols-1
                  gap-2

                  min-[480px]:grid-cols-3
                ">

                  {/* Book */}
                  <div className="
                    rounded-lg
                    bg-white
                    px-3
                    py-2.5
                  ">

                    <p className="
                      text-[9px]
                      font-semibold
                      text-gray-400
                    ">
                      เล่มใบเสร็จ
                    </p>

                    <p className="
                      mt-0.5
                      text-sm
                      font-bold
                      text-gray-800
                    ">
                      {p.receiptBookNo || "-"}
                    </p>

                  </div>

                  {/* Number */}
                  <div className="
                    rounded-lg
                    bg-white
                    px-3
                    py-2.5
                  ">

                    <p className="
                      text-[9px]
                      font-semibold
                      text-gray-400
                    ">
                      เลขที่
                    </p>

                    <p className="
                      mt-0.5
                      text-sm
                      font-bold
                      text-gray-800
                    ">
                      {p.receiptNo || "-"}
                    </p>

                  </div>

                  {/* Date */}
                  <div className="
                    rounded-lg
                    bg-white
                    px-3
                    py-2.5
                  ">

                    <p className="
                      text-[9px]
                      font-semibold
                      text-gray-400
                    ">
                      วันที่พิมพ์มือ
                    </p>

                    <p className="
                      mt-0.5
                      text-xs
                      font-bold
                      text-gray-800
                    ">
                      {formatThaiDate(p.receiptDate)}
                    </p>

                  </div>

                </div>

              </div>

              {/* =================================================
                  DETAILS
              ================================================= */}
              <div className="mt-4 space-y-3">

                {/* Purpose */}
                <div className="
                  flex
                  gap-3
                ">

                  <div className="
                    mt-0.5
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-blue-50
                    text-blue-600
                  ">
                    <Icon type="document" size={16} />
                  </div>

                  <div className="min-w-0">

                    <p className="
                      text-[10px]
                      font-semibold
                      text-gray-400
                    ">
                      เรื่องที่ขออนุญาต
                    </p>

                    <p className="
                      mt-0.5
                      break-words
                      text-sm
                      font-semibold
                      leading-5
                      text-gray-800
                    ">
                      {p.purpose || "-"}
                    </p>

                  </div>

                </div>

                {/* Agency */}
                <div className="
                  flex
                  gap-3
                ">

                  <div className="
                    mt-0.5
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-purple-50
                    text-purple-600
                  ">
                    <Icon type="building" size={16} />
                  </div>

                  <div className="min-w-0">

                    <p className="
                      text-[10px]
                      font-semibold
                      text-gray-400
                    ">
                      หน่วยงาน
                    </p>

                    <p className="
                      mt-0.5
                      break-words
                      text-sm
                      font-semibold
                      leading-5
                      text-gray-800
                    ">
                      {p.requestingAgency || "-"}
                    </p>

                  </div>

                </div>

              </div>

              {/* =================================================
                  STATUS
              ================================================= */}
              <div className="
                mt-4
                flex
                flex-wrap
                items-center
                gap-2
              ">

                <div className="
                  flex
                  items-center
                  gap-1.5
                ">

                  <span className="
                    text-[10px]
                    font-semibold
                    text-gray-400
                  ">
                    สถานะ
                  </span>

                  <span className="
                    text-xs
                    font-bold
                  ">
                    {renderStatus(p.status)}
                  </span>

                </div>

                <span className="h-3 w-px bg-gray-200" />

                <div className="
                  flex
                  items-center
                  gap-1.5
                ">

                  <span className="
                    text-[10px]
                    font-semibold
                    text-gray-400
                  ">
                    ความเร่งด่วน
                  </span>

                  <span className="text-xs font-bold">
                    {renderPriority(p.priority ?? 0)}
                  </span>

                </div>

              </div>

              {/* =================================================
                  RETURN INFORMATION
              ================================================= */}
              {p.status === 4 && (
                <div className="
                  mt-4
                  rounded-xl
                  border
                  border-red-100
                  bg-red-50
                  p-3
                ">

                  <div className="
                    flex
                    flex-col
                    gap-2

                    min-[480px]:flex-row
                    min-[480px]:items-center
                    min-[480px]:justify-between
                  ">

                    <div>

                      <p className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-red-400
                      ">
                        วันที่คืน
                      </p>

                      <p className="
                        mt-0.5
                        text-sm
                        font-bold
                        text-red-700
                      ">
                        {formatThaiDate(p.returnDate)}
                      </p>

                    </div>

                    {p.deleteAt && (
                      <div className="min-[480px]:text-right">

                        <p className="
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-wider
                          text-red-400
                        ">
                          วันหมดอายุเอกสาร
                        </p>

                        <p className="
                          mt-0.5
                          text-sm
                          font-bold
                          text-red-700
                        ">
                          {formatThaiDate(p.deleteAt)}
                        </p>

                      </div>
                    )}

                  </div>

                </div>
              )}

              {/* =================================================
                  ACTIONS
              ================================================= */}
              <div className="
                mt-5
                grid
                grid-cols-2
                gap-2

                min-[640px]:grid-cols-4
              ">

                {/* View */}
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/person/${p.personId}`)
                  }
                  className="
                    flex
                    h-11
                    items-center
                    justify-center
                    gap-1.5
                    rounded-xl
                    border
                    border-blue-200
                    bg-blue-50
                    px-3
                    text-xs
                    font-bold
                    text-blue-700
                    transition

                    hover:bg-blue-100
                    active:scale-[0.98]
                  "
                >
                  <Icon type="eye" size={17} />
                  ดูข้อมูล
                </button>

                {/* PDF */}
                <button
                  type="button"
                  onClick={() => handleExportPDF(p)}
                  className="
                    flex
                    h-11
                    items-center
                    justify-center
                    gap-1.5
                    rounded-xl
                    border
                    border-indigo-200
                    bg-indigo-50
                    px-3
                    text-xs
                    font-bold
                    text-indigo-700
                    transition

                    hover:bg-indigo-100
                    active:scale-[0.98]
                  "
                >
                  <Icon type="pdf" size={17} />
                  PDF
                </button>

                {/* Edit */}
                {p.status < 4 && (
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/person/edit/${p.personId}`,
                      )
                    }
                    className="
                      flex
                      h-11
                      items-center
                      justify-center
                      gap-1.5
                      rounded-xl
                      border
                      border-amber-200
                      bg-amber-50
                      px-3
                      text-xs
                      font-bold
                      text-amber-700
                      transition

                      hover:bg-amber-100
                      active:scale-[0.98]
                    "
                  >
                    <Icon type="edit" size={17} />
                    แก้ไข
                  </button>
                )}

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => handleDelete(p)}
                  className="
                    flex
                    h-11
                    items-center
                    justify-center
                    gap-1.5
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    px-3
                    text-xs
                    font-bold
                    text-red-600
                    transition

                    hover:bg-red-100
                    active:scale-[0.98]
                  "
                >
                  <Icon type="delete" size={17} />
                  ลบ
                </button>

              </div>

              {/* =================================================
                  STATUS UPDATE
              ================================================= */}
              {p.status < 4 && (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(p)}
                  className="
                    mt-2
                    flex
                    h-11
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#800020]
                    px-4
                    text-sm
                    font-bold
                    text-white
                    shadow-sm
                    transition

                    hover:bg-[#680019]
                    hover:shadow-md
                    active:scale-[0.99]
                  "
                >

                  {getStatusButton(p.status)}

                  <Icon type="arrow" size={18} />

                </button>
              )}

            </div>

          </article>
        );
      })}

    </div>
  );
}