import { COLLAPSE_SIDEBAR , UNCOLLAPSE_SIDEBAR } from './action-types'

const initialState = {
    sidebarCollapsed: false,
}

const layout = (state = initialState, { type }) => {
  switch (type) {
    case COLLAPSE_SIDEBAR:
      return collapseSidebar(state)
    case UNCOLLAPSE_SIDEBAR:
      return uncollapseSidebar(state);
    default:
      return state
  }
}

function collapseSidebar(state) {
  return {
    ...state, 
    sidebarCollapsed: true,
  }
}

function uncollapseSidebar(state) {
  return {
    ...state,
    sidebarCollapsed: false,
  }
}

export default layout
