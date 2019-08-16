/* ============
 * Actions for the layouts module
 * ============
 *
 * The actions that are available on the
 * layout module.
 */

import {
    COLLAPSE_SIDEBAR,
    UNCOLLAPSE_SIDEBAR,
  } from './action-types';
  
  export function collapseSidebar(payload) {
    return {
      type: COLLAPSE_SIDEBAR,
      payload,
    };
  }
  
  
  
  
  export function uncollapseSidebar() {
    return {
      type: UNCOLLAPSE_SIDEBAR,
    }
  }
  
  