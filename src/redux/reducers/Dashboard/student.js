export const responseHandlerStudent = (data) => {
    const tickets = Object.keys(data.tickets).reduce((acc, item) => {
        return [
            ...acc,
            {
                name: item,
                value: data.tickets[item].length
            }
        ];
    }, []);
    return {
        tickets
    };
};
