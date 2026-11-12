
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  FileText,
  UserRound,
  FileBadge,
  MapPin,
  CalendarDays,
  Wallet,
  ClipboardList,
  LoaderCircle,
  ShieldCheck,
  ChevronRight,
  ReceiptText,
} from "lucide-react";

import api from "../../api/axios";
import type { Foreigner } from "../../types/foreigner";
import { generateTorTor8 } from "./generateTorTor8";

function formatThaiDate(value: string | null | undefined) {
  if (!value) return "-";
  return String(value).trim();
}

function formatMoney(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") return "-";
  const number = Number(value);
  if (Number.isNaN(number)) return String(value);
  return number.toLocaleString("th-TH");
}

function getFullName(data: Foreigner) {
  if (data.fullName) return data.fullName;
  return (
    [data.prefix, data.firstName, data.lastName].filter(Boolean).join(" ") ||
    "-"
  );
}

function DetailItem({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | number | null | undefined;
  highlight?: boolean;
}) {
  const displayValue =
    value !== null && value !== undefined && value !== "" ? value : "-";

  return (
    <div className="min-w-0 rounded-xl border border-slate-100 bg-[#faf9f8] px-4 py-3.5 transition hover:border-[#85263f]/20 hover:bg-white">
      <p className="mb-1.5 text-xs font-medium text-slate-400">{label}</p>
      <p
        className={`break-words text-sm font-semibold ${
          highlight ? "text-[#85263f]" : "text-slate-700"
        }`}
      >
        {displayValue}
      </p>
    </div>
  );
}

