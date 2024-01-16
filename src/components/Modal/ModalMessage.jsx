import style from "./Modal.module.css";

export default function ModalMessage({ Open, close, textMessage }) {
  if (Open) {
    return (
      <div className={style.background}>
        <div className={style.modal}>
          <h2> {textMessage} </h2>
          <button className={style.buttonCancel} onClick={close}>
            Fechar
          </button>
        </div>
      </div>
    );
  }
}
