import { getDatesHalf } from 'app-reducers/Dashboard/helpers';

export const responseHandlerAdmin = (data) => {
    const datesHalf = getDatesHalf();
    const tickets = datesHalf.reduce((acc, item) => {
        return [
            ...acc,
            {
                name: item,
                value: data.tickets[item] ? data.tickets[item].length : 0
            }
        ];
    }, []);
    const accepted = datesHalf.reduce((acc, item) => {
        return [
            ...acc,
            {
                name: item,
                value: data.accepted[item] ? data.accepted[item].length : 0
            }
        ];
    }, []);
    const rejected = datesHalf.reduce((acc, item) => {
        return [
            ...acc,
            {
                name: item,
                value: data.rejected[item] ? data.rejected[item].length : 0
            }
        ];
    }, []);
    return {
        tickets,
        accepted,
        rejected
    };
};
