/**
 * V1.3.0-alpha.1.2
 * Resume Fix
 *
 * 说明：
 * 不再创建第二个“继续昨晚”入口。
 * 统一使用原有 resumeCard -> resumeYes -> restoreSession。
 */

const ResumeUpgrade = {
    render(saved){

        const card = document.getElementById('resumeCard');
        const title = document.getElementById('resumeTitle');
        const sub = document.getElementById('resumeSub');
        const btn = document.getElementById('resumeYes');
        const cancel = document.getElementById('resumeNo');

        if(!card || !saved) return;

        title.textContent = '▶ 继续播放';

        const position =
            saved.positions?.[saved.phase] ||
            saved.elapsed ||
            0;

        sub.textContent =
            `${saved.title || '未知节目'} · 已播放 ${Math.floor(position/60)} 分钟`;

        btn.textContent = '继续播放';

        btn.onclick = async()=>{

            await restoreSession(saved);

        };

        cancel.textContent = '清除记录';

        cancel.onclick = ()=>{

            card.classList.remove('show');
            localStorage.removeItem(SESSION_KEY);

        };

        card.classList.add('show');
    }
};

window.ResumeUpgrade = ResumeUpgrade;
