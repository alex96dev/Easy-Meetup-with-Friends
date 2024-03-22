import { createGlobalStyle } from "styled-components";

export const theme = {
  primaryColor: "#efe8d8",
  textColor: "#262524",
  alertColor: "#dea0a0",
  confirmColor: "#b4c9ab",

  secondaryColors: {
    sports: "#86b2b1",
    culture: "#c16b6b",
    food: "#e2aa60",
    outdoor: "#96ad8c",
    default: "#efe8d8",
  },
  fonts: {
    heading: "Averia Serif Libre, serif",
    text: "Noto Serif Thai Condensed, serif",
  },
  fontSizes: {
    xs: "0.8rem",
    small: "1rem",
    medium: "1.5rem",
    ml: "1.7rem",
    large: "2rem",
    xl: "2.5rem",
  },

  spacing: {
    xs: "0.3rem",
    small: "0.6rem",
    medium: "1.2rem",
    large: "1.8rem",
    xl: "2rem",
  },
  box: {
    shadow: "5px 5px 0 #262524",
    shadowSmall: "2px 3px 0 #262524",
    hover: "3px 3px 0 #262524",
    height: "4.8rem",
    width: "20rem",
  },

  line: {
    width: "21.5rem",
  },

  borderRadius: {
    small: "5px",
    medium: "10px",
    large: "15px",
  },
  borderWidth: {
    thin: "1px",
    medium: "2px",
    thick: "4px",
  },
  button: {
    xs: "1.5rem",
    small: "2rem",
    medium: "2.5rem",
    large: "3rem",
    lx: "6rem",
    xl: "11.5rem",
  },
};

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: ${theme.fonts.text};
    color: ${theme.textColor};
    background-color: ${theme.primaryColor}
  }

h1, h2, h3, h4{
  font-family: ${theme.fonts.heading};
}

h1{
font-size: ${theme.fontSizes.large};
margin: ${theme.spacing.medium};
margin-left: ${theme.spacing.small};
}

h2{ 
  font-size: ${theme.fontSizes.medium}
}

h4{
  font-size: ${theme.fontSizes.small}
}

li{
  list-style: none;
  font-size: ${theme.fontSizes.medium}

}

p{
font-size: ${theme.fontSizes.small}
}

button{
height: ${theme.button.medium};
background-color: ${theme.primaryColor};
border-color: ${theme.textColor};
border-radius: ${theme.borderRadius.medium};
border-width: ${theme.borderWidth.medium};
border-style: solid;
box-shadow: ${theme.box.shadow};
}

button:hover{
box-shadow: ${theme.box.hover};
}

a {
  text-decoration: none;
color: ${theme.textColor};
}

input {
  border: none;
  appearance: none; 
  outline: none;
}

input:focus,:active {
  appearance: none; 
  outline: none;
  
}

select {

  outline: none;
}


select:focus,:active {
   outline: none;
   appearance: none;

}

textarea {
  appearance: none; 
  outline: none;
}


textarea:focus,:active {
   outline: none;
   appearance: none;

}


`;
