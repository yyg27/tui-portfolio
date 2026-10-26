// theme name -> accent colour of its dot in the sidebar menu; key order is menu order
const dark: Record<string, string> = {
    amber: "#ffb000",
    matrix: "#27c93f",
    dracula: "#bd93f9",
    evangelion: "#88FF5F",
    cyberpunk: "#fcee09",
    everforest: "#a7c080",
    nord: "#81a1c1",
    fenerbahce: "#E4A419",
    peach: "#FE8254",
    cyan: "#2196f3",
    layor: "#F8F3F0",
    bubblegum: "#e3caff",
};
const light: Record<string, string> = {
    emerald: "#013E37",
    coral: "#f0544d",
    royal: "#014BAA",
    gruvbox: "#9c4b2b",
    violet: "#5f4a8b",
    wine: "#7f011f",
    mimosa: "#ffb000",
};

export const themeColors = { ...dark, ...light };
export const darkThemes = Object.keys(dark);
export const lightThemes = Object.keys(light);
export const themes = [...darkThemes, ...lightThemes];
