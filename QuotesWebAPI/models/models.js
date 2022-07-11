
const mongodb = require('mongodb');

const db = require('/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/BackEnd/QuotesWebAPI/database/database.js');


class Quote {

    static async fetch() {
        const quotes = await db.getDb().collection('quotes').find().toArray();
        const randomQouteIndex = Math.floor(Math.random() * 3);
        const randomQuote = quotes[randomQouteIndex];

        return randomQuote;
    }
}

module.exports = Quote