export const downloadImg = (filename, currentCanvas) => {
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