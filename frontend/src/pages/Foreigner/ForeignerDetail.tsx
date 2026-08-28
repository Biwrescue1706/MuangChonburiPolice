import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import api from "../../api/axios";

import type { Foreigner } from "../../types/foreigner";

const MONTHS = [
  "",
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

function formatThaiDate(value: string | null | undefined) {
  if (!value) return "-";

  const text = String(value).trim();

  const match = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);

  if (!match) return text;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return text;
  }

  return `${day} ${MONTHS[month]} ${year + 543}`;
}

function formatMoney(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return String(value);
  }

  return number.toLocaleString("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

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

export default function ForeignerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState<Foreigner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/foreigner/${id}`);

      if (response.data?.success) {
        setData(response.data.data);
      } else {
        throw new Error("ไม่พบข้อมูล");
      }
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

  const handleDelete = async () => {
    if (!data) return;

    const result = await Swal.fire({
      icon: "warning",
      title: "ยืนยันการลบ",
      html: `
        ต้องการลบข้อมูล<br>
        <strong>${data.name}</strong>
        ใช่หรือไม่?
      `,
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

      Swal.fire({
        icon: "error",
        title: "ลบข้อมูลไม่สำเร็จ",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-sm text-slate-500">กำลังโหลดข้อมูล...</div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-6">
      <div className="mx-auto max-w-7xl">
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

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#800020] md:text-3xl">
            รายละเอียดบุคคลต่างด้าว
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-500 md:text-base">
            ลำดับ {data.sequenceNo ?? "-"}
            {" / "}
            ปี พ.ศ. {data.year ?? "-"}
          </p>

          <div className="mt-5 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate(`/foreigner/edit/${data.id}`)}
              title="แก้ไขข้อมูล"
              aria-label="แก้ไขข้อมูล"
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-sm transition hover:bg-blue-100 hover:shadow-md"
            >
              <Pencil size={21} strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={handleDelete}
              title="ลบข้อมูล"
              aria-label="ลบข้อมูล"
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 shadow-sm transition hover:bg-red-100 hover:shadow-md"
            >
              <Trash2 size={21} strokeWidth={2} />
            </button>
          </div>
        </div>

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 border-l-4 border-[#800020] pl-3 text-lg font-bold text-[#800020]">
            ข้อมูลบุคคล
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DetailItem
              label="รหัสประจำตัวคนต่างด้าว"
              value={data.foreignerIdNo}
            />

            <DetailItem label="ชื่อ แซ่" value={data.name} />

            <DetailItem
              label="อายุ"
              value={data.age !== null ? `${data.age} ปี` : null}
            />

            <DetailItem label="สัญชาติ" value={data.nationality} />

            <DetailItem label="เชื้อชาติ" value={data.ethnicity} />
          </div>
        </section>

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

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 border-l-4 border-[#800020] pl-3 text-lg font-bold text-[#800020]">
            การขอรับ / ขอรับใบแทน / ขอต่ออายุ
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <DetailItem label="ชนิด" value={data.applicationType} />

            <DetailItem
              label="วัน เดือน ปี"
              value={formatThaiDate(data.applicationDate)}
            />

            <DetailItem
              label="วันหมดอายุ"
              value={formatThaiDate(data.expirationDate)}
            />
          </div>
        </section>

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

            <DetailItem label="ใบเสร็จเล่มที่" value={data.receiptBookNo} />

            <DetailItem label="ใบเสร็จเลขที่" value={data.receiptNo} />

            <DetailItem
              label="วัน เดือน ปี ของใบเสร็จ"
              value={formatThaiDate(data.receiptDate)}
            />
          </div>
        </section>

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
