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
  const [selectedId, setSelectedId] = React.useState<string[]>([]);
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
    dispatch(deleteProduct(selectedId));
    setShowModal(false);
  };

  return (
    <div className="relative top-10 h-[100vh] w-[100vw] flex flex-col gap-2 container mx-auto">
      <article className="py-2 text-sm font-normal font-[Poppins] text-nowrap">
        Product Table
      </article>
      <FilterBar
        products={productCopy || []}
        setProducts={(prdts) => setProductCopy([...prdts])}
        handleDelete={handleDelete}
        enableDeleteBtn={!selectedId.length}
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
