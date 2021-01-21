export const getCanvasContext = () => {
    let canvas = document.getElementById("canvas")
    return canvas.getContext("2d")
}

export const setCanvasDimensions = () => {
    let canvas = document.getElementById("canvas")
    canvas.setAttribute('height', `${window.innerHeight}px`)
    canvas.setAttribute('width', `${window.innerWidth}px`)
}

setCanvasDimensions()

export const canvasCtx = getCanvasContext()