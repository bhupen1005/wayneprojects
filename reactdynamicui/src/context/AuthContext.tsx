import { createContext, useContext } from 'react';

export const AuthContext = createContext({ role: 'user' });

export const useAuth = () => useContext(AuthContext);
