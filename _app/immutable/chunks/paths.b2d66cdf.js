import{n as c,s as h}from"./scheduler.4b0cb93c.js";const n=[];function q(e,o){return{subscribe:p(e,o).subscribe}}function p(e,o=c){let r;const i=new Set;function u(t){if(h(e,t)&&(e=t,r)){const b=!n.length;for(const s of i)s[1](),n.push(s,e);if(b){for(let s=0;s<n.length;s+=2)n[s][0](n[s+1]);n.length=0}}}function a(t){u(t(e))}function _(t,b=c){const s=[t,b];return i.add(s),i.size===1&&(r=o(u,a)||c),t(e),()=>{i.delete(s),i.size===0&&r&&(r(),r=null)}}return{set:u,update:a,subscribe:_}}var f;const d=((f=globalThis.__sveltekit_1uqlour)==null?void 0:f.base)??"";var l;const k=((l=globalThis.__sveltekit_1uqlour)==null?void 0:l.assets)??d;export{k as a,d as b,q as r,p as w};