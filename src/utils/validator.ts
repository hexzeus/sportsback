export const validateBetData = (betData: any) => {
    // Example validation logic here
    if (!betData.team || !betData.amount || !betData.odds || !betData.date) {
        return false;
    }
    return true;
};
