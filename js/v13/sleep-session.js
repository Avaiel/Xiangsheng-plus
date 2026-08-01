/**
 * V1.3 Sleep Session Feature
 */
const SleepSession = {
    async create(data){
        const item = {
            id:`sleep-${Date.now()}`,
            date:localDateStr(),
            startTime:Date.now(),
            trackId:data.trackId,
            series:data.series || '',
            mode:data.mode || 'normal',
            durationSeconds:0,
            finished:false
        };
        await putRecord('sleepSessions', item);
        return item;
    },

    async finish(id, seconds, reason){
        const db = await openDB();
        const tx = db.transaction('sleepSessions','readwrite');
        const store = tx.objectStore('sleepSessions');

        const item = await requestToPromise(store.get(id));

        if(item){
            item.durationSeconds = seconds;
            item.finished = true;
            item.reason = reason;
            item.endTime = Date.now();
            store.put(item);
        }

        await txDone(tx);
    },

    async latest(){
        const list = await getAll('sleepSessions');
        return list.sort((a,b)=>b.startTime-a.startTime)[0];
    }
};
