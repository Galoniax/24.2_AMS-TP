import { useEffect, useState } from 'react';
import { ICategory } from '../interfaces/category.interface';
import { fetchAllCategories } from '../services/categoryService';

export const useCategory = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllCategories();
      setCategories(data);
    };
    fetchData();
  }, []);

  return { categories };
};
