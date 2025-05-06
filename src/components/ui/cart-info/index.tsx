import { useCartStore } from "@store/cart";
import styles from "./index.module.css";
import { toast } from "react-toastify";
const CartInfo = () => {
  const { list, getCartCount, getTotal, deleteOne } = useCartStore();

  const handleDelete = (id: string, title: string) => {
    deleteOne(id);

    toast.info(`¡${title} quitado del carro!`);
  };
  return (
    <section className={styles.cart}>
      <header className={styles.cart_header}>
        <h3 className={styles.cart_h3}>
          <strong>{getCartCount()}</strong> productos
        </h3>

        <span className={styles.cart_total}>Total: ${getTotal()}</span>
      </header>

      <div className={styles.cart_container}>
        {list.map((item) => (
          <article className={styles.cart_card}>
            <span>{item.quantity}</span>
            <p>{item.title}</p>

            <strong>
              $
              {(item.quantity * item.price).toLocaleString("es-ar", {
                currencySign: "standard",
                currency: "ARS",
              })}
            </strong>

            <button
              onClick={() => handleDelete(item._id, item.title)}
              title={`Quitar ${item.title} del carro`}
              aria-label={`Quitar ${item.title} del carro`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" />
                <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" />
              </svg>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CartInfo;
