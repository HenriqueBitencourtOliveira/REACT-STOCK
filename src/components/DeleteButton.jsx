import { useNavigate } from "react-router-dom";
import useStock from "../hooks/useStock";

export default function DeleteButton({ itemId, itemName }) {
  const { deleteItem } = useStock();
  const navigate = useNavigate();
  const handleDelete = () => {
    if (confirm(`Tem certeza que deseja excluir ${itemName}?`)) {
      // modal aqui

      deleteItem(itemId);
      navigate("/items");
      alert("Excluido");
    }
  };
  return (
    <button className="button is-danger is-small" onClick={handleDelete}>
      Excluir
    </button>
  );
}
