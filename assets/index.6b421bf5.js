import{r as l}from"./react.a12b1adf.js";import{r as d}from"./react-dom.b85c9329.js";function b(){import("data:text/javascript,")}const m=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}};m();var u,y=d.exports;u=y.createRoot;var f={exports:{}},a={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _=l.exports,x=Symbol.for("react.element"),h=Symbol.for("react.fragment"),v=Object.prototype.hasOwnProperty,g=_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,O={key:!0,ref:!0,__self:!0,__source:!0};function p(n,t,s){var o,e={},r=null,i=null;s!==void 0&&(r=""+s),t.key!==void 0&&(r=""+t.key),t.ref!==void 0&&(i=t.ref);for(o in t)v.call(t,o)&&!O.hasOwnProperty(o)&&(e[o]=t[o]);if(n&&n.defaultProps)for(o in t=n.defaultProps,t)e[o]===void 0&&(e[o]=t[o]);return{$$typeof:x,type:n,key:r,ref:i,props:e,_owner:g.current}}a.Fragment=h;a.jsx=p;a.jsxs=p;f.exports=a;const c=f.exports.jsx,j=f.exports.jsxs;function E(){const[n,t]=l.exports.useState([]),s=async()=>{const e=await(await fetch("test.json")).json();console.log(e)};return l.exports.useEffect(()=>{s()},[]),j("div",{children:[c("h1",{children:"Metrics"}),c("span",{children:n})]})}function R(){return c("div",{className:"App",children:c(E,{})})}const L=document.getElementById("root"),S=u(L);S.render(c(l.exports.StrictMode,{children:c(R,{})}));export{b as __vite_legacy_guard};
