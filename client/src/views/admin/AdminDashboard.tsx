
import { motion } from 'framer-motion';
import './admin.styles.scss';
import { fadeInUp } from '../../utils/animations';
import { useState } from 'react';
import AdminBooks from '../../components/admin/admin-books/AdminBooks';
import AdminUsers from '../../components/admin/admin-users/AdminUsers';
import AdminCategories from '../../components/admin/admin-categories/AdminCategories';
import { MdBook, MdCategory } from 'react-icons/md';
import { BiUser } from 'react-icons/bi';

declare type ADMIN_VIEWS = "books" | "users" | "categories" | "sales" | "promotions";

const AdminDashboard = () => {
  const [view, setView] = useState<ADMIN_VIEWS>("books");

  const changeView = (view: ADMIN_VIEWS) => {
    switch (view) {
      case "books":
        setView("books");
        break;
      case "users":
        setView("users");
        break;
      case "categories":
        setView("categories");
        break;
      default:
        setView("books");
        break;
    }
  }

  return (
    <motion.section id="admin_section" initial="initial" animate="animate" variants={fadeInUp}>
      <aside role='navigation' className='w-[10%] min-w-[275px] bg-slate-200'>
        <nav className='w-full h-full flex items-start justify-center px-3 py-8'>
          <ul className='w-full h-full flex flex-col gap-5'>
            <li className='flex items-center gap-2 text-blue-600 cursor-pointer' onClick={() => changeView("books")} style={view === "books" ? { fontWeight: "bold" } : {}}><MdBook /> Gestionar libros</li>
            <li className='flex items-center gap-2 text-blue-600 cursor-pointer' onClick={() => changeView("users")} style={view === "users" ? { fontWeight: "bold" } : {}}><BiUser /> Gestionar usuarios</li>
            <li className='flex items-center gap-2 text-blue-600 cursor-pointer' onClick={() => changeView("categories")} style={view === "categories" ? { fontWeight: "bold" } : {}}><MdCategory /> Gestionar categorías</li>
            {/* <li onClick={() => changeView("sales")}>Gestionar ventas</li>
            <li onClick={() => changeView("promotions")}>Gestionar promociones</li> */}
          </ul>
        </nav>
      </aside>
      <div className="w-[80%] flex flex-col items-start justify-start py-8">
        {view === "books" && <AdminBooks />}
        {view === "users" && <AdminUsers />}
        {view === "categories" && <AdminCategories />}
      </div>
    </motion.section>
  );
}

export default AdminDashboard;