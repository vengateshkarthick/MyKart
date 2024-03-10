import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../../reducer/store";
import Button from "../../components/Button";
import TextArea from "../../components/TextInput";
import Dropdown from "../../components/Dropdown";
import CalendarPicker from "../../components/CalendarPicker";
import { catogeries } from "../../shared/constants/categories";
import addProductIcon from "../../assets/formImg.jpg";
import { IProductData } from "../../shared/list.type";

function CreateOrEditProduct() {
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state) => state) as {
    selectedProduct: IProductData;
  };

  const filterOptions = React.useMemo(() => catogeries, []);

  const [filter, setFilter] = React.useState<
    { id: string; label: string }[] | null
  >([]);

  React.useEffect(() => {
    if (dispatch && id !== "create") {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  React.useEffect(() => {
    if (selectedProduct?.id) {
      setFormData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e?.preventDefault();
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCategory = (category: { id: string; label: string }[]) => {
    handleFormChange("category", category[0].id);
    setFilter(() => category);
  };

  // converting discount percentage to final price
  const handleDiscount = (discount: string) => {
    const discount_amount =
      Number((Number(discount) / 100).toFixed(2)) * formData.sp;
    handleFormChange("final_price", (formData.sp - discount_amount).toString());
    handleFormChange("discount_percentage", discount);
  };

  const submuitBtnLabel = selectedProduct?.id ? "Update" : "Save";

  const today = new Date().toISOString().slice(0, 10);

  const handleNumericInput: React.KeyboardEventHandler<
    Omit<HTMLInputElement, "date">
  > = (e) => {
    
    if (e.keyCode >= 48 && e.keyCode <= 57) {
      return true;
    }

    return false;
  };

  return (
    <div className="h-[70vh] flex border border-zinc-100 mx-auto container">
      <div className="h-full w-1/2">
        <img src={addProductIcon} alt="add product" className="h-full w-full" />
      </div>
      <form
        className="form flex flex-col gap-2 h-[80%] overflow-y-auto"
        onSubmit={handleSubmit}
      >
        <TextArea
          name="name"
          key="name"
          onTextInputChange={(val) => handleFormChange("name", val)}
          value={formData?.name || ""}
          required
          className="w-1/2"
        />
        <Dropdown
          isMultiSelect={false}
          onSelect={(opt) => handleCategory(opt)}
          options={filterOptions}
          label="Select Category"
          selected={filter}
          key="category"
        />

        <CalendarPicker
          date={formData?.expiry || today}
          onSelect={(date) => handleFormChange("expiry", date)}
          label="Expiry date"
        />

        <div className="h-auto w-full flex justify-between items-center flex-wrap">
          <TextArea
            name="Cost Price"
            key="cp"
            onTextInputChange={(val) => handleFormChange("cp", val)}
            value={formData?.cp || 0}
            inputMode="decimal"
            onKeyDown={handleNumericInput}
            required
          />

          <TextArea
            name="Selling Price"
            key="sp"
            onTextInputChange={(val) => handleFormChange("cp", val)}
            value={formData?.sp || 0}
            inputMode="decimal"
            onKeyDown={handleNumericInput}
            required
          />
          <TextArea
            name="Discount Percentage %"
            key="sp"
            onTextInputChange={(val) => handleDiscount(val)}
            value={formData?.discount_percentage || 0}
            inputMode="decimal"
            onKeyDown={handleNumericInput}
            required
          />
        </div>

        <TextArea
          name="Final Price"
          key="final_price"
          className="w-1/2"
          onTextInputChange={(val) => handleDiscount(val)}
          value={formData?.final_price || 0}
          inputMode="decimal"
          pattern="+[\d]"
          readOnly
        />

        <Button
          label={submuitBtnLabel}
          onClick={() => {}}
          isSubmitBtn
          variant="filled"
          code="success"
        />
      </form>
    </div>
  );
}

export default CreateOrEditProduct;
