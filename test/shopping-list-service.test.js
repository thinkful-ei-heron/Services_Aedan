const knex = require('knex');
const shLi = require('../src/shopping-list-service');

describe('shopping-list-service test suite', () => {
    let db;
    let testInfo = [
        { id: 1, name: 'Fish tricks', price: '13.10', date_added: new Date('2019-11-06T07:00:00.000Z'), checked: false, category: 'Main' },
        { id: 2, name: 'Not Dogs', price: '4.99', date_added: new Date('2019-11-06T07:00:00.000Z'), checked: true, category: 'Snack' },
        { id: 3, name: 'Bluffalo Wings', price: '5.50', date_added: new Date('2019-11-06T07:00:00.000Z'), checked: false, category: 'Snack' },
        { id: 4, name: 'SubstiTuna Salad', price: '1.24', date_added: new Date('2019-11-06T07:00:00.000Z'), checked: false, category: 'Lunch' }
    ];


    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.DB_TEST_URL
        });
    });

    before(() => db('shopping_list').truncate());

    afterEach(() => db('shopping_list').truncate());

    after(() => db.destroy());


    context('shopping_list has info', () => {
        beforeEach(() => {
            return db.into('shopping_list')
                .insert(testInfo);
        });
        it('getShopping() returns with all shopping list rows', () => {
            return shLi.getShopping(db)
                .then(res => {
                    expect(res).to.eql(testInfo)
                });
        });
        it('getShopWithID() returns with expected row using the ID',() => {
            return shLi.getShopWithID(db, 3)
                .then(res => {
                    expect(res).to.eql(testInfo[2]);
                });
        });
        it('deleteShop() deletes requested row with id given', () => {
            return shLi.deleteShop(db, 3) 
                .then(() => shLi.getShopping(db))
                .then(res => {
                    let deletedTest = testInfo.filter(item => item.id !== 3);
                    expect(res).to.eql(deletedTest);
                });
        });
        it('updateShop() updates the row containing id given', () => {
            let id = 2;
            let newInfo = {
                name:'updated name',
                price:'99.99',
                checked:false
            };
            let updatedItem = {...testInfo[1], ...newInfo};
            return shLi.updateShop(db, id, newInfo)
                .then( () => shLi.getShopWithID(db, id))
                .then(res => {
                    expect(res).to.eql(updatedItem);
                });
        });
    });

    context('shopping_list is empty', () => {
        it('getShopping() returns empty array', () => {
            return shLi.getShopping(db)
                .then(res => {
                    expect(res).to.eql([]);
                });
        });
        it('postShopping() posts new row into shopping_list', ()=> {
            let newItem = {
                name: 'post',
                price: '123.42',
                category: 'Snack',
                date_added: new Date('2019-11-06T07:00:00.000Z')
            }
            return shLi.postShopping(db, newItem)
                .then(res => {
                    expect(res).to.eql({
                        id: 1,
                        checked: false,
                        ...newItem
                    });
                });
        });
    });

});