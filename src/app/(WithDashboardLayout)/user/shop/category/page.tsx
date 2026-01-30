import CreateCategory from "@/components/modules/shop/category";
import { getAllCategories } from "@/services/category";

const ManageCategoryPage = async () => {
  const { data, meta } = await getAllCategories();

  return (
    <div>
      <CreateCategory categories={data} />
    </div>
  );
};

export default ManageCategoryPage;
