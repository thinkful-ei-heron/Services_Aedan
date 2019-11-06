const ArticlesService = {
    getAllArticles(db) {
        return db.select('*').from('blogful_articles');
    },
    getById(db, id) {
        return db.select('*')
            .from('blogful_articles')
            .where('id', id)
            .first();
    },
    insertArticle(db, article) {
        return db.into('blogful_articles')
            .insert(article)
            .returning('*')
            .then(row => row[0]);
    },
    deleteArticle(db, id) {
        return db.from('blogful_articles')
            .where({id})
            .delete();
    },
    updateArticle(db, id, newInfo) {
        return db.from('blogful_articles')
            .where({id})
            .update(newInfo);
    }
};

module.exports = ArticlesService;