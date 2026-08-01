/**
 * Xiangsheng-plus V1.3 Schema Migration
 * Schema 12 -> 13
 */
function upgradeV13Database(db, transaction, oldVersion){
    if(oldVersion < 7){
        if(!db.objectStoreNames.contains('favorites')){
            const store = db.createObjectStore('favorites',{keyPath:'id'});
            store.createIndex('trackId','trackId',{unique:true});
            store.createIndex('createdAt','createdAt');
        }

        if(!db.objectStoreNames.contains('sleepSessions')){
            const store = db.createObjectStore('sleepSessions',{keyPath:'id'});
            store.createIndex('date','date');
            store.createIndex('trackId','trackId');
        }

        if(!db.objectStoreNames.contains('userProfile')){
            db.createObjectStore('userProfile',{keyPath:'id'});
        }
    }
}
