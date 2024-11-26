import { useEffect, useState } from 'react';
import { IUser } from '../interfaces/user.interface';
import { fetchAllUsers } from '../services/userService';

export const useUsers = () => {
  const [allUsers, setAllUsers] = useState<IUser[]>([]);

  const fetchUsers = async () => {
    const users = await fetchAllUsers();
    setAllUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    allUsers,
    refreshUsers: fetchUsers,
  };
};
