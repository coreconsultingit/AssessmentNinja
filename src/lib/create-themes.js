// src/lib/create-themes.js

const colors = require('tailwindcss/colors')

function createThemes(themeNames) {
  const themes = {}

  themeNames.forEach(themeName => {
    themes[themeName] = {
      primary: colors[themeName][600],
      'primary-foreground': colors.white,
      secondary: colors[themeName][200],
      'secondary-foreground': colors[themeName][800],
      background: colors.white,
      foreground: colors[themeName][900],
      muted: colors[themeName][100],
      'muted-foreground': colors[themeName][500],
      accent: colors[themeName][300],
      'accent-foreground': colors[themeName][800],
      border: colors[themeName][200],
      ring: colors[themeName][500],
      destructive: colors.red[500],
      'destructive-foreground': colors.white,
    }
  })

  return ({ addBase }) => {
    addBase({
      ':root': themes[themeNames[0]],
      ...Object.fromEntries(
        themeNames.map(themeName => [
          `.theme-${themeName}`,
          themes[themeName]
        ])
      )
    })
  }
}

module.exports = { createThemes }