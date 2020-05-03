import config from '../../../utils/config';

const { STAFF, STUDENT } = config.roles;

export const setIsRoleProps = (user) => {
    return {
        ...user,
        isStaff: user.role === STAFF,
        isStudent: user.role === STUDENT
    };
};
