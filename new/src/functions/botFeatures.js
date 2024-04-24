const { saveDataToFile } = require('./apiRequests');
const { searchNameInFile, findValue } = require('./search');
const { sleep } = require('./utilities');

async function Bazaar_Tracker(global, client) {
    let local = {};
    if (global.trackerType === 'buy') {
        local = {
            "instance": global.instance, // The instance of the program
            "trackerType": global.trackerType, // The type of the tracker (buy/sell)
            "filePath": '../output/output.txt', // The file path of the API's response
            "valueToFind": 'pricePerUnit', // Value searched in the output file to find the price of the item
            "item": global.buy.item[global.instance], // Item tracked
            "price": global.buy.price[global.instance], // Price to reach
            "time": global.buy.time[global.instance], // How often does this function repeat
            "toggleDM": global.buy.toggleDM[global.instance], // Enables DMs
            "userID": global.buy.userID[global.instance], // The person receiving the DMs
            "channel": global.buy.channel[global.instance], // Channel where the bot writes the price history of the item
            "ID": global.buy.ID[global.instance], // The ID of this process
        };
    } else {
        local = {
            "instance": global.instance,
            "trackerType": global.trackerType,
            "filePath": '../output/output.txt',
            "valueToFind": 'pricePerUnit',
            "item": global.sell.item[global.instance],
            "price": global.sell.price[global.instance],
            "time": global.sell.time[global.instance],
            "toggleDM": global.sell.toggleDM[global.instance],
            "userID": global.sell.userID[global.instance],
            "channel": global.sell.channel[global.instance],
            "ID": global.sell.ID[global.instance],
        };
    }
    const channel = client.channels.cache.get(local.channel);
    const user = await client.users.fetch(local.userID);
    while (global.stopCommand != local.ID) {

        await saveDataToFile(local.filePath);
        const context = await searchNameInFile(local.filePath, local.item, local.trackerType);

        const price = parseInt(findValue([context], local.valueToFind), 10);
        const setPrice = local.price;

        const formattedPrice = price.toLocaleString();
        const formattedSetPrice = setPrice.toLocaleString();

        if (local.trackerType === 'buy') {
            if (price < setPrice) {
                channel.send(`${local.item} - COMPRA ORA!!! @everyone - SellPrice: ${formattedPrice} - Set to: ${formattedSetPrice}`); // Output se prezzo conveniente
                if (local.toggleDM) {
                    user.send(`${local.item} - COMPRA ORA!!! @everyone - SellPrice: ${formattedPrice} - Set to: ${formattedSetPrice}`) // Messaggio nei DM
                        .catch(error => {
                            console.error('Errore durante l\'invio del messaggio nei DM:', error); // Errore durante l'invio del messaggio nei DM
                        }
                    )
                }
            } else {
                channel.send(`${local.item} - Non comprare - SellPrice: ${formattedPrice} - Set to: ${formattedSetPrice}`); // Output se prezzo NON conveniente
            }
        } else {
            if (price > setPrice) {
                channel.send(`${local.item} - VENDI TUTTO ORA!!! @everyone - SellPrice: ${formattedPrice} - Set to: ${formattedSetPrice}`); // Output se prezzo conveniente
                if (local.toggleDM) {
                    user.send(`${local.item} - VENDI TUTTO ORA!!! @everyone - SellPrice: ${formattedPrice} - Set to: ${formattedSetPrice}`) // Messaggio nei DM
                        .catch(error => {
                            console.error('Errore durante l\'invio del messaggio nei DM:', error); // Errore durante l'invio del messaggio nei DM
                        }
                    )
                }
            } else {
                channel.send(`${local.item} - Non vendere - SellPrice: ${formattedPrice} - Set to: ${formattedSetPrice}`); // Output se prezzo NON conveniente
            }
        }

        await sleep(local.time); // Ritardo tra le esecuzioni
    };
};

module.exports = {
    Bazaar_Tracker
};