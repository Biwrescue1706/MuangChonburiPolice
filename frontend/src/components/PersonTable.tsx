// src/components/PersonTable.tsx

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  formatThaiDate,
  renderStatus,
  renderPriority,
  getStatusButton,
  getStatusButtonStyle,
} from "../utils/personHelper";

interface Props {
  persons: any[];
  loading: boolean;
  selectMode: boolean;
  selectedIds: string[];
  toggleSelect: (id: string, status: number) => void;
  handleSelectAll: () => void;
  handleDelete: (p: any) => void;
  handleUpdateStatus: (p: any) => void;
  handleExportPDF: (p: any) => void;
}

export default function PersonTable({
  persons,
  loading,
  selectMode,
  selectedIds,
  toggleSelect,
  handleSelectAll,
  handleDelete,
  handleUpdateStatus,
  handleExportPDF,
}: Props) {
  const navigate = useNavigate();

  const hasReturnDate = persons.some(
    (p) => p.status === 4,
  );

  const hasDeleteDate = persons.some(
    (p) => p.status === 4 && p.deleteAt,
  );

  const hasSendButton = persons.some(
    (p) => p.status < 4,
  );

  // =========================================================
  // COLUMN COUNT
  // =========================================================
  const columnCount =
    (selectMode ? 1 : 0) +
    11 +
    (hasReturnDate ? 1 : 0) +
    (hasDeleteDate ? 1 : 0) +
    (hasSendButton ? 1 : 0);

  // =========================================================
  // ICON
  // =========================================================
  const Icon = ({
    type,
    size = 17,
  }: {
    type: string;
    size?: number;
  }) => {
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

    return null;
  };

  // =========================================================
  // PDF
  // =========================================================
  const exportPDF = (p: any) => {
    if (p.status < 1) {
      Swal.fire({
        icon: "warning",
        title: "ไม่สามารถดำเนินการได้",
        text: "กรุณากดปุ่ม 'เตรียมเอกสารส่ง พฐ' ก่อน",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#800020",
      });

      return;
    }

    handleExportPDF(p);
  };

  // =========================================================
  // LOADING
  // =========================================================
  if (loading) {
    return (
      <div className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="flex min-h-[300px] flex-col items-center justify-center">

          <div className="
            h-10
            w-10
            animate-spin
            rounded-full
            border-4
            border-gray-200
            border-t-[#800020]
          " />

          <p className="mt-4 text-sm font-semibold text-gray-500">
            กำลังโหลดข้อมูล...
          </p>

        </div>

      </div>
    );
  }

  // =========================================================
  // EMPTY
  // =========================================================
  if (persons.length === 0) {
    return (
      <div className="
        flex
        min-h-[300px]
        flex-col
        items-center
        justify-center
        bg-white
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
          bg-gray-50
          text-gray-300
        ">

          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 3.5h8l4 4V20H6z" />
            <path d="M14 3.5V8h4" />
            <path d="M9 12h6" />
            <path d="M9 15.5h4" />
          </svg>

        </div>

        <p className="
          mt-4
          text-base
          font-bold
          text-gray-700
        ">
          ไม่พบข้อมูล
        </p>

        <p className="
          mt-1
          text-xs
          text-gray-400
        ">
          ไม่มีรายการที่ตรงกับเงื่อนไข
        </p>

      </div>
    );
  }

  return (
    <div className="w-full">

      {/* =====================================================
          TABLE SCROLL
      ===================================================== */}
      <div className="
        w-full
        overflow-x-auto
        [-ms-overflow-style:none]
        [scrollbar-width:thin]
      ">

        <table className="
          w-full
          min-w-[1500px]
          border-collapse
          text-sm
        ">

          {/* =================================================
              HEADER
          ================================================= */}
          <thead>

            <tr className="
              border-b
              border-[#650017]
              bg-gradient-to-r
              from-[#720019]
              to-[#800020]
              text-white
            ">

              {/* Select */}
              {selectMode && (
                <th className="
                  sticky
                  left-0
                  z-20
                  w-[55px]
                  border-r
                  border-white/10
                  bg-[#720019]
                  px-3
                  py-4
                ">

                  <label className="
                    flex
                    cursor-pointer
                    items-center
                    justify-center
                  ">

                    <input
                      type="checkbox"
                      checked={
                        selectedIds.length ===
                          persons.filter(
                            (p) => p.status < 4,
                          ).length &&
                        persons.length > 0
                      }
                      onChange={handleSelectAll}
                      className="
                        h-4
                        w-4
                        cursor-pointer
                        accent-[#800020]
                      "
                    />

                  </label>

                </th>
              )}

              <th className="
                w-[60px]
                px-3
                py-4
                text-center
                text-xs
                font-bold
              ">
                #
              </th>

              <th className="
                min-w-[190px]
                px-4
                py-4
                text-left
                text-xs
                font-bold
              ">
                ชื่อ และชื่อสกุล
              </th>

              <th className="
                min-w-[220px]
                px-4
                py-4
                text-left
                text-xs
                font-bold
              ">
                เรื่องที่ขออนุญาต
              </th>

              <th className="
                min-w-[200px]
                px-4
                py-4
                text-left
                text-xs
                font-bold
              ">
                หน่วยงาน
              </th>

              <th className="
                w-[100px]
                px-3
                py-4
                text-center
                text-xs
                font-bold
              ">
                เล่มที่
              </th>

              <th className="
                w-[100px]
                px-3
                py-4
                text-center
                text-xs
                font-bold
              ">
                เลขที่
              </th>

              <th className="
                w-[130px]
                px-3
                py-4
                text-center
                text-xs
                font-bold
              ">
                ลงวันที่
              </th>

              <th className="
                min-w-[180px]
                px-4
                py-4
                text-center
                text-xs
                font-bold
              ">
                สถานะ
              </th>

              <th className="
                min-w-[130px]
                px-3
                py-4
                text-center
                text-xs
                font-bold
              ">
                ความเร่งด่วน
              </th>

              {hasReturnDate && (
                <th className="
                  w-[130px]
                  px-3
                  py-4
                  text-center
                  text-xs
                  font-bold
                ">
                  วันคืน
                </th>
              )}

              {hasDeleteDate && (
                <th className="
                  w-[150px]
                  px-3
                  py-4
                  text-center
                  text-xs
                  font-bold
                ">
                  วันหมดอายุเอกสาร
                </th>
              )}

              <th className="
                w-[85px]
                px-2
                py-4
                text-center
                text-xs
                font-bold
              ">
                ดู
              </th>

              <th className="
                w-[130px]
                px-2
                py-4
                text-center
                text-xs
                font-bold
              ">
                PDF
              </th>

              <th className="
                w-[85px]
                px-2
                py-4
                text-center
                text-xs
                font-bold
              ">
                แก้ไข
              </th>

              <th className="
                w-[85px]
                px-2
                py-4
                text-center
                text-xs
                font-bold
              ">
                ลบ
              </th>

              {hasSendButton && (
                <th className="
                  min-w-[140px]
                  px-2
                  py-4
                  text-center
                  text-xs
                  font-bold
                ">
                  ส่ง
                </th>
              )}

            </tr>

          </thead>

          {/* =================================================
              BODY
          ================================================= */}
          <tbody>

            {persons.map((p, i) => {

              const selected = selectedIds.includes(
                p.personId,
              );

              return (
                <tr
                  key={p.personId}
                  className={`
                    border-b
                    border-gray-100
                    transition-colors

                    ${
                      selected
                        ? "bg-[#800020]/5"
                        : i % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50/70"
                    }

                    hover:bg-[#800020]/5
                  `}
                >

                  {/* Select */}
                  {selectMode && (
                    <td className="
                      sticky
                      left-0
                      z-10
                      border-r
                      border-gray-100
                      px-3
                      py-3
                      text-center
                      backdrop-blur-sm
                    ">

                      {p.status < 4 && (
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
                            h-4
                            w-4
                            cursor-pointer
                            accent-[#800020]
                          "
                        />
                      )}

                    </td>
                  )}

                  {/* Number */}
                  <td className="
                    px-3
                    py-4
                    text-center
                    text-xs
                    font-semibold
                    text-gray-500
                  ">
                    {i + 1}
                  </td>

                  {/* Name */}
                  <td className="
                    px-4
                    py-4
                    text-left
                  ">

                    <div className="
                      max-w-[190px]
                    ">

                      <p className="
                        break-words
                        text-sm
                        font-bold
                        leading-5
                        text-gray-900
                      ">
                        {p.fullName || "-"}
                      </p>

                      <p className="
                        mt-1
                        text-[9px]
                        text-gray-400
                      ">
                        ID: {p.personId || "-"}
                      </p>

                    </div>

                  </td>

                  {/* Purpose */}
                  <td className="
                    max-w-[230px]
                    whitespace-normal
                    break-words
                    px-4
                    py-4
                    text-left
                    text-xs
                    leading-5
                    text-gray-700
                  ">
                    {p.purpose || "-"}
                  </td>

                  {/* Agency */}
                  <td className="
                    max-w-[210px]
                    whitespace-normal
                    break-words
                    px-4
                    py-4
                    text-left
                    text-xs
                    leading-5
                    text-gray-700
                  ">
                    {p.requestingAgency || "-"}
                  </td>

                  {/* Book */}
                  <td className="
                    px-3
                    py-4
                    text-center
                    text-sm
                    font-bold
                    text-gray-800
                  ">
                    {p.receiptBookNo || "-"}
                  </td>

                  {/* Number */}
                  <td className="
                    px-3
                    py-4
                    text-center
                    text-sm
                    font-bold
                    text-gray-800
                  ">
                    {p.receiptNo || "-"}
                  </td>

                  {/* Date */}
                  <td className="
                    whitespace-nowrap
                    px-3
                    py-4
                    text-center
                    text-xs
                    font-semibold
                    text-gray-600
                  ">
                    {formatThaiDate(p.receiptDate)}
                  </td>

                  {/* Status */}
                  <td className="
                    px-4
                    py-4
                    text-center
                  ">
                    <div className="
                      inline-flex
                      min-w-[150px]
                      justify-center
                    ">
                      {renderStatus(p.status)}
                    </div>
                  </td>

                  {/* Priority */}
                  <td className="
                    px-3
                    py-4
                    text-center
                  ">
                    {renderPriority(p.priority ?? 0)}
                  </td>

                  {/* Return Date */}
                  {hasReturnDate && (
                    <td className="
                      whitespace-nowrap
                      px-3
                      py-4
                      text-center
                      text-xs
                      font-semibold
                      text-red-600
                    ">
                      {p.status === 4
                        ? formatThaiDate(
                            p.returnDate,
                          )
                        : "-"}
                    </td>
                  )}

                  {/* Delete Date */}
                  {hasDeleteDate && (
                    <td className="
                      whitespace-nowrap
                      px-3
                      py-4
                      text-center
                      text-xs
                      font-semibold
                      text-red-600
                    ">
                      {p.status === 4 && p.deleteAt
                        ? formatThaiDate(
                            p.deleteAt,
                          )
                        : "-"}
                    </td>
                  )}

                  {/* =================================================
                      VIEW
                  ================================================= */}
                  <td className="px-2 py-4 text-center">

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/person/${p.personId}`,
                        )
                      }
                      title="ดูข้อมูล"
                      className="
                        inline-flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-blue-50
                        text-blue-600
                        transition

                        hover:bg-blue-100
                        active:scale-95
                      "
                    >
                      <Icon type="eye" />
                    </button>

                  </td>

                  {/* =================================================
                      PDF
                  ================================================= */}
                  <td className="px-2 py-4 text-center">

                    <button
                      type="button"
                      onClick={() => exportPDF(p)}
                      title="PDF แบบพิมพ์มือ"
                      className="
                        inline-flex
                        h-9
                        items-center
                        justify-center
                        gap-1.5
                        rounded-lg
                        bg-indigo-50
                        px-3
                        text-[10px]
                        font-bold
                        text-indigo-700
                        transition

                        hover:bg-indigo-100
                        active:scale-95
                      "
                    >
                      <Icon type="pdf" />

                      PDF
                    </button>

                  </td>

                  {/* =================================================
                      EDIT
                  ================================================= */}
                  <td className="px-2 py-4 text-center">

                    {p.status < 4 ? (
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/person/edit/${p.personId}`,
                          )
                        }
                        title="แก้ไข"
                        className="
                          inline-flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          bg-amber-50
                          text-amber-600
                          transition

                          hover:bg-amber-100
                          active:scale-95
                        "
                      >
                        <Icon type="edit" />
                      </button>
                    ) : (
                      <span className="
                        text-xs
                        text-gray-300
                      ">
                        -
                      </span>
                    )}

                  </td>

                  {/* =================================================
                      DELETE
                  ================================================= */}
                  <td className="px-2 py-4 text-center">

                    <button
                      type="button"
                      onClick={() => handleDelete(p)}
                      title="ลบ"
                      className="
                        inline-flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-red-50
                        text-red-600
                        transition

                        hover:bg-red-100
                        active:scale-95
                      "
                    >
                      <Icon type="delete" />
                    </button>

                  </td>

                  {/* =================================================
                      SEND
                  ================================================= */}
                  {hasSendButton && (
                    <td className="px-2 py-4 text-center">

                      {p.status < 4 ? (
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateStatus(p)
                          }
                          className={`
                            inline-flex
                            min-w-[120px]
                            items-center
                            justify-center
                            rounded-lg
                            px-3
                            py-2
                            text-[10px]
                            font-bold
                            transition
                            active:scale-[0.98]

                            ${getStatusButtonStyle(
                              p.status,
                            )}
                          `}
                        >
                          {getStatusButton(
                            p.status,
                          )}
                        </button>
                      ) : (
                        <span className="
                          text-xs
                          text-gray-300
                        ">
                          -
                        </span>
                      )}

                    </td>
                  )}

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      {/* =====================================================
          TABLE FOOTER
      ===================================================== */}
      <div className="
        flex
        flex-col
        gap-2
        border-t
        border-gray-100
        bg-gray-50
        px-4
        py-3

        min-[768px]:flex-row
        min-[768px]:items-center
        min-[768px]:justify-between
      ">

        <p className="
          text-[10px]
          text-gray-400
        ">
          แสดงข้อมูลทั้งหมด{" "}
          <span className="font-bold text-gray-600">
            {persons.length.toLocaleString("th-TH")}
          </span>{" "}
          รายการ
        </p>

        <p className="
          text-[10px]
          text-gray-400
        ">
          เลื่อนซ้าย-ขวาเพื่อดูข้อมูลเพิ่มเติม
        </p>

      </div>

    </div>
  );
}