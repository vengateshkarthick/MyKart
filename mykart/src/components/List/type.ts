import React from "react";
import { IProductData } from "../../shared/list.type";
interface IListData extends  IProductData {}

export interface IListConfig {
  header?: string;
  id: string;
  render?: (data: IListData, customProperties?: any) => React.ReactNode | string | null;
  isSortable?: boolean;
  hasFilter?: boolean;
  rowClassName?: string; 
}

export interface IList {
  config: Array<IListConfig>;
  data: Array<IListData>;
  id: string;
  className: string;
  isSelectable?: boolean;
  onSelectRow?: (id: string[]) => void; 
}