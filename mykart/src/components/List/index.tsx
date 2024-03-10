import React from "react";
import { IProductData } from "../../shared/list.type";
import { sortByData } from "./helper";
import { IList, productKeys } from "./type";
import Checkbox from "../Checkbox";
import sortIcon from "../../assets/sort.svg";
import editIcon from "../../assets/edit.svg";

function List(props: IList) {
  const {
    id,
    className,
    data,
    config,
    isSelectable,
    onSelectRow,
    canEdit,
    handleEdit,
  } = props;
  const [rowData, setRowData] = React.useState<Partial<IProductData[]>>();

  const [selectAll, setSelectAll] = React.useState<boolean>(false);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

  const handleSelectedRows = React.useCallback(
    (rowIdx: string, isChecked: boolean) => {
      if (isChecked) setSelectedRows((prev) => [...prev, rowIdx]);
      else {
        setSelectedRows((prev) => prev.filter((id) => id !== rowIdx));
      }
    },
    []
  );

  React.useEffect(() => {
    if (selectedRows.length) onSelectRow?.(selectedRows);
  }, [selectedRows, onSelectRow]);

  React.useEffect(() => {
    if (selectAll) {
      const rows = rowData?.map((_, idx) => idx.toString());
      setSelectedRows(rows || []);
    }
  }, [selectAll]);

  React.useEffect(() => {
    if (data.length) {
      setRowData(() => data);
    }
  }, [data]);

  // render row with selectable and action functionality

  const withSelector = (config: IList["config"]) => {
    const _config = [...config];
    if (isSelectable) {
      const render = (_: IList["data"][number], properties: any) => (
        <Checkbox
          id={`selector-idx-${properties?.rowIdx?.toString()}}`}
          onChecked={(isChecked) =>
            handleSelectedRows(_.id as string, isChecked)
          }
          isChecked={selectedRows.includes(_.id)}
          className="h-full ps-2"
        />
      );
      _config.unshift({ accessor: "selector", render });
    }

    return _config;
  };

  const withActions = (config: IList["config"]) => {
    const _config = [...config];
    if (canEdit) {
      const render = (_data: IList["data"][number], customProperties: any) => (
        <div
          className="edit flex justify-center items-center cursor-pointer hover:scale-[1.5]"
          onClick={() => handleEdit?.(_data, customProperties)}
        >
          <img src={editIcon} height={20} width={20} />
        </div>
      );

      _config.push({ accessor: "edit", render });
    }

    return _config;
  };

  const renderListItem = () => {
    const withSelectableRows = withSelector(config);
    const withActionItem = withActions(withSelectableRows);

    return rowData?.map((row, idx) => {
      return (
        <>
          {withActionItem.map(({ accessor, rowClassName, render }) => {
            return (
              <div
                className={`p-2 w-full font-normal text-slate-500 text-left h-10 truncate text-sm ${rowClassName}`}
                id={id}
              >
                {render?.(row as IProductData, { rowIdx: idx.toString() }) ||
                  row?.[accessor as keyof typeof row]}
              </div>
            );
          })}
        </>
      );
    });
  };

  const handleSort = (field: string | number, isDateColumn?: string) => {
    const sortedData = sortByData(
      rowData as IProductData[],
      field as productKeys,
      isDateColumn
    );
    setRowData(() => sortedData);
  };

  const renderListHeader = () => {
    return config.map(({ header, isSortable, accessor, isDateColumn }) => (
      <div className="flex justify-start items-center gap-2 p-2">
        <div className="text-sm font-normal truncate text-left">
          {header}
        </div>
        {isSortable && (
          <div
            className="hidden"
            onClick={() => handleSort(accessor, isDateColumn)}
          >
            <img src={sortIcon} height={20} width={20} />
          </div>
        )}
      </div>
    ));
  };

  return (
    <div
      className={`relative grid grid-cols-10  items-center justify-center border-2 rounded-md border-[#fbfcfe] h-[50vh] overflow-y-auto ${className} cursor-pointer hover:[&>img]:block bg-[#fbfcfe]`}
      id={id}
    >
      {/* render header with selectable functionality */}
      {isSelectable && (
        <Checkbox
          id="header-checkbox"
          isChecked={selectAll}
          onChecked={(slct) => setSelectAll(slct)}
          className="p-4"
        />
      )}
      {renderListHeader()}
      <div></div>
      {renderListItem() || (
        <div className="col-span-12 text-base text-center m-auto p-3">
          No data found
        </div>
      )}
    </div>
  );
}

export default List;
