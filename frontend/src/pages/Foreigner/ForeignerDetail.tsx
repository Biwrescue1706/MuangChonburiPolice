import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { ArrowLeft, Pencil, Trash2, FileText } from "lucide-react";
import api from "../../api/axios";
import type { Foreigner } from "../../types/foreigner";
import { generateTorTor8 } from "./generateTorTor8";

// FORMAT DATE
function formatThaiDate(value: string | null | undefined) {
  if (!value) return "-";
  return String(value).trim();
}

// FORMAT MONEY
function formatMoney(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") return "-";
  const number = Number(value);
  if (Number.isNaN(number)) return String(value);
  return number.toLocaleString("th-TH");
}

// FULL NAME
function getFullName(data: Foreigner) {
  if (data.fullName) return data.fullName;
  return (
    [data.prefix, data.firstName, data.lastName].filter(Boolean).join(" ") ||
    "-"
  );
}

// DETAIL ITEM
function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-1 text-xs font-medium text-slate-400">{label}</div>
      <div className="text-sm font-semibold text-slate-800">
        {value !== null && value !== undefined && value !== "" ? value : "-"}
      </div>
    </div>
  );
}

// PAGE
export default function ForeignerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<Foreigner | null>(null);
  const [loading, setLoading] = useState(true);

  // LOAD DATA
  useEffect(() => {
    if (!id) return;
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/foreigner/${id}`);

      if (!response.data?.success) {
        throw new Error("ไม่พบข้อมูล");
      }

      const result = response.data.data;
      const foreigner: Foreigner | null = Array.isArray(result)
        ? (result[0] ?? null)
        : result;

      if (!foreigner) {
        throw new Error("ไม่พบข้อมูล");
      }

      setData(foreigner);
    } catch (error) {
      console.error("GET FOREIGNER DETAIL ERROR:", error);
      await Swal.fire({
        icon: "error",
        title: "ไม่พบข้อมูล",
        text: "ไม่สามารถค้นหาข้อมูลบุคคลต่างด้าวได้",
        confirmButtonText: "ตกลง",
      });
      navigate("/foreigner");
    } finally {
      setLoading(false);
    }
  };

  // GENERATE PDF
  const handleGenerateTorTor8 = async () => {
    if (!data) return;

    try {
      await generateTorTor8(data);
    } catch (error) {
      console.error("GENERATE ทต.8 ERROR:", error);
      await Swal.fire({
        icon: "error",
        title: "สร้าง PDF ไม่สำเร็จ",
        text:
          error instanceof Error
            ? error.message
            : "ไม่สามารถสร้างเอกสาร ทต.8 ได้",
        confirmButtonText: "ตกลง",
      });
    }
  };

  // DELETE DATA
  const handleDelete = async () => {
    if (!data) return;

    const result = await Swal.fire({
      icon: "warning",
      title: "ยืนยันการลบ",
      html: `ต้องการลบข้อมูล<br><strong>${getFullName(data)}</strong><br>ใช่หรือไม่?`,
      showCancelButton: true,
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/foreigner/${data.id}`);

      await Swal.fire({
        icon: "success",
        title: "ลบข้อมูลสำเร็จ",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/foreigner");
    } catch (error) {
      console.error("DELETE FOREIGNER ERROR:", error);
      await Swal.fire({
        icon: "error",
        title: "ลบข้อมูลไม่สำเร็จ",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-sm text-slate-500">กำลังโหลดข้อมูล...</div>
      </div>
    );
  }

  if (!data) return null;

  const fullName = getFullName(data);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-6">
      <div className="mx-auto max-w-7xl">
        {/* BACK */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate("/foreigner")}
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-[#800020] hover:bg-[#800020] hover:text-white"
          >
            <ArrowLeft
              size={17}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            กลับหน้าประวัติ
          </button>
        </div>

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#800020] md:text-3xl">
            รายละเอียดบุคคลต่างด้าว
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-500 md:text-base">
            ลำดับ {data.sequenceNo ?? "-"} / ปี พ.ศ. {data.year ?? "-"}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {/* PDF */}
            <button
              type="button"
              onClick={handleGenerateTorTor8}
              title="ออก PDF ทต.8"
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-red-50 px-5 text-red-600 shadow-sm transition hover:bg-red-100 hover:shadow-md"
            >
              <FileText size={21} />
              <span className="font-semibold">ออก PDF ทต.8</span>
            </button>

            {/* EDIT */}
            <button
              type="button"
              onClick={() => navigate(`/foreigner/edit/${data.id}`)}
              title="แก้ไขข้อมูล"
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-sm transition hover:bg-blue-100 hover:shadow-md"
            >
              <Pencil size={21} />
            </button>

            {/* DELETE */}
            <button
              type="button"
              onClick={handleDelete}
              title="ลบข้อมูล"
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 shadow-sm transition hover:bg-red-100 hover:shadow-md"
            >
              <Trash2 size={21} />
            </button>
          </div>
        </div>

        {/* PERSON */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 border-l-4 border-[#800020] pl-3 text-lg font-bold text-[#800020]">
            ข้อมูลบุคคล
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DetailItem
              label="รหัสประจำตัวคนต่างด้าว"
              value={data.foreignerIdNo}
            />
            <DetailItem label="ชื่อ-นามสกุล" value={fullName} />
            <DetailItem
              label="อายุ"
              value={data.age !== null ? `${data.age} ปี` : null}
            />
            <DetailItem label="สัญชาติ" value={data.nationality} />
            <DetailItem label="เชื้อชาติ" value={data.ethnicity} />
          </div>
        </section>

        {/* CERTIFICATE */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 border-l-4 border-[#800020] pl-3 text-lg font-bold text-[#800020]">
            ใบสำคัญ
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DetailItem
              label="เลขทะเบียนของใบสำคัญ"
              value={data.certificateRegistrationNo}
            />
            <DetailItem
              label="วัน เดือน ปี ของใบสำคัญ"
              value={formatThaiDate(data.certificateDate)}
            />
          </div>
        </section>

        {/* ISSUE LOCATION */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 border-l-4 border-[#800020] pl-3 text-lg font-bold text-[#800020]">
            ออกให้ ณ
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <DetailItem label="อำเภอ" value={data.district} />
            <DetailItem label="จังหวัด" value={data.province} />
            <DetailItem label="ภูมิลำเนา" value={data.domicile} />
          </div>
        </section>

        {/* APPLICATION */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 border-l-4 border-[#800020] pl-3 text-lg font-bold text-[#800020]">
            การขอรับ / ขอรับใบแทน / ขอต่ออายุ
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <DetailItem label="ชนิด" value={data.applicationType} />
            <DetailItem
              label="วัน เดือน ปี"
              value={formatThaiDate(data.applicationDate)}
            />
            <DetailItem
              label="วันหมดอายุก่อนต่ออายุ"
              value={formatThaiDate(data.previousExpirationDate)}
            />
            <DetailItem
              label="วันหมดอายุใหม่"
              value={formatThaiDate(data.expirationDate)}
            />
          </div>
        </section>

        {/* MONEY */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 border-l-4 border-[#800020] pl-3 text-lg font-bold text-[#800020]">
            ค่าธรรมเนียมและใบเสร็จรับเงิน
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DetailItem
              label="จำนวนเงิน"
              value={
                data.amount !== null ? `${formatMoney(data.amount)} บาท` : null
              }
            />
            <DetailItem label="ค่าธรรมเนียมตัวอักษร" value={data.amountText} />
            <DetailItem label="ใบเสร็จเล่มที่" value={data.receiptBookNo} />
            <DetailItem label="ใบเสร็จเลขที่" value={data.receiptNo} />
            <DetailItem
              label="วัน เดือน ปี ของใบเสร็จ"
              value={formatThaiDate(data.receiptDate)}
            />
          </div>
        </section>

        {/* OTHER */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 border-l-4 border-[#800020] pl-3 text-lg font-bold text-[#800020]">
            อื่น ๆ
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DetailItem label="เลขใบสำคัญฯ" value={data.certificateNo} />
            <DetailItem
              label="วันที่ยื่นคำร้อง"
              value={formatThaiDate(data.petitionDate)}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
