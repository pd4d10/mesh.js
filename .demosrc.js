export default {
  devServer: {
    port: 9090,
  },
  output: {
    dir: 'docs/demo',
    publicUrl: '.',
  },
  // themeFile: 'demos/theme.scss',
  staticFolder: 'dist',
  demoList: '.demoList.json',
  name: 'MESHJS',
  version: 'v1',
  homePage: 'https://github.com/mesh-js/mesh.js',
  logo: '',
  // 可选主题: active4d, allHallowsEve, amy, blackboard, brillianceBlack,
  // brillianceDull, chromeDevtools, cloudsMidnight, clouds, cobalt,
  // dawn, dreamweaver, eiffel, espressoLibre, github, idle, katzenmilch,
  // kuroirTheme, lazy, magicwbAmiga, merbivoreSoft, merbivore, monokai,
  // pastelsOnDark, slushAndPoppies, solarizedDark, solarizedLight,
  // spacecadet, sunburst, textmateMacClassic, tomorrowNightBlue,
  // tomorrowNightBright, tomorrowNightEighties, tomorrowNight, tomorrow,
  // twilight, vibrantInk, zenburnesque, iplastic, idlefingers, krtheme,
  // monoindustrial,
  boxTheme: 'monokai',
  globalPackages: {
    js: [],
    css: [],
  },
  // tab waterfall
  editorViewMode: 'tab',
};