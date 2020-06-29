import dayjs from 'dayjs';

import config from 'app-utils/config';

export const getDatesHalf = () => {
    const datesEmpty = new Array(7).fill('rand');
    return datesEmpty.reduce((acc, item, index) => {
        return [
            ...acc,
            dayjs()
                .subtract(datesEmpty.length - index - 1, 'day')
                .format(config.dateFormatClientWithoutHours)
        ];
    }, []);
};
