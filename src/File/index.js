import { canvas } from '../Canvas'

let choice = 'profile';

const uploadInput = document.getElementById('uploadInput');
const choiceWrapper = document.getElementById('choiceWrapper');
const inputs = choiceWrapper.querySelectorAll('input');

const onChangeChoice = (e) => {
    uploadInput.value = ''; 
    choice = e.target.value;
}

const downloadImg = (filename, currentCanvas) => {
    // 이미지를 DOM 엘리먼트로 만들어줍니다.
    let dataUrl = currentCanvas.toDataURL('image/png');
    dataUrl = dataUrl.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
    dataUrl = dataUrl.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

    // 이미지 다운로드
    let aTag = document.createElement('a');
    aTag.download = `${filename}.png`;
    aTag.href = dataUrl;
    aTag.click();
}

const imgToElement = (element, currentCanvas) => {
    const dataUrl = currentCanvas.toDataURL('image/png');
    const img = `<img src="${dataUrl}" />`
    element.innerHTML = img;
}

const uploading = (e) => {
    if ( choice ) {
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
}

const define = () => {
    uploadInput.addEventListener('change', uploading);
    inputs.forEach(input=> {
        input.addEventListener('change', onChangeChoice);
    })
}

export default { define }