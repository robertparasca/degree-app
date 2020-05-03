export const getStaffIdFromRoute = (router, splitter = '/vizualizare/') => {
    if (router.location.pathname.includes(splitter)) {
        return router.location.pathname.split(splitter)[1];
    }
    return router.location.pathname.split(splitter)[1];
};
