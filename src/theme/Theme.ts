export interface ThemeInterface {
    colors: {
        primary: string,
        secondary: string,
        dark: string,
        surface: string,
        muted: string,
    },
    fontFamily: {
        primary: string,
    },
    fontSize: {
        sm: string,
        reg: string,
        md: string,
        lg: string,
    },
    shadow: {
        reg: string,
        elevate: string,
    }
}

const Theme: ThemeInterface = {
    colors: {
        primary: "#3A3042",
        secondary: "#D5A021",
        dark: "#333",
        surface: "white",
        muted: "#7d7d7d"
    },
    fontFamily: {
        primary: "Montserrat, sans-serif"
    },
    fontSize: {
        sm: "11px",
        reg: "14px",
        md: "20px",
        lg: "28px"
    },
    shadow: {
        reg: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        elevate: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
    }
}

export default Theme;