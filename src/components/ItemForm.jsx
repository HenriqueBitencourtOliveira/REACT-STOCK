import { useRef, useState } from "react";
import StockItem, { CATEGORIES } from "../models/StockItem";
import useStock from "../hooks/useStock";

export default function ItemForm({ itemToUpdadete }) {
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
  const { addItem, updateItem } = useStock();
  const inputRef = useRef(null);

  const handleChange = (ev) => {
    setItem(current => {
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
        alert("Item atulizado");
      } else {
        const validItem = new StockItem(item);
        addItem(validItem);
        setItem(defaultItem);
        alert("Item registrado!");
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
        <button className="button is-primary is-large">Salvar</button>
      </form>
    </>
  );
}
