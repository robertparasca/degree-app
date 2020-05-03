import config from '../../utils/config';

const { STAFF, STUDENT } = config.roles;

export default [
    {
        name: 'Acasa',
        path: '/dashboard',
        exact: true,
        roleRequired: [STAFF, STUDENT]
    },
    {
        name: 'Cereri',
        path: '/cereri',
        exact: true,
        roleRequired: [STAFF, STUDENT]
    },
    {
        name: 'Studenti',
        path: '/studenti',
        exact: true,
        roleRequired: [STAFF]
    },
    {
        name: 'Staff',
        path: '/staff',
        exact: true,
        roleRequired: [STAFF]
    },
    {
        name: 'Setari',
        path: '/setari',
        exact: true,
        roleRequired: [STAFF]
    }
];
