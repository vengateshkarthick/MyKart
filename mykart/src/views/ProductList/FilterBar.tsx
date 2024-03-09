import React from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import { catogeries } from "../../shared/constants/categories";
import TextArea from "../../components/TextInput";
import { IProductData } from "../../shared/list.type";

function FilterBar({
  setProducts,
  products,
  handleDelete
}: {
  products: IProductData[];
  setProducts: (products: IProductData[]) => void;
  handleDelete: () => void;
}) {
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
      />
      <TextArea
        value={searchText}
        onChange={(val) => setSearchText(val)}
        placeholderText="Search with product name..."
        className="w-20"
      />
      <Button
        code="primary"
        variant="filled"
        onClick={() => handleApply()}
        label="Apply"
      />

      <Button 
        code="danger"
        variant="outlined"
        onClick={() => handleDelete()}
        label="Remove"
       />

    </div>
  );
}

export default FilterBar;
