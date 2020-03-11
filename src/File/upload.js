import { downloadImg } from "./download";
import Logo from './Logo';

const imgToElement = (element, currentCanvas) => {
    const dataUrl = currentCanvas.toDataURL('image/png');
    const img = `<img src="${dataUrl}" />`
    element.innerHTML = img;
}

export const fitImageToCanvas = (canvas, choice, e) => {
    const reader = new FileReader();
    reader.onload = event => {
        const img = new Image();
        img.onload = () => {
            const currentCanvas = canvas[`${choice}Canvas`];

            // 캔버스와 이미지 크기를 비교하여 배율을 구합니다. (가로, 세로중 더 큰 값을 받습니다.)
            const scale = Math.max(currentCanvas.width / img.width, currentCanvas.height / img.height);

            // 캔버스 내에서 그림을 그릴 위치를 잡습니다. 
            const x = (currentCanvas.width / 2) - (img.width / 2) * scale;
            const y = (currentCanvas.height / 2) - (img.height / 2) * scale;

            // 이미지를 늘리거나 줄여준 채로 그려줍니다.
            canvas[`${choice}Ctx`].drawImage(img, x, y, img.width * scale, img.height * scale);

            // 캔버스 이미지를 클릭하면 파일 다운로드
            const filename = choice;
            currentCanvas.addEventListener('click', () => downloadImg(filename, currentCanvas));
            currentCanvas.style.cursor = 'pointer';

            // 이미지 엘리먼트 생성
            const saveImg = document.getElementById('saveImg');
            imgToElement(saveImg, currentCanvas);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

export const addLogo = (canvas, ctx, handleAddLogoElements, e) => {
    const reader = new FileReader();
    reader.onload = event => {
        const img = new Image();
        img.onload = () => {
            const logoObject = new Logo(canvas, ctx, img);
            handleAddLogoElements(logoObject);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}