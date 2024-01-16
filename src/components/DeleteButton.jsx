import { useNavigate } from "react-router-dom";
import useStock from "../hooks/useStock";
import Modal from "./Modal/Modal";
import { useState } from "react";
import ModalMessage from "./Modal/ModalMessage";

export default function DeleteButton({ itemId, itemName }) {
  const { deleteItem } = useStock();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteItem(itemId);
    navigate("/items");
    setMessage(false);
    setOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={open}
        setOpen={setOpen}
        handleDelete={handleDelete ? () => setMessage(!message) : null}
        itemName={itemName}
      />
      <ModalMessage
        Open={message}
        textMessage={`O item ${itemName} foi excluido com sucesso`}
        close={handleDelete}
      />
      <button
        className="button is-danger is-small"
        onClick={() => setOpen(!open)}
      >
        Excluir
      </button>
    </>
  );
}
