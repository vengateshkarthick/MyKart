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
  handleClear,
}: {
  products: IProductData[];
  setProducts: (products: IProductData[]) => void;
  handleDelete: () => void;
  enableDeleteBtn: boolean;
  handleClear: () => void;
}) {
  const navigate = useNavigate();
  const hasChanges = React.useRef<boolean>();
  const filterOptions = React.useMemo(() => catogeries, []);
  const [searchText, setSearchText] = React.useState<string>("");
  const [filter, setFilter] = React.useState<
    { id: string; label: string }[] | null
  >([]);

  const productsRef = React.useRef<IProductData[]>([]);

  // applying category filter and then search text inside the filter category
  const handleApply = () => {
    let filteredData = [...products];
    if (!hasChanges.current) {
      hasChanges.current = true;
      productsRef.current = [...products];
    } else if (hasChanges.current) {
      filteredData = [...productsRef.current];
    }
    const ctgIds = filter?.map((ctg) => ctg.id);

    if (searchText.length) {
      filteredData = filteredData.filter((pdt) =>
        pdt.name.includes(searchText)
      );
    }

    if (ctgIds && ctgIds.length) {
      filteredData = filteredData.filter((pdt) =>
        ctgIds.includes(pdt.category.toLowerCase())
      );
    }

    setProducts(filteredData);
  };

  // clears all search criteria and retains redux data
  const onClearFilterData = React.useCallback(() => {
    setSearchText("");
    setFilter(() => []);
    hasChanges.current = false;
    productsRef.current = [];
    handleClear();
  }, [handleClear]);

  return (
    <div className="relative top-5 my-4 h-32 w-[100%] flex justify-between items-center p-4 border-1 rounded-md border-amber-200 mx-1 ">
      <div className="w-[70%] flex justify-start gap-4 items-center">
        <TextArea
          value={searchText}
          onTextInputChange={(val) => setSearchText(val)}
          placeholderText="Search with product name..."
          className="w-10"
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

        <Button
          code="danger"
          variant="filled"
          onClick={onClearFilterData}
          label="Clear Filters"
          size="sm"
          disabled={!hasChanges.current}
        />
      </div>

      <div className="flex justify-start items-center gap-4 mx-1 w-[20%]">
        <Button
          code="danger"
          variant="outlined"
          onClick={() => handleDelete()}
          label="Remove"
          disabled={enableDeleteBtn}
          size="sm"
        />
      </div>
    </div>
  );
}

export default FilterBar;
