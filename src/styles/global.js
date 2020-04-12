import { createGlobalStyle } from 'styled-components';
import background from '../assets/images/background.svg';
export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap');
  *{
    margin:0;
    padding:0;
    outline:0;
    box-sizing:border-box;
  }

  body{
    background:#191920 url(${background}) no-repeat center top;
    -webkit-front-smoothing:antialiased;
  }
  body,imput,button {
    font:14px Roboto,sans-serif;
  }
  #root{
    max-wittondth:1020;
    margin:0 auto;
    padding:0 20 50px;
  }
  button{
    cursor:pointer;
  }
`;
