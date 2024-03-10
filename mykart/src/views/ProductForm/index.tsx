import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addProduct, fetchProductDetails } from "../../reducer/store";
import Button from "../../components/Button";
import TextArea from "../../components/TextInput";
import Dropdown from "../../components/Dropdown";
import CalendarPicker from "../../components/CalendarPicker";
import { catogeries } from "../../shared/constants/categories";
import addProductIcon from "../../assets/formImg.jpg";
import { IProductData } from "../../shared/list.type";
import { toast } from "react-toastify";
import { productKeys } from "../../components/List/type";

const requiredFields = ["cp", "sp", "discount_percentage", "name", "expiry", "category", "final_price"];

function CreateOrEditProduct() {
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filterOptions = React.useMemo(() => catogeries, []);

  const [filter, setFilter] = React.useState<
    { id: string; label: string }[] | null
  >([]);

  const { selectedProduct } = useSelector((state: any) => state?.prodcuts) as {
    selectedProduct: IProductData;
  };

  React.useEffect(() => {
    if (id !== "create") {
      dispatch(fetchProductDetails(id));
    }
  }, [id]);

  React.useEffect(() => {
    if (selectedProduct?.id) {
      setFormData(selectedProduct);
    }
  }, [selectedProduct]);

  const createProduct = () => {
    dispatch(addProduct(formData));
    toast("Successfully added a product", {
      position: "top-right",
      theme: "colored",
      type: "success",
      autoClose: 2000
    });
    navigate("/home", { replace : true });
  };



  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e?.preventDefault();
    if (id === "create" && requiredFields.every(field => Boolean(formData?.[field as productKeys]))) {
      createProduct();
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCategory = (category: { id: string; label: string }[]) => {
    handleFormChange("category", category[0]?.id);
    setFilter(() => category);
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
    if (+e.which >= 48 && +e.which <= 57) {
      return true;
    }

    return false;
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
        <TextArea
          name="name"
          key="name"
          onTextInputChange={(val) => handleFormChange("name", val)}
          value={formData?.name || ""}
          required
          className="w-[90%]"
          placeholder="product name"
          label="Product Name"
        />
        <div className="flex justify-start items-start w-full gap-2">
          <div className="flex flex-col gap-4 items-start justify-start">
            <div className="font-normal text-left text-sm font-[Poppins]">
              Select Category
            </div>
            <Dropdown
              isMultiSelect={false}
              onSelect={(opt) => handleCategory(opt)}
              options={filterOptions}
              selected={filter}
              key="category"
              size="sm"
            />
          </div>

          <CalendarPicker
            date={formData?.expiry || today}
            onSelect={(date) => handleFormChange("expiry", date)}
            label="Expiry date"
          />
        </div>

        <div className="h-auto w-full flex justify-between items-center flex-wrap">
          <TextArea
            name="cp"
            key="cp"
            onTextInputChange={(val) => handleFormChange("cp", val)}
            value={formData?.cp || 0}
            inputMode="decimal"
            onKeyDown={handleNumericInput}
            required
            label="Cost Price"
          />

          <TextArea
            name="sp"
            key="sp"
            onTextInputChange={(val) => handleFormChange("sp", val)}
            value={formData?.sp || 0}
            inputMode="decimal"
            onKeyDown={handleNumericInput}
            required
            label="Selling Price"
          />
          <TextArea
            label="Discount Percentage %"
            name="dp"
            key="dp"
            onTextInputChange={(val) => handleDiscount(val)}
            value={formData?.discount_percentage || 0}
            inputMode="decimal"
            onKeyDown={handleNumericInput}
            required
          />
        </div>

        <TextArea
          label="Final Price"
          name="final_price"
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
