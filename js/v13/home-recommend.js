
/**
 * Xiangsheng-plus V1.3.0-alpha.1.1
 * Home Recommend Fix
 *
 * 修复：
 * 1. 继续播放按钮无法触发恢复
 * 2. 恢复后主播放区域不同步
 */

const HomeRecommend = {

    render(){

        const card = document.querySelector('#resumeCard');
        if(!card) return;

        const saved = readJson(SESSION_KEY, null);

        if(!saved) return;

        const btn = document.querySelector('#resumeYes');

        if(btn){

            btn.onclick = async()=>{

                try{

                    await restoreSession(saved);

                    updateNowPlaying(
                        activeRuntime().meta,
                        session.phase
                    );

                    updateMediaPlaybackState();

                }catch(err){

                    toast(
                        `恢复失败：${err.message}`,
                        3000
                    );

                }

            };

        }

    }

};


window.HomeRecommend = HomeRecommend;
