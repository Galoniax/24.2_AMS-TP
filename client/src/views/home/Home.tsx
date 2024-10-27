import './home.scss';
import { useState, useEffect, useRef } from 'react';

import foto1 from '../../assets/images/portadaMetro.png';
import foto2 from '../../assets/images/portada1984.png';
import foto3 from '../../assets/images/portadaLaMeta.png';
import foto4 from '../../assets/images/portadaPerras.jpg';
import foto5 from '../../assets/images/portadaMeridiano.png';
import foto6 from '../../assets/images/portadaCadaver.jpg';
import editorial from '../../assets/images/editorial.png';
import editorial2 from '../../assets/images/editorial2.png';
import editorial3 from '../../assets/images/editorial3.png';
import editorial4 from '../../assets/images/editorial4.png';
import editorial5 from '../../assets/images/editorial5.png';
import editorial6 from '../../assets/images/editorial6.png';
import oferta from '../../assets/images/oferta.png';
import oferta2 from '../../assets/images/oferta2.png';
import oferta3 from '../../assets/images/oferta3.png';
import { useSpring, motion } from 'framer-motion';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useInView } from 'react-intersection-observer';

const books = [
  { title: 'Metro 2033', author: 'Dmitri Glujovski', img: foto1 },
  { title: '1984', author: 'George Orwell', img: foto2 },
  { title: 'La Metamorfosis', author: 'Frank Kafka', img: foto3 },
  { title: 'Perras de Reserva', author: 'Dahlia de la Cerda', img: foto4 },
  { title: 'Meridiano de Sangre', author: 'Cormac McCarthy', img: foto5 },
  { title: 'Cadaver Exquisito', author: 'Agustina Bazterrica', img: foto6 },
  // Puedes agregar más libros si es necesario
];

const editorialImg = [
  { img: editorial, title: 'Mondadori' },
  { img: editorial2, title: 'Particular Books' },
  { img: editorial3, title: 'Tierra de Mu' },
  { img: editorial4, title: 'Oz Editorial' },
  { img: editorial5, title: 'Nova Tinta' },
  { img: editorial6, title: 'Medina Publishing' },
];

