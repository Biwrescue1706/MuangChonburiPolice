import { useNavigate } from "react-router-dom";
import usePersonForm from "../../hooks/usePersonForm";

import BasicInfo from "../../components/person/BasicInfo";
import AdditionalInfo from "../../components/person/AdditionalInfo";
import ReceiptInfo from "../../components/person/ReceiptInfo";

export default function PersonPage() {
  const navigate = useNavigate();

  const {
    form,
    setForm,
    handleChange,
    handleSubmit,
    receiptNumbers,
    months,
    years,
    nationalities,
    ethnicities,
    bodyTypes,
    skinColors,
    filteredHeights,
    filteredWeights,
    filteredDays,
  } = usePersonForm(navigate);

  return (
    <div className="p-4 main-content" >
      <h2 className="text-center">สร้างข้อมูลบุคคล</h2>

      <form onSubmit={handleSubmit}>
        {/* 🔹 ข้อมูลพื้นฐาน */}
        <BasicInfo
          form={form}
          filteredDays={filteredDays}
          months={months}
          years={years}
          handleChange={handleChange}
        />

        {/* 🔹 ข้อมูลเพิ่มเติม */}
        <AdditionalInfo
          form={form}
          handleChange={handleChange}
          nationalities={nationalities}
          ethnicities={ethnicities}
          bodyTypes={bodyTypes}
          skinColors={skinColors}
          filteredHeights={filteredHeights}
          filteredWeights={filteredWeights}
        />

        {/* 🔹 ใบเสร็จ */}
        <ReceiptInfo
          form={form}
          handleChange={handleChange}
          receiptNumbers={receiptNumbers}
          setForm={setForm}
          months={months} // 🔥 สำคัญ
          years={years} // 🔥 สำคัญ
        />

        {/* ปุ่มบันทึก */}
        <div className="text-end">
          <button className="btn btn-primary px-4">บันทึกข้อมูล</button>
        </div>
      </form>
    </div>
  );
}
