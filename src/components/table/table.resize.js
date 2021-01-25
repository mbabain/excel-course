import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizeble"]')
  const coordsParent = $parent.getCoords()
  const coordsResizer = $resizer.getCoords()
  const type = $resizer.data.resize
  let value

  $resizer.addClass('active')

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coordsParent.right
      value = coordsParent.width + delta + coordsResizer.width
      $resizer.css({right: -delta - coordsResizer.width + 'px'})
    } else {
      const delta = e.pageY - coordsParent.bottom
      value = coordsParent.height + delta + coordsResizer.height
      $resizer.css({bottom: -delta - coordsResizer.height + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    $resizer.removeClass('active')

    if (type === 'col') {
      $resizer.css({right: 0})
      $parent.css({width: value + 'px'})
      $root
          .findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => el.style.width = value + 'px')
    } else {
      $resizer.css({bottom: 0})
      $parent.css({height: value + 'px'})
    }
  }
}
