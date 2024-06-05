import { createContext, useState, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface UsersContextType {
  users: User[];
  createUser: (user: Omit<User, "id">) => void;
  updateUser: (id: string, user: Omit<User, "id">) => void;
  deleteUser: (id: string) => void;
}

export const UsersContext = createContext<UsersContextType>({
  users: [],
  createUser: (user: Omit<User, "id">) => {},
  updateUser: (id: string, user: Omit<User, "id">) => {},
  deleteUser: (id: string) => {},
});

export const UsersContextProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  const generateId = (): string => {
    return `${Math.random().toString(36).slice(2, 9)}`;
  };

  const createUser = (user: Omit<User, "id">) => {
    const newUser: User = {
      id: generateId(),
      ...user,
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const deleteUser = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const updateUser = (id: string, updatedUser: Omit<User, "id">) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      )
    );
  };

  const value = {
    users,
    createUser,
    updateUser,
    deleteUser,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
