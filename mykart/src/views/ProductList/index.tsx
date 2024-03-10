import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/List";
import FilterBar from "./FilterBar";
import { IProductData } from "../../shared/list.type";
import { deleteProduct, setInitialProductList } from "../../reducer/store";
import { config, getApiData } from "./helper";
import ConfirmationModal from "../../components/ConfirmationModal";

function ProductList() {
  const  product = useSelector((state:any) => state?.prodcuts?.product)
  const [productCopy, setProductCopy] = React.useState<IProductData[]>();
  const [selectedId, setSelectedId] = React.useState<string[]>([]);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // updating store with local json data
  React.useEffect(() => {
    if (dispatch) {
      dispatch(setInitialProductList(getApiData()));
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (product) {
      setProductCopy(product);
    }
  }, [product]);

  const handleEdit = (id: string) => {
    navigate(`form/${id}`);
  };

  const handleDelete = () => {
    setShowModal(true);
  }

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col gap-2 container mx-auto">
      <FilterBar
        products={productCopy || []}
        setProducts={(prdts) => setProductCopy(prdts)}
        handleDelete={handleDelete}
        enableDeleteBtn={!selectedId.length}
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

      <ConfirmationModal 
        onClose={() => setShowModal(false)}
        open={showModal}
        handleConfirm={() => dispatch(deleteProduct(selectedId))}
        header="Please confirm to delete the selected records..."
      />

    </div>
  );
}

export default ProductList;
