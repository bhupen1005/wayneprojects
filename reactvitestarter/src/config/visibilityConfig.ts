export const visibilityConfig = [
    { route: '/admin', role: 'admin', components: ['AddUserButton', 'UserList'] },
    { route: '/admin/users', role: 'admin', components: ['UserList'] },
    { route: '/profile', role: 'user', components: ['ProfileCard'] },
    {
        route: '/admin/users/:id',
        role: 'admin',
        components: ['UserDetails', 'EditUserButton'],
    },
];
