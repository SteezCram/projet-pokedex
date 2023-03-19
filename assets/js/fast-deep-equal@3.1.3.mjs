/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /npm/fast-deep-equal@3.1.3/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
"use strict";export default function r(t,e){if(t===e)return!0;if(t&&e&&"object"==typeof t&&"object"==typeof e){if(t.constructor!==e.constructor)return!1;var o,n,u;if(Array.isArray(t)){if((o=t.length)!=e.length)return!1;for(n=o;0!=n--;)if(!r(t[n],e[n]))return!1;return!0}if(t.constructor===RegExp)return t.source===e.source&&t.flags===e.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===e.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===e.toString();if((o=(u=Object.keys(t)).length)!==Object.keys(e).length)return!1;for(n=o;0!=n--;)if(!Object.prototype.hasOwnProperty.call(e,u[n]))return!1;for(n=o;0!=n--;){var f=u[n];if(!r(t[f],e[f]))return!1}return!0}return t!=t&&e!=e};