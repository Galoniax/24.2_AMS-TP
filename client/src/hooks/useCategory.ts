import { useEffect, useState } from 'react';
import { ICategory } from '../interfaces/category.interface';
import { fetchAllCategories } from '../services/categoryService';

export const useCategory = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchCategories = async () => {
    const categories = await fetchAllCategories();
    setCategories(categories);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return { 
    categories,
    refrehCategories: fetchCategories
  };
};
