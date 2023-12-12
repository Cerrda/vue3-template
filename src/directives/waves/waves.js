import './waves.scss'

/**
 * 创建水波纹效果
 * @param {Object} options - 选项对象
 * @param {HTMLElement} options.el - 目标元素
 * @param {MouseEvent} options.e - 鼠标事件
 * @param {Object} options.binding - 绑定对象
 * @param {boolean} options.keep - 是否保持水波纹
 * @param {string} options.group - 水波纹分组
 */
function createRipper({ el, e, binding, keep, group }) {
  el.style.position = 'relative'
  el.style.overflow = 'hidden'
  el.style.zIndex = '1'
  const rect = el.getBoundingClientRect()
  const moreRipple = el.querySelector(`.z-active-keep[data-group="${group}"]`)
  const className = moreRipple ? 'waves-ripple-more' : 'waves-ripple'

  let ripple = el.querySelector(`.${className}[data-group="${group}"]`)

  if (!ripple) {
    if (keep) {
      const waves = document.querySelectorAll(`.z-active-keep[data-group="${group}"]`)
      const shallowWaves = document.querySelector(`.z-active-more[data-group="${group}"]`)
      if (!moreRipple && waves.length > 0) {
        shallowWaves?.remove()
        waves[0].remove()
      }
    }

    ripple = document.createElement('span')
    ripple.className = className
    el.setAttribute('data-group', group)
    ripple.style.height = ripple.style.width = Math.sqrt(rect.width ** 2 + rect.height ** 2) + 'px'
    el.appendChild(ripple)
  } else {
    ripple.className = className
  }

  if (e) {
    ripple.style.top = e.clientY - rect.top - ripple.offsetHeight / 2 + 'px'
    ripple.style.left = e.clientX - rect.left - ripple.offsetWidth / 2 + 'px'
  } else {
    ripple.style.top = rect.height / 2 - ripple.offsetHeight / 2 + 'px'
    ripple.style.left = rect.width / 2 - ripple.offsetWidth / 2 + 'px'
  }

  ripple.style.background = binding.value[0]
  if (moreRipple) {
    ripple.className = `waves-ripple-more z-active-more`
  } else {
    ripple.className = `waves-ripple ${keep ? 'z-active-keep' : 'z-active'}`
  }
  ripple.setAttribute('data-group', group)
}

export default {
  mounted(el, binding) {
    const group = binding.value[2] || 'default'
    el.setAttribute('data-group', group)

    const keep = binding.value[1] === 'keep'

    el.className.includes('active') && keep && createRipper({ el, binding, keep, group })

    el.addEventListener('click', (e) => {
      createRipper({ el, e, binding, keep, group })
    })
  }
}
