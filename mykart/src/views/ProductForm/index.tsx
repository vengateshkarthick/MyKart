import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addProduct,
  fetchProductDetails,
  updateProduct,
} from "../../reducer/store";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import Dropdown from "../../components/Dropdown";
import CalendarPicker from "../../components/CalendarPicker";
import { catogeries } from "../../shared/constants/categories";
import addProductIcon from "../../assets/formImg.jpg";
import { toast } from "react-toastify";
import { productKeys } from "../../components/List/type";

const requiredFields = [
  "cp",
  "sp",
  "discount_percentage",
  "name",
  "expiry",
  "category",
  "final_price",
  "description",
];

function CreateOrEditProduct() {
  const { selectedProduct } = useSelector(
    (state: any) => state?.prodcuts
  ) as any;
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filterOptions = React.useMemo(() => catogeries, []);

  React.useEffect(() => {
    if (id !== "create") {
      dispatch(fetchProductDetails(id));
    }
  }, [id]);

  React.useEffect(() => {
    if ((selectedProduct?.id as string) && filterOptions.length) {
      const { category, ...rest } = selectedProduct;
      const ctg = filterOptions.find(
        (opt) => opt.id.toLowerCase() === category.toLowerCase()
      );
      setFormData(() => ({
        category: ctg ? [ctg] : [],
        ...rest,
      }));
    }
  }, [selectedProduct, filterOptions]);

  const onCreateProduct = (payload: any) => {
    toast("Successfully added a product", {
      position: "top-right",
      theme: "colored",
      type: "success",
      autoClose: 2000,
    });
    dispatch(addProduct(payload));
    navigate("/home", { replace: true });
  };

  const onUpdateProduct = (payload: any) => {
    toast("Suceesfully updated the product", {
      position: "top-right",
      theme: "colored",
      type: "success",
      autoClose: 2000,
    });
    dispatch(updateProduct(payload));
    navigate("/home", { replace: true });
  };

  const createPayload = (data: any) => {
    return {
      ...formData,
      category: data.category?.[0]?.id,
    };
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e?.preventDefault();
    if (
      requiredFields.every((field) => Boolean(formData?.[field as productKeys]))
    ) {
      const payload = createPayload(formData);
      if (id === "create") {
        onCreateProduct(payload);
      } else {
        onUpdateProduct(payload);
      }
    }
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCategory = (category: { id: string; label: string }[]) => {
    handleFormChange("category", category);
  };

  // converting discount percentage to final price
  const handleDiscount = (discount: string) => {
    const discount_amount =
      Number((Number(discount) / 100).toFixed(2)) * formData.sp;
    handleFormChange("discount_percentage", discount);
    handleFormChange("final_price", (formData.sp - discount_amount).toString());
  };

  const submuitBtnLabel = selectedProduct?.id ? "Update" : "Save";

  const today = new Date().toISOString().slice(0, 10);

  const handleNumericInput: React.KeyboardEventHandler<
    Omit<HTMLInputElement, "date">
  > = (e) => {
    const allowOnlyNum = Array.from(new Array(10), (_, idx) => idx.toString());
    const allowFunc = ["Backspace", "ArrowLeft", "ArrowRight"];
    if (!allowOnlyNum.includes(e.key) && !allowFunc.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="relative top-10 m-auto h-[80vh] w-[80vw] flex justify-start items-center border rounded-md border-slate-300">
      <div className="h-full w-[40%]">
        <img src={addProductIcon} alt="add product" className="h-full w-full" />
      </div>
      <form
        className="form w-[65%] flex flex-col gap-6 items-start justify-start h-full overflow-y-auto p-4"
        onSubmit={handleSubmit}
      >
        <div className="font-normal text-left text-xl font-[Poppins]">
          {id !== "create"
            ? "Edit the product details..."
            : "Create new product"}
        </div>
        <TextInput
          name="name"
          key="name"
          onTextInputChange={(val) => handleFormChange("name", val)}
          value={formData?.name || ""}
          required
          className="w-4/5"
          placeholder="name"
          label="Product Name"
        />

        <article className="h-full w-full">
          <article className="py-2 text-sm font-normal font-[Poppins] text-nowrap">
            Description
          </article>
          <textarea
            name="description"
            key="description"
            onChange={({ target: { value } }) =>
              handleFormChange("description", value)
            }
            value={formData?.description}
            required
            className="border p-[1.5] border-slate-200 text-sm resize-none w-full focus:border-blue-700"
            placeholder="description"
            rows={3}
            maxLength={500}
          />
        </article>

        <div className="flex justify-start items-start w-full gap-2">
          <div className="flex flex-col gap-4 items-start justify-start">
            <div className="font-normal text-left text-sm font-[Poppins]">
              Select Category
            </div>
            <Dropdown
              onSelect={(opt) => handleCategory(opt)}
              options={filterOptions}
              selected={formData?.category || []}
              key="category"
              size="sm"
              isMultiSelect={false}
            />
          </div>

          <CalendarPicker
            date={formData?.expiry}
            onSelect={(date) => handleFormChange("expiry", date)}
            label="Expiry date"
          />
        </div>

        <div className="h-auto w-full flex justify-between items-center flex-wrap">
          <TextInput
            name="cp"
            key="cp"
            onTextInputChange={(val) => handleFormChange("cp", val)}
            value={formData?.cp || ""}
            // inputMode="numeric"
            onKeyDown={handleNumericInput}
            required
            label="Cost Price"
            placeholder=""
          />

          <TextInput
            name="sp"
            key="sp"
            onTextInputChange={(val) => handleFormChange("sp", val)}
            value={formData?.sp || ""}
            // inputMode="decimal"
            onKeyDown={handleNumericInput}
            required
            label="Selling Price"
            placeholder=""
          />
          <TextInput
            label="Discount Percentage %"
            name="dp"
            key="dp"
            onTextInputChange={(val) => handleDiscount(val)}
            value={formData?.discount_percentage || ""}
            // inputMode="decimal"
            onKeyDown={handleNumericInput}
            required
            placeholder=""
          />
        </div>

        <TextInput
          label="Final Price"
          name="final_price"
          key="final_price"
          className="w-1/2"
          onTextInputChange={(val) => handleDiscount(val)}
          value={formData?.final_price || 0}
          // inputMode="decimal"
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
