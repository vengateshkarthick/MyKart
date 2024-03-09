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
export const sortByData = (data?: IProductData[], field?: productKeys) => {
  if (typeof field === "string") {
    return data?.sort((a, b) => {
      let fieldData1 = a[field]?.toString().toUpperCase() as string;
      let fieldData2 = b[field]?.toString().toUpperCase() as string;

      return handleComparison(fieldData1, fieldData2);
    });
  }

  if (typeof field === "number") {
    return data?.sort((a, b) => {
      let fieldData1 = a[field] as number;
      let fieldData2 = b[field] as number;

      return handleComparison(fieldData1, fieldData2);
    });
  }
};
