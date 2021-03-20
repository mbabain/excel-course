import {storage} from '@core/utils'
import {defaultStyles, defaultTitle} from '@/constants'

const deafultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  titleState: defaultTitle,
  currentStyles: defaultStyles,
}

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : deafultState
