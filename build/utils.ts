enum STYLE_ENUM {
  CSS = 'css',
  SASS = 'sass',
  LESS = 'less',
  STYLUS = 'stylus',
  SCSS = 'sass'
}
const loaderRegexs = {
  [STYLE_ENUM.CSS]: /\.css$/,
  [STYLE_ENUM.SASS]: /\.(scss|sass)$/,
  [STYLE_ENUM.LESS]: /\.less$/,
  [STYLE_ENUM.STYLUS]: /\.styl$/
}

const styleLoadersArray = ['style-loader', 'css-loader']

const loaderOptions = [
  {
    key: STYLE_ENUM.LESS,
    options: {
      lessOptions: {
        javascriptEnabled: true
      }
    }
  },
  {
    key: STYLE_ENUM.SASS
  },
  {
    key: STYLE_ENUM.LESS
  },
  {
    key: STYLE_ENUM.STYLUS
  }
]

export function generateCssLoader() {
  const ret = []
  for (const { key, options } of loaderOptions) {
    if (key === STYLE_ENUM.SASS) {
      ret.push({
        test: loaderRegexs.sass,
        use: [...styleLoadersArray, 'sass-loader']
      })
    } else if (key === STYLE_ENUM.CSS) {
      ret.push({
        test: loaderRegexs[key],
        use: [...styleLoadersArray]
      })
    } else {
      options
        ? ret.push({
            test: loaderRegexs[key],
            use: [
              ...styleLoadersArray,
              {
                loader: `${key}-loader`,
                options: { ...options }
              }
            ]
          })
        : ret.push({
            test: loaderRegexs[key],
            use: [...styleLoadersArray, `${key}-loader`]
          })
    }
  }
  return ret
}
