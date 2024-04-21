function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomID(min, max, global) {
    let ID;
    let exist;
    do {
        exist = false
        ID = Math.floor(Math.random() * (max - min + 1)) + min;
        for (let i = 0; i < global.Total_Instances; i++) {
            if (global.buy.ID[i] === ID || global.sell.ID[i] === ID) {
                exist = true;
            }
        }
    } while (exist);
    return ID;
}

module.exports = {
    sleep,
    randomID
};