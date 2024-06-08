import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {deleteData, getName, setName} from "../services/localStorageService.ts";



interface UserContextProps {
  userName: string;
  deleteUserName:()=>void;
  setUserName: (name: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userName , setUserName] = useState<string>('');

  useEffect(() => {
    const storedUserName = getName();
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const updateUserName = (name: string) => {
    setUserName(name);
    setName(name);
  };
 const deleteUserName = ():void =>{
   deleteData();
   setUserName("");

 };
  return (
    <UserContext.Provider value={{ userName, deleteUserName, setUserName: updateUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};