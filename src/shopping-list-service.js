const shoppingListService = {
    getShopping(db) {
        return db.select('*')
            .from('shopping_list');
    },
    getShopWithID(db, id) {
        return db.from('shopping_list')
            .where({id})
            .returning('*')
            .then(row => row[0]);
    },
    deleteShop(db, id) {
        return db.from('shopping_list')
            .where({id})
            .delete();
    },
    updateShop(db, id, newInfo) {
        return db.from('shopping_list')
            .where({id})
            .update(newInfo);
    },
    postShopping(db, newItem) {
        return db.into('shopping_list')
            .insert(newItem)
            .returning('*')
            .then(row => row[0]);
    }
};

module.exports = shoppingListService;