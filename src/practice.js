require('dotenv').config();
const knex = require('knex');

const kn = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

 kn.from('amazong_products')
    .select('product_id', 'name', 'price', 'category')
    .where('name', 'ilike', '%holo%')
    .where({price: '19.99'})
    // .toQuery();
    .then(res => {
        console.log(res);
    });
    // console.log(query);