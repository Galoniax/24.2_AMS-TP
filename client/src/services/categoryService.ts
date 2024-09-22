import axiosInterceptor from '../interceptor/axios-interceptor';
import { ICategory } from '../interfaces/category.interface';

export const fetchAllCategories = async (): Promise<ICategory[]> => {
  const response = await axiosInterceptor.get('/categories');
  return response.data;
};

export const fetchCategoryById = async (id: number): Promise<ICategory> => {
  const response = await axiosInterceptor.get(`/categories/${id}`);
  return response.data;
};

export const createCategory = async (
  newCategory: ICategory,
): Promise<ICategory> => {
  const response = await axiosInterceptor.post('/categories', newCategory);
  return response.data;
};

export const updateCategory = async (
  id: number,
  updatedCategory: ICategory,
): Promise<ICategory> => {
  const response = await axiosInterceptor.put(
    `/categories/${id}`,
    updatedCategory,
  );
  return response.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await axiosInterceptor.delete(`/categories/${id}`);
};
