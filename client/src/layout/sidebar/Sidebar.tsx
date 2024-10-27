import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { toggleSidebar } from "../../store/actions/sidebar";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { appConfig } from "../../config/ApplicationConfig";
import { formatPrice } from "../../utils/formatPrice";
import { clearCart, removeFromCart } from "../../store/actions/cart";
import { MdDelete } from "react-icons/md";

const sidebarVariants = {
  open: { x: 0 },
  closed: { x: '100%' },
};

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const cartTotal = useSelector((state: RootState) => state.cart.totalPrice);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <motion.aside
      className="fixed top-0 right-0 h-full z-30 w-[500px] bg-gray-800 text-white p-4 shadow-lg"
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
      transition={{ type: 'tween', duration: 0.3 }}
    >
      <button onClick={() => dispatch(toggleSidebar())} className="text-white">
        <FaTimes className="text-2xl" />
      </button>
        <h3 className="text-center text-xl">Carrito</h3>
      <div className="mt-4 max-h-[650px] overflow-y-auto flex flex-col gap-3">
        {cartItems.map((book, index) => (
          <div key={index} className="py-2 bg-white p-4 rounded-md relative">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start justify-start">
                <p className="text-2xl font-medium text-black">{book.title}</p>
                <p className="text-xs text-black">{book.author}</p>
                <p className="text-sm font-bold text-black">
                  {appConfig.CURRENCY_SYMBOL} {formatPrice(book.price || 0)}
                </p>
              </div>
              <img src={book.imageUrl} alt={book.title} className="w-[100px]" />
            </div>
            <button className="absolute top-0 left-2 bg-red-500 rounded my-2" onClick={() => handleRemoveItem(book.id)}><MdDelete size={20} /></button>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between">
        <span className="text-lg font-bold">Total:</span>
        <span className="text-lg font-bold">
          {appConfig.CURRENCY_SYMBOL} {formatPrice(cartTotal)}
        </span>
      </div>
      <div className="w-full flex items-center justify-between mt-4 gap-10">
        <button className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"  onClick={handleClearCart}>Eliminar carrito</button>
        <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300" onClick={handleClearCart} disabled={cartItems.length === 0}>Comprar</button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;