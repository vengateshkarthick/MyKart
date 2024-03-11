import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/List";
import FilterBar from "./FilterBar";
import { IProductData } from "../../shared/list.type";
import { deleteProduct, setInitialProductList } from "../../reducer/store";
import { config, getApiData } from "./helper";
import ConfirmationModal from "../../components/ConfirmationModal";
import { IListConfig } from "../../components/List/type";

function ProductList() {
  const product = useSelector((state: any) => state?.prodcuts?.product);
  const [productCopy, setProductCopy] = React.useState<IProductData[]>();
  const [selectedId, setSelectedId] = React.useState<string[] | null>(null);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (product) {
      setProductCopy(product);
    }
  }, [product]);

  const handleEdit = (id: string) => {
    navigate(`/form/${id}`);
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  // const handleClose = () => {

  // }

  const handleConfirm = () => {
    setSelectedId(null);
    setShowModal(false);
    dispatch(deleteProduct(selectedId));
  };

  return (
    <div className="h-auto container flex flex-wrap gap-4 mx-auto justify-center items-start ">
      <FilterBar
        products={productCopy || []}
        setProducts={(prdts) => setProductCopy([...prdts])}
        handleDelete={handleDelete}
        enableDeleteBtn={!!selectedId}
        handleClear={() => setProductCopy([...product])}
      />
      <Table
        config={config as IListConfig[]}
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
        handleConfirm={handleConfirm}
        header="Please confirm to delete the selected records..."
      />
    </div>
  );
}

export default ProductList;
