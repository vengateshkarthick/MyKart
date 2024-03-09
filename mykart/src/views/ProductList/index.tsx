import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/List";
import FilterBar from "./FilterBar";
import { IProductData } from "../../shared/list.type";
import { deleteProduct, setInitalProductList } from "../../reducer/store";
import { config, getApiData } from "./helper";

function ProductList() {
  const { product } = useSelector((state) => state) as {
    product: IProductData[];
  };

  const [productCopy, setProductCopy] = React.useState<IProductData[]>();
  const [selectedId, setSelectedId] = React.useState<string[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // updating store with local json data
  React.useEffect(() => {
    dispatch(setInitalProductList(getApiData()));
  }, [dispatch]);

  React.useEffect(() => {
    if (product) {
      setProductCopy(product);
    }
  }, [product]);

  const handleEdit = (id: string) => {
    navigate(`/${id}`);
  };

  const handleDelete = () => {
    dispatch(deleteProduct(selectedId));
  }

  return (
    <div className="h-full w-full flex flex-col gap-2">
      <FilterBar
        products={productCopy || []}
        setProducts={(prdts) => setProductCopy(prdts)}
        handleDelete={handleDelete}
      />
      <Table
        config={config}
        data={productCopy || []}
        isSelectable
        id="custom-react-table"
        canEdit
        handleEdit={(data) => handleEdit(data.id)}
        onSelectRow={(id) => setSelectedId(id)}
      />

    </div>
  );
}

export default ProductList;
