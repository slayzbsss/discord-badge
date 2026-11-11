(async () => {
    let wreq = webpackChunkdiscord_app.push([[Symbol()], {}, r => r]);
    webpackChunkdiscord_app.pop();
    const chunks = Object.entries(wreq.m);
    const findChunkByCode = (...codes) => {
        for (let i = 0; i < chunks.length; i++) {
            const [id, func] = chunks[i];
            const chunkCode = func.toString();
            if (codes.every(code => chunkCode.includes(code))) {
                return wreq(id);
            }
        }
        return null;
    };
    const httpModule = findChunkByCode("HTTPUtils");
    if (!httpModule) return console.log("HTTPUtils introuvable.");
    const api = Object.values(httpModule).find(e => e?.get && e?.del && e?.post);
    if (!api) return console.log("API HTTP introuvable.");
    async function setHouse(houseId) {
        try {
            if (houseId === 0) {
                await api.del({ url: "/hypesquad/online" });
                console.log("Badge HypeSquad supprimé ✔");
            } else {
                await api.post({ url: "/hypesquad/online", body: { house_id: houseId } });
                const names = { 1: "Bravery", 2: "Brilliance", 3: "Balance" };
                console.log(`HypeSquad changé en ${names[houseId]} ✔`);
            }
            closeModal();
        } catch (e) {
            alert("Erreur : " + (e?.status || e));
        }
    }
    function closeModal() {
        document.getElementById("nerdblud-hypesquad-modal")?.remove();
    }
    closeModal();
    const modal = document.createElement("div");
    modal.id = "nerdblud-hypesquad-modal";
    modal.innerHTML = `
        <div style="position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:99999;font-family:'gg sans','Noto Sans',Helvetica,Arial,sans-serif;">
            <div style="background:#1e1f22;border-radius:12px;width:520px;max-width:95vw;padding:20px 24px 24px;box-shadow:0 8px 32px rgba(0,0,0,0.55);position:relative;">
                
                <!-- Title -->
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:22px;">
                    <h2 style="margin:0;color:#f2f3f5;font-size:18px;font-weight:600;">HypeSquad Badge By Zeys</h2>
                    <button id="nerd-close" style="background:none;border:none;color:#b5bac1;font-size:22px;cursor:pointer;line-height:1;padding:0 4px;">×</button>
                </div>
                <!-- Cards -->
                <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:22px;">
                    
                    <!-- Bravery -->
                    <div class="house-card" data-house="1" style="background:#2b2d31;border-radius:12px;padding:18px 12px 16px;text-align:center;cursor:pointer;border:2px solid transparent;transition:all 0.15s ease;">
                        <div style="width:52px;height:52px;margin:0 auto 12px;background:#5865f2;border-radius:12px;display:flex;align-items:center;justify-content:center;">
                            <img src="https://cdn.discordapp.com/badge-icons/8a88d63823d8a71cd5e390baa45efa02.png" style="width:32px;height:32px;" draggable="false">
                        </div>
                        <div style="color:#f2f3f5;font-weight:600;font-size:15px;margin-bottom:4px;">Bravery</div>
                        <div style="color:#b5bac1;font-size:12px;line-height:1.35;">Bold, daring, and adventurous</div>
                    </div>
                    <!-- Balance -->
                    <div class="house-card" data-house="3" style="background:#2b2d31;border-radius:12px;padding:18px 12px 16px;text-align:center;cursor:pointer;border:2px solid transparent;transition:all 0.15s ease;">
                        <div style="width:52px;height:52px;margin:0 auto 12px;background:#3ba55d;border-radius:12px;display:flex;align-items:center;justify-content:center;">
                            <img src="https://cdn.discordapp.com/badge-icons/3aa41de486fa12454c3761e8e223442e.png" style="width:32px;height:32px;" draggable="false">
                        </div>
                        <div style="color:#f2f3f5;font-weight:600;font-size:15px;margin-bottom:4px;">Balance</div>
                        <div style="color:#b5bac1;font-size:12px;line-height:1.35;">Kind, easygoing, and always looking for a story</div>
                    </div>
                    <!-- Brilliance -->
                    <div class="house-card" data-house="2" style="background:#2b2d31;border-radius:12px;padding:18px 12px 16px;text-align:center;cursor:pointer;border:2px solid transparent;transition:all 0.15s ease;">
                        <div style="width:52px;height:52px;margin:0 auto 12px;background:#ed4245;border-radius:12px;display:flex;align-items:center;justify-content:center;">
                            <img src="https://cdn.discordapp.com/badge-icons/011940fd013da3f7fb926e4a1cd2e618.png" style="width:32px;height:32px;" draggable="false">
                        </div>
                        <div style="color:#f2f3f5;font-weight:600;font-size:15px;margin-bottom:4px;">Brilliance</div>
                        <div style="color:#b5bac1;font-size:12px;line-height:1.35;">Confident, dedicated, and a lifelong learner</div>
                    </div>
                </div>
                <!-- Remove badge -->
                <button id="nerd-remove" style="width:100%;background:#4e5058;color:#f2f3f5;border:none;border-radius:8px;padding:12px;font-size:14px;font-weight:500;cursor:pointer;transition:background 0.15s;">
                    Remove badge
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById("nerd-close").onclick = closeModal;
    document.getElementById("nerd-remove").onclick = () => setHouse(0);
    modal.querySelectorAll(".house-card").forEach(card => {
        card.onmouseenter = () => {
            card.style.borderColor = "#5865f2";
            card.style.background = "#313338";
        };
        card.onmouseleave = () => {
            card.style.borderColor = "transparent";
            card.style.background = "#2b2d31";
        };
        card.onclick = () => setHouse(parseInt(card.dataset.house));
    });
    modal.firstElementChild.onclick = e => {
        if (e.target === modal.firstElementChild) closeModal();
    };
})();
