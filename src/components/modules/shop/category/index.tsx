import CreateCategoryModal from "./CreateCategoryModal";

const CreateCategory = () => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="font-semibold">Manage category</h3>
      <CreateCategoryModal />
    </div>
  );
};

export default CreateCategory;
