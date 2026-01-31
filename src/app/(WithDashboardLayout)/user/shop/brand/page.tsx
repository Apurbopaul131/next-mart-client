import CreateBrand from "@/components/modules/shop/brand";
import { getAllBrands } from "@/services/brand";

const ManageCategoryPage = async () => {
  const { data, meta } = await getAllBrands();
  console.log(data, meta);
  return (
    <div>
      <CreateBrand brands={data} />
    </div>
  );
};

export default ManageCategoryPage;
