import type { Metadata } from "next";
import AddProductForm from "@/components/dashboard/AddProductForm";

export const metadata: Metadata = { title: "Add Product" };

export default function AddProductPage() {
  return <AddProductForm />;
}
