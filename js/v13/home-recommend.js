
/**
 * Xiangsheng-plus V1.3.0-alpha.1
 * Home companion recommendation
 * Only reads existing history/session, does not touch playback core.
 */
const HomeRecommend = {
  init(){
    try{
      const card=document.getElementById('companionCard');
      const text=document.getElementById('companionText');
      const btn=document.getElementById('companionResume');
      if(!card || !text) return;

      const saved=JSON.parse(localStorage.getItem('xs_session_v12')||'null');
      if(saved && saved.title){
        card.style.display='block';
        text.textContent=`${saved.title} · ${saved.series||'继续上次陪伴'}`;
        btn.onclick=()=>{
          if(typeof restoreSession==='function'){
            restoreSession(saved);
          }
        };
        return;
      }

      const history=JSON.parse(localStorage.getItem('xs_history')||'[]');
      if(history.length){
        const last=history[0];
        card.style.display='block';
        text.textContent=`${last.title||'上次节目'} · ${last.artist||''}`;
        btn.onclick=()=>{
          toast('请点击播放按钮开始新的陪伴');
        };
      }
    }catch(e){
      console.warn('HomeRecommend init failed',e);
    }
  }
};

window.addEventListener('load',()=>setTimeout(()=>HomeRecommend.init(),300));
