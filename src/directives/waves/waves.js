import './waves.scss'

function createRipper({ el, e, binding, activeClassName }) {
  el.style.position = 'relative'
  el.style.overflow = 'hidden'
  const rect = el.getBoundingClientRect()
  const moreRipple = el.querySelector('.z-active-keep')
  const className = moreRipple ? 'waves-ripple-more' : 'waves-ripple'

  let ripple = el.querySelector(`.${className}`)

  if (!ripple) {
    ripple = document.createElement('span')
    ripple.className = className
    ripple.style.height = ripple.style.width = Math.sqrt(rect.width ** 2 + rect.height ** 2) + 'px'
    el.appendChild(ripple)
  } else {
    ripple.className = className
  }

  ripple.style.top = e.clientY - rect.top - ripple.offsetHeight / 2 + 'px'
  ripple.style.left = e.clientX - rect.left - ripple.offsetWidth / 2 + 'px'

  ripple.style.background = binding.value
  ripple.className = moreRipple ? `waves-ripple ${activeClassName} z-active-more` : `waves-ripple ${activeClassName}`
}

export default {
  mounted(el, binding) {
    el.addEventListener('click', (e) => {
      const keep = binding.arg === 'keep'

      createRipper({ el, e, binding, activeClassName: keep ? 'z-active-keep' : 'z-active' })
    })
  }
}
