import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";

import usePersonForm from "../hooks/usePersonForm";
import { useReceipt } from "../hooks/useReceipt";

import BasicInfo from "../components/person/BasicInfo";
import AdditionalInfo from "../components/person/AdditionalInfo";
import ReceiptInfo from "../components/person/ReceiptInfo";

export default function PersonPage() {

  const navigate = useNavigate();

  const {
    form,
    setForm,
    handleChange,
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

  const { receiptNumbers } = useReceipt(form, setForm);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const firstName = form.firstName?.trim();
    const lastName = form.lastName?.trim();

    if (!firstName || !lastName) {
      Swal.fire("กรอกชื่อ-นามสกุลให้ครบ");
      return;
    }

    try {
      await api.post("/person", form);
      await Swal.fire({ icon: "success", title: "บันทึกสำเร็จ" });
      navigate("/person/status0");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: err.response?.data?.error || "ไม่สามารถบันทึกได้",
      });
    }
  };

  return (
    <div
      className="p-4"
    >
      <h2 className="textAlign-justify text-center">สร้างข้อมูลบุคคล</h2>

      <form onSubmit={handleSubmit}>
        <BasicInfo form={form} handleChange={handleChange} />

        <AdditionalInfo
          form={form}
          handleChange={handleChange}
          months={months}
          years={years}
          nationalities={nationalities}
          ethnicities={ethnicities}
          bodyTypes={bodyTypes}
          skinColors={skinColors}
          filteredHeights={filteredHeights}
          filteredWeights={filteredWeights}
          filteredDays={filteredDays}
        />

        <ReceiptInfo
          form={form}
          handleChange={handleChange}
          receiptNumbers={receiptNumbers}
          setForm={setForm}
        />

        <div className="text-end">
          <button className="btn btn-primary px-4">บันทึกข้อมูล</button>
        </div>
      </form>
    </div>
  );
}
