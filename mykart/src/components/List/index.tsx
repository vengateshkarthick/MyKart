import React from "react";
import sortIcon from "../../assets/sort.svg";
import { IList } from "./type";
import Checkbox from "../Checkbox";

function List(props: IList) {
  const { id, className, data, config, isSelectable, onSelectRow } = props;
  const [selectAll, setSelectAll] = React.useState<boolean>(false);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

  const handleSelectedRows = React.useCallback((rowIdx: string, isChecked: boolean) => {
    if (isChecked) setSelectedRows((prev) => [...prev, rowIdx]);
    else {
      setSelectedRows((prev) => prev.filter((id) => id !== rowIdx));
    }
  }, []);

  React.useEffect(() => {
   if (selectedRows.length) onSelectRow?.(selectedRows);
  }, [selectedRows, onSelectRow]);


  React.useEffect(() => {
    if(selectAll) {
     const rows = data.map((_, idx) => idx.toString());
     setSelectedRows(rows);
    }
  }, [selectAll])

  const renderListItem = () => {
    const withSelectableRows = [...config];
    if (isSelectable) {
      const render = (data: IList["data"][number], properties: any) => (
        <Checkbox
          id={`selector-idx-${properties?.rowIdx?.toString()}}`}
          onChecked={(isChecked) =>
            handleSelectedRows(properties?.rowIdx as string, isChecked)
          }
          isChecked={selectedRows.includes(properties?.rowIdx)}
        />
      );
      withSelectableRows.unshift({ id: "selector", render });
    }

    return data.map((listItem, idx) => {
      return withSelectableRows.map(({ id, rowClassName, render }) => {
        if (render) {
          return render(listItem, { rowIdx: idx.toString() });
        }
        return (
          <div
            className={`px-2 max-w-10 font-[500] text-center truncate ${rowClassName}`}
            id={id}
          >
            {listItem[id as keyof typeof listItem]}
          </div>
        );
      });
    });
  };

  const renderListHeader = () => {
    return config.map(({ header, isSortable }) => (
      <div className="flex flex-1 items-center justify-start gap-1 bg-[#fbfcfe] cursor-pointer hover:[&>img]:block">
        <div className="text-sm font-normal truncate text-left">{header}</div>
        {isSortable && (
          <div className="hidden">
            <img src={sortIcon} height={20} width={20} />
          </div>
        )}
      </div>
    ));
  };

  return (
    <div
      className={`grid grid-cols-[${config.length}] border rounded border-[#fbfcfe] h-[50vh] overflow-y-auto ${className}`}
      id={id}
    >
      <div className={`grid row-span-[${config.length}] fixed p-4`}>
        {isSelectable && (
          <Checkbox
            id="header-checkbox"
            isChecked={selectAll}
            onChecked={(slct) => setSelectAll(slct)}
          />
        )}
        {renderListHeader()}
        {renderListItem()}
      </div>
    </div>
  );
}

export default List;
