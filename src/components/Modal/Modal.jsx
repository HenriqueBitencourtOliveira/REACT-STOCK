import style from "./Modal.module.css";

export default function Modal({ isOpen, setOpen, handleDelete, itemName }) {
  if (isOpen) {
    return (
      <div className={style.background}>
        <div className={style.modal}>
          <h2>Deseja excluir {itemName} </h2>
          <div>
            <button className={style.buttonDelete} onClick={handleDelete}>
              Excluir
            </button>

            <button
              className={style.buttonCancel}
              onClick={() => setOpen(!isOpen)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }
}
