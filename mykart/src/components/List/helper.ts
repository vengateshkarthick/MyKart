import { IProductData } from "../../shared/list.type";
import { productKeys } from "./type";


const handleComparison = (
  fieldData1: string | number,
  fieldData2: string | number
) => {
  if (fieldData1 < fieldData2) return -1;
  if (fieldData1 > fieldData2) return 1;
  else return 0;
};

// sorting product data with string and number
export const sortByData = (data?: IProductData[], field?: productKeys, isDateColumn?: string) => {
   let fieldData1;
   let fieldData2;
  if (isDateColumn && field) {
    return data?.sort((a, b) => {
      fieldData1 = new Date(a[field]?.toString() || "");
      fieldData2 = new Date(b[field]?.toString() || "");

      return Number(fieldData1.getMilliseconds()) - Number(fieldData2.getMilliseconds())

    })
  }
   
  if (typeof field === "string") {
    return data?.sort((a, b) => {
      fieldData1 = a[field]?.toString().toUpperCase() as string;
      fieldData2 = b[field]?.toString().toUpperCase() as string;

      return handleComparison(fieldData1, fieldData2);
    });
  }

  if (typeof field === "number") {
    return data?.sort((a, b) => {
      fieldData1 = a[field] as number;
      fieldData2 = b[field] as number;

      return handleComparison(fieldData1, fieldData2);
    });
  }
};
