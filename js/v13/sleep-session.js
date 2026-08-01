
const SleepSession={
 async create(data){
   const item={
    id:`sleep-${Date.now()}`,
    date:localDateStr(),
    startTime:Date.now(),
    trackId:data.trackId,
    series:data.series||'',
    mode:data.mode||'normal',
    durationSeconds:0,
    finished:false
   };
   await putRecord('sleepSessions',item);
   return item;
 },
 async latest(){
   const list=await getAll('sleepSessions');
   return list.sort((a,b)=>b.startTime-a.startTime)[0];
 }
};
