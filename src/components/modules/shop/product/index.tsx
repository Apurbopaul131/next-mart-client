import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

const ManageProduct = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-semibold">Manage Product</h3>
        <Link href={"/user/shop/products/add-product"}>
          <Button className="cursor-pointer">
            Create Product <CirclePlus />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ManageProduct;
