import './footer.scss';

const Footer = () => {
  return (
    <footer id="footer" className="w-[100%] py-4 px-8 bg-main mt-2">
      <div className="w-[100%] px-4 py-2 bg-accent flex items-center justify-between">
        <h3 className="text-white">Biblioteca Yenny</h3>
        <p className="text-white">
          &copy; {new Date().getFullYear()}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
