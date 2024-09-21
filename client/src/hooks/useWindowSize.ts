import { useContext } from 'react';
import { WindowSizeContext } from '../context/WindowsSizeProvider';

/**
 * ¿Como usar? - Desde el componente que quisieramos saber las dimensiones, colocaremos la siguiente destructuración
 * @example const { windowSize, isMobile } = useWindowSize;
 */

export const useWindowSize = () => useContext(WindowSizeContext);
