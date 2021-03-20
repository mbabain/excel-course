import {toInlineStyles} from '@core/utils'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

const CODES = {
  A: 65,
  Z: 90,
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function toColumn({col, index, width}) {
  return `
  <div
    class="column"
    data-type="resizeble"
    data-col="${index}"
    style="width: ${width}"
  >
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>`
}

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    })
    return `
    <div
      class="cell"
      contenteditable="" 
      data-col="${col}"
      data-type="cell"
      data-id="${id}"
      data-value="${data || ''}"
      style="${styles}; width: ${width}"
    >${parse(data) || ''}</div>`
  }
}

function createRow(cols, index, state) {
  const resizer = index
  ? `<div class="row-resize" data-resize="row"></div>`
  : ''
  const height = getHeight(state, index)
  return `
  <div
    class="row"
    data-type="resizeble"
    data-row="${index}"
    style="height: ${height}"
  >
    <div class="row-info">
    ${index ? index : ''}
    ${resizer}
    </div>
    <div class="row-data">${cols}</div>
  </div>
  `
}

function withWidhtFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state, index),
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidhtFrom(state.colState))
      .map(toColumn)
      .join('')

  rows.push(createRow(cols, null, {}))

  for (let i = 1; i < rowsCount + 1; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, i - 1))
        .join('')

    rows.push(createRow(cells, i, state.rowState))
  }

  return rows.join('')
}
