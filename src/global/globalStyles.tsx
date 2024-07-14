import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*{
    box-sizing: border-box;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Oxygen, Fira Sans, Droid Sans, sans-serif;
}

html, body{
    padding: 0;
    margin: 0;
    width: 100%;
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory; 
}

a {
    color: inherit;
    text-decoration: none;
  }

`;

export default GlobalStyles;
