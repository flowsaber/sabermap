import { css } from '@emotion/react'

const backColor = "rgb(60,60,60)"
const color = "rgba(255,255,255, 0.05)"

export const canvasStyle = css(`
    height: 100%;
    background-color: ${backColor};
    background-size: 50px 50px;
    background-image: linear-gradient(
        0deg,
        transparent 24%,
        ${color} 25%,
        ${color} 26%,
        transparent 27%,
        transparent 74%,
        ${color} 75%,
        ${color} 76%,
        transparent 77%,
        transparent
      ),
      linear-gradient(
        90deg,
        transparent 24%,
        ${color} 25%,
        ${color} 26%,
        transparent 27%,
        transparent 74%,
        ${color} 75%,
        ${color} 76%,
        transparent 77%,
        transparent
      );
`)
