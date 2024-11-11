import { useSearchParams } from "react-router-dom";

export default function CartPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  return (
    <div>
      <h2>Cart page</h2>
      <p>{id}</p>
    </div>
  );
}
