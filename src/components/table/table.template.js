const CODES = {
  A: 65,
  Z: 90,
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function toColumn(char, index) {
  return `<div class="column" data-type="resizeble" data-col="${index}">
      ${char}
      <div class="col-resize" data-resize="col"></div>
    </div>`
}

function toCell(_, index) {
  return `<div class="cell" contenteditable="" data-col="${index}"></div>`
}

function createRow(cols, index) {
  const resizer = index
  ? `<div class="row-resize" data-resize="row"></div>`
  : ''
  return `
  <div class="row" data-type="resizeble" data-row="row">
    <div class="row-info">
    ${index ? index : ''}
    ${resizer}
    </div>
    <div class="row-data">${cols}</div>
  </div>
  `
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(cols, null))

  const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('')

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}