function Section({
  title,
  subtitle,
  icon,
  color,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}
        >
          {icon}
        </div>
        <div>
          <h2 className="font-bold text-slate-800">{title}</h2>
          <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

export default function ForeignerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState<Foreigner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

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
          confirmButtonColor: "#85263f",
        });

        navigate("/foreigner");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, navigate]);

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
        confirmButtonColor: "#85263f",
      });
    }
  };

  const handleDelete = async () => {
    if (!data) return;

    const result = await Swal.fire({
      icon: "warning",
      title: "ยืนยันการลบข้อมูล",
      html: `
        <div style="font-size:14px;color:#64748b;margin-top:8px">
          คุณต้องการลบข้อมูลของ
        </div>
        <div style="font-size:18px;font-weight:700;color:#85263f;margin-top:8px">
          ${getFullName(data)}
        </div>
        <div style="font-size:13px;color:#94a3b8;margin-top:8px">
          เมื่อลบแล้วจะไม่สามารถเรียกคืนข้อมูลได้
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "ยืนยันลบข้อมูล",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      reverseButtons: true,
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
        confirmButtonColor: "#85263f",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f5f3]">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#85263f]/10 text-[#85263f]">
            <LoaderCircle size={28} className="animate-spin" />
          </div>
          <p className="text-sm font-medium text-slate-500">
            กำลังโหลดข้อมูล...
          </p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const fullName = getFullName(data);

  return (
    <div className="min-h-screen bg-[#f7f5f3] px-3 py-5 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Navigation */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate("/foreigner")}
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-[#85263f] hover:text-[#85263f]"
          >
            <ArrowLeft
              size={17}
              className="transition-transform group-hover:-translate-x-1"
            />
            กลับหน้าประวัติ
          </button>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>บุคคลต่างด้าว</span>
            <ChevronRight size={13} />
            <span className="font-semibold text-[#85263f]">รายละเอียด</span>
          </div>
        </div>

        {/* Profile header */}
        <div className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#6f1933] via-[#85263f] to-[#a34456] px-5 py-7 text-white shadow-lg shadow-[#85263f]/10 sm:px-8">
          <div className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full border-[35px] border-white/5" />
          <div className="pointer-events-none absolute -bottom-24 right-52 h-56 w-56 rounded-full bg-white/5" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15">
                <UserRound size={32} />
              </div>

              <div className="min-w-0">
                <div className="mb-1 flex items-center gap-2 text-xs text-white/70">
                  <ShieldCheck size={14} />
                  ข้อมูลบุคคลในระบบ
                </div>

                <h1 className="break-words text-2xl font-bold sm:text-3xl">
                  {fullName}
                </h1>

                <p className="mt-2 text-sm text-white/75">
                  ลำดับ {data.sequenceNo ?? "-"} / ปี พ.ศ. {data.year ?? "-"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleGenerateTorTor8}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <FileText size={18} />
                ออก PDF ทต.8
              </button>

              <button
                type="button"
                onClick={() => navigate(`/foreigner/edit/${data.id}`)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#85263f] shadow-sm transition hover:bg-rose-50"
              >
                <Pencil size={17} />
                แก้ไขข้อมูล
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500/15 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-red-500/30"
              >
                <Trash2 size={17} />
                ลบข้อมูล
              </button>
            </div>
          </div>
        </div>

        {/* Personal information */}
        <div className="mb-5">
          <Section
            title="ข้อมูลบุคคล"
            subtitle="ข้อมูลประจำตัวและรายละเอียดส่วนบุคคล"
            icon={<UserRound size={20} />}
            color="bg-rose-50 text-[#85263f]"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <DetailItem
                label="รหัสประจำตัวคนต่างด้าว"
                value={data.foreignerIdNo}
                highlight
              />
              <DetailItem label="ชื่อ-นามสกุล" value={fullName} />
              <DetailItem
                label="อายุ"
                value={data.age !== null ? `${data.age} ปี` : null}
              />
              <DetailItem label="สัญชาติ" value={data.nationality} />
              <DetailItem label="เชื้อชาติ" value={data.ethnicity} />
            </div>
          </Section>
        </div>

        {/* Certificate */}
        <div className="mb-5">
          <Section
            title="ใบสำคัญ"
            subtitle="รายละเอียดทะเบียนและวันที่ออกใบสำคัญ"
            icon={<FileBadge size={20} />}
            color="bg-sky-50 text-sky-700"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <DetailItem
                label="เลขทะเบียนของใบสำคัญ"
                value={data.certificateRegistrationNo}
              />
              <DetailItem
                label="วัน เดือน ปี ของใบสำคัญ"
                value={formatThaiDate(data.certificateDate)}
              />
            </div>
          </Section>
        </div>

        {/* Location */}
        <div className="mb-5">
          <Section
            title="สถานที่ออกใบสำคัญ"
            subtitle="ข้อมูลพื้นที่และภูมิลำเนาที่เกี่ยวข้อง"
            icon={<MapPin size={20} />}
            color="bg-emerald-50 text-emerald-700"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <DetailItem label="อำเภอ" value={data.district} />
              <DetailItem label="จังหวัด" value={data.province} />
              <DetailItem label="ภูมิลำเนา" value={data.domicile} />
            </div>
          </Section>
        </div>

        {/* Application */}
        <div className="mb-5">
          <Section
            title="ข้อมูลการขอรับและต่ออายุ"
            subtitle="รายละเอียดคำร้องและระยะเวลาของใบสำคัญ"
            icon={<CalendarDays size={20} />}
            color="bg-amber-50 text-amber-700"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
                highlight
              />
            </div>
          </Section>
        </div>

        {/* Payment */}
        <div className="mb-5">
          <Section
            title="ค่าธรรมเนียมและใบเสร็จรับเงิน"
            subtitle="ข้อมูลการชำระเงินและหลักฐานการรับเงิน"
            icon={<Wallet size={20} />}
            color="bg-violet-50 text-violet-700"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <DetailItem
                label="จำนวนเงิน"
                value={
                  data.amount !== null
                    ? `${formatMoney(data.amount)} บาท`
                    : null
                }
                highlight
              />
              <DetailItem
                label="ค่าธรรมเนียมตัวอักษร"
                value={data.amountText}
              />
              <DetailItem label="ใบเสร็จเล่มที่" value={data.receiptBookNo} />
              <DetailItem label="ใบเสร็จเลขที่" value={data.receiptNo} />
              <DetailItem
                label="วัน เดือน ปี ของใบเสร็จ"
                value={formatThaiDate(data.receiptDate)}
              />
            </div>
          </Section>
        </div>

        {/* Other */}
        <div className="mb-6">
          <Section
            title="ข้อมูลอื่น ๆ"
            subtitle="เลขที่เอกสารและข้อมูลการยื่นคำร้อง"
            icon={<ClipboardList size={20} />}
            color="bg-orange-50 text-orange-700"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <DetailItem label="เลขใบสำคัญฯ" value={data.certificateNo} />
              <DetailItem
                label="วันที่ยื่นคำร้อง"
                value={formatThaiDate(data.petitionDate)}
              />
            </div>
          </Section>
        </div>

        {/* Bottom actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ReceiptText size={17} className="text-[#85263f]" />
            <span>
              รายการที่ {data.sequenceNo ?? "-"} / {data.year ?? "-"}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => navigate("/foreigner")}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              กลับหน้าประวัติ
            </button>

            <button
              type="button"
              onClick={handleGenerateTorTor8}
              className="inline-flex items-center gap-2 rounded-xl bg-[#85263f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6f1933]"
            >
              <FileText size={16} />
              ออก PDF ทต.8
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
