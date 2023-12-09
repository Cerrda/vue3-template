// eslint-disable-next-line
module.exports = (viewportWidth, viewportHeight) => {
  // 可转换的 CSS 属性集合
  const transCssAttr = new Set([
    'height',
    'margin',
    'padding',
    'margin-top',
    'margin-bottom',
    'padding-top',
    'padding-bottom',
    'line-height',
    'max-height',
    'min-height'
  ])

  // 特殊处理的 CSS 属性集合
  const specialCssAttr = new Set(['margin', 'padding'])

  // 将数字精确到指定小数位数的函数
  const toFixed = (number, precision) => {
    const multiplier = 10 ** (precision + 1)
    const wholeNumber = Math.floor(number * multiplier)
    return (Math.round(wholeNumber / 10) * 10) / multiplier
  }

  // 将 vw 转换为 vh 单位的函数
  const toVh = (vw) => {
    return toFixed((((vw.split('vw')[0] / 100) * viewportWidth) / viewportHeight) * 100, 5)
  }

  return {
    postcssPlugin: 'hpx2vh',
    Once(css) {
      css.walkRules((rule) => {
        rule.walkDecls((decl) => {
          // 如果不是可转换的 CSS 属性或值中不包含 'vw'，则不进行处理
          if (!transCssAttr.has(decl.prop) || decl.value.indexOf('vw') === -1) return

          if (specialCssAttr.has(decl.prop)) {
            // 对特殊属性进行处理
            const values = decl.value.split(' ')
            const len = values.length
            let newValue = `${toVh(values[0])}vh`

            if (len === 1) newValue += ` ${values[0]}`
            if (len >= 2) newValue += ` ${values[1]}`
            if (len >= 3) newValue += ` ${toVh(values[2])}vh`
            if (len === 4) newValue += ` ${values[3]}`

            decl.value = newValue
          } else {
            // 对其他属性进行处理
            decl.value = `${toVh(decl.value)}vh`
          }
        })
      })
    }
  }
}

// eslint-disable-next-line
module.exports.postcss = true
