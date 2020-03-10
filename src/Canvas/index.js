
export const canvas = {
    profileCanvas: document.getElementById('profileCanvas'),
    profileCtx: profileCanvas.getContext('2d'),
    bannerCanvas: document.getElementById('bannerCanvas'),
    bannerCtx: bannerCanvas.getContext('2d')
}

export default {
    render: () => {
        canvas.profileCtx.fillStyle = '#eee';
        canvas.profileCtx.fillRect(0, 0, 300, 300);
        canvas.bannerCtx.fillStyle = '#eee';
        canvas.bannerCtx.fillRect(0, 0, 500, 200);
    }
}
