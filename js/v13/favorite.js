/**
 * V1.3 Favorite Feature
 */
const Favorite = {
    async add(trackId, tags=[]){
        const item = {
            id:`fav-${trackId}`,
            trackId,
            tags,
            createdAt:Date.now(),
            lastPlayedAt:Date.now(),
            playCount:0
        };
        await putRecord('favorites', item);
        return item;
    },

    async remove(trackId){
        const db = await openDB();
        const tx = db.transaction('favorites','readwrite');
        tx.objectStore('favorites').delete(`fav-${trackId}`);
        await txDone(tx);
    },

    async has(trackId){
        const db = await openDB();
        const tx = db.transaction('favorites','readonly');
        const item = await requestToPromise(
            tx.objectStore('favorites').get(`fav-${trackId}`)
        );
        return !!item;
    },

    async list(){
        return await getAll('favorites');
    }
};