const Home = () => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cardRef, inView] = useInView({ threshold: 0.5 });
  const windowSize = useWindowSize();
  const scaleProgress = useRef(useSpring(1)).current;
  const opacityProgress = useRef(useSpring(1)).current;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentGroupIndex((prevIndex) =>
          prevIndex + 1 >= Math.ceil(books.length / 3) ? 0 : prevIndex + 1,
        );
        setIsTransitioning(false);
      }, 700);
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if(windowSize.isMobile) {
      scaleProgress.set(1);
      opacityProgress.set(1);
    } else {
      scaleProgress.set(inView ? 1 : 0.7);
      opacityProgress.set(inView ? 1 : 0.5);
    }
  }, [inView]);

  const getCurrentBooks = () => {
    const startIndex = currentGroupIndex * 3;
    return books.slice(startIndex, startIndex + 3);
  };

  const totalGroups = Math.ceil(books.length / 3);

  return (
    <div className="w-[100%] min-h-screen">
      <section className="flex justify-center items-center w-[100%] px-[150px] pt-[100px] pb-[100px] bg-[#F9F8F6]">
        <div className="max-w-[50%] flex flex-col gap-[70px]">
          <div>
            <h4 className="textNunito tracking-[2px] text-sm">
              ¡Registrate ahora!
            </h4>
            <h1 className="textNunitoMed text-[54px] ">
              {' '}
              Cambia la forma en que compras tus{' '}
              <span className="textNunitoItalic">libros</span>
            </h1>
          </div>

          <div>
            <p className="textNunito max-w-[600px] indent-8">
              Descubre una nueva manera de adquirir tus lecturas favoritas en
              nuestra librería. Con nuestras promociones exclusivas, descuentos
              especiales y opciones de compra personalizadas, encontrarás
              siempre la mejor forma de disfrutar de los libros que amas,
              ahorrando y accediendo a lo último en literatura. ¡Transforma tu
              experiencia de compra hoy mismo!
            </p>

            <button className="textNunitoMed  text-white bg-[#2e4c74] text-accent border border-accent px-8 py-2 rounded-[100px] w-[250px] mt-[50px]">
              Registrarme ahora
            </button>
          </div>
        </div>
        <div className="relative flex">
          {/* Grid de libros */}
          <div className="gap-4 grid grid-cols-3 justify-items-center text-center">
            {getCurrentBooks().map((book, index) => (
              <div
                key={index}
                className={`book-container  ease-in-out flex ${
                  index % 2 === 0 ? 'flex-col' : 'flex-col-reverse justify-end'
                } gap-3 ${isTransitioning ? 'transitioning' : ''}`}
              >
                <div>
                  <h2 className="textNunito text-[17px] font-bold">
                    {book.title}
                  </h2>
                  <h2 className="textNunito text-[12px]">{book.author}</h2>
                </div>
                <img
                  src={book.img}
                  alt={book.title}
                  className={`w-[200px]  ease-in-out ${
                    index % 2 === 0
                      ? 'rounded-bl-[100px] rounded-br-[100px]'
                      : 'rounded-tl-[100px] rounded-tr-[100px]'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Indicadores de páginas (puntos) */}
          <div className="absolute right-[-40px] top-[50%] transform -translate-y-[50%] flex flex-col items-center gap-2">
            {Array.from({ length: totalGroups }).map((_, index) => (
              <span
                key={index}
                className={`block w-2 h-3 rounded-full transition-all duration-[0.8s] ease-in-out ${
                  currentGroupIndex === index ? 'bg-[#2d486d]' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="flex items-center justify-center w-[100%] h-[200px] border-t-[1px] border-b-[1px] mb-[100px] overflow-hidden">
        {editorialImg.map((image, index) => (
          <div className="w-[15%] flex justify-center">
            <img
              className="h-[100px] object-cover"
              key={index}
              src={image.img}
              alt={image.title}
            />
          </div>
        ))}
      </div>

      <motion.section className=" w-[100%] p-[100px] min-h-[700px] flex  justify-evenly  gap-[150px]"
        ref={cardRef}
        style={{
          scale: scaleProgress,
          opacity: opacityProgress,
        }}
      >
        <div className="w-[40%] flex flex-col max-w-[500px] gap-3">
          <h4 className="textNunito tracking-[2px] text-sm text-sky-700">
            Sobre Nosotros
          </h4>
          <h1 className="textNunitoMed text-[30px]">
            Una Librería Pensada para Ti
          </h1>
          <p className="textNunito indent-11 leading-8">
            En Yenny, nos apasiona conectar a las personas con el mundo de la
            lectura. Ofrecemos una experiencia personalizada para que encuentres
            fácilmente tus libros favoritos y descubras nuevas historias. Con
            promociones exclusivas, una amplia variedad de géneros y la
            comodidad de comprar en línea, Yenny es más que una librería: es el
            lugar donde comienza tu próxima aventura literaria.
          </p>
          <p className="textNunito text-[16px] leading-8 mt-[20px]">
            Adentrate en un mundo lleno de ofertas, promociones y descuentos.
            ¡Descubre todo lo que necesitas para mejorar tu experiencia de
            lectura!
          </p>
          <div className="flex justify-center mt-4">
            <button className="buttonwhite textNunitoMed text-sm border border-black border-accent px-8 py-2 rounded-[5px] w-[250px] justify-center">
              Ver más
            </button>
          </div>
        </div>
        <div className="w-[60%]">
          <h2 className="textNunitoMed text-[25px]">Ofertas</h2>

          <div className="flex cols-2 gap-[50px] mt-[40px]">
            <img
              src={oferta}
              className="oferta w-[230px] rounded-bl-[200px] rounded-br-[200px]"
              alt="Oferta"
            />
            <img
              src={oferta2}
              className="oferta w-[230px] rounded-tl-[200px] rounded-tr-[200px]"
              alt="Oferta"
            />
            <img
              src={oferta3}
              className="oferta w-[230px] rounded-bl-[200px] rounded-br-[200px]"
              alt="Oferta"
            />
          </div>
        </div>
      </motion.section>

      <section className=" w-[100%] min-h-[500px]">
        <div className=" border-t-[1px] flex  justify-between items-center px-[100px]">
          <div className="w-[50%]">
            <h4 className="textNunito tracking-[2px] text-sm text-sky-700">
              Ventajas
            </h4>
            <h1 className="textNunitoMed text-[40px]">
              Aprovecha al máximo tu experiencia en nuestra librería
            </h1>
          </div>

          <div className="w-[40%] h-[250px] flex items-end">
            <p className="textNunito text-[16px] leading-7">
              Yenny provee ciertas ventajas que te ayudaran a mejorar tu
              experiencia de lectura. Ventajas que logran diferenciarse de la
              competencia <b>Estas son algunas de ellas:</b>
            </p>
          </div>
        </div>

        <div className="flex gap-[15px] justify-center items-center px-[100px] mt-[80px]">
          <div className="ventaja-container flex flex-col justify-center border border-[#c7c7c7]  h-[500px] w-[25%] p-10">
            <h3 className="textNunito text-[20px] font-semibold mb-4">
              Amplia variedad de libros
            </h3>
            <p className="textNunito text-gray-600 leading-8">
              Encuentra todo tipo de libros, desde los últimos lanzamientos
              hasta los clásicos favoritos. Siempre tendrás algo nuevo que leer.
            </p>
          </div>
          <div className="ventaja-container flex flex-col justify-center border border-[#c7c7c7]  h-[500px] w-[25%] p-10">
            <h3 className="textNunito text-[20px] font-semibold mb-4">
              Promociones exclusivas
            </h3>
            <p className="textNunito text-gray-600 leading-8">
              Aprovecha descuentos y ofertas exclusivas en nuestros libros.
              ¡Ahorra mientras disfrutas de tus lecturas favoritas!
            </p>
          </div>

          <div className="ventaja-container flex flex-col justify-center border border-[#c7c7c7] rounded-tr-[200px]  h-[500px] w-[30%] p-10">
            <h3 className="textNunito text-[20px] font-semibold mb-4">
              Fácil gestión de pedidos
            </h3>
            <p className="textNunito text-gray-600 leading-8">
              Controla el estado de tus pedidos y compras de forma rápida y
              sencilla. Todo lo que necesitas al alcance de un clic.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t-[1px] mt-[100px] pt-[100px] w-[100%] ">
        <div className=" flex px-[100px] min-h-[800px]">
          <div className="w-[45%]">
            <h4 className="textNunito tracking-[2px] text-sm text-sky-700">
              Ventajas
            </h4>
            <h1 className="textNunitoMed text-[40px] m-w-[600px]">
              Aprovecha al máximo tu experiencia en nuestra librería
            </h1>
          </div>

          <div className="w-[55%]">
            <div className="w-[100%]"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
