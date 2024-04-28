const cooldowns = new Map(); // Object to store the timestamps of the last command usage

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomID(min, max, global) {
    let ID;
    let exist;
    do {
        exist = false
        ID = Math.floor(Math.random() * (max - min + 1)) + min;
        for (let i = 0; i < global.totalInstances; i++) {
            if (global.buy.ID[i] === ID || global.sell.ID[i] === ID) {
                exist = true;
            }
        }
    } while (exist);
    return ID;
}

async function checkStop(global, local_ID, time) {
    while (global.stopCommand !== local_ID) {
        await sleep(time);
    }
    return true;
}

function isCommandOnCooldown(commandName, cooldownTime) { // Check if a command is still on cooldown
    const lastUsageTimestamp = cooldowns.get(commandName); // Get the timestamp of the last command usage
    if (!lastUsageTimestamp || Date.now() - lastUsageTimestamp > cooldownTime) { // If the command hasn't been used yet or the cooldown has expired, return false
        return false;
    }
    return true; // The command is still on cooldown
}

function setCommandCooldown(commandName) { // Set the cooldown for a command
    cooldowns.set(commandName, Date.now()); // Set the current timestamp as the last command usage
}

module.exports = {
    sleep,
    randomID,
    checkStop,
    isCommandOnCooldown,
    setCommandCooldown
};