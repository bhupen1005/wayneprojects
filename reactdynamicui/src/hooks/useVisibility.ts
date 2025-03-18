import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { visibilityConfig } from '../config/visibilityConfig';

// Basic path matching function
const pathMatch = (pattern: string, path: string) => {
    // Replace :params with wildcard regex
    const regexPattern = pattern.replace(/:\w+/g, '[^/]+');
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(path);
};

export const useVisibility = () => {
    const { pathname } = useLocation();   // Example: /admin/users/5
    const { role } = useContext(AuthContext);

    // Check if any config pattern matches the actual path
    const config = visibilityConfig.find(
        (entry) => pathMatch(entry.route, pathname) && entry.role === role
    );

    return config ? config.components : [];
};
