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
    <div className="h-auto w-11/12 flex flex-wrap justify-between content-center items-center p-4 border-x-0 border-y-2 border border-slate-300 mx-auto">
      <Dropdown
        onSelect={(selectedOpt) => setFilter(() => selectedOpt)}
        options={filterOptions}
        isMultiSelect
        selected={filter}
        label="Filter by Category"
      />
      <TextArea
        value={searchText}
        onTextInputChange={(val) => setSearchText(val)}
        placeholderText="Search with product name..."
        className="w-12"
      />
      <Button
        code="primary"
        variant="filled"
        onClick={() => handleApply()}
        label="Apply"
        disabled={!filter?.length && !searchText.length}
      />

      <Button 
        code="danger"
        variant="outlined"
        onClick={() => handleDelete()}
        label="Remove"
        disabled={enableDeleteBtn}
       />

       <Button
         code="success"
         variant="outlined"
         label="Add Product"
         onClick={() => navigate("/form/create")}
        />
    </div>
  );
}

export default FilterBar;
