import { useRef, useState } from "react";
import StockItem, { CATEGORIES } from "../models/StockItem";
import useStock from "../hooks/useStock";
import ModalMessage from "./Modal/ModalMessage";

export default function ItemForm({ itemToUpdadete }) {
  const { addItem, updateItem } = useStock();
  const defaultItem = {
    name: "",
    description: "",
    quantity: 0,
    price: 0,
    category: "",
  };
  const [item, setItem] = useState(
    itemToUpdadete ? itemToUpdadete : defaultItem
  );
  const inputRef = useRef(null);
  const [message, setMessage] = useState(false);

  const handleChange = (ev) => {
    setItem((current) => {
      return {
        ...current,
        [ev.target.name]: ev.target.value,
      };
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    try {
      if (itemToUpdadete) {
        updateItem(itemToUpdadete.id, item);
        setMessage(true);
      } else {
        const validItem = new StockItem(item);
        addItem(validItem);
        setItem(defaultItem);
        setMessage(true);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              ref={inputRef}
              value={item.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantidade</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              required
              min={0}
              step={1}
              value={item.quantity}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="price">Preço</label>
            <input
              type="number"
              name="price"
              id="price"
              required
              min={0.0}
              step={0.01}
              value={item.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="category">Categoria</label>
            <select
              name="category"
              id="category"
              required
              value={item.category}
              onChange={handleChange}
            >
              <option disabled value="">
                Selecione uma categoria...
              </option>
              {CATEGORIES.map((category) => (
                <option
                  key={category}
                  value={category}
                  defaultChecked={item.category === category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="description">Descrição</label>
          <textarea
            name="description"
            id="description"
            required
            rows={6}
            value={item.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <ModalMessage
          Open={message}
          textMessage={
            itemToUpdadete
              ? `O item ${item.name} foi atualizado com sucesso!`
              : `O item foi registrado com sucesso!`
          }
          close={() => setMessage(!message)}
        />
        <button className="button is-primary is-large">Salvar</button>
      </form>
    </>
  );
}
