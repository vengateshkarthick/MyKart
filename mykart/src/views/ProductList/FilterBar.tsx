import React from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import { catogeries } from "../../shared/constants/categories";
import TextArea from "../../components/TextInput";
import { IProductData } from "../../shared/list.type";
import { useNavigate } from "react-router-dom";

function FilterBar({
  setProducts,
  products,
  handleDelete,
  enableDeleteBtn,
}: {
  products: IProductData[];
  setProducts: (products: IProductData[]) => void;
  handleDelete: () => void;
  enableDeleteBtn: boolean;
}) {
  const navigate = useNavigate();
  const filterOptions = React.useMemo(() => catogeries, []);
  const [searchText, setSearchText] = React.useState<string>("");
  const [filter, setFilter] = React.useState<
    { id: string; label: string }[] | null
  >([]);

  // applying category filter and then search text inside the filter category
  const handleApply = () => {
    const ctgIds = filter?.map((ctg) => ctg.id);

    const filteredData = products
      .filter((pdt) => {
        if (ctgIds && ctgIds.length) ctgIds?.includes(pdt.category);
        else return true;
      })
      .filter((pdt) => pdt.name.includes(searchText));

    setProducts(filteredData);
  };

  return (
    <div className="h-32 w-[100%] flex justify-between items-center p-4 border-1 rounded-md border-amber-200 mx-1 ">
      <div className="w-[60%] flex justify-start gap-4 items-center">
        <TextArea
          value={searchText}
          onTextInputChange={(val) => setSearchText(val)}
          placeholderText="Search with product name..."
          className="w-12"
        />
        <Dropdown
          onSelect={(selectedOpt) => setFilter(() => selectedOpt)}
          options={filterOptions}
          isMultiSelect
          selected={filter}
          label="Filter by Category"
        />
        <Button
          code="primary"
          variant="filled"
          onClick={() => handleApply()}
          label="Apply"
          disabled={!filter?.length && !searchText.length}
          size="sm"
        />
      </div>

      <div className="flex justify-end items-center gap-4">
        <Button
          code="danger"
          variant="outlined"
          onClick={() => handleDelete()}
          label="Remove"
          disabled={enableDeleteBtn}
          size="sm"
        />

        <Button
          code="success"
          variant="filled"
          label="Add Product"
          onClick={() => navigate("/form/create")}
          size="sm"
        />
      </div>
    </div>
  );
}

export default FilterBar;
