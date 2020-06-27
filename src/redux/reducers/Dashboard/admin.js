import dayjs from 'dayjs';
import config from 'app-utils/config';

export const responseHandlerAdmin = (data) => {
    const datesEmpty = new Array(7).fill('rand');
    const datesHalf = datesEmpty.reduce((acc, item, index) => {
        return [
            ...acc,
            dayjs()
                .subtract(datesEmpty.length - index - 1, 'day')
                .format(config.dateFormatClientWithoutHours)
        ];
    }, []);
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
