const searchQuery = 'en';

require('dotenv').config();
const knex = require('knex');

const knCon = knex({
    client: 'pg',
    connection: process.env.DB_URL
});

function search(searchQuery) {
    knCon.select('*')
        .from('shopping_list')
        .where('name', 'ilike', `%${searchQuery}%`)
        .then(res => {
            console.log(res);
        });
}

search('he');

function page(pageNumber) {
    let numPagesPer = 6;
    let offset = (pageNumber-1) * numPagesPer;
    knCon.select('*')
        .from('shopping_list')
        .limit(6)
        .offset(offset)
        .then(res => {
            console.log(res);
        });
}

page(2);


function old(daysAgo) {
    knCon.select('*')
        .from('shopping_list')
        .where('date_added', '>', knCon.raw(`now() - '?? days'::interval`, daysAgo))
        .then(res => {
            console.log(res);
        });
}

old('31');

function cost() {
    knCon.select('category')
        .sum('price as total-cost')
        .from('shopping_list')
        .groupBy('category')
        .then(res=> {
            console.log(res);
        });

}

cost();