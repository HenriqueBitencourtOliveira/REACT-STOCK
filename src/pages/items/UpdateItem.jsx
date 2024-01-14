import { useParams } from "react-router-dom";
import ItemForm from "../../components/ItemForm";
import useStock from "../../hooks/useStock";

export default function updatedItems() {
  const { getItem } = useStock();
  const { id } = useParams();

  const item = getItem(id);

  return (
    <>
      <h2>Item atualizado</h2>
      <ItemForm itemToUpdadete={item} />
    </>
  );
}
