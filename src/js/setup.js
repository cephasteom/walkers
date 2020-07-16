export const getCanvasContext = () => {
    let canvas = document.getElementById("canvas")
    return canvas.getContext("2d")
}