export const colors = {
  white: "#FFFFFF",
  black: "#000000",
  lighterBlack: "rgb(18, 18, 18)",
  darkGreen: "#1F3D35",
  lightGreen: "#63dcb8",

  lightGray: "#a4a4a4",
};

export const sizes = {
  m: 18,
};

export const themesStyles = {
  //light theme
  lightContainer: {
    backgroundColor: colors.white,
  },

  lightThemeHeader: {
    color: colors.darkGreen,
  },

  lightThemeText: {
    color: colors.darkGreen,
  },

  //dark theme
  darkContainer: {
    backgroundColor: colors.lighterBlack,
  },

  darkThemeHeader: {
    color: colors.white,
  },

  darkThemeText: {
    color: colors.white,
  },
};

export const getThemedStyles = (scheme) => {
  return {
    themedContainer:
      scheme === "dark"
        ? themesStyles.darkContainer
        : themesStyles.lightContainer,
    themedHeader:
      scheme === "dark"
        ? themesStyles.darkThemeHeader
        : themesStyles.lightThemeHeader,
    themedText:
      scheme === "dark"
        ? themesStyles.darkThemeText
        : themesStyles.lightThemeText,
  };
};
