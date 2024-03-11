import React from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import { catogeries } from "../../shared/constants/categories";
import TextArea from "../../components/TextInput";
import { IProductData } from "../../shared/list.type";


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

  const onRemove = () => {
    handleDelete();
  }

  return (
    <div className="my-2 h-28 w-full p-2 flex justify-between items-center border-1 rounded-md border-amber-200 ">
      <div className="w-[70%] flex justify-start gap-4 items-center">
        <TextArea
          value={searchText}
          onTextInputChange={(val) => setSearchText(val)}
          placeholderText="Search with product name..."
          className="w-[25%]"
        />
        <Dropdown
          onSelect={(selectedOpt) => setFilter(() => selectedOpt)}
          options={filterOptions}
          isMultiSelect
          selected={filter}
          label="Filter by Category"
          size="sm"
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

      <div className="flex justify-end items-center gap-4 mx-1 w-[20%]">
        <Button
          code="danger"
          variant="filled"
          onClick={() => onRemove()}
          label="Remove"
          disabled={!enableDeleteBtn}
          size="sm"
          key="remove"
        />
      </div>
    </div>
  );
}

export default FilterBar;
