(function(window){'use strict';function f(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}function g(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:f(a)}}function h(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c}function k(a){return a instanceof Array?a:h(g(a))}var l="https://fums.api.bible";
function m(){for(var a=21,b=crypto.getRandomValues(new Uint8Array(a)),c="";a--;)c+="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW"[b[a]&63];return c}function r(a){var b=(new Uint8Array(a.length)).map(function(c,d){return a.charCodeAt(d)});return crypto.subtle.digest("SHA-256",b).then(function(c){return Array.from(new Uint8Array(c)).map(function(d){return d.toString(16).padStart(2,"0")}).join("")})}var t=window.localStorage.getItem("fums.dId");
t||(t=m(),window.localStorage.setItem("fums.dId",t));var u=window.sessionStorage.getItem("fums.sId");u||(u=m(),window.sessionStorage.setItem("fums.sId",u));var v=window.localStorage.getItem("fums.uId")||"";
function x(a,b){var c=l+"/f3",d="?dId="+t+"&sId="+u;b&&(d+="&ts="+b.getTime());v&&(d+="&uId="+v);var n=8192-c.length;"string"===typeof a&&(a=[a]);return a.reduce(function(e,p){var q=e.length-1,w=e[q]||"";0>q||n-w.length<=p.length?e.push("&t="+p):e[q]=w+"&t="+p;return e},[]).map(function(e){return c+d+e})}
function y(a,b){return function(){if(a){if(!window.navigator.onLine){var c=x(a,b||new Date);return window.localStorage.setItem("fums.report."+m(),c.join())}x(a,b).forEach(function(d){return window.fetch(d,{mode:"no-cors"})})}}}
function z(){Object.keys(window.localStorage).filter(function(a){return a.startsWith("fums.report.")}).forEach(function(a){var b=window.localStorage.getItem(a);(b?b.split(","):[]).forEach(function(c){return window.fetch(c,{mode:"no-cors"})});window.localStorage.removeItem(a)})}function A(a){return function(){if(a&&(a.baseUrl&&(l=a.baseUrl),a.userId))return r(a.userId).then(function(b){v=b;window.localStorage.setItem("fums.uId",b)})}}
var B=function(){function a(){function c(){e();b=b.slice(1);0<b.length&&a()}var d=g(b[0]),n=d.next().value,e=d.next().value;Promise.resolve().then(function(){return n()}).then(c).catch(c)}var b=[];return{push:function(c,d){b.push([c,d]);1===b.length&&a()}}}();function C(){var a=g(arguments),b=a.next().value,c=h(a);return new Promise(function(d){"config"===b?B.push(A.apply(null,k(c)),d):"trackView"===b?B.push(y.apply(null,k(c)),d):"trackListen"===b&&B.push(y.apply(null,k(c)),d)})}
(window.fumsData||[]).forEach(function(a){C.apply(null,k(a))});window.fumsData=[];window.fums=C;window.navigator.onLine&&z();window.addEventListener("online",z);})(window)