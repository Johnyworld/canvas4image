import { fitImageToCanvas, addLogo } from "./upload";

let logoElements = [];

let choice = 'profile';

let mousePos = { x: 0, y: 0 }

const canvas = {
    profileCanvas: document.getElementById('profileCanvas'),
    profileCtx: profileCanvas.getContext('2d'),
    bannerCanvas: document.getElementById('bannerCanvas'),
    bannerCtx: bannerCanvas.getContext('2d'),
    dragCanvas: document.getElementById('dragCanvas'),
    dragCtx: dragCanvas.getContext('2d')
}

const uploadInput = document.getElementById('uploadInput');
const choiceWrapper = document.getElementById('choiceWrapper');
const inputs = choiceWrapper.querySelectorAll('input');

const onChangeChoice = (e) => {
    uploadInput.value = ''; 
    choice = e.target.value;
}

const handleAddLogoElements = (object) => {
    logoElements = [...logoElements, object];
}

const uploading = (e) => {
    if ( choice ) {
        if ( choice === 'logo' ) {
            addLogo(canvas.dragCanvas, canvas.dragCtx, handleAddLogoElements, e);
        } else {
            fitImageToCanvas(canvas, choice, e);
        }
    }
}

const getMousePos = (canvas, e) => {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
}

const mouseMove = (canvas) => (e) => {
    mousePos = getMousePos(canvas, e);
}

const handleDragging = () => {
    const topLayer = logoElements.slice().reverse().find(element=> {
        element.update( mousePos );

        const edgeTop = element.pos.y
        const edgeBottom = element.pos.y + element.height;
        const edgeLeft = element.pos.x
        const edgeRight = element.pos.x + element.width;

        const isMouseInObjectX = mousePos.x > edgeLeft && mousePos.x < edgeRight;
        const isMouseInObjectY = mousePos.y > edgeTop && mousePos.y < edgeBottom;

        return isMouseInObjectX && isMouseInObjectY;
    });

    topLayer.dragging = true;
    topLayer.offset.x = mousePos.x - topLayer.pos.x;
    topLayer.offset.y = mousePos.y - topLayer.pos.y;
}

const handleDraggingOff = () => {
    logoElements.forEach(element=> {
        element.dragging = false;
        element.offset.x = 0;
        element.offset.y = 0;
    })
}

const define = () => {
    uploadInput.addEventListener('change', uploading);
    inputs.forEach(input=> {
        input.addEventListener('change', onChangeChoice);
    })
    canvas.dragCanvas.addEventListener('mousemove', mouseMove(canvas.dragCanvas))
    canvas.dragCanvas.addEventListener('mousedown', handleDragging);
    canvas.dragCanvas.addEventListener('mouseup', handleDraggingOff);
}

const run = () => {
    canvas.dragCtx.clearRect(0, 0, canvas.dragCanvas.width, canvas.dragCanvas.height);
    requestAnimationFrame(() => run(canvas, logoElements));
    logoElements.forEach(element=> {
        element.update( mousePos );
    });
    canvas.dragCtx.beginPath();
}

run();

export default { define }