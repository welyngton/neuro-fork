var ZD=Object.defineProperty;var eT=(r,e,t)=>e in r?ZD(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var q=(r,e,t)=>eT(r,typeof e!="symbol"?e+"":e,t);const tT=()=>{};var tC={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hm=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},nT=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const s=r[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[t++];e[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[t++],o=r[t++],a=r[t++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[n++]=String.fromCharCode(55296+(c>>10)),e[n++]=String.fromCharCode(56320+(c&1023))}else{const i=r[t++],o=r[t++];e[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},qm={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],o=s+1<r.length,a=o?r[s+1]:0,c=s+2<r.length,l=c?r[s+2]:0,B=i>>2,h=(i&3)<<4|a>>4;let p=(a&15)<<2|l>>6,C=l&63;c||(C=64,o||(p=64)),n.push(t[B],t[h],t[p],t[C])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(Hm(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):nT(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=t[r.charAt(s++)],a=s<r.length?t[r.charAt(s)]:0;++s;const l=s<r.length?t[r.charAt(s)]:64;++s;const h=s<r.length?t[r.charAt(s)]:64;if(++s,i==null||a==null||l==null||h==null)throw new rT;const p=i<<2|a>>4;if(n.push(p),l!==64){const C=a<<4&240|l>>2;if(n.push(C),h!==64){const m=l<<6&192|h;n.push(m)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class rT extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const sT=function(r){const e=Hm(r);return qm.encodeByteArray(e,!0)},mu=function(r){return sT(r).replace(/\./g,"")},Kh=function(r){try{return qm.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iT=()=>jm().__FIREBASE_DEFAULTS__,oT=()=>{if(typeof process>"u"||typeof tC>"u")return;const r=tC.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},aT=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&Kh(r[1]);return e&&JSON.parse(e)},$u=()=>{try{return tT()||iT()||oT()||aT()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Jm=r=>{var e,t;return(t=(e=$u())==null?void 0:e.emulatorHosts)==null?void 0:t[r]},cT=r=>{const e=Jm(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},zh=()=>{var r;return(r=$u())==null?void 0:r.config},Km=r=>{var e;return(e=$u())==null?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zm{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uT(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",s=r.iat||0,i=r.sub||r.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...r};return[mu(JSON.stringify(t)),mu(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function lT(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ot())}function Wm(){var e;const r=(e=$u())==null?void 0:e.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function BT(){return typeof window<"u"||$m()}function $m(){return typeof WorkerGlobalScope<"u"&&typeof self<"u"&&self instanceof WorkerGlobalScope}function hT(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Wh(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function dT(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function fT(){const r=ot();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function Qm(){return!Wm()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ym(){return!Wm()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function Qu(){try{return typeof indexedDB=="object"}catch{return!1}}function $h(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}function Xm(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pT="FirebaseError";class un extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=pT,Object.setPrototypeOf(this,un.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Qs.prototype.create)}}class Qs{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?CT(i,n):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new un(s,a,n)}}function CT(r,e){try{let t=0,n="";for(;t<r.length;){const s=r.indexOf("{$",t);if(s===-1){n+=r.substring(t);break}const i=r.indexOf("}",s+2);if(i===-1){n+=r.substring(t);break}const o=r.substring(s+2,i),a=e[o];n+=r.substring(t,s)+(a!=null?String(a):`<${o}?>`),t=i+1}return n}catch{return r}}function gT(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function sn(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const s of t){if(!n.includes(s))return!1;const i=r[s],o=e[s];if(nC(i)&&nC(o)){if(!sn(i,o))return!1}else if(i!==o)return!1}for(const s of n)if(!t.includes(s))return!1;return!0}function nC(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oo(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function Xo(r){const e={};return r.replace(/^\?/,"").split("&").forEach(n=>{if(n){const[s,i]=n.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Zo(r){const e=r.indexOf("?");if(!e)return"";const t=r.indexOf("#",e);return r.substring(e,t>0?t:void 0)}function mT(r,e){const t=new _T(r,e);return t.subscribe.bind(t)}class _T{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");ET(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:n},s.next===void 0&&(s.next=yB),s.error===void 0&&(s.error=yB),s.complete===void 0&&(s.complete=yB);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function ET(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function yB(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IT=1e3,yT=2,wT=14400*1e3,DT=.5;function rC(r,e=IT,t=yT){const n=e*Math.pow(t,r),s=Math.round(DT*n*(Math.random()-.5)*2);return Math.min(wT,n+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ne(r){return r&&r._delegate?r._delegate:r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ao(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Qh(r){return(await fetch(r,{credentials:"include"})).ok}class gn{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cs="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TT{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new zm;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),n=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(bT(e))try{this.getOrInitializeService({instanceIdentifier:Cs})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(e=Cs){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Cs){return this.instances.has(e)}getOptions(e=Cs){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);n===a&&o.resolve(s)}return s}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&e(i,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:AT(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=Cs){return this.component?this.component.multipleInstances?e:Cs:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function AT(r){return r===Cs?void 0:r}function bT(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zm{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new TT(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yh=[];var me;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(me||(me={}));const e_={debug:me.DEBUG,verbose:me.VERBOSE,info:me.INFO,warn:me.WARN,error:me.ERROR,silent:me.SILENT},vT=me.INFO,RT={[me.DEBUG]:"log",[me.VERBOSE]:"log",[me.INFO]:"info",[me.WARN]:"warn",[me.ERROR]:"error"},PT=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),s=RT[e];if(s)console[s](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Yu{constructor(e){this.name=e,this._logLevel=vT,this._logHandler=PT,this._userLogHandler=null,Yh.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in me))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?e_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,me.DEBUG,...e),this._logHandler(this,me.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,me.VERBOSE,...e),this._logHandler(this,me.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,me.INFO,...e),this._logHandler(this,me.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,me.WARN,...e),this._logHandler(this,me.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,me.ERROR,...e),this._logHandler(this,me.ERROR,...e)}}function ST(r){Yh.forEach(e=>{e.setLogLevel(r)})}function NT(r,e){for(const t of Yh){let n=null;e&&e.level&&(n=e_[e.level]),r===null?t.userLogHandler=null:t.userLogHandler=(s,i,...o)=>{const a=o.map(c=>{if(c==null)return null;if(typeof c=="string")return c;if(typeof c=="number"||typeof c=="boolean")return c.toString();if(c instanceof Error)return c.message;try{return JSON.stringify(c)}catch{return null}}).filter(c=>c).join(" ");i>=(n??s.logLevel)&&r({level:me[i].toLowerCase(),message:a,args:o,type:s.name})}}}const OT=(r,e)=>e.some(t=>r instanceof t);let sC,iC;function FT(){return sC||(sC=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function xT(){return iC||(iC=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const t_=new WeakMap,XB=new WeakMap,n_=new WeakMap,wB=new WeakMap,Xh=new WeakMap;function LT(r){const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",o)},i=()=>{t(xr(r.result)),s()},o=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&t_.set(t,r)}).catch(()=>{}),Xh.set(e,r),e}function VT(r){if(XB.has(r))return;const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",o),r.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",o),r.addEventListener("abort",o)});XB.set(r,e)}let ZB={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return XB.get(r);if(e==="objectStoreNames")return r.objectStoreNames||n_.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return xr(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function kT(r){ZB=r(ZB)}function MT(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(DB(this),e,...t);return n_.set(n,e.sort?e.sort():[e]),xr(n)}:xT().includes(r)?function(...e){return r.apply(DB(this),e),xr(t_.get(this))}:function(...e){return xr(r.apply(DB(this),e))}}function GT(r){return typeof r=="function"?MT(r):(r instanceof IDBTransaction&&VT(r),OT(r,FT())?new Proxy(r,ZB):r)}function xr(r){if(r instanceof IDBRequest)return LT(r);if(wB.has(r))return wB.get(r);const e=GT(r);return e!==r&&(wB.set(r,e),Xh.set(e,r)),e}const DB=r=>Xh.get(r);function r_(r,e,{blocked:t,upgrade:n,blocking:s,terminated:i}={}){const o=indexedDB.open(r,e),a=xr(o);return n&&o.addEventListener("upgradeneeded",c=>{n(xr(o.result),c.oldVersion,c.newVersion,xr(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const UT=["get","getKey","getAll","getAllKeys","count"],HT=["put","add","delete","clear"],TB=new Map;function oC(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(TB.get(e))return TB.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,s=HT.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||UT.includes(t)))return;const i=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return n&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),s&&c.done]))[0]};return TB.set(e,i),i}kT(r=>({...r,get:(e,t,n)=>oC(e,t)||r.get(e,t,n),has:(e,t)=>!!oC(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qT{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(jT(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function jT(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const _u="@firebase/app",eh="0.16.7";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vn=new Yu("@firebase/app"),JT="@firebase/app-compat",KT="@firebase/analytics-compat",zT="@firebase/analytics",WT="@firebase/app-check-compat",$T="@firebase/app-check",QT="@firebase/auth",YT="@firebase/auth-compat",XT="@firebase/crashlytics",ZT="@firebase/database",eA="@firebase/data-connect",tA="@firebase/database-compat",nA="@firebase/functions",rA="@firebase/functions-compat",sA="@firebase/installations",iA="@firebase/installations-compat",oA="@firebase/messaging",aA="@firebase/messaging-compat",cA="@firebase/performance",uA="@firebase/performance-compat",lA="@firebase/remote-config",BA="@firebase/remote-config-compat",hA="@firebase/storage",dA="@firebase/storage-compat",fA="@firebase/firestore",pA="@firebase/ai",CA="@firebase/firestore-compat",gA="firebase",mA="13.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Da="[DEFAULT]",_A={[_u]:"fire-core",[JT]:"fire-core-compat",[zT]:"fire-analytics",[KT]:"fire-analytics-compat",[$T]:"fire-app-check",[WT]:"fire-app-check-compat",[QT]:"fire-auth",[YT]:"fire-auth-compat",[XT]:"fire-cls",[ZT]:"fire-rtdb",[eA]:"fire-data-connect",[tA]:"fire-rtdb-compat",[nA]:"fire-fn",[rA]:"fire-fn-compat",[sA]:"fire-iid",[iA]:"fire-iid-compat",[oA]:"fire-fcm",[aA]:"fire-fcm-compat",[cA]:"fire-perf",[uA]:"fire-perf-compat",[lA]:"fire-rc",[BA]:"fire-rc-compat",[hA]:"fire-gcs",[dA]:"fire-gcs-compat",[fA]:"fire-fst",[CA]:"fire-fst-compat",[pA]:"fire-vertex","fire-js":"fire-js",[gA]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hr=new Map,Si=new Map,Ni=new Map;function th(r,e){try{r.container.addComponent(e)}catch(t){Vn.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function EA(r,e){r.container.addOrOverwriteComponent(e)}function mn(r){const e=r.name;if(Ni.has(e))return Vn.debug(`There were multiple attempts to register component ${e}.`),!1;Ni.set(e,r);for(const t of Hr.values())th(t,r);for(const t of Si.values())th(t,r);return!0}function qn(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function s_(r,e,t=Da){qn(r,e).clearInstance(t)}function Zh(r){return r.options!==void 0}function i_(r){return Zh(r)?!1:"authIdToken"in r||"appCheckToken"in r||"releaseOnDeref"in r||"automaticDataCollectionEnabled"in r}function He(r){return r==null?!1:r.settings!==void 0}function IA(){Ni.clear()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yA={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},kt=new Qs("app","Firebase",yA);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o_{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new gn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw kt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aC(r,e){const t=Kh(r.split(".")[1]);if(t===null){console.error(`FirebaseServerApp ${e} is invalid: second part could not be parsed.`);return}if(JSON.parse(t).exp===void 0){console.error(`FirebaseServerApp ${e} is invalid: expiration claim could not be parsed`);return}const s=JSON.parse(t).exp*1e3,i=new Date().getTime();s-i<=0&&console.error(`FirebaseServerApp ${e} is invalid: the token has expired.`)}class wA extends o_{constructor(e,t,n,s){const i=t.automaticDataCollectionEnabled!==void 0?t.automaticDataCollectionEnabled:!0,o={name:n,automaticDataCollectionEnabled:i};if(e.apiKey!==void 0)super(e,o,s);else{const a=e;super(a.options,o,s)}this._serverConfig={automaticDataCollectionEnabled:i,...t},this._serverConfig.authIdToken&&aC(this._serverConfig.authIdToken,"authIdToken"),this._serverConfig.appCheckToken&&aC(this._serverConfig.appCheckToken,"appCheckToken"),this._finalizationRegistry=null,typeof FinalizationRegistry<"u"&&(this._finalizationRegistry=new FinalizationRegistry(()=>{this.automaticCleanup()})),this._refCount=0,this.incRefCount(this._serverConfig.releaseOnDeref),this._serverConfig.releaseOnDeref=void 0,t.releaseOnDeref=void 0,Ut(_u,eh,"serverapp")}toJSON(){}get refCount(){return this._refCount}incRefCount(e){this.isDeleted||(this._refCount++,e!==void 0&&this._finalizationRegistry!==null&&this._finalizationRegistry.register(e,this))}decRefCount(){return this.isDeleted?0:--this._refCount}automaticCleanup(){this.isDeleted||c_(this)}get settings(){return this.checkDestroyed(),this._serverConfig}checkDestroyed(){if(this.isDeleted)throw kt.create("server-app-deleted")}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ys=mA;function a_(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n={name:Da,automaticDataCollectionEnabled:!0,...e},s=n.name;if(typeof s!="string"||!s)throw kt.create("bad-app-name",{appName:String(s)});if(t||(t=zh()),!t)throw kt.create("no-options");const i=Hr.get(s);if(i)if(sn(t,i.options)){if(sn(n,i.config))return i;throw kt.create("duplicate-app",{appName:s,mismatchedParam:"config",oldValue:JSON.stringify(i.config),newValue:JSON.stringify(n)})}else throw kt.create("duplicate-app",{appName:s,mismatchedParam:"options",oldValue:JSON.stringify(i.options),newValue:JSON.stringify(t)});const o=new Zm(s);for(const c of Ni.values())o.addComponent(c);const a=new o_(t,n,o);return Hr.set(s,a),a}function DA(r,e={}){if(BT()&&!$m())throw kt.create("invalid-server-app-environment");let t,n=e||{};if(r&&(Zh(r)?t=r.options:i_(r)?n=r:t=r),n.automaticDataCollectionEnabled===void 0&&(n.automaticDataCollectionEnabled=!0),t||(t=zh()),!t)throw kt.create("no-options");const s={...n,...t};s.releaseOnDeref!==void 0&&delete s.releaseOnDeref;const i=B=>[...B].reduce((h,p)=>Math.imul(31,h)+p.charCodeAt(0)|0,0);if(n.releaseOnDeref!==void 0&&typeof FinalizationRegistry>"u")throw kt.create("finalization-registry-not-supported",{});const o=""+i(JSON.stringify(s)),a=Si.get(o);if(a)return a.incRefCount(n.releaseOnDeref),a;const c=new Zm(o);for(const B of Ni.values())c.addComponent(B);const l=new wA(t,n,o,c);return Si.set(o,l),l}function Xu(r=Da){const e=Hr.get(r);if(!e&&r===Da&&zh())return a_();if(!e)throw kt.create("no-app",{appName:r});return e}function TA(){return Array.from(Hr.values())}async function c_(r){let e=!1;const t=r.name;Hr.has(t)?(e=!0,Hr.delete(t)):Si.has(t)&&r.decRefCount()<=0&&(Si.delete(t),e=!0),e&&(await Promise.all(r.container.getProviders().map(n=>n.delete())),r.isDeleted=!0)}function Ut(r,e,t){let n=_A[r]??r;t&&(n+=`-${t}`);const s=n.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${n}" with version "${e}":`];s&&o.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Vn.warn(o.join(" "));return}mn(new gn(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}function AA(r,e){if(r!==null&&typeof r!="function")throw kt.create("invalid-log-argument");NT(r,e)}function bA(r){ST(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vA="firebase-heartbeat-database",RA=1,Ta="firebase-heartbeat-store";let AB=null;function u_(){return AB||(AB=r_(vA,RA,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(Ta)}catch(t){console.warn(t)}}}}).catch(r=>{throw kt.create("idb-open",{originalErrorMessage:r.message})})),AB}async function PA(r){try{const t=(await u_()).transaction(Ta),n=await t.objectStore(Ta).get(l_(r));return await t.done,n}catch(e){if(e instanceof un)Vn.warn(e.message);else{const t=kt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Vn.warn(t.message)}}}async function cC(r,e){try{const n=(await u_()).transaction(Ta,"readwrite");await n.objectStore(Ta).put(e,l_(r)),await n.done}catch(t){if(t instanceof un)Vn.warn(t.message);else{const n=kt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Vn.warn(n.message)}}}function l_(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SA=1024,NA=30;class OA{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new xA(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=uC();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>NA){const o=LA(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){Vn.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=uC(),{heartbeatsToSend:n,unsentEntries:s}=FA(this._heartbeatsCache.heartbeats),i=mu(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return Vn.warn(t),""}}}function uC(){return new Date().toISOString().substring(0,10)}function FA(r,e=SA){const t=[];let n=r.slice();for(const s of r){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),lC(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),lC(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class xA{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Qu()?$h().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await PA(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return cC(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return cC(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function lC(r){return mu(JSON.stringify({version:2,heartbeats:r})).length}function LA(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let n=1;n<r.length;n++)r[n].date<t&&(t=r[n].date,e=n);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function VA(r){mn(new gn("platform-logger",e=>new qT(e),"PRIVATE")),mn(new gn("heartbeat",e=>new OA(e),"PRIVATE")),Ut(_u,eh,r),Ut(_u,eh,"esm2020"),Ut("fire-js","")}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nh="firebase-js-sdk-policy",kA=["https://www.googletagmanager.com/gtag/js","https://apis.google.com/js/api.js","https://www.google.com/recaptcha/api.js","https://www.google.com/recaptcha/enterprise.js"];let Fc,B_=!1;function h_(r){if(!kA.some(t=>r.startsWith(t)&&(r.length===t.length||r.charAt(t.length)==="?")))throw new TypeError(`Firebase: Refusing to load untrusted script URL: ${r}`);return r}function MA(){if(Fc===void 0){Fc=null;const r=typeof window<"u"?window.trustedTypes:void 0;if(r!=null&&r.createPolicy)try{Fc=r.createPolicy(nh,{createScriptURL:h_})}catch{B_=!0}}return Fc}function ed(r,e){h_(e);const t=MA();if(t){r.src=t.createScriptURL(e);return}try{r.src=e}catch(n){throw B_&&Vn.error(`Unable to load ${e} because this page requires Trusted Types for scripts but does not allow the "${nh}" Trusted Types policy. To fix this, add "${nh}" to the trusted-types directive of the page's Content-Security-Policy.`),n}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */VA("");var GA="firebase",UA="13.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ut(GA,UA,"app");const tk=Object.freeze(Object.defineProperty({__proto__:null,FirebaseError:un,SDK_VERSION:Ys,_DEFAULT_ENTRY_NAME:Da,_addComponent:th,_addOrOverwriteComponent:EA,_apps:Hr,_clearComponents:IA,_components:Ni,_getProvider:qn,_isFirebaseApp:Zh,_isFirebaseServerApp:He,_isFirebaseServerAppSettings:i_,_registerComponent:mn,_removeServiceInstance:s_,_serverApps:Si,_setTrustedScriptSrc:ed,deleteApp:c_,getApp:Xu,getApps:TA,initializeApp:a_,initializeServerApp:DA,onLog:AA,registerVersion:Ut,setLogLevel:bA},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HA={PHONE:"phone",TOTP:"totp"},qA={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",PHONE:"phone",TWITTER:"twitter.com"},jA={EMAIL_LINK:"emailLink",EMAIL_PASSWORD:"password",FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PHONE:"phone",TWITTER:"twitter.com"},JA={LINK:"link",REAUTHENTICATE:"reauthenticate",SIGN_IN:"signIn"},KA={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zA(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registered for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is incorrect, malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend.","unsupported-password-policy-schema-version":"The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.","password-does-not-meet-requirements":"The password does not meet the requirements.","invalid-hosting-link-domain":"The provided Hosting link domain is not configured in Firebase Hosting or is not owned by the current project. This cannot be a default Hosting domain (`web.app` or `firebaseapp.com`)."}}function d_(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const WA=zA,f_=d_,p_=new Qs("auth","Firebase",d_()),$A={ADMIN_ONLY_OPERATION:"auth/admin-restricted-operation",ARGUMENT_ERROR:"auth/argument-error",APP_NOT_AUTHORIZED:"auth/app-not-authorized",APP_NOT_INSTALLED:"auth/app-not-installed",CAPTCHA_CHECK_FAILED:"auth/captcha-check-failed",CODE_EXPIRED:"auth/code-expired",CORDOVA_NOT_READY:"auth/cordova-not-ready",CORS_UNSUPPORTED:"auth/cors-unsupported",CREDENTIAL_ALREADY_IN_USE:"auth/credential-already-in-use",CREDENTIAL_MISMATCH:"auth/custom-token-mismatch",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"auth/requires-recent-login",DEPENDENT_SDK_INIT_BEFORE_AUTH:"auth/dependent-sdk-initialized-before-auth",DYNAMIC_LINK_NOT_ACTIVATED:"auth/dynamic-link-not-activated",EMAIL_CHANGE_NEEDS_VERIFICATION:"auth/email-change-needs-verification",EMAIL_EXISTS:"auth/email-already-in-use",EMULATOR_CONFIG_FAILED:"auth/emulator-config-failed",EXPIRED_OOB_CODE:"auth/expired-action-code",EXPIRED_POPUP_REQUEST:"auth/cancelled-popup-request",INTERNAL_ERROR:"auth/internal-error",INVALID_API_KEY:"auth/invalid-api-key",INVALID_APP_CREDENTIAL:"auth/invalid-app-credential",INVALID_APP_ID:"auth/invalid-app-id",INVALID_AUTH:"auth/invalid-user-token",INVALID_AUTH_EVENT:"auth/invalid-auth-event",INVALID_CERT_HASH:"auth/invalid-cert-hash",INVALID_CODE:"auth/invalid-verification-code",INVALID_CONTINUE_URI:"auth/invalid-continue-uri",INVALID_CORDOVA_CONFIGURATION:"auth/invalid-cordova-configuration",INVALID_CUSTOM_TOKEN:"auth/invalid-custom-token",INVALID_DYNAMIC_LINK_DOMAIN:"auth/invalid-dynamic-link-domain",INVALID_EMAIL:"auth/invalid-email",INVALID_EMULATOR_SCHEME:"auth/invalid-emulator-scheme",INVALID_IDP_RESPONSE:"auth/invalid-credential",INVALID_LOGIN_CREDENTIALS:"auth/invalid-credential",INVALID_MESSAGE_PAYLOAD:"auth/invalid-message-payload",INVALID_MFA_SESSION:"auth/invalid-multi-factor-session",INVALID_OAUTH_CLIENT_ID:"auth/invalid-oauth-client-id",INVALID_OAUTH_PROVIDER:"auth/invalid-oauth-provider",INVALID_OOB_CODE:"auth/invalid-action-code",INVALID_ORIGIN:"auth/unauthorized-domain",INVALID_PASSWORD:"auth/wrong-password",INVALID_PERSISTENCE:"auth/invalid-persistence-type",INVALID_PHONE_NUMBER:"auth/invalid-phone-number",INVALID_PROVIDER_ID:"auth/invalid-provider-id",INVALID_RECIPIENT_EMAIL:"auth/invalid-recipient-email",INVALID_SENDER:"auth/invalid-sender",INVALID_SESSION_INFO:"auth/invalid-verification-id",INVALID_TENANT_ID:"auth/invalid-tenant-id",MFA_INFO_NOT_FOUND:"auth/multi-factor-info-not-found",MFA_REQUIRED:"auth/multi-factor-auth-required",MISSING_ANDROID_PACKAGE_NAME:"auth/missing-android-pkg-name",MISSING_APP_CREDENTIAL:"auth/missing-app-credential",MISSING_AUTH_DOMAIN:"auth/auth-domain-config-required",MISSING_CODE:"auth/missing-verification-code",MISSING_CONTINUE_URI:"auth/missing-continue-uri",MISSING_IFRAME_START:"auth/missing-iframe-start",MISSING_IOS_BUNDLE_ID:"auth/missing-ios-bundle-id",MISSING_OR_INVALID_NONCE:"auth/missing-or-invalid-nonce",MISSING_MFA_INFO:"auth/missing-multi-factor-info",MISSING_MFA_SESSION:"auth/missing-multi-factor-session",MISSING_PHONE_NUMBER:"auth/missing-phone-number",MISSING_PASSWORD:"auth/missing-password",MISSING_SESSION_INFO:"auth/missing-verification-id",MODULE_DESTROYED:"auth/app-deleted",NEED_CONFIRMATION:"auth/account-exists-with-different-credential",NETWORK_REQUEST_FAILED:"auth/network-request-failed",NULL_USER:"auth/null-user",NO_AUTH_EVENT:"auth/no-auth-event",NO_SUCH_PROVIDER:"auth/no-such-provider",OPERATION_NOT_ALLOWED:"auth/operation-not-allowed",OPERATION_NOT_SUPPORTED:"auth/operation-not-supported-in-this-environment",POPUP_BLOCKED:"auth/popup-blocked",POPUP_CLOSED_BY_USER:"auth/popup-closed-by-user",PROVIDER_ALREADY_LINKED:"auth/provider-already-linked",QUOTA_EXCEEDED:"auth/quota-exceeded",REDIRECT_CANCELLED_BY_USER:"auth/redirect-cancelled-by-user",REDIRECT_OPERATION_PENDING:"auth/redirect-operation-pending",REJECTED_CREDENTIAL:"auth/rejected-credential",SECOND_FACTOR_ALREADY_ENROLLED:"auth/second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"auth/maximum-second-factor-count-exceeded",TENANT_ID_MISMATCH:"auth/tenant-id-mismatch",TIMEOUT:"auth/timeout",TOKEN_EXPIRED:"auth/user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"auth/too-many-requests",UNAUTHORIZED_DOMAIN:"auth/unauthorized-continue-uri",UNSUPPORTED_FIRST_FACTOR:"auth/unsupported-first-factor",UNSUPPORTED_PERSISTENCE:"auth/unsupported-persistence-type",UNSUPPORTED_TENANT_OPERATION:"auth/unsupported-tenant-operation",UNVERIFIED_EMAIL:"auth/unverified-email",USER_CANCELLED:"auth/user-cancelled",USER_DELETED:"auth/user-not-found",USER_DISABLED:"auth/user-disabled",USER_MISMATCH:"auth/user-mismatch",USER_SIGNED_OUT:"auth/user-signed-out",WEAK_PASSWORD:"auth/weak-password",WEB_STORAGE_UNSUPPORTED:"auth/web-storage-unsupported",ALREADY_INITIALIZED:"auth/already-initialized",RECAPTCHA_NOT_ENABLED:"auth/recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"auth/missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"auth/invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"auth/invalid-recaptcha-action",MISSING_CLIENT_TYPE:"auth/missing-client-type",MISSING_RECAPTCHA_VERSION:"auth/missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"auth/invalid-recaptcha-version",INVALID_REQ_TYPE:"auth/invalid-req-type",INVALID_HOSTING_LINK_DOMAIN:"auth/invalid-hosting-link-domain"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eu=new Yu("@firebase/auth");function eu(r,...e){Eu.logLevel<=me.WARN&&Eu.warn(`Auth (${Ys}): ${r}`,...e)}function tu(r,...e){Eu.logLevel<=me.ERROR&&Eu.error(`Auth (${Ys}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jt(r,...e){throw td(r,...e)}function Ft(r,...e){return td(r,...e)}function Zu(r,e,t){const n={...f_(),[e]:t};return new Qs("auth","Firebase",n).create(e,{appName:r.name})}function Ct(r){return Zu(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function co(r,e,t){const n=t;if(!(e instanceof n))throw n.name!==e.constructor.name&&Jt(r,"argument-error"),Zu(r,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function td(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return p_.create(r,...e)}function K(r,e,...t){if(!r)throw td(e,...t)}function Dn(r){const e="INTERNAL ASSERTION FAILED: "+r;throw tu(e),new Error(e)}function sr(r,e){r||Dn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Aa(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.href)||""}function nd(){return BC()==="http:"||BC()==="https:"}function BC(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QA(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(nd()||Wh()||"connection"in navigator)?navigator.onLine:!0}function YA(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa{constructor(e,t){this.shortDelay=e,this.longDelay=t,sr(t>e,"Short delay should be less than long delay!"),this.isMobile=lT()||dT()}get(){return QA()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rd(r,e){sr(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C_{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Dn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Dn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Dn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XA={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZA=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],e0=new Qa(3e4,6e4);function Ge(r,e){return r.tenantId&&!e.tenantId?{...e,tenantId:r.tenantId}:e}async function Ue(r,e,t,n,s={}){return g_(r,s,async()=>{let i={},o={};n&&(e==="GET"?o=n:i={body:JSON.stringify(n)});const a=oo({...o,key:r.config.apiKey}).slice(1),c=await r._getAdditionalHeaders();c["Content-Type"]="application/json",r.languageCode&&(c["X-Firebase-Locale"]=r.languageCode);const l={method:e,headers:c,...i};return hT()||(l.referrerPolicy="strict-origin-when-cross-origin"),r.emulatorConfig&&ao(r.emulatorConfig.host)&&(l.credentials="include"),C_.fetch()(await m_(r,r.config.apiHost,t,a),l)})}async function g_(r,e,t){r._canInitEmulator=!1;const n={...XA,...e};try{const s=new n0(r),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw ea(r,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw ea(r,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw ea(r,"email-already-in-use",o);if(c==="USER_DISABLED")throw ea(r,"user-disabled",o);const B=n[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Zu(r,B,l);Jt(r,B)}}catch(s){if(s instanceof un)throw s;Jt(r,"network-request-failed",{message:String(s)})}}async function dr(r,e,t,n,s={}){const i=await Ue(r,e,t,n,s);return"mfaPendingCredential"in i&&Jt(r,"multi-factor-auth-required",{_serverResponse:i}),i}async function m_(r,e,t,n){const s=`${e}${t}?${n}`,i=r,o=i.config.emulator?rd(r.config,s):`${r.config.apiScheme}://${s}`;return ZA.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function t0(r){switch(r){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class n0{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(Ft(this.auth,"network-request-failed")),e0.get())})}}function ea(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const s=Ft(r,e,n);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hC(r){return r!==void 0&&r.getResponse!==void 0}function dC(r){return r!==void 0&&r.enterprise!==void 0}class __{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return t0(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function r0(r){return(await Ue(r,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function E_(r,e){return Ue(r,"GET","/v2/recaptchaConfig",Ge(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function s0(r,e){return Ue(r,"POST","/v1/accounts:delete",e)}async function i0(r,e){return Ue(r,"POST","/v1/accounts:update",e)}async function Iu(r,e){return Ue(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oa(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function o0(r,e=!1){return ne(r).getIdToken(e)}async function I_(r,e=!1){const t=ne(r),n=await t.getIdToken(e),s=el(n);K(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:n,authTime:oa(bB(s.auth_time)),issuedAtTime:oa(bB(s.iat)),expirationTime:oa(bB(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function bB(r){return Number(r)*1e3}function el(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return tu("JWT malformed, contained fewer than 3 sections"),null;try{const s=Kh(t);return s?JSON.parse(s):(tu("Failed to decode base64 JWT payload"),null)}catch(s){return tu("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function fC(r){const e=el(r);return K(e,"internal-error"),K(typeof e.exp<"u","internal-error"),K(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ir(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw y_(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function y_(r){return r instanceof un?r.code==="auth/user-disabled"||r.code==="auth/user-token-expired":!1}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a0{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const n=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=oa(this.lastLoginAt),this.creationTime=oa(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ba(r){var h;const e=r.auth,t=await r.getIdToken(),n=await ir(r,Iu(e,{idToken:t}));K(n==null?void 0:n.users.length,e,"internal-error");const s=n.users[0];r._notifyReloadListener(s);const i=(h=s.providerUserInfo)!=null&&h.length?D_(s.providerUserInfo):[],o=c0(r.providerData,i),a=r.isAnonymous,c=!(r.email&&s.passwordHash)&&!(o!=null&&o.length),l=a?c:!1,B={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new rh(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(r,B)}async function w_(r){const e=ne(r);await ba(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function c0(r,e){return[...r.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function D_(r){return r.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function u0(r,e){const t=await g_(r,{},async()=>{const n=oo({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=r.config,o=await m_(r,s,"/v1/token",`key=${i}`),a=await r._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:n};return r.emulatorConfig&&ao(r.emulatorConfig.host)&&(c.credentials="include"),C_.fetch()(o,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function l0(r,e){return Ue(r,"POST","/v2/accounts:revokeToken",Ge(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e5}updateFromServerResponse(e){K(e.idToken,"internal-error"),K(typeof e.idToken<"u","internal-error"),K(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):fC(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){K(e.length!==0,"internal-error");const t=fC(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(K(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:i}=await u0(e,t);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:i}=t,o=new Ti;return n&&(K(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),s&&(K(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(K(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ti,this.toJSON())}_performRefresh(){return Dn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tr(r,e){K(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class dn{constructor({uid:e,auth:t,stsTokenManager:n,...s}){this.providerId="firebase",this.proactiveRefresh=new a0(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new rh(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await ir(this,this.stsTokenManager.getToken(this.auth,e));return K(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return I_(this,e)}reload(){return w_(this)}_assign(e){this!==e&&(K(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new dn({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){K(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await ba(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(He(this.auth.app))return Promise.reject(Ct(this.auth));const e=await this.getIdToken();return await ir(this,s0(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,a=t.tenantId??void 0,c=t._redirectEventId??void 0,l=t.createdAt??void 0,B=t.lastLoginAt??void 0,{uid:h,emailVerified:p,isAnonymous:C,providerData:m,stsTokenManager:D}=t;K(h&&D,e,"internal-error");const N=Ti.fromJSON(this.name,D);K(typeof h=="string",e,"internal-error"),Tr(n,e.name),Tr(s,e.name),K(typeof p=="boolean",e,"internal-error"),K(typeof C=="boolean",e,"internal-error"),Tr(i,e.name),Tr(o,e.name),Tr(a,e.name),Tr(c,e.name),Tr(l,e.name),Tr(B,e.name);const G=new dn({uid:h,auth:e,email:s,emailVerified:p,displayName:n,isAnonymous:C,photoURL:o,phoneNumber:i,tenantId:a,stsTokenManager:N,createdAt:l,lastLoginAt:B});return m&&Array.isArray(m)&&(G.providerData=m.map(J=>({...J}))),c&&(G._redirectEventId=c),G}static async _fromIdTokenResponse(e,t,n=!1){const s=new Ti;s.updateFromServerResponse(t);const i=new dn({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await ba(i),i}static async _fromGetAccountInfoResponse(e,t,n){const s=t.users[0];K(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?D_(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),a=new Ti;a.updateFromIdToken(n);const c=new dn({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new rh(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pC=new Map;function Yn(r){sr(r instanceof Function,"Expected a class definition");let e=pC.get(r);return e?(sr(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,pC.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}T_.type="NONE";const sh=T_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nu(r,e,t){return`firebase:${r}:${e}:${t}`}class Ns{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:i}=this.auth;this.fullUserKey=nu(this.userKey,s.apiKey,i),this.fullPersistenceKey=nu("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t);try{this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}catch{}}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Iu(this.auth,{idToken:e}).catch(()=>{});return t?dn._fromGetAccountInfoResponse(this.auth,t,e):null}return dn._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){try{this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}catch{}}static async create(e,t,n="authUser"){if(!t.length)return new Ns(Yn(sh),e,n);const s=nu(n,e.config.apiKey,e.name);let i=null,o=null;const a=new Set;for(const p of t){let C=null;try{C=await p._get(s)}catch{a.add(p);continue}try{if(C){let m;if(typeof C=="string"){const D=await Iu(e,{idToken:C}).catch(()=>{});if(!D)break;m=await dn._fromGetAccountInfoResponse(e,D,C)}else m=dn._fromJSON(e,C);i=m,o=p;break}}catch{}}const c=(await Promise.all(t.map(async p=>{try{if(await p._isAvailable())return p;p._lastProbeTimedOut&&a.add(p)}catch{return}}))).filter(p=>p);let l=c[0]||Yn(sh),B=null;o&&i&&(o!==l&&(B=i),l=o);const h=c.filter(p=>p._shouldAllowMigration);return!l._shouldAllowMigration||!h.length?new Ns(l,e,n):(l=h[0],B&&await l._set(s,B.toJSON()),await Promise.all(t.map(async p=>{if(p!==l&&!a.has(p))try{await p._remove(s)}catch{}})),new Ns(l,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CC(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(R_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(A_(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(S_(e))return"Blackberry";if(N_(e))return"Webos";if(b_(e))return"Safari";if((e.includes("chrome/")||v_(e))&&!e.includes("edge/"))return"Chrome";if(P_(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function A_(r=ot()){return/firefox\//i.test(r)}function b_(r=ot()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function v_(r=ot()){return/crios\//i.test(r)}function R_(r=ot()){return/iemobile/i.test(r)}function P_(r=ot()){return/android/i.test(r)}function S_(r=ot()){return/blackberry/i.test(r)}function N_(r=ot()){return/webos/i.test(r)}function sd(r=ot()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function B0(r=ot()){var e;return sd(r)&&!!((e=window.navigator)!=null&&e.standalone)}function h0(){return fT()&&document.documentMode===10}function O_(r=ot()){return sd(r)||P_(r)||N_(r)||S_(r)||/windows phone/i.test(r)||R_(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F_(r,e=[]){let t;switch(r){case"Browser":t=CC(ot());break;case"Worker":t=`${CC(ot())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Ys}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d0{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=i=>new Promise((o,a)=>{try{const c=e(i);o(c)}catch(c){a(c)}});n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function f0(r,e={}){return Ue(r,"GET","/v2/passwordPolicy",Ge(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p0=6;class C0{constructor(e){var n;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??p0,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((n=e.allowedNonAlphanumericCharacters)==null?void 0:n.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g0{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new gC(this),this.idTokenSubscription=new gC(this),this.beforeStateQueue=new d0(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=p_,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Yn(t)),this._initializationPromise=this.queue(async()=>{var n,s,i;if(!this._deleted){try{this.persistenceManager=await Ns.create(this,e)}catch(o){eu(`Failed to initialize persistence: ${o}`),this.persistenceManager=await Ns.create(this,[])}finally{(n=this._resolvePersistenceManagerAvailable)==null||n.call(this)}if(!this._deleted){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}try{await this.initializeCurrentUser(t)}catch(o){eu(`Failed to initialize current user: ${o}`)}this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Iu(this,{idToken:e}),n=await dn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(He(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,a=n==null?void 0:n._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c!=null&&c.user)&&(n=c.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(o){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return K(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ba(e)}catch(t){if(y_(t))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=YA()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(He(this.app))return Promise.reject(Ct(this));const t=e?ne(e):null;return t&&K(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&K(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return He(this.app)?Promise.reject(Ct(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return He(this.app)?Promise.reject(Ct(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Yn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await f0(this),t=new C0(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Qs("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await l0(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Yn(e)||this._popupRedirectResolver;K(t,this,"argument-error"),this.redirectPersistenceManager=await Ns.create(this,[Yn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)==null?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(K(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}).catch(c=>{if(!o)if(typeof t!="function"&&t.error)t.error(c);else if(n)n(c);else throw c}),typeof t=="function"){const c=e.addObserver(t,n,s);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){if(this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,this.persistenceManager)try{e?await this.persistenceManager.setCurrentUser(e):await this.persistenceManager.removeCurrentUser()}catch(t){const n=(t==null?void 0:t.message)||String(t),s=Zu(this,"internal-error",`An internal AuthError has occurred: ${n}`);throw s.customData={originalError:t},s}}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return K(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=F_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){var t;if(He(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&eu(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function ze(r){return ne(r)}class gC{constructor(e){this.auth=e,this.observer=null,this.addObserver=mT(t=>this.observer=t)}get next(){return K(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ya={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function m0(r){Ya=r}function id(r){return Ya.loadJS(r)}function _0(){return Ya.recaptchaV2Script}function E0(){return Ya.recaptchaEnterpriseScript}function I0(){return Ya.gapiScript}function x_(r){return`__${r}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y0=500,w0=6e4,xc=1e12;class D0{constructor(e){this.auth=e,this.counter=xc,this._widgets=new Map}render(e,t){const n=this.counter;return this._widgets.set(n,new b0(e,this.auth.name,t||{})),this.counter++,n}reset(e){var n;const t=e||xc;(n=this._widgets.get(t))==null||n.delete(),this._widgets.delete(t)}getResponse(e){var n;const t=e||xc;return((n=this._widgets.get(t))==null?void 0:n.getResponse())||""}async execute(e){var n;const t=e||xc;return(n=this._widgets.get(t))==null||n.execute(),""}}class T0{constructor(){this.enterprise=new A0}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class A0{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class b0{constructor(e,t,n){this.params=n,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const s=typeof e=="string"?document.getElementById(e):e;K(s,"argument-error",{appName:t}),this.container=s,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=v0(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},w0)},y0))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function v0(r){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let n=0;n<r;n++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R0="recaptcha-enterprise",aa="NO_RECAPTCHA",mC="onFirebaseAuthREInstanceReady";class Jn{constructor(e){this.type=R0,this.auth=ze(e)}async verify(e="verify",t=!1){async function n(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,a)=>{E_(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const l=new __(c);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function s(i,o,a){const c=window.grecaptcha;dC(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:e}).then(l=>{o(l)}).catch(()=>{o(aa)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new T0().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{n(this.auth).then(async a=>{if(!t&&dC(window.grecaptcha)&&Jn.scriptInjectionDeferred)await Jn.scriptInjectionDeferred.promise,s(a,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=E0();c.length!==0&&(c+=a+`&onload=${mC}`),Jn.scriptInjectionDeferred=new zm,window[mC]=()=>{var l;(l=Jn.scriptInjectionDeferred)==null||l.resolve()},id(c).then(()=>{var l;return(l=Jn.scriptInjectionDeferred)==null?void 0:l.promise}).then(()=>{s(a,i,o)}).catch(l=>{o(l)})}}).catch(a=>{o(a)})})}}Jn.scriptInjectionDeferred=null;async function jo(r,e,t,n=!1,s=!1){const i=new Jn(r);let o;if(s)o=aa;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const a={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in a){const c=a.phoneEnrollmentInfo.phoneNumber,l=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const c=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return n?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function Lr(r,e,t,n,s){var i,o;if(s==="EMAIL_PASSWORD_PROVIDER")if((i=r._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await jo(r,e,t,t==="getOobCode");return n(r,a)}else return n(r,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await jo(r,e,t,t==="getOobCode");return n(r,c)}else return Promise.reject(a)});else if(s==="PHONE_PROVIDER")if((o=r._getRecaptchaConfig())!=null&&o.isProviderEnabled("PHONE_PROVIDER")){const a=await jo(r,e,t);return n(r,a).catch(async c=>{var l;if(((l=r._getRecaptchaConfig())==null?void 0:l.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(c.code==="auth/missing-recaptcha-token"||c.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);const B=await jo(r,e,t,!1,!0);return n(r,B)}return Promise.reject(c)})}else{const a=await jo(r,e,t,!1,!0);return n(r,a)}else return Promise.reject(s+" provider is not supported.")}async function L_(r){const e=ze(r),t=await E_(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),n=new __(t);e.tenantId==null?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,n.isAnyProviderEnabled()&&new Jn(e).verify().catch(()=>{})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V_(r,e){const t=qn(r,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(sn(i,e??{}))return s;Jt(s,"already-initialized")}return t.initialize({options:e})}function P0(r,e){const t=(e==null?void 0:e.persistence)||[],n=(Array.isArray(t)?t:[t]).map(Yn);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}function k_(r,e,t){const n=ze(r);K(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const s=!!(t!=null&&t.disableWarnings),i=M_(e),{host:o,port:a}=S0(e),c=a===null?"":`:${a}`,l={url:`${i}//${o}${c}/`},B=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!n._canInitEmulator){K(n.config.emulator&&n.emulatorConfig,n,"emulator-config-failed"),K(sn(l,n.config.emulator)&&sn(B,n.emulatorConfig),n,"emulator-config-failed");return}n.config.emulator=l,n.emulatorConfig=B,n.settings.appVerificationDisabledForTesting=!0,ao(o)?Qh(`${i}//${o}${c}`):s||N0()}function M_(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function S0(r){const e=M_(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(n);if(s){const i=s[1];return{host:i,port:_C(n.substr(i.length+1))}}else{const[i,o]=n.split(":");return{host:i,port:_C(o)}}}function _C(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function N0(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uo{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Dn("not implemented")}_getIdTokenResponse(e){return Dn("not implemented")}_linkToIdToken(e,t){return Dn("not implemented")}_getReauthenticationResolver(e){return Dn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function G_(r,e){return Ue(r,"POST","/v1/accounts:resetPassword",Ge(r,e))}async function O0(r,e){return Ue(r,"POST","/v1/accounts:update",e)}async function F0(r,e){return Ue(r,"POST","/v1/accounts:signUp",e)}async function x0(r,e){return Ue(r,"POST","/v1/accounts:update",Ge(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function L0(r,e){return dr(r,"POST","/v1/accounts:signInWithPassword",Ge(r,e))}async function tl(r,e){return Ue(r,"POST","/v1/accounts:sendOobCode",Ge(r,e))}async function V0(r,e){return tl(r,e)}async function k0(r,e){return tl(r,e)}async function M0(r,e){return tl(r,e)}async function G0(r,e){return tl(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function U0(r,e){return dr(r,"POST","/v1/accounts:signInWithEmailLink",Ge(r,e))}async function H0(r,e){return dr(r,"POST","/v1/accounts:signInWithEmailLink",Ge(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi extends uo{constructor(e,t,n,s=null){super("password",n),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Oi(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new Oi(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Lr(e,t,"signInWithPassword",L0,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return U0(e,{email:this._email,oobCode:this._password});default:Jt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Lr(e,n,"signUpPassword",F0,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return H0(e,{idToken:t,email:this._email,oobCode:this._password});default:Jt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tr(r,e){return dr(r,"POST","/v1/accounts:signInWithIdp",Ge(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const q0="http://localhost";class kn extends uo{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new kn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Jt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s,...i}=t;if(!n||!s)return null;const o=new kn(n,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return tr(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,tr(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,tr(e,t)}buildRequest(){const e={requestUri:q0,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=oo(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function EC(r,e){return Ue(r,"POST","/v1/accounts:sendVerificationCode",Ge(r,e))}async function j0(r,e){return dr(r,"POST","/v1/accounts:signInWithPhoneNumber",Ge(r,e))}async function J0(r,e){const t=await dr(r,"POST","/v1/accounts:signInWithPhoneNumber",Ge(r,e));if(t.temporaryProof)throw ea(r,"account-exists-with-different-credential",t);return t}const K0={USER_NOT_FOUND:"user-not-found"};async function z0(r,e){const t={...e,operation:"REAUTH"};return dr(r,"POST","/v1/accounts:signInWithPhoneNumber",Ge(r,t),K0)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr extends uo{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new Vr({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new Vr({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return j0(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return J0(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return z0(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:s}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:s}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:n,phoneNumber:s,temporaryProof:i}=e;return!n&&!t&&!s&&!i?null:new Vr({verificationId:t,verificationCode:n,phoneNumber:s,temporaryProof:i})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W0(r){switch(r){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function $0(r){const e=Xo(Zo(r)).link,t=e?Xo(Zo(e)).deep_link_id:null,n=Xo(Zo(r)).deep_link_id;return(n?Xo(Zo(n)).link:null)||n||t||e||r}class lo{constructor(e){const t=Xo(Zo(e)),n=t.apiKey??null,s=t.oobCode??null,i=W0(t.mode??null);K(n&&s&&i,"argument-error"),this.apiKey=n,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=$0(e);try{return new lo(t)}catch{return null}}}function Q0(r){return lo.parseLink(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(){this.providerId=es.PROVIDER_ID}static credential(e,t){return Oi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=lo.parseLink(t);return K(n,"argument-error"),Oi._fromEmailAndCode(e,n.code,n.tenantId)}}es.PROVIDER_ID="password";es.EMAIL_PASSWORD_SIGN_IN_METHOD="password";es.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bo extends fr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class ca extends Bo{static credentialFromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;return K("providerId"in t&&"signInMethod"in t,"argument-error"),kn._fromParams(t)}credential(e){return this._credential({...e,nonce:e.rawNonce})}_credential(e){return K(e.idToken||e.accessToken,"argument-error"),kn._fromParams({...e,providerId:this.providerId,signInMethod:this.providerId})}static credentialFromResult(e){return ca.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return ca.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n,oauthTokenSecret:s,pendingToken:i,nonce:o,providerId:a}=e;if(!n&&!s&&!t&&!i||!a)return null;try{return new ca(a)._credential({idToken:t,accessToken:n,nonce:o,pendingToken:i})}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn extends Bo{constructor(){super("facebook.com")}static credential(e){return kn._fromParams({providerId:Kn.PROVIDER_ID,signInMethod:Kn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Kn.credentialFromTaggedObject(e)}static credentialFromError(e){return Kn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Kn.credential(e.oauthAccessToken)}catch{return null}}}Kn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Kn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn extends Bo{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return kn._fromParams({providerId:zn.PROVIDER_ID,signInMethod:zn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return zn.credentialFromTaggedObject(e)}static credentialFromError(e){return zn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return zn.credential(t,n)}catch{return null}}}zn.GOOGLE_SIGN_IN_METHOD="google.com";zn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn extends Bo{constructor(){super("github.com")}static credential(e){return kn._fromParams({providerId:Wn.PROVIDER_ID,signInMethod:Wn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Wn.credentialFromTaggedObject(e)}static credentialFromError(e){return Wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Wn.credential(e.oauthAccessToken)}catch{return null}}}Wn.GITHUB_SIGN_IN_METHOD="github.com";Wn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y0="http://localhost";class va extends uo{constructor(e,t){super(e,e),this.pendingToken=t}_getIdTokenResponse(e){const t=this.buildRequest();return tr(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,tr(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,tr(e,t)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s,pendingToken:i}=t;return!n||!s||!i||n!==s?null:new va(n,i)}static _create(e,t){return new va(e,t)}buildRequest(){return{requestUri:Y0,returnSecureToken:!0,pendingToken:this.pendingToken}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X0="saml.";class yu extends fr{constructor(e){K(e.startsWith(X0),"argument-error"),super(e)}static credentialFromResult(e){return yu.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return yu.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const t=va.fromJSON(e);return K(t,"argument-error"),t}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:t,providerId:n}=e;if(!t||!n)return null;try{return va._create(n,t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n extends Bo{constructor(){super("twitter.com")}static credential(e,t){return kn._fromParams({providerId:$n.PROVIDER_ID,signInMethod:$n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return $n.credentialFromTaggedObject(e)}static credentialFromError(e){return $n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return $n.credential(t,n)}catch{return null}}}$n.TWITTER_SIGN_IN_METHOD="twitter.com";$n.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function U_(r,e){return dr(r,"POST","/v1/accounts:signUp",Ge(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const i=await dn._fromIdTokenResponse(e,n,s),o=IC(n);return new on({user:i,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=IC(n);return new on({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function IC(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Z0(r){var s;if(He(r.app))return Promise.reject(Ct(r));const e=ze(r);if(await e._initializationPromise,(s=e.currentUser)!=null&&s.isAnonymous)return new on({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await U_(e,{returnSecureToken:!0}),n=await on._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(n.user),n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu extends un{constructor(e,t,n,s){super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,wu.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new wu(e,t,n,s)}}function H_(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?wu._fromErrorAndOperation(r,i,e,n):i})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q_(r){return new Set(r.map(({providerId:e})=>e).filter(e=>!!e))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eb(r,e){const t=ne(r);await nl(!0,t,e);const{providerUserInfo:n}=await i0(t.auth,{idToken:await t.getIdToken(),deleteProvider:[e]}),s=q_(n||[]);return t.providerData=t.providerData.filter(i=>s.has(i.providerId)),s.has("phone")||(t.phoneNumber=null),await t.auth._persistUserIfCurrent(t),t}async function od(r,e,t=!1){const n=await ir(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return on._forOperation(r,"link",n)}async function nl(r,e,t){await ba(e);const n=q_(e.providerData),s=r===!1?"provider-already-linked":"no-such-provider";K(n.has(t)===r,e.auth,s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function j_(r,e,t=!1){const{auth:n}=r;if(He(n.app))return Promise.reject(Ct(n));const s="reauthenticate";try{const i=await ir(r,H_(n,s,e,r),t);K(i.idToken,n,"internal-error");const o=el(i.idToken);K(o,n,"internal-error");const{sub:a}=o;return K(r.uid===a,n,"user-mismatch"),on._forOperation(r,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Jt(n,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function J_(r,e,t=!1){if(He(r.app))return Promise.reject(Ct(r));const n="signIn",s=await H_(r,n,e),i=await on._fromIdTokenResponse(r,n,s);return t||await r._updateCurrentUser(i.user),i}async function rl(r,e){return J_(ze(r),e)}async function K_(r,e){const t=ne(r);return await nl(!1,t,e.providerId),od(t,e)}async function z_(r,e){return j_(ne(r),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tb(r,e){return dr(r,"POST","/v1/accounts:signInWithCustomToken",Ge(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nb(r,e){if(He(r.app))return Promise.reject(Ct(r));const t=ze(r),n=await tb(t,{token:e,returnSecureToken:!0}),s=await on._fromIdTokenResponse(t,"signIn",n);return await t._updateCurrentUser(s.user),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xa{constructor(e,t){this.factorId=e,this.uid=t.mfaEnrollmentId,this.enrollmentTime=new Date(t.enrolledAt).toUTCString(),this.displayName=t.displayName}static _fromServerResponse(e,t){return"phoneInfo"in t?ad._fromServerResponse(e,t):"totpInfo"in t?cd._fromServerResponse(e,t):Jt(e,"internal-error")}}class ad extends Xa{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,t){return new ad(t)}}class cd extends Xa{constructor(e){super("totp",e)}static _fromServerResponse(e,t){return new cd(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sl(r,e,t){var n;K(((n=t.url)==null?void 0:n.length)>0,r,"invalid-continue-uri"),K(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,r,"invalid-dynamic-link-domain"),K(typeof t.linkDomain>"u"||t.linkDomain.length>0,r,"invalid-hosting-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.linkDomain=t.linkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(K(t.iOS.bundleId.length>0,r,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(K(t.android.packageName.length>0,r,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ud(r){const e=ze(r);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function rb(r,e,t){const n=ze(r),s={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&sl(n,s,t),await Lr(n,s,"getOobCode",k0,"EMAIL_PASSWORD_PROVIDER")}async function sb(r,e,t){await G_(ne(r),{oobCode:e,newPassword:t}).catch(async n=>{throw n.code==="auth/password-does-not-meet-requirements"&&ud(r),n})}async function ib(r,e){await x0(ne(r),{oobCode:e})}async function W_(r,e){const t=ne(r),n=await G_(t,{oobCode:e}),s=n.requestType;switch(K(s,t,"internal-error"),s){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":K(n.newEmail,t,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":K(n.mfaInfo,t,"internal-error");default:K(n.email,t,"internal-error")}let i=null;return n.mfaInfo&&(i=Xa._fromServerResponse(ze(t),n.mfaInfo)),{data:{email:(n.requestType==="VERIFY_AND_CHANGE_EMAIL"?n.newEmail:n.email)||null,previousEmail:(n.requestType==="VERIFY_AND_CHANGE_EMAIL"?n.email:n.newEmail)||null,multiFactorInfo:i},operation:s}}async function ob(r,e){const{data:t}=await W_(ne(r),e);return t.email}async function ab(r,e,t){if(He(r.app))return Promise.reject(Ct(r));const n=ze(r),o=await Lr(n,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",U_,"EMAIL_PASSWORD_PROVIDER").catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&ud(r),c}),a=await on._fromIdTokenResponse(n,"signIn",o);return await n._updateCurrentUser(a.user),a}function cb(r,e,t){return He(r.app)?Promise.reject(Ct(r)):rl(ne(r),es.credential(e,t)).catch(async n=>{throw n.code==="auth/password-does-not-meet-requirements"&&ud(r),n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ub(r,e,t){const n=ze(r),s={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function i(o,a){K(a.handleCodeInApp,n,"argument-error"),a&&sl(n,o,a)}i(s,t),await Lr(n,s,"getOobCode",M0,"EMAIL_PASSWORD_PROVIDER")}function lb(r,e){const t=lo.parseLink(e);return(t==null?void 0:t.operation)==="EMAIL_SIGNIN"}async function Bb(r,e,t){if(He(r.app))return Promise.reject(Ct(r));const n=ne(r),s=es.credentialWithLink(e,t||Aa());return K(s._tenantId===(n.tenantId||null),n,"tenant-id-mismatch"),rl(n,s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hb(r,e){return Ue(r,"POST","/v1/accounts:createAuthUri",Ge(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function db(r,e){const t=nd()?Aa():"http://localhost",n={identifier:e,continueUri:t},{signinMethods:s}=await hb(ne(r),n);return s||[]}async function fb(r,e){const t=ne(r),s={requestType:"VERIFY_EMAIL",idToken:await r.getIdToken()};e&&sl(t.auth,s,e);const{email:i}=await V0(t.auth,s);i!==r.email&&await r.reload()}async function pb(r,e,t){const n=ne(r),i={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await r.getIdToken(),newEmail:e};t&&sl(n.auth,i,t);const{email:o}=await G0(n.auth,i);o!==r.email&&await r.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cb(r,e){return Ue(r,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gb(r,e){const{displayName:t,photoURL:n}=e;if(t===void 0&&n===void 0)return;const s=ne(r),o={idToken:await s.getIdToken(),displayName:t,photoUrl:n,returnSecureToken:!0},a=await ir(s,Cb(s.auth,o));s.displayName=a.displayName||null,s.photoURL=a.photoUrl||null;const c=s.providerData.find(({providerId:l})=>l==="password");c&&(c.displayName=s.displayName,c.photoURL=s.photoURL),await s._updateTokensIfNecessary(a)}function mb(r,e){const t=ne(r);return He(t.auth.app)?Promise.reject(Ct(t.auth)):$_(t,e,null)}function _b(r,e){return $_(ne(r),null,e)}async function $_(r,e,t){const{auth:n}=r,i={idToken:await r.getIdToken(),returnSecureToken:!0};e&&(i.email=e),t&&(i.password=t);const o=await ir(r,O0(n,i));await r._updateTokensIfNecessary(o,!0)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eb(r){var s,i;if(!r)return null;const{providerId:e}=r,t=r.rawUserInfo?JSON.parse(r.rawUserInfo):{},n=r.isNewUser||r.kind==="identitytoolkit#SignupNewUserResponse";if(!e&&(r!=null&&r.idToken)){const o=(i=(s=el(r.idToken))==null?void 0:s.firebase)==null?void 0:i.sign_in_provider;if(o){const a=o!=="anonymous"&&o!=="custom"?o:null;return new Ai(n,a)}}if(!e)return null;switch(e){case"facebook.com":return new Ib(n,t);case"github.com":return new yb(n,t);case"google.com":return new wb(n,t);case"twitter.com":return new Db(n,t,r.screenName||null);case"custom":case"anonymous":return new Ai(n,null);default:return new Ai(n,e,t)}}class Ai{constructor(e,t,n={}){this.isNewUser=e,this.providerId=t,this.profile=n}}class Q_ extends Ai{constructor(e,t,n,s){super(e,t,n),this.username=s}}class Ib extends Ai{constructor(e,t){super(e,"facebook.com",t)}}class yb extends Q_{constructor(e,t){super(e,"github.com",t,typeof(t==null?void 0:t.login)=="string"?t==null?void 0:t.login:null)}}class wb extends Ai{constructor(e,t){super(e,"google.com",t)}}class Db extends Q_{constructor(e,t,n){super(e,"twitter.com",t,n)}}function Tb(r){const{user:e,_tokenResponse:t}=r;return e.isAnonymous&&!t?{providerId:null,isNewUser:!1,profile:null}:Eb(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ab(r,e){return ne(r).setPersistence(e)}function bb(r){return L_(r)}async function vb(r,e){return ze(r).validatePassword(e)}function Y_(r,e,t,n){return ne(r).onIdTokenChanged(e,t,n)}function X_(r,e,t){return ne(r).beforeAuthStateChanged(e,t)}function Rb(r,e,t,n){return ne(r).onAuthStateChanged(e,t,n)}function Pb(r){ne(r).useDeviceLanguage()}function Sb(r,e){return ne(r).updateCurrentUser(e)}function Nb(r){return ne(r).signOut()}function Ob(r,e){return ze(r).revokeAccessToken(e)}async function Fb(r){return ne(r).delete()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(e,t,n){this.type=e,this.credential=t,this.user=n}static _fromIdtoken(e,t){return new Ts("enroll",e,t)}static _fromMfaPendingCredential(e){return new Ts("signin",e)}toJSON(){return{multiFactorSession:{[this.type==="enroll"?"idToken":"pendingCredential"]:this.credential}}}static fromJSON(e){var t,n;if(e!=null&&e.multiFactorSession){if((t=e.multiFactorSession)!=null&&t.pendingCredential)return Ts._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if((n=e.multiFactorSession)!=null&&n.idToken)return Ts._fromIdtoken(e.multiFactorSession.idToken)}return null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ld{constructor(e,t,n){this.session=e,this.hints=t,this.signInResolver=n}static _fromError(e,t){const n=ze(e),s=t.customData._serverResponse,i=(s.mfaInfo||[]).map(a=>Xa._fromServerResponse(n,a));K(s.mfaPendingCredential,n,"internal-error");const o=Ts._fromMfaPendingCredential(s.mfaPendingCredential);return new ld(o,i,async a=>{const c=await a._process(n,o);delete s.mfaInfo,delete s.mfaPendingCredential;const l={...s,idToken:c.idToken,refreshToken:c.refreshToken};switch(t.operationType){case"signIn":const B=await on._fromIdTokenResponse(n,t.operationType,l);return await n._updateCurrentUser(B.user),B;case"reauthenticate":return K(t.user,n,"internal-error"),on._forOperation(t.user,t.operationType,l);default:Jt(n,"internal-error")}})}async resolveSignIn(e){const t=e;return this.signInResolver(t)}}function xb(r,e){var s;const t=ne(r),n=e;return K(e.customData.operationType,t,"argument-error"),K((s=n.customData._serverResponse)==null?void 0:s.mfaPendingCredential,t,"argument-error"),ld._fromError(t,n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yC(r,e){return Ue(r,"POST","/v2/accounts/mfaEnrollment:start",Ge(r,e))}function Lb(r,e){return Ue(r,"POST","/v2/accounts/mfaEnrollment:finalize",Ge(r,e))}function Vb(r,e){return Ue(r,"POST","/v2/accounts/mfaEnrollment:start",Ge(r,e))}function kb(r,e){return Ue(r,"POST","/v2/accounts/mfaEnrollment:finalize",Ge(r,e))}function Mb(r,e){return Ue(r,"POST","/v2/accounts/mfaEnrollment:withdraw",Ge(r,e))}class Bd{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(t=>{t.mfaInfo&&(this.enrolledFactors=t.mfaInfo.map(n=>Xa._fromServerResponse(e.auth,n)))})}static _fromUser(e){return new Bd(e)}async getSession(){return Ts._fromIdtoken(await this.user.getIdToken(),this.user)}async enroll(e,t){const n=e,s=await this.getSession(),i=await ir(this.user,n._process(this.user.auth,s,t));return await this.user._updateTokensIfNecessary(i),this.user.reload()}async unenroll(e){const t=typeof e=="string"?e:e.uid,n=await this.user.getIdToken();try{const s=await ir(this.user,Mb(this.user.auth,{idToken:n,mfaEnrollmentId:t}));this.enrolledFactors=this.enrolledFactors.filter(({uid:i})=>i!==t),await this.user._updateTokensIfNecessary(s),await this.user.reload()}catch(s){throw s}}}const vB=new WeakMap;function Gb(r){const e=ne(r);return vB.has(e)||vB.set(e,Bd._fromUser(e)),vB.get(e)}const Du="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z_{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Du,"1"),this.storage.removeItem(Du),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ub=1e3,Hb=10;class eE extends Z_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=O_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const n=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},i=this.storage.getItem(n);h0()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Hb):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},Ub)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}eE.type="LOCAL";const tE=eE;/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qb=1e3;function RB(r){var n;const e=r.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),t=RegExp(`${e}=([^;]+)`);return((n=document.cookie.match(t))==null?void 0:n[1])??null}function PB(r){return`${window.location.protocol==="http:"?"__dev_":"__HOST-"}FIREBASE_${r.split(":")[3]}`}class nE{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(typeof window===void 0)return e;const t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return typeof isSecureContext=="boolean"&&!isSecureContext||typeof navigator>"u"||typeof document>"u"?!1:navigator.cookieEnabled??!0}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;const t=PB(e);if(window.cookieStore){const n=await window.cookieStore.get(t);return n==null?void 0:n.value}return RB(t)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;const n=PB(e);document.cookie=`${n}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;const n=PB(e);if(window.cookieStore){const a=(l=>{const B=l.changed.find(p=>p.name===n);B&&t(B.value),l.deleted.find(p=>p.name===n)&&t(null)}),c=()=>window.cookieStore.removeEventListener("change",a);return this.listenerUnsubscribes.set(t,c),window.cookieStore.addEventListener("change",a)}let s=RB(n);const i=setInterval(()=>{const a=RB(n);a!==s&&(t(a),s=a)},qb),o=()=>clearInterval(i);this.listenerUnsubscribes.set(t,o)}_removeListener(e,t){const n=this.listenerUnsubscribes.get(t);n&&(n(),this.listenerUnsubscribes.delete(t))}}nE.type="COOKIE";const jb=nE;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rE extends Z_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}rE.type="SESSION";const hd=rE;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jb(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class il{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const n=new il(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const a=Array.from(o).map(async l=>l(t.origin,i)),c=await Jb(a);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}il.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ol(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kb{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const l=ol("",20);s.port1.start();const B=setTimeout(()=>{c(new Error("unsupported_event"))},n);o={messageChannel:s,onMessage(h){const p=h;if(p.data.eventId===l)switch(p.data.status){case"ack":clearTimeout(B),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(p.data.response);break;default:clearTimeout(B),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(){return window}function zb(r){et().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dd(){return typeof et().WorkerGlobalScope<"u"&&typeof et().importScripts=="function"}async function Wb(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function $b(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)==null?void 0:r.controller)||null}function Qb(){return dd()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sE="firebaseLocalStorageDb",Yb=1,Tu="firebaseLocalStorage",iE="fbase_key",Xb=800,Zb=3,wC=800,al=2500,ua="DB_TIMEOUT";class Za{constructor(e){this.request=e}toPromise(e=al){return new Promise((t,n)=>{let s=!1;const i=setTimeout(()=>{var o;if(!s){s=!0;try{(o=this.request.transaction)==null||o.abort()}catch{}n(new Error(ua))}},e);this.request.addEventListener("success",()=>{s||(s=!0,clearTimeout(i),t(this.request.result))}),this.request.addEventListener("error",()=>{s||(s=!0,clearTimeout(i),n(this.request.error))})})}}function cl(r,e){return r.transaction([Tu],e?"readwrite":"readonly").objectStore(Tu)}function ev(){const r=indexedDB.deleteDatabase(sE);return new Za(r).toPromise()}function oE(){const r=indexedDB.open(sE,Yb);return new Promise((e,t)=>{let n=!1;const s=setTimeout(()=>{n||(n=!0,t(new Error(ua)))},al);r.addEventListener("error",()=>{n||(n=!0,clearTimeout(s),t(r.error))}),r.addEventListener("upgradeneeded",()=>{const i=r.result;try{i.createObjectStore(Tu,{keyPath:iE})}catch(o){n||(n=!0,clearTimeout(s),t(o))}}),r.addEventListener("success",async()=>{const i=r.result;if(n){i.close();return}if(clearTimeout(s),i.objectStoreNames.contains(Tu))n=!0,e(i);else{i.close();try{await ev();const o=await oE();n=!0,e(o)}catch(o){n||(n=!0,t(o))}}})})}async function DC(r,e,t,n=al){const s=cl(r,!0).put({[iE]:e,value:t});return new Za(s).toPromise(n)}async function tv(r,e){const t=cl(r,!1).get(e),n=await new Za(t).toPromise();return n===void 0?null:n.value}function TC(r,e,t=al){const n=cl(r,!0).delete(e);return new Za(n).toPromise(t)}class aE{registerLifecycleListeners(){typeof window<"u"&&typeof window.addEventListener=="function"&&(window.addEventListener("pagehide",this.onPageHide),window.addEventListener("pageshow",this.onPageShow))}unregisterLifecycleListeners(){typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pagehide",this.onPageHide),window.removeEventListener("pageshow",this.onPageShow))}constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isClosing=!1,this.pendingWrites=0,this._lastProbeTimedOut=!1,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isClosing=!0,this.stopPolling(),this.dbPromise&&(this.dbPromise.then(e=>e.close()).catch(()=>{}),this.dbPromise=null)},this.onPageShow=()=>{this.isClosing&&(this.isClosing=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){if(this.dbPromise)return this.dbPromise;const e=oE();return this.dbPromise=e,e.catch(()=>{this.dbPromise===e&&(this.dbPromise=null)}),e}async _withRetries(e){let t=0;for(;;){let n,s=null;try{const i=this._openDb();return s=this.dbPromise,n=await i,await e(n)}catch(i){if(n)n.close(),s&&this.dbPromise===s&&(this.dbPromise=null);else if(this.dbPromise&&this.dbPromise===s){const a=this.dbPromise;this.dbPromise=null;try{(await a).close()}catch{}}if(i instanceof Error&&i.message===ua||t++>Zb)throw i}}}async initializeServiceWorkerMessaging(){return dd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=il._getInstance(Qb()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,n;if(this.activeServiceWorker=await Wb(),!this.activeServiceWorker)return;this.sender=new Kb(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(n=e[0])!=null&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||$b()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){this._lastProbeTimedOut=!1;try{return indexedDB?(await this._withRetries(async e=>{await DC(e,Du,"1",wC),await TC(e,Du,wC)}),!0):!1}catch(e){this._lastProbeTimedOut=e instanceof Error&&e.message===ua}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>DC(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){try{const t=await this._withRetries(n=>tv(n,e));return this.localCache[e]=t,t}catch(t){if(t instanceof Error&&t.message===ua&&this.localCache[e]!=null)return this.localCache[e];throw t}}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>TC(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isClosing)return[];try{const e=await this._withRetries(s=>{const i=cl(s,!1).getAll();return new Za(i).toPromise()});if(this.isClosing)return[];if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}catch(e){return this.isClosing||eu(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Xb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,e in this.localCache||this._get(e).catch(()=>{})),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}}aE.type="LOCAL";const cE=aE;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AC(r,e){return Ue(r,"POST","/v2/accounts/mfaSignIn:start",Ge(r,e))}function nv(r,e){return Ue(r,"POST","/v2/accounts/mfaSignIn:finalize",Ge(r,e))}function rv(r,e){return Ue(r,"POST","/v2/accounts/mfaSignIn:finalize",Ge(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SB=x_("rcb"),sv=new Qa(3e4,6e4);class iv{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!((e=et().grecaptcha)!=null&&e.render)}load(e,t=""){return K(ov(t),e,"argument-error"),this.shouldResolveImmediately(t)&&hC(et().grecaptcha)?Promise.resolve(et().grecaptcha):new Promise((n,s)=>{const i=et().setTimeout(()=>{s(Ft(e,"network-request-failed"))},sv.get());et()[SB]=()=>{et().clearTimeout(i),delete et()[SB];const a=et().grecaptcha;if(!a||!hC(a)){s(Ft(e,"internal-error"));return}const c=a.render;a.render=(l,B)=>{const h=c(l,B);return this.counter++,h},this.hostLanguage=t,n(a)};const o=`${_0()}?${oo({onload:SB,render:"explicit",hl:t})}`;id(o).catch(()=>{clearTimeout(i),s(Ft(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!((t=et().grecaptcha)!=null&&t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function ov(r){return r.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(r)}class av{async load(e){return new D0(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const la="recaptcha",cv={theme:"light",type:"image"};class uv{constructor(e,t,n={...cv}){this.parameters=n,this.type=la,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=ze(e),this.isInvisible=this.parameters.size==="invisible",K(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const s=typeof t=="string"?document.getElementById(t):t;K(s,this.auth,"argument-error"),this.container=s,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new av:new iv,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),n=t.getResponse(e);return n||new Promise(s=>{const i=o=>{o&&(this.tokenChangeListeners.delete(i),s(o))};this.tokenChangeListeners.add(i),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){K(!this.parameters.sitekey,this.auth,"argument-error"),K(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),K(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(n=>n(t)),typeof e=="function")e(t);else if(typeof e=="string"){const n=et()[e];typeof n=="function"&&n(t)}}}assertNotDestroyed(){K(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){K(nd()&&!dd(),this.auth,"internal-error"),await lv(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await r0(this.auth);K(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return K(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function lv(){let r=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}r=()=>e(),window.addEventListener("load",r)}).catch(e=>{throw r&&window.removeEventListener("load",r),e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=Vr._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function Bv(r,e,t){if(He(r.app))return Promise.reject(Ct(r));const n=ze(r),s=await ul(n,e,ne(t));return new fd(s,i=>rl(n,i))}async function hv(r,e,t){const n=ne(r);await nl(!1,n,"phone");const s=await ul(n.auth,e,ne(t));return new fd(s,i=>K_(n,i))}async function dv(r,e,t){const n=ne(r);if(He(n.auth.app))return Promise.reject(Ct(n.auth));const s=await ul(n.auth,e,ne(t));return new fd(s,i=>z_(n,i))}async function ul(r,e,t){var n;if(!r._getRecaptchaConfig())try{await L_(r)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){const i=s.session;if("phoneNumber"in s){K(i.type==="enroll",r,"internal-error");const o={idToken:i.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await Lr(r,o,"mfaSmsEnrollment",async(B,h)=>{if(h.phoneEnrollmentInfo.captchaResponse===aa){K((t==null?void 0:t.type)===la,B,"argument-error");const p=await NB(B,h,t);return yC(B,p)}return yC(B,h)},"PHONE_PROVIDER").catch(B=>Promise.reject(B))).phoneSessionInfo.sessionInfo}else{K(i.type==="signin",r,"internal-error");const o=((n=s.multiFactorHint)==null?void 0:n.uid)||s.multiFactorUid;K(o,r,"missing-multi-factor-info");const a={mfaPendingCredential:i.credential,mfaEnrollmentId:o,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await Lr(r,a,"mfaSmsSignIn",async(h,p)=>{if(p.phoneSignInInfo.captchaResponse===aa){K((t==null?void 0:t.type)===la,h,"argument-error");const C=await NB(h,p,t);return AC(h,C)}return AC(h,p)},"PHONE_PROVIDER").catch(h=>Promise.reject(h))).phoneResponseInfo.sessionInfo}}else{const i={phoneNumber:s.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await Lr(r,i,"sendVerificationCode",async(l,B)=>{if(B.captchaResponse===aa){K((t==null?void 0:t.type)===la,l,"argument-error");const h=await NB(l,B,t);return EC(l,h)}return EC(l,B)},"PHONE_PROVIDER").catch(l=>Promise.reject(l))).sessionInfo}}finally{t==null||t._reset()}}async function fv(r,e){const t=ne(r);if(He(t.auth.app))return Promise.reject(Ct(t.auth));await od(t,e)}async function NB(r,e,t){K(t.type===la,r,"argument-error");const n=await t.verify();K(typeof n=="string",r,"argument-error");const s={...e};if("phoneEnrollmentInfo"in s){const i=s.phoneEnrollmentInfo.phoneNumber,o=s.phoneEnrollmentInfo.captchaResponse,a=s.phoneEnrollmentInfo.clientType,c=s.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(s,{phoneEnrollmentInfo:{phoneNumber:i,recaptchaToken:n,captchaResponse:o,clientType:a,recaptchaVersion:c}}),s}else if("phoneSignInInfo"in s){const i=s.phoneSignInInfo.captchaResponse,o=s.phoneSignInInfo.clientType,a=s.phoneSignInInfo.recaptchaVersion;return Object.assign(s,{phoneSignInInfo:{recaptchaToken:n,captchaResponse:i,clientType:o,recaptchaVersion:a}}),s}else return Object.assign(s,{recaptchaToken:n}),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{constructor(e){this.providerId=Os.PROVIDER_ID,this.auth=ze(e)}verifyPhoneNumber(e,t){return ul(this.auth,e,ne(t))}static credential(e,t){return Vr._fromVerification(e,t)}static credentialFromResult(e){const t=e;return Os.credentialFromTaggedObject(t)}static credentialFromError(e){return Os.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:n}=e;return t&&n?Vr._fromTokenResponse(t,n):null}}Os.PROVIDER_ID="phone";Os.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xs(r,e){return e?Yn(e):(K(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd extends uo{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return tr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return tr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return tr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function pv(r){return J_(r.auth,new pd(r),r.bypassAuthState)}function Cv(r){const{auth:e,user:t}=r;return K(t,e,"internal-error"),j_(t,new pd(r),r.bypassAuthState)}async function gv(r){const{auth:e,user:t}=r;return K(t,e,"internal-error"),od(t,new pd(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uE{constructor(e,t,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{if(this.eventManager=await this.resolver._initialize(this.auth),!this.pendingPromise||(await this.onExecution(),!this.pendingPromise))return;this.eventManager.registerConsumer(this)}catch(n){this.pendingPromise&&this.reject(n)}})}async onAuthEvent(e){if(!this.pendingPromise)return;const{urlResponse:t,sessionId:n,postBody:s,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return pv;case"linkViaPopup":case"linkViaRedirect":return gv;case"reauthViaPopup":case"reauthViaRedirect":return Cv;default:Jt(this.auth,"internal-error")}}resolve(e){sr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){sr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mv=new Qa(2e3,1e4);async function _v(r,e,t){if(He(r.app))return Promise.reject(Ft(r,"operation-not-supported-in-this-environment"));const n=ze(r);co(r,e,fr);const s=Xs(n,t);return new Xn(n,"signInViaPopup",e,s).executeNotNull()}async function Ev(r,e,t){const n=ne(r);if(He(n.auth.app))return Promise.reject(Ft(n.auth,"operation-not-supported-in-this-environment"));co(n.auth,e,fr);const s=Xs(n.auth,t);return new Xn(n.auth,"reauthViaPopup",e,s,n).executeNotNull()}async function Iv(r,e,t){const n=ne(r);co(n.auth,e,fr);const s=Xs(n.auth,t);return new Xn(n.auth,"linkViaPopup",e,s,n).executeNotNull()}class Xn extends uE{constructor(e,t,n,s,i){super(e,t,s,i),this.provider=n,this.authWindow=null,this.pollId=null,Xn.currentPopupAction&&Xn.currentPopupAction.cancel(),Xn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return K(e,this.auth,"internal-error"),e}async onExecution(){sr(this.filter.length===1,"Popup operations only handle one event");const e=ol();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ft(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Ft(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Xn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if((n=(t=this.authWindow)==null?void 0:t.window)!=null&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ft(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,mv.get())};e()}}Xn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yv="pendingRedirect",ru=new Map;class wv extends uE{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=ru.get(this.auth._key());if(!e){try{const n=await Dv(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}ru.set(this.auth._key(),e)}return this.bypassAuthState||ru.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Dv(r,e){const t=BE(e),n=lE(r);if(!await n._isAvailable())return!1;const s=await n._get(t)==="true";return await n._remove(t),s}async function Cd(r,e){return lE(r)._set(BE(e),"true")}function Tv(r,e){ru.set(r._key(),e)}function lE(r){return Yn(r._redirectPersistence)}function BE(r){return nu(yv,r.config.apiKey,r.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Av(r,e,t){return bv(r,e,t)}async function bv(r,e,t){if(He(r.app))return Promise.reject(Ct(r));const n=ze(r);co(r,e,fr),await n._initializationPromise;const s=Xs(n,t);return await Cd(s,n),s._openRedirect(n,e,"signInViaRedirect")}function vv(r,e,t){return Rv(r,e,t)}async function Rv(r,e,t){const n=ne(r);if(co(n.auth,e,fr),He(n.auth.app))return Promise.reject(Ct(n.auth));await n.auth._initializationPromise;const s=Xs(n.auth,t);await Cd(s,n.auth);const i=await dE(n);return s._openRedirect(n.auth,e,"reauthViaRedirect",i)}function Pv(r,e,t){return Sv(r,e,t)}async function Sv(r,e,t){const n=ne(r);co(n.auth,e,fr),await n.auth._initializationPromise;const s=Xs(n.auth,t);await nl(!1,n,e.providerId),await Cd(s,n.auth);const i=await dE(n);return s._openRedirect(n.auth,e,"linkViaRedirect",i)}async function Nv(r,e){return await ze(r)._initializationPromise,hE(r,e,!1)}async function hE(r,e,t=!1){if(He(r.app))return Promise.reject(Ct(r));const n=ze(r),s=Xs(n,e),o=await new wv(n,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}async function dE(r){const e=ol(`${r.uid}:::`);return r._redirectEventId=e,await r.auth._setRedirectUser(r),await r.auth._persistUserIfCurrent(r),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ov=600*1e3;class Fv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!xv(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!fE(e)){const s=((n=e.error.code)==null?void 0:n.split("auth/")[1])||"internal-error";t.onError(Ft(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Ov&&this.cachedEventUids.clear(),this.cachedEventUids.has(bC(e))}saveEventToCache(e){this.cachedEventUids.add(bC(e)),this.lastProcessedEventTime=Date.now()}}function bC(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function fE({type:r,error:e}){return r==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function xv(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return fE(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lv(r,e={}){return Ue(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vv=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,kv=/^https?/;async function Mv(r){if(r.config.emulator)return;const{authorizedDomains:e}=await Lv(r);for(const t of e)try{if(Gv(t))return}catch{}Jt(r,"unauthorized-domain")}function Gv(r){const e=Aa(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const o=new URL(r);return o.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===n}if(!kv.test(t))return!1;if(Vv.test(r))return n===r;const s=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uv=new Qa(3e4,6e4);function vC(){const r=et().___jsl;if(r!=null&&r.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function Hv(r){return new Promise((e,t)=>{var s,i,o;function n(){vC(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{vC(),t(Ft(r,"network-request-failed"))},timeout:Uv.get()})}if((i=(s=et().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((o=et().gapi)!=null&&o.load)n();else{const a=x_("iframefcb");return et()[a]=()=>{gapi.load?n():t(Ft(r,"network-request-failed"))},id(`${I0()}?onload=${a}`).catch(c=>t(c))}}).catch(e=>{throw su=null,e})}let su=null;function qv(r){return su=su||Hv(r),su}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jv=new Qa(5e3,15e3),Jv="__/auth/iframe",Kv="emulator/auth/iframe",zv={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Wv=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function $v(r){const e=r.config;K(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?rd(e,Kv):`https://${r.config.authDomain}/${Jv}`,n={apiKey:e.apiKey,appName:r.name,v:Ys},s=Wv.get(r.config.apiHost);s&&(n.eid=s);const i=r._getFrameworks();return i.length&&(n.fw=i.join(",")),`${t}?${oo(n).slice(1)}`}async function Qv(r){const e=await qv(r),t=et().gapi;return K(t,r,"internal-error"),e.open({where:document.body,url:$v(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:zv,dontclear:!0},n=>new Promise(async(s,i)=>{await n.restyle({setHideOnLeave:!1});const o=Ft(r,"network-request-failed"),a=et().setTimeout(()=>{i(o)},jv.get());function c(){et().clearTimeout(a),s(n)}n.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yv={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Xv=500,Zv=600,eR="_blank",tR="http://localhost";class RC{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function nR(r,e,t,n=Xv,s=Zv){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let a="";const c={...Yv,width:n.toString(),height:s.toString(),top:i,left:o},l=ot().toLowerCase();t&&(a=v_(l)?eR:t),A_(l)&&(e=e||tR,c.scrollbars="yes");const B=Object.entries(c).reduce((p,[C,m])=>`${p}${C}=${m},`,"");if(B0(l)&&a!=="_self")return rR(e||"",a),new RC(null);const h=window.open(e||"",a,B);K(h,r,"popup-blocked");try{h.focus()}catch{}return new RC(h)}function rR(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sR="__/auth/handler",iR="emulator/auth/handler",oR=encodeURIComponent("fac");async function PC(r,e,t,n,s,i){K(r.config.authDomain,r,"auth-domain-config-required"),K(r.config.apiKey,r,"invalid-api-key");const o={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:Ys,eventId:s};if(e instanceof fr){e.setDefaultLanguage(r.languageCode),o.providerId=e.providerId||"",gT(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[B,h]of Object.entries({}))o[B]=h}if(e instanceof Bo){const B=e.getScopes().filter(h=>h!=="");B.length>0&&(o.scopes=B.join(","))}r.tenantId&&(o.tid=r.tenantId);const a=o;for(const B of Object.keys(a))a[B]===void 0&&delete a[B];const c=await r._getAppCheckToken(),l=c?`#${oR}=${encodeURIComponent(c)}`:"";return`${aR(r)}?${oo(a).slice(1)}${l}`}function aR({config:r}){return r.emulator?rd(r,iR):`https://${r.authDomain}/${sR}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OB="webStorageSupport";class cR{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=hd,this._completeRedirectFn=hE,this._overrideRedirectResult=Tv}async _openPopup(e,t,n,s){var o;sr((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await PC(e,t,n,Aa(),s);return nR(e,i,ol())}async _openRedirect(e,t,n,s){await this._originValidation(e);const i=await PC(e,t,n,Aa(),s);return zb(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(sr(i,"If manager is not set, promise should be"),i)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await Qv(e),n=new Fv(e);return t.register("authEvent",s=>(K(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(OB,{type:OB},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[OB];i!==void 0&&t(!!i),Jt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Mv(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return O_()||b_()||sd()}}const pE=cR;class CE{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return Dn("unexpected MultiFactorSessionType")}}}class gd extends CE{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new gd(e)}_finalizeEnroll(e,t,n){return Lb(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return nv(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class gE{constructor(){}static assertion(e){return gd._fromCredential(e)}}gE.FACTOR_ID="phone";class mE{static assertionForEnrollment(e,t){return Ra._fromSecret(e,t)}static assertionForSignIn(e,t){return Ra._fromEnrollmentId(e,t)}static async generateSecret(e){var s;const t=e;K(typeof((s=t.user)==null?void 0:s.auth)<"u","internal-error");const n=await Vb(t.user.auth,{idToken:t.credential,totpEnrollmentInfo:{}});return ll._fromStartTotpMfaEnrollmentResponse(n,t.user.auth)}}mE.FACTOR_ID="totp";class Ra extends CE{constructor(e,t,n){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=n}static _fromSecret(e,t){return new Ra(t,void 0,e)}static _fromEnrollmentId(e,t){return new Ra(t,e)}async _finalizeEnroll(e,t,n){return K(typeof this.secret<"u",e,"argument-error"),kb(e,{idToken:t,displayName:n,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){K(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");const n={verificationCode:this.otp};return rv(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:n})}}class ll{constructor(e,t,n,s,i,o,a){this.sessionInfo=o,this.auth=a,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=n,this.codeIntervalSeconds=s,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new ll(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var s;let n=!1;return(Lc(e)||Lc(t))&&(n=!0),n&&(Lc(e)&&(e=((s=this.auth.currentUser)==null?void 0:s.email)||"unknownuser"),Lc(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function Lc(r){return typeof r>"u"||(r==null?void 0:r.length)===0}var SC="@firebase/auth",NC="1.13.11";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uR{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){K(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lR(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function BR(r){mn(new gn("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=n.options;K(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const c={apiKey:o,authDomain:a,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:F_(r)},l=new g0(n,s,i,c);return P0(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),mn(new gn("auth-internal",e=>{const t=ze(e.getProvider("auth").getImmediate());return(n=>new uR(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ut(SC,NC,lR(r)),Ut(SC,NC,"esm2020")}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hR(){var r;return((r=document.getElementsByTagName("head"))==null?void 0:r[0])??document}function dR(r){return new Promise((e,t)=>{const n=document.createElement("script");try{ed(n,r)}catch(s){t(s);return}n.onload=e,n.onerror=s=>{const i=Ft("internal-error");i.customData=s,t(i)},n.type="text/javascript",n.charset="UTF-8",hR().appendChild(n)})}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fR=300,pR=Km("authIdTokenMaxAge")||fR;let OC=null;const CR=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>pR)return;const s=t==null?void 0:t.token;OC!==s&&(OC=s,await fetch(r,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function gR(r=Xu()){const e=qn(r,"auth");if(e.isInitialized())return e.getImmediate();const t=V_(r,{popupRedirectResolver:pE,persistence:[cE,tE,hd]}),n=Km("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(n,location.origin);if(location.origin===i.origin){const o=CR(i.toString());X_(t,o,()=>o(t.currentUser)),Y_(t,a=>o(a))}}const s=Jm("auth");return s&&k_(t,`http://${s}`),t}m0({loadJS:dR,gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});BR("Browser");const nk=Object.freeze(Object.defineProperty({__proto__:null,ActionCodeOperation:KA,ActionCodeURL:lo,AuthCredential:uo,AuthErrorCodes:$A,EmailAuthCredential:Oi,EmailAuthProvider:es,FacebookAuthProvider:Kn,FactorId:HA,GithubAuthProvider:Wn,GoogleAuthProvider:zn,OAuthCredential:kn,OAuthProvider:ca,OperationType:JA,PhoneAuthCredential:Vr,PhoneAuthProvider:Os,PhoneMultiFactorGenerator:gE,ProviderId:qA,RecaptchaVerifier:uv,SAMLAuthProvider:yu,SignInMethod:jA,TotpMultiFactorGenerator:mE,TotpSecret:ll,TwitterAuthProvider:$n,applyActionCode:ib,beforeAuthStateChanged:X_,browserCookiePersistence:jb,browserLocalPersistence:tE,browserPopupRedirectResolver:pE,browserSessionPersistence:hd,checkActionCode:W_,confirmPasswordReset:sb,connectAuthEmulator:k_,createUserWithEmailAndPassword:ab,debugErrorMap:WA,deleteUser:Fb,fetchSignInMethodsForEmail:db,getAdditionalUserInfo:Tb,getAuth:gR,getIdToken:o0,getIdTokenResult:I_,getMultiFactorResolver:xb,getRedirectResult:Nv,inMemoryPersistence:sh,indexedDBLocalPersistence:cE,initializeAuth:V_,initializeRecaptchaConfig:bb,isSignInWithEmailLink:lb,linkWithCredential:K_,linkWithPhoneNumber:hv,linkWithPopup:Iv,linkWithRedirect:Pv,multiFactor:Gb,onAuthStateChanged:Rb,onIdTokenChanged:Y_,parseActionCodeURL:Q0,prodErrorMap:f_,reauthenticateWithCredential:z_,reauthenticateWithPhoneNumber:dv,reauthenticateWithPopup:Ev,reauthenticateWithRedirect:vv,reload:w_,revokeAccessToken:Ob,sendEmailVerification:fb,sendPasswordResetEmail:rb,sendSignInLinkToEmail:ub,setPersistence:Ab,signInAnonymously:Z0,signInWithCredential:rl,signInWithCustomToken:nb,signInWithEmailAndPassword:cb,signInWithEmailLink:Bb,signInWithPhoneNumber:Bv,signInWithPopup:_v,signInWithRedirect:Av,signOut:Nb,unlink:eb,updateCurrentUser:Sb,updateEmail:mb,updatePassword:_b,updatePhoneNumber:fv,updateProfile:gb,useDeviceLanguage:Pb,validatePassword:vb,verifyBeforeUpdateEmail:pb,verifyPasswordResetCode:ob},Symbol.toStringTag,{value:"Module"}));var FC=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var kr,_E;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(A,I){function w(){}w.prototype=I.prototype,A.F=I.prototype,A.prototype=new w,A.prototype.constructor=A,A.D=function(R,v,F){for(var y=Array(arguments.length-2),Lt=2;Lt<arguments.length;Lt++)y[Lt-2]=arguments[Lt];return I.prototype[v].apply(R,y)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(n,t),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(A,I,w){w||(w=0);const R=Array(16);if(typeof I=="string")for(var v=0;v<16;++v)R[v]=I.charCodeAt(w++)|I.charCodeAt(w++)<<8|I.charCodeAt(w++)<<16|I.charCodeAt(w++)<<24;else for(v=0;v<16;++v)R[v]=I[w++]|I[w++]<<8|I[w++]<<16|I[w++]<<24;I=A.g[0],w=A.g[1],v=A.g[2];let F=A.g[3],y;y=I+(F^w&(v^F))+R[0]+3614090360&4294967295,I=w+(y<<7&4294967295|y>>>25),y=F+(v^I&(w^v))+R[1]+3905402710&4294967295,F=I+(y<<12&4294967295|y>>>20),y=v+(w^F&(I^w))+R[2]+606105819&4294967295,v=F+(y<<17&4294967295|y>>>15),y=w+(I^v&(F^I))+R[3]+3250441966&4294967295,w=v+(y<<22&4294967295|y>>>10),y=I+(F^w&(v^F))+R[4]+4118548399&4294967295,I=w+(y<<7&4294967295|y>>>25),y=F+(v^I&(w^v))+R[5]+1200080426&4294967295,F=I+(y<<12&4294967295|y>>>20),y=v+(w^F&(I^w))+R[6]+2821735955&4294967295,v=F+(y<<17&4294967295|y>>>15),y=w+(I^v&(F^I))+R[7]+4249261313&4294967295,w=v+(y<<22&4294967295|y>>>10),y=I+(F^w&(v^F))+R[8]+1770035416&4294967295,I=w+(y<<7&4294967295|y>>>25),y=F+(v^I&(w^v))+R[9]+2336552879&4294967295,F=I+(y<<12&4294967295|y>>>20),y=v+(w^F&(I^w))+R[10]+4294925233&4294967295,v=F+(y<<17&4294967295|y>>>15),y=w+(I^v&(F^I))+R[11]+2304563134&4294967295,w=v+(y<<22&4294967295|y>>>10),y=I+(F^w&(v^F))+R[12]+1804603682&4294967295,I=w+(y<<7&4294967295|y>>>25),y=F+(v^I&(w^v))+R[13]+4254626195&4294967295,F=I+(y<<12&4294967295|y>>>20),y=v+(w^F&(I^w))+R[14]+2792965006&4294967295,v=F+(y<<17&4294967295|y>>>15),y=w+(I^v&(F^I))+R[15]+1236535329&4294967295,w=v+(y<<22&4294967295|y>>>10),y=I+(v^F&(w^v))+R[1]+4129170786&4294967295,I=w+(y<<5&4294967295|y>>>27),y=F+(w^v&(I^w))+R[6]+3225465664&4294967295,F=I+(y<<9&4294967295|y>>>23),y=v+(I^w&(F^I))+R[11]+643717713&4294967295,v=F+(y<<14&4294967295|y>>>18),y=w+(F^I&(v^F))+R[0]+3921069994&4294967295,w=v+(y<<20&4294967295|y>>>12),y=I+(v^F&(w^v))+R[5]+3593408605&4294967295,I=w+(y<<5&4294967295|y>>>27),y=F+(w^v&(I^w))+R[10]+38016083&4294967295,F=I+(y<<9&4294967295|y>>>23),y=v+(I^w&(F^I))+R[15]+3634488961&4294967295,v=F+(y<<14&4294967295|y>>>18),y=w+(F^I&(v^F))+R[4]+3889429448&4294967295,w=v+(y<<20&4294967295|y>>>12),y=I+(v^F&(w^v))+R[9]+568446438&4294967295,I=w+(y<<5&4294967295|y>>>27),y=F+(w^v&(I^w))+R[14]+3275163606&4294967295,F=I+(y<<9&4294967295|y>>>23),y=v+(I^w&(F^I))+R[3]+4107603335&4294967295,v=F+(y<<14&4294967295|y>>>18),y=w+(F^I&(v^F))+R[8]+1163531501&4294967295,w=v+(y<<20&4294967295|y>>>12),y=I+(v^F&(w^v))+R[13]+2850285829&4294967295,I=w+(y<<5&4294967295|y>>>27),y=F+(w^v&(I^w))+R[2]+4243563512&4294967295,F=I+(y<<9&4294967295|y>>>23),y=v+(I^w&(F^I))+R[7]+1735328473&4294967295,v=F+(y<<14&4294967295|y>>>18),y=w+(F^I&(v^F))+R[12]+2368359562&4294967295,w=v+(y<<20&4294967295|y>>>12),y=I+(w^v^F)+R[5]+4294588738&4294967295,I=w+(y<<4&4294967295|y>>>28),y=F+(I^w^v)+R[8]+2272392833&4294967295,F=I+(y<<11&4294967295|y>>>21),y=v+(F^I^w)+R[11]+1839030562&4294967295,v=F+(y<<16&4294967295|y>>>16),y=w+(v^F^I)+R[14]+4259657740&4294967295,w=v+(y<<23&4294967295|y>>>9),y=I+(w^v^F)+R[1]+2763975236&4294967295,I=w+(y<<4&4294967295|y>>>28),y=F+(I^w^v)+R[4]+1272893353&4294967295,F=I+(y<<11&4294967295|y>>>21),y=v+(F^I^w)+R[7]+4139469664&4294967295,v=F+(y<<16&4294967295|y>>>16),y=w+(v^F^I)+R[10]+3200236656&4294967295,w=v+(y<<23&4294967295|y>>>9),y=I+(w^v^F)+R[13]+681279174&4294967295,I=w+(y<<4&4294967295|y>>>28),y=F+(I^w^v)+R[0]+3936430074&4294967295,F=I+(y<<11&4294967295|y>>>21),y=v+(F^I^w)+R[3]+3572445317&4294967295,v=F+(y<<16&4294967295|y>>>16),y=w+(v^F^I)+R[6]+76029189&4294967295,w=v+(y<<23&4294967295|y>>>9),y=I+(w^v^F)+R[9]+3654602809&4294967295,I=w+(y<<4&4294967295|y>>>28),y=F+(I^w^v)+R[12]+3873151461&4294967295,F=I+(y<<11&4294967295|y>>>21),y=v+(F^I^w)+R[15]+530742520&4294967295,v=F+(y<<16&4294967295|y>>>16),y=w+(v^F^I)+R[2]+3299628645&4294967295,w=v+(y<<23&4294967295|y>>>9),y=I+(v^(w|~F))+R[0]+4096336452&4294967295,I=w+(y<<6&4294967295|y>>>26),y=F+(w^(I|~v))+R[7]+1126891415&4294967295,F=I+(y<<10&4294967295|y>>>22),y=v+(I^(F|~w))+R[14]+2878612391&4294967295,v=F+(y<<15&4294967295|y>>>17),y=w+(F^(v|~I))+R[5]+4237533241&4294967295,w=v+(y<<21&4294967295|y>>>11),y=I+(v^(w|~F))+R[12]+1700485571&4294967295,I=w+(y<<6&4294967295|y>>>26),y=F+(w^(I|~v))+R[3]+2399980690&4294967295,F=I+(y<<10&4294967295|y>>>22),y=v+(I^(F|~w))+R[10]+4293915773&4294967295,v=F+(y<<15&4294967295|y>>>17),y=w+(F^(v|~I))+R[1]+2240044497&4294967295,w=v+(y<<21&4294967295|y>>>11),y=I+(v^(w|~F))+R[8]+1873313359&4294967295,I=w+(y<<6&4294967295|y>>>26),y=F+(w^(I|~v))+R[15]+4264355552&4294967295,F=I+(y<<10&4294967295|y>>>22),y=v+(I^(F|~w))+R[6]+2734768916&4294967295,v=F+(y<<15&4294967295|y>>>17),y=w+(F^(v|~I))+R[13]+1309151649&4294967295,w=v+(y<<21&4294967295|y>>>11),y=I+(v^(w|~F))+R[4]+4149444226&4294967295,I=w+(y<<6&4294967295|y>>>26),y=F+(w^(I|~v))+R[11]+3174756917&4294967295,F=I+(y<<10&4294967295|y>>>22),y=v+(I^(F|~w))+R[2]+718787259&4294967295,v=F+(y<<15&4294967295|y>>>17),y=w+(F^(v|~I))+R[9]+3951481745&4294967295,A.g[0]=A.g[0]+I&4294967295,A.g[1]=A.g[1]+(v+(y<<21&4294967295|y>>>11))&4294967295,A.g[2]=A.g[2]+v&4294967295,A.g[3]=A.g[3]+F&4294967295}n.prototype.v=function(A,I){I===void 0&&(I=A.length);const w=I-this.blockSize,R=this.C;let v=this.h,F=0;for(;F<I;){if(v==0)for(;F<=w;)s(this,A,F),F+=this.blockSize;if(typeof A=="string"){for(;F<I;)if(R[v++]=A.charCodeAt(F++),v==this.blockSize){s(this,R),v=0;break}}else for(;F<I;)if(R[v++]=A[F++],v==this.blockSize){s(this,R),v=0;break}}this.h=v,this.o+=I},n.prototype.A=function(){var A=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);A[0]=128;for(var I=1;I<A.length-8;++I)A[I]=0;I=this.o*8;for(var w=A.length-8;w<A.length;++w)A[w]=I&255,I/=256;for(this.v(A),A=Array(16),I=0,w=0;w<4;++w)for(let R=0;R<32;R+=8)A[I++]=this.g[w]>>>R&255;return A};function i(A,I){var w=a;return Object.prototype.hasOwnProperty.call(w,A)?w[A]:w[A]=I(A)}function o(A,I){this.h=I;const w=[];let R=!0;for(let v=A.length-1;v>=0;v--){const F=A[v]|0;R&&F==I||(w[v]=F,R=!1)}this.g=w}var a={};function c(A){return-128<=A&&A<128?i(A,function(I){return new o([I|0],I<0?-1:0)}):new o([A|0],A<0?-1:0)}function l(A){if(isNaN(A)||!isFinite(A))return h;if(A<0)return N(l(-A));const I=[];let w=1;for(let R=0;A>=w;R++)I[R]=A/w|0,w*=4294967296;return new o(I,0)}function B(A,I){if(A.length==0)throw Error("number format error: empty string");if(I=I||10,I<2||36<I)throw Error("radix out of range: "+I);if(A.charAt(0)=="-")return N(B(A.substring(1),I));if(A.indexOf("-")>=0)throw Error('number format error: interior "-" character');const w=l(Math.pow(I,8));let R=h;for(let F=0;F<A.length;F+=8){var v=Math.min(8,A.length-F);const y=parseInt(A.substring(F,F+v),I);v<8?(v=l(Math.pow(I,v)),R=R.j(v).add(l(y))):(R=R.j(w),R=R.add(l(y)))}return R}var h=c(0),p=c(1),C=c(16777216);r=o.prototype,r.m=function(){if(D(this))return-N(this).m();let A=0,I=1;for(let w=0;w<this.g.length;w++){const R=this.i(w);A+=(R>=0?R:4294967296+R)*I,I*=4294967296}return A},r.toString=function(A){if(A=A||10,A<2||36<A)throw Error("radix out of range: "+A);if(m(this))return"0";if(D(this))return"-"+N(this).toString(A);const I=l(Math.pow(A,6));var w=this;let R="";for(;;){const v=he(w,I).g;w=G(w,v.j(I));let F=((w.g.length>0?w.g[0]:w.h)>>>0).toString(A);if(w=v,m(w))return F+R;for(;F.length<6;)F="0"+F;R=F+R}},r.i=function(A){return A<0?0:A<this.g.length?this.g[A]:this.h};function m(A){if(A.h!=0)return!1;for(let I=0;I<A.g.length;I++)if(A.g[I]!=0)return!1;return!0}function D(A){return A.h==-1}r.l=function(A){return A=G(this,A),D(A)?-1:m(A)?0:1};function N(A){const I=A.g.length,w=[];for(let R=0;R<I;R++)w[R]=~A.g[R];return new o(w,~A.h).add(p)}r.abs=function(){return D(this)?N(this):this},r.add=function(A){const I=Math.max(this.g.length,A.g.length),w=[];let R=0;for(let v=0;v<=I;v++){let F=R+(this.i(v)&65535)+(A.i(v)&65535),y=(F>>>16)+(this.i(v)>>>16)+(A.i(v)>>>16);R=y>>>16,F&=65535,y&=65535,w[v]=y<<16|F}return new o(w,w[w.length-1]&-2147483648?-1:0)};function G(A,I){return A.add(N(I))}r.j=function(A){if(m(this)||m(A))return h;if(D(this))return D(A)?N(this).j(N(A)):N(N(this).j(A));if(D(A))return N(this.j(N(A)));if(this.l(C)<0&&A.l(C)<0)return l(this.m()*A.m());const I=this.g.length+A.g.length,w=[];for(var R=0;R<2*I;R++)w[R]=0;for(R=0;R<this.g.length;R++)for(let v=0;v<A.g.length;v++){const F=this.i(R)>>>16,y=this.i(R)&65535,Lt=A.i(v)>>>16,us=A.i(v)&65535;w[2*R+2*v]+=y*us,J(w,2*R+2*v),w[2*R+2*v+1]+=F*us,J(w,2*R+2*v+1),w[2*R+2*v+1]+=y*Lt,J(w,2*R+2*v+1),w[2*R+2*v+2]+=F*Lt,J(w,2*R+2*v+2)}for(A=0;A<I;A++)w[A]=w[2*A+1]<<16|w[2*A];for(A=I;A<2*I;A++)w[A]=0;return new o(w,0)};function J(A,I){for(;(A[I]&65535)!=A[I];)A[I+1]+=A[I]>>>16,A[I]&=65535,I++}function te(A,I){this.g=A,this.h=I}function he(A,I){if(m(I))throw Error("division by zero");if(m(A))return new te(h,h);if(D(A))return I=he(N(A),I),new te(N(I.g),N(I.h));if(D(I))return I=he(A,N(I)),new te(N(I.g),I.h);if(A.g.length>30){if(D(A)||D(I))throw Error("slowDivide_ only works with positive integers.");for(var w=p,R=I;R.l(A)<=0;)w=de(w),R=de(R);var v=fe(w,1),F=fe(R,1);for(R=fe(R,2),w=fe(w,2);!m(R);){var y=F.add(R);y.l(A)<=0&&(v=v.add(w),F=y),R=fe(R,1),w=fe(w,1)}return I=G(A,v.j(I)),new te(v,I)}for(v=h;A.l(I)>=0;){for(w=Math.max(1,Math.floor(A.m()/I.m())),R=Math.ceil(Math.log(w)/Math.LN2),R=R<=48?1:Math.pow(2,R-48),F=l(w),y=F.j(I);D(y)||y.l(A)>0;)w-=R,F=l(w),y=F.j(I);m(F)&&(F=p),v=v.add(F),A=G(A,y)}return new te(v,A)}r.B=function(A){return he(this,A).h},r.and=function(A){const I=Math.max(this.g.length,A.g.length),w=[];for(let R=0;R<I;R++)w[R]=this.i(R)&A.i(R);return new o(w,this.h&A.h)},r.or=function(A){const I=Math.max(this.g.length,A.g.length),w=[];for(let R=0;R<I;R++)w[R]=this.i(R)|A.i(R);return new o(w,this.h|A.h)},r.xor=function(A){const I=Math.max(this.g.length,A.g.length),w=[];for(let R=0;R<I;R++)w[R]=this.i(R)^A.i(R);return new o(w,this.h^A.h)};function de(A){const I=A.g.length+1,w=[];for(let R=0;R<I;R++)w[R]=A.i(R)<<1|A.i(R-1)>>>31;return new o(w,A.h)}function fe(A,I){const w=I>>5;I%=32;const R=A.g.length-w,v=[];for(let F=0;F<R;F++)v[F]=I>0?A.i(F+w)>>>I|A.i(F+w+1)<<32-I:A.i(F+w);return new o(v,A.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,_E=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=B,kr=o}).apply(typeof FC<"u"?FC:typeof self<"u"?self:typeof window<"u"?window:{});function mt(r,e,t,n){if(t==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?r!==e||!n:!e.has(r))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?n:t==="a"?n.call(r):n?n.value:e.get(r)}var Vc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var EE,ta,IE,iu,ih,yE,wE,DE;(function(){var r,e=Object.defineProperty;function t(u){u=[typeof globalThis=="object"&&globalThis,u,typeof window=="object"&&window,typeof self=="object"&&self,typeof Vc=="object"&&Vc];for(var d=0;d<u.length;++d){var f=u[d];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var n=t(this);function s(u,d){if(d)e:{var f=n;u=u.split(".");for(var g=0;g<u.length-1;g++){var O=u[g];if(!(O in f))break e;f=f[O]}u=u[u.length-1],g=f[u],d=d(g),d!=g&&d!=null&&e(f,u,{configurable:!0,writable:!0,value:d})}}s("Symbol.dispose",function(u){return u||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(u){return u||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(u){return u||function(d){var f=[],g;for(g in d)Object.prototype.hasOwnProperty.call(d,g)&&f.push([g,d[g]]);return f}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function a(u){var d=typeof u;return d=="object"&&u!=null||d=="function"}function c(u,d,f){return u.call.apply(u.bind,arguments)}function l(u,d,f){return l=c,l.apply(null,arguments)}function B(u,d){var f=Array.prototype.slice.call(arguments,1);return function(){var g=f.slice();return g.push.apply(g,arguments),u.apply(this,g)}}function h(u,d){function f(){}f.prototype=d.prototype,u.Z=d.prototype,u.prototype=new f,u.prototype.constructor=u,u.Ob=function(g,O,x){for(var X=Array(arguments.length-2),pe=2;pe<arguments.length;pe++)X[pe-2]=arguments[pe];return d.prototype[O].apply(g,X)}}var p=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?u=>u&&AsyncContext.Snapshot.wrap(u):u=>u;function C(u){const d=u.length;if(d>0){const f=Array(d);for(let g=0;g<d;g++)f[g]=u[g];return f}return[]}function m(u,d){for(let g=1;g<arguments.length;g++){const O=arguments[g];var f=typeof O;if(f=f!="object"?f:O?Array.isArray(O)?"array":f:"null",f=="array"||f=="object"&&typeof O.length=="number"){f=u.length||0;const x=O.length||0;u.length=f+x;for(let X=0;X<x;X++)u[f+X]=O[X]}else u.push(O)}}class D{constructor(d,f){this.i=d,this.j=f,this.h=0,this.g=null}get(){let d;return this.h>0?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function N(u){o.setTimeout(()=>{throw u},0)}function G(){var u=A;let d=null;return u.g&&(d=u.g,u.g=u.g.next,u.g||(u.h=null),d.next=null),d}class J{constructor(){this.h=this.g=null}add(d,f){const g=te.get();g.set(d,f),this.h?this.h.next=g:this.g=g,this.h=g}}var te=new D(()=>new he,u=>u.reset());class he{constructor(){this.next=this.g=this.h=null}set(d,f){this.h=d,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let de,fe=!1,A=new J,I=()=>{const u=Promise.resolve(void 0);de=()=>{u.then(w)}};function w(){for(var u;u=G();){try{u.h.call(u.g)}catch(f){N(f)}var d=te;d.j(u),d.h<100&&(d.h++,u.next=d.g,d.g=u)}fe=!1}function R(){this.u=this.u,this.C=this.C}R.prototype.u=!1,R.prototype.dispose=function(){this.u||(this.u=!0,this.N())},R.prototype[Symbol.dispose]=function(){this.dispose()},R.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function v(u,d){this.type=u,this.g=this.target=d,this.defaultPrevented=!1}v.prototype.h=function(){this.defaultPrevented=!0};var F=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var u=!1,d=Object.defineProperty({},"passive",{get:function(){u=!0}});try{const f=()=>{};o.addEventListener("test",f,d),o.removeEventListener("test",f,d)}catch{}return u})();function y(u){return/^[\s\xa0]*$/.test(u)}function Lt(u,d){v.call(this,u?u.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,u&&this.init(u,d)}h(Lt,v),Lt.prototype.init=function(u,d){const f=this.type=u.type,g=u.changedTouches&&u.changedTouches.length?u.changedTouches[0]:null;this.target=u.target||u.srcElement,this.g=d,d=u.relatedTarget,d||(f=="mouseover"?d=u.fromElement:f=="mouseout"&&(d=u.toElement)),this.relatedTarget=d,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0),this.button=u.button,this.key=u.key||"",this.ctrlKey=u.ctrlKey,this.altKey=u.altKey,this.shiftKey=u.shiftKey,this.metaKey=u.metaKey,this.pointerId=u.pointerId||0,this.pointerType=u.pointerType,this.state=u.state,this.i=u,u.defaultPrevented&&Lt.Z.h.call(this)},Lt.prototype.h=function(){Lt.Z.h.call(this);const u=this.i;u.preventDefault?u.preventDefault():u.returnValue=!1};var us="closure_listenable_"+(Math.random()*1e6|0),ID=0;function yD(u,d,f,g,O){this.listener=u,this.proxy=null,this.src=d,this.type=f,this.capture=!!g,this.ha=O,this.key=++ID,this.da=this.fa=!1}function _c(u){u.da=!0,u.listener=null,u.proxy=null,u.src=null,u.ha=null}function Ec(u,d,f){for(const g in u)d.call(f,u[g],g,u)}function wD(u,d){for(const f in u)d.call(void 0,u[f],f,u)}function ep(u){const d={};for(const f in u)d[f]=u[f];return d}const tp="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function np(u,d){let f,g;for(let O=1;O<arguments.length;O++){g=arguments[O];for(f in g)u[f]=g[f];for(let x=0;x<tp.length;x++)f=tp[x],Object.prototype.hasOwnProperty.call(g,f)&&(u[f]=g[f])}}function Ic(u){this.src=u,this.g={},this.h=0}Ic.prototype.add=function(u,d,f,g,O){const x=u.toString();u=this.g[x],u||(u=this.g[x]=[],this.h++);const X=Zl(u,d,g,O);return X>-1?(d=u[X],f||(d.fa=!1)):(d=new yD(d,this.src,x,!!g,O),d.fa=f,u.push(d)),d};function Xl(u,d){const f=d.type;if(f in u.g){var g=u.g[f],O=Array.prototype.indexOf.call(g,d,void 0),x;(x=O>=0)&&Array.prototype.splice.call(g,O,1),x&&(_c(d),u.g[f].length==0&&(delete u.g[f],u.h--))}}function Zl(u,d,f,g){for(let O=0;O<u.length;++O){const x=u[O];if(!x.da&&x.listener==d&&x.capture==!!f&&x.ha==g)return O}return-1}var eB="closure_lm_"+(Math.random()*1e6|0),tB={};function rp(u,d,f,g,O){if(Array.isArray(d)){for(let x=0;x<d.length;x++)rp(u,d[x],f,g,O);return null}return f=op(f),u&&u[us]?u.J(d,f,a(g)?!!g.capture:!1,O):DD(u,d,f,!1,g,O)}function DD(u,d,f,g,O,x){if(!d)throw Error("Invalid event type");const X=a(O)?!!O.capture:!!O;let pe=rB(u);if(pe||(u[eB]=pe=new Ic(u)),f=pe.add(d,f,g,X,x),f.proxy)return f;if(g=TD(),f.proxy=g,g.src=u,g.listener=f,u.addEventListener)F||(O=X),O===void 0&&(O=!1),u.addEventListener(d.toString(),g,O);else if(u.attachEvent)u.attachEvent(ip(d.toString()),g);else if(u.addListener&&u.removeListener)u.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return f}function TD(){function u(f){return d.call(u.src,u.listener,f)}const d=AD;return u}function sp(u,d,f,g,O){if(Array.isArray(d))for(var x=0;x<d.length;x++)sp(u,d[x],f,g,O);else g=a(g)?!!g.capture:!!g,f=op(f),u&&u[us]?(u=u.i,x=String(d).toString(),x in u.g&&(d=u.g[x],f=Zl(d,f,g,O),f>-1&&(_c(d[f]),Array.prototype.splice.call(d,f,1),d.length==0&&(delete u.g[x],u.h--)))):u&&(u=rB(u))&&(d=u.g[d.toString()],u=-1,d&&(u=Zl(d,f,g,O)),(f=u>-1?d[u]:null)&&nB(f))}function nB(u){if(typeof u!="number"&&u&&!u.da){var d=u.src;if(d&&d[us])Xl(d.i,u);else{var f=u.type,g=u.proxy;d.removeEventListener?d.removeEventListener(f,g,u.capture):d.detachEvent?d.detachEvent(ip(f),g):d.addListener&&d.removeListener&&d.removeListener(g),(f=rB(d))?(Xl(f,u),f.h==0&&(f.src=null,d[eB]=null)):_c(u)}}}function ip(u){return u in tB?tB[u]:tB[u]="on"+u}function AD(u,d){if(u.da)u=!0;else{d=new Lt(d,this);const f=u.listener,g=u.ha||u.src;u.fa&&nB(u),u=f.call(g,d)}return u}function rB(u){return u=u[eB],u instanceof Ic?u:null}var sB="__closure_events_fn_"+(Math.random()*1e9>>>0);function op(u){return typeof u=="function"?u:(u[sB]||(u[sB]=function(d){return u.handleEvent(d)}),u[sB])}function yt(){R.call(this),this.i=new Ic(this),this.M=this,this.G=null}h(yt,R),yt.prototype[us]=!0,yt.prototype.removeEventListener=function(u,d,f,g){sp(this,u,d,f,g)};function Pt(u,d){var f,g=u.G;if(g)for(f=[];g;g=g.G)f.push(g);if(u=u.M,g=d.type||d,typeof d=="string")d=new v(d,u);else if(d instanceof v)d.target=d.target||u;else{var O=d;d=new v(g,u),np(d,O)}O=!0;let x,X;if(f)for(X=f.length-1;X>=0;X--)x=d.g=f[X],O=yc(x,g,!0,d)&&O;if(x=d.g=u,O=yc(x,g,!0,d)&&O,O=yc(x,g,!1,d)&&O,f)for(X=0;X<f.length;X++)x=d.g=f[X],O=yc(x,g,!1,d)&&O}yt.prototype.N=function(){if(yt.Z.N.call(this),this.i){var u=this.i;for(const d in u.g){const f=u.g[d];for(let g=0;g<f.length;g++)_c(f[g]);delete u.g[d],u.h--}}this.G=null},yt.prototype.J=function(u,d,f,g){return this.i.add(String(u),d,!1,f,g)},yt.prototype.K=function(u,d,f,g){return this.i.add(String(u),d,!0,f,g)};function yc(u,d,f,g){if(d=u.i.g[String(d)],!d)return!0;d=d.concat();let O=!0;for(let x=0;x<d.length;++x){const X=d[x];if(X&&!X.da&&X.capture==f){const pe=X.listener,st=X.ha||X.src;X.fa&&Xl(u.i,X),O=pe.call(st,g)!==!1&&O}}return O&&!g.defaultPrevented}function bD(u,d){if(typeof u!="function")if(u&&typeof u.handleEvent=="function")u=l(u.handleEvent,u);else throw Error("Invalid listener argument");return Number(d)>2147483647?-1:o.setTimeout(u,d||0)}function ap(u){u.g=bD(()=>{u.g=null,u.i&&(u.i=!1,ap(u))},u.l);const d=u.h;u.h=null,u.m.apply(null,d)}class vD extends R{constructor(d,f){super(),this.m=d,this.l=f,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:ap(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function vo(u){R.call(this),this.h=u,this.g={}}h(vo,R);var cp=[];function up(u){Ec(u.g,function(d,f){this.g.hasOwnProperty(f)&&nB(d)},u),u.g={}}vo.prototype.N=function(){vo.Z.N.call(this),up(this)},vo.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var iB=o.JSON.stringify,RD=o.JSON.parse,PD=class{stringify(u){return o.JSON.stringify(u,void 0)}parse(u){return o.JSON.parse(u,void 0)}};function lp(){}function Bp(){}var Ro={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function oB(){v.call(this,"d")}h(oB,v);function aB(){v.call(this,"c")}h(aB,v);var ls={},hp=null;function wc(){return hp=hp||new yt}ls.Ia="serverreachability";function dp(u){v.call(this,ls.Ia,u)}h(dp,v);function Po(u){const d=wc();Pt(d,new dp(d))}ls.STAT_EVENT="statevent";function fp(u,d){v.call(this,ls.STAT_EVENT,u),this.stat=d}h(fp,v);function St(u){const d=wc();Pt(d,new fp(d,u))}ls.Ja="timingevent";function pp(u,d){v.call(this,ls.Ja,u),this.size=d}h(pp,v);function So(u,d){if(typeof u!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){u()},d)}function No(){this.g=!0}No.prototype.ua=function(){this.g=!1};function SD(u,d,f,g,O,x){u.info(function(){if(u.g)if(x){var X="",pe=x.split("&");for(let Ne=0;Ne<pe.length;Ne++){var st=pe[Ne].split("=");if(st.length>1){const lt=st[0];st=st[1];const In=lt.split("_");X=In.length>=2&&In[1]=="type"?X+(lt+"="+st+"&"):X+(lt+"=redacted&")}}}else X=null;else X=x;return"XMLHTTP REQ ("+g+") [attempt "+O+"]: "+d+`
`+f+`
`+X})}function ND(u,d,f,g,O,x,X){u.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+O+"]: "+d+`
`+f+`
`+x+" "+X})}function ci(u,d,f,g){u.info(function(){return"XMLHTTP TEXT ("+d+"): "+FD(u,f)+(g?" "+g:"")})}function OD(u,d){u.info(function(){return"TIMEOUT: "+d})}No.prototype.info=function(){};function FD(u,d){if(!u.g)return d;if(!d)return null;try{const x=JSON.parse(d);if(x){for(u=0;u<x.length;u++)if(Array.isArray(x[u])){var f=x[u];if(!(f.length<2)){var g=f[1];if(Array.isArray(g)&&!(g.length<1)){var O=g[0];if(O!="noop"&&O!="stop"&&O!="close")for(let X=1;X<g.length;X++)g[X]=""}}}}return iB(x)}catch{return d}}var Dc={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Cp={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},gp;function cB(){}h(cB,lp),cB.prototype.g=function(){return new XMLHttpRequest},gp=new cB;function Oo(u){return encodeURIComponent(String(u))}function xD(u){var d=1;u=u.split(":");const f=[];for(;d>0&&u.length;)f.push(u.shift()),d--;return u.length&&f.push(u.join(":")),f}function _r(u,d,f,g){this.j=u,this.i=d,this.l=f,this.S=g||1,this.V=new vo(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new mp}function mp(){this.i=null,this.g="",this.h=!1}var _p={},uB={};function lB(u,d,f){u.M=1,u.A=Ac(En(d)),u.u=f,u.R=!0,Ep(u,null)}function Ep(u,d){u.F=Date.now(),Tc(u),u.B=En(u.A);var f=u.B,g=u.S;Array.isArray(g)||(g=[String(g)]),Op(f.i,"t",g),u.C=0,f=u.j.L,u.h=new mp,u.g=Yp(u.j,f?d:null,!u.u),u.P>0&&(u.O=new vD(l(u.Y,u,u.g),u.P)),d=u.V,f=u.g,g=u.ba;var O="readystatechange";Array.isArray(O)||(O&&(cp[0]=O.toString()),O=cp);for(let x=0;x<O.length;x++){const X=rp(f,O[x],g||d.handleEvent,!1,d.h||d);if(!X)break;d.g[X.key]=X}d=u.J?ep(u.J):{},u.u?(u.v||(u.v="POST"),d["Content-Type"]="application/x-www-form-urlencoded",u.g.ea(u.B,u.v,u.u,d)):(u.v="GET",u.g.ea(u.B,u.v,null,d)),Po(),SD(u.i,u.v,u.B,u.l,u.S,u.u)}_r.prototype.ba=function(u){u=u.target;const d=this.O;d&&yr(u)==3?d.j():this.Y(u)},_r.prototype.Y=function(u){try{if(u==this.g)e:{const pe=yr(this.g),st=this.g.ya(),Ne=this.g.ca();if(!(pe<3)&&(pe!=3||this.g&&(this.h.h||this.g.la()||Gp(this.g)))){this.K||pe!=4||st==7||(st==8||Ne<=0?Po(3):Po(2)),BB(this);var d=this.g.ca();this.X=d;var f=LD(this);if(this.o=d==200,ND(this.i,this.v,this.B,this.l,this.S,pe,d),this.o){if(this.U&&!this.L){t:{if(this.g){var g,O=this.g;if((g=O.g?O.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(g)){var x=g;break t}}x=null}if(u=x)ci(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,hB(this,u);else{this.o=!1,this.m=3,St(12),Bs(this),Fo(this);break e}}if(this.R){u=!0;let lt;for(;!this.K&&this.C<f.length;)if(lt=VD(this,f),lt==uB){pe==4&&(this.m=4,St(14),u=!1),ci(this.i,this.l,null,"[Incomplete Response]");break}else if(lt==_p){this.m=4,St(15),ci(this.i,this.l,f,"[Invalid Chunk]"),u=!1;break}else ci(this.i,this.l,lt,null),hB(this,lt);if(Ip(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),pe!=4||f.length!=0||this.h.h||(this.m=1,St(16),u=!1),this.o=this.o&&u,!u)ci(this.i,this.l,f,"[Invalid Chunked Response]"),Bs(this),Fo(this);else if(f.length>0&&!this.W){this.W=!0;var X=this.j;X.g==this&&X.aa&&!X.P&&(X.j.info("Great, no buffering proxy detected. Bytes received: "+f.length),EB(X),X.P=!0,St(11))}}else ci(this.i,this.l,f,null),hB(this,f);pe==4&&Bs(this),this.o&&!this.K&&(pe==4?zp(this.j,this):(this.o=!1,Tc(this)))}else YD(this.g),d==400&&f.indexOf("Unknown SID")>0?(this.m=3,St(12)):(this.m=0,St(13)),Bs(this),Fo(this)}}}catch{}finally{}};function LD(u){if(!Ip(u))return u.g.la();const d=Gp(u.g);if(d==="")return"";let f="";const g=d.length,O=yr(u.g)==4;if(!u.h.i){if(typeof TextDecoder>"u")return Bs(u),Fo(u),"";u.h.i=new o.TextDecoder}for(let x=0;x<g;x++)u.h.h=!0,f+=u.h.i.decode(d[x],{stream:!(O&&x==g-1)});return d.length=0,u.h.g+=f,u.C=0,u.h.g}function Ip(u){return u.g?u.v=="GET"&&u.M!=2&&u.j.Aa:!1}function VD(u,d){var f=u.C,g=d.indexOf(`
`,f);return g==-1?uB:(f=Number(d.substring(f,g)),isNaN(f)?_p:(g+=1,g+f>d.length?uB:(d=d.slice(g,g+f),u.C=g+f,d)))}_r.prototype.cancel=function(){this.K=!0,Bs(this)};function Tc(u){u.T=Date.now()+u.H,yp(u,u.H)}function yp(u,d){if(u.D!=null)throw Error("WatchDog timer not null");u.D=So(l(u.aa,u),d)}function BB(u){u.D&&(o.clearTimeout(u.D),u.D=null)}_r.prototype.aa=function(){this.D=null;const u=Date.now();u-this.T>=0?(OD(this.i,this.B),this.M!=2&&(Po(),St(17)),Bs(this),this.m=2,Fo(this)):yp(this,this.T-u)};function Fo(u){u.j.I==0||u.K||zp(u.j,u)}function Bs(u){BB(u);var d=u.O;d&&typeof d.dispose=="function"&&d.dispose(),u.O=null,up(u.V),u.g&&(d=u.g,u.g=null,d.abort(),d.dispose())}function hB(u,d){try{var f=u.j;if(f.I!=0&&(f.g==u||dB(f.h,u))){if(!u.L&&dB(f.h,u)&&f.I==3){try{var g=f.Ba.g.parse(d)}catch{g=null}if(Array.isArray(g)&&g.length==3){var O=g;if(O[0]==0){e:if(!f.v){if(f.g)if(f.g.F+3e3<u.F)Sc(f),Rc(f);else break e;_B(f),St(18)}}else f.xa=O[1],0<f.xa-f.K&&O[2]<37500&&f.F&&f.A==0&&!f.C&&(f.C=So(l(f.Va,f),6e3));Tp(f.h)<=1&&f.ta&&(f.ta=void 0)}else ds(f,11)}else if((u.L||f.g==u)&&Sc(f),!y(d))for(O=f.Ba.g.parse(d),d=0;d<O.length;d++){let Ne=O[d];const lt=Ne[0];if(!(lt<=f.K))if(f.K=lt,Ne=Ne[1],f.I==2)if(Ne[0]=="c"){f.M=Ne[1],f.ba=Ne[2];const In=Ne[3];In!=null&&(f.ka=In,f.j.info("VER="+f.ka));const fs=Ne[4];fs!=null&&(f.za=fs,f.j.info("SVER="+f.za));const wr=Ne[5];wr!=null&&typeof wr=="number"&&wr>0&&(g=1.5*wr,f.O=g,f.j.info("backChannelRequestTimeoutMs_="+g)),g=f;const Dr=u.g;if(Dr){const Oc=Dr.g?Dr.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Oc){var x=g.h;x.g||Oc.indexOf("spdy")==-1&&Oc.indexOf("quic")==-1&&Oc.indexOf("h2")==-1||(x.j=x.l,x.g=new Set,x.h&&(fB(x,x.h),x.h=null))}if(g.G){const IB=Dr.g?Dr.g.getResponseHeader("X-HTTP-Session-Id"):null;IB&&(g.wa=IB,Ve(g.J,g.G,IB))}}f.I=3,f.l&&f.l.ra(),f.aa&&(f.T=Date.now()-u.F,f.j.info("Handshake RTT: "+f.T+"ms")),g=f;var X=u;if(g.na=Qp(g,g.L?g.ba:null,g.W),X.L){Ap(g.h,X);var pe=X,st=g.O;st&&(pe.H=st),pe.D&&(BB(pe),Tc(pe)),g.g=X}else Jp(g);f.i.length>0&&Pc(f)}else Ne[0]!="stop"&&Ne[0]!="close"||ds(f,7);else f.I==3&&(Ne[0]=="stop"||Ne[0]=="close"?Ne[0]=="stop"?ds(f,7):mB(f):Ne[0]!="noop"&&f.l&&f.l.qa(Ne),f.A=0)}}Po(4)}catch{}}var kD=class{constructor(u,d){this.g=u,this.map=d}};function wp(u){this.l=u||10,o.PerformanceNavigationTiming?(u=o.performance.getEntriesByType("navigation"),u=u.length>0&&(u[0].nextHopProtocol=="hq"||u[0].nextHopProtocol=="h2")):u=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=u?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Dp(u){return u.h?!0:u.g?u.g.size>=u.j:!1}function Tp(u){return u.h?1:u.g?u.g.size:0}function dB(u,d){return u.h?u.h==d:u.g?u.g.has(d):!1}function fB(u,d){u.g?u.g.add(d):u.h=d}function Ap(u,d){u.h&&u.h==d?u.h=null:u.g&&u.g.has(d)&&u.g.delete(d)}wp.prototype.cancel=function(){if(this.i=bp(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const u of this.g.values())u.cancel();this.g.clear()}};function bp(u){if(u.h!=null)return u.i.concat(u.h.G);if(u.g!=null&&u.g.size!==0){let d=u.i;for(const f of u.g.values())d=d.concat(f.G);return d}return C(u.i)}var vp=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function MD(u,d){if(u){u=u.split("&");for(let f=0;f<u.length;f++){const g=u[f].indexOf("=");let O,x=null;g>=0?(O=u[f].substring(0,g),x=u[f].substring(g+1)):O=u[f],d(O,x?decodeURIComponent(x.replace(/\+/g," ")):"")}}}function Er(u){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let d;u instanceof Er?(this.l=u.l,xo(this,u.j),this.o=u.o,this.g=u.g,Lo(this,u.u),this.h=u.h,pB(this,Fp(u.i)),this.m=u.m):u&&(d=String(u).match(vp))?(this.l=!1,xo(this,d[1]||"",!0),this.o=Vo(d[2]||""),this.g=Vo(d[3]||"",!0),Lo(this,d[4]),this.h=Vo(d[5]||"",!0),pB(this,d[6]||"",!0),this.m=Vo(d[7]||"")):(this.l=!1,this.i=new Mo(null,this.l))}Er.prototype.toString=function(){const u=[];var d=this.j;d&&u.push(ko(d,Rp,!0),":");var f=this.g;return(f||d=="file")&&(u.push("//"),(d=this.o)&&u.push(ko(d,Rp,!0),"@"),u.push(Oo(f).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.u,f!=null&&u.push(":",String(f))),(f=this.h)&&(this.g&&f.charAt(0)!="/"&&u.push("/"),u.push(ko(f,f.charAt(0)=="/"?HD:UD,!0))),(f=this.i.toString())&&u.push("?",f),(f=this.m)&&u.push("#",ko(f,jD)),u.join("")},Er.prototype.resolve=function(u){const d=En(this);let f=!!u.j;f?xo(d,u.j):f=!!u.o,f?d.o=u.o:f=!!u.g,f?d.g=u.g:f=u.u!=null;var g=u.h;if(f)Lo(d,u.u);else if(f=!!u.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var O=d.h.lastIndexOf("/");O!=-1&&(g=d.h.slice(0,O+1)+g)}if(O=g,O==".."||O==".")g="";else if(O.indexOf("./")!=-1||O.indexOf("/.")!=-1){g=O.lastIndexOf("/",0)==0,O=O.split("/");const x=[];for(let X=0;X<O.length;){const pe=O[X++];pe=="."?g&&X==O.length&&x.push(""):pe==".."?((x.length>1||x.length==1&&x[0]!="")&&x.pop(),g&&X==O.length&&x.push("")):(x.push(pe),g=!0)}g=x.join("/")}else g=O}return f?d.h=g:f=u.i.toString()!=="",f?pB(d,Fp(u.i)):f=!!u.m,f&&(d.m=u.m),d};function En(u){return new Er(u)}function xo(u,d,f){u.j=f?Vo(d,!0):d,u.j&&(u.j=u.j.replace(/:$/,""))}function Lo(u,d){if(d){if(d=Number(d),isNaN(d)||d<0)throw Error("Bad port number "+d);u.u=d}else u.u=null}function pB(u,d,f){d instanceof Mo?(u.i=d,JD(u.i,u.l)):(f||(d=ko(d,qD)),u.i=new Mo(d,u.l))}function Ve(u,d,f){u.i.set(d,f)}function Ac(u){return Ve(u,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),u}function Vo(u,d){return u?d?decodeURI(u.replace(/%25/g,"%2525")):decodeURIComponent(u):""}function ko(u,d,f){return typeof u=="string"?(u=encodeURI(u).replace(d,GD),f&&(u=u.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u):null}function GD(u){return u=u.charCodeAt(0),"%"+(u>>4&15).toString(16)+(u&15).toString(16)}var Rp=/[#\/\?@]/g,UD=/[#\?:]/g,HD=/[#\?]/g,qD=/[#\?@]/g,jD=/#/g;function Mo(u,d){this.h=this.g=null,this.i=u||null,this.j=!!d}function hs(u){u.g||(u.g=new Map,u.h=0,u.i&&MD(u.i,function(d,f){u.add(decodeURIComponent(d.replace(/\+/g," ")),f)}))}r=Mo.prototype,r.add=function(u,d){hs(this),this.i=null,u=ui(this,u);let f=this.g.get(u);return f||this.g.set(u,f=[]),f.push(d),this.h+=1,this};function Pp(u,d){hs(u),d=ui(u,d),u.g.has(d)&&(u.i=null,u.h-=u.g.get(d).length,u.g.delete(d))}function Sp(u,d){return hs(u),d=ui(u,d),u.g.has(d)}r.forEach=function(u,d){hs(this),this.g.forEach(function(f,g){f.forEach(function(O){u.call(d,O,g,this)},this)},this)};function Np(u,d){hs(u);let f=[];if(typeof d=="string")Sp(u,d)&&(f=f.concat(u.g.get(ui(u,d))));else for(u=Array.from(u.g.values()),d=0;d<u.length;d++)f=f.concat(u[d]);return f}r.set=function(u,d){return hs(this),this.i=null,u=ui(this,u),Sp(this,u)&&(this.h-=this.g.get(u).length),this.g.set(u,[d]),this.h+=1,this},r.get=function(u,d){return u?(u=Np(this,u),u.length>0?String(u[0]):d):d};function Op(u,d,f){Pp(u,d),f.length>0&&(u.i=null,u.g.set(ui(u,d),C(f)),u.h+=f.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const u=[],d=Array.from(this.g.keys());for(let g=0;g<d.length;g++){var f=d[g];const O=Oo(f);f=Np(this,f);for(let x=0;x<f.length;x++){let X=O;f[x]!==""&&(X+="="+Oo(f[x])),u.push(X)}}return this.i=u.join("&")};function Fp(u){const d=new Mo;return d.i=u.i,u.g&&(d.g=new Map(u.g),d.h=u.h),d}function ui(u,d){return d=String(d),u.j&&(d=d.toLowerCase()),d}function JD(u,d){d&&!u.j&&(hs(u),u.i=null,u.g.forEach(function(f,g){const O=g.toLowerCase();g!=O&&(Pp(this,g),Op(this,O,f))},u)),u.j=d}function KD(u,d){const f=new No;if(o.Image){const g=new Image;g.onload=B(Ir,f,"TestLoadImage: loaded",!0,d,g),g.onerror=B(Ir,f,"TestLoadImage: error",!1,d,g),g.onabort=B(Ir,f,"TestLoadImage: abort",!1,d,g),g.ontimeout=B(Ir,f,"TestLoadImage: timeout",!1,d,g),o.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=u}else d(!1)}function zD(u,d){const f=new No,g=new AbortController,O=setTimeout(()=>{g.abort(),Ir(f,"TestPingServer: timeout",!1,d)},1e4);fetch(u,{signal:g.signal}).then(x=>{clearTimeout(O),x.ok?Ir(f,"TestPingServer: ok",!0,d):Ir(f,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(O),Ir(f,"TestPingServer: error",!1,d)})}function Ir(u,d,f,g,O){try{O&&(O.onload=null,O.onerror=null,O.onabort=null,O.ontimeout=null),g(f)}catch{}}function WD(){this.g=new PD}function CB(u){this.i=u.Sb||null,this.h=u.ab||!1}h(CB,lp),CB.prototype.g=function(){return new bc(this.i,this.h)};function bc(u,d){yt.call(this),this.H=u,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}h(bc,yt),r=bc.prototype,r.open=function(u,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=u,this.D=d,this.readyState=1,Uo(this)},r.send=function(u){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const d={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};u&&(d.body=u),(this.H||o).fetch(new Request(this.D,d)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Go(this)),this.readyState=0},r.Pa=function(u){if(this.g&&(this.l=u,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=u.headers,this.readyState=2,Uo(this)),this.g&&(this.readyState=3,Uo(this),this.g)))if(this.responseType==="arraybuffer")u.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in u){if(this.j=u.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;xp(this)}else u.text().then(this.Oa.bind(this),this.ga.bind(this))};function xp(u){u.j.read().then(u.Ma.bind(u)).catch(u.ga.bind(u))}r.Ma=function(u){if(this.g){if(this.o&&u.value)this.response.push(u.value);else if(!this.o){var d=u.value?u.value:new Uint8Array(0);(d=this.B.decode(d,{stream:!u.done}))&&(this.response=this.responseText+=d)}u.done?Go(this):Uo(this),this.readyState==3&&xp(this)}},r.Oa=function(u){this.g&&(this.response=this.responseText=u,Go(this))},r.Na=function(u){this.g&&(this.response=u,Go(this))},r.ga=function(){this.g&&Go(this)};function Go(u){u.readyState=4,u.l=null,u.j=null,u.B=null,Uo(u)}r.setRequestHeader=function(u,d){this.A.append(u,d)},r.getResponseHeader=function(u){return this.h&&this.h.get(u.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const u=[],d=this.h.entries();for(var f=d.next();!f.done;)f=f.value,u.push(f[0]+": "+f[1]),f=d.next();return u.join(`\r
`)};function Uo(u){u.onreadystatechange&&u.onreadystatechange.call(u)}Object.defineProperty(bc.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(u){this.m=u?"include":"same-origin"}});function Lp(u){let d="";return Ec(u,function(f,g){d+=g,d+=":",d+=f,d+=`\r
`}),d}function gB(u,d,f){e:{for(g in f){var g=!1;break e}g=!0}g||(f=Lp(f),typeof u=="string"?f!=null&&Oo(f):Ve(u,d,f))}function Ke(u){yt.call(this),this.headers=new Map,this.L=u||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}h(Ke,yt);var $D=/^https?$/i,QD=["POST","PUT"];r=Ke.prototype,r.Fa=function(u){this.H=u},r.ea=function(u,d,f,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+u);d=d?d.toUpperCase():"GET",this.D=u,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():gp.g(),this.g.onreadystatechange=p(l(this.Ca,this));try{this.B=!0,this.g.open(d,String(u),!0),this.B=!1}catch(x){Vp(this,x);return}if(u=f||"",f=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var O in g)f.set(O,g[O]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const x of g.keys())f.set(x,g.get(x));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(f.keys()).find(x=>x.toLowerCase()=="content-type"),O=o.FormData&&u instanceof o.FormData,!(Array.prototype.indexOf.call(QD,d,void 0)>=0)||g||O||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[x,X]of f)this.g.setRequestHeader(x,X);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(u),this.v=!1}catch(x){Vp(this,x)}};function Vp(u,d){u.h=!1,u.g&&(u.j=!0,u.g.abort(),u.j=!1),u.l=d,u.o=5,kp(u),vc(u)}function kp(u){u.A||(u.A=!0,Pt(u,"complete"),Pt(u,"error"))}r.abort=function(u){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=u||7,Pt(this,"complete"),Pt(this,"abort"),vc(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),vc(this,!0)),Ke.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?Mp(this):this.Xa())},r.Xa=function(){Mp(this)};function Mp(u){if(u.h&&typeof i<"u"){if(u.v&&yr(u)==4)setTimeout(u.Ca.bind(u),0);else if(Pt(u,"readystatechange"),yr(u)==4){u.h=!1;try{const x=u.ca();e:switch(x){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var f;if(!(f=d)){var g;if(g=x===0){let X=String(u.D).match(vp)[1]||null;!X&&o.self&&o.self.location&&(X=o.self.location.protocol.slice(0,-1)),g=!$D.test(X?X.toLowerCase():"")}f=g}if(f)Pt(u,"complete"),Pt(u,"success");else{u.o=6;try{var O=yr(u)>2?u.g.statusText:""}catch{O=""}u.l=O+" ["+u.ca()+"]",kp(u)}}finally{vc(u)}}}}function vc(u,d){if(u.g){u.m&&(clearTimeout(u.m),u.m=null);const f=u.g;u.g=null,d||Pt(u,"ready");try{f.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function yr(u){return u.g?u.g.readyState:0}r.ca=function(){try{return yr(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(u){if(this.g){var d=this.g.responseText;return u&&d.indexOf(u)==0&&(d=d.substring(u.length)),RD(d)}};function Gp(u){try{if(!u.g)return null;if("response"in u.g)return u.g.response;switch(u.F){case"":case"text":return u.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in u.g)return u.g.mozResponseArrayBuffer}return null}catch{return null}}function YD(u){const d={};u=(u.g&&yr(u)>=2&&u.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<u.length;g++){if(y(u[g]))continue;var f=xD(u[g]);const O=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const x=d[O]||[];d[O]=x,x.push(f)}wD(d,function(g){return g.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ho(u,d,f){return f&&f.internalChannelParams&&f.internalChannelParams[u]||d}function Up(u){this.za=0,this.i=[],this.j=new No,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Ho("failFast",!1,u),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Ho("baseRetryDelayMs",5e3,u),this.Za=Ho("retryDelaySeedMs",1e4,u),this.Ta=Ho("forwardChannelMaxRetries",2,u),this.va=Ho("forwardChannelRequestTimeoutMs",2e4,u),this.ma=u&&u.xmlHttpFactory||void 0,this.Ua=u&&u.Rb||void 0,this.Aa=u&&u.useFetchStreams||!1,this.O=void 0,this.L=u&&u.supportsCrossDomainXhr||!1,this.M="",this.h=new wp(u&&u.concurrentRequestLimit),this.Ba=new WD,this.S=u&&u.fastHandshake||!1,this.R=u&&u.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=u&&u.Pb||!1,u&&u.ua&&this.j.ua(),u&&u.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&u&&u.detectBufferingProxy||!1,this.ia=void 0,u&&u.longPollingTimeout&&u.longPollingTimeout>0&&(this.ia=u.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=Up.prototype,r.ka=8,r.I=1,r.connect=function(u,d,f,g){St(0),this.W=u,this.H=d||{},f&&g!==void 0&&(this.H.OSID=f,this.H.OAID=g),this.F=this.X,this.J=Qp(this,null,this.W),Pc(this)};function mB(u){if(Hp(u),u.I==3){var d=u.V++,f=En(u.J);if(Ve(f,"SID",u.M),Ve(f,"RID",d),Ve(f,"TYPE","terminate"),qo(u,f),d=new _r(u,u.j,d),d.M=2,d.A=Ac(En(f)),f=!1,o.navigator&&o.navigator.sendBeacon)try{f=o.navigator.sendBeacon(d.A.toString(),"")}catch{}!f&&o.Image&&(new Image().src=d.A,f=!0),f||(d.g=Yp(d.j,null),d.g.ea(d.A)),d.F=Date.now(),Tc(d)}$p(u)}function Rc(u){u.g&&(EB(u),u.g.cancel(),u.g=null)}function Hp(u){Rc(u),u.v&&(o.clearTimeout(u.v),u.v=null),Sc(u),u.h.cancel(),u.m&&(typeof u.m=="number"&&o.clearTimeout(u.m),u.m=null)}function Pc(u){if(!Dp(u.h)&&!u.m){u.m=!0;var d=u.Ea;de||I(),fe||(de(),fe=!0),A.add(d,u),u.D=0}}function XD(u,d){return Tp(u.h)>=u.h.j-(u.m?1:0)?!1:u.m?(u.i=d.G.concat(u.i),!0):u.I==1||u.I==2||u.D>=(u.Sa?0:u.Ta)?!1:(u.m=So(l(u.Ea,u,d),Wp(u,u.D)),u.D++,!0)}r.Ea=function(u){if(this.m)if(this.m=null,this.I==1){if(!u){this.V=Math.floor(Math.random()*1e5),u=this.V++;const O=new _r(this,this.j,u);let x=this.o;if(this.U&&(x?(x=ep(x),np(x,this.U)):x=this.U),this.u!==null||this.R||(O.J=x,x=null),this.S)e:{for(var d=0,f=0;f<this.i.length;f++){t:{var g=this.i[f];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(d+=g,d>4096){d=f;break e}if(d===4096||f===this.i.length-1){d=f+1;break e}}d=1e3}else d=1e3;d=jp(this,O,d),f=En(this.J),Ve(f,"RID",u),Ve(f,"CVER",22),this.G&&Ve(f,"X-HTTP-Session-Id",this.G),qo(this,f),x&&(this.R?d="headers="+Oo(Lp(x))+"&"+d:this.u&&gB(f,this.u,x)),fB(this.h,O),this.Ra&&Ve(f,"TYPE","init"),this.S?(Ve(f,"$req",d),Ve(f,"SID","null"),O.U=!0,lB(O,f,null)):lB(O,f,d),this.I=2}}else this.I==3&&(u?qp(this,u):this.i.length==0||Dp(this.h)||qp(this))};function qp(u,d){var f;d?f=d.l:f=u.V++;const g=En(u.J);Ve(g,"SID",u.M),Ve(g,"RID",f),Ve(g,"AID",u.K),qo(u,g),u.u&&u.o&&gB(g,u.u,u.o),f=new _r(u,u.j,f,u.D+1),u.u===null&&(f.J=u.o),d&&(u.i=d.G.concat(u.i)),d=jp(u,f,1e3),f.H=Math.round(u.va*.5)+Math.round(u.va*.5*Math.random()),fB(u.h,f),lB(f,g,d)}function qo(u,d){u.H&&Ec(u.H,function(f,g){Ve(d,g,f)}),u.l&&Ec({},function(f,g){Ve(d,g,f)})}function jp(u,d,f){f=Math.min(u.i.length,f);const g=u.l?l(u.l.Ka,u.l,u):null;e:{var O=u.i;let pe=-1;for(;;){const st=["count="+f];pe==-1?f>0?(pe=O[0].g,st.push("ofs="+pe)):pe=0:st.push("ofs="+pe);let Ne=!0;for(let lt=0;lt<f;lt++){var x=O[lt].g;const In=O[lt].map;if(x-=pe,x<0)pe=Math.max(0,O[lt].g-100),Ne=!1;else try{x="req"+x+"_"||"";try{var X=In instanceof Map?In:Object.entries(In);for(const[fs,wr]of X){let Dr=wr;a(wr)&&(Dr=iB(wr)),st.push(x+fs+"="+encodeURIComponent(Dr))}}catch(fs){throw st.push(x+"type="+encodeURIComponent("_badmap")),fs}}catch{g&&g(In)}}if(Ne){X=st.join("&");break e}}X=void 0}return u=u.i.splice(0,f),d.G=u,X}function Jp(u){if(!u.g&&!u.v){u.Y=1;var d=u.Da;de||I(),fe||(de(),fe=!0),A.add(d,u),u.A=0}}function _B(u){return u.g||u.v||u.A>=3?!1:(u.Y++,u.v=So(l(u.Da,u),Wp(u,u.A)),u.A++,!0)}r.Da=function(){if(this.v=null,Kp(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var u=4*this.T;this.j.info("BP detection timer enabled: "+u),this.B=So(l(this.Wa,this),u)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,St(10),Rc(this),Kp(this))};function EB(u){u.B!=null&&(o.clearTimeout(u.B),u.B=null)}function Kp(u){u.g=new _r(u,u.j,"rpc",u.Y),u.u===null&&(u.g.J=u.o),u.g.P=0;var d=En(u.na);Ve(d,"RID","rpc"),Ve(d,"SID",u.M),Ve(d,"AID",u.K),Ve(d,"CI",u.F?"0":"1"),!u.F&&u.ia&&Ve(d,"TO",u.ia),Ve(d,"TYPE","xmlhttp"),qo(u,d),u.u&&u.o&&gB(d,u.u,u.o),u.O&&(u.g.H=u.O);var f=u.g;u=u.ba,f.M=1,f.A=Ac(En(d)),f.u=null,f.R=!0,Ep(f,u)}r.Va=function(){this.C!=null&&(this.C=null,Rc(this),_B(this),St(19))};function Sc(u){u.C!=null&&(o.clearTimeout(u.C),u.C=null)}function zp(u,d){var f=null;if(u.g==d){Sc(u),EB(u),u.g=null;var g=2}else if(dB(u.h,d))f=d.G,Ap(u.h,d),g=1;else return;if(u.I!=0){if(d.o)if(g==1){f=d.u?d.u.length:0,d=Date.now()-d.F;var O=u.D;g=wc(),Pt(g,new pp(g,f)),Pc(u)}else Jp(u);else if(O=d.m,O==3||O==0&&d.X>0||!(g==1&&XD(u,d)||g==2&&_B(u)))switch(f&&f.length>0&&(d=u.h,d.i=d.i.concat(f)),O){case 1:ds(u,5);break;case 4:ds(u,10);break;case 3:ds(u,6);break;default:ds(u,2)}}}function Wp(u,d){let f=u.Qa+Math.floor(Math.random()*u.Za);return u.isActive()||(f*=2),f*d}function ds(u,d){if(u.j.info("Error code "+d),d==2){var f=l(u.bb,u),g=u.Ua;const O=!g;g=new Er(g||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||xo(g,"https"),Ac(g),O?KD(g.toString(),f):zD(g.toString(),f)}else St(2);u.I=0,u.l&&u.l.pa(d),$p(u),Hp(u)}r.bb=function(u){u?(this.j.info("Successfully pinged google.com"),St(2)):(this.j.info("Failed to ping google.com"),St(1))};function $p(u){if(u.I=0,u.ja=[],u.l){const d=bp(u.h);(d.length!=0||u.i.length!=0)&&(m(u.ja,d),m(u.ja,u.i),u.h.i.length=0,C(u.i),u.i.length=0),u.l.oa()}}function Qp(u,d,f){var g=f instanceof Er?En(f):new Er(f);if(g.g!="")d&&(g.g=d+"."+g.g),Lo(g,g.u);else{var O=o.location;g=O.protocol,d=d?d+"."+O.hostname:O.hostname,O=+O.port;const x=new Er(null);g&&xo(x,g),d&&(x.g=d),O&&Lo(x,O),f&&(x.h=f),g=x}return f=u.G,d=u.wa,f&&d&&Ve(g,f,d),Ve(g,"VER",u.ka),qo(u,g),g}function Yp(u,d,f){if(d&&!u.L)throw Error("Can't create secondary domain capable XhrIo object.");return d=u.Aa&&!u.ma?new Ke(new CB({ab:f})):new Ke(u.ma),d.Fa(u.L),d}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Xp(){}r=Xp.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function Nc(){}Nc.prototype.g=function(u,d){return new zt(u,d)};function zt(u,d){yt.call(this),this.g=new Up(d),this.l=u,this.h=d&&d.messageUrlParams||null,u=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(u?u["X-Client-Protocol"]="webchannel":u={"X-Client-Protocol":"webchannel"}),this.g.o=u,u=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(u?u["X-WebChannel-Content-Type"]=d.messageContentType:u={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.sa&&(u?u["X-WebChannel-Client-Profile"]=d.sa:u={"X-WebChannel-Client-Profile":d.sa}),this.g.U=u,(u=d&&d.Qb)&&!y(u)&&(this.g.u=u),this.A=d&&d.supportsCrossDomainXhr||!1,this.v=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!y(d)&&(this.g.G=d,u=this.h,u!==null&&d in u&&(u=this.h,d in u&&delete u[d])),this.j=new li(this)}h(zt,yt),zt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},zt.prototype.close=function(){mB(this.g)},zt.prototype.o=function(u){var d=this.g;if(typeof u=="string"){var f={};f.__data__=u,u=f}else this.v&&(f={},f.__data__=iB(u),u=f);d.i.push(new kD(d.Ya++,u)),d.I==3&&Pc(d)},zt.prototype.N=function(){this.g.l=null,delete this.j,mB(this.g),delete this.g,zt.Z.N.call(this)};function Zp(u){oB.call(this),u.__headers__&&(this.headers=u.__headers__,this.statusCode=u.__status__,delete u.__headers__,delete u.__status__);var d=u.__sm__;if(d){e:{for(const f in d){u=f;break e}u=void 0}(this.i=u)&&(u=this.i,d=d!==null&&u in d?d[u]:void 0),this.data=d}else this.data=u}h(Zp,oB);function eC(){aB.call(this),this.status=1}h(eC,aB);function li(u){this.g=u}h(li,Xp),li.prototype.ra=function(){Pt(this.g,"a")},li.prototype.qa=function(u){Pt(this.g,new Zp(u))},li.prototype.pa=function(u){Pt(this.g,new eC)},li.prototype.oa=function(){Pt(this.g,"b")},Nc.prototype.createWebChannel=Nc.prototype.g,zt.prototype.send=zt.prototype.o,zt.prototype.open=zt.prototype.m,zt.prototype.close=zt.prototype.close,DE=function(){return new Nc},wE=function(){return wc()},yE=ls,ih={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Dc.NO_ERROR=0,Dc.TIMEOUT=8,Dc.HTTP_ERROR=6,iu=Dc,Cp.COMPLETE="complete",IE=Cp,Bp.EventType=Ro,Ro.OPEN="a",Ro.CLOSE="b",Ro.ERROR="c",Ro.MESSAGE="d",yt.prototype.listen=yt.prototype.J,ta=Bp,Ke.prototype.listenOnce=Ke.prototype.K,Ke.prototype.getLastError=Ke.prototype.Ha,Ke.prototype.getLastErrorCode=Ke.prototype.ya,Ke.prototype.getStatus=Ke.prototype.ca,Ke.prototype.getResponseJson=Ke.prototype.La,Ke.prototype.getResponseText=Ke.prototype.la,Ke.prototype.send=Ke.prototype.ea,Ke.prototype.setWithCredentials=Ke.prototype.Fa,EE=Ke}).apply(typeof Vc<"u"?Vc:typeof self<"u"?self:typeof window<"u"?window:{});/*!
* re2js
* RE2JS is the JavaScript port of RE2, a regular expression engine that provides linear time matching
*
* @version v2.10.0
* @author Oleksii Vasyliev
* @homepage https://github.com/le0pard/re2js#readme
* @repository [object Object]
* @license MIT
*/var Oe,H=(Oe=class{},q(Oe,"FOLD_CASE",1),q(Oe,"LITERAL",2),q(Oe,"CLASS_NL",4),q(Oe,"DOT_NL",8),q(Oe,"ONE_LINE",16),q(Oe,"NON_GREEDY",32),q(Oe,"PERL_X",64),q(Oe,"UNICODE_GROUPS",128),q(Oe,"WAS_DOLLAR",256),q(Oe,"LOOKBEHIND",512),q(Oe,"MATCH_NL",Oe.CLASS_NL|Oe.DOT_NL),q(Oe,"PERL",Oe.CLASS_NL|Oe.ONE_LINE|Oe.PERL_X|Oe.UNICODE_GROUPS),q(Oe,"POSIX",0),q(Oe,"UNANCHORED",0),q(Oe,"ANCHOR_START",1),q(Oe,"ANCHOR_BOTH",2),Oe);const Bi={CASE_INSENSITIVE:1,DOTALL:2,MULTILINE:4,DISABLE_UNICODE_GROUPS:8,LONGEST_MATCH:16,LOOKBEHINDS:512},Pa=128,oh=new Int32Array(Pa),ah=new Int32Array(Pa),kc=65535;for(let r=0;r<Pa;r++)r>=97&&r<=122?oh[r]=r-32:oh[r]=r,r>=65&&r<=90?ah[r]=r+32:ah[r]=r;var YB,M=(YB=class{static toUpperCase(r){if(r<Pa)return oh[r];const e=String.fromCodePoint(r).toUpperCase(),t=e.codePointAt(0)>kc?2:1;if(e.length>t)return r;const n=String.fromCodePoint(e.codePointAt(0)).toLowerCase(),s=n.codePointAt(0)>kc?2:1;return n.length>s||n.codePointAt(0)!==r?r:e.codePointAt(0)}static toLowerCase(r){if(r<Pa)return ah[r];const e=String.fromCodePoint(r).toLowerCase(),t=e.codePointAt(0)>kc?2:1;if(e.length>t)return r;const n=String.fromCodePoint(e.codePointAt(0)).toUpperCase(),s=n.codePointAt(0)>kc?2:1;return n.length>s||n.codePointAt(0)!==r?r:e.codePointAt(0)}},q(YB,"CODES",Object.freeze({"\x07":7,"\b":8,"	":9,"\n":10,"\v":11,"\f":12,"\r":13," ":32,'"':34,$:36,"&":38,"'":39,"(":40,")":41,"*":42,"+":43,"-":45,".":46,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,":":58,"<":60,">":62,"?":63,A:65,B:66,C:67,F:70,P:80,Q:81,U:85,Z:90,"[":91,"\\":92,"]":93,"^":94,_:95,"`":96,a:97,b:98,f:102,i:105,m:109,n:110,r:114,s:115,t:116,v:118,x:120,z:122,"{":123,"|":124,"}":125})),YB),_=class{constructor(r,e=!1){this.data=r,this.isStride1=e,this.SIZE=e?2:3}getLo(r){return this.data[r*this.SIZE]}getHi(r){return this.data[r*this.SIZE+1]}getStride(r){return this.isStride1?1:this.data[r*this.SIZE+2]}get length(){return this.data.length/this.SIZE}};const mR="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-",TE=new Uint8Array(256);for(let r=0;r<64;r++)TE[mR.charCodeAt(r)]=r;const AE=r=>{const e=[];let t=0,n=0;for(let s=0;s<r.length;s++){const i=TE[r.charCodeAt(s)];t|=(i&31)<<n,(i&32)===0?(e.push(t),t=0,n=0):n+=5}return e},E=(r,e)=>{const t=AE(r),n=e?t.length/2:t.length/3,s=new Uint32Array(n*3);let i=0,o=0;for(let a=0;a<n;a++)i+=t[o++],s[a*3]=i,i+=t[o++],s[a*3+1]=i,s[a*3+2]=e?1:t[o++];return s},_R=r=>{const e=AE(r),t=new Map;let n=0;for(let s=0;s<e.length;s+=2){n+=e[s];const i=e[s+1],o=i>>>1^-(i&1);t.set(n,n+o)}return t};var Mc=class{constructor(r){this.initializer=r,this.cache=new Map}has(r){return Object.hasOwn(this.initializer,r)}get(r){if(this.cache.has(r))return this.cache.get(r);const e=this.has(r)?this.initializer[r]():null;return this.cache.set(r,e),e}},Pr,Wt=(Pr=class{static get CASE_ORBIT(){return this._CASE_ORBIT||(this._CASE_ORBIT=_R("rCgCIgCY+rQI4QiCuuBLgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCCgCBgCBgCBgCBgCBgCBgCB+7OB-BB-BB-BB-BB-BBskQB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BC-BB-BB-BB-BB-BB-BB-BByHBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBxHBCBBBCBBBCBBB3SBmMBkNBCBBBCBBB8MBCBBB6MB6MBCBBC+EB0MB2MBCBBB6MB+MBiGBmNBiNBCBBBmKBikzCBmNBqNBkIBsNBCBBBCBBBCBBB0NBCBBB0NDCBBB0NBCBBByNByNBCBBBCBBB2NBCBBDCBBCwDFCBCBDBCBCBDBCBCBDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB9EBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBCBDBCBBBhGBvDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBjICCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBH2iVBCBBBlKBwiVB+jVB+jVBCBBBlMBqEBuEBCBBBCBBBCBBBCBBBCBBB+hVB4hVB8hVBjNB7MC5MB5MCzMC1MB+0yCE5MB20yCC9MBu2yCBwyyCBo0yCChNBlNBo0yCBu-UBi0yCDlNC6-UBpNDrNIu+UDzNCm0yCBzNE0yyCBzNBpEBxNBxNBtEG1NLqxyCBkxyCnFoFrBCBBBCBBDCBBEkIBkIBkICoHHsCCqCBqCBqCCgEC+DB+DBmkOBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCC+BBgCBgCBgCBgCBgCBgCBgCBgCBrCBpCBpCBpCBmjOB-BB8BB-BB-BBgEB-BB-BByBBqgOBsDB-BBtwBB-BB-BB-BBsBBgDBCB-BB-BB-BBeB-BB-BB61OB-BB-BB-DB9DB9DBQB7DBmCE9CBrDBPBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBrFB-EBOBnHB3FB-FCCBBBNBCBBCjIBjIBjIBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB8kMB-BB6kMB-BB-BB-BB-BB-BB-BB-BB-BB-BBokMB-BB-BBkkMBkkMB-BB-BB-BB-BB-BB-BB-BB4jMB-BB-BB-BB-BB-BB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EBCBBBCBoiMBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBJCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBeBCBBBCBBBCBBBCBBBCBBBCBBBCBBBdBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDL-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-C64CgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOCgmOGgmODg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FDg8FBg8FBg8FhVg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBQBQBQBQBQBQDPBPBPBPBPBPjkC7mMB5mMBnmMBjmMBCBlmMB3lMBpiMBk8kCBCBBG-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FD-7FB-7FB-7F6FoglCEsuHRwjlCyDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCB0DBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBG1DD97OCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPEQCQCQCQCPCPCPCPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPB0EB0EBsFBsFBsFBsFBoGBoGBgIBgIBgHBgHB8HB8HDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQCSFPBPBzEBzEBRCxnOFSFrFBrFBrFBrFBREQBQClkOFPBPBnGBnGFQBQCljOCODPBPB-GB-GBNHSF-HB-HB7HB7HBRqJ53OE9tQBrmQH4Bc3BSgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfECBByZ0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzB34BgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CBCBBBt-UBruHBt+UB1iVBviVBCBBBCBBBCBBB3hVB5-UB9hVB7hVCCBBCCBBI9jVB9jVBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBICBBBCBBECBBN-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOC-lOG-lOzoeCBBBCBBBCBBBCBBBCBBBCBl8kCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBTCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBnECBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBKCBBBCBBBnglCBCBBBCBBBCBBBCBBBCBBECBBBvyyCDCBBBCBBBgDCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBn0yCB90yCB10yCBh0yCBn0yCCjxyCBzyyCBpxyCBg6BBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB-CBl0yCBvjlCBCBBBCBBBt2yCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBhkzCZCBB9a-5Bd-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCm6TCBB7gBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCH-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BmlBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvChDwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCFvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvC1DuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCCuCBuCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCCtCBtCk2BgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEO-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-D+CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCL-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-B74CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhrVgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BD1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BtxekCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjC")),this._CASE_ORBIT}static get Print(){return this._Print||(this._Print=new _(E("hB9CBjBLBCpWBDFBFGBCCCBSBCsMBClBBDxBBDCBC2BBJaBFFBSVBC-FBCvBBD6BBDkDBP6BBDwBBDOBCbBDCCBJBGfBIqCBCgFBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYBDCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPBLCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGBCCBCHBDBBDVBCGBCBBCEBDIBDBBDCBICBFBBCEBDRBLBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBGMBCCBCWBCPBDIBCCBCDBIBBCCBCBBDDBDJBIVBCCBCWBCJBCEBDIBCCBCDBIBBGCBCDBDJBCCBNMBCCBCyBBCCBCFBFPBDZBCCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBN5BBFcBmBBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDBhBnCBCjBBFmBBCjBBCOBCMBmBlGBCGGD4LBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBH1CBDFBD-TBCbBE4CBIVBKXBKTBNMBCCBCBBN9CBDJBHJBHNBCKBH4CBIqBBGlCBLeBCLBFLBFEEBoBBDEBMrBBFZBHKBE9BBDgCBCcBDKBHJBHNBDtBBDLBVsCBClFBJ7BBEOBE9BBGqBBDKBJqBBG1QBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBSXBJuBBSBBDaBCMBEhBBPgBBQrEBF5UBXKBWz4BBD9LBGsBBCGGD3BBIBBPXBKGBCGBCGBCGBCGBCGBCGBCGBC9DBjBZBC4CBN1GBbPBC+BBC1CBDmDBGqBBC9CBC1CBKvBBCszcBE2BBK7KBV3FBJ8GBV7BBEJBH3BBJlCBJLBHzDBMdBEtCBCKBFgBBC2BBKNBDJBDmDBZbBLFBDFBDFBKGBCGBC7BBF9DBDJBHj9KBNWBFwBBloItLBDpDBnBGBNEBGZBCEBCCCBCCBCCBoUBhBpBBHyBBCSBCDBFEBCmEBF9FBEFBDFBDFBDCBEGBCGBOBBDLBCZBCSBCBBCOBDNBjB6DBGCBFsBBE3CBCMBEwBwBBsBBjEcBEwBBQbBFjBBKdBGqBBGdBCkBBFNBrB9EBDJBHjBBFjBBFnBBJzBBMLBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBCnCBJIBxBSBCBBGgBBEaBGaBnB3BBFTBDxBBCBBGHBCCBCcBDCBFJBIIBI-BBhBmBBFLBK1BBEcBDaBGZBIDBNGBxCoCB4ByBBOyBBItBBJJBHlBBEcBJBBxGeBCpBBCCBDBBRFBJIBiBtBBJpBBXZBnBbBVWBKtCBFjBBK9BBCEBOYBIJBH0BBCRBJmBBK-CBCTBMRBCuBB-BGBCCCBCBCOBCKBH6BBGJBHDBCHBDBBDVBCGBCBBCEBCJBDBBDCBDHHGGBDGBEEBMJBCDDClBBCJBCDDCDBCJBCBBJBBe7CBCEBfnCBJJBnF1BBDlBBjBkCBMJBHMBU5BBHJBHTBdaBDOBFWB6F7BBlDyCBNHBDDDBGBCBBCdBCBBDLBKJBnCHBDtBBDKBcnCBJyCBOoCBIJB3CHB5ChBBPJBHIBCsBBCNBLcBEfBDVBCNBqCGBCBBCrBBECCBCCBHBJJBHFBCBBCkBBCBBCFBIJBHrBBFJB3HYBIQBCoBBEcB2CQQBwBBO6cBnDuDBCEBMjGBtyCiDBOvhBBRVBL68DBGmSB61G5BBn2B4RBIeBCJBFwCBCJBHdBDFBLlCBLJBCGBCUBGSBxN5BBnG6CBGYBDYBtBqCBF4BBIQBhCEBMGBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBDDBh7D8HBEzNBHWBQQBQtBBDWBKzDB9B1HBLmBBDpCBJvDBWlCB7DTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBD9VBQEBCOBxiBeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBENBDJBFBBhKeBS5BBGxOxOBoBB3GqBBFhGhGBdBCVBJBBhHGBCDBCBBCOBCkGBDPBqBrCBFJBFBByYjCBtC8BBjGDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBBvIrBBFjDBNOBDOBCOBCkBBLtFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBmgB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIBnkzVvHB",!1))),this._Print}},q(Pr,"_CASE_ORBIT",null),q(Pr,"_Print",null),q(Pr,"CATEGORIES",new Mc({C:()=>new _(E("AfBgDgBBOrWrWBHHBCBICCVuMuMnBBBzBBBE4B4BBGBcDBHQBXhGhGxBBB8BBBmDNB8BBByBBBQddBCCMEBhBGBsCiFiFJBBDBBXIICCBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBPMMBEB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKMMBDBbEByBPBDBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCB-FCBHBBHBBHBBECBIIIBLBDBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIB-BGGBLBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMBxhBPBXJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBF-6DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBrCHBxDUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIlkzVBxHvw-FB",!1)),Cc:()=>new _(E("AfgDgB",!0)),Cf:()=>new _(E("tFzqBzqBBEBXhGhGyBhMhMBxCxCs5D9-B9-BBDBbEByBEBCJBw03B6H6HBBBimEQQj7IPBhjiBDBwmFHBn0rYffB+CB",!1)),Cn:()=>new _(E("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBDBvzIBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-BB---BBB---BBB",!1)),Co:()=>new _(E("gg4B-nGh4hc9--BD9--B",!0)),Cs:()=>new _(E("gg2B--B",!0)),L:()=>new _(E("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICCiEEBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoCaBFDBuBqBBkBBBCiDBCQQBIIBLLBBBDRRCdBe4CBMZZBfBKBBFGGBUBFKKEYYBXBIKBGXBCGBRpBB7B1BBETTIJBQPBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNGB7BBBCCCBDBCXBCCCBIBCBBKDDBDBCWWBCBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNSSBkBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBkBFFkC4CBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBzC+C+CBtBBSHB3BdBOBBLrBBbjBBqBCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBhC1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBF1B1BB8zC8zCBjHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBxC2O2OBrBrBBDBGBBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBReBDlCByBIBDmDBDxCBVQBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBdRRBDBCJBLEBCoBBYCBCHBVWBEEEBwBBCEEBDDBDBDCCZCBDKBICBNFBDFBDFBKGBCGBCqBBCNBHyDBej9KBNWBFwBBloItLBDpDBnBGBNEBGCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBxB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOjBBnBbBKWB7HpBBHBBRFB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB1D-BBgBHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBqBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBGjCjCBLBhCBBCPPBNNB0mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBn7F0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFBmI9BBzEsBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCCBCBBCGBDEBKBBhHGBCDBCBBCOBCkGB8BjCBI1lB1lBBCBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),LC:()=>new _(E("hCZBHZB7BLLBVBCeBCiGBCDBFvGBDZBhGDBDBBECBCHHCCBCCCBSBCyCBCqEBJlFBClBBKoBB44ClBBCGGDqBBDCBhV1CBDFBjkCKBGqBBDCBhCrBBgCMBChBBmD1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGBmIFFDJBCEEBDBHGCBCBCFBFDDBCBGEBF1B1BB8zC8zCB6DBDmDBHDBEBBNlBBCGGzoetBBTbBnEtCBCWBEDBCsCBZBBE2Z2ZBpBBGIBIvCBh6TGBNEBqgBZBHZBmlBvCBhDjBBFjBB1DKBCOBCGBCBBCKBCOBCGBCBBk2ByBBOyBB+CVBLVB74C-BBhrV-BBhBYBDYBtpZ0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BJBCTBHFB2uCjCB",!1)),Ll:()=>new _(E("hDZB7BqBqBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDZBiGCCEEEBBBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBDCB5XFBjkCIBC2D2DBqBBgCMBChBBnD0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBBzIEEBEEcKFDBBJDBF2B2Bs1CvBBCEEBGCFCCBCCBEBGiDCBIICFFNlBBCGG0oesBCUaCoEMCBBBC+BCBGBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCbEE2ZqBBGIBIvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFB4vChBB",!1)),Lm:()=>new _(E("wVRBFLBPEBICCmEGG-OnHnHlFBBuIBBFgBgBKEEhFoFoF1mBgEgE2R72B72BsDkTkTxOFBvF+BBOjBjBBjBByVOORMBg-CBByHgGgG2OsBsBBDBGiDiDB+C+CBBB34bjnBjnBBEBvIzDzDdBB6DIBxCYYpDDBEBB2OXXqEtDtDWBBoDDBKngVngVuBBBh-BFBCpBBCIB0sBhBhB2K04D04DnrTDB9PCBpBBBnRMBhCBBCPPB9-P9-PBCBCGBCBByhM9BBqGGBud0Q0QsSAB",!1)),Lo:()=>new _(E("qFQQhIFFBCBxGBB7ZaBFDBuBfBCJBkBBBCiDBCZZBLLBBBDRRCdBe4CBMZZBfBWVBrBYBIKBGXBCGBRoBB8B1BBETTIJBROBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNFB8BBBCCCBDBCXBCCCBIBCBBKDDBDBYDBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNyDyDBnKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPByDrTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBpBkCkCBhBBC0BBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBxFuBBSHB3BdBOBBLrBBbjBBqBCBLdByDDBCFBCBBE7hB7hBBCB4-C3BBZWBKGBCGBCGBCGBCGBCGBCGBCGBoR2B2BF1CBJCCB4CBFGGBpBBC9CBSfBxBPBhQ-tGBhC0wUBC2jBBkCnBBJrIBFPBLBBjCyByBBkCBqFoDoDEGBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBuBEBDIBLEBCoBBYCBCHBVPBCFBEEEBwBBCEEBDDBDBDCCZBBEKBIPPBEBDFBDFBKGBCGByEiBBej9KBNWBFwBBloItLBDpDBkCCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBqDJBCsBBDeBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBhEtCBjDnBBJzBB9CzBBN2JBKVBLHB5EFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4FjBBnBDBCxJxJBoBBHBBRCBCBB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB0GHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBnBBCBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBB0BUBGSB0NnBB2MqCBGwFwFB0mHBqBfBiDyDBuwIiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBxzI2P2PBrBBiBiKiKBcBTrBBlPaBmHdBDwGwGBdBCCBCBBCGBDEBKiHiHBFBCDBCBBCOBCkGB8pBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Lt:()=>new _(E("lOGDnB2sH2sHBGBJHBJHBNQQwBAB",!1)),Lu:()=>new _(E("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBG+B+B9zCvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBB",!1)),M:()=>new _(E("gYvDB0IGBoIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCgBB3BCBCRBCGBLBBeCB5BCCBFBDBBDCBKLLBbbDCB5BCCBDBFBBDCBEffBEEMCB5BCCBGBCCBCCBVBBXFBCCB5BCCBFBDBBDCBICBLBBf8B8BBDBECBCDBKpBpBBDB4BCCBFBCCBCDBIBBMBBeCB5BCCBFBCCBCDBIBBMBBQNNBCB4BBBCGBCCBCDBKLLBeeBBBnCFFBEBCCCBGBTBB+BDDBFBNHBjDDDBHBMGBqCBBcECFBByBTBCBBGKBCjBBKlDlDBSBYDBFCBCCBDGBEDBOLBCLLBCBgWCBzdDBdCBeBBfBBhCfBKuBuBBBBC2D2DBjBjB3DLBFLB8GEB6BJBCcBDxBxBBsBBDLBVEBwBQBnBIBNCBfMB5BNBxBTB5ECBCUBFHHDCBnG-BBxWgBB--CCBuEhDhDBeBrRFBqDBB1udDBCJBhBBBxCBBxIEEFYYBDBF0C0CBzBzBBQBbRBOnBnBBGBaMBtBDBwBNBlBkCkCBMBNJJBuBuBBBBzBCCBBBDBBGBBCqBqBBDBGBBtHHBCBBx5TiXiXBOBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB7DCB2BOBqBDDBLLBCBuBKBI+B+BBBBlBNBRBBtBNNBBBxBNBJDBCBB9CLBHDD+ELBWDB4BBBCGBDBBDCBKLLBDDBFBEEBkCIBCDDCDBCEBCPPBzCzCBQBYyCyCBSBsHGBDIBcBBzCQBrDMBmDOBhIOB2HFBCBBDDBCCCBuEuEBFBDGBEddBIBpBGBCDBJKKBJBvBPBnGHBoGHBCHBzCVBCNB7DFBECCBCCBFBCjCjCBDBCBBCEB8KDBKBBCxBxBBFBEEBYmnFmnFHOBpmLRBhuCEB8BGB5gBCCB1BBIDByCMMBslTslTBizEizEBsBBDWB-QEBEFBJHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB",!1)),Mc:()=>new _(E("joC4B4BDCBJDBCBBzBBB7BCBHBBDBBLsBsB7BCBjC7B7BBBBJCCB2B2BB7B7BCHHBDDBLLnDBBCBBECBCCBLqBqBBBB+BDB+BBB7BCCBDBDBBCBBKBBdPPB7B7BBBBGCBCCBLrBrBBsCsCBBBHHBTBBrKBBgCsFsFBFFHDDBaaBLLBBBDGBWBBDFBDLLBBB5zBffiEIIBGBCBB7KDBDCBFBBCFBhHBB7BCCKCCBJJBEByExBxBGCCBDBCBB+BffFBBD9B9BDCBCEEBxBxBBGBJBBsFWW35EBB0-dBBD5C5CBzBzBBOBvEBBwBxBxBBFFBDDBBBvDBBDBBZuBuBCuDuDDBBGuHuHBCCBCCBCC0gZCCgEuBuBBBBFBB0DZZB8B8BxBCBKBBO+C+CBBBEBBCrFrFBBBgBBB7BBBCDBDBBDCBKLLB1C1CBBBIDDCDBCBBCmDmDBBBJBBErDrDBBBHCCBCBDuHuHBBBHDBDyDyDBBBJBBCuDuDCBBHoDoDCBBFmImIBBBK4H4HBEBCBBFDDCvEvEBBBJDBF1C1CeBB-BqGqGECCoGPPrDIID2G2GBDBFBBC-K-KBNNxBBBJBBCpvQpvQBBBlxD2BBpDBB0rYBBHFB",!1)),Me:()=>new _(E("okBBB1xF-wB-wBBCBCCBsshBCB",!1)),Mn:()=>new _(E("gYvDB0IEBqIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCfB4BCCFHBFEEBFBLBBe7B7BFDBJVVBbbDBB6BFFBFFBDDBBBEffBEEMBB6BFFBDBCBBFVVBXXBEBC7B7BDCCBCBJIIBMMBff+BNNzBEE4BCCBBBGCBCDBIBBMBBe7B7BDHHGBBVBBdBB6BBBFDBJVVBeepCIIBBBC7C7CDGBNHBjDDDBHBMGBqCBBcEC4BNBCEBCBBGKBCjBBKnDnDBCBCFBCBBDBBaBBFCBRDBODDBHHQgWgWBBBzdCBeBBfBBfBBhCBBCGBJDDBJBKuBuBBBBC2D2DBjBjB3DCBFBBKHHBBB8GBBD7B7BCGBCCCDHBHJBDxBxBBMBCeBDLBVDBxBCCBDBCGGpBIBNBBhBDBDBBCCB5BCCBEECCB7BHBDBB5ECBCMBCGBFHHEBBnG-BBxWMBFEEBKB--CCBuEhDhDBeBrRDBsDBB1udFFBIBhBBBxCBBxIEEFaaBGG4EBBbRBOnBnBBGBaKBvBCBxBDDBCBDBBoBkCkCBEBDBBDBBNJJwB0B0BCCBDBBGBBCrBrBBJJvHDDFx5Tx5TiXPBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB8D3B3BBNBqBDDBLLBBByBDBDBBI+B+BBBBlBEBCHB-BNNB1B1BBHBLDBDgDgDBBBDCCBHHD+E+EEHBWBB6BBBEmBmBBFBEEBnCFBOECPBB2CHBDCBCYY1CFBCFFBCCBvHvHBCBHBBCBBcBB2CHBDCCBrDrDCDDBEBCmDmDCDDBCBCEBkIIBCBBhIBBCFFxEDBDBBFhBhBBIBpBFBDDBJKKBEBDCBvBMBCBBnGCCBBBCqGqGBFBCFBCzCzCBUBDGBCBBCBB7DFBECCBCCBFBCpCpCBEEC8K8KBMMB1B1BBDBGCCYmnFmnFHOBpmLLBECBhuCEB8BGB5gBgCgCBCByC5lT5lTBizEizEBsBBDWBhRCBSHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB",!1)),N:()=>new _(E("wBJB5DBBGDDBBBitBJBnEJBnGJB9MJB3DJBFFBtDJB3DJB3DJBDFBvDMB0DJBJGBoDJBpDGBISBuDJBhDJB3DJBnCTBtIJBnCJBwWTBybCBwHJBHJBXJBtJJBhEKBmFJBHJB3FJB3CJBnEJBHJB3gBEEBEBHJBnGyBBDEB3W7BBvCVB3TdBqrBqYqYaIBPCB4KDBrEJBfHBCOBhBJBoBOBh7cJB9FJBhKFB7EJBnBJBnGJBXJB3CJB3MJB34UJBuPsBBN4BBSBB2KaBlBDBeJJnEEBrGJBvdHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBxBJBHJB3IeB-EJBrBDBxDGBnEdBhEJB9BJBxEJBITB8HJB3KJB3DJB3LJBnDJBHTBtCLBlNSB+CJB3UJB3CcBkHJBnCJB3BJBnLJBnDUBshBuDBimPJBnpCJB3CJBnEJBCGBvQJBnIWB+KCB6nXJBnuBTBNTBtDYB2iBxBBhqCJBnNJB3PJB4HJBtWIBhEJB4Y6BBCCBCDBtCsBBCOBjeMBk3CJB",!1)),Nd:()=>new _(E("wBJnxBJnEJnGJ9MJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJhDJ3DJnCJ3IJnCJn6BJnBJtJJhEJnFJHJ3FJ3CJnEJHJnuiBJnVJnBJnGJXJ3CJ3MJ34UJnsBJnkCJHJ9YJhEJ9BJxEJ3IJ3KJ3DJ3LJnDJHTtCJnNJnDJ3UJ3CJ3HJnCJ3BJnLJ3uQJnpCJ3CJnEJ3QJ37XJ12CxBhqCJnNJ3PJ4HJ2aJ30EJ",!0)),Nl:()=>new _(E("u3FCBwzCiBBDDB-zDaaBHBPCBs1dJBxyW0BBtOJJnEEBrhIuDBm8SCB",!1)),No:()=>new _(E("yFBBGDDBBB2pCFB5LFB5DCBmEGB6GGBSIByNJB2hBTB0jBJBhP20B20BEFBHJBnGPBqB3W3WB6BBvCVB3TdBqrB1kB1kBBCBrEJBfHBCOBhBJBoBOBxrdFBymWsBBiCDBSBB2KaBlBDB1pBHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBhLeB-EJBrBDBxDGBnETB8LTBmqBBBvNIBobSB0aUBn8SGB-YWBqhZTBNTBtDYBvqFIBid6BBCCBCDBtCsBBCOBjeMB",!1)),P:()=>new _(E("hBCBCFBCDBLBBEBBbCBCccCkBkBGEELBBEEE-VJJzOFBqBBB0BCCDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCmBmBBCBoCrCrCBDBFBBwDFBsFlTlTBHB4EuTuTtBBBvCCBoCBB+ECBCCBmBKB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBM9Z9ZBWBJTBCMBCLBfBBPBB6TDBeBB+hBNBwCBBgBJB0MVBgCDBhBBB8XDBCBBxDwEwEBtBBCfBDLBkNCBFJBDLBRNNjD7C7CjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HzqUzqUBxGxGBIBXiBBCNBCFFCBB2ECBCFBCDBLBBEBBbCBCccCCCBFB7MCB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDByO-J-JjBlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB",!1)),Pc:()=>new _(E("-Cg-Hg-HBUU-u3BBBZCBwHAB",!1)),Pd:()=>new _(E("tB9qB9qB0BiyDiyDmgBqgCqgCBEBiwDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J",!1)),Pe:()=>new _(E("pB0B0BgB+1D+1DC-6B-6BqtC4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECtBGCtNICEGCDBB-ozB6G6GeOCESSCCCrF0B0BgBGD",!1)),Pf:()=>new _(E("7F+6H+6HEddpuDCCFDDQEE",!1)),Pi:()=>new _(E("rFt7Ht7HDBBDaapuDCCFDDQEE",!1)),Po:()=>new _(E("hBCBCCBDECBLLBEEBcclCGGPBBI-V-VJzOzOBEBqB3B3BDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCxDxDrCEBFBBwDFBsFlTlTBHBmY9D9DBBBoCBB+ECBCCBmBFBCDB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBMjajaBJJBGBJIBDDBDCBEKBCCCBIB7kDDBCBBxDwEwEBFFBBBDDDBHBCBBCDDBLLBDBCJBDDBCCCBLBDCBtNCB6B+F+FjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HlxUlxUBFBDXXVBBDDBECBCDBICBHCCB2E2EBBBCCBDECBLLBEEBcclBDDB7M7MBBB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDB0ZlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB",!1)),Ps:()=>new _(E("oBzBzBgB-1D-1DC-6B-6B-rCEEnB4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECaTTCECtNICEGCDipzBipzB4GeeCMCESSCCCrFzBzBgBEEDAB",!1)),S:()=>new _(E("kBHHRCBgBCCcCCkBEBCBBDCCBCBDEEfgBgBrODBNNBGGBCCCBPB2DPPBxDxDsErIrIBBB3DCBDDDBvGvGLUUB4H4HIBBpEqLqLBHHB2H2H-DjEjEBGBlEwGwGqBmGmGiGCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WuLuLlL+E+EBgBBiLJBKIBhiBCCBBBMCBOCBOCBOBBmCOOoBCBOCBUhBB-BBBCDBCBBLCCBBBGFBCECFMMBFFBDBGDBC7B7BBFFB2LBFcBD+HBXKByCtCBXnTBtBwBBDeBLyMBX+BBFfBD1LBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBB8CBB0HBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BB6RWBKBBoDBB+EDBLDB+RCBiHPPB+9T+9TpEgBBuLPBhCBB3BHBtBDBjDCCBBBD7E7EHRRBBBgBCCcCCiEGBCGBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSmWmWBiKiKBGBnjC2kC2kCBbBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQQBgDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBrbaagBaagBaagBaagBaa9B-PB4BDBzBHBCNBCBBp2BwNwNttCEE+DiOiOBvIvIBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB",!1)),Sc:()=>new _(E("kB+D+DBCBqnB8D8DzPBBzPBBI2H2HoImSmS8sClmClmCBgBB37hBkuVkuVtD7E7E8GBBEBB3-HDB-4wBxtCxtC",!1)),Sk:()=>new _(E("+CCCoCHHFEEqQDBNNBGGBCCCBPB2DPPBjoBjoB15FCCBBBMCBOCBOCBOBB9kEBBkzdWBKBBoDBBxePPBniUniUBPB8bCCjF4g9B4g9BBDB",!1)),Sm:()=>new _(E("rBRRBBB+BCCuBFFmBgBgB-XwQwQBBB8xGOOoBCBOCBsEoBoBBDBHlClCBDBGBBFGDIgBgBBDDCgBgBBqIBhBBB7CffBXBpBFB2OKK3BHBwDxKxKBDBDeBLPBhIiEBX+BBFfBDhIBxBUBDFB9+zB5Z5ZCCBlFRRBBB+BCCkEHHBCBitDBBhrwBx+Bx+BagBgBagBgBagBgBagBgBat5Ft5FB-uC-uCBHB",!1)),So:()=>new _(E("mFDDFCCyerIrIBgEgEBvGvGLUUB4H4HkQ2L2LjEFBClElEwGqBqBoMCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WzWzW+EhBBiLJBKIBksBBBCDBCBBLCCBHHBEBCECFMMBPPCBBC7B7BBKKBDBDDBCBBCBBCGBCeBDBBCCCBdBtIHBFTBDGBDwCBCdBanBBHnCBXKByCtCBX2FBCIBC1BBJuDBC3HBtBrBBhC-HBhQvBBWBBHmBBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBBxKBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BBibDBLBBC+R+RBBBqqUPBuLPBhCBB3BHBuBCBlPEEFBBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSpgBpgBBGBnjC2kC2kCBGBFQBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQPBhDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBqlB-PB4BDBzBHBCNBCBBp2B96C96CiEyWyWBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E6HBG4WBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBB-B3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB",!1)),Z:()=>new _(E("gBgEgEgvFgsCgsCBJBeBBGwBwBh9DAB",!1)),Zl:()=>new _(E("ohIA",!0)),Zp:()=>new _(E("phIA",!0)),Zs:()=>new _(E("gBgEgEgvFgsCgsCBJBlBwBwBh9DAB",!1)),ASCII_Hex_Digit:()=>new _(E("wBJIFbF",!0)),Alphabetic:()=>new _(E("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICC3CeeBQBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoBNBCCCBCCBCCJaBFDBeKBG3BBCGBPlDBCHBFHBFCBLCBDRRBuBBOkDBZgBBKBBFGGBWBDSBUYBIKBGXBCGBIJJBoBBLLBEGBHrCBCPBCCBFOBOSBCHBDBBDVBCGBCEEBCBEHBDBBDBBCJJFBBCEBNBBLFFBBBCFBFBBDVBCGBCBBCBBCBBFEBFBBDBBFIIBCBCSSBEBMCBCIBCCBCVBCGBCBBCEBEIBCCBCBBEQQBCBWDBFCBCHBDBBDVBCGBCBBCEBEHBDBBDBBKBBFBBCEBORRBCCBEBECBCDBEBBCCCBEEBEEBBBELBFEBECBCCBEHHpBMBCCBCWBCPBEHBCCBCCBJBBCCBCBBDDBdDBCHBCCBCWBCJBCEBEHBCCBCCBJBBGCBCDBOCBNMBCCBCoBBDHBCCBCCBCGGBCBIEBXFBCCBCRBEXBCIBCDDBFBJFBCCCBGBTBBO5BBGGBH0B0BBECBDBCXBCCCBRBCCBDEBCHHPDBhBgCgCBGBCjBBFSBFPBCjBBkC2BBCDDBDBR-BBLDBDlBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBEKBITBMUBNTBNMBCCBCBBNzBBDSBPFFkC4CBIqBBGlCBLeBCLBFIBYdBDEBMrBBFZB3BbBF+BBDTBzBYYBMMBBByBzBBCOBCHB0BpBBDDBLrBBCKBP2BBXCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBUhBBM1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBFSSBnBBuZzBB34BkHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBCfBwB2O2OBBBaIBIEBDEBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBGHBEwDBoBIBDmDBDxCBVUBCgBBZzBBNjCBCtBtBBEBECCBBBLgBBGiBBOcBEyBBCLBQRRBOBLEBC2BBKNBTWBEkCBCCCZCBDPBDDBMFBDFBDFBKGBCGBCqBBCNBH6DBWj9KBNWBFwBBloItLBDpDBnBGBNEBGLBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmC0BBsIcBEwBBwBfBOdBGqBBGdBDjBBFHBCEBrB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCDBCBBGHBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOnBBjBbBEGGBVB7HpBBCBBEBBRFBzBCBEcBLJJBUBrBRBvBUBcWBKlCBsBEBL4BBKOOBXBYyBBSDBJiBBEKKB+BBCDBKBBLCCkBRBChBBDHHBCB-BGBCCCBCBCOBCJBI4BBYDBCHBDBBDVBCGBCBBCEBEHBDBBDBBEHHGGBdJBCDDClBBCJBCDDCDBCBBECCtBhCBCCBCDBVCBfhCBDBBC5F5FB0BBDGBaFBjB+BBCEE8B1BBDoCoCBZBDNBWGB6F4BBoD-BBgBHBDDDBGBCBBCdBCBBDBBDDB+CHBDtBBDFBCCCBccBxBBDJBSnCBGTTBnCBoDHB5CgBBgBIBCsBBCGBCyByBBcBDVBCNBqCGBCBBCrBBECCBCCBBBCDDBZZBEBCBBCkBBCBBCDBCYYBqBBlIWBKQBCoBBECBwDwCwCB4cBnDuDBSjGBtyCgDBQvhBBSFBa68DBGmSB61GuBBy2B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBF4BBIQBhCBBCNNBFBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBFi7Fi7FBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCVBJBBhHGBCDBCBBCOBCkGB8BjCBEEE1lBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1TZBHZBHZB3zD-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Dash:()=>new _(E("tB9qB9qB0BiyDiyDmgBqgCqgCBEB+BoBoBQnMnMlgDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J",!1)),Emoji:()=>new _(E("jBHHGJBwDFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDrGrGhFBBNBBPDDBIBsCZBCBBYVVDIBWBBvFhBBDvDBDBBCCBDyCBDCBCmIBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDDBEJBECCBEEDJBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB",!1)),Emoji_Component:()=>new _(E("jBHHGJB0+H2G2Gsp3B3+8B3+8BBYB8PEBxtBDBtzhY-CB",!1)),Emoji_Modifier:()=>new _(E("7-8DE",!0)),Emoji_Modifier_Base:()=>new _(E("9wJ8G8GRDB4jzD9B9BBBBDDDBBB2DBBDKBWSBEFFBBBCCBICCZqGqGBFFWFFBvFvFBBBEEB0CRRBBBKMMgSDDJHBHKKBIBDCB5B+B+BBCCBCCSCBCMBmHCBrBIB",!1)),Emoji_Presentation:()=>new _(E("64IBBuGDBEDDqQBBWBBzBLBsBUUOJJBSSBGGBJJGWWIBBCFFDIIFBBdkBkBCFFBBBC+B+BBBBZPP8aBB0BFFvlxDrGrG-FDDBIBsCZBCZZVDDBDBCCBWBBvFgBBNIBClCBCVBNqBBFEBNQBEEEBlCBCCCB5FBD+BBODBCXBTbbBOO3C0CBxBlCBHEEBBBDDBEDBMBBIIBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB",!1)),Extended_Pictographic:()=>new _(E("pFFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDoBoBBCBlDLBQBBQPPBmBmBBIBxDBBNBBPDDBIBU3BBcOBLVVDIBCDBKWBH7FBDvDBDBBCCBDyCBDCBCDBG9HBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDQBECCBEBDMB7GlBBNDB5BHBLFBpBHBfBBNDBDNBKmBBNuBBCJBC4FB5CHBPxEBhI9fB",!1)),Hex_Digit:()=>new _(E("wBJIFbFq1-BJIFbF",!0)),Lowercase:()=>new _(E("hDZBwBLLFlBlBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDiBBIBBfEBhDsBsBCEEDDBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBCDB5XFBjkCIBC2D2DB+FBiC0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBB6DOORMBuDEEBEEcKFDBBJDBFiBiBBOBFsasaBYBn6BvBBCEEBGCFCCBCCBGBEiDCBIICFFNlBBCGG0oesBCUaCBBBmEMCBBBC8BCBIBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCWDBCCCBBB2ZqBBCNBHvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBkODDBBBCpBBCIBmoByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFBmI9BB1lChBB",!1)),Math:()=>new _(E("rBRRBBBgBeeCuBuBFmBmBgB5W5WBBBDbbBDDBBBwQCBuwGccBBBMEEOPPBCBWEBMEBiCMBFEEBFFBDBTFFDJBCDDBEBHEEBDDBCCBBBCFBENBClClCBWBCFBCBBFBBFfBCHHBPPBqIBJDBVBB7CffBZBCZZMGB+NBBNJBFFBFBBDBBEEBPCCDFBMHBGBB6BCCeDBKCBxK-BBhI-PBxBUBDFB9+zB4Z4ZBEBCjFjFRCBeCCeCCkEHHBCBitDBBhrwBwoBwoBBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBBhwFDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB-uCIB",!1)),Quotation_Mark:()=>new _(E("iBFFkEQQ96HHBaBBowDqOqOBCBOCBixzBDB+FFF7CBB",!1)),Terminal_Punctuation:()=>new _(E("hBLLCMMBEE-ZJJiQ6B6BpCPPCCB1FsBsBBJBCsHsHB3B3BBEBCHBgBmImIB1nB1nBBtFtFFFB4JBB2YHBmY9D9DBBBoCBB+ECBEoBoBBCBDBB7JBBjLDBjFBBLBBCCBeCB8FEB-BBBldYYBKKBBBwlDCBzJOOFLLCBBEBBtNBB8ndBBuICBkHEB-LBB3CBBgD4E4EBBB0ECBgERRB6H6HnxUDDB6B6BBBBCDBqFLLCMMBEEiCDD7hBxBxBnkBoGoG3JBB5EFBlCFB6CDB5dEBtBDB+FGBxDDBgECBiEBBHRRB5C5CBDBtDrJrJB2D2DBBBNBBnLDBEOBqDBB6HCBmQCC8HBB4CBBFBB-MCBuBmUmUBrCrCBspBspBBDB6vRBBmEiCiCBBBLqRqRBoJoJBnwTnwTovHDB",!1)),Uppercase:()=>new _(E("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBGbbBOBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBBvgCZBHZBHZB",!1)),White_Space:()=>new _(E("JEBTlDlDbgvFgvFgsCKBeBBGwBwBh9DAB",!1))})),q(Pr,"SCRIPTS",new Mc({Adlam:()=>new _(E("go6DrCFJFB",!0)),Ahom:()=>new _(E("g4lCaDOFW",!0)),Anatolian_Hieroglyphs:()=>new _(E("ggxCmS",!0)),Arabic:()=>new _(E("gwBEBCFBCNBCCBCfBCJBMZBCrDBChBBxCvBBxHhBBGqCBCcBxy8BtPBDvEBhBPBxDEBCmEBk7DeBkCFBJIBiBFBh43BDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB",!1)),Armenian:()=>new _(E("xpBlBDxBDCks9BE",!0)),Avestan:()=>new _(E("g4iC1BEG",!0)),Balinese:()=>new _(E("g4GsCCxB",!0)),Bamum:()=>new _(E("g1pB3CpowB4R",!0)),Bassa_Vah:()=>new _(E("w26CdDF",!0)),Batak:()=>new _(E("g+GzBJD",!0)),Bengali:()=>new _(E("gsCDBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYB",!1)),Beria_Erfe:()=>new _(E("g17CYDY",!0)),Bhaiksuki:()=>new _(E("ggnCICsBCNLc",!0)),Bopomofo:()=>new _(E("qXB6wLqBxDf",!0)),Brahmi:()=>new _(E("ggkCtCFjBKA",!0)),Braille:()=>new _(E("ggK-H",!0)),Buginese:()=>new _(E("gwGbDB",!0)),Buhid:()=>new _(E("g6FT",!0)),Canadian_Aboriginal:()=>new _(E("ggF-TxRlC7tgCP",!0)),Carian:()=>new _(E("g1gCwB",!0)),Caucasian_Albanian:()=>new _(E("wphCzBMA",!0)),Chakma:()=>new _(E("gokC0BCR",!0)),Cham:()=>new _(E("gwqB2BKNDJDD",!0)),Cherokee:()=>new _(E("g9E1CDFz7lBvC",!0)),Chorasmian:()=>new _(E("w9jCb",!0)),Common:()=>new _(E("AgCBbFBbuBBCOBCEBYgBgBiOmBBGEBDTB1DKKHCC+THHPEEhB9E9ElQiEiEB6mB6mB2MDBjJwvBwvBBBBoCBBsGBBCumBumBOIIBCBCFBCCBDmYmYBKBD2CBCKBEKBCOBShBB-BlBBCCBDFBCaBCQBqBCBF5UBXKBW-cBhIzTBDpEBhQ9CBzMUBCCCBXBQHBFDB8CBBE7C7CB0E0EBOBhBlBBKxBxBB+BBgBwCBwB5C5CBmFBhuG-BBhoWhBBnDCBmFJB1HhFhFsMPPBzuUzuUBxGxGBIBXiBBCSBCDB0ECCBeBbFBbKBLuBuBBhChCBFBCGBLEBjICBFsBBEIBxCMB0BsBBlHaBltuBDB96D8HBEzNBHWBQQBgDzDB9B1HBLmBBD9BBEQBJBBIdBF8BB2GTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBByjFjCBtC8BBjWrBBFjDBNOBDOBCOBCkBBLtFB5BZBCBBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBnghYffB+CB",!1)),Coptic:()=>new _(E("ifNxkKzDGG",!0)),Cuneiform:()=>new _(E("ggoC5cnDuDCEMjG",!0)),Cypriot:()=>new _(E("ggiCFBDCCBqBBCBBEDD",!1)),Cypro_Minoan:()=>new _(E("w8rCiD",!0)),Cyrillic:()=>new _(E("ggBkEBDoFBx6FKBhFtCtCojEfBhie-CBv8VBBhw4B9BBiBAB",!1)),Deseret:()=>new _(E("gghCvC",!0)),Devanagari:()=>new _(E("goCwCFODZh7nBfhwcJ",!0)),Dives_Akuru:()=>new _(E("gomCGBDDDBGBCBBCdBCBBDLBKJB",!1)),Dogra:()=>new _(E("ggmC7B",!0)),Duployan:()=>new _(E("ggvDqDGMEIIJDD",!0)),Egyptian_Hieroglyphs:()=>new _(E("ggsC1iBL68D",!0)),Elbasan:()=>new _(E("gohCnB",!0)),Elymaic:()=>new _(E("g-jCW",!0)),Ethiopic:()=>new _(E("gwEoCBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBnvGWBKGBCGBCGBCGBCGBCGBCGBCGBjpfFBDFBDFBKGBCGBylvCGBCDBCBBCOB",!1)),Garay:()=>new _(E("gqjClBEcJB",!0)),Georgian:()=>new _(E("glElBBCGGDqBBCDBx8CqBBDCBhiElBBCGG",!1)),Glagolitic:()=>new _(E("ggL-Ch9sDGCQDGCBCE",!0)),Gothic:()=>new _(E("w5gCa",!0)),Grantha:()=>new _(E("g4kCDBCHBDBBDVBCGBCBBCEBDIBDBBDCBDHHGGBDGBEEB",!1)),Greek:()=>new _(E("wbDBCCBDDBCFFCCCBBBCCCBSBC+BBPPBnpGEBzBEBFEB1ChKhKBUBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBoJ-xiB-xiB7uVuCBSgj0Bgj0BBkCB",!1)),Gujarati:()=>new _(E("h0CCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGB",!1)),Gunjala_Gondi:()=>new _(E("grnCFCBCkBCBCFIJ",!0)),Gurmukhi:()=>new _(E("hwCCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPB",!1)),Gurung_Khema:()=>new _(E("go4C5B",!0)),Han:()=>new _(E("g0LZBC4CBN1GBwBCCaIBPDBle-tGBhC-vUBhoWtLBDpDBpodBBNGBqgkB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Hangul:()=>new _(E("goE-HvxHBiI9CyDeiCei3dckUj9KNWFwBl9JeEFDFDFDC",!0)),Hanifi_Rohingya:()=>new _(E("gojCnBJJ",!0)),Hanunoo:()=>new _(E("g5FU",!0)),Hatran:()=>new _(E("gniCSCBGE",!0)),Hebrew:()=>new _(E("xsB2BBJaBFFBpp9BZBCEBCCCBCCBCCBIB",!1)),Hiragana:()=>new _(E("hiM1CBHCBi7-C+IBTeeBBBulQAB",!1)),Imperial_Aramaic:()=>new _(E("giiCVCI",!0)),Inherited:()=>new _(E("gYvDB2IBBlOKBbhXhXBCB8qEtBBDLBlPCBCMBCGBFHHEBBnG-BBtQBBjGgBB65DDBsDBBmrzBPBRNBwejHjH7iEl+uBl+uBBsBBDWBhRCBSHBDGBfDBz6rYvHB",!1)),Inscriptional_Pahlavi:()=>new _(E("g7iCSGH",!0)),Inscriptional_Parthian:()=>new _(E("g6iCVDH",!0)),Javanese:()=>new _(E("gsqBtCDJFB",!0)),Kaithi:()=>new _(E("gkkCiCLA",!0)),Kannada:()=>new _(E("gkDMCCCWCJCEDICCCDIBGCCDDJCC",!0)),Katakana:()=>new _(E("hlM5CBDCBxHPBxGuBBC3CBvgzBJBCsBBzisBDBCGBCBBCgJgJBBBzBPPBCB",!1)),Kawi:()=>new _(E("g4nCQCoBEc",!0)),Kayah_Li:()=>new _(E("goqBtBCA",!0)),Kharoshthi:()=>new _(E("gwiCDCBGHCCCcDCFJII",!0)),Khitan_Small_Script:()=>new _(E("k-7C84G84GB0OBqBAB",!1)),Khmer:()=>new _(E("g8F9CDJHJnPf",!0)),Khojki:()=>new _(E("gwkCRCuB",!0)),Khudawadi:()=>new _(E("w1kC6BGJ",!0)),Kirat_Rai:()=>new _(E("gq7C5B",!0)),Lao:()=>new _(E("h0DBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDB",!1)),Latin:()=>new _(E("hCZBHZBwBQQGWBCeBCgOBoBEB8wGlBBHwBBGDBGMBClCBiC-HByLOORMBuEBBHccSoBB42CfBj1elDBExCBVOBxZqBBCIBCDB38TGB7gBZBHZBmhCFBCpBBCIBm61BeBHFB",!1)),Lepcha:()=>new _(E("ggH3BEOEC",!0)),Limbu:()=>new _(E("goGeBCLBFLBFEEBKB",!1)),Linear_A:()=>new _(E("gwhC2JKVLH",!0)),Linear_B:()=>new _(E("gggCLCZCSCBCODNjB6D",!0)),Lisu:()=>new _(E("wmpBvBx1eA",!0)),Lycian:()=>new _(E("g0gCc",!0)),Lydian:()=>new _(E("gpiCZGA",!0)),Mahajani:()=>new _(E("wqkCmB",!0)),Makasar:()=>new _(E("g3nCY",!0)),Malayalam:()=>new _(E("goDMCCCyBCCCFFPDZ",!0)),Mandaic:()=>new _(E("giCbDA",!0)),Manichaean:()=>new _(E("g2iCmBFL",!0)),Marchen:()=>new _(E("wjnCfDVCN",!0)),Masaram_Gondi:()=>new _(E("gonCGBCBBCrBBECCBCCBHBJJB",!1)),Medefaidrin:()=>new _(E("gy7C6C",!0)),Meetei_Mayek:()=>new _(E("g3qBWqGtBDJ",!0)),Mende_Kikakui:()=>new _(E("gg6DkGDP",!0)),Meroitic_Cursive:()=>new _(E("gtiCXFTDtB",!0)),Meroitic_Hieroglyphs:()=>new _(E("gsiCf",!0)),Miao:()=>new _(E("g47CqCF4BIQ",!0)),Modi:()=>new _(E("gwlCkCMJ",!0)),Mongolian:()=>new _(E("ggGBBDCCBSBH4CBIqBB2t-BMB",!1)),Mro:()=>new _(E("gy6CeCJFB",!0)),Multani:()=>new _(E("g0kCGBCCCBCBCOBCKB",!1)),Myanmar:()=>new _(E("ggE-EhqmBeiDfxibT",!0)),Nabataean:()=>new _(E("gkiCeJI",!0)),Nag_Mundari:()=>new _(E("wm5DpB",!0)),Nandinagari:()=>new _(E("gtmCHDtBDK",!0)),New_Tai_Lue:()=>new _(E("gsGrBFZHKEB",!0)),Newa:()=>new _(E("gglC7CCE",!0)),Nko:()=>new _(E("g+B6BDC",!0)),Nushu:()=>new _(E("h-7CvsQvsQBqMB",!1)),Nyiakeng_Puachue_Hmong:()=>new _(E("go4DsBENDJFB",!0)),Ogham:()=>new _(E("g0Fc",!0)),Ol_Chiki:()=>new _(E("wiHvB",!0)),Ol_Onal:()=>new _(E("wu5DqBFA",!0)),Old_Hungarian:()=>new _(E("gkjCyBOyBIF",!0)),Old_Italic:()=>new _(E("g4gCjBKC",!0)),Old_North_Arabian:()=>new _(E("g0iCf",!0)),Old_Permic:()=>new _(E("w6gCqB",!0)),Old_Persian:()=>new _(E("g9gCjBFN",!0)),Old_Sogdian:()=>new _(E("g4jCnB",!0)),Old_South_Arabian:()=>new _(E("gziCf",!0)),Old_Turkic:()=>new _(E("ggjCoC",!0)),Old_Uyghur:()=>new _(E("w7jCZ",!0)),Oriya:()=>new _(E("h4CCCHDBDVCGCBCEDIDBDCICFBCEDR",!0)),Osage:()=>new _(E("wlhCjBFjB",!0)),Osmanya:()=>new _(E("gkhCdDJ",!0)),Pahawh_Hmong:()=>new _(E("g46ClCLJCGCUGS",!0)),Palmyrene:()=>new _(E("gjiCf",!0)),Pau_Cin_Hau:()=>new _(E("g2mC4B",!0)),Phags_Pa:()=>new _(E("giqB3B",!0)),Phoenician:()=>new _(E("goiCbEA",!0)),Psalter_Pahlavi:()=>new _(E("g8iCRIDNG",!0)),Rejang:()=>new _(E("wpqBjBMA",!0)),Runic:()=>new _(E("g1FqCEK",!0)),Samaritan:()=>new _(E("ggCtBDO",!0)),Saurashtra:()=>new _(E("gkqBlCJL",!0)),Sharada:()=>new _(E("gskC-ChsCH",!0)),Shavian:()=>new _(E("wihCvB",!0)),Siddham:()=>new _(E("gslC1BDlB",!0)),Sidetic:()=>new _(E("gqiCZ",!0)),SignWriting:()=>new _(E("gg2DrUQECO",!0)),Sinhala:()=>new _(E("hsDCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBt-gCTB",!1)),Sogdian:()=>new _(E("w5jCpB",!0)),Sora_Sompeng:()=>new _(E("wmkCYIJ",!0)),Soyombo:()=>new _(E("wymCyC",!0)),Sundanese:()=>new _(E("g8G-BhIH",!0)),Sunuwar:()=>new _(E("g+mChBPJ",!0)),Syloti_Nagri:()=>new _(E("ggqBsB",!0)),Syriac:()=>new _(E("g4BNC7BDCxIK",!0)),Tagalog:()=>new _(E("g4FVKA",!0)),Tagbanwa:()=>new _(E("g7FMCCCB",!0)),Tai_Le:()=>new _(E("wqGdDE",!0)),Tai_Tham:()=>new _(E("gxG+BCcDKHJHN",!0)),Tai_Viet:()=>new _(E("g0qBiCZE",!0)),Tai_Yo:()=>new _(E("g25DeCVJB",!0)),Takri:()=>new _(E("g0lC5BHJ",!0)),Tamil:()=>new _(E("i8CBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBm+kCxBBOAB",!1)),Tangsa:()=>new _(E("wz6CuCCJ",!0)),Tangut:()=>new _(E("g-7CgBgBB+3GBhQeBiDyDB",!1)),Telugu:()=>new _(E("ggDMCCCWCPDICCCDIBCCCBDDDJII",!0)),Thaana:()=>new _(E("g8BxB",!0)),Thai:()=>new _(E("hwD5BGb",!0)),Tibetan:()=>new _(E("g4DnCCjBFmBCjBCOCGFB",!0)),Tifinagh:()=>new _(E("wpL3BIBPA",!0)),Tirhuta:()=>new _(E("gklCnCJJ",!0)),Todhri:()=>new _(E("guhCzB",!0)),Tolong_Siki:()=>new _(E("wtnCrBFJ",!0)),Toto:()=>new _(E("w04De",!0)),Tulu_Tigalari:()=>new _(E("g8kCJBCDDClBBCJBCDDCDBCJBCBBJBB",!1)),Ugaritic:()=>new _(E("g8gCdCA",!0)),Unknown:()=>new _(E("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-FB",!1)),Vai:()=>new _(E("gopBrJ",!0)),Vithkuqi:()=>new _(E("wrhCKCOCGCBCKCOCGCB",!0)),Wancho:()=>new _(E("g24D5BGA",!0)),Warang_Citi:()=>new _(E("glmCyCNA",!0)),Yezidi:()=>new _(E("g0jCpBCCDB",!0)),Yi:()=>new _(E("ggoBskBE2B",!0)),Zanabazar_Square:()=>new _(E("gwmCnC",!0))})),q(Pr,"FOLD_CATEGORIES",new Mc({L:()=>new _(E("laA",!0)),LC:()=>new _(E("laA",!0)),Ll:()=>new _(E("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGC3HrBrBCEEJHHCCBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHxC9zC9zCBuBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB",!1)),Lt:()=>new _(E("kOCCBCCBCClBCCtsHHBJHBJHBMQQwBAB",!1)),Lu:()=>new _(E("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpL2B2Bs1CvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB",!1)),M:()=>new _(E("5cgBgBlgHAB",!1)),Mn:()=>new _(E("5cgBgBlgHAB",!1)),Emoji:()=>new _(E("8mJA",!0)),Extended_Pictographic:()=>new _(E("8mJA",!0)),Lowercase:()=>new _(E("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHuBPBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB",!1)),Math:()=>new _(E("ycGDCHHFMMDDDCHHFAB",!1)),Uppercase:()=>new _(E("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpLiBiBBOBFsasaBYBn6BvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB",!1))})),q(Pr,"FOLD_SCRIPT",new Mc({Common:()=>new _(E("8cgBgB",!1)),Greek:()=>new _(E("1FwUwU",!1)),Inherited:()=>new _(E("5cgBgBlgHAB",!1))})),Pr),Ae,ee=(Ae=class{static isUnsearchable(e){return e===Ae.RUNE_ERROR||e>=Ae.MIN_HIGH_SURROGATE&&e<=Ae.MAX_LOW_SURROGATE}static is32(e,t){let n=0,s=e.length;for(;n<s;){const i=n+Math.floor((s-n)/2),o=e.getLo(i),a=e.getHi(i);if(o<=t&&t<=a){const c=e.getStride(i);return(t-o)%c===0}t<o?s=i:n=i+1}return!1}static is(e,t){if(t<=Ae.MAX_LATIN1){for(let n=0;n<e.length;n++){if(t>e.getHi(n))continue;const s=e.getLo(n);if(t<s)return!1;const i=e.getStride(n);return(t-s)%i===0}return!1}return e.length>0&&t>=e.getLo(0)&&Ae.is32(e,t)}static isPrint(e){return e<=Ae.MAX_LATIN1?e>=32&&e<Ae.MAX_ASCII||e>=161&&e!==173:Ae.is(Wt.Print,e)}static simpleFold(e){if(Wt.CASE_ORBIT.has(e))return Wt.CASE_ORBIT.get(e);if(e<=Ae.MAX_ASCII){const t=M.toLowerCase(e);return t!==e?t:M.toUpperCase(e)}return e}static equalsIgnoreCase(e,t){if(e===t)return!0;if(e<0||t<0)return!1;if(e<=Ae.MAX_ASCII&&t<=Ae.MAX_ASCII)return 65<=e&&e<=90&&(e|=32),65<=t&&t<=90&&(t|=32),e===t;for(let n=Ae.simpleFold(e);n!==e;n=Ae.simpleFold(n))if(n===t)return!0;return!1}},q(Ae,"MAX_RUNE",1114111),q(Ae,"RUNE_ERROR",65533),q(Ae,"MAX_ASCII",127),q(Ae,"MAX_LATIN1",255),q(Ae,"MAX_BMP",65535),q(Ae,"MIN_FOLD",65),q(Ae,"MAX_FOLD",125251),q(Ae,"MIN_HIGH_SURROGATE",55296),q(Ae,"MAX_HIGH_SURROGATE",56319),q(Ae,"MIN_LOW_SURROGATE",56320),q(Ae,"MAX_LOW_SURROGATE",57343),q(Ae,"MIN_SUPPLEMENTARY_CODE_POINT",65536),Ae),ec=class extends Error{constructor(r){super(r),this.name="RE2JSException"}},xe=class extends ec{constructor(r,e=null){let t=`error parsing regexp: ${r}`;e&&(t+=`: \`${e}\``),super(t),this.name="RE2JSSyntaxException",this.message=t,this.error=r,this.input=e}getDescription(){return this.error}getPattern(){return this.input}},FB=class extends ec{constructor(r){super(r),this.name="RE2JSCompileException"}},Vt=class extends ec{constructor(r){super(r),this.name="RE2JSGroupException"}},ER=class extends ec{constructor(r){super(r),this.name="RE2JSFlagsException"}},Au=class extends ec{constructor(r){super(r),this.name="RE2JSInternalException"}};const md=256,bE=new Uint8Array(md);for(let r=0;r<md;r++)bE[r]=97<=r&&r<=122||65<=r&&r<=90||48<=r&&r<=57||r===95?1:0;let xB=null,LB=null;var Te,Y=(Te=class{static emptyInts(){return[]}static isString(e){return typeof e=="string"||Object.prototype.toString.call(e)==="[object String]"}static typeName(e){return e===null||typeof e!="object"&&typeof e!="function"?e===null?"null":typeof e:Object.prototype.toString.call(e).slice(8,-1)}static checkPattern(e){if(!Te.isString(e))throw new TypeError(`The pattern must be a string, not ${Te.typeName(e)} (RE2JS.translateRegExp() converts a RegExp)`)}static checkInput(e){if(!Te.isString(e)&&!Te.isByteArray(e))throw new TypeError(`The input must be a string or a byte array (Uint8Array or number[]), not ${Te.typeName(e)}`)}static checkFlags(e){if(!Number.isInteger(e)||(e&-544)!==0)throw new ER("Flags should only be a combination of MULTILINE, DOTALL, CASE_INSENSITIVE, DISABLE_UNICODE_GROUPS, LONGEST_MATCH, LOOKBEHINDS")}static isByteArray(e){return Array.isArray(e)||Object.prototype.toString.call(e)==="[object Uint8Array]"}static isalnum(e){return M.CODES[0]<=e&&e<=M.CODES[9]||M.CODES.a<=e&&e<=M.CODES.z||M.CODES.A<=e&&e<=M.CODES.Z}static unhex(e){return M.CODES[0]<=e&&e<=M.CODES[9]?e-M.CODES[0]:M.CODES.a<=e&&e<=M.CODES.f?e-M.CODES.a+10:M.CODES.A<=e&&e<=M.CODES.F?e-M.CODES.A+10:-1}static escapeRune(e){let t="";if(ee.isPrint(e))Te.METACHARACTERS.indexOf(String.fromCodePoint(e))>=0&&(t+="\\"),t+=String.fromCodePoint(e);else switch(e){case M.CODES['"']:t+='\\"';break;case M.CODES["\\"]:t+="\\\\";break;case M.CODES["	"]:t+="\\t";break;case M.CODES[`
`]:t+="\\n";break;case M.CODES["\r"]:t+="\\r";break;case M.CODES["\b"]:t+="\\b";break;case M.CODES["\f"]:t+="\\f";break;default:{let n=e.toString(16);e<256?(t+="\\x",n.length===1&&(t+="0"),t+=n):t+=`\\x{${n}}`;break}}return t}static stringToRunes(e){const t=String(e),n=[];let s=0;for(;s<t.length;){const i=t.codePointAt(s);n.push(i),s+=i>ee.MAX_BMP?2:1}return new Int32Array(n)}static runeToString(e){return String.fromCodePoint(e)}static isWordRune(e){return e<md?bE[e]===1:!1}static emptyOpContext(e,t){let n=0;return e<0&&(n|=Te.EMPTY_BEGIN_TEXT|Te.EMPTY_BEGIN_LINE),e===10&&(n|=Te.EMPTY_BEGIN_LINE),t<0&&(n|=Te.EMPTY_END_TEXT|Te.EMPTY_END_LINE),t===10&&(n|=Te.EMPTY_END_LINE),Te.isWordRune(e)!==Te.isWordRune(t)?n|=Te.EMPTY_WORD_BOUNDARY:n|=Te.EMPTY_NO_WORD_BOUNDARY,n}static quoteMeta(e){return e.split("").map(t=>Te.METACHARACTERS.indexOf(t)>=0?`\\${t}`:t).join("")}static charCount(e){return e>ee.MAX_BMP?2:1}static toArray(e){const t=e.length,n=new Array(t);for(let s=0;s<t;s++)n[s]=e[s];return n}static stringToUtf8ByteArray(e){if(globalThis.TextEncoder)return xB||(xB=new TextEncoder),xB.encode(e);{let t=[],n=0;for(let s=0;s<e.length;s++){let i=e.charCodeAt(s);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)===ee.MIN_HIGH_SURROGATE&&s+1<e.length&&(e.charCodeAt(s+1)&64512)===ee.MIN_LOW_SURROGATE?(i=ee.MIN_SUPPLEMENTARY_CODE_POINT+((i&1023)<<10)+(e.charCodeAt(++s)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t}}static utf8ByteArrayToString(e){if(globalThis.TextDecoder){LB||(LB=new TextDecoder("utf-8"));const t=e instanceof Uint8Array?e:new Uint8Array(e);return LB.decode(t)}else{let t=[],n=0,s=0;for(;n<e.length;){let i=e[n++];if(i<128)t[s++]=String.fromCharCode(i);else if(i>191&&i<224){let o=e[n++];t[s++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){let o=e[n++],a=e[n++],c=e[n++],l=((i&7)<<18|(o&63)<<12|(a&63)<<6|c&63)-ee.MIN_SUPPLEMENTARY_CODE_POINT;t[s++]=String.fromCharCode(ee.MIN_HIGH_SURROGATE+(l>>10)),t[s++]=String.fromCharCode(ee.MIN_LOW_SURROGATE+(l&1023))}else{let o=e[n++],a=e[n++];t[s++]=String.fromCharCode((i&15)<<12|(o&63)<<6|a&63)}}return t.join("")}}},q(Te,"METACHARACTERS","\\.+*?()|[]{}^$"),q(Te,"EMPTY_BEGIN_LINE",1),q(Te,"EMPTY_END_LINE",2),q(Te,"EMPTY_BEGIN_TEXT",4),q(Te,"EMPTY_END_TEXT",8),q(Te,"EMPTY_WORD_BOUNDARY",16),q(Te,"EMPTY_NO_WORD_BOUNDARY",32),q(Te,"EMPTY_ALL",-1),Te);const vE=(r=[],e=0)=>{const t=Object.create(null);for(let n=0;n<r.length;n++){const s=r[n],i=e+n;t[s]=i,t[i]=s}return Object.freeze(t)};var Fr,ks=(Fr=class{getEncoding(){throw Error("not implemented")}asCharSequence(){throw Error("not implemented")}asBytes(){throw Error("not implemented")}length(){throw Error("not implemented")}isUTF8Encoding(){return this.getEncoding()===Fr.Encoding.UTF_8}isUTF16Encoding(){return this.getEncoding()===Fr.Encoding.UTF_16}},q(Fr,"Encoding",vE(["UTF_16","UTF_8"])),Fr),xC=class extends ks{constructor(r=null){super(),this.bytes=r}getEncoding(){return ks.Encoding.UTF_8}asCharSequence(){return Y.utf8ByteArrayToString(this.bytes)}asBytes(){return this.bytes}length(){return this.bytes.length}},IR=class extends ks{constructor(r=null){super(),this.charSequence=r}getEncoding(){return ks.Encoding.UTF_16}asCharSequence(){return this.charSequence}asBytes(){return Y.stringToUtf8ByteArray(this.charSequence.toString())}length(){return this.charSequence.length}},As=class{static utf16(r){return Y.checkInput(r),new IR(r)}static utf8(r){return Y.isByteArray(r)?new xC(r):new xC(Y.stringToUtf8ByteArray(r))}},Ot=class{static EOF(){return-8}constructor(){this.start=0,this.end=0}canCheckPrefix(){return!0}endPos(){return this.end-this.start}hasString(){return!1}hasAnyString(){return!1}prefixLength(){return 0}},Bn,yR=(Bn=class extends Ot{constructor(e,t=0,n=e.length){super(),this.bytes=e,this.start=t,this.end=n}hasString(e,t){const n=e.bytes;if(n.length===0)return!0;const s=this.indexOf(this.bytes,n,this.start+t);return s!==-1&&s<=this.end-n.length}hasAnyString(e,t){return e.automaton8().searchUTF8(this.bytes,this.start+t,this.end)}step(e){if(e+=this.start,e>=this.end)return Ot.EOF();const t=this.bytes[e]&255;if(t<128)return t<<3|1;let n,s,i=128,o=191;if(t>=194&&t<=223)n=2,s=t&31;else if(t>=224&&t<=239)n=3,s=t&15,t===224?i=160:t===237&&(o=159);else if(t>=240&&t<=244)n=4,s=t&7,t===240?i=144:t===244&&(o=143);else return Bn.RUNE_ERROR_STEP;if(e+n>this.end)return Bn.RUNE_ERROR_STEP;const a=this.bytes[e+1]&255;if(a<i||a>o)return Bn.RUNE_ERROR_STEP;if(s=s<<6|a&63,n>2){const c=this.bytes[e+2]&255;if((c&192)!==128)return Bn.RUNE_ERROR_STEP;if(s=s<<6|c&63,n>3){const l=this.bytes[e+3]&255;if((l&192)!==128)return Bn.RUNE_ERROR_STEP;s=s<<6|l&63}}return s<<3|n}index(e,t){t+=this.start;const n=this.indexOf(this.bytes,e.prefixUTF8,t);return n<0?n:n-t}context(e){e+=this.start;let t=-1;if(e>this.start&&e<=this.end){let s=e-1;if(t=this.bytes[s--],t>=128){let i=e-4;for(i<this.start&&(i=this.start);s>=i&&(this.bytes[s]&192)===128;)s--;s<this.start&&(s=this.start);const o=this.step(s-this.start);t=s+(o&7)===e?o>>3:ee.RUNE_ERROR}}const n=e<this.end?this.step(e-this.start)>>3:-1;return Y.emptyOpContext(t,n)}indexOf(e,t,n=0){let s=t.length;if(s===0)return n<=this.end?n:-1;const i=t[0];let o=this.end-s;const a=typeof e.indexOf=="function";let c=n;for(;c<=o;){if(a){if(c=e.indexOf(i,c),c===-1||c>o)return-1}else{for(;c<=o&&e[c]!==i;)c++;if(c>o)return-1}let l=!0;for(let B=1;B<s;B++)if(e[c+B]!==t[B]){l=!1;break}if(l)return c;c++}return-1}prefixLength(e){return e.prefixUTF8.length}},q(Bn,"RUNE_ERROR_STEP",ee.RUNE_ERROR<<3|1),Bn),wR=class extends Ot{constructor(r,e=0,t=r.length){super(),this.charSequence=r,this.start=e,this.end=t}hasString(r,e){const t=this.charSequence.indexOf(r.str,this.start+e);return t!==-1&&t<=this.end-r.str.length}hasAnyString(r,e){return r.automaton16().searchUTF16(this.charSequence,this.start+e,this.end)}step(r){if(r+=this.start,r>=this.end)return Ot.EOF();const e=this.charSequence.charCodeAt(r);if(e<ee.MIN_HIGH_SURROGATE||e>ee.MAX_HIGH_SURROGATE||r+1>=this.end)return e<<3|1;const t=this.charSequence.charCodeAt(r+1);return t>=ee.MIN_LOW_SURROGATE&&t<=ee.MAX_LOW_SURROGATE?(e-ee.MIN_HIGH_SURROGATE)*1024+(t-ee.MIN_LOW_SURROGATE)+ee.MIN_SUPPLEMENTARY_CODE_POINT<<3|2:e<<3|1}index(r,e){e+=this.start;const t=this.charSequence.indexOf(r.prefix,e);return t<0||t>this.end-r.prefix.length?-1:t-e}context(r){r+=this.start;const e=r>this.start&&r<=this.end?this.charSequence.charCodeAt(r-1):-1,t=r<this.end?this.charSequence.charCodeAt(r):-1;return Y.emptyOpContext(e,t)}prefixLength(r){return r.prefix.length}},ke=class{static fromUTF8(r,e=0,t=r.length){return new yR(r,e,t)}static fromUTF16(r,e=0,t=void 0){return Y.checkInput(r),new wR(r,e,t??r.length)}},Ps,LC=(Ps=class{static quoteReplacement(e,t=!1){return t?e.indexOf("\\")<0&&e.indexOf("$")<0?e:e.split("").map(n=>{const s=n.codePointAt(0);return s===M.CODES["\\"]||s===M.CODES.$?`\\${n}`:n}).join(""):e.indexOf("$")<0?e:e.split("").map(n=>n.codePointAt(0)===M.CODES.$?"$$":n).join("")}constructor(e,t){if(e===null)throw new Error("pattern is null");this.patternInput=e;const n=this.patternInput.re2();this.patternGroupCount=n.numberOfCapturingGroups(),this.groups=[],this.namedGroups=n.namedGroups,this.hasNamedGroups=Object.keys(this.namedGroups).length>0,this.numberOfInstructions=n.numberOfInstructions(),this.lookbehindState=null,t instanceof ks?this.resetMatcherInput(t):Y.isByteArray(t)?this.resetMatcherInput(As.utf8(t)):this.resetMatcherInput(As.utf16(t))}pattern(){return this.patternInput}reset(){return this.matcherInputLength=this.matcherInput.length(),this.appendPos=0,this.hasMatch=!1,this.hasGroups=!1,this.anchorFlag=0,this}resetMatcherInput(e){if(e===null)throw new Error("input is null");return e instanceof ks||(Y.isByteArray(e)?e=As.utf8(e):e=As.utf16(e)),this.matcherInput=e,this.lookbehindState!==null?this.lookbehindState.reset():this.lookbehindState=this.patternInput.re2().createLookbehindState(),this.reset(),this}start(e=0){if(typeof e=="string"){const t=this.namedGroups[e];if(!Number.isFinite(t))throw new Vt(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e]}end(e=0){if(typeof e=="string"){const t=this.namedGroups[e];if(!Number.isFinite(t))throw new Vt(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e+1]}programSize(){return this.numberOfInstructions}group(e=0){if(typeof e=="string"){const s=this.namedGroups[e];if(!Number.isFinite(s))throw new Vt(`group '${e}' not found`);e=s}const t=this.start(e),n=this.end(e);return t<0&&n<0?null:this.substring(t,n)}getNamedGroups(){if(!this.hasMatch)throw new Vt("perhaps no match attempted");const e=Object.create(null);for(const t of Object.keys(this.namedGroups))e[t]=this.group(t);return e}groupCount(){return this.patternGroupCount}loadGroup(e){if(!Number.isInteger(e)||e<0||e>this.patternGroupCount)throw new Vt(`Group index out of bounds: ${e}`);if(!this.hasMatch)throw new Vt("perhaps no match attempted");if(e===0||this.hasGroups)return;const t=this.matcherInputLength,n=this.patternInput.re2().matchMachineInput(this.matcherInput,this.groups[0],t,this.anchorFlag,1+this.patternGroupCount,this.lookbehindState);if(!n[0])throw new Vt("inconsistency in matching group data");this.groups=n[1],this.hasGroups=!0}matches(){return this.genMatch(0,H.ANCHOR_BOTH)}lookingAt(){return this.genMatch(0,H.ANCHOR_START)}find(e=null){if(e!==null){if(!Number.isInteger(e)||e<0||e>this.matcherInputLength)throw new Vt(`start index out of bounds: ${e}`);return this.reset(),this.genMatch(e,0)}if(e=0,this.hasMatch&&(e=this.groups[1],this.groups[0]===this.groups[1])){const t=(this.matcherInput.isUTF16Encoding()?ke.fromUTF16(this.matcherInput.asCharSequence(),0,this.matcherInputLength):ke.fromUTF8(this.matcherInput.asBytes(),0,this.matcherInputLength)).step(e);t<0?e++:e+=t&7}return this.genMatch(e,H.UNANCHORED)}genMatch(e,t){const n=this.patternInput.re2().matchMachineInput(this.matcherInput,e,this.matcherInputLength,t,1,this.lookbehindState);return n[0]?(this.groups=n[1],this.hasMatch=!0,this.hasGroups=this.patternGroupCount===0,this.anchorFlag=t,!0):(this.hasMatch=!1,!1)}substring(e,t){return this.matcherInput.isUTF8Encoding()?Y.utf8ByteArrayToString(this.matcherInput.asBytes().slice(e,t)):this.matcherInput.asCharSequence().substring(e,t).toString()}inputLength(){return this.matcherInputLength}appendReplacement(e,t=!1){let n="";const s=this.start(),i=this.end();return this.appendPos<s&&(n+=this.substring(this.appendPos,s)),this.appendPos=i,n+=t?this.appendReplacementInternalJava(e):this.appendReplacementInternalJs(e),n}appendReplacementInternalJava(e){let t="",n=0;const s=e.length;let i=0;for(;i<s;){const o=e.codePointAt(i);if(o===M.CODES["\\"]){if(n<i&&(t+=e.substring(n,i)),i++,i>=s)throw new Vt("character to be escaped is missing");n=i,i++;continue}if(o===M.CODES.$){if(n<i&&(t+=e.substring(n,i)),i+1>=s)throw new Vt("Illegal group reference: group index is missing");const a=e.codePointAt(i+1);if(M.CODES[0]<=a&&a<=M.CODES[9]){let c=a-M.CODES[0],l=i+2;for(;l<s;l++){const h=e.codePointAt(l);if(h<M.CODES[0]||h>M.CODES[9]||c*10+h-M.CODES[0]>this.patternGroupCount)break;c=c*10+h-M.CODES[0]}if(c>this.patternGroupCount)throw new Vt(`n > number of groups: ${c}`);const B=this.group(c);B!==null&&(t+=B),i=l,n=i}else if(a===M.CODES["{"]){let c=i+2;for(;c<s&&e.codePointAt(c)!==M.CODES["}"];)c++;if(c>=s)throw new Vt("named capture group is missing trailing '}'");const l=e.substring(i+2,c),B=this.group(l);B!==null&&(t+=B),i=c+1,n=i}else throw new Vt("Illegal group reference");continue}i++}return n<s&&(t+=e.substring(n,s)),t}appendReplacementInternalJs(e){const t=o=>o>=48&&o<=57,n=this.patternGroupCount;let s="",i=0;for(;i<e.length;){const o=e.indexOf("$",i);if(o<0)break;s+=e.substring(i,o),i=o;const a=e.charCodeAt(i+1);if(a===M.CODES.$)s+="$",i+=2;else if(a===M.CODES["&"])s+=this.group(0),i+=2;else if(a===M.CODES["`"])s+=this.substring(0,this.start(0)),i+=2;else if(a===M.CODES["'"])s+=this.substring(this.end(0),this.matcherInputLength),i+=2;else if(t(a)){let c=1,l=a-48;const B=e.charCodeAt(i+2);if(t(B)&&l*10+B-48<=n&&(c=2,l=l*10+B-48),l>=1&&l<=n){const h=this.group(l);h!==null&&(s+=h)}else s+=e.substring(i,i+1+c);i+=1+c}else if(a===M.CODES["<"]&&this.hasNamedGroups){const c=e.indexOf(">",i+2);if(c<0)s+="$<",i+=2;else{const l=e.substring(i+2,c);if(Object.hasOwn(this.namedGroups,l)){const B=this.group(l);B!==null&&(s+=B)}i=c+1}}else s+="$",i+=1}return s+e.substring(i)}appendTail(){return this.substring(this.appendPos,this.matcherInputLength)}replaceAll(e,t=!1){return this.replace(e,!0,t)}replaceFirst(e,t=!1){return this.replace(e,!1,t)}replace(e,t=!0,n=!1){let s="";this.reset();const i=typeof e=="function";let o=null;if(i){if(this.groupCount()>=Ps.MAX_REPLACER_ARGS)throw new Vt("Too many capture groups to safely invoke replacer function");o=this.matcherInput.isUTF8Encoding()?this.matcherInput.asBytes():this.matcherInput.asCharSequence()}for(;this.find()&&(s+=i?this.appendReplacementFunc(e,o):this.appendReplacement(e,n),!!t););return s+=this.appendTail(),s}appendReplacementFunc(e,t){let n="";const s=this.start(),i=this.end();this.appendPos<s&&(n+=this.substring(this.appendPos,s)),this.appendPos=i;const o=this.matchArray();return o.push(s,t),this.hasNamedGroups&&o.push(this.namedGroupsObject()),n+=String(e(...o)),n}matchArray(){const e=[this.group(0)];for(let t=1;t<=this.patternGroupCount;t++){const n=this.group(t);e.push(n===null?void 0:n)}return e}namedGroupsObject(){if(!this.hasNamedGroups)return;const e=this.getNamedGroups();for(const t in e)e[t]===null&&(e[t]=void 0);return e}},q(Ps,"MAX_REPLACER_ARGS",65535),Ps),Ee,L=(Ee=class{static isRuneOp(e){return Ee.RUNE<=e&&e<=Ee.RUNE_ANY_NOT_NL}static escapeRunes(e){let t='"';for(let n of e)t+=Y.escapeRune(n);return t+='"',t}constructor(e){this.op=e,this.out=0,this.arg=0,this.runes=new Int32Array(0),this.next=null}matchRune(e){if(this.runes.length===1){const o=this.runes[0];return(this.arg&H.FOLD_CASE)!==0?ee.equalsIgnoreCase(o,e):e===o}const t=this.runes.length;if(t===0)return!1;if(t===2||t===4||t===6||t===8){for(let o=0;o<t;o+=2){if(e<this.runes[o])return!1;if(e<=this.runes[o+1])return!0}return!1}let n=0,s=t>>1;for(;s>1;){const o=s>>1;n+=this.runes[n+o<<1]<=e?o:0,s-=o}n+=this.runes[n<<1]<=e?1:0;const i=n-1;return i>=0&&e<=this.runes[i<<1|1]}matchRunePos(e){if(this.runes.length===1){const o=this.runes[0];return(this.arg&H.FOLD_CASE)!==0?ee.equalsIgnoreCase(o,e)?0:-1:e===o?0:-1}const t=this.runes.length;if(t===0)return-1;if(t===2||t===4||t===6||t===8){for(let o=0;o<t;o+=2){if(e<this.runes[o])return-1;if(e<=this.runes[o+1])return Math.floor(o/2)}return-1}let n=0,s=t>>1;for(;s>1;){const o=s>>1;n+=this.runes[n+o<<1]<=e?o:0,s-=o}n+=this.runes[n<<1]<=e?1:0;const i=n-1;return i>=0&&e<=this.runes[i<<1|1]?i:-1}toString(){switch(this.op){case Ee.ALT:return`alt -> ${this.out}, ${this.arg}`;case Ee.ALT_MATCH:return`altmatch -> ${this.out}, ${this.arg}`;case Ee.CAPTURE:return`cap ${this.arg} -> ${this.out}`;case Ee.EMPTY_WIDTH:return`empty ${this.arg} -> ${this.out}`;case Ee.MATCH:return`match${this.arg!==0?` ${this.arg}`:""}`;case Ee.FAIL:return"fail";case Ee.NOP:return`nop -> ${this.out}`;case Ee.LB_WRITE:return`lbwrite ${this.arg} -> ${this.out}`;case Ee.LB_CHECK:return`lbcheck ${this.arg} -> ${this.out}`;case Ee.RUNE:return this.runes===null?"rune <null>":["rune ",Ee.escapeRunes(this.runes),(this.arg&H.FOLD_CASE)!==0?"/i":""," -> ",this.out].join("");case Ee.RUNE1:return`rune1 ${Ee.escapeRunes(this.runes)} -> ${this.out}`;case Ee.RUNE_ANY:return`any -> ${this.out}`;case Ee.RUNE_ANY_NOT_NL:return`anynotnl -> ${this.out}`;default:throw new Error("unhandled case in Inst.toString")}}},q(Ee,"ALT",1),q(Ee,"ALT_MATCH",2),q(Ee,"CAPTURE",3),q(Ee,"EMPTY_WIDTH",4),q(Ee,"FAIL",5),q(Ee,"MATCH",6),q(Ee,"NOP",7),q(Ee,"RUNE",8),q(Ee,"RUNE1",9),q(Ee,"RUNE_ANY",10),q(Ee,"RUNE_ANY_NOT_NL",11),q(Ee,"LB_WRITE",12),q(Ee,"LB_CHECK",13),Ee),Ss,VC=(Ss=class{constructor(e){this.sparse=new Int32Array(e),this.densePcs=new Int32Array(e),this.denseCaps=null,this.size=0,this.ncap=0,this.mainThreads=0}init(e){this.ncap=e;const t=Math.min(this.densePcs.length,Ss.INITIAL_THREADS)*e;(!this.denseCaps||this.denseCaps.length<t)&&(this.denseCaps=new Int32Array(t))}growCaps(e){const t=this.densePcs.length*this.ncap,n=new Int32Array(Math.min(t,Math.max(e,2*this.denseCaps.length)));n.set(this.denseCaps),this.denseCaps=n}contains(e){const t=this.sparse[e];return t<this.size&&this.densePcs[t]===e}isEmpty(){return this.size===0}add(e){const t=this.size++;return this.sparse[e]=t,this.densePcs[t]=e,t}clear(){this.size=0,this.mainThreads=0}toString(){let e="{";for(let t=0;t<this.size;t++)t!==0&&(e+=", "),e+=this.densePcs[t];return e+="}",e}},q(Ss,"INITIAL_THREADS",32),Ss),DR=class{constructor(r){this.pos=-1,this.pcs=new Int32Array(r.numInst()),this.size=0,this.lbTable=new Int32Array(r.numLb+1)}reset(){this.pos=-1,this.size=0}},TR=class RE{static fromRE2(e){const t=new RE;return t.prog=e.prog,t.re2=e,t.q0=new VC(t.prog.numInst()),t.q1=new VC(t.prog.numInst()),t.addStack=new Int32Array(2*(t.prog.numInst()+1)),t.matched=!1,t.matchcap=new Int32Array(t.prog.numCap<2?2:t.prog.numCap),t.ncap=0,t}constructor(){this.prog=null,this.re2=null,this.q0=null,this.q1=null,this.addStack=null,this.matched=!1,this.matchcap=null,this.ncap=0,this.lbTable=null}init(e){this.ncap=e,e>this.matchcap.length?this.matchcap=new Int32Array(e).fill(-1):this.matchcap.fill(-1),this.q0.init(e),this.q1.init(e),this.prog.numLb>0&&((!this.lbTable||this.lbTable.length<this.prog.numLb+1)&&(this.lbTable=new Int32Array(this.prog.numLb+1)),this.lbTable.fill(-1))}submatches(){return this.ncap===0?Y.emptyInts():Y.toArray(this.matchcap.subarray(0,this.ncap))}match(e,t,n,s=null){const i=this.re2.cond;if(i===Y.EMPTY_ALL||(n===H.ANCHOR_START||n===H.ANCHOR_BOTH)&&t!==0)return!1;this.matched=!1,this.matchcap.fill(-1);const o=this.prog.numLb>0,a=t;let c=t,l=!1;o&&(s!==null&&s.pos>=0&&s.pos<=t?(c=s.pos,l=!0):c=0);let B=o&&s!==null,h=this.q0,p=this.q1,C=e.step(c),m=C>>3,D=C&7,N=-1,G=0;C!==Ot.EOF()&&(C=e.step(c+D),N=C>>3,G=C&7);let J;for(c===0?J=Y.emptyOpContext(-1,m):J=e.context(c),o&&(l?this.restoreLookbehinds(s,h,J):this.spawnLookbehinds(h,c,J));;){if(h.mainThreads===0){if((i&Y.EMPTY_BEGIN_TEXT)!==0&&c!==0||(n===H.ANCHOR_START||n===H.ANCHOR_BOTH)&&c!==0||this.matched)break;if(this.prog.numLb===0&&h.isEmpty()&&this.re2.prefix.length!==0&&N!==this.re2.prefixRune&&e.canCheckPrefix()){const de=e.index(this.re2,c);if(de<0)break;c+=de,C=e.step(c),m=C>>3,D=C&7,C=e.step(c+D),N=C>>3,G=C&7,J=e.context(c)}}c>=a&&(B&&(this.saveLookbehinds(s,h,c),B=!1),!this.matched&&(c===0||n===H.UNANCHORED)&&(this.ncap>0&&(this.matchcap[0]=c),this.add(h,this.prog.start,c,this.matchcap,0,J)));const te=c+D;if(J=e.context(te),this.step(h,p,c,te,m,J,n,c===e.endPos()),D===0||this.ncap===0&&this.matched)break;c+=D,m=N,D=G,m!==-1&&(C=e.step(c+D),N=C>>3,G=C&7);const he=h;h=p,p=he}return h.clear(),p.clear(),this.matched}matchSet(e,t,n){const s=this.re2.cond;if(s===Y.EMPTY_ALL)return[];if((n===H.ANCHOR_START||n===H.ANCHOR_BOTH)&&t!==0)return[];let i=this.prog.numLb>0?0:t,o=t,a=this.q0,c=this.q1,l=e.step(i),B=l>>3,h=l&7,p=-1,C=0;l!==Ot.EOF()&&(l=e.step(i+h),p=l>>3,C=l&7);let m=i===0?Y.emptyOpContext(-1,B):e.context(i);const D=new Set;for(this.prog.numLb>0&&this.spawnLookbehinds(a,i,m);!(a.mainThreads===0&&((s&Y.EMPTY_BEGIN_TEXT)!==0&&i!==0||(n===H.ANCHOR_START||n===H.ANCHOR_BOTH)&&i!==0));){(i===0||n===H.UNANCHORED)&&i>=o&&this.add(a,this.prog.start,i,this.matchcap,0,m);const N=i+h;m=e.context(N);for(let J=0;J<a.size;J++){const te=a.densePcs[J],he=this.prog.inst[te],de=J*this.ncap;let fe=!1;switch(he.op){case L.MATCH:if(n===H.ANCHOR_BOTH&&i!==e.endPos())break;D.add(he.arg);break;case L.RUNE:fe=he.matchRune(B);break;case L.RUNE1:fe=B===he.runes[0];break;case L.RUNE_ANY:fe=!0;break;case L.RUNE_ANY_NOT_NL:fe=B!==10;break;default:continue}fe&&this.add(c,he.out,N,a.denseCaps,de,m)}if(a.clear(),h===0)break;i+=h,B=p,h=C,B!==-1&&(l=e.step(i+h),p=l>>3,C=l&7);const G=a;a=c,c=G}return c.clear(),Array.from(D).sort((N,G)=>N-G)}step(e,t,n,s,i,o,a,c){const l=this.re2.longest;for(let B=0;B<e.size;B++){const h=e.densePcs[B],p=B*this.ncap;if(l&&this.matched&&this.ncap>0&&this.matchcap[0]<e.denseCaps[p])continue;const C=this.prog.inst[h];let m=!1;switch(C.op){case L.MATCH:if(a===H.ANCHOR_BOTH&&!c)break;if(this.ncap>0&&(!l||!this.matched||this.matchcap[1]<n)){e.denseCaps[p+1]=n;for(let D=0;D<this.ncap;D++)this.matchcap[D]=e.denseCaps[p+D]}l||(e.size=0),this.matched=!0;break;case L.RUNE:m=C.matchRune(i);break;case L.RUNE1:m=i===C.runes[0];break;case L.RUNE_ANY:m=!0;break;case L.RUNE_ANY_NOT_NL:m=i!==10;break;default:continue}m&&this.add(t,C.out,s,e.denseCaps,p,o)}e.clear()}spawnLookbehinds(e,t,n){for(let s=0;s<this.prog.lbStarts.length;s++)this.add(e,this.prog.lbStarts[s],t,this.matchcap,0,n)}restoreLookbehinds(e,t,n){this.lbTable.set(e.lbTable);for(let s=0;s<e.size;s++)this.add(t,e.pcs[s],e.pos,this.matchcap,0,n)}saveLookbehinds(e,t,n){let s=0;for(let i=0;i<t.size;i++){const o=t.densePcs[i];this.prog.lbInst[o]===1&&L.isRuneOp(this.prog.inst[o].op)&&(e.pcs[s++]=o)}e.size=s,e.pos=n,e.lbTable.set(this.lbTable)}add(e,t,n,s,i,o){const a=this.addStack;let c=0;for(;;){for(;t!==0&&!e.contains(t);){const B=e.add(t),h=this.prog.inst[t];switch(h.op){case L.FAIL:t=0;break;case L.ALT:case L.ALT_MATCH:a[c++]=h.arg,a[c++]=0,t=h.out;break;case L.EMPTY_WIDTH:t=(h.arg&~o)===0?h.out:0;break;case L.NOP:t=h.out;break;case L.CAPTURE:h.arg<this.ncap&&(a[c++]=-h.arg-1,a[c++]=s[i+h.arg],s[i+h.arg]=n),t=h.out;break;case L.LB_WRITE:this.lbTable[Math.abs(h.arg)]=n,t=h.out;break;case L.LB_CHECK:h.arg>0?t=this.lbTable[h.arg]===n?h.out:0:t=this.lbTable[-h.arg]!==n?h.out:0;break;case L.MATCH:case L.RUNE:case L.RUNE1:case L.RUNE_ANY:case L.RUNE_ANY_NOT_NL:if(this.prog.lbInst[t]===0&&e.mainThreads++,this.ncap>0){const p=B*this.ncap;p+this.ncap>e.denseCaps.length&&e.growCaps(p+this.ncap);for(let C=0;C<this.ncap;C++)e.denseCaps[p+C]=s[i+C]}t=0;break;default:throw new Au("unhandled")}}if(c===0)return;c-=2;const l=a[c];l<0?(s[i-l-1]=a[c+1],t=0):t=l}}};const AR=(r,e,t)=>{let n=-2128831035;for(let s=0;s<r.length;s++)n^=r[s],n=Math.imul(n,16777619);n^=e,n=Math.imul(n,16777619);for(let s=0;s<t.length;s++)n^=t[s],n=Math.imul(n,16777619);return n},kC=(r,e)=>{if(r.length!==e.length)return!1;for(let t=0;t<r.length;t++)if(r[t]!==e[t])return!1;return!0},MC=(r,e,t,n)=>r.flag===t&&kC(r.nfaStates,e)&&kC(r.matchIDs,n),VB=[],Jo=-1;var Gc=class{constructor(r,e,t){this.nfaStates=r,this.flag=e,this.isMatch=(e&PE.FLAG_MATCH)!==0,this.matchIDs=t,this.next=null,this.nextAnchored=null}},De,PE=(De=class{constructor(e,t=8388608){this.prog=e,this.maxMem=t,this.stateCache=new Map,this.stateCount=0,this.startStates=new Map,this.failed=!1;for(let n=0;n<e.numInst();n++){const s=e.getInst(n).op;if(s===L.LB_WRITE||s===L.LB_CHECK){this.failed=!0;break}}this.computeRuneClasses(),this.stateBudget=t,this.memBudget=t}computeRuneClasses(){const e=new Set,t=(s,i)=>{e.add(s),e.add(i+1)};for(let s=0;s<this.prog.numInst();s++){const i=this.prog.getInst(s);switch(i.op){case L.RUNE:case L.RUNE1:if(i.runes.length===1){if(t(i.runes[0],i.runes[0]),(i.arg&H.FOLD_CASE)!==0)for(let o=ee.simpleFold(i.runes[0]);o!==i.runes[0];o=ee.simpleFold(o))t(o,o)}else for(let o=0;o<i.runes.length;o+=2)t(i.runes[o],i.runes[o+1]);break;case L.RUNE_ANY_NOT_NL:t(10,10);break;case L.EMPTY_WIDTH:(i.arg&(Y.EMPTY_BEGIN_LINE|Y.EMPTY_END_LINE))!==0&&t(10,10),(i.arg&(Y.EMPTY_WORD_BOUNDARY|Y.EMPTY_NO_WORD_BOUNDARY))!==0&&(t(48,57),t(65,90),t(95,95),t(97,122))}}e.delete(0),this.classBounds=Int32Array.from(e).sort(),this.numClasses=this.classBounds.length+1;const n=new Int32Array(ee.MAX_LATIN1+1);for(let s=0;s<=ee.MAX_LATIN1;s++)n[s]=this.searchClass(s);this.latin1Class=n}runeClass(e){return e<=ee.MAX_LATIN1?this.latin1Class[e]:this.searchClass(e)}searchClass(e){const t=this.classBounds;let n=0,s=t.length;for(;n<s;){const i=n+s>>1;t[i]<=e?n=i+1:s=i}return n}closure(e,t){const n=new Set,s=Array.from(e);let i=0;for(;s.length>0;){const o=s.pop();if(o===0||n.has(o))continue;n.add(o);const a=this.prog.getInst(o);switch(a.op){case L.ALT:case L.ALT_MATCH:s.push(a.out),s.push(a.arg);break;case L.NOP:case L.CAPTURE:s.push(a.out);break;case L.EMPTY_WIDTH:i|=a.arg,(a.arg&~t)===0&&s.push(a.out)}}return{pcs:Array.from(n).sort((o,a)=>o-a),needflags:i}}getState(e,t,n){const s=AR(e,t,n),i=this.stateCache.get(s);if(i instanceof Gc){if(MC(i,e,t,n))return i}else if(i!==void 0){for(let c=0;c<i.length;c++)if(MC(i[c],e,t,n))return i[c]}const o=De.stateCost(e,n);if(this.memBudget<o)return null;this.memBudget-=o;const a=new Gc(e,t,n);return i===void 0?this.stateCache.set(s,a):i instanceof Gc?this.stateCache.set(s,[i,a]):i.push(a),this.stateCount++,a}static stateCost(e,t){const n=t.length===0?0:De.ARRAY_OVERHEAD+De.ELEMENT_SIZE*t.length;return De.STATE_OVERHEAD+De.ELEMENT_SIZE*e.length+n}*cachedStates(){for(const e of this.stateCache.values())e instanceof Gc?yield e:yield*e}makeState(e,t,n){const s=this.closure(e,t&De.FLAG_EMPTY_MASK);let i=t;return s.needflags===0&&(i&=De.FLAG_MATCH),i|=s.needflags<<De.FLAG_NEED_SHIFT,this.getState(s.pcs,i,n)}allocTable(e,t){const n=this.numClasses+1,s=De.TABLE_OVERHEAD+De.ELEMENT_SIZE*n;if(this.memBudget<s)return null;this.memBudget-=s;const i=new Array(n).fill(null);return t===H.UNANCHORED?e.next=i:e.nextAnchored=i,i}clearCache(){this.stateCache.clear(),this.stateCount=0,this.startStates.clear(),this.memBudget=this.stateBudget}resetCache(e){return this.clearCache(),this.getState(e.nfaStates,e.flag,e.matchIDs)}step(e,t,n,s){let i=s===H.UNANCHORED?e.next:e.nextAnchored;if(i!==null){const J=i[t];if(J!==null)return J}else if(i=this.allocTable(e,s),i===null)return null;const o=e.flag>>>De.FLAG_NEED_SHIFT,a=e.flag&De.FLAG_EMPTY_MASK;let c=a,l=0;n===10&&(c|=Y.EMPTY_END_LINE,l|=Y.EMPTY_BEGIN_LINE),n===Jo&&(c|=Y.EMPTY_END_LINE|Y.EMPTY_END_TEXT);const B=(e.flag&De.FLAG_LAST_WORD)!==0,h=n!==Jo&&Y.isWordRune(n);c|=h===B?Y.EMPTY_NO_WORD_BOUNDARY:Y.EMPTY_WORD_BOUNDARY;let p=e.nfaStates;(c&~a&o)!==0&&(p=this.closure(p,c).pcs);const C=[];let m=!1,D=VB;for(let J=0;J<p.length;J++){const te=this.prog.getInst(p[J]);te.op===L.MATCH?(m||(m=!0,D=[]),D.push(te.arg)):n!==Jo&&L.isRuneOp(te.op)&&te.matchRune(n)&&C.push(te.out)}D.length>1&&D.sort((J,te)=>J-te),s===H.UNANCHORED&&n!==Jo&&C.push(this.prog.start);let N=l;m&&(N|=De.FLAG_MATCH),h&&(N|=De.FLAG_LAST_WORD);const G=this.makeState(C,N,D);return G===null?null:(i[t]=G,G)}start(e,t){const n=e.context(t);let s;if((n&Y.EMPTY_BEGIN_TEXT)!==0)s=Y.EMPTY_BEGIN_TEXT|Y.EMPTY_BEGIN_LINE;else if((n&Y.EMPTY_BEGIN_LINE)!==0)s=Y.EMPTY_BEGIN_LINE;else{const o=e.step(t),a=o>=0&&Y.isWordRune(o>>3);s=(n&Y.EMPTY_WORD_BOUNDARY)!==0!==a?De.FLAG_LAST_WORD:0}let i=this.startStates.get(s);if(i===void 0){if(i=this.makeState([this.prog.start],s,VB),i===null&&(this.clearCache(),i=this.makeState([this.prog.start],s,VB),i===null))return null;this.startStates.set(s,i)}return i}stepOrReset(e,t,n,s,i,o){let a=this.step(e,t,n,s);if(a!==null)return a;if(o.resetPos>=0&&i-o.resetPos<De.PROGRESS_PER_STATE*this.stateCount)return null;o.resetPos=i;const c=this.resetCache(e);return c===null?null:(a=this.step(c,t,n,s),a)}run(e,t,n,s,i){const o=e.endPos(),a=this.latin1Class,c=n===H.UNANCHORED,l={resetPos:-1};let B=t;for(;B<o;){const h=e.step(B),p=h>>3,C=h&7;if(C===0)break;const m=p<=ee.MAX_LATIN1?a[p]:this.runeClass(p);let D=c&&s.next!==null?s.next[m]:null;if(D===null&&(D=this.stepOrReset(s,m,p,n,B,l),D===null))return null;if(s=D,s.isMatch&&i(s,!1))return!0;if(!c&&s.nfaStates.length===0)return!1;B+=C}return s=this.stepOrReset(s,this.numClasses,Jo,n,B,l),s===null?null:s.isMatch&&i(s,!0)}match(e,t,n){if(this.failed)return null;if((n===H.ANCHOR_START||n===H.ANCHOR_BOTH)&&t!==0)return!1;const s=this.start(e,t);return s===null?null:this.run(e,t,n,s,(i,o)=>n!==H.ANCHOR_BOTH||o)}matchSet(e,t,n){if(this.failed)return null;if((n===H.ANCHOR_START||n===H.ANCHOR_BOTH)&&t!==0)return[];const s=this.start(e,t);if(s===null)return null;const i=new Set,o=(a,c)=>{if(n!==H.ANCHOR_BOTH||c)for(let l=0;l<a.matchIDs.length;l++)i.add(a.matchIDs[l]);return!1};return this.run(e,t,n,s,o)===null?null:Array.from(i).sort((a,c)=>a-c)}},q(De,"FLAG_EMPTY_MASK",255),q(De,"FLAG_MATCH",256),q(De,"FLAG_LAST_WORD",512),q(De,"FLAG_NEED_SHIFT",16),q(De,"STATE_OVERHEAD",150),q(De,"ARRAY_OVERHEAD",40),q(De,"ELEMENT_SIZE",8),q(De,"TABLE_OVERHEAD",48),q(De,"PROGRESS_PER_STATE",10),De);const bR=32,vR=500,kB=256,RR=262144;var PR=class{constructor(){this.end=0,this.cap=new Int32Array(0),this.matchcap=new Int32Array(0),this.ncap=0,this.jobPc=new Int32Array(kB),this.jobArg=new Uint8Array(kB),this.jobPos=new Int32Array(kB),this.jobLen=0,this.visited=new Uint32Array(0)}reset(r,e,t){this.end=e,this.jobLen=0,this.ncap=t;const n=r.numInst()*(e+1)+bR-1>>>5;this.visited.length<n?this.visited=new Uint32Array(n):this.visited.fill(0,0,n),this.cap.length<t?this.cap=new Int32Array(t).fill(-1):this.cap.fill(-1,0,t),this.matchcap.length<t?this.matchcap=new Int32Array(t).fill(-1):this.matchcap.fill(-1,0,t)}shouldVisit(r,e){const t=r*(this.end+1)+e,n=t>>>5,s=1<<(t&31);return(this.visited[n]&s)!==0?!1:(this.visited[n]|=s,!0)}push(r,e,t,n){if(r.prog.getInst(e).op!==L.FAIL&&(n||this.shouldVisit(e,t))){if(this.jobLen>=this.jobPc.length){const s=this.jobPc.length*2,i=new Int32Array(s);i.set(this.jobPc),this.jobPc=i;const o=new Uint8Array(s);o.set(this.jobArg),this.jobArg=o;const a=new Int32Array(s);a.set(this.jobPos),this.jobPos=a}this.jobPc[this.jobLen]=e,this.jobArg[this.jobLen]=n?1:0,this.jobPos[this.jobLen]=t,this.jobLen++}}tryBacktrack(r,e,t,n,s){const i=r.longest;for(this.push(r,t,n,!1);this.jobLen>0;){this.jobLen--;let o=this.jobPc[this.jobLen],a=this.jobArg[this.jobLen]===1,c=this.jobPos[this.jobLen],l=!0;for(;!(!l&&!this.shouldVisit(o,c));){l=!1;const B=r.prog.getInst(o);switch(B.op){case L.FAIL:break;case L.ALT:if(a){a=!1,o=B.arg;continue}else{this.push(r,o,c,!0),o=B.out;continue}case L.ALT_MATCH:{const h=r.prog.getInst(B.out);if(L.isRuneOp(h.op)){this.push(r,B.arg,c,!1),o=B.arg,c=this.end;continue}this.push(r,B.out,this.end,!1),o=B.out;continue}case L.RUNE:{const h=e.step(c);if(h===Ot.EOF()||!B.matchRune(h>>3))break;c+=h&7,o=B.out;continue}case L.RUNE1:{const h=e.step(c);if(h===Ot.EOF()||h>>3!==B.runes[0])break;c+=h&7,o=B.out;continue}case L.RUNE_ANY_NOT_NL:{const h=e.step(c);if(h===Ot.EOF()||h>>3===10)break;c+=h&7,o=B.out;continue}case L.RUNE_ANY:{const h=e.step(c);if(h===Ot.EOF())break;c+=h&7,o=B.out;continue}case L.CAPTURE:if(a){this.cap[B.arg]=c;break}else{B.arg<this.ncap&&(this.push(r,o,this.cap[B.arg],!0),this.cap[B.arg]=c),o=B.out;continue}case L.EMPTY_WIDTH:{const h=e.context(c);if((B.arg&~h)!==0)break;o=B.out;continue}case L.NOP:o=B.out;continue;case L.MATCH:{if(s===H.ANCHOR_BOTH&&c!==this.end)break;if(this.ncap===0)return!0;this.ncap>1&&(this.cap[1]=c);const h=this.matchcap[1];if((h===-1||i&&c>0&&c>h)&&this.matchcap.set(this.cap),!i||c===this.end)return!0;break}case L.LB_WRITE:case L.LB_CHECK:throw new Au("Backtracker cannot evaluate Lookbehind instructions");default:throw new Au("bad inst")}break}}return i&&this.matchcap.length>1&&this.matchcap[1]>=0}};const Uc=[];var Hc=class SE{static shouldBacktrack(e){return e.numInst()<=vR}static maxBitStateLen(e){return SE.shouldBacktrack(e)?Math.floor(RR/e.numInst()):0}static execute(e,t,n,s,i){const o=e.cond;if(o===Y.EMPTY_ALL||(s===H.ANCHOR_START||s===H.ANCHOR_BOTH)&&n!==0||(o&Y.EMPTY_BEGIN_TEXT)!==0&&n!==0)return null;const a=Uc.length>0?Uc.pop():new PR,c=t.endPos();a.reset(e.prog,c,i);let l=!1;if((o&Y.EMPTY_BEGIN_TEXT)!==0||s===H.ANCHOR_START||s===H.ANCHOR_BOTH)a.ncap>0&&(a.cap[0]=n),a.tryBacktrack(e,t,e.prog.start,n,s)&&(l=!0);else{let h=-1;for(;n<=c&&h!==0;n+=h){if(e.prefix.length>0){const C=t.index(e,n);if(C<0)break;n+=C}if(a.ncap>0&&(a.cap[0]=n),a.tryBacktrack(e,t,e.prog.start,n,s)){l=!0;break}const p=t.step(n);h=p===Ot.EOF()?0:p&7}}if(!l)return Uc.push(a),null;const B=i===0?[]:Y.toArray(a.matchcap.subarray(0,i));return Uc.push(a),B}},GC=class{constructor(r){this.sparse=new Uint32Array(r),this.dense=new Uint32Array(r),this.size=0,this.nextIndex=0}empty(){return this.nextIndex>=this.size}next(){return this.dense[this.nextIndex++]}clear(){this.size=0,this.nextIndex=0}contains(r){return r<this.sparse.length&&this.sparse[r]<this.size&&this.dense[this.sparse[r]]===r}insert(r){this.contains(r)||this.insertNew(r)}insertNew(r){r>=this.sparse.length||(this.sparse[r]=this.size,this.dense[this.size]=r,this.size++)}};const SR=(r,e,t,n)=>{const s=r.length,i=e.length;let o=0,a=0;const c=[],l=[];let B=!0,h=-1;const p=C=>{const m=C?r:e,D=C?o:a,N=C?t:n;return h>0&&m[D]<=c[h]?!1:(c.push(m[D],m[D+1]),C?o+=2:a+=2,h+=2,l.push(N),!0)};for(;o<s||a<i;)if(a>=i?B=p(!0):o>=s||e[a]<r[o]?B=p(!1):B=p(!0),!B)return null;return{merged:c,next:l}};var NR=class{constructor(r){this.start=r.start,this.numCap=r.numCap,this.inst=new Array(r.inst.length);for(let e=0;e<r.inst.length;e++){const t=r.inst[e],n=new L(t.op);n.out=t.out,n.arg=t.arg,n.runes=t.runes?new Int32Array(t.runes):new Int32Array(0),n.next=null,this.inst[e]=n}}};const OR=r=>{const e=new NR(r);for(let t=0;t<e.inst.length;t++){const n=e.inst[t];if(n.op!==L.ALT&&n.op!==L.ALT_MATCH)continue;let s="out",i="arg",o=e.inst[n[i]];if(o.op!==L.ALT&&o.op!==L.ALT_MATCH&&(s="arg",i="out",o=e.inst[n[i]],o.op!==L.ALT&&o.op!==L.ALT_MATCH))continue;const a=e.inst[n[s]];if(a.op===L.ALT||a.op===L.ALT_MATCH)continue;let c="out",l="arg",B=!1;o.out===t?B=!0:o.arg===t&&(B=!0,c="arg",l="out"),B&&(o[c]=n[s]),n[s]===o[c]&&(n[i]=o[l])}return e},FR=r=>{if(r.inst.length>=1e3)return null;const e=new GC(r.inst.length),t=new GC(r.inst.length),n=new Array(r.inst.length),s=new Array(r.inst.length).fill(!1),i=o=>{let a=!0;const c=r.inst[o];if(t.contains(o))return!0;switch(t.insert(o),c.op){case L.ALT:case L.ALT_MATCH:{a=i(c.out)&&i(c.arg);let l=s[c.out],B=s[c.arg];if(l&&B)return!1;if(B){const m=c.out;c.out=c.arg,c.arg=m;const D=l;l=B,B=D}l&&(s[o]=!0,c.op=L.ALT_MATCH);const h=n[c.out]||[],p=n[c.arg]||[],C=SR(h,p,c.out,c.arg);if(!C)return!1;n[o]=new Int32Array(C.merged),c.next=new Uint32Array(C.next);break}case L.CAPTURE:case L.EMPTY_WIDTH:case L.NOP:a=i(c.out),s[o]=s[c.out],n[o]=n[c.out]?new Int32Array(n[c.out]):new Int32Array(0),c.next=new Uint32Array(Math.floor(n[o].length/2)+1).fill(c.out);break;case L.MATCH:case L.FAIL:s[o]=c.op===L.MATCH;break;case L.RUNE:{if(s[o]=!1,c.next&&c.next.length>0)break;if(e.insert(c.out),!c.runes||c.runes.length===0){n[o]=new Int32Array(0),c.next=new Uint32Array([c.out]);break}let l=[];if(c.runes.length===1&&(c.arg&H.FOLD_CASE)!==0){const B=c.runes[0];l.push(B,B);for(let h=ee.simpleFold(B);h!==B;h=ee.simpleFold(h))l.push(h,h);l.sort((h,p)=>h-p)}else for(let B=0;B<c.runes.length;B++)l.push(c.runes[B]);n[o]=new Int32Array(l),c.next=new Uint32Array(Math.floor(l.length/2)+1).fill(c.out),c.op=L.RUNE;break}case L.RUNE1:{if(s[o]=!1,c.next&&c.next.length>0)break;e.insert(c.out);let l=[];if((c.arg&H.FOLD_CASE)!==0){const B=c.runes[0];l.push(B,B);for(let h=ee.simpleFold(B);h!==B;h=ee.simpleFold(h))l.push(h,h);l.sort((h,p)=>h-p)}else l.push(c.runes[0],c.runes[0]);n[o]=new Int32Array(l),c.next=new Uint32Array(Math.floor(l.length/2)+1).fill(c.out),c.op=L.RUNE;break}case L.RUNE_ANY:if(s[o]=!1,c.next&&c.next.length>0)break;e.insert(c.out),n[o]=new Int32Array([0,ee.MAX_RUNE]),c.next=new Uint32Array([c.out]);break;case L.RUNE_ANY_NOT_NL:if(s[o]=!1,c.next&&c.next.length>0)break;e.insert(c.out),n[o]=new Int32Array([0,9,11,ee.MAX_RUNE]),c.next=new Uint32Array(Math.floor(n[o].length/2)+1).fill(c.out)}return a};for(e.clear(),e.insert(r.start);!e.empty();)if(t.clear(),!i(e.next()))return null;for(let o=0;o<r.inst.length;o++)n[o]&&(r.inst[o].runes=n[o]);return r},xR=(r,e)=>{for(let t=0;t<e.inst.length;t++){const n=e.inst[t];switch(n.op){case L.ALT:case L.ALT_MATCH:case L.RUNE:break;case L.CAPTURE:case L.EMPTY_WIDTH:case L.NOP:case L.MATCH:case L.FAIL:r.inst[t].next=null;break;case L.RUNE1:case L.RUNE_ANY:case L.RUNE_ANY_NOT_NL:r.inst[t].next=null,r.inst[t].op=n.op,r.inst[t].runes=n.runes?new Int32Array(n.runes):new Int32Array(0)}}};var UC=class NE{static compile(e){if(e.start===0||e.numLb>0)return null;const t=e.inst[e.start];if(t.op!==L.EMPTY_WIDTH||(t.arg&Y.EMPTY_BEGIN_TEXT)===0)return null;let n=!1;for(let i=0;i<e.inst.length;i++)if(e.inst[i].op===L.ALT||e.inst[i].op===L.ALT_MATCH){n=!0;break}for(let i=0;i<e.inst.length;i++){const o=e.inst[i],a=e.inst[o.out].op;switch(o.op){case L.ALT:case L.ALT_MATCH:if(a===L.MATCH||e.inst[o.arg].op===L.MATCH)return null;break;case L.EMPTY_WIDTH:if(a===L.MATCH){if((o.arg&Y.EMPTY_END_TEXT)===Y.EMPTY_END_TEXT)continue;return null}break;default:if(a===L.MATCH&&n)return null}}let s=OR(e);return s=FR(s),s!==null&&xR(s,e),s}static next(e,t){const n=e.matchRunePos(t);return n>=0?e.next[n]:e.op===L.ALT_MATCH?e.out:0}static execute(e,t,n,s,i){const o=e.onepass;if(!o)return null;const a=new Int32Array(i).fill(-1);let c=!1,l=t.step(n),B=l>>3,h=l&7,p=Ot.EOF(),C=-1,m=0;l!==Ot.EOF()&&(p=t.step(n+h),p!==Ot.EOF()&&(C=p>>3,m=p&7));let D=n===0?Y.emptyOpContext(-1,B):t.context(n),N=o.start,G;for(;;){switch(G=o.inst[N],N=G.out,G.op){case L.MATCH:return s===H.ANCHOR_BOTH&&n!==t.endPos()?null:(c=!0,a.length>0&&(a[0]=0,a[1]=n),i===0?[]:Y.toArray(a));case L.RUNE:if(!G.matchRune(B))return null;break;case L.RUNE1:if(B!==G.runes[0])return null;break;case L.RUNE_ANY:break;case L.RUNE_ANY_NOT_NL:if(B===10)return null;break;case L.ALT:case L.ALT_MATCH:N=NE.next(G,B);continue;case L.FAIL:return null;case L.NOP:continue;case L.EMPTY_WIDTH:if((G.arg&~D)!==0)return null;continue;case L.CAPTURE:G.arg<a.length&&(a[G.arg]=n);continue;default:throw new Au("bad inst")}if(h===0)break;D=Y.emptyOpContext(B,C),n+=h,B=C,h=m,B!==-1&&(p=t.step(n+h),p!==Ot.EOF()?(C=p>>3,m=p&7):(C=-1,m=0))}return c?i===0?[]:Y.toArray(a):null}},se,T=(se=class{static isPseudoOp(e){return e>=se.Op.LEFT_PAREN}static emptySubs(){return[]}static quoteIfHyphen(e){return e===M.CODES["-"]?"\\":""}static fromRegexp(e){const t=new se(e.op);return t.flags=e.flags,t.subs=e.subs,t.runes=e.runes,t.cap=e.cap,t.min=e.min,t.max=e.max,t.name=e.name,t.namedGroups=e.namedGroups,t.lb=e.lb,t}constructor(e){this.op=e,this.flags=0,this.subs=se.emptySubs(),this.runes=new Int32Array(0),this.min=0,this.max=0,this.cap=0,this.name=null,this.namedGroups=Object.create(null),this.lb=0}reinit(){this.flags=0,this.subs=se.emptySubs(),this.runes=new Int32Array(0),this.cap=0,this.min=0,this.max=0,this.name=null,this.namedGroups=Object.create(null),this.lb=0}toString(){return this.appendTo()}appendTo(){let e="";switch(this.op){case se.Op.NO_MATCH:e+="[^\\x00-\\x{10FFFF}]";break;case se.Op.EMPTY_MATCH:e+="(?:)";break;case se.Op.STAR:case se.Op.PLUS:case se.Op.QUEST:case se.Op.REPEAT:{const t=this.subs[0];switch(t.op>se.Op.CAPTURE||t.op===se.Op.LITERAL&&t.runes.length>1?e+=`(?:${t.appendTo()})`:e+=t.appendTo(),this.op){case se.Op.STAR:e+="*";break;case se.Op.PLUS:e+="+";break;case se.Op.QUEST:e+="?";break;case se.Op.REPEAT:e+=`{${this.min}`,this.min!==this.max&&(e+=",",this.max>=0&&(e+=this.max)),e+="}"}(this.flags&H.NON_GREEDY)!==0&&(e+="?");break}case se.Op.CONCAT:for(let t of this.subs)t.op===se.Op.ALTERNATE?e+=`(?:${t.appendTo()})`:e+=t.appendTo();break;case se.Op.ALTERNATE:{let t="";for(let n of this.subs)e+=t,t="|",e+=n.appendTo();break}case se.Op.LITERAL:(this.flags&H.FOLD_CASE)!==0&&(e+="(?i:");for(let t of this.runes)e+=Y.escapeRune(t);(this.flags&H.FOLD_CASE)!==0&&(e+=")");break;case se.Op.ANY_CHAR_NOT_NL:e+="(?-s:.)";break;case se.Op.ANY_CHAR:e+="(?s:.)";break;case se.Op.PLB:e+=`(?<=${this.subs[0].appendTo()})`;break;case se.Op.NLB:e+=`(?<!${this.subs[0].appendTo()})`;break;case se.Op.CAPTURE:this.name===null||this.name.length===0?e+="(":e+=`(?P<${this.name}>`,this.subs[0].op!==se.Op.EMPTY_MATCH&&(e+=this.subs[0].appendTo()),e+=")";break;case se.Op.BEGIN_TEXT:e+="\\A";break;case se.Op.END_TEXT:(this.flags&H.WAS_DOLLAR)!==0?e+="(?-m:$)":e+="\\z";break;case se.Op.BEGIN_LINE:e+="^";break;case se.Op.END_LINE:e+="$";break;case se.Op.WORD_BOUNDARY:e+="\\b";break;case se.Op.NO_WORD_BOUNDARY:e+="\\B";break;case se.Op.CHAR_CLASS:if(this.runes.length%2!==0){e+="[invalid char class]";break}if(e+="[",this.runes.length===0)e+="^\\x00-\\x{10FFFF}";else if(this.runes[0]===0&&this.runes[this.runes.length-1]===ee.MAX_RUNE){e+="^";for(let t=1;t<this.runes.length-1;t+=2){const n=this.runes[t]+1,s=this.runes[t+1]-1;e+=se.quoteIfHyphen(n),e+=Y.escapeRune(n),n!==s&&(e+="-",e+=se.quoteIfHyphen(s),e+=Y.escapeRune(s))}}else for(let t=0;t<this.runes.length;t+=2){const n=this.runes[t],s=this.runes[t+1];e+=se.quoteIfHyphen(n),e+=Y.escapeRune(n),n!==s&&(e+="-",e+=se.quoteIfHyphen(s),e+=Y.escapeRune(s))}e+="]";break;default:e+=this.op}return e}maxCap(){let e=0;if(this.op===se.Op.CAPTURE&&(e=this.cap),this.subs!==null)for(let t of this.subs){const n=t.maxCap();e<n&&(e=n)}return e}equals(e){if(!(e!==null&&e instanceof se)||this.op!==e.op)return!1;switch(this.op){case se.Op.END_TEXT:if((this.flags&H.WAS_DOLLAR)!==(e.flags&H.WAS_DOLLAR))return!1;break;case se.Op.LITERAL:case se.Op.CHAR_CLASS:if((this.flags&H.FOLD_CASE)!==(e.flags&H.FOLD_CASE))return!1;if(this.runes===null&&e.runes===null)break;if(this.runes===null||e.runes===null||this.runes.length!==e.runes.length)return!1;for(let t=0;t<this.runes.length;t++)if(this.runes[t]!==e.runes[t])return!1;break;case se.Op.ALTERNATE:case se.Op.CONCAT:if(this.subs.length!==e.subs.length)return!1;for(let t=0;t<this.subs.length;++t)if(!this.subs[t].equals(e.subs[t]))return!1;break;case se.Op.STAR:case se.Op.PLUS:case se.Op.QUEST:if((this.flags&H.NON_GREEDY)!==(e.flags&H.NON_GREEDY)||!this.subs[0].equals(e.subs[0]))return!1;break;case se.Op.REPEAT:if((this.flags&H.NON_GREEDY)!==(e.flags&H.NON_GREEDY)||this.min!==e.min||this.max!==e.max||!this.subs[0].equals(e.subs[0]))return!1;break;case se.Op.CAPTURE:if(this.cap!==e.cap||(this.name===null?e.name!==null:this.name!==e.name)||!this.subs[0].equals(e.subs[0]))return!1;break;case se.Op.PLB:case se.Op.NLB:if(this.lb!==e.lb||!this.subs[0].equals(e.subs[0]))return!1}return!0}},q(se,"Op",vE(["NO_MATCH","EMPTY_MATCH","LITERAL","CHAR_CLASS","ANY_CHAR_NOT_NL","ANY_CHAR","BEGIN_LINE","END_LINE","BEGIN_TEXT","END_TEXT","WORD_BOUNDARY","NO_WORD_BOUNDARY","CAPTURE","STAR","PLUS","QUEST","REPEAT","CONCAT","ALTERNATE","PLB","NLB","LEFT_PAREN","VERTICAL_BAR"])),se),_d=class{static walk(r,e){const t=[];let n=r,s;for(;;){if(n.subs.length===0)s=e.leaf(n);else{const i=e.enter(n);if(i.result===void 0){t.push({re:n,state:i,i:0}),n=n.subs[0];continue}s=i.result}for(;;){if(t.length===0)return s;const i=t[t.length-1];if(e.child(i.re,i.state,s,i.i),i.i++,i.state.result===void 0&&i.i<i.re.subs.length){n=i.re.subs[i.i];break}t.pop(),s=i.state.result!==void 0?i.state.result:e.leave(i.re,i.state)}}}},HC=class{constructor(r,e){const t=new Map,n=[0],s=[0],i=[0],o=[0];for(const m of r){let D=0;for(let N=0;N<m.length;N++){const G=D*e+m[N];let J=t.get(G);J===void 0&&(J=n.length,t.set(G,J),n.push(D),s.push(m[N]),i.push(i[D]+1),o.push(0)),D=J}o[D]=1}const a=n.length,c=new Int32Array(a-1);for(let m=1;m<a;m++)c[m-1]=m;c.sort((m,D)=>n[m]-n[D]||s[m]-s[D]);const l=new Int32Array(a+1);for(let m=1;m<a;m++)l[n[m]+1]++;for(let m=0;m<a;m++)l[m+1]+=l[m];const B=new Int32Array(a-1);for(let m=0;m<c.length;m++)B[m]=s[c[m]];this.childStart=l,this.childUnit=B,this.childNode=c;const h=new Int32Array(a);for(let m=0;m<a;m++)h[m]=m;h.sort((m,D)=>i[m]-i[D]);const p=new Int32Array(a),C=Uint8Array.from(o);for(let m=1;m<a;m++){const D=h[m],N=n[D];if(N!==0){let G=p[N],J=this.next(G,s[D]);for(;J<0&&G!==0;)G=p[G],J=this.next(G,s[D]);p[D]=J>=0?J:0}C[D]|=C[p[D]]}this.fail=p,this.match=C}next(r,e){let t=this.childStart[r],n=this.childStart[r+1];const s=this.childUnit;for(;t<n;){const i=t+n>>1,o=s[i];if(o===e)return this.childNode[i];o<e?t=i+1:n=i}return-1}advance(r,e){for(;;){const t=this.next(r,e);if(t>=0)return t;if(r===0)return 0;r=this.fail[r]}}searchUTF16(r,e,t){let n=0;for(let s=e;s<t;s++)if(n=this.advance(n,r.charCodeAt(s)),this.match[n]===1)return!0;return!1}searchUTF8(r,e,t){let n=0;for(let s=e;s<t;s++)if(n=this.advance(n,r[s]),this.match[n]===1)return!0;return!1}},Yt,Ce=(Yt=class{constructor(e){this.type=e,this.subs=[],this.str="",this.bytes=null,this.cost=e===Yt.Type.EXACT?1:0,this.allExact=!1,this.ac16=null,this.ac8=null}automaton16(){if(this.ac16===null){const e=this.subs.map(t=>{const n=new Array(t.str.length);for(let s=0;s<t.str.length;s++)n[s]=t.str.charCodeAt(s);return n});this.ac16=new HC(e,65536)}return this.ac16}automaton8(){return this.ac8===null&&(this.ac8=new HC(this.subs.map(e=>e.bytes),256)),this.ac8}eval(e,t){switch(this.type){case Yt.Type.NONE:return!0;case Yt.Type.EXACT:return e.hasString(this,t);case Yt.Type.AND:for(let n=0;n<this.subs.length;n++)if(!this.subs[n].eval(e,t))return!1;return!0;case Yt.Type.OR:if(this.allExact)return e.hasAnyString(this,t);for(let n=0;n<this.subs.length;n++)if(this.subs[n].eval(e,t))return!0;return!1;default:return!0}}},q(Yt,"Type",{NONE:0,EXACT:1,AND:2,OR:3}),q(Yt,"MAX_SCANS",32),q(Yt,"MAX_AC_UNITS",1<<18),Yt),hn,LR=(hn=class{static build(e){return e?_d.walk(e,hn.WALKER):new Ce(Ce.Type.NONE)}static leaf(e){if(e.op!==T.Op.LITERAL)return new Ce(Ce.Type.NONE);if(e.runes.length===0||(e.flags&H.FOLD_CASE)!==0)return new Ce(Ce.Type.NONE);let t="";for(let s=0;s<e.runes.length;s++){if(ee.isUnsearchable(e.runes[s]))return new Ce(Ce.Type.NONE);t+=String.fromCodePoint(e.runes[s])}const n=new Ce(Ce.Type.EXACT);return n.str=t,n.bytes=Y.stringToUtf8ByteArray(n.str),n}static enter(e){switch(e.op){case T.Op.CAPTURE:case T.Op.PLUS:return{sub:null};case T.Op.REPEAT:return e.min>=1?{sub:null}:{result:new Ce(Ce.Type.NONE)};case T.Op.CONCAT:return{pf:new Ce(Ce.Type.AND),subs:[]};case T.Op.ALTERNATE:return{pf:new Ce(Ce.Type.OR),subs:[]};default:return{result:new Ce(Ce.Type.NONE)}}}static child(e,t,n){if(t.subs===void 0){t.sub=n;return}if(t.pf.type===Ce.Type.AND){if(n.type===Ce.Type.NONE)return;if(n.type===Ce.Type.AND){for(let s=0;s<n.subs.length;s++)t.subs.push(n.subs[s]);return}t.subs.push(n);return}if(n.type===Ce.Type.NONE){t.result=new Ce(Ce.Type.NONE);return}if(n.type===Ce.Type.OR){for(let s=0;s<n.subs.length;s++)t.subs.push(n.subs[s]);return}t.subs.push(n)}static leave(e,t){if(t.subs===void 0)return t.sub;const n=t.pf,s=new Set,i=[];for(const l of t.subs){if(l.type===Ce.Type.EXACT){if(s.has(l.str))continue;s.add(l.str)}i.push(l)}if(n.type===Ce.Type.AND){const l=[];let B=0;for(const h of i)B+h.cost>Ce.MAX_SCANS||(l.push(h),B+=h.cost);return l.length===0?new Ce(Ce.Type.NONE):l.length===1?l[0]:(n.subs=l,n.cost=B,n)}if(i.length===0)return new Ce(Ce.Type.NONE);if(i.length===1)return i[0];n.subs=i;let o=!0,a=0,c=0;for(const l of i)l.type!==Ce.Type.EXACT?o=!1:c+=l.bytes.length,a+=l.cost;return o?c>Ce.MAX_AC_UNITS?new Ce(Ce.Type.NONE):(n.allExact=!0,n.cost=1,n):a>Ce.MAX_SCANS?new Ce(Ce.Type.NONE):(n.cost=a,n)}},q(hn,"WALKER",{leaf:e=>hn.leaf(e),enter:e=>hn.enter(e),child:(e,t,n)=>hn.child(e,t,n),leave:(e,t)=>hn.leave(e,t)}),hn),nn=class{constructor(r=0,e=0){this.head=r,this.tail=e}},VR=class{constructor(){this.inst=[],this.start=0,this.numCap=2,this.lbStarts=[],this.numLb=0,this.lbInst=null}getInst(r){return this.inst[r]}numInst(){return this.inst.length}addInst(r){this.inst.push(new L(r))}markLookbehindInsts(){const r=new Uint8Array(this.inst.length),e=this.lbStarts.slice();for(;e.length>0;){const t=e.pop();if(t===0||r[t]===1)continue;r[t]=1;const n=this.inst[t];switch(n.op){case L.ALT:case L.ALT_MATCH:e.push(n.out,n.arg);break;case L.MATCH:case L.FAIL:break;default:e.push(n.out)}}this.lbInst=r}skipNop(r){let e=this.inst[r];for(;e.op===L.NOP||e.op===L.CAPTURE;)e=this.inst[r],r=e.out;return e}prefix(){let r="",e=this.skipNop(this.start);if(!L.isRuneOp(e.op)||e.runes.length!==1)return[e.op===L.MATCH,r];for(;L.isRuneOp(e.op)&&e.runes.length===1&&(e.arg&H.FOLD_CASE)===0&&!ee.isUnsearchable(e.runes[0]);)r+=String.fromCodePoint(e.runes[0]),e=this.skipNop(e.out);return[e.op===L.MATCH,r]}startCond(){let r=0,e=this.start;e:for(;;){const t=this.inst[e];switch(t.op){case L.EMPTY_WIDTH:r|=t.arg;break;case L.FAIL:return-1;case L.CAPTURE:case L.NOP:break;default:break e}e=t.out}return r}patch(r,e){let t=r.head;for(;t!==0;){const n=this.inst[t>>1];(t&1)===0?(t=n.out,n.out=e):(t=n.arg,n.arg=e)}}append(r,e){if(r.head===0)return e;if(e.head===0)return r;const t=this.inst[r.tail>>1];return(r.tail&1)===0?t.out=e.head:t.arg=e.head,new nn(r.head,e.tail)}toString(){let r="";for(let e=0;e<this.inst.length;e++){const t=r.length;r+=e,e===this.start&&(r+="*"),r+="        ".substring(r.length-t),r+=this.inst[e],r+=`
`}return r}};const kR=new Int32Array([0,M.CODES[`
`]-1,M.CODES[`
`]+1,ee.MAX_RUNE]),qC=new Int32Array([0,ee.MAX_RUNE]);var qc=class{constructor(r=0,e=new nn,t=!1){this.i=r,this.out=e,this.nullable=t}},MR=class ch{static compileRegexp(e){const t=new ch,n=t.compile(e);return t.prog.patch(n.out,t.newInst(L.MATCH).i),t.prog.start=n.i,t.prog.markLookbehindInsts(),t.prog}static compileSet(e){const t=new ch;if(e.length===0)return t.prog.start=t.newInst(L.FAIL).i,t.prog.markLookbehindInsts(),t.prog;let n=[];for(let i=0;i<e.length;i++){t.lbOffset=t.prog.numLb;const o=t.compile(e[i]),a=t.newInst(L.MATCH);t.prog.getInst(a.i).arg=i,t.prog.patch(o.out,a.i),n.push(o.i)}let s=n[0];for(let i=1;i<n.length;i++){const o=t.newInst(L.ALT),a=t.prog.getInst(o.i);a.out=s,a.arg=n[i],s=o.i}return t.prog.start=s,t.prog.markLookbehindInsts(),t.prog}constructor(){this.prog=new VR,this.newInst(L.FAIL),this.lbOffset=0,this.runeCache=new Map,this.walker={leaf:e=>this.leaf(e),enter:e=>this.enter(e),child:(e,t,n)=>this.child(e,t,n),leave:(e,t)=>this.leave(e,t)}}newInst(e){return this.prog.addInst(e),new qc(this.prog.numInst()-1,new nn,!0)}nop(){const e=this.newInst(L.NOP);return e.out=new nn(e.i<<1,e.i<<1),e}fail(){return new qc}cap(e){const t=this.newInst(L.CAPTURE);return t.out=new nn(t.i<<1,t.i<<1),this.prog.getInst(t.i).arg=e,this.prog.numCap<e+1&&(this.prog.numCap=e+1),t}cat(e,t){return e.i===0||t.i===0?(this.prog.patch(e.out,0),this.prog.patch(t.out,0),this.fail()):(this.prog.patch(e.out,t.i),new qc(e.i,t.out,e.nullable&&t.nullable))}alt(e,t){if(e.i===0)return t;if(t.i===0)return e;const n=this.newInst(L.ALT),s=this.prog.getInst(n.i);return s.out=e.i,s.arg=t.i,n.out=this.prog.append(e.out,t.out),n.nullable=e.nullable||t.nullable,n}loop(e,t){const n=this.newInst(L.ALT),s=this.prog.getInst(n.i);return t?(s.arg=e.i,n.out=new nn(n.i<<1,n.i<<1)):(s.out=e.i,n.out=new nn(n.i<<1|1,n.i<<1|1)),this.prog.patch(e.out,n.i),n}quest(e,t){if(e.i===0)return this.nop();const n=this.newInst(L.ALT),s=this.prog.getInst(n.i);return t?(s.arg=e.i,n.out=new nn(n.i<<1,n.i<<1)):(s.out=e.i,n.out=new nn(n.i<<1|1,n.i<<1|1)),n.out=this.prog.append(n.out,e.out),n}star(e,t){return e.i===0?this.nop():e.nullable?this.quest(this.plus(e,t),t):this.loop(e,t)}plus(e,t){return e.i===0?this.fail():new qc(e.i,this.loop(e,t).out,e.nullable)}empty(e){const t=this.newInst(L.EMPTY_WIDTH);return this.prog.getInst(t.i).arg=e,t.out=new nn(t.i<<1,t.i<<1),t}rune(e,t){const n=this.newInst(L.RUNE);n.nullable=!1;const s=this.prog.getInst(n.i);return s.runes=e,t&=H.FOLD_CASE,(e.length!==1||ee.simpleFold(e[0])===e[0])&&(t&=-2),s.arg=t,n.out=new nn(n.i<<1,n.i<<1),(t&H.FOLD_CASE)===0&&e.length===1||e.length===2&&e[0]===e[1]?s.op=L.RUNE1:e.length===2&&e[0]===0&&e[1]===ee.MAX_RUNE?s.op=L.RUNE_ANY:e.length===4&&e[0]===0&&e[1]===M.CODES[`
`]-1&&e[2]===M.CODES[`
`]+1&&e[3]===ee.MAX_RUNE&&(s.op=L.RUNE_ANY_NOT_NL),n}lookBehind(e,t){const n=Math.sign(t)*(Math.abs(t)+this.lbOffset),s=this.newInst(L.LB_WRITE);this.prog.getInst(s.i).arg=n;const i=this.rune(qC,0),o=this.star(i,!0),a=this.cat(o,e);this.prog.patch(a.out,s.i);const c=this.newInst(L.LB_CHECK);return this.prog.getInst(c.i).arg=n,this.prog.lbStarts.push(a.i),Math.abs(n)>this.prog.numLb&&(this.prog.numLb=Math.abs(n)),c.out=new nn(c.i<<1,c.i<<1),c}compile(e){return _d.walk(e,this.walker)}leaf(e){switch(e.op){case T.Op.NO_MATCH:return this.fail();case T.Op.EMPTY_MATCH:return this.nop();case T.Op.LITERAL:{if(e.runes.length===0)return this.nop();let t=null;for(let n of e.runes){let s=this.runeCache.get(n);s===void 0&&(s=new Int32Array([n]),this.runeCache.set(n,s));const i=this.rune(s,e.flags);t=t===null?i:this.cat(t,i)}return t}case T.Op.CHAR_CLASS:return this.rune(e.runes,e.flags);case T.Op.ANY_CHAR_NOT_NL:return this.rune(kR,0);case T.Op.ANY_CHAR:return this.rune(qC,0);case T.Op.BEGIN_LINE:return this.empty(Y.EMPTY_BEGIN_LINE);case T.Op.END_LINE:return this.empty(Y.EMPTY_END_LINE);case T.Op.BEGIN_TEXT:return this.empty(Y.EMPTY_BEGIN_TEXT);case T.Op.END_TEXT:return this.empty(Y.EMPTY_END_TEXT);case T.Op.WORD_BOUNDARY:return this.empty(Y.EMPTY_WORD_BOUNDARY);case T.Op.NO_WORD_BOUNDARY:return this.empty(Y.EMPTY_NO_WORD_BOUNDARY);case T.Op.CONCAT:case T.Op.ALTERNATE:return this.nop();default:throw new FB("regexp: unhandled case in compile")}}enter(e){switch(e.op){case T.Op.PLB:case T.Op.NLB:case T.Op.STAR:case T.Op.PLUS:case T.Op.QUEST:return{sub:null};case T.Op.CAPTURE:return{bra:this.cap(e.cap<<1),sub:null};case T.Op.CONCAT:case T.Op.ALTERNATE:return{f:null};default:throw new FB("regexp: unhandled case in compile")}}child(e,t,n){e.op===T.Op.CONCAT?t.f=t.f===null?n:this.cat(t.f,n):e.op===T.Op.ALTERNATE?t.f=t.f===null?n:this.alt(t.f,n):t.sub=n}leave(e,t){switch(e.op){case T.Op.PLB:case T.Op.NLB:return this.lookBehind(t.sub,e.lb);case T.Op.CAPTURE:{const n=this.cap(e.cap<<1|1);return this.cat(this.cat(t.bra,t.sub),n)}case T.Op.STAR:return this.star(t.sub,(e.flags&H.NON_GREEDY)!==0);case T.Op.PLUS:return this.plus(t.sub,(e.flags&H.NON_GREEDY)!==0);case T.Op.QUEST:return this.quest(t.sub,(e.flags&H.NON_GREEDY)!==0);case T.Op.CONCAT:case T.Op.ALTERNATE:return t.f;default:throw new FB("regexp: unhandled case in compile")}}},We,GR=(We=class{static simplify(e){return e===null?null:_d.walk(e,We.WALKER)}static leaf(e){if(e.op===T.Op.CHAR_CLASS){if(e.runes===null)return e;if(e.runes.length===0)return new T(T.Op.NO_MATCH);if(e.runes.length===2&&e.runes[0]===0&&e.runes[1]===ee.MAX_RUNE)return new T(T.Op.ANY_CHAR);if(e.runes.length===4&&e.runes[0]===0&&e.runes[1]===M.CODES[`
`]-1&&e.runes[2]===M.CODES[`
`]+1&&e.runes[3]===ee.MAX_RUNE)return new T(T.Op.ANY_CHAR_NOT_NL)}return e}static enter(e){switch(e.op){case T.Op.PLB:case T.Op.NLB:case T.Op.CAPTURE:case T.Op.STAR:case T.Op.PLUS:case T.Op.QUEST:return{sub:null};case T.Op.CONCAT:case T.Op.ALTERNATE:return{subs:[],changed:!1};case T.Op.REPEAT:return e.min===0&&e.max===0?{result:new T(T.Op.EMPTY_MATCH)}:{sub:null};default:return{result:e}}}static child(e,t,n,s){if(t.subs===void 0){t.sub=n;return}if(n!==e.subs[s]&&(t.changed=!0),e.op===T.Op.CONCAT){if(n.op===T.Op.NO_MATCH){t.result=new T(T.Op.NO_MATCH);return}if(n.op===T.Op.EMPTY_MATCH){t.changed=!0;return}if(n.op===T.Op.CONCAT){t.changed=!0;for(let i=0;i<n.subs.length;i++)t.subs.push(n.subs[i]);return}}else{if(n.op===T.Op.NO_MATCH){t.changed=!0;return}if(n.op===T.Op.ALTERNATE){t.changed=!0;for(let i=0;i<n.subs.length;i++)t.subs.push(n.subs[i]);return}}t.subs.push(n)}static leave(e,t){switch(e.op){case T.Op.PLB:case T.Op.NLB:case T.Op.CAPTURE:{const n=t.sub;if(n!==e.subs[0]){const s=T.fromRegexp(e);return s.runes=new Int32Array(0),s.subs=[n],s}return e}case T.Op.CONCAT:case T.Op.ALTERNATE:if(t.changed){const n=t.subs;if(n.length===0)return new T(e.op===T.Op.CONCAT?T.Op.EMPTY_MATCH:T.Op.NO_MATCH);if(n.length===1)return n[0];const s=T.fromRegexp(e);return s.runes=new Int32Array(0),s.subs=n,s}return e;case T.Op.STAR:case T.Op.PLUS:case T.Op.QUEST:return We.simplify1(e.op,e.flags,t.sub,e);case T.Op.REPEAT:return We.simplifyRepeat(e,t.sub);default:return e}}static simplifyRepeat(e,t){if(e.max===-1){if(e.min===0)return We.simplify1(T.Op.STAR,e.flags,t,null);if(e.min===1)return We.simplify1(T.Op.PLUS,e.flags,t,null);const s=[];for(let i=0;i<e.min-1;i++)s.push(t);return s.push(We.simplify1(T.Op.PLUS,e.flags,t,null)),We.concat(s)}if(e.min===1&&e.max===1)return t;let n=null;if(e.min>0){n=[];for(let s=0;s<e.min;s++)n.push(t)}if(e.max>e.min){let s=We.simplify1(T.Op.QUEST,e.flags,t,null);for(let i=e.min+1;i<e.max;i++)s=We.simplify1(T.Op.QUEST,e.flags,We.concat([t,s]),null);if(n===null)return s;n.push(s)}return n!==null?We.concat(n):new T(T.Op.NO_MATCH)}static concat(e){const t=[];for(let s=0;s<e.length;s++){const i=e[s];if(i.op===T.Op.NO_MATCH)return new T(T.Op.NO_MATCH);if(i.op!==T.Op.EMPTY_MATCH){if(i.op===T.Op.CONCAT){for(let o=0;o<i.subs.length;o++)t.push(i.subs[o]);continue}t.push(i)}}if(t.length===0)return new T(T.Op.EMPTY_MATCH);if(t.length===1)return t[0];const n=new T(T.Op.CONCAT);return n.subs=t,n}static simplify1(e,t,n,s){if(n.op===T.Op.EMPTY_MATCH)return n;if(n.op===T.Op.NO_MATCH)return e===T.Op.PLUS?n:new T(T.Op.EMPTY_MATCH);if(e===n.op&&(t&H.NON_GREEDY)===(n.flags&H.NON_GREEDY))return n;if(s!==null&&s.op===e&&(s.flags&H.NON_GREEDY)===(t&H.NON_GREEDY)&&n===s.subs[0])return s;const i=new T(e);return i.flags=t,i.subs=[n],i}},q(We,"WALKER",{leaf:e=>We.leaf(e),enter:e=>We.enter(e),child:(e,t,n,s)=>We.child(e,t,n,s),leave:(e,t)=>We.leave(e,t)}),We),ye=class{constructor(r,e){this.sign=r,this.cls=e}};const jC=[48,57],JC=[9,10,12,13,32,32],KC=[48,57,65,90,95,95,97,122],zC=new Map([["\\d",new ye(1,jC)],["\\D",new ye(-1,jC)],["\\s",new ye(1,JC)],["\\S",new ye(-1,JC)],["\\w",new ye(1,KC)],["\\W",new ye(-1,KC)]]),WC=[48,57,65,90,97,122],$C=[65,90,97,122],QC=[0,127],YC=[9,9,32,32],XC=[0,31,127,127],ZC=[48,57],eg=[33,126],tg=[97,122],ng=[32,126],rg=[33,47,58,64,91,96,123,126],sg=[9,13,32,32],ig=[65,90],og=[48,57,65,90,95,95,97,122],ag=[48,57,65,70,97,102],cg=new Map([["[:alnum:]",new ye(1,WC)],["[:^alnum:]",new ye(-1,WC)],["[:alpha:]",new ye(1,$C)],["[:^alpha:]",new ye(-1,$C)],["[:ascii:]",new ye(1,QC)],["[:^ascii:]",new ye(-1,QC)],["[:blank:]",new ye(1,YC)],["[:^blank:]",new ye(-1,YC)],["[:cntrl:]",new ye(1,XC)],["[:^cntrl:]",new ye(-1,XC)],["[:digit:]",new ye(1,ZC)],["[:^digit:]",new ye(-1,ZC)],["[:graph:]",new ye(1,eg)],["[:^graph:]",new ye(-1,eg)],["[:lower:]",new ye(1,tg)],["[:^lower:]",new ye(-1,tg)],["[:print:]",new ye(1,ng)],["[:^print:]",new ye(-1,ng)],["[:punct:]",new ye(1,rg)],["[:^punct:]",new ye(-1,rg)],["[:space:]",new ye(1,sg)],["[:^space:]",new ye(-1,sg)],["[:upper:]",new ye(1,ig)],["[:^upper:]",new ye(-1,ig)],["[:word:]",new ye(1,og)],["[:^word:]",new ye(-1,og)],["[:xdigit:]",new ye(1,ag)],["[:^xdigit:]",new ye(-1,ag)]]);var ps=class ou{static charClassToString(e,t){let n="[";for(let s=0;s<t;s+=2){s>0&&(n+=" ");const i=e[s],o=e[s+1];i===o?n+=`0x${i.toString(16)}`:n+=`0x${i.toString(16)}-0x${o.toString(16)}`}return n+="]",n}static sortRanges(e,t){const n=t>>1,s=new Array(n);for(let o=0;o<n;o++)s[o]=o;s.sort((o,a)=>e[2*o]-e[2*a]||e[2*a+1]-e[2*o+1]);const i=e.slice(0,t);for(let o=0;o<n;o++)e[2*o]=i[2*s[o]],e[2*o+1]=i[2*s[o]+1]}constructor(e=Y.emptyInts()){this.r=e,this.len=e.length}toArray(){return this.r instanceof Int32Array?this.len===this.r.length?this.r:this.r.subarray(0,this.len):new Int32Array(this.len===this.r.length?this.r:this.r.slice(0,this.len))}toGrowableArray(){return Array.isArray(this.r)?(this.r.length=this.len,this.r):Array.from(this.r.subarray(0,this.len))}cleanClass(){if(this.len<4)return this;ou.sortRanges(this.r,this.len);let e=2;for(let t=2;t<this.len;t+=2){const n=this.r[t],s=this.r[t+1];if(n<=this.r[e-1]+1){s>this.r[e-1]&&(this.r[e-1]=s);continue}this.r[e]=n,this.r[e+1]=s,e+=2}return this.len=e,this}appendLiteral(e,t){return(t&H.FOLD_CASE)!==0?this.appendFoldedRange(e,e):this.appendRange(e,e)}appendRange(e,t){if(this.len>0){for(let n=2;n<=4;n+=2)if(this.len>=n){const s=this.r[this.len-n],i=this.r[this.len-n+1];if(e<=i+1&&s<=t+1)return e<s&&(this.r[this.len-n]=e),t>i&&(this.r[this.len-n+1]=t),this}}return this.r[this.len++]=e,this.r[this.len++]=t,this}appendFoldedRange(e,t){if(e<=ee.MIN_FOLD&&t>=ee.MAX_FOLD)return this.appendRange(e,t);if(t<ee.MIN_FOLD||e>ee.MAX_FOLD)return this.appendRange(e,t);e<ee.MIN_FOLD&&(this.appendRange(e,ee.MIN_FOLD-1),e=ee.MIN_FOLD),t>ee.MAX_FOLD&&(this.appendRange(ee.MAX_FOLD+1,t),t=ee.MAX_FOLD);for(let n=e;n<=t;n++){this.appendRange(n,n);for(let s=ee.simpleFold(n);s!==n;s=ee.simpleFold(s))this.appendRange(s,s)}return this}appendClass(e){for(let t=0;t<e.length;t+=2)this.appendRange(e[t],e[t+1]);return this}appendFoldedClass(e){for(let t=0;t<e.length;t+=2)this.appendFoldedRange(e[t],e[t+1]);return this}appendNegatedClass(e){let t=0;for(let n=0;n<e.length;n+=2){const s=e[n],i=e[n+1];t<=s-1&&this.appendRange(t,s-1),t=i+1}return t<=ee.MAX_RUNE&&this.appendRange(t,ee.MAX_RUNE),this}appendTable(e){for(let t=0;t<e.length;++t){const n=e.getLo(t),s=e.getHi(t),i=e.getStride(t);if(i===1){this.appendRange(n,s);continue}for(let o=n;o<=s;o+=i)this.appendRange(o,o)}return this}appendNegatedTable(e){let t=0;for(let n=0;n<e.length;++n){const s=e.getLo(n),i=e.getHi(n),o=e.getStride(n);if(o===1){t<=s-1&&this.appendRange(t,s-1),t=i+1;continue}for(let a=s;a<=i;a+=o)t<=a-1&&this.appendRange(t,a-1),t=a+1}return t<=ee.MAX_RUNE&&this.appendRange(t,ee.MAX_RUNE),this}appendTableWithSign(e,t){return t<0?this.appendNegatedTable(e):this.appendTable(e)}negateClass(){let e=0,t=0;for(let n=0;n<this.len;n+=2){const s=this.r[n],i=this.r[n+1];e<=s-1&&(this.r[t]=e,this.r[t+1]=s-1,t+=2),e=i+1}return this.len=t,e<=ee.MAX_RUNE&&(this.r[this.len++]=e,this.r[this.len++]=ee.MAX_RUNE),this}appendClassWithSign(e,t){return t<0?this.appendNegatedClass(e):this.appendClass(e)}appendGroup(e,t){let n=e.cls;return t&&(n=new ou().appendFoldedClass(n).cleanClass().toArray()),this.appendClassWithSign(n,e.sign)}toString(){return ou.charClassToString(this.r,this.len)}},UR=class{constructor(r){this.str=r,this.position=0}pos(){return this.position}rewindTo(r){this.position=r}more(){return this.position<this.str.length}peek(){return this.str.codePointAt(this.position)}skip(r){this.position+=r}skipString(r){this.position+=r.length}pop(){const r=this.str.codePointAt(this.position);return this.position+=Y.charCount(r),r}lookingAt(r){return this.str.startsWith(r,this.position)}rest(){return this.str.substring(this.position)}from(r){return this.str.substring(r,this.position)}toString(){return this.rest()}},$,HR=($=class{static unicodeTable(e){return e==="Any"?{tab:$.ANY_TABLE,fold:$.ANY_TABLE,sign:1}:e==="Ascii"?{tab:$.ASCII_TABLE,fold:$.ASCII_FOLD_TABLE,sign:1}:e==="Assigned"?{tab:Wt.CATEGORIES.get("Cn"),fold:Wt.CATEGORIES.get("Cn"),sign:-1}:e==="Lc"?{tab:Wt.CATEGORIES.get("LC"),fold:Wt.FOLD_CATEGORIES.get("LC"),sign:1}:Wt.CATEGORIES.has(e)?{tab:Wt.CATEGORIES.get(e),fold:Wt.FOLD_CATEGORIES.get(e),sign:1}:Wt.SCRIPTS.has(e)?{tab:Wt.SCRIPTS.get(e),fold:Wt.FOLD_SCRIPT.get(e),sign:1}:null}static minFoldRune(e){if(e<ee.MIN_FOLD||e>ee.MAX_FOLD)return e;let t=e;const n=e;for(e=ee.simpleFold(e);e!==n;e=ee.simpleFold(e))t>e&&(t=e);return t}static leadingRegexp(e){if(e.op===T.Op.EMPTY_MATCH)return null;if(e.op===T.Op.CONCAT&&e.subs.length>0){const t=e.subs[0];return t.op===T.Op.EMPTY_MATCH?null:t}return e}static literalRegexp(e,t){const n=new T(T.Op.LITERAL);return n.flags=t,n.runes=Y.stringToRunes(e),n}static parse(e,t){return new $(e,t).parseInternal()}static parseRepeat(e){const t=e.pos();if(!e.more()||!e.lookingAt("{"))return-1;e.skip(1);const n=$.parseInt(e);if(n===-1||!e.more())return-1;let s;if(!e.lookingAt(","))s=n;else{if(e.skip(1),!e.more())return-1;if(e.lookingAt("}"))s=-1;else if((s=$.parseInt(e))===-1)return-1}if(!e.more()||!e.lookingAt("}"))return-1;if(e.skip(1),n<0||n>1e3||s===-2||s>1e3||s>=0&&n>s)throw new xe($.ERR_INVALID_REPEAT_SIZE,e.from(t));return n<<16|s&ee.MAX_BMP}static isValidCaptureName(e){if(e.length===0)return!1;for(let t=0;t<e.length;t++){const n=e.codePointAt(t);if(n!==M.CODES._&&!Y.isalnum(n))return!1}return!0}static parseInt(e){const t=e.pos();for(;e.more()&&e.peek()>=M.CODES[0]&&e.peek()<=M.CODES[9];)e.skip(1);const n=e.from(t);return n.length===0||n.length>1&&n.codePointAt(0)===M.CODES[0]?-1:n.length>8?-2:parseInt(n,10)}static isCharClass(e){return e.op===T.Op.LITERAL&&e.runes.length===1||e.op===T.Op.CHAR_CLASS||e.op===T.Op.ANY_CHAR_NOT_NL||e.op===T.Op.ANY_CHAR}static matchRune(e,t){switch(e.op){case T.Op.LITERAL:return e.runes.length===1&&e.runes[0]===t;case T.Op.CHAR_CLASS:for(let n=0;n<e.runes.length;n+=2)if(e.runes[n]<=t&&t<=e.runes[n+1])return!0;return!1;case T.Op.ANY_CHAR_NOT_NL:return t!==M.CODES[`
`];case T.Op.ANY_CHAR:return!0}return!1}static mergeCharClass(e,t){switch(e.op){case T.Op.ANY_CHAR:break;case T.Op.ANY_CHAR_NOT_NL:$.matchRune(t,M.CODES[`
`])&&(e.op=T.Op.ANY_CHAR);break;case T.Op.CHAR_CLASS:{const n=new ps(Array.isArray(e.runes)?e.runes:Array.from(e.runes));t.op===T.Op.LITERAL?n.appendLiteral(t.runes[0],t.flags):n.appendClass(t.runes),e.runes=n.toGrowableArray();break}case T.Op.LITERAL:if(t.runes[0]===e.runes[0]&&t.flags===e.flags)break;e.op=T.Op.CHAR_CLASS,e.runes=new ps().appendLiteral(e.runes[0],e.flags).appendLiteral(t.runes[0],t.flags).toGrowableArray()}}static parseEscape(e){const t=e.pos();if(e.skip(1),!e.more())throw new xe($.ERR_TRAILING_BACKSLASH);let n=e.pop();e:switch(n){case M.CODES[1]:case M.CODES[2]:case M.CODES[3]:case M.CODES[4]:case M.CODES[5]:case M.CODES[6]:case M.CODES[7]:if(!e.more()||e.peek()<M.CODES[0]||e.peek()>M.CODES[7])break;case M.CODES[0]:{let s=n-M.CODES[0];for(let i=1;i<3&&!(!e.more()||e.peek()<M.CODES[0]||e.peek()>M.CODES[7]);i++)s=s*8+e.peek()-M.CODES[0],e.skip(1);return s}case M.CODES.x:{if(!e.more())break;if(n=e.pop(),n===M.CODES["{"]){let o=0,a=0;for(;;){if(!e.more())break e;if(n=e.pop(),n===M.CODES["}"])break;const c=Y.unhex(n);if(c<0||(a=a*16+c,a>ee.MAX_RUNE))break e;o++}if(o===0)break e;return a}const s=Y.unhex(n);if(!e.more())break;n=e.pop();const i=Y.unhex(n);if(s<0||i<0)break;return s*16+i}case M.CODES.a:return M.CODES["\x07"];case M.CODES.f:return M.CODES["\f"];case M.CODES.n:return M.CODES[`
`];case M.CODES.r:return M.CODES["\r"];case M.CODES.t:return M.CODES["	"];case M.CODES.v:return M.CODES["\v"];default:if(n<=ee.MAX_ASCII&&!Y.isalnum(n))return n}throw new xe($.ERR_INVALID_ESCAPE,e.from(t))}static parseClassChar(e,t){if(!e.more())throw new xe($.ERR_MISSING_BRACKET,e.from(t));return e.lookingAt("\\")?$.parseEscape(e):e.pop()}static hasCapture(e){if(e===null)return!1;if(e.op===T.Op.CAPTURE)return!0;if(e.subs){for(let t of e.subs)if($.hasCapture(t))return!0}return!1}constructor(e,t=0){this.wholeRegexp=e,this.flags=t,this.numCap=0,this.namedGroups=Object.create(null),this.stack=[],this.free=null,this.numRegexp=0,this.numRunes=0,this.repeats=0,this.height=null,this.size=null,this.nlb=0}newRegexp(e){let t=this.free;return t!==null&&t.subs!==null&&t.subs.length>0?(this.free=t.subs[0],t.reinit(),t.op=e):(t=new T(e),this.numRegexp+=1),t}reuse(e){this.height!==null&&this.height.has(e)&&this.height.delete(e),e.subs!==null&&e.subs.length>0&&(e.subs[0]=this.free),this.free=e}checkLimits(e){if(this.numRunes>$.MAX_RUNES)throw new xe($.ERR_LARGE);this.checkSize(e),this.checkHeight(e)}checkSize(e){if(this.size===null){if(this.repeats===0&&(this.repeats=1),e.op===T.Op.REPEAT){let t=e.max;t===-1&&(t=e.min),t<=0&&(t=1),t>Math.floor($.MAX_SIZE/this.repeats)?this.repeats=$.MAX_SIZE:this.repeats*=t}if(this.numRegexp<Math.floor($.MAX_SIZE/this.repeats))return;this.size=new Map;for(let t of this.stack)this.checkSize(t)}if(this.calcSize(e,!0)>$.MAX_SIZE)throw new xe($.ERR_LARGE)}calcSize(e,t=!1){if(!t&&this.size!==null&&this.size.has(e))return this.size.get(e);let n=0;switch(e.op){case T.Op.LITERAL:n=e.runes.length;break;case T.Op.PLB:case T.Op.NLB:case T.Op.CAPTURE:case T.Op.STAR:n=2+this.calcSize(e.subs[0]);break;case T.Op.PLUS:case T.Op.QUEST:n=1+this.calcSize(e.subs[0]);break;case T.Op.CONCAT:for(let s of e.subs)n=n+this.calcSize(s);break;case T.Op.ALTERNATE:for(let s of e.subs)n=n+this.calcSize(s);e.subs.length>1&&(n=n+e.subs.length-1);break;case T.Op.REPEAT:{let s=this.calcSize(e.subs[0]);if(e.max===-1){e.min===0?n=2+s:n=1+e.min*s;break}n=e.max*s+(e.max-e.min);break}}return n=Math.max(1,n),this.size===null&&(this.size=new Map),this.size.set(e,n),n}checkHeight(e){if(!(this.numRegexp<$.MAX_HEIGHT)){if(this.height===null){this.height=new Map;for(let t of this.stack)this.checkHeight(t)}if(this.calcHeight(e,!0)>$.MAX_HEIGHT)throw new xe($.ERR_NESTING_DEPTH)}}calcHeight(e,t=!1){if(!t&&this.height!==null&&this.height.has(e))return this.height.get(e);let n=1;for(let s of e.subs){const i=this.calcHeight(s);n<1+i&&(n=1+i)}return this.height===null&&(this.height=new Map),this.height.set(e,n),n}pop(){return this.stack.pop()}popToPseudo(){const e=this.stack.length;let t=e;for(;t>0&&!T.isPseudoOp(this.stack[t-1].op);)t--;return this.stack.splice(t,e-t)}push(e){if(this.numRunes+=e.runes.length,e.op===T.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]===e.runes[1]){if(this.maybeConcat(e.runes[0],this.flags&-2))return null;e.op=T.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags&-2}else if(e.op===T.Op.CHAR_CLASS&&e.runes.length===4&&e.runes[0]===e.runes[1]&&e.runes[2]===e.runes[3]&&ee.simpleFold(e.runes[0])===e.runes[2]&&ee.simpleFold(e.runes[2])===e.runes[0]||e.op===T.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]+1===e.runes[1]&&ee.simpleFold(e.runes[0])===e.runes[1]&&ee.simpleFold(e.runes[1])===e.runes[0]){if(this.maybeConcat(e.runes[0],this.flags|H.FOLD_CASE))return null;e.op=T.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags|H.FOLD_CASE}else this.maybeConcat(-1,0);return this.stack.push(e),this.checkLimits(e),e}maybeConcat(e,t){const n=this.stack.length;if(n<2)return!1;const s=this.stack[n-1],i=this.stack[n-2];if(s.op!==T.Op.LITERAL||i.op!==T.Op.LITERAL||(s.flags&H.FOLD_CASE)!==(i.flags&H.FOLD_CASE))return!1;Array.isArray(i.runes)||(i.runes=Array.from(i.runes));for(let o=0;o<s.runes.length;o++)i.runes.push(s.runes[o]);return e>=0?(s.runes=[e],s.flags=t,!0):(this.pop(),this.reuse(s),!1)}newLiteral(e,t){const n=this.newRegexp(T.Op.LITERAL);return n.flags=t,(t&H.FOLD_CASE)!==0&&(e=$.minFoldRune(e)),n.runes=[e],n}literal(e){this.push(this.newLiteral(e,this.flags))}op(e){const t=this.newRegexp(e);return t.flags=this.flags,this.push(t)}repeat(e,t,n,s,i,o){let a=this.flags;if((a&H.PERL_X)!==0&&(i.more()&&i.lookingAt("?")&&(i.skip(1),a^=H.NON_GREEDY),o!==-1))throw new xe($.ERR_INVALID_REPEAT_OP,i.from(o));const c=this.stack.length;if(c===0)throw new xe($.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));const l=this.stack[c-1];if(T.isPseudoOp(l.op))throw new xe($.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));const B=this.newRegexp(e);if(B.min=t,B.max=n,B.flags=a,B.subs=[l],this.stack[c-1]=B,this.checkLimits(B),e===T.Op.REPEAT&&(t>=2||n>=2)&&!this.repeatIsValid(B,1e3))throw new xe($.ERR_INVALID_REPEAT_SIZE,i.from(s))}repeatIsValid(e,t){if(e.op===T.Op.REPEAT){let n=e.max;if(n===0)return!0;if(n<0&&(n=e.min),n>t)return!1;n>0&&(t=Math.trunc(t/n))}for(let n of e.subs)if(!this.repeatIsValid(n,t))return!1;return!0}concat(){this.maybeConcat(-1,0);const e=this.popToPseudo();return e.length===0?this.push(this.newRegexp(T.Op.EMPTY_MATCH)):this.push(this.collapse(e,T.Op.CONCAT))}alternate(){const e=this.popToPseudo();return e.length>0&&this.cleanAlt(e[e.length-1]),e.length===0?this.push(this.newRegexp(T.Op.NO_MATCH)):this.push(this.collapse(e,T.Op.ALTERNATE))}cleanAlt(e){e.op===T.Op.CHAR_CLASS&&(e.runes=new ps(Array.from(e.runes)).cleanClass().toArray(),e.runes.length===2&&e.runes[0]===0&&e.runes[1]===ee.MAX_RUNE?(e.runes=new Int32Array(0),e.op=T.Op.ANY_CHAR):e.runes.length===4&&e.runes[0]===0&&e.runes[1]===M.CODES[`
`]-1&&e.runes[2]===M.CODES[`
`]+1&&e.runes[3]===ee.MAX_RUNE&&(e.runes=new Int32Array(0),e.op=T.Op.ANY_CHAR_NOT_NL))}collapse(e,t){if(e.length===1)return e[0];let n=0;for(let a of e)n+=a.op===t?a.subs.length:1;let s=new Array(n).fill(null),i=0;for(let a of e)if(a.op===t){for(let c=0;c<a.subs.length;c++)s[i++]=a.subs[c];this.reuse(a)}else s[i++]=a;let o=this.newRegexp(t);if(o.subs=s,t===T.Op.ALTERNATE&&(o.subs=this.factor(o.subs),o.subs.length===1)){const a=o;o=o.subs[0],this.reuse(a)}return o}factor(e){if(e.length<2)return e;let t=0,n=e.length,s=0,i=null,o=0,a=0,c=0;for(let B=0;B<=n;B++){let h=null,p=0,C=0;if(B<n){let m=e[t+B];if(m.op===T.Op.CONCAT&&m.subs.length>0&&(m=m.subs[0]),m.op===T.Op.LITERAL&&(h=m.runes,p=m.runes.length,C=m.flags&H.FOLD_CASE),C===a){let D=0;for(;D<o&&D<p&&i[D]===h[D];)D++;if(D>0){o=D;continue}}}if(B!==c)if(B===c+1)e[s++]=e[t+c];else{const m=this.newRegexp(T.Op.LITERAL);m.flags=a,m.runes=i.slice(0,o);for(let G=c;G<B;G++)e[t+G]=this.removeLeadingString(e[t+G],o),this.checkLimits(e[t+G]);const D=this.collapse(e.slice(t+c,t+B),T.Op.ALTERNATE),N=this.newRegexp(T.Op.CONCAT);N.subs=[m,D],e[s++]=N}c=B,i=h,o=p,a=C}n=s,t=0,c=0,s=0;let l=null;for(let B=0;B<=n;B++){let h=null;if(!(B<n&&(h=$.leadingRegexp(e[t+B]),l!==null&&l.equals(h)&&($.isCharClass(l)||l.op===T.Op.REPEAT&&l.min===l.max&&$.isCharClass(l.subs[0]))))){if(B!==c)if(B===c+1)e[s++]=e[t+c];else{const p=l;for(let D=c;D<B;D++){const N=D!==c;e[t+D]=this.removeLeadingRegexp(e[t+D],N),this.checkLimits(e[t+D])}const C=this.collapse(e.slice(t+c,t+B),T.Op.ALTERNATE),m=this.newRegexp(T.Op.CONCAT);m.subs=[p,C],e[s++]=m}c=B,l=h}}n=s,t=0,c=0,s=0;for(let B=0;B<=n;B++)if(!(B<n&&$.isCharClass(e[t+B]))){if(B!==c)if(B===c+1)e[s++]=e[t+c];else{let h=c;for(let C=c+1;C<B;C++){const m=e[t+h],D=e[t+C];(m.op<D.op||m.op===D.op&&(m.runes!==null?m.runes.length:0)<(D.runes!==null?D.runes.length:0))&&(h=C)}const p=e[t+c];e[t+c]=e[t+h],e[t+h]=p;for(let C=c+1;C<B;C++)$.mergeCharClass(e[t+c],e[t+C]),this.reuse(e[t+C]);this.cleanAlt(e[t+c]),e[s++]=e[t+c]}B<n&&(e[s++]=e[t+B]),c=B+1}n=s,t=0,c=0,s=0;for(let B=0;B<n;++B)B+1<n&&e[t+B].op===T.Op.EMPTY_MATCH&&e[t+B+1].op===T.Op.EMPTY_MATCH||(e[s++]=e[t+B]);return n=s,t=0,e.slice(t,n)}removeLeadingString(e,t){if(e.op===T.Op.CONCAT&&e.subs.length>0){const n=this.removeLeadingString(e.subs[0],t);if(e.subs[0]=n,n.op===T.Op.EMPTY_MATCH)switch(this.reuse(n),e.subs.length){case 0:case 1:e.op=T.Op.EMPTY_MATCH,e.subs=T.emptySubs();break;case 2:{const s=e;e=e.subs[1],this.reuse(s);break}default:e.subs=e.subs.slice(1,e.subs.length)}return e}return e.op===T.Op.LITERAL&&(e.runes=e.runes.slice(t,e.runes.length),e.runes.length===0&&(e.op=T.Op.EMPTY_MATCH)),e}removeLeadingRegexp(e,t){if(e.op===T.Op.CONCAT&&e.subs.length>0){switch(t&&this.reuse(e.subs[0]),e.subs=e.subs.slice(1,e.subs.length),e.subs.length){case 0:e.op=T.Op.EMPTY_MATCH,e.subs=T.emptySubs();break;case 1:{const n=e;e=e.subs[0],this.reuse(n);break}}return e}return t&&this.reuse(e),this.newRegexp(T.Op.EMPTY_MATCH)}parseInternal(){if((this.flags&H.LITERAL)!==0)return $.literalRegexp(this.wholeRegexp,this.flags);let e=-1,t=-1,n=-1;const s=new UR(this.wholeRegexp);for(;s.more();){let i=-1;e:switch(s.peek()){case M.CODES["("]:if((this.flags&H.LOOKBEHIND)!==0){if(s.lookingAt("(?<=")){this.parsePosLookBehind(),s.skip(4);break}if(s.lookingAt("(?<!")){this.parseNegLookBehind(),s.skip(4);break}}if((this.flags&H.PERL_X)!==0&&s.lookingAt("(?")){this.parsePerlFlags(s);break}this.op(T.Op.LEFT_PAREN).cap=++this.numCap,s.skip(1);break;case M.CODES["|"]:this.parseVerticalBar(),s.skip(1);break;case M.CODES[")"]:this.parseRightParen(),s.skip(1);break;case M.CODES["^"]:(this.flags&H.ONE_LINE)!==0?this.op(T.Op.BEGIN_TEXT):this.op(T.Op.BEGIN_LINE),s.skip(1);break;case M.CODES.$:(this.flags&H.ONE_LINE)!==0?this.op(T.Op.END_TEXT).flags|=H.WAS_DOLLAR:this.op(T.Op.END_LINE),s.skip(1);break;case M.CODES["."]:(this.flags&H.DOT_NL)!==0?this.op(T.Op.ANY_CHAR):this.op(T.Op.ANY_CHAR_NOT_NL),s.skip(1);break;case M.CODES["["]:this.parseClass(s);break;case M.CODES["*"]:case M.CODES["+"]:case M.CODES["?"]:{i=s.pos();let o=null;switch(s.pop()){case M.CODES["*"]:o=T.Op.STAR;break;case M.CODES["+"]:o=T.Op.PLUS;break;case M.CODES["?"]:o=T.Op.QUEST}this.repeat(o,t,n,i,s,e);break}case M.CODES["{"]:{const o=s.pos(),a=$.parseRepeat(s);if(a<0){s.rewindTo(o),this.literal(s.pop());break}i=o,t=a>>16,n=(a&ee.MAX_BMP)<<16>>16,this.repeat(T.Op.REPEAT,t,n,i,s,e);break}case M.CODES["\\"]:{const o=s.pos();if(s.skip(1),(this.flags&H.PERL_X)!==0&&s.more())switch(s.pop()){case M.CODES.A:this.op(T.Op.BEGIN_TEXT);break e;case M.CODES.b:this.op(T.Op.WORD_BOUNDARY);break e;case M.CODES.B:this.op(T.Op.NO_WORD_BOUNDARY);break e;case M.CODES.C:throw new xe($.ERR_INVALID_ESCAPE,"\\C");case M.CODES.Q:{let l=s.rest();const B=l.indexOf("\\E");B>=0?(l=l.substring(0,B),s.skipString(l),s.skipString("\\E")):s.skipString(l);let h=0;for(;h<l.length;){const p=l.codePointAt(h);this.literal(p),h+=Y.charCount(p)}break e}case M.CODES.z:this.op(T.Op.END_TEXT);break e;default:s.rewindTo(o)}else s.rewindTo(o);const a=this.newRegexp(T.Op.CHAR_CLASS);if(a.flags=this.flags,s.lookingAt("\\p")||s.lookingAt("\\P")){const l=new ps;if(this.parseUnicodeClass(s,l)){a.runes=l.toArray(),this.push(a);break e}}const c=new ps;if(this.parsePerlClassEscape(s,c)){a.runes=c.toArray(),this.push(a);break e}s.rewindTo(o),this.reuse(a),this.literal($.parseEscape(s));break}default:this.literal(s.pop())}e=i}if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length!==1)throw new xe($.ERR_MISSING_PAREN,this.wholeRegexp);return this.stack[0].namedGroups=this.namedGroups,this.stack[0]}parsePerlFlags(e){const t=e.pos(),n=e.rest();if(n.startsWith("(?P<")||n.startsWith("(?<")){const a=n.charAt(2)==="P"?4:3,c=n.indexOf(">");if(c<0)throw new xe($.ERR_INVALID_NAMED_CAPTURE,n);const l=n.substring(a,c);if(e.skipString(l),e.skip(a+1),!$.isValidCaptureName(l))throw new xe($.ERR_INVALID_NAMED_CAPTURE,n.substring(0,c+1));const B=this.op(T.Op.LEFT_PAREN);if(B.cap=++this.numCap,this.namedGroups[l])throw new xe($.ERR_DUPLICATE_NAMED_CAPTURE,l);this.namedGroups[l]=this.numCap,B.name=l;return}e.skip(2);let s=this.flags,i=1,o=!1;e:for(;e.more();){const a=e.pop();switch(a){case M.CODES.i:s|=H.FOLD_CASE,o=!0;break;case M.CODES.m:s&=-17,o=!0;break;case M.CODES.s:s|=H.DOT_NL,o=!0;break;case M.CODES.U:s|=H.NON_GREEDY,o=!0;break;case M.CODES["-"]:if(i<0)break e;i=-1,s=~s,o=!1;break;case M.CODES[":"]:case M.CODES[")"]:if(i<0){if(!o)break e;s=~s}a===M.CODES[":"]&&this.op(T.Op.LEFT_PAREN),this.flags=s;return;default:break e}}throw new xe($.ERR_INVALID_PERL_OP,e.from(t))}parsePosLookBehind(){const e=this.newRegexp(T.Op.LEFT_PAREN);return e.flags=this.flags,e.lb=++this.nlb,this.push(e)}parseNegLookBehind(){const e=this.newRegexp(T.Op.LEFT_PAREN);return e.flags=this.flags,e.lb=-++this.nlb,this.push(e)}parseVerticalBar(){this.concat(),this.swapVerticalBar()||this.op(T.Op.VERTICAL_BAR)}swapVerticalBar(){const e=this.stack.length;if(e>=3&&this.stack[e-2].op===T.Op.VERTICAL_BAR&&$.isCharClass(this.stack[e-1])&&$.isCharClass(this.stack[e-3])){let t=this.stack[e-1],n=this.stack[e-3];if(t.op>n.op){const s=n;n=t,t=s,this.stack[e-3]=n}return $.mergeCharClass(n,t),this.reuse(t),this.pop(),!0}if(e>=2){const t=this.stack[e-1],n=this.stack[e-2];if(n.op===T.Op.VERTICAL_BAR)return e>=3&&this.cleanAlt(this.stack[e-3]),this.stack[e-2]=t,this.stack[e-1]=n,!0}return!1}parseRightParen(){if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length<2)throw new xe($.ERR_UNEXPECTED_PAREN,this.wholeRegexp);const e=this.pop(),t=this.pop();if(t.op!==T.Op.LEFT_PAREN)throw new xe($.ERR_UNEXPECTED_PAREN,this.wholeRegexp);if(this.flags=t.flags,t.lb!==0){if($.hasCapture(e))throw new xe($.ERR_INVALID_CAPTURE_IN_LOOKBEHIND,this.wholeRegexp);t.lb>0?t.op=T.Op.PLB:t.op=T.Op.NLB,t.subs=[e],this.push(t);return}t.cap===0?this.push(e):(t.op=T.Op.CAPTURE,t.subs=[e],this.push(t))}parsePerlClassEscape(e,t){const n=e.pos();if((this.flags&H.PERL_X)===0||!e.more()||e.pop()!==M.CODES["\\"]||!e.more())return!1;e.pop();const s=e.from(n),i=zC.has(s)?zC.get(s):null;return i===null?!1:(t.appendGroup(i,(this.flags&H.FOLD_CASE)!==0),!0)}parseNamedClass(e,t){const n=e.rest(),s=n.indexOf(":]");if(s<0)return!1;const i=n.substring(0,s+2);e.skipString(i);const o=cg.has(i)?cg.get(i):null;if(o===null)throw new xe($.ERR_INVALID_CHAR_RANGE,i);return t.appendGroup(o,(this.flags&H.FOLD_CASE)!==0),!0}parseUnicodeClass(e,t){const n=e.pos();if((this.flags&H.UNICODE_GROUPS)===0||!e.lookingAt("\\p")&&!e.lookingAt("\\P"))return!1;e.skip(1);let s=1,i=e.pop();if(i===M.CODES.P&&(s=-1),!e.more())throw e.rewindTo(n),new xe($.ERR_INVALID_CHAR_RANGE,e.rest());i=e.pop();let o;if(i!==M.CODES["{"])o=Y.runeToString(i);else{const B=e.rest(),h=B.indexOf("}");if(h<0)throw e.rewindTo(n),new xe($.ERR_INVALID_CHAR_RANGE,e.rest());o=B.substring(0,h),e.skipString(o),e.skip(1)}o.length!==0&&o.codePointAt(0)===M.CODES["^"]&&(s=0-s,o=o.substring(1));const a=$.unicodeTable(o);if(a===null)throw new xe($.ERR_INVALID_CHAR_RANGE,e.from(n));a.sign<0&&(s=0-s);const c=a.tab,l=a.fold;if((this.flags&H.FOLD_CASE)===0||l===null)t.appendTableWithSign(c,s);else{const B=new ps().appendTable(c).appendTable(l).cleanClass().toArray();t.appendClassWithSign(Array.from(B),s)}return!0}parseClass(e){const t=e.pos();e.skip(1);const n=this.newRegexp(T.Op.CHAR_CLASS);n.flags=this.flags;const s=new ps;let i=1;e.more()&&e.lookingAt("^")&&(i=-1,e.skip(1),(this.flags&H.CLASS_NL)===0&&s.appendRange(M.CODES[`
`],M.CODES[`
`]));let o=!0;for(;!e.more()||e.peek()!==M.CODES["]"]||o;){if(e.more()&&e.lookingAt("-")&&(this.flags&H.PERL_X)===0&&!o){const B=e.rest();if(B==="-"||!B.startsWith("-]"))throw e.rewindTo(t),new xe($.ERR_INVALID_CHAR_RANGE,e.rest())}o=!1;const a=e.pos();if(e.lookingAt("[:")){if(this.parseNamedClass(e,s))continue;e.rewindTo(a)}if(this.parseUnicodeClass(e,s)||this.parsePerlClassEscape(e,s))continue;e.rewindTo(a);const c=$.parseClassChar(e,t);let l=c;if(e.more()&&e.lookingAt("-")){if(e.skip(1),e.more()&&e.lookingAt("]"))e.skip(-1);else if(l=$.parseClassChar(e,t),l<c)throw new xe($.ERR_INVALID_CHAR_RANGE,e.from(a))}(this.flags&H.FOLD_CASE)===0?s.appendRange(c,l):s.appendFoldedRange(c,l)}e.skip(1),s.cleanClass(),i<0&&s.negateClass(),n.runes=s.toArray(),this.push(n)}},q($,"ERR_INTERNAL_ERROR","regexp/syntax: internal error"),q($,"ERR_INVALID_CHAR_RANGE","invalid character class range"),q($,"ERR_INVALID_ESCAPE","invalid escape sequence"),q($,"ERR_INVALID_NAMED_CAPTURE","invalid named capture"),q($,"ERR_INVALID_PERL_OP","invalid or unsupported Perl syntax"),q($,"ERR_INVALID_REPEAT_OP","invalid nested repetition operator"),q($,"ERR_INVALID_REPEAT_SIZE","invalid repeat count"),q($,"ERR_MISSING_BRACKET","missing closing ]"),q($,"ERR_MISSING_PAREN","missing closing )"),q($,"ERR_MISSING_REPEAT_ARGUMENT","missing argument to repetition operator"),q($,"ERR_TRAILING_BACKSLASH","trailing backslash at end of expression"),q($,"ERR_DUPLICATE_NAMED_CAPTURE","duplicate capture group name"),q($,"ERR_UNEXPECTED_PAREN","unexpected )"),q($,"ERR_NESTING_DEPTH","expression nests too deeply"),q($,"ERR_LARGE","expression too large"),q($,"ERR_INVALID_CAPTURE_IN_LOOKBEHIND","invalid capture in lookbehind"),q($,"MAX_HEIGHT",1e3),q($,"MAX_SIZE",1398101),q($,"MAX_RUNES",33554432),q($,"ANY_TABLE",new _(new Uint32Array([0,ee.MAX_RUNE,1]))),q($,"ASCII_TABLE",new _(new Uint32Array([0,127,1]))),q($,"ASCII_FOLD_TABLE",new _(new Uint32Array([0,127,1,383,383,1,8490,8490,1]))),$),qR=class gs{static initTest(e){const t=gs.compile(e),n=new gs(t.expr,t.prog,t.numSubexp,t.longest);return n.cond=t.cond,n.prefix=t.prefix,n.prefixUTF8=t.prefixUTF8,n.prefixComplete=t.prefixComplete,n.prefixRune=t.prefixRune,n.prefilter=t.prefilter,n.namedGroups=t.namedGroups,n}static compile(e){return gs.compileImpl(e,H.PERL,!1)}static compilePOSIX(e){return gs.compileImpl(e,H.POSIX,!0)}static compileImpl(e,t,n){let s=HR.parse(e,t);const i=s.maxCap(),o=s.namedGroups;s=GR.simplify(s);const a=LR.build(s),c=MR.compileRegexp(s),l=new gs(e,c,i,n);l.prefilter=a.type===Ce.Type.NONE?null:a;const[B,h]=c.prefix();return l.prefixComplete=B,l.prefix=h,l.prefixUTF8=Y.stringToUtf8ByteArray(l.prefix),l.prefix.length>0&&(l.prefixRune=l.prefix.codePointAt(0)),l.namedGroups=o,l}static match(e,t){return gs.compile(e).match(t)}constructor(e,t,n=0,s=0){this.expr=e,this.prog=t,this.numSubexp=n,this.longest=s,this.cond=t.startCond(),this.prefix=null,this.prefixUTF8=null,this.prefixComplete=!1,this.prefixRune=0,this.namedGroups=Object.create(null),this.machinePool=[],this.lazyDFA=null,this.onepass=UC.compile(this.prog),this.prefilter=null}get dfa(){return this.lazyDFA===null&&(this.lazyDFA=new PE(this.prog)),this.lazyDFA}matchPrefixComplete(e,t,n,s){if((n===H.ANCHOR_START||n===H.ANCHOR_BOTH)&&t!==0)return null;let i=-1,o=-1;const a=e.prefixLength(this);if(n===H.UNANCHORED){const c=e.index(this,t);if(c<0)return null;i=t+c,o=i+a}else if(n===H.ANCHOR_BOTH){if(e.endPos()!==a||e.index(this,0)!==0)return null;i=0,o=a}else if(n===H.ANCHOR_START){if(e.index(this,0)!==0)return null;i=0,o=a}if(i<0)return null;if(s>0){const c=new Int32Array(s).fill(-1);return c[0]=i,c[1]=o,Array.from(c)}return[]}createLookbehindState(){return this.prog.numLb>0?new DR(this.prog):null}executeEngine(e,t,n,s,i=null){if(this.prefixComplete&&(s===0||this.numSubexp===0))return this.matchPrefixComplete(e,t,n,s);if(this.prefilter!==null&&n===H.UNANCHORED&&!this.prefilter.eval(e,t))return null;if(this.onepass!==null)return UC.execute(this,e,t,n,s);if(s>0)return this.prog.numLb===0&&e.endPos()<=Hc.maxBitStateLen(this.prog)?Hc.execute(this,e,t,n,s):this.doExecuteNFA(e,t,n,s,i);if(this.prog.numLb===0){const o=this.dfa.match(e,t,n);if(o!==null)return o?[]:null;if(e.endPos()<=Hc.maxBitStateLen(this.prog))return Hc.execute(this,e,t,n,s)}return this.doExecuteNFA(e,t,n,s,i)}numberOfCapturingGroups(){return this.numSubexp}numberOfInstructions(){return this.prog.numInst()}get(){return this.machinePool.length>0?this.machinePool.pop():null}reset(){this.machinePool.length=0}put(e){this.machinePool.push(e)}toString(){return this.expr}doExecuteNFA(e,t,n,s,i=null){let o=this.get();o||(o=TR.fromRE2(this)),o.init(s);const a=o.match(e,t,n,i)?o.submatches():null;return this.put(o),a}match(e){return this.executeEngine(ke.fromUTF16(e),0,H.UNANCHORED,0)!==null}matchWithGroup(e,t,n,s,i,o=null){return e instanceof ks||(Y.isByteArray(e)?e=As.utf8(e):e=As.utf16(e)),this.matchMachineInput(e,t,n,s,i,o)}matchMachineInput(e,t,n,s,i,o=null){if(t>n)return[!1,null];const a=e.isUTF16Encoding()?ke.fromUTF16(e.asCharSequence(),0,n):ke.fromUTF8(e.asBytes(),0,n),c=this.executeEngine(a,t,s,2*i,o);return c===null?[!1,null]:[!0,c]}matchUTF8(e){return this.executeEngine(ke.fromUTF8(e),0,H.UNANCHORED,0)!==null}replaceAll(e,t){return this.replaceAllFunc(e,()=>t,2*e.length+1)}replaceFirst(e,t){return this.replaceAllFunc(e,()=>t,1)}replaceAllFunc(e,t,n){let s=0,i=0,o="";const a=ke.fromUTF16(e),c=this.createLookbehindState();let l=0;for(;i<=e.length;){const B=this.executeEngine(a,i,H.UNANCHORED,2,c);if(B===null||B.length===0)break;o+=e.substring(s,B[0]),(B[1]>s||B[0]===0)&&(o+=t(e.substring(B[0],B[1])),l++),s=B[1];const h=a.step(i)&7;if(i+h>B[1]?i+=h:i+1>B[1]?i++:i=B[1],l>=n)break}return o+=e.substring(s),o}pad(e){if(e===null)return null;let t=(1+this.numSubexp)*2;if(e.length<t){let n=new Array(t).fill(-1);for(let s=0;s<e.length;s++)n[s]=e[s];e=n}return e}allMatches(e,t,n=s=>s){let s=[];const i=e.endPos();t<0&&(t=i+1);let o=0,a=0,c=-1;const l=this.createLookbehindState();for(;a<t&&o<=i;){const B=this.executeEngine(e,o,H.UNANCHORED,this.prog.numCap,l);if(B===null||B.length===0)break;let h=!0;if(B[1]===o){B[0]===c&&(h=!1);const p=e.step(o);p<0?o=i+1:o+=p&7}else o=B[1];c=B[1],h&&(s.push(n(this.pad(B))),a++)}return s}findUTF8(e){const t=this.executeEngine(ke.fromUTF8(e),0,H.UNANCHORED,2);return t===null?null:e.slice(t[0],t[1])}findUTF8Index(e){const t=this.executeEngine(ke.fromUTF8(e),0,H.UNANCHORED,2);return t===null?null:t.slice(0,2)}find(e){const t=this.executeEngine(ke.fromUTF16(e),0,H.UNANCHORED,2);return t===null?"":e.substring(t[0],t[1])}findIndex(e){return this.executeEngine(ke.fromUTF16(e),0,H.UNANCHORED,2)}findUTF8Submatch(e){const t=this.executeEngine(ke.fromUTF8(e),0,H.UNANCHORED,this.prog.numCap);if(t===null)return null;const n=new Array(1+this.numSubexp).fill(null);for(let s=0;s<n.length;s++)2*s<t.length&&t[2*s]>=0&&(n[s]=e.slice(t[2*s],t[2*s+1]));return n}findUTF8SubmatchIndex(e){return this.pad(this.executeEngine(ke.fromUTF8(e),0,H.UNANCHORED,this.prog.numCap))}findSubmatch(e){const t=this.executeEngine(ke.fromUTF16(e),0,H.UNANCHORED,this.prog.numCap);if(t===null)return null;const n=new Array(1+this.numSubexp).fill(null);for(let s=0;s<n.length;s++)2*s<t.length&&t[2*s]>=0&&(n[s]=e.substring(t[2*s],t[2*s+1]));return n}findSubmatchIndex(e){return this.pad(this.executeEngine(ke.fromUTF16(e),0,H.UNANCHORED,this.prog.numCap))}findAllUTF8(e,t){const n=this.allMatches(ke.fromUTF8(e),t,s=>e.slice(s[0],s[1]));return n.length===0?null:n}findAllUTF8Index(e,t){const n=this.allMatches(ke.fromUTF8(e),t,s=>s.slice(0,2));return n.length===0?null:n}findAll(e,t){const n=this.allMatches(ke.fromUTF16(e),t,s=>e.substring(s[0],s[1]));return n.length===0?null:n}findAllIndex(e,t){const n=this.allMatches(ke.fromUTF16(e),t,s=>s.slice(0,2));return n.length===0?null:n}findAllUTF8Submatch(e,t){const n=this.allMatches(ke.fromUTF8(e),t,s=>{let i=new Array(s.length/2|0).fill(null);for(let o=0;o<i.length;o++)s[2*o]>=0&&(i[o]=e.slice(s[2*o],s[2*o+1]));return i});return n.length===0?null:n}findAllUTF8SubmatchIndex(e,t){const n=this.allMatches(ke.fromUTF8(e),t);return n.length===0?null:n}findAllSubmatch(e,t){const n=this.allMatches(ke.fromUTF16(e),t,s=>{let i=new Array(s.length/2|0).fill(null);for(let o=0;o<i.length;o++)s[2*o]>=0&&(i[o]=e.substring(s[2*o],s[2*o+1]));return i});return n.length===0?null:n}findAllSubmatchIndex(e,t){const n=this.allMatches(ke.fromUTF16(e),t);return n.length===0?null:n}},jR=class _i{static isHexadecimal(e){return"0"<=e&&e<="9"||"A"<=e&&e<="F"||"a"<=e&&e<="f"}static translate(e){let t="";if(Object.prototype.toString.call(e)==="[object RegExp]"&&(e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e=e.source),typeof e!="string")return e;let n="",s=!1,i=e.length;i===0&&(n="(?:)",s=!0);let o=!1,a=0;for(;a<i;){let l=e[a];if(l==="\\"){if(a+1<i)switch(l=e[a+1],l){case"\\":n+="\\\\",a+=2;continue;case"c":if(a+2<i){let p=e[a+2].charCodeAt(0);if(p>=65&&p<=90||p>=97&&p<=122){let C=p%32;n+="\\x",n+=(C>>4).toString(16).toUpperCase(),n+=(C&15).toString(16).toUpperCase(),a+=3,s=!0;continue}}n+="c",a+=2,s=!0;continue;case"u":if(a+2<i){if(e[a+2]==="{"){let p=a+3,C=!1,m=!1;for(;p<i;){const D=e[p];if(D==="}"){m=!0;break}if(!_i.isHexadecimal(D))break;C=!0,p++}if(m&&C){n+="\\x",a+=2,s=!0;continue}}else if(a+5<i){let p=!0;for(let C=0;C<4;C++)if(!_i.isHexadecimal(e[a+2+C])){p=!1;break}if(p){n+="\\x{"+e.substring(a+2,a+6)+"}",a+=6,s=!0;continue}}}n+="u",a+=2,s=!0;continue;case"x":{let p=!1;if(a+2<i&&e[a+2]==="{"){let C=a+3,m=!1,D=!1;for(;C<i;){const N=e[C];if(N==="}"){D=!0;break}if(!_i.isHexadecimal(N))break;m=!0,C++}D&&m&&(p=!0)}else a+3<i&&_i.isHexadecimal(e[a+2])&&_i.isHexadecimal(e[a+3])&&(p=!0);p?(n+="\\x",a+=2):(n+="x",a+=2,s=!0);continue}case"n":case"r":case"t":case"a":case"f":case"v":case"d":case"D":case"s":case"S":case"w":case"W":case"b":case"B":case"p":case"P":case"A":case"z":case"Q":case"E":case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":n+="\\"+l,a+=2;continue;default:{let p=e.codePointAt(a+1);if(p>=48&&p<=57||p>=65&&p<=90||p>=97&&p<=122){let C=Y.charCount(p);n+=e.substring(a+1,a+1+C),a+=C+1,s=!0}else{n+="\\";let C=Y.charCount(p);n+=e.substring(a+1,a+1+C),a+=C+1}continue}}}else if(l==="/"){n+="\\/",a+=1,s=!0;continue}else if(l==="["){if(!o&&e[a+1]==="]"){n+="[^\\x00-\\x{10FFFF}]",a+=2,s=!0;continue}if(!o&&e[a+1]==="^"&&e[a+2]==="]"){n+="[\\x00-\\x{10FFFF}]",a+=3,s=!0;continue}o=!0}else if(l==="]")o=!1;else if(!o&&l==="("&&a+2<i&&e[a+1]==="?"&&e[a+2]==="<"&&a+3<i&&!"=!>)".includes(e[a+3])){n+="(?P<",a+=3,s=!0;continue}let B=e.codePointAt(a),h=Y.charCount(B);n+=e.substring(a,a+h),a+=h}const c=s?n:e;return t.length>0?`(?${t})${c}`:c}};const ug=(r,e)=>{const t=r.matchArray();return t.index=r.start(0),t.input=e,t.groups=r.namedGroupsObject(),t};var tt,Ed=(tt=class{static quote(e){return Y.quoteMeta(e)}static quoteReplacement(e,t=!1){return LC.quoteReplacement(e,t)}static translateRegExp(e){return jR.translate(e)}static compile(e,t=0){Y.checkPattern(e),Y.checkFlags(t);let n=e;(t&tt.CASE_INSENSITIVE)!==0&&(n=`(?i)${n}`),(t&tt.DOTALL)!==0&&(n=`(?s)${n}`),(t&tt.MULTILINE)!==0&&(n=`(?m)${n}`);let s=H.PERL;(t&tt.DISABLE_UNICODE_GROUPS)!==0&&(s&=-129),(t&tt.LOOKBEHINDS)!==0&&(s|=H.LOOKBEHIND);const i=new tt(e,t);return i.re2Input=qR.compileImpl(n,s,(t&tt.LONGEST_MATCH)!==0),i}static matches(e,t){return tt.compile(e).testExact(t)}static initTest(e,t,n){if(e==null)throw new Error("pattern is null");if(n==null)throw new Error("re2 is null");const s=new tt(e,t);return s.re2Input=n,s}constructor(e,t){this.patternInput=e,this.flagsInput=t,this.re2Input=null}reset(){this.re2Input.reset()}flags(){return this.flagsInput}pattern(){return this.patternInput}re2(){return this.re2Input}matches(e){return this.testExact(e)}matcher(e){return Y.isByteArray(e)&&(e=As.utf8(e)),new LC(this,e)}test(e){return Y.isByteArray(e)?this.re2Input.matchUTF8(e):this.re2Input.match(e)}testExact(e){const t=Y.isByteArray(e)?ke.fromUTF8(e):ke.fromUTF16(e);return this.re2Input.executeEngine(t,0,H.ANCHOR_BOTH,0)!==null}exec(e){const t=this.matcher(e);return t.find()?ug(t,e):null}split(e,t=0){const n=this.matcher(e),s=[];let i=0,o=0;for(;n.find();){if(o===0&&n.end()===0){o=n.end();continue}if(t>0&&s.length===t-1)break;if(o===n.start()){if(t===0){i+=1,o=n.end();continue}}else for(;i>0;)s.push(""),i-=1;s.push(n.substring(o,n.start())),o=n.end()}if(t===0&&o!==n.inputLength()){for(;i>0;)s.push(""),i-=1;s.push(n.substring(o,n.inputLength()))}return(t!==0||s.length===0&&!(o===n.inputLength()&&o>0))&&s.push(n.substring(o,n.inputLength())),s}*matchAll(e){const t=this.matcher(e);for(;t.find();)yield ug(t,e)}toString(){return this.patternInput}programSize(){return this.re2Input.numberOfInstructions()}groupCount(){return this.re2Input.numberOfCapturingGroups()}namedGroups(){return this.re2Input.namedGroups}equals(e){return this===e?!0:e===null||this.constructor!==e.constructor?!1:this.flagsInput===e.flagsInput&&this.patternInput===e.patternInput}},q(tt,"CASE_INSENSITIVE",Bi.CASE_INSENSITIVE),q(tt,"DOTALL",Bi.DOTALL),q(tt,"MULTILINE",Bi.MULTILINE),q(tt,"DISABLE_UNICODE_GROUPS",Bi.DISABLE_UNICODE_GROUPS),q(tt,"LONGEST_MATCH",Bi.LONGEST_MATCH),q(tt,"LOOKBEHINDS",Bi.LOOKBEHINDS),tt);/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OE{constructor(e,t,n){this.alias=e,this.aggregateType=t,this.fieldPath=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ho="13.3.0";function JR(r){ho=r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qr=new Yu("@firebase/firestore");function Ei(){return qr.logLevel}function KR(r){qr.setLogLevel(r)}function U(r,...e){if(qr.logLevel<=me.DEBUG){const t=e.map(Id);qr.debug(`Firestore (${ho}): ${r}`,...t)}}function $e(r,...e){if(qr.logLevel<=me.ERROR){const t=e.map(Id);qr.error(`Firestore (${ho}): ${r}`,...t)}}function at(r,...e){if(qr.logLevel<=me.WARN){const t=e.map(Id);qr.warn(`Firestore (${ho}): ${r}`,...t)}}function Id(r){if(typeof r=="string")return r;try{return(function(t){return JSON.stringify(t)})(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z(r,e,t){let n="Unexpected state";typeof e=="string"?n=e:t=e,FE(r,n,t)}function FE(r,e,t){let n=`FIRESTORE (${ho}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;if(t!==void 0)try{n+=" CONTEXT: "+JSON.stringify(t)}catch{n+=" CONTEXT: "+t}throw $e(n),new Error(n)}function j(r,e,t,n){let s="Unexpected state";typeof t=="string"?s=t:n=t,r||FE(e,s,n)}function zR(r,e){r||Z(57014,e)}function Q(r,e){return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WR(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=WR(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<t&&(n+=e.charAt(s[i]%62))}return n}}function ce(r,e){return r<e?-1:r>e?1:0}function Sa(r,e){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++){const s=r.charAt(n),i=e.charAt(n);if(s!==i)return MB(s)===MB(i)?ce(s,i):MB(s)?1:-1}return ce(r.length,e.length)}const $R=55296,QR=57343;function MB(r){const e=r.charCodeAt(0);return e>=$R&&e<=QR}function Fi(r,e,t){return r.length===e.length&&r.every(((n,s)=>t(n,e[s])))}function xE(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(e,t){this.comparator=e,this.root=t||_t.EMPTY}insert(e,t){return new Fe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,_t.BLACK,null,null))}remove(e){return new Fe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,_t.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){const e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new jc(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new jc(this.root,e,this.comparator,!1)}getReverseIterator(){return new jc(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new jc(this.root,e,this.comparator,!0)}}class jc{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class _t{constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=n??_t.RED,this.left=s??_t.EMPTY,this.right=i??_t.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,i){return new _t(e??this.key,t??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return _t.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return _t.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,_t.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,_t.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Z(43730,{key:this.key,value:this.value});if(this.right.isRed())throw Z(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw Z(27949);return e+(this.isRed()?0:1)}}_t.EMPTY=null,_t.RED=!0,_t.BLACK=!1;_t.EMPTY=new class{constructor(){this.size=0}get key(){throw Z(57766)}get value(){throw Z(16141)}get color(){throw Z(16727)}get left(){throw Z(29726)}get right(){throw Z(36894)}copy(e,t,n,s,i){return this}insert(e,t,n){return new _t(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e){this.comparator=e,this.data=new Fe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new lg(this.data.getIterator())}getIteratorFrom(e){return new lg(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((n=>{t=t.add(n)})),t}isEqual(e){if(!(e instanceof ve)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new ve(this.comparator);return t.data=e,t}}class lg{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function hi(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class k extends un{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tn="__name__";class yn{constructor(e,t,n){t===void 0?t=0:t>e.length&&Z(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&Z(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return yn.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof yn?e.forEach((n=>{t.push(n)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const i=yn.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return ce(e.length,t.length)}static compareSegments(e,t){const n=yn.isNumericId(e),s=yn.isNumericId(t);return n&&!s?-1:!n&&s?1:n&&s?yn.extractNumericId(e).compare(yn.extractNumericId(t)):Sa(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return kr.fromString(e.substring(4,e.length-2))}}class Be extends yn{construct(e,t,n){return new Be(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new k(S.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((s=>s.length>0)))}return new Be(t)}static emptyPath(){return new Be([])}}const YR=/^[_a-zA-Z][_a-zA-Z0-9]*$/;let Ye=class Ii extends yn{construct(e,t,n){return new Ii(e,t,n)}static isValidIdentifier(e){return YR.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ii.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Tn}static keyField(){return new Ii([Tn])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(n.length===0)throw new k(S.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;s<e.length;){const a=e[s];if(a==="\\"){if(s+1===e.length)throw new k(S.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new k(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=c,s+=2}else a==="`"?(o=!o,s++):a!=="."||o?(n+=a,s++):(i(),s++)}if(i(),o)throw new k(S.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ii(t)}static emptyPath(){return new Ii([])}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(e){this.fields=e,e.sort(Ye.comparator)}static empty(){return new Mt([])}unionWith(e){let t=new ve(Ye.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Mt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Fi(this.fields,e.fields,((t,n)=>t.isEqual(n)))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ms(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function ts(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function yd(r,e){const t=[];for(const n in r)Object.prototype.hasOwnProperty.call(r,n)&&t.push(e(r[n],n,r));return t}function LE(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(e){this.path=e}static fromPath(e){return new z(Be.fromString(e))}static fromName(e){return new z(Be.fromString(e).popFirst(5))}static empty(){return new z(Be.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Be.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Be.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new z(new Be(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wd(r,e,t){if(!t)throw new k(S.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function VE(r,e,t,n){if(e===!0&&n===!0)throw new k(S.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function Bg(r){if(!z.isDocumentKey(r))throw new k(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function hg(r){if(z.isDocumentKey(r))throw new k(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function tc(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function hl(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=(function(n){return n.constructor?n.constructor.name:null})(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":Z(12329,{type:typeof r})}function ge(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new k(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=hl(r);throw new k(S.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}function kE(r,e){if(e<=0)throw new k(S.INVALID_ARGUMENT,`Function ${r}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qe(r,e){const t={typeString:r};return e&&(t.value=e),t}function Zs(r,e){if(!tc(r))throw new k(S.INVALID_ARGUMENT,"JSON must be an object");let t;for(const n in e)if(e[n]){const s=e[n].typeString,i="value"in e[n]?{value:e[n].value}:void 0,o=e[n].optional;if(!(n in r)){if(o)continue;t=`JSON missing required field: '${n}'`;break}const a=r[n];if(s&&typeof a!==s){t=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${n}' field to equal '${i.value}'`;break}}if(t)throw new k(S.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dg=-62135596800,fg=1e6;class we{static now(){return we.fromMillis(Date.now())}static fromDate(e){return we.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*fg);return new we(t,n)}static fromInstant(e){if(!e||typeof e.t!="bigint")throw new k(S.INVALID_ARGUMENT,"Invalid Temporal.Instant object provided.");return we._fromEpochNanoseconds(e.t)}static _fromEpochNanoseconds(e){let t,n;if(e>=0n)t=Number(e/1000000000n),n=Number(e%1000000000n);else{const s=e%1000000000n;s===0n?(t=Number(e/1000000000n),n=0):(t=Number(e/1000000000n-1n),n=Number(s+1000000000n))}return new we(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new k(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new k(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<dg)throw new k(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new k(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/fg}toInstant(){if(typeof Temporal>"u"||!Temporal.Instant)throw new k(S.FAILED_PRECONDITION,"The Temporal object is not available in the current environment.");const e=1000000000n*BigInt(this.seconds)+BigInt(this.nanoseconds);return Temporal.Instant.__PRIVATE_fromEpochNanoseconds(e)}_compareTo(e){return this.seconds===e.seconds?ce(this.nanoseconds,e.nanoseconds):ce(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:we._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Zs(e,we._jsonSchema))return new we(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-dg;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}we._jsonSchemaVersion="firestore/timestamp/1.0",we._jsonSchema={type:Qe("string",we._jsonSchemaVersion),seconds:Qe("number"),nanoseconds:Qe("number")};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ME extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function XR(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new ME("Invalid base64 string: "+i):i}})(e);return new Re(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new Re(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ce(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Re.EMPTY_BYTE_STRING=new Re("");const ZR=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function or(r){if(j(!!r,39018),typeof r=="string"){let e=0;const t=ZR.exec(r);if(j(!!t,46558,{timestamp:r}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:Le(r.seconds),nanos:Le(r.nanos)}}function Le(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function fn(r){return typeof r=="string"?Re.fromBase64String(r):Re.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GE="server_timestamp",UE="__type__",HE="__previous_value__",qE="__local_write_time__";function dl(r){var t,n;return((n=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[UE])==null?void 0:n.stringValue)===GE}function nc(r){const e=r.mapValue.fields[HE];return dl(e)?nc(e):e}function xi(r){const e=or(r.mapValue.fields[qE].timestampValue);return new we(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eP{constructor(e,t,n,s,i,o,a,c,l,B,h,p,C){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=l,this.isUsingEmulator=B,this.apiKey=h,this._customHeaders=p,this.grpcFlowControlWindow=C}}const Na="(default)";class ar{constructor(e,t){this.projectId=e,this.database=t||Na}static empty(){return new ar("","")}get isDefaultDatabase(){return this.database===Na}isEqual(e){return e instanceof ar&&e.projectId===this.projectId&&e.database===this.database}}function tP(r,e){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new k(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ar(r.options.projectId,e)}/**
 * Copyright 2021 M.Vokhmentsev
 *
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(){this.exponent=0,this.i=0n,this.o=0n,this.u=new Array(4).fill(0n),this.l=new Array(6).fill(0n),this.h=new Array(6).fill(0n),this.T=new Array(6).fill(0n),this.P=new Array(12).fill(0n)}static I(e,t){let n=new ae;return n.parse(e,t),n}parse(e,t){t+=e.length-1,this.exponent=0,this.i=0n,this.o=0n;let n=this.T,s=this.R(e,n);if(s==0&&this.isEmpty(n)||(t+=s)<ae.A)return;if(t>ae.V)return void(this.exponent=Number(ae.m));let i=this.p(t,n);this.S(t,i,n)}R(e,t){for(let i=0;i<6;i++)t[i]=0n;let n=0;for(;n<e.length&&e[n]==0;)n+=1;if(n==e.length)return 0;let s=-n;if(e.length-n>ae.v){let i=e[ae.v]>=5,o=new Array(ae.v).fill(0);for(let a=0;a<ae.v;a++)o[a]=e[a+n];i&&(s+=this.D(o)),e=o,n=0}for(let i=e.length-1;i>=n;i--)t[0]|=BigInt(e[i])<<32n,this.C(t);return s}C(e){let t=e.length;for(let n=0;n<t;n++){let s=e[n]%10n;e[n]=e[n]/10n,n+1<t&&(e[n+1]+=s<<32n)}}isEmpty(e){for(let t=0;t<e.length;t++)if(e[t]!=0n)return!1;return!0}D(e){for(let t=e.length-1;t>=0;t--){if(e[t]!=9)return e[t]=e[t]+1,0;e[t]=0}return e[0]=1,1}p(e,t){let n=t[0]<<31n|t[1]>>1n,s=Number(n)/ae.F;return Math.floor(Number(e)*ae.O+this.log2(s))}log2(e){return ae.M*Math.log(e)}S(e,t,n){let s=this.u;this.N(-t,s);let i=this.P;this.B(n,s,i),this.L(i),BigInt(s[0])!=BigInt(-e)&&this.L(i),t+=this.$(i),(t+=ae.U)<=0||(t+=this.k(i),BigInt(t)>=ae.m?this.exponent=Number(ae.m):(this.exponent=Number(t),this.i=(i[0]<<32n)+i[1]&0xffffffffffffffffn,this.o=(i[2]<<32n)+i[3]&0xffffffffffffffffn))}N(e,t){if(e==0)return void this.q(ae.K[0],t);let n=ae.K;e<0&&(e=-e,n=ae.W);let s=ae.G,i=32,o=!0;for(;e>0;)e>=s&&(o?(this.q(n[i],t),o=!1):this.j(t,n[i],t),e-=s),i-=1,s*=.5}q(e,t){for(let n=0;n<t.length;n++)t[n]=e[n]}j(e,t,n){this.H(e,t,this.P);let s=this.J(this.P);this.Y(this.P,n),n[0]=e[0]+t[0]+BigInt(s)}H(e,t,n){for(let s=0;s<n.length;s++)n[s]=0n;this.Z(e,this.l),this.Z(t,this.h);for(let s=5;s>=0;s--)for(let i=5;i>=0;i--){let o=this.l[s]*this.h[i];n[i+s+1]=n[i+s+1]+(o&ae.X)&0xffffffffffffffffn,n[i+s]=n[i+s]+(o>>32n)&0xffffffffffffffffn}for(let s=11;s>=1;s--)n[s-1]=n[s-1]+(n[s]>>32n)&0xffffffffffffffffn,n[s]&=ae.X}J(e){let t=0;for(;this.ee(e);)this.L(e),t-=1;return t}ee(e){if(e[0]<0x19999999n)return!0;if(e[0]>0x19999999n)return!1;for(let t=1;t<e.length;t++){if(e[t]<0x99999999n)return!0;if(e[t]>0x99999999n)return!1}return!1}B(e,t,n){for(let o=0;o<n.length;o++)n[o]=0n;let s=this.h;this.Z(t,s);let i=e.length;for(let o=i-1;o>=0;o--)for(let a=i-1;a>=0;a--){let c=e[o]*s[a];n[a+o+1]=n[a+o+1]+(c&ae.X)&0xffffffffffffffffn,n[a+o]=n[a+o]+(c>>32n)&0xffffffffffffffffn}for(let o=11;o>=1;o--)n[o-1]=n[o-1]+(n[o]>>32n)&0xffffffffffffffffn,n[o]&=ae.X}L(e){let t=e.length-1;e[0]&=ae.X,e[t]*=10n;for(let n=t-1;n>=0;n--)e[n]=10n*e[n]+(e[n+1]>>32n)&0xffffffffffffffffn,e[n+1]&=ae.X}$(e){let t=31-ae.te(e[0]);return t!=0&&this.ne(e,t),t}k(e){return this.re(e,5,100n),this.re(e,4,0x80000000n),(e[0]&ae.ie<<1n)!=0n?(this.ne(e,1),1):0}Y(e,t){t[1]=(e[0]<<32n)+e[1],t[2]=(e[2]<<32n)+e[3],t[3]=(e[4]<<32n)+e[5]}Z(e,t){t[0]=e[1]>>32n,t[1]=e[1]&ae.X,t[2]=e[2]>>32n,t[3]=e[2]&ae.X,t[4]=e[3]>>32n,t[5]=e[3]&ae.X}ne(e,t){let n=e.length-1,s=BigInt(32-Math.abs(t));if(t>0){let i=BigInt(t);for(let o=n+1-1;o>=1;o--)e[o]=e[o]>>i|e[o-1]<<s&ae.X;e[0]=e[0]>>i}else if(t<0){let i=BigInt(-t);e[0]=0xffffffffffffffffn&(e[0]<<i|e[1]>>s);for(let o=1;o<n;o++)e[o]=0xffffffffffffffffn&(e[o]<<i&ae.X|e[o+1]>>s);e[n]=e[n]<<i&ae.X}}re(e,t,n){let s=t;e[s]=e[s]+n&0xffffffffffffffffn;for(let i=s+1-1;i>=1&&(e[i]&ae.ie)!=0n;i--)e[i]&=ae.X,e[i-1]+=1n}static te(e){let t=Number(e>>32n);return t==0?32+Math.clz32(Number(BigInt.asUintN(32,e))):Math.clz32(t)}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Bt,Di,uh,au,cu,na;ae.v=59,ae.V=646456993,ae.A=-646457032,ae.F=0xccccccccccccd00,ae.se=0x8000000000000000n,ae.G=2147483648,ae.X=0x00000000ffffffffn,ae.ie=0xffffffff00000000n,ae.O=Math.log(10)/Math.log(2),ae.M=1/Math.log(2),ae.U=2147483647,ae.m=0xffffffffn,ae.K=[[1n,0x1999999999999999n,0x9999999999999999n,0x999999999999999an],[1n,0x3333333333333333n,0x3333333333333333n,0x3333333333333334n],[1n,0x6666666666666666n,0x6666666666666666n,0x6666666666666667n],[2n,0x28f5c28f5c28f5c2n,0x8f5c28f5c28f5c28n,0xf5c28f5c28f5c290n],[3n,0x4189374bc6a7ef9dn,0xb22d0e5604189374n,0xbc6a7ef9db22d0e6n],[5n,0xa7c5ac471b478423n,0x0fcf80dc33721d53n,0xcddd6e04c0592104n],[10n,0x6df37f675ef6eadfn,0x5ab9a2072d44268dn,0x97df837e6748956en],[20n,0x2f394219248446ban,0xa23d2ec729af3d61n,0x0607aa0167dd94cbn],[39n,0x571cbec554b60dbbn,0xd5f64baf0506840dn,0x451db70d5904029bn],[78n,0x1da48ce468e7c702n,0x6520247d3556476dn,0x1469caf6db224cfan],[155n,0x2252f0e5b39769dcn,0x9ae2eea30ca3ade0n,0xeeaa3c08dfe84e30n],[309n,0x2e055c9a3f6ba793n,0x16583a816eb60a59n,0x22c4b0826cf1ebf7n],[617n,0x52bb45e9cf23f17fn,0x7688c07606e50364n,0xb34479aa9d449a57n],[1234n,0x1abc81c8ff5f846cn,0x8f5e3c9853e38c97n,0x45060097f3bf9296n],[2467n,0x1bec53b510daa7b4n,0x48369ed77dbb0eb1n,0x3b05587b2187b41en],[4933n,0x1e75063a5ba91326n,0x8abfb8e460016ae3n,0x28008702d29e8a3cn],[9865n,0x243c5d8bb5c5fa55n,0x40c6d248c5881915n,0x4c0fd99fd5befc22n],[19729n,0x334a5570c3f4ef3cn,0xa13c36c43f979c90n,0xda7ac473555fb7a8n],[39457n,0x66c304445dd98f3bn,0xa8c293a20e47a41bn,0x4c5b03dc12604964n],[78914n,0x293ffbf5fb028cc4n,0x89d3e5ff44238406n,0x369a339e1bfe8c9bn],[157827n,0x427792fbb68e5d20n,0x7b297cd9fc154b62n,0xf09142114aa9a20cn],[315653n,0xac92bc65ad5c08fcn,0x00beeb115a566c19n,0x4ba882d8a4622437n],[631306n,0x745581440f92e80en,0x4da822cf7f896f41n,0x509d598678164ecdn],[1262612n,0x34dd99b4c69523a5n,0x64bc2e8f0d8b1044n,0xb03b1c96da5dd349n],[2525223n,0x6d2bbea9d6d25a08n,0xa0a4606a88e96b70n,0x182063bbc2fe8520n],[5050446n,0x2e8e47d63bfdd6e3n,0x2b55fa8976eaa3e9n,0x1a6b9d3086412a73n],[10100891n,0x54aa68efa1d719dfn,0xd8505806612c5c8fn,0xad068837fee8b43an],[20201782n,0x1c00464ccb7bae77n,0x9e3877784c77982cn,0xd94af3b61717404fn],[40403563n,0x1ea099c8be2b6cd0n,0x8bfb6d539fa50466n,0x6d3bc37e69a84218n],[80807125n,0x24a457f466ce8d18n,0xf2c8f3b81bc6bb59n,0xa78c757692e02d49n],[161614249n,0x347256677aba6b53n,0x3fbf90d30611a67cn,0x1e039d87e0bdb32bn],[323228497n,0x6b727daf0fd3432an,0x71f71121f9e4200fn,0x8fcd9942d486c10cn],[646456994n,0x2d18e84484d91f78n,0x4079bfe7829dec6fn,0x21551643e365abc6n]],ae.W=[[1n,0x1999999999999999n,0x9999999999999999n,0x999999999999999an],[0n,0x8000000000000000n,0x0000000000000000n,0x0000000000000000n],[0n,0x4000000000000000n,0x0000000000000000n,0x0000000000000001n],[-1n,0xa000000000000000n,0x0000000000000000n,0x0000000000000000n],[-2n,0x6400000000000000n,0x0000000000000000n,0x0000000000000000n],[-4n,0x2710000000000000n,0x0000000000000000n,0x0000000000000001n],[-9n,0x3b9aca0000000000n,0x0000000000000000n,0x0000000000000001n],[-19n,0x8ac7230489e80000n,0x0000000000000000n,0x0000000000000000n],[-38n,0x4b3b4ca85a86c47an,0x098a224000000000n,0x0000000000000001n],[-77n,0xdd15fe86affad912n,0x49ef0eb713f39eben,0xaa987b6e6fd2a002n],[-154n,0xbeeefb584aff8603n,0xaafb550ffacfd8fan,0x5ca47e4f88d45371n],[-308n,0x8e679c2f5e44ff8fn,0x570f09eaa7ea7648n,0x5961db50c6d2b888n],[-616n,0x4f371b3399fc2ab0n,0x8170041c9feb05aan,0xc7c343447c75bcf6n],[-1233n,0xf51e928179013fd3n,0xde4bd12cde4d985cn,0x4a573ca6f94bff14n],[-2466n,0xeab388127bccaff7n,0x1667639142b9fbaen,0x775ec9995e1039fbn],[-4932n,0xd72cb2a95c7ef6ccn,0xe81bf1e825ba7515n,0xc2feb521d6cb5dcdn],[-9864n,0xb4dc1be6604502dcn,0xd491079b8eef6535n,0x578d3965d24de84dn],[-19728n,0x7fc6447bee60ea43n,0x2548da5c8b125b27n,0x5f42d1142f41d349n],[-39456n,0x3fc65180f88af8fbn,0x6a6915f383349413n,0x063c3708b6ceb291n],[-78913n,0x9ee0197c8dcd55bfn,0x2b2b9b942c38f4a2n,0x0f8ba634e9c706aen],[-157826n,0x629963a25b8b2d79n,0xd00b9d2286f70876n,0xe97004700c3644fcn],[-315652n,0x25f9cc308ceef4f3n,0x40f19543911a4546n,0xa2cd389452cfc366n],[-631305n,0x385597b0d47e76b8n,0x1b9f67e103bf2329n,0xc3119848595985f7n],[-1262611n,0x7bf795d276c12f66n,0x66a61d62a446659an,0xa1a4d73bebf093d5n],[-2525222n,0x3c07d96ab1ed7799n,0xcb7355c22cc05ac0n,0x4ffc0ab73b1f6a49n],[-5050445n,0x8cc4cd8c3edefb9an,0x6c8ff86a90a97e0cn,0x166cfddbf98b71bfn],[-10100890n,0x4d67d81cc88e1228n,0x1d7cfb06666b79b3n,0x7b916728aaa4e70dn],[-20201781n,0xea0c55494e7a552dn,0xb88cb9484bb86c61n,0x8d44893c610bb7dfn],[-40403562n,0xd5fa8c821ec0c24an,0xa80e46e764e0f8b0n,0xa7276bfa432fac7en],[-80807124n,0xb2dae307426f6791n,0xc970b82f58b12918n,0x0472592f7f39190en],[-161614248n,0x7cf51edd8a15f1c9n,0x656dab3498f8e697n,0x12daa2a80e53c807n],[-323228496n,0x3cfe609ab5883c50n,0xbec8b5d22b198871n,0xe18477703b4622b4n],[-646456993n,0x9152447b9d7cda9an,0x3b4d3f6110d77aadn,0xfa81bad1c394adb4n]];class ie{constructor(e,t,n,s){this.negative=e,this._e=t,this.i=n,this.o=s}exponent(){return this._e-ae.U}oe(){return this._e===0&&this.i===0n&&this.o===0n}ae(){return this._e===mt(ie,Bt,"f",Di)&&this.i===0n&&this.o===0n}isNaN(){return this._e===mt(ie,Bt,"f",Di)&&!(this.i===0n&&this.o===0n)}compareTo(e){if(this.isNaN())return e.isNaN()?0:1;if(e.isNaN())return-1;let t,n;if(this.negative){if(!e.negative)return-1;t=1,n=-1}else{if(e.negative)return 1;t=-1,n=1}return this._e<e._e?t:this._e>e._e?n:this.i<e.i?t:this.i>e.i?n:this.o<e.o?t:this.o>e.o?n:0}debug(){return(this.negative?"+":"-")+mt(ie,Bt,"m",uh).call(ie,this.i)+mt(ie,Bt,"m",uh).call(ie,this.o)+"*2^"+this.exponent()}static fromNumber(e){if(isNaN(e))return ie.NaN;if(!isFinite(e))return e<0?ie.ue:ie.ce;if(e===0)return Math.sign(1/e)>0?ie.le:ie.Ee;const t=new DataView(new ArrayBuffer(8));t.setFloat64(0,e);const n=t.getBigUint64(0);let s=BigInt.asUintN(64,n<<12n),i=2047&Number(n>>52n);if(i===0){const o=ae.te(s);s=o<63?s<<BigInt(o+1):0n,i=-o}return new ie(e<0,mt(ie,Bt,"m",na).call(ie,i-1023),s,0n)}static fromString(e){if(e==="NaN")return ie.NaN;if(e==="-Infinity")return ie.ue;if(e==="Infinity"||e==="+Infinity")return ie.ce;const t=new Array(e.length).fill(0);let n=0,s=0,i=0,o=!1;for(e[n]==="-"?(o=!0,n++):e[n]==="+"&&n++;mt(ie,Bt,"m",au).call(ie,e,n);)t[s++]=mt(ie,Bt,"m",cu).call(ie,e,n++);if(e[n]==="."){const c=++n;for(;mt(ie,Bt,"m",au).call(ie,e,n);)t[s++]=mt(ie,Bt,"m",cu).call(ie,e,n++);i=c-n}if(e[n]==="e"||e[n]==="E"){let c=0;n++;let l=1;e[n]==="-"?(l=-1,n++):e[n]==="+"&&n++;const B=n;for(;mt(ie,Bt,"m",au).call(ie,e,n);)if(c=10*c+mt(ie,Bt,"m",cu).call(ie,e,n++),n-B>9)throw new Error("Exponent too large "+e);if(n===B)throw new Error("Invalid number "+e);i+=c*l}if(s===0||n!==e.length)throw new Error("Invalid number "+e);const a=ae.I(t.slice(0,s),i);return new ie(o,a.exponent,a.i,a.o)}}Bt=ie,uh=function(e){return e.toString(16).padStart(16,"0")},au=function(e,t){const n=e.codePointAt(t);return n!==void 0&&n>=48&&n<=57},cu=function(e,t){return e.codePointAt(t)-48},na=function(e){return e+ae.U},Di={value:Number(ae.m)},ie.le=new ie(!1,0,0n,0n),ie.Ee=new ie(!0,0,0n,0n),ie.NaN=new ie(!1,mt(ie,Bt,"f",Di),1n<<63n,0n),ie.ue=new ie(!0,mt(ie,Bt,"f",Di),0n,0n),ie.ce=new ie(!1,mt(ie,Bt,"f",Di),0n,0n),new ie(!0,mt(ie,Bt,"m",na).call(ie,63),0n,0n),new ie(!1,mt(ie,Bt,"m",na).call(ie,0),0n,0n),new ie(!0,mt(ie,Bt,"m",na).call(ie,0),0n,0n);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr=-1;function rc(r){return r==null}function Li(r){return r===0&&1/r==-1/0}function jE(r){return typeof r=="number"&&Number.isInteger(r)&&!Li(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}function lh(r){return typeof r=="string"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fl="__type__",pl="__vector__",Gs="value",nP="server_timestamp",Dd="__min__",sc="__max__",An="__regex__",Vi="pattern",ki="options",Us="__oid__",ns="__int__",cr="__decimal128__",Zn="__request_timestamp__",Oa="seconds",Fa="increment",Mi="__binary__",ur={nullValue:"NULL_VALUE"},bs={mapValue:{fields:{__type__:{stringValue:sc}}}},JE={mapValue:{fields:{[fl]:{stringValue:pl},[Gs]:{arrayValue:{}}}}},Td={mapValue:{fields:{[Dd]:{nullValue:"NULL_VALUE"}}}},Ad={mapValue:{fields:{[sc]:{nullValue:"NULL_VALUE"}}}},KE={mapValue:{fields:{[Us]:{stringValue:""}}}},zE={mapValue:{fields:{[Zn]:{mapValue:{fields:{[Oa]:{integerValue:0},[Fa]:{integerValue:0}}}}}}},WE={mapValue:{fields:{[An]:{mapValue:{fields:{[Vi]:{stringValue:""},[ki]:{stringValue:""}}}}}}};var oe,tn;(tn=oe||(oe={})).he="regexValue",tn.Te="bsonObjectIdValue",tn.Pe="int32Value",tn.Ie="decimal128Value",tn.Re="bsonTimestampValue",tn.Ae="bsonBinaryValue",tn.Ve="minKeyValue",tn.de="maxKeyValue",tn.fe="maxValue",tn.me="vectorValue",tn.pe="serverTimestampValue",tn.ge="regularMapValue";const pg={[pl]:oe.me,[sc]:oe.fe,[nP]:oe.pe},$E={[An]:oe.he,[Us]:oe.Te,[ns]:oe.Pe,[cr]:oe.Ie,[Zn]:oe.Re,[Mi]:oe.Ae,[Dd]:oe.Ve,[sc]:oe.de},rP=new Set(Object.values($E)),Kt={booleanValue:!0},ft={booleanValue:!1};function rt(r){if("nullValue"in r)return 0;if("booleanValue"in r)return 2;if("integerValue"in r||"doubleValue"in r)return 3;if("timestampValue"in r)return 4;if("stringValue"in r)return 7;if("bytesValue"in r)return 8;if("referenceValue"in r)return 9;if("geoPointValue"in r)return 11;if("arrayValue"in r)return 13;if(!("mapValue"in r))return Z(28295,{value:r});switch(ic(r)){case oe.pe:return 6;case oe.fe:return 9007199254740991;case oe.me:return 14;case oe.he:return 12;case oe.Te:return 10;case oe.Pe:case oe.Ie:return 3;case oe.Re:return 5;case oe.Ae:return 8;case oe.Ve:return 1;case oe.de:return 16;default:return 15}}function an(r,e,t){if(r===e)return!0;const n=rt(r);if(n!==rt(e))return!1;switch(n){case 0:case 9007199254740991:case 16:case 1:return!0;case 2:return r.booleanValue===e.booleanValue;case 6:return xi(r).isEqual(xi(e));case 4:return(function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const a=or(i.timestampValue),c=or(o.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos})(r,e);case 7:return r.stringValue===e.stringValue;case 8:return(function(i,o){return ZE(i,o)===0})(r,e);case 9:return r.referenceValue===e.referenceValue;case 11:return(function(i,o){return Le(i.geoPointValue.latitude)===Le(o.geoPointValue.latitude)&&Le(i.geoPointValue.longitude)===Le(o.geoPointValue.longitude)})(r,e);case 3:return(function(i,o,a){if(cn(i)&&cn(o))return YE(i,o)===0;if("integerValue"in i&&"integerValue"in o||Jr(i)&&Jr(o))return La(i)===La(o);let c,l;if("doubleValue"in i&&"doubleValue"in o)c=Le(i.doubleValue),l=Le(o.doubleValue);else{if(!(a!=null&&a.ye))return!1;c=Le(i.integerValue??i.doubleValue),l=Le(o.integerValue??o.doubleValue)}return c===l?!!(a!=null&&a.we)||Li(c)===Li(l):!!(a===void 0||a.be)&&isNaN(c)&&isNaN(l)})(r,e,t);case 13:return Fi(r.arrayValue.values||[],e.arrayValue.values||[],((s,i)=>an(s,i,t)));case 14:case 15:return(function(i,o,a){const c=i.mapValue.fields||{},l=o.mapValue.fields||{};if(Ms(c)!==Ms(l))return!1;for(const B in c)if(c.hasOwnProperty(B)&&(l[B]===void 0||!an(c[B],l[B],a)))return!1;return!0})(r,e,t);case 5:return XE(r,e)===0;case 12:return eI(r,e)===0;case 10:return tI(r,e)===0;default:return Z(52216,{left:r})}}function xa(r,e){return(r.values||[]).find((t=>an(t,e)))!==void 0}function vt(r,e){if(r===e)return 0;const t=rt(r),n=rt(e);if(t!==n)return ce(t,n);switch(t){case 0:case 1:case 16:case 9007199254740991:return 0;case 2:return ce(r.booleanValue,e.booleanValue);case 3:return Va(r,e);case 4:return gg(r.timestampValue,e.timestampValue);case 6:return gg(xi(r),xi(e));case 7:return Sa(r.stringValue,e.stringValue);case 8:return ZE(r,e);case 9:return(function(i,o){const a=i.split("/"),c=o.split("/");for(let l=0;l<a.length&&l<c.length;l++){const B=ce(a[l],c[l]);if(B!==0)return B}return ce(a.length,c.length)})(r.referenceValue,e.referenceValue);case 11:return(function(i,o){const a=ce(Le(i.latitude),Le(o.latitude));return a!==0?a:ce(Le(i.longitude),Le(o.longitude))})(r.geoPointValue,e.geoPointValue);case 13:return mg(r.arrayValue,e.arrayValue);case 14:return(function(i,o){var p,C,m,D;const a=i.fields||{},c=o.fields||{},l=(p=a[Gs])==null?void 0:p.arrayValue,B=(C=c[Gs])==null?void 0:C.arrayValue,h=ce(((m=l==null?void 0:l.values)==null?void 0:m.length)||0,((D=B==null?void 0:B.values)==null?void 0:D.length)||0);return h!==0?h:mg(l,B)})(r.mapValue,e.mapValue);case 15:return(function(i,o){if(i===bs.mapValue&&o===bs.mapValue)return 0;if(i===bs.mapValue)return 1;if(o===bs.mapValue)return-1;const a=i.fields||{},c=Object.keys(a),l=o.fields||{},B=Object.keys(l);c.sort(),B.sort();for(let h=0;h<c.length&&h<B.length;++h){const p=Sa(c[h],B[h]);if(p!==0)return p;const C=vt(a[c[h]],l[B[h]]);if(C!==0)return C}return ce(c.length,B.length)})(r.mapValue,e.mapValue);case 5:return XE(r,e);case 12:return eI(r,e);case 10:return tI(r,e);default:throw Z(23264,{Se:t})}}function La(r){let e;return e=Jr(r)?r.mapValue.fields[ns].integerValue:r.integerValue||r.doubleValue,Le(e)}function QE(r){return r.mapValue.fields[cr].stringValue}function Va(r,e){if(cn(r)||cn(e))return YE(r,e);const t=La(r),n=La(e);return isNaN(t)?isNaN(n)?0:-1:isNaN(n)?1:ce(t,n)}function YE(r,e){const t=Cg(r),n=Cg(e);return t.oe()&&n.oe()?0:t.isNaN()?n.isNaN()?0:-1:n.isNaN()?1:t.compareTo(n)}function Cg(r){return cn(r)?ie.fromString(QE(r)):ie.fromNumber(La(r))}function gg(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return ce(r,e);const t=or(r),n=or(e),s=ce(t.seconds,n.seconds);return s!==0?s:ce(t.nanos,n.nanos)}function mg(r,e){const t=r.values||[],n=e.values||[];for(let s=0;s<t.length&&s<n.length;++s){const i=vt(t[s],n[s]);if(i!==void 0&&i!==0)return i}return ce(t.length,n.length)}function XE(r,e){var a,c,l,B,h,p,C,m,D,N,G,J;const t=(l=(c=(a=r.mapValue.fields)==null?void 0:a[Zn].mapValue)==null?void 0:c.fields)==null?void 0:l[Oa],n=(p=(h=(B=e.mapValue.fields)==null?void 0:B[Zn].mapValue)==null?void 0:h.fields)==null?void 0:p[Oa],s=(D=(m=(C=r.mapValue.fields)==null?void 0:C[Zn].mapValue)==null?void 0:m.fields)==null?void 0:D[Fa],i=(J=(G=(N=e.mapValue.fields)==null?void 0:N[Zn].mapValue)==null?void 0:G.fields)==null?void 0:J[Fa],o=Va(t,n);return o!==0?o:Va(s,i)}function _g(r){var a;if("bytesValue"in r)return{subtype:0,bytes:fn(r.bytesValue)};const e=(a=r.mapValue)==null?void 0:a.fields,t=e==null?void 0:e[Mi],n=t==null?void 0:t.bytesValue;if(!n)throw new Error("Received incorrect value for BsonBinaryData");const s=fn(n).toUint8Array();if(s.length===0)throw new Error("Received empty bytesValue for BsonBinaryData");const i=s[0],o=s.slice(1);return{subtype:i,bytes:Re.fromUint8Array(o)}}function ZE(r,e){const t=_g(r),n=_g(e);return t.subtype!==n.subtype?t.subtype<n.subtype?-1:1:t.bytes.compareTo(n.bytes)}function eI(r,e){var l,B,h,p,C,m,D,N,G,J,te,he,de,fe,A,I;const t=r.mapValue.fields,n=((p=(h=(B=(l=t==null?void 0:t[An])==null?void 0:l.mapValue)==null?void 0:B.fields)==null?void 0:h[Vi])==null?void 0:p.stringValue)??"",s=((N=(D=(m=(C=t==null?void 0:t[An])==null?void 0:C.mapValue)==null?void 0:m.fields)==null?void 0:D[ki])==null?void 0:N.stringValue)??"",i=e.mapValue.fields,o=((he=(te=(J=(G=i==null?void 0:i[An])==null?void 0:G.mapValue)==null?void 0:J.fields)==null?void 0:te[Vi])==null?void 0:he.stringValue)??"",a=((I=(A=(fe=(de=i==null?void 0:i[An])==null?void 0:de.mapValue)==null?void 0:fe.fields)==null?void 0:A[ki])==null?void 0:I.stringValue)??"",c=Sa(n,o);return c!==0?c:ce(s,a)}function tI(r,e){var t,n,s,i;return Sa(((n=(t=r.mapValue.fields)==null?void 0:t[Us])==null?void 0:n.stringValue)??"",((i=(s=e.mapValue.fields)==null?void 0:s[Us])==null?void 0:i.stringValue)??"")}function Gi(r){return Bh(r)}function Bh(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(t){const n=or(t);return`time(${n.seconds},${n.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(t){return fn(t).toBase64()})(r.bytesValue):"referenceValue"in r?(function(t){return z.fromName(t).toString()})(r.referenceValue):"geoPointValue"in r?(function(t){return`geo(${t.latitude},${t.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(t){let n="[",s=!0;for(const i of t.values||[])s?s=!1:n+=",",n+=Bh(i);return n+"]"})(r.arrayValue):"mapValue"in r?(function(t){const n=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of n)i?i=!1:s+=",",s+=`${o}:${Bh(t.fields[o])}`;return s+"}"})(r.mapValue):Z(61005,{value:r})}function bu(r){switch(rt(r)){case 0:case 2:return 4;case 3:return cn(r)?16:8;case 4:case 11:return 16;case 6:const e=nc(r);return e?16+bu(e):16;case 7:return 2*r.stringValue.length;case 8:return"bytesValue"in r?fn(r.bytesValue).approximateByteSize():Eg(r.mapValue);case 9:return r.referenceValue.length;case 13:return(function(n){return(n.values||[]).reduce(((s,i)=>s+bu(i)),0)})(r.arrayValue);case 14:case 15:case 12:case 10:case 5:case 1:case 16:return Eg(r.mapValue);default:throw Z(13486,{value:r})}}function Eg(r){let e=0;return ts(r.fields,((t,n)=>{e+=t.length+bu(n)})),e}function jr(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function bn(r){return!!r&&"integerValue"in r}function vn(r){return!!r&&"doubleValue"in r}function cn(r){var t;if(!((t=r.mapValue)!=null&&t.fields))return!1;const e=r.mapValue.fields;return Ms(e)===1&&e[cr]&&!!e[cr].stringValue}function Jr(r){var t,n;if(!((t=r.mapValue)!=null&&t.fields))return!1;const e=r.mapValue.fields;return Ms(e)===1&&((n=e[ns])==null?void 0:n.integerValue)!==void 0}function lr(r){return bn(r)||vn(r)||!!r&&Jr(r)||!!r&&cn(r)}function Kr(r){return!!r&&"arrayValue"in r}function Xt(r){return!!r&&"nullValue"in r}function pt(r){return!(!vn(r)||!isNaN(Number(r.doubleValue)))||!(!cn(r)||QE(r)!=="NaN")}function Fs(r){return!!r&&"mapValue"in r}function ic(r){var n,s;if(!((n=r.mapValue)!=null&&n.fields))return oe.ge;const e=r.mapValue.fields,t=(s=e[fl])==null?void 0:s.stringValue;if(t&&pg[t])return pg[t];if(Ms(e)===1){const i=Object.keys(e);return $E[i[0]]??oe.ge}return oe.ge}function hh(r){var t,n;return((n=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[fl])==null?void 0:n.stringValue)===pl}function dh(r){var e,t;return(t=(((e=r==null?void 0:r.mapValue)==null?void 0:e.fields)||{})[Gs])==null?void 0:t.arrayValue}function Ba(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const e={mapValue:{fields:{}}};return ts(r.mapValue.fields,((t,n)=>e.mapValue.fields[t]=Ba(n))),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ba(r.arrayValue.values[t]);return e}return{...r}}function sP(r){if("nullValue"in r)return ur;if("booleanValue"in r)return{booleanValue:!1};if("integerValue"in r||"doubleValue"in r)return{doubleValue:NaN};if("timestampValue"in r)return{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}};if("stringValue"in r)return{stringValue:""};if("bytesValue"in r)return{bytesValue:""};if("referenceValue"in r)return jr(ar.empty(),z.empty());if("geoPointValue"in r)return{geoPointValue:{latitude:-90,longitude:-180}};if("arrayValue"in r)return{arrayValue:{}};if(!("mapValue"in r))return Z(35942,{value:r});switch(ic(r)){case oe.me:return JE;case oe.Te:return KE;case oe.Re:return zE;case oe.Ae:return{bytesValue:""};case oe.he:return WE;case oe.Pe:case oe.Ie:return{doubleValue:NaN};case oe.Ve:return Td;case oe.de:return Ad;default:return{mapValue:{}}}}function iP(r){if("nullValue"in r)return Td;if("booleanValue"in r)return{doubleValue:NaN};if("integerValue"in r||"doubleValue"in r)return{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}};if("timestampValue"in r)return zE;if("stringValue"in r)return{bytesValue:""};if("bytesValue"in r)return jr(ar.empty(),z.empty());if("referenceValue"in r)return KE;if("geoPointValue"in r)return WE;if("arrayValue"in r)return JE;if(!("mapValue"in r))return Z(61959,{value:r});switch(ic(r)){case oe.me:return{mapValue:{}};case oe.Te:return{geoPointValue:{latitude:-90,longitude:-180}};case oe.Re:return{stringValue:""};case oe.Ae:return jr(ar.empty(),z.empty());case oe.he:return{arrayValue:{}};case oe.Pe:case oe.Ie:return{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}};case oe.Ve:return{booleanValue:!1};case oe.de:return bs;default:return Ad}}function Ig(r,e){const t=vt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function yg(r,e){const t=vt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(e){this.value=e}static empty(){return new it({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Fs(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ba(t)}setAll(e){let t=Ye.emptyPath(),n={},s=[];e.forEach(((o,a)=>{if(!t.isImmediateParentOf(a)){const c=this.getFieldsMap(t);this.applyChanges(c,n,s),n={},s=[],t=a.popLast()}o?n[a.lastSegment()]=Ba(o):s.push(a.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){const t=this.field(e.popLast());Fs(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return an(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];Fs(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){ts(t,((s,i)=>e[s]=i));for(const s of n)delete e[s]}clone(){return new it(Ba(this.value))}}function nI(r){const e=[];return ts(r.fields,((t,n)=>{const s=new Ye([t]);if(Fs(n)&&!(function(o){return rP.has(ic(o))})(n)){const i=nI(n.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new Mt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bd(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Li(e)?"-0":e}}function bi(r){return{integerValue:""+r}}function ei(r,e,t){return jE(e)?bi(e):bd(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cl{constructor(){this._=void 0}}function oP(r,e,t){return r instanceof Ui?(function(s,i){const o={fields:{[UE]:{stringValue:GE},[qE]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&dl(i)&&(i=nc(i)),i&&(o.fields[HE]=i),{mapValue:o}})(t,e):r instanceof Hs?sI(r,e):r instanceof qs?iI(r,e):r instanceof js?(function(s,i){const o=rI(s,i),a=wg(o)+wg(s.xe);return cn(o)||cn(s.xe)?{mapValue:{fields:{[cr]:{stringValue:a.toString()}}}}:Jr(o)?vn(s.xe)?{doubleValue:a}:bn(s.xe)?{integerValue:a.toString()}:{mapValue:{fields:{[ns]:bi(a)}}}:bn(o)&&(bn(s.xe)||Jr(s.xe))?bi(a):bd(s.serializer,a)})(r,e):r instanceof Hi?(function(s,i){return!lr(i)||pt(s.xe)?s.xe:pt(i)?i:Va(s.xe,i)<0?s.xe:i})(r,e):r instanceof qi?(function(s,i){return!lr(i)||pt(s.xe)?s.xe:pt(i)?i:Va(s.xe,i)>0?s.xe:i})(r,e):void 0}function aP(r,e,t){return r instanceof Hs?sI(r,e):r instanceof qs?iI(r,e):t}function rI(r,e){return r instanceof js?lr(e)?e:{integerValue:0}:null}class Ui extends Cl{}class Hs extends Cl{constructor(e){super(),this.elements=e}}function sI(r,e){const t=oI(e);for(const n of r.elements)t.some((s=>an(s,n)))||t.push(n);return{arrayValue:{values:t}}}class qs extends Cl{constructor(e){super(),this.elements=e}}function iI(r,e){let t=oI(e);for(const n of r.elements)t=t.filter((s=>!an(s,n)));return{arrayValue:{values:t}}}class vd extends Cl{constructor(e,t){super(),this.serializer=e,this.xe=t}}class js extends vd{}class Hi extends vd{}class qi extends vd{}function wg(r){return bn(r)?Le(r.integerValue):vn(r)?Le(r.doubleValue):Jr(r)?Le(r.mapValue.fields[ns].integerValue):cn(r)?parseFloat(r.mapValue.fields[cr].stringValue):0}function oI(r){return Kr(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti{constructor(e,t){this.field=e,this.transform=t}}function cP(r,e){return r.field.isEqual(e.field)&&(function(n,s){return n instanceof Hs&&s instanceof Hs||n instanceof qs&&s instanceof qs?Fi(n.elements,s.elements,an):n instanceof js&&s instanceof js||n instanceof Hi&&s instanceof Hi||n instanceof qi&&s instanceof qi?an(n.xe,s.xe):n instanceof Ui&&s instanceof Ui})(r.transform,e.transform)}class uP{constructor(e,t){this.version=e,this.transformResults=t}}class qe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new qe}static exists(e){return new qe(void 0,e)}static updateTime(e){return new qe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function uu(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class gl{}function aI(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new po(r.key,qe.none()):new fo(r.key,r.data,qe.none());{const t=r.data,n=it.empty();let s=new ve(Ye.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?n.delete(i):n.set(i,o),s=s.add(i)}return new pr(r.key,n,new Mt(s.toArray()),qe.none())}}function lP(r,e,t){r instanceof fo?(function(s,i,o){const a=s.value.clone(),c=Tg(s.fieldTransforms,i,o.transformResults);a.setAll(c),i.convertToFoundDocument(o.version,a).setHasCommittedMutations()})(r,e,t):r instanceof pr?(function(s,i,o){if(!uu(s.precondition,i))return void i.convertToUnknownDocument(o.version);const a=Tg(s.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(cI(s)),c.setAll(a),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(r,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function ha(r,e,t,n){return r instanceof fo?(function(i,o,a,c){if(!uu(i.precondition,o))return a;const l=i.value.clone(),B=Ag(i.fieldTransforms,c,o);return l.setAll(B),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null})(r,e,t,n):r instanceof pr?(function(i,o,a,c){if(!uu(i.precondition,o))return a;const l=Ag(i.fieldTransforms,c,o),B=o.data;return B.setAll(cI(i)),B.setAll(l),o.convertToFoundDocument(o.version,B).setHasLocalMutations(),a===null?null:a.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((h=>h.field)))})(r,e,t,n):(function(i,o,a){return uu(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a})(r,e,t)}function BP(r,e){let t=null;for(const n of r.fieldTransforms){const s=e.data.field(n.field),i=rI(n.transform,s||null);i!=null&&(t===null&&(t=it.empty()),t.set(n.field,i))}return t||null}function Dg(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!(function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&Fi(n,s,((i,o)=>cP(i,o)))})(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class fo extends gl{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class pr extends gl{constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function cI(r){const e=new Map;return r.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}})),e}function Tg(r,e,t){const n=new Map;j(r.length===t.length,32656,{ve:t.length,De:r.length});for(let s=0;s<t.length;s++){const i=r[s],o=i.transform,a=e.data.field(i.field);n.set(i.field,aP(o,a,t[s]))}return n}function Ag(r,e,t){const n=new Map;for(const s of r){const i=s.transform,o=t.data.field(s.field);n.set(s.field,oP(i,o,e))}return n}class po extends gl{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Rd extends gl{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr{constructor(e,t){this.position=e,this.inclusive=t}}function bg(r,e,t){let n=0;for(let s=0;s<r.position.length;s++){const i=e[s],o=r.position[s];if(i.field.isKeyField()?n=z.comparator(z.fromName(o.referenceValue),t.key):n=vt(o,t.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function vg(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!an(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uI{}class _e extends uI{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new hP(e,t,n):t==="array-contains"?new pP(e,n):t==="in"?new pI(e,n):t==="not-in"?new CP(e,n):t==="array-contains-any"?new gP(e,n):new _e(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new dP(e,n):new fP(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(vt(t,this.value)):t!==null&&rt(this.value)===rt(t)&&this.matchesComparison(vt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Z(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Pe extends uI{constructor(e,t){super(),this.filters=e,this.op=t,this.Ce=null}static create(e,t){return new Pe(e,t)}matches(e){return ji(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Ce!==null||(this.Ce=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Ce}getFilters(){return Object.assign([],this.filters)}}function ji(r){return r.op==="and"}function fh(r){return r.op==="or"}function Pd(r){return lI(r)&&ji(r)}function lI(r){for(const e of r.filters)if(e instanceof Pe)return!1;return!0}function ph(r){if(r instanceof _e)return r.field.canonicalString()+r.op.toString()+Gi(r.value);if(Pd(r))return r.filters.map((e=>ph(e))).join(",");{const e=r.filters.map((t=>ph(t))).join(",");return`${r.op}(${e})`}}function BI(r,e){return r instanceof _e?(function(n,s){return s instanceof _e&&n.op===s.op&&n.field.isEqual(s.field)&&an(n.value,s.value)})(r,e):r instanceof Pe?(function(n,s){return s instanceof Pe&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce(((i,o,a)=>i&&BI(o,s.filters[a])),!0):!1})(r,e):void Z(19439)}function hI(r,e){const t=r.filters.concat(e);return Pe.create(t,r.op)}function dI(r){return r instanceof _e?(function(t){return`${t.field.canonicalString()} ${t.op} ${Gi(t.value)}`})(r):r instanceof Pe?(function(t){return t.op.toString()+" {"+t.getFilters().map(dI).join(" ,")+"}"})(r):"Filter"}class hP extends _e{constructor(e,t,n){super(e,t,n),this.key=z.fromName(n.referenceValue)}matches(e){const t=z.comparator(e.key,this.key);return this.matchesComparison(t)}}class dP extends _e{constructor(e,t){super(e,"in",t),this.keys=fI("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class fP extends _e{constructor(e,t){super(e,"not-in",t),this.keys=fI("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function fI(r,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((n=>z.fromName(n.referenceValue)))}class pP extends _e{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Kr(t)&&xa(t.arrayValue,this.value)}}class pI extends _e{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&xa(this.value.arrayValue,t)}}class CP extends _e{constructor(e,t){super(e,"not-in",t)}matches(e){if(xa(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!xa(this.value.arrayValue,t)}}class gP extends _e{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Kr(t)||!t.arrayValue.values)&&t.arrayValue.values.some((n=>xa(this.value.arrayValue,n)))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ka{constructor(e,t="asc"){this.field=e,this.dir=t}}function mP(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{static fromTimestamp(e){return new re(e)}static min(){return new re(new we(0,0))}static max(){return new re(new we(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(e,t,n,s,i,o,a){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=i,this.data=o,this.documentState=a}static newInvalidDocument(e){return new Me(e,0,re.min(),re.min(),re.min(),it.empty(),0)}static newFoundDocument(e,t,n,s){return new Me(e,1,t,re.min(),n,s,0)}static newNoDocument(e,t){return new Me(e,2,t,re.min(),re.min(),it.empty(),0)}static newUnknownDocument(e,t){return new Me(e,3,t,re.min(),re.min(),it.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(re.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=it.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=it.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=re.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Me&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Me(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ji=-1;class Ki{constructor(e,t,n,s){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=s}}function Ch(r){return r.fields.find((e=>e.kind===2))}function ms(r){return r.fields.filter((e=>e.kind!==2))}function _P(r,e){let t=ce(r.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let n=0;n<Math.min(r.fields.length,e.fields.length);++n)if(t=EP(r.fields[n],e.fields[n]),t!==0)return t;return ce(r.fields.length,e.fields.length)}Ki.UNKNOWN_ID=-1;class xs{constructor(e,t){this.fieldPath=e,this.kind=t}}function EP(r,e){const t=Ye.comparator(r.fieldPath,e.fieldPath);return t!==0?t:ce(r.kind,e.kind)}class zi{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new zi(0,Zt.min())}}function CI(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=re.fromTimestamp(n===1e9?new we(t+1,0):new we(t,n));return new Zt(s,z.empty(),e)}function gI(r){return new Zt(r.readTime,r.key,Ji)}class Zt{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Zt(re.min(),z.empty(),Ji)}static max(){return new Zt(re.max(),z.empty(),Ji)}}function Sd(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=z.comparator(r.documentKey,e.documentKey),t!==0?t:ce(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IP{constructor(e,t=null,n=[],s=[],i=null,o=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=o,this.endAt=a,this.Fe=null}}function gh(r,e=null,t=[],n=[],s=null,i=null,o=null){return new IP(r,e,t,n,s,i,o)}function vu(r){const e=Q(r);if(e.Fe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((n=>ph(n))).join(","),t+="|ob:",t+=e.orderBy.map((n=>(function(i){return i.field.canonicalString()+i.dir})(n))).join(","),rc(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((n=>Gi(n))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((n=>Gi(n))).join(",")),e.Fe=t}return e.Fe}function Nd(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!mP(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!BI(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!vg(r.startAt,e.startAt)&&vg(r.endAt,e.endAt)}function Qn(r){return!!r.isCorePipeline}function Od(r){return!!r.path&&z.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Ru(r,e){return r.filters.filter((t=>t instanceof _e&&t.field.isEqual(e)))}function Rg(r,e,t){let n=ur,s=!0;for(const i of Ru(r,e)){let o=ur,a=!0;switch(i.op){case"<":case"<=":o=sP(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,a=!1;break;case"!=":case"not-in":o=Td}Ig({value:n,inclusive:s},{value:o,inclusive:a})<0&&(n=o,s=a)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];Ig({value:n,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}function Pg(r,e,t){let n=bs,s=!0;for(const i of Ru(r,e)){let o=bs,a=!0;switch(i.op){case">=":case">":o=iP(i.value),a=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,a=!1;break;case"!=":case"not-in":o=Ad}yg({value:n,inclusive:s},{value:o,inclusive:a})>0&&(n=o,s=a)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];yg({value:n,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(e,t=null,n=[],s=[],i=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=c,this.Oe=null,this.Me=null,this.Ne=null,this.startAt,this.endAt}}function mI(r,e,t,n,s,i,o,a){return new Cr(r,e,t,n,s,i,o,a)}function Co(r){return new Cr(r)}function Sg(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function yP(r){return z.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Fd(r){return r.collectionGroup!==null}function vi(r){const e=Q(r);if(e.Oe===null){e.Oe=[];const t=new Set;for(const i of e.explicitOrderBy)e.Oe.push(i),t.add(i.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new ve(Ye.comparator);return o.filters.forEach((c=>{c.getFlattenedFilters().forEach((l=>{l.isInequality()&&(a=a.add(l.field))}))})),a})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Oe.push(new ka(i,n))})),t.has(Ye.keyField().canonicalString())||e.Oe.push(new ka(Ye.keyField(),n))}return e.Oe}function At(r){const e=Q(r);return e.Me||(e.Me=EI(e,vi(r))),e.Me}function _I(r){const e=Q(r);return e.Ne||(e.Ne=EI(e,r.explicitOrderBy)),e.Ne}function EI(r,e){if(r.limitType==="F")return gh(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new ka(s.field,i)}));const t=r.endAt?new zr(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new zr(r.startAt.position,r.startAt.inclusive):null;return gh(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function mh(r,e){const t=r.filters.concat([e]);return new Cr(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function wP(r,e){const t=r.explicitOrderBy.concat([e]);return new Cr(r.path,r.collectionGroup,t,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}function Pu(r,e,t){return new Cr(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function DP(r,e){return new Cr(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),r.limit,r.limitType,e,r.endAt)}function TP(r,e){return new Cr(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),r.limit,r.limitType,r.startAt,e)}function II(r,e){return Nd(At(r),At(e))&&r.limitType===e.limitType}function da(r){return`Query(target=${(function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map((s=>dI(s))).join(", ")}]`),rc(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map((s=>Gi(s))).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map((s=>Gi(s))).join(",")),`Target(${n})`})(At(r))}; limitType=${r.limitType})`}function ml(r,e){return e.isFoundDocument()&&(function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):z.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)})(r,e)&&(function(n,s){for(const i of vi(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(r,e)&&(function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0})(r,e)&&(function(n,s){return!(n.startAt&&!(function(o,a,c){const l=bg(o,a,c);return o.inclusive?l<=0:l<0})(n.startAt,vi(n),s)||n.endAt&&!(function(o,a,c){const l=bg(o,a,c);return o.inclusive?l>=0:l>0})(n.endAt,vi(n),s))})(r,e)}function _l(r){return(e,t)=>{let n=!1;for(const s of vi(r)){const i=AP(s,e,t);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function AP(r,e,t){const n=r.field.isKeyField()?z.comparator(e.key,t.key):(function(i,o,a){const c=o.data.field(i),l=a.data.field(i);return c!==null&&l!==null?vt(c,l):Z(42886)})(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return Z(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bP{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ze,Ie;function yI(r){switch(r){case S.OK:return Z(64938);case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0;default:return Z(15467,{code:r})}}function wI(r){if(r===void 0)return $e("GRPC error has no .code"),S.UNKNOWN;switch(r){case Ze.OK:return S.OK;case Ze.CANCELLED:return S.CANCELLED;case Ze.UNKNOWN:return S.UNKNOWN;case Ze.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case Ze.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case Ze.INTERNAL:return S.INTERNAL;case Ze.UNAVAILABLE:return S.UNAVAILABLE;case Ze.UNAUTHENTICATED:return S.UNAUTHENTICATED;case Ze.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case Ze.NOT_FOUND:return S.NOT_FOUND;case Ze.ALREADY_EXISTS:return S.ALREADY_EXISTS;case Ze.PERMISSION_DENIED:return S.PERMISSION_DENIED;case Ze.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case Ze.ABORTED:return S.ABORTED;case Ze.OUT_OF_RANGE:return S.OUT_OF_RANGE;case Ze.UNIMPLEMENTED:return S.UNIMPLEMENTED;case Ze.DATA_LOSS:return S.DATA_LOSS;default:return Z(39323,{code:r})}}(Ie=Ze||(Ze={}))[Ie.OK=0]="OK",Ie[Ie.CANCELLED=1]="CANCELLED",Ie[Ie.UNKNOWN=2]="UNKNOWN",Ie[Ie.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ie[Ie.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ie[Ie.NOT_FOUND=5]="NOT_FOUND",Ie[Ie.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ie[Ie.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ie[Ie.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ie[Ie.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ie[Ie.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ie[Ie.ABORTED=10]="ABORTED",Ie[Ie.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ie[Ie.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ie[Ie.INTERNAL=13]="INTERNAL",Ie[Ie.UNAVAILABLE=14]="UNAVAILABLE",Ie[Ie.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return n.length===1?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){ts(this.inner,((t,n)=>{for(const[s,i]of n)e(s,i)}))}isEmpty(){return LE(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vP=new Fe(z.comparator);function nt(){return vP}const DI=new Fe(z.comparator);function Es(...r){let e=DI;for(const t of r)e=e.insert(t.key,t);return e}function TI(r){let e=DI;return r.forEach(((t,n)=>e=e.insert(t,n.overlayedDocument))),e}function rn(){return fa()}function AI(){return fa()}function fa(){return new gr((r=>r.toString()),((r,e)=>r.isEqual(e)))}const RP=new Fe(z.comparator),PP=new ve(z.comparator);function le(...r){let e=PP;for(const t of r)e=e.add(t);return e}const SP=new ve(ce);function xd(){return SP}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let pa=null;function NP(r){if(pa)throw new Error("a TestingHooksSpi instance is already set");pa=r}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ld(){return new TextEncoder}function bI(){return new TextDecoder("utf-8")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OP=new kr([4294967295,4294967295],0);function Ng(r){const e=Ld().encode(r),t=new _E;return t.update(e),new Uint8Array(t.digest())}function Og(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new kr([t,n],0),new kr([s,i],0)]}class Vd{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new ra(`Invalid padding: ${t}`);if(n<0)throw new ra(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new ra(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new ra(`Invalid padding when bitmap length is 0: ${t}`);this.Be=8*e.length-t,this.Le=kr.fromNumber(this.Be)}$e(e,t,n){let s=e.add(t.multiply(kr.fromNumber(n)));return s.compare(OP)===1&&(s=new kr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Le).toNumber()}Ue(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Be===0)return!1;const t=Ng(e),[n,s]=Og(t);for(let i=0;i<this.hashCount;i++){const o=this.$e(n,s,i);if(!this.Ue(o))return!1}return!0}static create(e,t,n){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Vd(i,s,t);return n.forEach((a=>o.insert(a))),o}insert(e){if(this.Be===0)return;const t=Ng(e),[n,s]=Og(t);for(let i=0;i<this.hashCount;i++){const o=this.$e(n,s,i);this.ke(o)}}ke(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class ra extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go{constructor(e,t,n,s,i,o){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.augmentedDocumentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,oc.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new go(re.min(),s,new Fe(ce),nt(),nt(),le())}}class oc{constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new oc(n,t,le(),le(),le())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lu{constructor(e,t,n,s){this.Qe=e,this.removedTargetIds=t,this.key=n,this.qe=s}}class vI{constructor(e,t){this.targetId=e,this.Ke=t}}class RI{constructor(e,t,n=Re.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class Fg{constructor(e){this.targetId=e,this.We=0,this.Ge=xg(),this.je=Re.EMPTY_BYTE_STRING,this.ze=!1,this.He=!0}get current(){return this.ze}get resumeToken(){return this.je}get Je(){return this.We!==0}get Ye(){return this.He}Ze(e){e.approximateByteSize()>0&&(this.He=!0,this.je=e)}Xe(){let e=le(),t=le(),n=le();return this.Ge.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:Z(38017,{changeType:i})}})),new oc(this.je,this.ze,e,t,n)}et(){this.He=!1,this.Ge=xg()}tt(e,t){this.He=!0,this.Ge=this.Ge.insert(e,t)}nt(e){this.He=!0,this.Ge=this.Ge.remove(e)}rt(){this.We+=1}it(){this.We-=1,j(this.We>=0,3241,{We:this.We,targetId:this.targetId})}st(){this.He=!0,this.ze=!0}}const Ko="WatchChangeAggregator";class FP{constructor(e){this._t=e,this.ot=new Map,this.ut=nt(),this.ct=Jc(),this.lt=nt(),this.Et=Jc(),this.ht=new Fe(ce)}Tt(e){for(const t of e.Qe)e.qe&&e.qe.isFoundDocument()?this.Pt(t,e.qe):this.It(t,e.key,e.qe);for(const t of e.removedTargetIds)this.It(t,e.key,e.qe)}Rt(e){this.forEachTarget(e,(t=>{const n=this.ot.get(t);if(n)switch(e.state){case 0:this.At(t)&&n.Ze(e.resumeToken);break;case 1:n.it(),n.Je||n.et(),n.Ze(e.resumeToken);break;case 2:n.it(),n.Je||this.removeTarget(t);break;case 3:this.At(t)&&(n.st(),n.Ze(e.resumeToken));break;case 4:this.At(t)&&(this.Vt(t),n.Ze(e.resumeToken));break;default:Z(56790,{state:e.state})}else U(Ko,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ot.forEach(((n,s)=>{this.At(s)&&t(s)}))}dt(e){var t;return Qn(e)?e.getPipelineSourceType()==="documents"&&((t=e.getPipelineDocuments())==null?void 0:t.length)===1:Od(e)}ft(e){const t=e.targetId,n=e.Ke.count,s=this.gt(t);if(s){const i=s.target;if(this.dt(i))if(n===0){const o=new z(Qn(i)?Be.fromString(i.getPipelineDocuments()[0]):i.path);this.It(t,o,Me.newNoDocument(o,re.min()))}else j(n===1,20013,"Single document existence filter with count: "+n);else{const o=this.yt(t);if(o!==n){const a=this.wt(e),c=a?this.bt(a,e,o):1;if(c!==0){this.Vt(t);const l=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.ht=this.ht.insert(t,l)}pa==null||pa.St((function(B,h,p,C,m){var G,J,te;const D={localCacheCount:B,existenceFilterCount:h.count,databaseId:p.database,projectId:p.projectId},N=h.unchangedNames;return N&&(D.bloomFilter={applied:m===0,hashCount:(N==null?void 0:N.hashCount)??0,bitmapLength:((J=(G=N==null?void 0:N.bits)==null?void 0:G.bitmap)==null?void 0:J.length)??0,padding:((te=N==null?void 0:N.bits)==null?void 0:te.padding)??0,mightContain:he=>(C==null?void 0:C.mightContain(he))??!1}),D})(o,e.Ke,this._t.xt(),a,c))}}}}wt(e){const t=e.Ke.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=t;let o,a;try{o=fn(n).toUint8Array()}catch(c){if(c instanceof ME)return at("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{a=new Vd(o,s,i)}catch(c){return at(c instanceof ra?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return a.Be===0?null:a}bt(e,t,n){return t.Ke.count===n-this.vt(e,t.targetId)?0:2}vt(e,t){const n=this._t.getRemoteKeysForTarget(t);let s=0;return n.forEach((i=>{const o=this._t.xt(),a=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(a)||(this.It(t,i,null),s++)})),s}Dt(e){const t=new Map;this.ot.forEach(((i,o)=>{const a=this.gt(o);if(a){if(i.current&&this.dt(a.target)){const c=Qn(a.target)?Be.fromString(a.target.getPipelineDocuments()[0]):a.target.path,l=new z(c);this.Ct(l).has(o)||this.Ft(o,l)||this.It(o,l,Me.newNoDocument(l,e))}i.Ye&&(t.set(o,i.Xe()),i.et())}}));let n=le();this.Et.forEach(((i,o)=>{let a=!0;o.forEachWhile((c=>{const l=this.gt(c);return!l||l.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)})),a&&(n=n.add(i))})),this.ut.forEach(((i,o)=>o.setReadTime(e))),this.lt.forEach(((i,o)=>o.setReadTime(e)));const s=new go(e,t,this.ht,this.ut,this.lt,n);return this.ut=nt(),this.ct=Jc(),this.lt=nt(),this.Et=Jc(),this.ht=new Fe(ce),s}Pt(e,t){const n=this.ot.get(e);if(!n||!this.At(e))return void U(Ko,`addDocumentToTarget received document for unknown inactive target (${e})`);const s=this.Ft(e,t.key)?2:0;n.tt(t.key,s),Qn(this.gt(e).target)&&this.gt(e).target.getPipelineFlavor()!=="exact"?this.lt=this.lt.insert(t.key,t):this.ut=this.ut.insert(t.key,t),this.ct=this.ct.insert(t.key,this.Ct(t.key).add(e)),this.Et=this.Et.insert(t.key,this.Ot(t.key).add(e))}It(e,t,n){const s=this.ot.get(e);s&&this.At(e)?(this.Ft(e,t)?s.tt(t,1):s.nt(t),this.Et=this.Et.insert(t,this.Ot(t).delete(e)),this.Et=this.Et.insert(t,this.Ot(t).add(e)),n&&(Qn(this.gt(e).target)&&this.gt(e).target.getPipelineFlavor()!=="exact"?this.lt=this.lt.insert(t,n):this.ut=this.ut.insert(t,n))):U(Ko,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.ot.delete(e)}yt(e){const t=this.ot.get(e);if(!t)return 0;const n=t.Xe();return this._t.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}rt(e){let t=this.ot.get(e);t||(U(Ko,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new Fg(e),this.ot.set(e,t)),t.rt()}Ot(e){let t=this.Et.get(e);return t||(t=new ve(ce),this.Et=this.Et.insert(e,t)),t}Ct(e){let t=this.ct.get(e);return t||(t=new ve(ce),this.ct=this.ct.insert(e,t)),t}At(e){const t=this.gt(e)!==null;return t||U(Ko,"Detected inactive target",e),t}gt(e){const t=this.ot.get(e);return t===void 0||t.Je?null:this._t.Mt(e)}Vt(e){this.ot.set(e,new Fg(e)),this._t.getRemoteKeysForTarget(e).forEach((t=>{this.It(e,t,null)}))}Ft(e,t){return this._t.getRemoteKeysForTarget(e).has(t)}}function Jc(){return new Fe(z.comparator)}function xg(){return new Fe(z.comparator)}const xP={asc:"ASCENDING",desc:"DESCENDING"},LP={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},VP={and:"AND",or:"OR"};class kP{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function _h(r,e){return r.useProto3Json||rc(e)?e:{value:e}}function Ls(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function kd(r){const e=or(r);return new we(e.seconds,e.nanos)}function Eh(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function Bu(r,e){return Ls(r,e.toTimestamp())}function Xe(r){return j(!!r,49232),re.fromTimestamp(kd(r))}function Md(r,e){return Ih(r,e).canonicalString()}function Ih(r,e){const t=(function(s){return new Be(["projects",s.projectId,"databases",s.database])})(r).child("documents");return e===void 0?t:t.child(e)}function PI(r){const e=Be.fromString(r);return j(GI(e),10190,{key:e.toString()}),e}function Wi(r,e){return Md(r.databaseId,e.path)}function Fn(r,e){const t=PI(e);if(t.get(1)!==r.databaseId.projectId)throw new k(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new k(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new z(OI(t))}function SI(r,e){return Md(r.databaseId,e)}function NI(r){const e=PI(r);return e.length===4?Be.emptyPath():OI(e)}function yh(r){return new Be(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function OI(r){return j(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function Lg(r,e,t){return{name:Wi(r,e),fields:t.value.mapValue.fields}}function El(r,e,t){const n=Fn(r,e.name),s=Xe(e.updateTime),i=e.createTime?Xe(e.createTime):re.min(),o=new it({mapValue:{fields:e.fields}}),a=Me.newFoundDocument(n,s,i,o);return t&&a.setHasCommittedMutations(),t?a.setHasCommittedMutations():a}function MP(r,e){return"found"in e?(function(n,s){j(!!s.found,43571),s.found.name,s.found.updateTime;const i=Fn(n,s.found.name),o=Xe(s.found.updateTime),a=s.found.createTime?Xe(s.found.createTime):re.min(),c=new it({mapValue:{fields:s.found.fields}});return Me.newFoundDocument(i,o,a,c)})(r,e):"missing"in e?(function(n,s){j(!!s.missing,3894),j(!!s.readTime,22933);const i=Fn(n,s.missing),o=Xe(s.readTime);return Me.newNoDocument(i,o)})(r,e):Z(7234,{result:e})}function GP(r,e){let t;if("targetChange"in e){e.targetChange;const n=(function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:Z(39313,{state:l})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(l,B){return l.useProto3Json?(j(B===void 0||typeof B=="string",58123),Re.fromBase64String(B||"")):(j(B===void 0||B instanceof Buffer||B instanceof Uint8Array,16193),Re.fromUint8Array(B||new Uint8Array))})(r,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&(function(l){const B=l.code===void 0?S.UNKNOWN:wI(l.code);return new k(B,l.message||"")})(o);t=new RI(n,s,i,a||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const s=Fn(r,n.document.name),i=Xe(n.document.updateTime),o=n.document.createTime?Xe(n.document.createTime):re.min(),a=new it({mapValue:{fields:n.document.fields}}),c=Me.newFoundDocument(s,i,o,a),l=n.targetIds||[],B=n.removedTargetIds||[];t=new lu(l,B,c.key,c)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const s=Fn(r,n.document),i=n.readTime?Xe(n.readTime):re.min(),o=Me.newNoDocument(s,i),a=n.removedTargetIds||[];t=new lu([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const s=Fn(r,n.document),i=n.removedTargetIds||[];t=new lu([],i,s,null)}else{if(!("filter"in e))return Z(11601,{Nt:e});{e.filter;const n=e.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,o=new bP(s,i),a=n.targetId;t=new vI(a,o)}}return t}function Ma(r,e){let t;if(e instanceof fo)t={update:Lg(r,e.key,e.value)};else if(e instanceof po)t={delete:Wi(r,e.key)};else if(e instanceof pr)t={update:Lg(r,e.key,e.data),updateMask:KP(e.fieldMask)};else{if(!(e instanceof Rd))return Z(16599,{Bt:e.type});t={verify:Wi(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((n=>(function(i,o){const a=o.transform;if(a instanceof Ui)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof Hs)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof qs)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof js)return{fieldPath:o.field.canonicalString(),increment:a.xe};if(a instanceof Hi)return{fieldPath:o.field.canonicalString(),minimum:a.xe};if(a instanceof qi)return{fieldPath:o.field.canonicalString(),maximum:a.xe};throw Z(20930,{transform:o.transform})})(0,n)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:Bu(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:Z(27497)})(r,e.precondition)),t}function wh(r,e){const t=e.currentDocument?(function(i){return i.updateTime!==void 0?qe.updateTime(Xe(i.updateTime)):i.exists!==void 0?qe.exists(i.exists):qe.none()})(e.currentDocument):qe.none(),n=e.updateTransforms?e.updateTransforms.map((s=>(function(o,a){let c=null;if("setToServerValue"in a)j(a.setToServerValue==="REQUEST_TIME",16630,{proto:a}),c=new Ui;else if("appendMissingElements"in a){const B=a.appendMissingElements.values||[];c=new Hs(B)}else if("removeAllFromArray"in a){const B=a.removeAllFromArray.values||[];c=new qs(B)}else"increment"in a?c=new js(o,a.increment):"minimum"in a?c=new Hi(o,a.minimum):"maximum"in a?c=new qi(o,a.maximum):Z(16584,{proto:a});const l=Ye.fromServerFormat(a.fieldPath);return new ti(l,c)})(r,s))):[];if(e.update){e.update.name;const s=Fn(r,e.update.name),i=new it({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=(function(c){const l=c.fieldPaths||[];return new Mt(l.map((B=>Ye.fromServerFormat(B))))})(e.updateMask);return new pr(s,i,o,t,n)}return new fo(s,i,t,n)}if(e.delete){const s=Fn(r,e.delete);return new po(s,t)}if(e.verify){const s=Fn(r,e.verify);return new Rd(s,t)}return Z(1463,{proto:e})}function UP(r,e){return r&&r.length>0?(j(e!==void 0,14353),r.map((t=>(function(s,i){let o=s.updateTime?Xe(s.updateTime):Xe(i);return o.isEqual(re.min())&&(o=Xe(i)),new uP(o,s.transformResults||[])})(t,e)))):[]}function FI(r,e){return{documents:[SI(r,e.path)]}}function Il(r,e){const t={structuredQuery:{}},n=e.path;let s;e.collectionGroup!==null?(s=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=SI(r,s);const i=(function(l){if(l.length!==0)return MI(Pe.create(l,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(l){if(l.length!==0)return l.map((B=>(function(p){return{field:Sr(p.field),direction:qP(p.dir)}})(B)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const a=_h(r,e.limit);return a!==null&&(t.structuredQuery.limit=a),e.startAt&&(t.structuredQuery.startAt=(function(l){return{before:l.inclusive,values:l.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(l){return{before:!l.inclusive,values:l.position}})(e.endAt)),{Lt:t,parent:s}}function xI(r,e,t,n){const{Lt:s,parent:i}=Il(r,e),o={},a=[];let c=0;return t.forEach((l=>{const B=n?l.alias:"aggregate_"+c++;o[B]=l.alias,l.aggregateType==="count"?a.push({alias:B,count:{}}):l.aggregateType==="avg"?a.push({alias:B,avg:{field:Sr(l.fieldPath)}}):l.aggregateType==="sum"&&a.push({alias:B,sum:{field:Sr(l.fieldPath)}})})),{request:{structuredAggregationQuery:{aggregations:a,structuredQuery:s.structuredQuery},parent:s.parent},$t:o,parent:i}}function LI(r){let e=NI(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let s=null;if(n>0){j(n===1,65062);const B=t.from[0];B.allDescendants?s=B.collectionId:e=e.child(B.collectionId)}let i=[];t.where&&(i=(function(h){const p=kI(h);return p instanceof Pe&&Pd(p)?p.getFilters():[p]})(t.where));let o=[];t.orderBy&&(o=(function(h){return h.map((p=>(function(m){return new ka(yi(m.field),(function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(m.direction))})(p)))})(t.orderBy));let a=null;t.limit&&(a=(function(h){let p;return p=typeof h=="object"?h.value:h,rc(p)?null:p})(t.limit));let c=null;t.startAt&&(c=(function(h){const p=!!h.before,C=h.values||[];return new zr(C,p)})(t.startAt));let l=null;return t.endAt&&(l=(function(h){const p=!h.before,C=h.values||[];return new zr(C,p)})(t.endAt)),mI(e,s,o,i,a,"F",c,l)}function HP(r,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Z(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function VI(r,e){return{structuredPipeline:{pipeline:{stages:e.stages.map((t=>t._toProto(r)))}}}}function kI(r){return r.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=yi(t.unaryFilter.field);return _e.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=yi(t.unaryFilter.field);return _e.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=yi(t.unaryFilter.field);return _e.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=yi(t.unaryFilter.field);return _e.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return Z(61313);default:return Z(60726)}})(r):r.fieldFilter!==void 0?(function(t){return _e.create(yi(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return Z(58110);default:return Z(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(t){return Pe.create(t.compositeFilter.filters.map((n=>kI(n))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return Z(1026)}})(t.compositeFilter.op))})(r):Z(30097,{filter:r})}function qP(r){return xP[r]}function jP(r){return LP[r]}function JP(r){return VP[r]}function Sr(r){return{fieldPath:r.canonicalString()}}function yi(r){return Ye.fromServerFormat(r.fieldPath)}function MI(r){return r instanceof _e?(function(t){if(t.op==="=="){if(pt(t.value))return{unaryFilter:{field:Sr(t.field),op:"IS_NAN"}};if(Xt(t.value))return{unaryFilter:{field:Sr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(pt(t.value))return{unaryFilter:{field:Sr(t.field),op:"IS_NOT_NAN"}};if(Xt(t.value))return{unaryFilter:{field:Sr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Sr(t.field),op:jP(t.op),value:t.value}}})(r):r instanceof Pe?(function(t){const n=t.getFilters().map((s=>MI(s)));return n.length===1?n[0]:{compositeFilter:{op:JP(t.op),filters:n}}})(r):Z(54877,{filter:r})}function KP(r){const e=[];return r.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function GI(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function UI(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}function Ga(r,e){const t={fields:{}};return e.forEach(((n,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);t.fields[s]=n._toProto(r)})),{mapValue:t}}function Su(r){return{stringValue:r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ni(r){return new kP(r,!0)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{constructor(e){this.value=e}isEqual(e){return this.value===e.value}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wl{constructor(e,t){if(this.seconds=e,this.increment=t,!Number.isInteger(e)||e<0||e>4294967295)throw new Error("BsonTimestamp 'seconds' must be in the range of a 32-bit unsigned integer (0-4294967295).");if(!Number.isInteger(t)||t<0||t>4294967295)throw new Error("BsonTimestamp 'increment' must be in the range of a 32-bit unsigned integer (0-4294967295).")}isEqual(e){return this.seconds===e.seconds&&this.increment===e.increment}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e,t=0){if(this.subtype=t,!Number.isInteger(t)||t<0||t>255)throw new k(S.INVALID_ARGUMENT,"The subtype for Bytes must be a value in the inclusive [0, 255] range.");this._byteString=e}static fromBase64String(e,t=0){try{return new Nt(Re.fromBase64String(e),t)}catch(n){throw new k(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e,t=0){return new Nt(Re.fromUint8Array(e),t)}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}get data(){return this.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+", subtype: "+this.subtype+")"}isEqual(e){return this.subtype===e.subtype&&this._byteString.isEqual(e._byteString)}toJSON(){const e={type:Nt._jsonSchemaVersion,bytes:this.toBase64()};return this.subtype!==0&&(e.subtype=this.subtype),e}static fromJSON(e){if(Zs(e,Nt._jsonSchema)){const t=e.subtype??0;return Nt.fromBase64String(e.bytes,t)}}}Nt._jsonSchemaVersion="firestore/bytes/1.0",Nt._jsonSchema={type:Qe("string",Nt._jsonSchemaVersion),bytes:Qe("string"),subtype:{...Qe("number"),optional:!0}};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dl{constructor(e){this.stringValue=e,this.value=ie.fromString(e)}isEqual(e){return!(!this.value.oe()||!e.value.oe())||this.value.compareTo(e.value)===0}toJSON(){return{Ut:{stringValue:this.stringValue}}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new k(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ye(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function HI(){return new ri(Tn)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jn{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new k(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new k(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ce(this._lat,e._lat)||ce(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:pn._jsonSchemaVersion}}static fromJSON(e){if(Zs(e,pn._jsonSchema))return new pn(e.latitude,e.longitude)}}pn._jsonSchemaVersion="firestore/geoPoint/1.0",pn._jsonSchema={type:Qe("string",pn._jsonSchemaVersion),latitude:Qe("number"),longitude:Qe("number")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tl{constructor(e){this.value=e}isEqual(e){return this.value===e.value}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(){this.type="MaxKey"}static instance(){return Rn.MAX_KEY_VALUE_INSTANCE||(Rn.MAX_KEY_VALUE_INSTANCE=new Rn),Rn.MAX_KEY_VALUE_INSTANCE}}Rn.MAX_KEY_VALUE_INSTANCE=null;/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn{constructor(){this.type="MinKey"}static instance(){return Pn.MIN_KEY_VALUE_INSTANCE||(Pn.MIN_KEY_VALUE_INSTANCE=new Pn),Pn.MIN_KEY_VALUE_INSTANCE}}Pn.MIN_KEY_VALUE_INSTANCE=null;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}dt.UNAUTHENTICATED=new dt(null),dt.GOOGLE_CREDENTIALS=new dt("google-credentials-uid"),dt.FIRST_PARTY=new dt("first-party-uid"),dt.MOCK_USER=new dt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qI{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class jI{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(dt.UNAUTHENTICATED)))}shutdown(){}}class zP{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class WP{constructor(e){this.kt=e,this.currentUser=dt.UNAUTHENTICATED,this.Qt=0,this.forceRefresh=!1,this.auth=null}start(e,t){j(this.qt===void 0,42304);let n=this.Qt;const s=c=>this.Qt!==n?(n=this.Qt,t(c)):Promise.resolve();let i=new gt;this.qt=()=>{this.Qt++,this.currentUser=this.Kt(),i.resolve(),i=new gt,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const c=i;e.enqueueRetryable((async()=>{await c.promise,await s(this.currentUser)}))},a=c=>{U("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.qt&&(this.auth.addAuthTokenListener(this.qt),o())};this.kt.onInit((c=>a(c))),setTimeout((()=>{if(!this.auth){const c=this.kt.getImmediate({optional:!0});c?a(c):(U("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new gt)}}),0),o()}getToken(){const e=this.Qt,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((n=>this.Qt!==e?(U("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(j(typeof n.accessToken=="string",31837,{Wt:n}),new qI(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.qt&&this.auth.removeAuthTokenListener(this.qt),this.qt=void 0}Kt(){const e=this.auth&&this.auth.getUid();return j(e===null||typeof e=="string",2055,{Gt:e}),new dt(e)}}class $P{constructor(e,t,n){this.jt=e,this.zt=t,this.Ht=n,this.type="FirstParty",this.user=dt.FIRST_PARTY,this.Jt=new Map}Yt(){return this.Ht?this.Ht():null}get headers(){this.Jt.set("X-Goog-AuthUser",this.jt);const e=this.Yt();return e&&this.Jt.set("Authorization",e),this.zt&&this.Jt.set("X-Goog-Iam-Authorization-Token",this.zt),this.Jt}}class QP{constructor(e,t,n){this.jt=e,this.zt=t,this.Ht=n}getToken(){return Promise.resolve(new $P(this.jt,this.zt,this.Ht))}start(e,t){e.enqueueRetryable((()=>t(dt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Dh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class YP{constructor(e,t){this.Zt=t,this.forceRefresh=!1,this.appCheck=null,this.Xt=null,this.en=null,He(e)&&e.settings.appCheckToken&&(this.en=e.settings.appCheckToken)}start(e,t){j(this.qt===void 0,3512);const n=i=>{i.error!=null&&U("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.Xt;return this.Xt=i.token,U("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.qt=i=>{e.enqueueRetryable((()=>n(i)))};const s=i=>{U("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.qt&&this.appCheck.addTokenListener(this.qt)};this.Zt.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.Zt.getImmediate({optional:!0});i?s(i):U("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.en)return Promise.resolve(new Dh(this.en));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(j(typeof t.token=="string",44558,{tokenResult:t}),this.Xt=t.token,new Dh(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.qt&&this.appCheck.removeTokenListener(this.qt),this.qt=void 0}}class XP{getToken(){return Promise.resolve(new Dh(""))}invalidateToken(){}start(e,t){}shutdown(){}}function JI(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZP{tn(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vg="ConnectivityMonitor";class kg{constructor(){this.nn=()=>this.rn(),this.sn=()=>this._n(),this.an=[],this.un()}tn(e){this.an.push(e)}shutdown(){window.removeEventListener("online",this.nn),window.removeEventListener("offline",this.sn)}un(){window.addEventListener("online",this.nn),window.addEventListener("offline",this.sn)}rn(){U(Vg,"Network connectivity changed: AVAILABLE");for(const e of this.an)e(0)}_n(){U(Vg,"Network connectivity changed: UNAVAILABLE");for(const e of this.an)e(1)}static cn(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Kc=null;function Th(){return Kc===null?Kc=(function(){return 268435456+Math.round(2147483648*Math.random())})():Kc++,"0x"+Kc.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GB="RestConnection",eS={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class tS{get En(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.hn=t+"://"+e.host,this.Tn=`projects/${n}/databases/${s}`,this.Pn=this.databaseId.database===Na?`project_id=${n}`:`project_id=${n}&database_id=${s}`}In(e,t,n,s,i){const o=Th(),a=this.Rn(e,t.toUriEncodedString());U(GB,`Sending RPC '${e}' ${o}:`,a,n);const c={"google-cloud-resource-prefix":this.Tn,"x-goog-request-params":this.Pn};this.An(c,s,i);const{host:l}=new URL(a),B=ao(l);return this.Vn(e,a,c,n,B).then((h=>(U(GB,`Received RPC '${e}' ${o}: `,h),h)),(h=>{throw at(GB,`RPC '${e}' ${o} failed with error: `,h,"url: ",a,"request:",n),h}))}dn(e,t,n,s,i,o){return this.In(e,t,n,s,i)}An(e,t,n){if(e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+ho})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),n&&n.headers.forEach(((s,i)=>e[i]=s)),this.databaseInfo._customHeaders)for(const s of Object.keys(this.databaseInfo._customHeaders))e[s]=this.databaseInfo._customHeaders[s]}Rn(e,t){const n=eS[e];let s=`${this.hn}/v1/${t}:${n}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nS{constructor(e){this.fn=e.fn,this.mn=e.mn}pn(e){this.gn=e}yn(e){this.wn=e}bn(e){this.Sn=e}onMessage(e){this.xn=e}close(){this.mn()}send(e){this.fn(e)}vn(){this.gn()}Dn(){this.wn()}Cn(e){this.Sn(e)}Fn(e){this.xn(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wt="WebChannelConnection",zo=(r,e,t)=>{r.listen(e,(n=>{try{t(n)}catch(s){setTimeout((()=>{throw s}),0)}}))};class Ri extends tS{constructor(e){super(e),this.On=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static Mn(){if(!Ri.Nn){const e=wE();zo(e,yE.STAT_EVENT,(t=>{t.stat===ih.PROXY?U(wt,"STAT_EVENT: detected buffering proxy"):t.stat===ih.NOPROXY&&U(wt,"STAT_EVENT: detected no buffering proxy")})),Ri.Nn=!0}}Vn(e,t,n,s,i){const o=Th();return new Promise(((a,c)=>{const l=new EE;l.setWithCredentials(!0),l.listenOnce(IE.COMPLETE,(()=>{try{switch(l.getLastErrorCode()){case iu.NO_ERROR:const h=l.getResponseJson();U(wt,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(h)),a(h);break;case iu.TIMEOUT:U(wt,`RPC '${e}' ${o} timed out`),c(new k(S.DEADLINE_EXCEEDED,"Request time out"));break;case iu.HTTP_ERROR:const p=l.getStatus();if(U(wt,`RPC '${e}' ${o} failed with status:`,p,"response text:",l.getResponseText()),p>0){let C=l.getResponseJson();Array.isArray(C)&&(C=C[0]);const m=C==null?void 0:C.error;if(m&&m.status&&m.message){const D=(function(G){const J=G.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(J)>=0?J:S.UNKNOWN})(m.status);c(new k(D,m.message))}else c(new k(S.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new k(S.UNAVAILABLE,"Connection failed."));break;default:Z(9055,{Bn:e,streamId:o,Ln:l.getLastErrorCode(),$n:l.getLastError()})}}finally{U(wt,`RPC '${e}' ${o} completed.`)}}));const B=JSON.stringify(s);U(wt,`RPC '${e}' ${o} sending request:`,s),l.send(t,"POST",B,n,15)}))}Un(e,t,n){const s=Th(),i=[this.hn,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(a.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(a.useFetchStreams=!0),this.An(a.initMessageHeaders,t,n),a.encodeInitMessageHeaders=!0;const l=i.join("");U(wt,`Creating RPC '${e}' stream ${s}: ${l}`,a);const B=o.createWebChannel(l,a);this.kn(B);let h=!1,p=!1;const C=new nS({fn:m=>{p?U(wt,`Not sending because RPC '${e}' stream ${s} is closed:`,m):(h||(U(wt,`Opening RPC '${e}' stream ${s} transport.`),B.open(),h=!0),U(wt,`RPC '${e}' stream ${s} sending:`,m),B.send(m))},mn:()=>B.close()});return zo(B,ta.EventType.OPEN,(()=>{p||(U(wt,`RPC '${e}' stream ${s} transport opened.`),C.vn())})),zo(B,ta.EventType.CLOSE,(()=>{p||(p=!0,U(wt,`RPC '${e}' stream ${s} transport closed`),C.Cn(),this.Qn(B))})),zo(B,ta.EventType.ERROR,(m=>{p||(p=!0,at(wt,`RPC '${e}' stream ${s} transport errored. Name:`,m.name,"Message:",m.message),C.Cn(new k(S.UNAVAILABLE,"The operation could not be completed")))})),zo(B,ta.EventType.MESSAGE,(m=>{var D;if(!p){const N=m.data[0];j(!!N,16349);const G=N,J=(G==null?void 0:G.error)||((D=G[0])==null?void 0:D.error);if(J){U(wt,`RPC '${e}' stream ${s} received error:`,J);const te=J.status;let he=(function(A){const I=Ze[A];if(I!==void 0)return wI(I)})(te),de=J.message;te==="NOT_FOUND"&&de.includes("database")&&de.includes("does not exist")&&de.includes(this.databaseId.database)&&at(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),he===void 0&&(he=S.INTERNAL,de="Unknown error status: "+te+" with message "+J.message),p=!0,C.Cn(new k(he,de)),B.close()}else U(wt,`RPC '${e}' stream ${s} received:`,N),C.Fn(N)}})),Ri.Mn(),setTimeout((()=>{C.Dn()}),0),C}terminate(){this.On.forEach((e=>e.close())),this.On=[]}kn(e){this.On.push(e)}Qn(e){this.On=this.On.filter((t=>t===e))}An(e,t,n){super.An(e,t,n),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return DE()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rS(r){return new Ri(r)}Ri.Nn=!1;class Gd{constructor(e,t,n=1e3,s=1.5,i=6e4){this.qn=e,this.timerId=t,this.Kn=n,this.Wn=s,this.Gn=i,this.jn=0,this.zn=null,this.Hn=Date.now(),this.reset()}reset(){this.jn=0}Jn(){this.jn=this.Gn}Yn(e){this.cancel();const t=Math.floor(this.jn+this.Zn()),n=Math.max(0,Date.now()-this.Hn),s=Math.max(0,t-n);s>0&&U("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.jn} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.zn=this.qn.enqueueAfterDelay(this.timerId,s,(()=>(this.Hn=Date.now(),e()))),this.jn*=this.Wn,this.jn<this.Kn&&(this.jn=this.Kn),this.jn>this.Gn&&(this.jn=this.Gn)}Xn(){this.zn!==null&&(this.zn.skipDelay(),this.zn=null)}cancel(){this.zn!==null&&(this.zn.cancel(),this.zn=null)}Zn(){return(Math.random()-.5)*this.jn}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mg="PersistentStream";class KI{constructor(e,t,n,s,i,o,a,c){this.qn=e,this.er=n,this.tr=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.nr=0,this.rr=null,this.ir=null,this.stream=null,this.sr=0,this._r=new Gd(e,t)}ar(){return this.state===1||this.state===5||this.ur()}ur(){return this.state===2||this.state===3}start(){this.sr=0,this.state!==4?this.auth():this.cr()}async stop(){this.ar()&&await this.close(0)}lr(){this.state=0,this._r.reset()}Er(){this.ur()&&this.rr===null&&(this.rr=this.qn.enqueueAfterDelay(this.er,6e4,(()=>this.hr())))}Tr(e){this.Pr(),this.stream.send(e)}async hr(){if(this.ur())return this.close(0)}Pr(){this.rr&&(this.rr.cancel(),this.rr=null)}Ir(){this.ir&&(this.ir.cancel(),this.ir=null)}async close(e,t){this.Pr(),this.Ir(),this._r.cancel(),this.nr++,e!==4?this._r.reset():t&&t.code===S.RESOURCE_EXHAUSTED?($e(t.toString()),$e("Using maximum backoff delay to prevent overloading the backend."),this._r.Jn()):t&&t.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Rr(),this.stream.close(),this.stream=null),this.state=e,await this.listener.bn(t)}Rr(){}auth(){this.state=1;const e=this.Ar(this.nr),t=this.nr;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,s])=>{this.nr===t&&this.Vr(n,s)}),(n=>{e((()=>{const s=new k(S.UNKNOWN,"Fetching auth token failed: "+n.message);return this.dr(s)}))}))}Vr(e,t){const n=this.Ar(this.nr);this.stream=this.mr(e,t),this.stream.pn((()=>{n((()=>this.listener.pn()))})),this.stream.yn((()=>{n((()=>(this.state=2,this.ir=this.qn.enqueueAfterDelay(this.tr,1e4,(()=>(this.ur()&&(this.state=3),Promise.resolve()))),this.listener.yn())))})),this.stream.bn((s=>{n((()=>this.dr(s)))})),this.stream.onMessage((s=>{n((()=>++this.sr==1?this.pr(s):this.onNext(s)))}))}cr(){this.state=5,this._r.Yn((async()=>{this.state=0,this.start()}))}dr(e){return U(Mg,`close with error: ${e}`),this.stream=null,this.close(4,e)}Ar(e){return t=>{this.qn.enqueueAndForget((()=>this.nr===e?t():(U(Mg,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class sS extends KI{constructor(e,t,n,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}mr(e,t){return this.connection.Un("Listen",e,t)}pr(e){return this.onNext(e)}onNext(e){this._r.reset();const t=GP(this.serializer,e),n=(function(i){if(!("targetChange"in i))return re.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?re.min():o.readTime?Xe(o.readTime):re.min()})(e);return this.listener.gr(t,n)}yr(e){const t={};t.database=yh(this.serializer),t.addTarget=(function(i,o){let a;const c=o.target;if(a=Qn(c)?{pipelineQuery:VI(i,c)}:Od(c)?{documents:FI(i,c)}:{query:Il(i,c).Lt},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=Eh(i,o.resumeToken);const l=_h(i,o.expectedCount);l!==null&&(a.expectedCount=l)}else if(o.snapshotVersion.compareTo(re.min())>0){a.readTime=Ls(i,o.snapshotVersion.toTimestamp());const l=_h(i,o.expectedCount);l!==null&&(a.expectedCount=l)}return a})(this.serializer,e);const n=HP(this.serializer,e);n&&(t.labels=n),this.Tr(t)}wr(e){const t={};t.database=yh(this.serializer),t.removeTarget=e,this.Tr(t)}}class iS extends KI{constructor(e,t,n,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}get br(){return this.sr>0}start(){this.lastStreamToken=void 0,super.start()}Rr(){this.br&&this.Sr([])}mr(e,t){return this.connection.Un("Write",e,t)}pr(e){return j(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,j(!e.writeResults||e.writeResults.length===0,55816),this.listener.vr()}onNext(e){j(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this._r.reset();const t=UP(e.writeResults,e.commitTime),n=Xe(e.commitTime);return this.listener.Dr(n,t)}Cr(){const e={};e.database=yh(this.serializer),this.Tr(e)}Sr(e){const t={streamToken:this.lastStreamToken,writes:e.map((n=>Ma(this.serializer,n)))};this.Tr(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oS{}class aS extends oS{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.Fr=!1}Or(){if(this.Fr)throw new k(S.FAILED_PRECONDITION,"The client has already been terminated.")}In(e,t,n,s){return this.Or(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.In(e,Ih(t,n),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new k(S.UNKNOWN,i.toString())}))}dn(e,t,n,s,i){return this.Or(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,a])=>this.connection.dn(e,Ih(t,n),s,o,a,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new k(S.UNKNOWN,o.toString())}))}terminate(){this.Fr=!0,this.connection.terminate()}}function cS(r,e,t,n){return new aS(r,e,t,n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uS="ComponentProvider",Gg=new Map;function lS(r,e,t,n,s){return new eP(r,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,JI(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,n,s._customHeaders,s.grpcFlowControlWindow)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ug={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},zI=41943040;class Dt{static withCacheSize(e){return new Dt(e,Dt.DEFAULT_COLLECTION_PERCENTILE,Dt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}Dt.DEFAULT_COLLECTION_PERCENTILE=10,Dt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Dt.DEFAULT=new Dt(zI,Dt.DEFAULT_COLLECTION_PERCENTILE,Dt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Dt.DISABLED=new Dt(-1,0,0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.Mr(n),this.Nr=n=>t.writeSequenceNumber(n))}Mr(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.Nr&&this.Nr(e),e}}Gt.Br=-1;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WI="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class $I{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rs(r){if(r.code!==S.FAILED_PRECONDITION||r.message!==WI)throw r;U("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&Z(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new P(((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(n,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof P?t:P.resolve(t)}catch(t){return P.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):P.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):P.reject(t)}static resolve(e){return new P(((t,n)=>{t(e)}))}static reject(e){return new P(((t,n)=>{n(e)}))}static waitFor(e){return new P(((t,n)=>{let s=0,i=0,o=!1;e.forEach((a=>{++s,a.next((()=>{++i,o&&i===s&&t()}),(c=>n(c)))})),o=!0,i===s&&t()}))}static or(e){let t=P.resolve(!1);for(const n of e)t=t.next((s=>s?P.resolve(s):n()));return t}static forEach(e,t){const n=[];return e.forEach(((s,i)=>{n.push(t.call(this,s,i))})),this.waitFor(n)}static mapArray(e,t){return new P(((n,s)=>{const i=e.length,o=new Array(i);let a=0;for(let c=0;c<i;c++){const l=c;t(e[l]).next((B=>{o[l]=B,++a,a===i&&n(o)}),(B=>s(B)))}}))}static doWhile(e,t){return new P(((n,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):n()};i()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qt="SimpleDb";class Al{static open(e,t,n,s){try{return new Al(t,e.transaction(s,n))}catch(i){throw new Ca(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.Lr=new gt,this.transaction.oncomplete=()=>{this.Lr.resolve()},this.transaction.onabort=()=>{t.error?this.Lr.reject(new Ca(e,t.error)):this.Lr.resolve()},this.transaction.onerror=n=>{const s=Ud(n.target.error);this.Lr.reject(new Ca(e,s))}}get $r(){return this.Lr.promise}abort(e){e&&this.Lr.reject(e),this.aborted||(U(Qt,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}Ur(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new hS(t)}}class xn{static delete(e){return U(Qt,"Removing database:",e),Is(jm().indexedDB.deleteDatabase(e)).toPromise()}static cn(){if(!Qu())return!1;if(xn.kr())return!0;const e=ot(),t=xn.Qr(e),n=0<t&&t<10,s=QI(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static kr(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)==null?void 0:e.__PRIVATE_USE_MOCK_PERSISTENCE)==="YES"}static qr(e,t){return e.store(t)}static Qr(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.Kr=n,this.Wr=null,xn.Qr(ot())===12.2&&$e("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async Gr(e){return this.db||(U(Qt,"Opening database:",this.name),this.db=await new Promise(((t,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{n(new Ca(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?n(new k(S.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new k(S.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new Ca(e,o))},s.onupgradeneeded=i=>{U(Qt,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.Kr.jr(o,s.transaction,i.oldVersion,this.version).next((()=>{U(Qt,"Database upgrade to version "+this.version+" complete")}))}}))),this.zr&&(this.db.onversionchange=t=>this.zr(t)),this.db}Hr(e){this.zr=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.Gr(e);const a=Al.open(this.db,e,i?"readonly":"readwrite",n),c=s(a).next((l=>(a.Ur(),l))).catch((l=>(a.abort(l),P.reject(l)))).toPromise();return c.catch((()=>{})),await a.$r,c}catch(a){const c=a,l=c.name!=="FirebaseError"&&o<3;if(U(Qt,"Transaction failed with error:",c.message,"Retrying:",l),this.close(),!l)return Promise.reject(c)}}}close(){this.db&&this.db.close(),this.db=void 0}}function QI(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class BS{constructor(e){this.Jr=e,this.Yr=!1,this.Zr=null}get isDone(){return this.Yr}get Xr(){return this.Zr}set cursor(e){this.Jr=e}done(){this.Yr=!0}ei(e){this.Zr=e}delete(){return Is(this.Jr.delete())}}class Ca extends k{constructor(e,t){super(S.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function ss(r){return r.name==="IndexedDbTransactionError"}class hS{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(U(Qt,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(U(Qt,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),Is(n)}add(e){return U(Qt,"ADD",this.store.name,e,e),Is(this.store.add(e))}get(e){return Is(this.store.get(e)).next((t=>(t===void 0&&(t=null),U(Qt,"GET",this.store.name,e,t),t)))}delete(e){return U(Qt,"DELETE",this.store.name,e),Is(this.store.delete(e))}count(){return U(Qt,"COUNT",this.store.name),Is(this.store.count())}ti(e,t){const n=this.options(e,t),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new P(((o,a)=>{i.onerror=c=>{a(c.target.error)},i.onsuccess=c=>{o(c.target.result)}}))}{const i=this.cursor(n),o=[];return this.ni(i,((a,c)=>{o.push(c)})).next((()=>o))}}ri(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new P(((s,i)=>{n.onerror=o=>{i(o.target.error)},n.onsuccess=o=>{s(o.target.result)}}))}ii(e,t){U(Qt,"DELETE ALL",this.store.name);const n=this.options(e,t);n.si=!1;const s=this.cursor(n);return this.ni(s,((i,o,a)=>a.delete()))}_i(e,t){let n;t?n=e:(n={},t=e);const s=this.cursor(n);return this.ni(s,t)}oi(e){const t=this.cursor({});return new P(((n,s)=>{t.onerror=i=>{const o=Ud(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next((a=>{a?o.continue():n()})):n()}}))}ni(e,t){const n=[];return new P(((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const a=o.target.result;if(!a)return void s();const c=new BS(a),l=t(a.primaryKey,a.value,c);if(l instanceof P){const B=l.catch((h=>(c.done(),P.reject(h))));n.push(B)}c.isDone?s():c.Xr===null?a.continue():a.continue(c.Xr)}})).next((()=>P.waitFor(n)))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.si?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Is(r){return new P(((e,t)=>{r.onsuccess=n=>{const s=n.target.result;e(s)},r.onerror=n=>{const s=Ud(n.target.error);t(s)}}))}let Hg=!1;function Ud(r){const e=xn.Qr(ot());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new k("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Hg||(Hg=!0,setTimeout((()=>{throw n}),0)),n}}return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qg="LruGarbageCollector",YI=1048576;function jg([r,e],[t,n]){const s=ce(r,t);return s===0?ce(e,n):s}class dS{constructor(e){this.ai=e,this.buffer=new ve(jg),this.ui=0}ci(){return++this.ui}li(e){const t=[e,this.ci()];if(this.buffer.size<this.ai)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();jg(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class XI{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Ei=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.hi(6e4)}stop(){this.Ei&&(this.Ei.cancel(),this.Ei=null)}get started(){return this.Ei!==null}hi(e){U(qg,`Garbage collection scheduled in ${e}ms`),this.Ei=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Ei=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){ss(t)?U(qg,"Ignoring IndexedDB error during garbage collection: ",t):await rs(t)}await this.hi(3e5)}))}}class fS{constructor(e,t){this.Ti=e,this.params=t}calculateTargetCount(e,t){return this.Ti.Pi(e).next((n=>Math.floor(t/100*n)))}nthSequenceNumber(e,t){if(t===0)return P.resolve(Gt.Br);const n=new dS(t);return this.Ti.forEachTarget(e,(s=>n.li(s.sequenceNumber))).next((()=>this.Ti.Ii(e,(s=>n.li(s))))).next((()=>n.maxValue))}removeTargets(e,t,n){return this.Ti.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Ti.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(U("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(Ug)):this.getCacheSize(e).next((n=>n<this.params.cacheSizeCollectionThreshold?(U("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ug):this.Ri(e,t)))}getCacheSize(e){return this.Ti.getCacheSize(e)}Ri(e,t){let n,s,i,o,a,c,l;const B=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((h=>(h>this.params.maximumSequenceNumbersToCollect?(U("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${h}`),s=this.params.maximumSequenceNumbersToCollect):s=h,o=Date.now(),this.nthSequenceNumber(e,s)))).next((h=>(n=h,a=Date.now(),this.removeTargets(e,n,t)))).next((h=>(i=h,c=Date.now(),this.removeOrphanedDocuments(e,n)))).next((h=>(l=Date.now(),Ei()<=me.DEBUG&&U("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-B}ms
	Determined least recently used ${s} in `+(a-o)+`ms
	Removed ${i} targets in `+(c-a)+`ms
	Removed ${h} documents in `+(l-c)+`ms
Total Duration: ${l-B}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:h}))))}}function ZI(r,e){return new fS(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ey="firestore.googleapis.com",Jg=!0;class Kg{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new k(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=ey,this.ssl=Jg}else this.host=e.host,this.ssl=e.ssl??Jg;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e._customHeaders&&(this._customHeaders={...e._customHeaders}),e.cacheSizeBytes===void 0)this.cacheSizeBytes=zI;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<YI)throw new k(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}if(VE("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=JI(e.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams,e.grpcFlowControlWindow!==void 0){if(typeof e.grpcFlowControlWindow!="number"||e.grpcFlowControlWindow<=0||e.grpcFlowControlWindow>2147483647||!Number.isInteger(e.grpcFlowControlWindow))throw new k(S.INVALID_ARGUMENT,"grpcFlowControlWindow must be a positive integer and cannot exceed 2147483647");this.grpcFlowControlWindow=e.grpcFlowControlWindow}}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(n,s){return n.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams&&this.grpcFlowControlWindow===e.grpcFlowControlWindow&&(function(n,s){if(n===s)return!0;if(!n||!s)return!1;const i=Object.keys(n),o=Object.keys(s);if(i.length!==o.length)return!1;for(const a of i)if(n[a]!==s[a])return!1;return!0})(this._customHeaders,e._customHeaders)}}let ac=class{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Kg({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new k(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new k(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Kg(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new jI;switch(n.type){case"firstParty":return new QP(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new k(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const n=Gg.get(t);n&&(U(uS,"Removing Datastore"),Gg.delete(t),n.terminate())})(this),Promise.resolve()}};function ty(r,e,t,n={}){var l;r=ge(r,ac);const s=ao(e),i=r._getSettings(),o={...i,emulatorOptions:r._getEmulatorOptions()},a=`${e}:${t}`;s&&Qh(`https://${a}`),i.host!==ey&&i.host!==a&&at("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...i,host:a,ssl:s,emulatorOptions:n};if(!sn(c,o)&&(r._setSettings(c),n.mockUserToken)){let B,h;if(typeof n.mockUserToken=="string")B=n.mockUserToken,h=dt.MOCK_USER;else{B=uT(n.mockUserToken,(l=r._app)==null?void 0:l.options.projectId);const p=n.mockUserToken.sub||n.mockUserToken.user_id;if(!p)throw new k(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new dt(p)}r._authCredentials=new zP(new qI(B,h))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new ct(this.firestore,e,this._query)}}class be{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Cn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new be(this.firestore,e,this._key)}toJSON(){return{type:be._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(Zs(t,be._jsonSchema))return new be(e,n||null,new z(Be.fromString(t.referencePath)))}}be._jsonSchemaVersion="firestore/documentReference/1.0",be._jsonSchema={type:Qe("string",be._jsonSchemaVersion),referencePath:Qe("string")};class Cn extends ct{constructor(e,t,n){super(e,t,Co(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new be(this.firestore,null,new z(e))}withConverter(e){return new Cn(this.firestore,e,this._path)}}function pS(r,e,...t){if(r=ne(r),wd("collection","path",e),r instanceof ac){const n=Be.fromString(e,...t);return hg(n),new Cn(r,null,n)}{if(!(r instanceof be||r instanceof Cn))throw new k(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Be.fromString(e,...t));return hg(n),new Cn(r.firestore,null,n)}}function CS(r,e){if(r=ge(r,ac),wd("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new k(S.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new ct(r,null,(function(n){return new Cr(Be.emptyPath(),n)})(e))}function ny(r,e,...t){if(r=ne(r),arguments.length===1&&(e=Bl.newId()),wd("doc","path",e),r instanceof ac){const n=Be.fromString(e,...t);return Bg(n),new be(r,null,new z(n))}{if(!(r instanceof be||r instanceof Cn))throw new k(S.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Be.fromString(e,...t));return Bg(n),new be(r.firestore,r instanceof Cn?r.converter:null,new z(n))}}function gS(r,e){return r=ne(r),e=ne(e),(r instanceof be||r instanceof Cn)&&(e instanceof be||e instanceof Cn)&&r.firestore===e.firestore&&r.path===e.path&&r.converter===e.converter}function Hd(r,e){return r=ne(r),e=ne(e),r instanceof ct&&e instanceof ct&&r.firestore===e.firestore&&II(r._query,e._query)&&r.converter===e.converter}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bl{constructor(e,t){this.pattern=e,this.options=t}isEqual(e){return this.pattern===e.pattern&&this.options===e.options}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:xt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Zs(e,xt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new xt(e.vectorValues);throw new k(S.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}xt._jsonSchemaVersion="firestore/vectorValue/1.0",xt._jsonSchema={type:Qe("string",xt._jsonSchemaVersion),vectorValues:Qe("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mS=/^__.*__$/;class _S{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new pr(e,this.data,this.fieldMask,t,this.fieldTransforms):new fo(e,this.data,t,this.fieldTransforms)}}class ry{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new pr(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function sy(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Z(40011,{dataSource:r})}}class vl{constructor(e,t,n,s,i,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new vl({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){var s;const t=(s=this.path)==null?void 0:s.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePathSegment(e),n}childContextForFieldPath(e){var s;const t=(s=this.path)==null?void 0:s.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePath(),n}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Nu(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(sy(this.dataSource)&&mS.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class ES{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||ni(e)}createContext(e,t,n,s=!1){return new vl({dataSource:e,methodName:t,targetDoc:n,path:Ye.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function si(r){const e=r._freezeSettings(),t=ni(r._databaseId);return new ES(r._databaseId,!!e.ignoreUndefinedProperties,t)}function Rl(r,e,t,n,s,i={}){const o=r.createContext(i.merge||i.mergeFields?2:0,e,t,s);Yd("Data must be an object, but it was:",o,n);const a=ay(n,o);let c,l;if(i.merge)c=new Mt(o.fieldMask),l=o.fieldTransforms;else if(i.mergeFields){const B=[];for(const h of i.mergeFields){const p=_n(e,h,t);if(!o.contains(p))throw new k(S.INVALID_ARGUMENT,`Field '${p}' is specified in your field mask but missing from your input data.`);ly(B,p)||B.push(p)}c=new Mt(B),l=o.fieldTransforms.filter((h=>c.covers(h.field)))}else c=null,l=o.fieldTransforms;return new _S(new it(a),c,l)}class cc extends jn{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof cc}}function iy(r,e,t){return new vl({dataSource:3,targetDoc:e.settings.targetDoc,methodName:r._methodName,arrayElement:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class qd extends jn{_toFieldTransform(e){return new ti(e.path,new Ui)}isEqual(e){return e instanceof qd}}class jd extends jn{constructor(e,t){super(e),this.Ai=t}_toFieldTransform(e){const t=iy(this,e,!0),n=this.Ai.map((i=>Mn(i,t))),s=new Hs(n);return new ti(e.path,s)}isEqual(e){return e instanceof jd&&sn(this.Ai,e.Ai)}}class Jd extends jn{constructor(e,t){super(e),this.Ai=t}_toFieldTransform(e){const t=iy(this,e,!0),n=this.Ai.map((i=>Mn(i,t))),s=new qs(n);return new ti(e.path,s)}isEqual(e){return e instanceof Jd&&sn(this.Ai,e.Ai)}}class Kd extends jn{constructor(e,t){super(e),this.Vi=t}_toFieldTransform(e){const t=new js(e.serializer,ei(e.serializer,this.Vi));return new ti(e.path,t)}isEqual(e){return e instanceof Kd&&(this.Vi===e.Vi||Number.isNaN(this.Vi)&&Number.isNaN(e.Vi))}}class zd extends jn{constructor(e,t){super(e),this.Vi=t}_toFieldTransform(e){const t=new Hi(e.serializer,ei(e.serializer,this.Vi));return new ti(e.path,t)}isEqual(e){return e instanceof zd&&(this.Vi===e.Vi||Number.isNaN(this.Vi)&&Number.isNaN(e.Vi))}}class Wd extends jn{constructor(e,t){super(e),this.Vi=t}_toFieldTransform(e){const t=new qi(e.serializer,ei(e.serializer,this.Vi));return new ti(e.path,t)}isEqual(e){return e instanceof Wd&&(this.Vi===e.Vi||Number.isNaN(this.Vi)&&Number.isNaN(e.Vi))}}function $d(r,e,t,n){const s=r.createContext(1,e,t);Yd("Data must be an object, but it was:",s,n);const i=[],o=it.empty();ts(n,((c,l)=>{const B=Xd(e,c,t);l=ne(l);const h=s.childContextForFieldPath(B);if(l instanceof cc)i.push(B);else{const p=Mn(l,h);p!=null&&(i.push(B),o.set(B,p))}}));const a=new Mt(i);return new ry(o,a,s.fieldTransforms)}function Qd(r,e,t,n,s,i){const o=r.createContext(1,e,t),a=[_n(e,n,t)],c=[s];if(i.length%2!=0)throw new k(S.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let p=0;p<i.length;p+=2)a.push(_n(e,i[p])),c.push(i[p+1]);const l=[],B=it.empty();for(let p=a.length-1;p>=0;--p)if(!ly(l,a[p])){const C=a[p];let m=c[p];m=ne(m);const D=o.childContextForFieldPath(C);if(m instanceof cc)l.push(C);else{const N=Mn(m,D);N!=null&&(l.push(C),B.set(C,N))}}const h=new Mt(l);return new ry(B,h,o.fieldTransforms)}function oy(r,e,t,n=!1){return Mn(t,r.createContext(n?4:3,e))}function Mn(r,e,t){if(uy(r=ne(r)))return Yd("Unsupported field value:",e,r),ay(r,e);if(r instanceof jn)return(function(s,i){if(!sy(i.dataSource))throw i.createError(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${s._methodName}() is not currently supported inside arrays`);const o=s._toFieldTransform(i);o&&i.fieldTransforms.push(o)})(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return(function(s,i){const o=[];let a=0;for(const c of s){let l=Mn(c,i.childContextForArray(a));l==null&&(l={nullValue:"NULL_VALUE"}),o.push(l),a++}return{arrayValue:{values:o}}})(r,e)}return(function(s,i,o){if((s=ne(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return ei(i.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const a=we.fromDate(s);return{timestampValue:Ls(i.serializer,a)}}if(s instanceof we){const a=new we(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:Ls(i.serializer,a)}}if(cy(s)){const a=we.fromInstant(s),c=new we(a.seconds,1e3*Math.floor(a.nanoseconds/1e3));return{timestampValue:Ls(i.serializer,c)}}if(s instanceof pn)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof Nt)return s.subtype===0?{bytesValue:Eh(i.serializer,s._byteString)}:(function(c,l){const B=l.toUint8Array(),h=new Uint8Array(B.length+1);return h[0]=l.subtype,h.set(B,1),{mapValue:{fields:{[Mi]:{bytesValue:Eh(c,Re.fromUint8Array(h))}}}}})(i.serializer,s);if(s instanceof be){const a=i.databaseId,c=s.firestore._databaseId;if(!c.isEqual(a))throw i.createError(`Document reference is for database ${c.projectId}/${c.database} but should be for database ${a.projectId}/${a.database}`);return{referenceValue:Md(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof xt)return(function(c,l){const B=c instanceof xt?c.toArray():c;return{mapValue:{fields:{[fl]:{stringValue:pl},[Gs]:{arrayValue:{values:B.map((p=>{if(typeof p!="number")throw l.createError("VectorValues must only contain numeric values.");return bd(l.serializer,p)}))}}}}}})(s,i);if(s instanceof bl)return(function(c){return{mapValue:{fields:{[An]:{mapValue:{fields:{[Vi]:{stringValue:c.pattern},[ki]:{stringValue:c.options}}}}}}}})(s);if(s instanceof yl)return(function(c){return{mapValue:{fields:{[Us]:{stringValue:c.value}}}}})(s);if(s instanceof Tl)return(function(c){return{mapValue:{fields:{[ns]:bi(c.value)}}}})(s);if(s instanceof Dl)return(function(c){return{mapValue:{fields:{[cr]:{stringValue:c.stringValue}}}}})(s);if(s instanceof wl)return(function(c){return{mapValue:{fields:{[Zn]:{mapValue:{fields:{[Oa]:bi(c.seconds),[Fa]:bi(c.increment)}}}}}}})(s);if(s instanceof Pn)return(function(){return{mapValue:{fields:{[Dd]:{nullValue:"NULL_VALUE"}}}}})();if(s instanceof Rn)return(function(){return{mapValue:{fields:{[sc]:{nullValue:"NULL_VALUE"}}}}})();if(UI(s))return s._toProto(i.serializer);throw i.createError(`Unsupported field value: ${hl(s)}`)})(r,e)}function ay(r,e){const t={};return LE(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):ts(r,((n,s)=>{const i=Mn(s,e.childContextForField(n));i!=null&&(t[n]=i)})),{mapValue:{fields:t}}}function cy(r){if(typeof r!="object"||r===null)return!1;if(typeof Temporal<"u"&&typeof Temporal.Instant=="function"&&r instanceof Temporal.Instant)return!0;const e=r;return e[Symbol.toStringTag]==="Temporal.Instant"&&typeof e.t=="bigint"}function uy(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof we||r instanceof pn||r instanceof Nt||r instanceof be||r instanceof jn||r instanceof xt||r instanceof Pn||r instanceof Rn||r instanceof Tl||r instanceof Dl||r instanceof bl||r instanceof yl||r instanceof wl||cy(r)||UI(r))}function Yd(r,e,t){if(!uy(t)||!tc(t)){const n=hl(t);throw n==="an object"?e.createError(r+" a custom object"):e.createError(r+" "+n)}}function _n(r,e,t){if((e=ne(e))instanceof ri)return e._internalPath;if(typeof e=="string")return Xd(r,e);throw Nu("Field path arguments must be of type string or ",r,!1,void 0,t)}const IS=new RegExp("[~\\*/\\[\\]]");function Xd(r,e,t){if(e.search(IS)>=0)throw Nu(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new ri(...e.split("."))._internalPath}catch{throw Nu(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function Nu(r,e,t,n,s){const i=n&&!n.isEmpty(),o=s!==void 0;let a=`Function ${e}() called with invalid data`;t&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${n}`),o&&(c+=` in document ${s}`),c+=")"),new k(S.INVALID_ARGUMENT,a+r+c)}function ly(r,e){return r.some((t=>t.isEqual(e)))}function By(r){return typeof r._readUserData=="function"}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){const n=it.empty();for(const s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){const i=this.optionDefinitions[s];if(s in e){const o=e[s];let a;i.nestedOptions&&tc(o)?a={mapValue:{fields:new Rt(i.nestedOptions).getOptionsProto(t,o)}}:o&&(a=Mn(o,t)??void 0),a&&n.set(Ye.fromServerFormat(i.serverName),a)}}return n}getOptionsProto(e,t,n){const s=this._getKnownOptions(t,e);if(n){const i=new Map(yd(n,((o,a)=>[Ye.fromServerFormat(a),o!==void 0?Mn(o,e):null])));s.setAll(i)}return s.value.mapValue.fields??{}}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yS(r){return typeof r=="object"&&r!==null&&!!("nullValue"in r&&(r.nullValue===null||r.nullValue==="NULL_VALUE")||"booleanValue"in r&&(r.booleanValue===null||typeof r.booleanValue=="boolean")||"integerValue"in r&&(r.integerValue===null||typeof r.integerValue=="number"||typeof r.integerValue=="string")||"doubleValue"in r&&(r.doubleValue===null||typeof r.doubleValue=="number")||"timestampValue"in r&&(r.timestampValue===null||(function(t){return typeof t=="object"&&t!==null&&"seconds"in t&&(t.seconds===null||typeof t.seconds=="number"||typeof t.seconds=="string")&&"nanos"in t&&(t.nanos===null||typeof t.nanos=="number")})(r.timestampValue))||"stringValue"in r&&(r.stringValue===null||typeof r.stringValue=="string")||"bytesValue"in r&&(r.bytesValue===null||r.bytesValue instanceof Uint8Array)||"referenceValue"in r&&(r.referenceValue===null||typeof r.referenceValue=="string")||"geoPointValue"in r&&(r.geoPointValue===null||(function(t){return typeof t=="object"&&t!==null&&"latitude"in t&&(t.latitude===null||typeof t.latitude=="number")&&"longitude"in t&&(t.longitude===null||typeof t.longitude=="number")})(r.geoPointValue))||"arrayValue"in r&&(r.arrayValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("values"in t)||t.values!==null&&!Array.isArray(t.values))})(r.arrayValue))||"mapValue"in r&&(r.mapValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("fields"in t)||t.fields!==null&&!tc(t.fields))})(r.mapValue))||"fieldReferenceValue"in r&&(r.fieldReferenceValue===null||typeof r.fieldReferenceValue=="string")||"functionValue"in r&&(r.functionValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("name"in t)||t.name!==null&&typeof t.name!="string"||!("args"in t)||t.args!==null&&!Array.isArray(t.args))})(r.functionValue))||"pipelineValue"in r&&(r.pipelineValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("stages"in t)||t.stages!==null&&!Array.isArray(t.stages))})(r.pipelineValue)))}function wS(){return new cc("deleteField")}function DS(){return new qd("serverTimestamp")}function TS(...r){return new jd("arrayUnion",r)}function AS(...r){return new Jd("arrayRemove",r)}function bS(r){return new Kd("increment",r)}function vS(r){return new zd("minimum",r)}function RS(r){return new Wd("maximum",r)}function hy(r){return new xt(r)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W(r){let e;return r instanceof is?r:(e=tc(r)?FS(r):r instanceof Array?xS(r):dy(r,void 0),e)}function UB(r){if(r instanceof is)return r;if(r instanceof xt)return Ua(r);if(Array.isArray(r))return Ua(hy(r));throw new Error("Unsupported value: "+typeof r)}function Pl(r){return lh(r)?hu(r):W(r)}class is{constructor(){this._protoValueType="ProtoValue"}add(e){return new V("add",[this,W(e)],"add")}asBoolean(){if(this instanceof Wr)return this;if(this instanceof oi)return new py(this);if(this instanceof ii)return new OS(this);if(this instanceof V)return new fy(this);throw new k("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new V("subtract",[this,W(e)],"subtract")}multiply(e){return new V("multiply",[this,W(e)],"multiply")}divide(e){return new V("divide",[this,W(e)],"divide")}mod(e){return new V("mod",[this,W(e)],"mod")}equal(e){return new V("equal",[this,W(e)],"equal").asBoolean()}notEqual(e){return new V("not_equal",[this,W(e)],"notEqual").asBoolean()}lessThan(e){return new V("less_than",[this,W(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new V("less_than_or_equal",[this,W(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new V("greater_than",[this,W(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new V("greater_than_or_equal",[this,W(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){const n=[e,...t].map((s=>W(s)));return new V("array_concat",[this,...n],"arrayConcat")}arrayContains(e){return new V("array_contains",[this,W(e)],"arrayContains").asBoolean()}arrayContainsAll(e){const t=Array.isArray(e)?new sa(e.map(W),"arrayContainsAll"):e;return new V("array_contains_all",[this,t],"arrayContainsAll").asBoolean()}arrayContainsAny(e){const t=Array.isArray(e)?new sa(e.map(W),"arrayContainsAny"):e;return new V("array_contains_any",[this,t],"arrayContainsAny").asBoolean()}arrayReverse(){return new V("array_reverse",[this])}arrayLength(){return new V("array_length",[this],"arrayLength")}equalAny(e){const t=Array.isArray(e)?new sa(e.map(W),"equalAny"):e;return new V("equal_any",[this,t],"equalAny").asBoolean()}notEqualAny(e){const t=Array.isArray(e)?new sa(e.map(W),"notEqualAny"):e;return new V("not_equal_any",[this,t],"notEqualAny").asBoolean()}exists(){return new V("exists",[this],"exists").asBoolean()}charLength(){return new V("char_length",[this],"charLength")}like(e){return new V("like",[this,W(e)],"like").asBoolean()}regexContains(e){return new V("regex_contains",[this,W(e)],"regexContains").asBoolean()}regexFind(e){return new V("regex_find",[this,W(e)],"regexFind")}regexFindAll(e){return new V("regex_find_all",[this,W(e)],"regexFindAll")}regexMatch(e){return new V("regex_match",[this,W(e)],"regexMatch").asBoolean()}stringContains(e){return new V("string_contains",[this,W(e)],"stringContains").asBoolean()}startsWith(e){return new V("starts_with",[this,W(e)],"startsWith").asBoolean()}endsWith(e){return new V("ends_with",[this,W(e)],"endsWith").asBoolean()}toLower(){return new V("to_lower",[this],"toLower")}toUpper(){return new V("to_upper",[this],"toUpper")}trim(e){const t=[this];return e&&t.push(W(e)),new V("trim",t,"trim")}ltrim(e){const t=[this];return e&&t.push(W(e)),new V("ltrim",t,"ltrim")}rtrim(e){const t=[this];return e&&t.push(W(e)),new V("rtrim",t,"rtrim")}type(){return new V("type",[this])}isType(e){return new V("is_type",[this,Ua(e)],"isType").asBoolean()}stringConcat(e,...t){const n=[e,...t].map(W);return new V("string_concat",[this,...n],"stringConcat")}stringIndexOf(e){return new V("string_index_of",[this,W(e)],"stringIndexOf")}stringRepeat(e){return new V("string_repeat",[this,W(e)],"stringRepeat")}stringReplaceAll(e,t){return new V("string_replace_all",[this,W(e),W(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new V("string_replace_one",[this,W(e),W(t)],"stringReplaceOne")}concat(e,...t){const n=[e,...t].map(W);return new V("concat",[this,...n],"concat")}reverse(){return new V("reverse",[this],"reverse")}arrayFilter(e,t){return new V("array_filter",[this,W(e),t],"arrayFilter")}arrayTransform(e,t){return new V("array_transform",[this,W(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,n){return new V("array_transform",[this,W(e),W(t),n],"arrayTransformWithIndex")}arraySlice(e,t){const n=[this,W(e)];return t!==void 0&&n.push(W(t)),new V("array_slice",n,"arraySlice")}arrayFirst(){return new V("array_first",[this],"arrayFirst")}arrayFirstN(e){return new V("array_first_n",[this,W(e)],"arrayFirstN")}arrayLast(){return new V("array_last",[this],"arrayLast")}arrayLastN(e){return new V("array_last_n",[this,W(e)],"arrayLastN")}arrayMaximum(){return new V("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new V("maximum_n",[this,W(e)],"arrayMaximumN")}arrayMinimum(){return new V("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new V("minimum_n",[this,W(e)],"arrayMinimumN")}arrayIndexOf(e){return new V("array_index_of",[this,W(e),W("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new V("array_index_of",[this,W(e),W("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new V("array_index_of_all",[this,W(e)],"arrayIndexOfAll")}byteLength(){return new V("byte_length",[this],"byteLength")}ceil(){return new V("ceil",[this])}floor(){return new V("floor",[this])}abs(){return new V("abs",[this])}exp(){return new V("exp",[this])}mapGet(e){return new V("map_get",[this,Ua(e)],"mapGet")}mapSet(e,t,...n){const s=[this,W(e),W(t),...n.map(W)];return new V("map_set",s,"mapSet")}mapKeys(){return new V("map_keys",[this],"mapKeys")}mapValues(){return new V("map_values",[this],"mapValues")}mapEntries(){return new V("map_entries",[this],"mapEntries")}getField(e){return new V("get_field",[this,W(e)],"get_field")}count(){return $t._create("count",[this],"count")}sum(){return $t._create("sum",[this],"sum")}average(){return $t._create("average",[this],"average")}minimum(){return $t._create("minimum",[this],"minimum")}maximum(){return $t._create("maximum",[this],"maximum")}first(){return $t._create("first",[this],"first")}last(){return $t._create("last",[this],"last")}arrayAgg(){return $t._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return $t._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return $t._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){const n=[e,...t];return new V("maximum",[this,...n.map(W)],"logicalMaximum")}logicalMinimum(e,...t){const n=[e,...t];return new V("minimum",[this,...n.map(W)],"minimum")}vectorLength(){return new V("vector_length",[this],"vectorLength")}cosineDistance(e){return new V("cosine_distance",[this,UB(e)],"cosineDistance")}dotProduct(e){return new V("dot_product",[this,UB(e)],"dotProduct")}euclideanDistance(e){return new V("euclidean_distance",[this,UB(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new V("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new V("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new V("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new V("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new V("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new V("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new V("timestamp_add",[this,W(e),W(t)],"timestampAdd")}timestampSubtract(e,t){return new V("timestamp_subtract",[this,W(e),W(t)],"timestampSubtract")}timestampDiff(e,t){return new V("timestamp_diff",[this,Pl(e),W(t)],"timestampDiff")}timestampExtract(e,t){const n=[this,W(e)];return t&&n.push(W(t)),new V("timestamp_extract",n,"timestampExtract")}documentId(){return new V("document_id",[this],"documentId")}parent(){return new V("parent",[this],"parent")}substring(e,t){const n=W(e);return new V("substring",t===void 0?[this,n]:[this,n,W(t)],"substring")}arrayGet(e){return new V("array_get",[this,W(e)],"arrayGet")}isError(){return new V("is_error",[this],"isError").asBoolean()}ifError(e){const t=new V("if_error",[this,W(e)],"ifError");return e instanceof Wr?t.asBoolean():t}isAbsent(){return new V("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new V("map_remove",[this,W(e)],"mapRemove")}mapMerge(e,...t){const n=W(e),s=t.map(W);return new V("map_merge",[this,n,...s],"mapMerge")}pow(e){return new V("pow",[this,W(e)])}trunc(e){return e===void 0?new V("trunc",[this]):new V("trunc",[this,W(e)],"trunc")}round(e){return e===void 0?new V("round",[this]):new V("round",[this,W(e)],"round")}collectionId(){return new V("collection_id",[this])}length(){return new V("length",[this])}ln(){return new V("ln",[this])}sqrt(){return new V("sqrt",[this])}stringReverse(){return new V("string_reverse",[this])}ifAbsent(e){return new V("if_absent",[this,W(e)],"ifAbsent")}ifNull(e){return new V("if_null",[this,W(e)],"ifNull")}coalesce(e,...t){return new V("coalesce",[this,W(e),...t.map(W)],"coalesce")}join(e){return new V("join",[this,W(e)],"join")}log10(){return new V("log10",[this])}arraySum(){return new V("sum",[this])}split(e){return new V("split",[this,W(e)])}timestampTruncate(e,t){const n=[this,W(e)];return t&&n.push(W(t)),new V("timestamp_trunc",n)}ascending(){return LS(this)}descending(){return VS(this)}as(e){return new SS(this,e,"as")}}class $t{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,n){const s=new $t(e,t);return s._methodName=n,s}as(e){return new PS(this,e,"as")}over(e){return new ef(this.name,this.params,new Cy(e),"over")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map((t=>t._toProto(e)))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e)))}}class PS{constructor(e,t,n){this.aggregate=e,this.alias=t,this._methodName=n}_readUserData(e){this.aggregate._readUserData(e)}}class SS{constructor(e,t,n){this.expr=e,this.alias=t,this._methodName=n,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}}class sa extends is{constructor(e,t){super(),this.di=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.di.map((t=>t._toProto(e)))}}}_readUserData(e){this.di.forEach((t=>t._readUserData(e)))}}class ii extends is{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new V("geo_distance",[this,W(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}}function hu(r){return NS(r,"field")}function NS(r,e){return new ii(typeof r=="string"?Tn===r?HI()._internalPath:_n("field",r):r._internalPath,e)}class oi extends is{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){const t=new oi(e,void 0);return t._protoValue=e,t}_toProto(e){return j(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,yS(this._protoValue)||(this._protoValue=Mn(this.value,e))}}function Ua(r,e){return dy(r,"constant")}function dy(r,e){const t=new oi(r,e);return typeof r=="boolean"?new py(t):t}class V extends is{constructor(e,t,n,s){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,n!==void 0&&(this._methodName=n),s!==void 0&&(this._options=s)}get _optionsUtil(){return new Rt({})}_toProto(e){const t={functionValue:{name:this.name,args:this.params.map((n=>n._toProto(e)))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e))),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}}class Wr extends is{get _methodName(){return this._expr._methodName}countIf(){return $t._create("count_if",[this],"countIf")}not(){return new V("not",[this],"not").asBoolean()}conditional(e,t){return new V("conditional",[this,e,t],"conditional")}ifError(e){const t=W(e),n=new V("if_error",[this,t],"ifError");return t instanceof Wr?n.asBoolean():n}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}}class fy extends Wr{constructor(e){super(),this._expr=e,this.expressionType="Function"}}class py extends Wr{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}}class OS extends Wr{constructor(e){super(),this._expr=e,this.expressionType="Field"}}function FS(r,e){const t=[];for(const n in r)if(Object.prototype.hasOwnProperty.call(r,n)){const s=r[n];t.push(Ua(n)),t.push(W(s))}return new V("map",t,"map")}function xS(r){return(function(t,n){return new V("array",t.map((s=>W(s))),n)})(r,"array")}function LS(r){return new Zd(Pl(r),"ascending","ascending")}function VS(r){return new Zd(Pl(r),"descending","descending")}class Zd{constructor(e,t,n){this.expr=e,this.direction=t,this._methodName=n,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:Su(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}}function zc(r){return r instanceof is}class Cy{constructor(e){this._protoValueType="ProtoValue";const t=e.sort;this.partition=(e.partition??[]).map(Pl),this.sort=t===void 0?[]:Array.isArray(t)?t:[t],this.documents=e.documents,this.range=e.range}_toProto(e){const t={};return this.partition.length>0&&(t.partition={arrayValue:{values:this.partition.map((n=>n._toProto(e)))}}),this.sort.length>0&&(t.sort={arrayValue:{values:this.sort.map((n=>n._toProto(e)))}}),this.documents!==void 0&&(t.documents=this.frameToProto(e,this.documents)),this.range!==void 0&&(t.range=this.frameToProto(e,this.range)),{mapValue:{fields:t}}}_readUserData(e){this.partition.forEach((t=>t._readUserData(e))),this.sort.forEach((t=>t._readUserData(e)));for(const t of[this.documents,this.range]){if(t===void 0)continue;zc(t.preceding)&&t.preceding._readUserData(e),zc(t.following)&&t.following._readUserData(e);const n=t.unit;n!==void 0&&zc(n)&&n._readUserData(e)}}frameToProto(e,t){const n={};t.preceding!==void 0&&(n.preceding=this.frameBoundToProto(e,t.preceding,"preceding")),t.following!==void 0&&(n.following=this.frameBoundToProto(e,t.following,"following"));const s=t.unit;return s!==void 0&&(n.unit=lh(s)?Su(s):s._toProto(e)),{mapValue:{fields:n}}}frameBoundToProto(e,t,n){if(typeof t=="number")return ei(e,t);if(lh(t))return Su(t);if(zc(t))return t._toProto(e);throw new k("invalid-argument",`Invalid window frame bound: '${n}'. Expected a number, 'current', 'unbounded', or an Expression.`)}}class ef{constructor(e,t=[],n,s){this.name=e,this.params=t,this.window=n,this._methodName=s,this.exprType="WindowFunction",this._protoValueType="ProtoValue"}over(e){return new ef(this.name,this.params,new Cy(e),this._methodName??"over")}as(e){return new kS(this,e,"as")}_toProto(e){const t={functionValue:{name:this.name,args:this.params.map((n=>n._toProto(e)))}};return this.window===void 0?t:{functionValue:{name:"over",args:[t,this.window._toProto(e)]}}}_readUserData(e){var t;e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((n=>n._readUserData(e))),(t=this.window)==null||t._readUserData(e)}}class kS{constructor(e,t,n){this.windowFunction=e,this.alias=t,this._methodName=n}_readUserData(e){this.windowFunction._readUserData(e)}}class en{constructor(e){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=e}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}}class gy extends en{get _name(){return"add_fields"}get _optionsUtil(){return new Rt({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[Ga(e,this.fields)]}}_readUserData(e){super._readUserData(e),Qr(this.fields,e)}}class my extends en{get _name(){return"aggregate"}get _optionsUtil(){return new Rt({})}constructor(e,t,n){super(n),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[Ga(e,this.accumulators),Ga(e,this.groups)]}}_readUserData(e){super._readUserData(e),Qr(this.groups,e),Qr(this.accumulators,e)}}class _y extends en{get _name(){return"distinct"}get _optionsUtil(){return new Rt({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[Ga(e,this.groups)]}}_readUserData(e){super._readUserData(e),Qr(this.groups,e)}}class uc extends en{get _name(){return"collection"}get _optionsUtil(){return new Rt({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.pi=GS(e)}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.pi}]}}_readUserData(e){super._readUserData(e)}}class lc extends en{get _name(){return"collection_group"}get _optionsUtil(){return new Rt({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}}class Sl extends en{get _name(){return"database"}get _optionsUtil(){return new Rt({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}}class Nl extends en{get _name(){return"documents"}get _optionsUtil(){return new Rt({})}constructor(e,t){if(super(t),!e||e.length===0)throw new k(S.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");const n=e.map((i=>i.startsWith("/")?i:"/"+i)),s=new Set(n);if(s.size!==n.length)throw new k(S.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.gi=n,this.yi=s}_toProto(e){return{...super._toProto(e),args:this.gi.map((t=>({referenceValue:t})))}}_readUserData(e){super._readUserData(e)}}class Bc extends en{get _name(){return"where"}get _optionsUtil(){return new Rt({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),Qr(this.condition,e)}}class $r extends en{get _name(){return"limit"}get _optionsUtil(){return new Rt({})}constructor(e,t){j(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[ei(e,this.limit)]}}}class zg extends en{get _name(){return"offset"}get _optionsUtil(){return new Rt({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[ei(e,this.offset)]}}}class MS extends en{get _name(){return"select"}get _optionsUtil(){return new Rt({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[Ga(e,this.selections)]}}_readUserData(e){super._readUserData(e),Qr(this.selections,e)}}class Sn extends en{get _name(){return"sort"}get _optionsUtil(){return new Rt({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map((t=>t._toProto(e)))}}_readUserData(e){super._readUserData(e),Qr(this.orderings,e)}}class tf extends en{get _name(){return"replace_with"}get _optionsUtil(){return new Rt({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),Su(tf.bi)]}}_readUserData(e){super._readUserData(e),Qr(this.map,e)}}tf.bi="full_replace";function GS(r){const e=typeof r=="string"?r:r.path;return e.startsWith("/")?e:"/"+e}function Qr(r,e){return By(r)?r._readUserData(e):Array.isArray(r)?r.forEach((t=>t._readUserData(e))):r instanceof Map?r.forEach((t=>t._readUserData(e))):Object.values(r).forEach((t=>t._readUserData(e))),r}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ga{constructor(e,t,n,s){this._db=e,this.userDataReader=t,this._userDataWriter=n,this.stages=s}Ci(e,t){const n=this.userDataReader.createContext(3,e);return By(t)?t._readUserData(n):Array.isArray(t)?t.forEach((s=>s._readUserData(n))):t.forEach((s=>s._readUserData(n))),t}where(e){const t=this.stages.map((n=>n));return this.Ci("where",e),t.push(new Bc(e,{})),new ga(this._db,this.userDataReader,this._userDataWriter,t)}limit(e){const t=this.stages.map((n=>n));return t.push(new $r(e,{})),new ga(this._db,this.userDataReader,this._userDataWriter,t)}sort(e,...t){const n=this.stages.map((s=>s));return"orderings"in e?n.push(new Sn(this.Ci("sort",e.orderings),{})):n.push(new Sn(this.Ci("sort",[e,...t]),{})),new ga(this._db,this.userDataReader,this._userDataWriter,n)}Fi(e){return{pipeline:{stages:this.stages.map((t=>t._toProto(e)))}}}}// Copyright 2024 Google LLC* @license
class Tt{constructor(e,t,n){this.serializer=e,this.stages=t,this.listenOptions=n,this.isCorePipeline=!0}getPipelineCollection(){return hc(this)}getPipelineCollectionGroup(){return nf(this)}getPipelineCollectionId(){return Ey(this)}getPipelineDocuments(){return Ou(this)}getPipelineFlavor(){return(function(t){let n="exact";return t.stages.forEach(((s,i)=>{s._name!==_y.name&&s._name!==my.name||(n="keyless"),s._name===MS.name&&n==="exact"&&(n="augmented"),s._name===gy.name&&i<t.stages.length-1&&n==="exact"&&(n="augmented")})),n})(this)}getPipelineSourceType(){return nr(this)}}function nr(r){const e=r.stages[0];return e instanceof uc||e instanceof lc||e instanceof Sl||e instanceof Nl?e._name:"unknown"}function hc(r){if(nr(r)==="collection")return r.stages[0].pi}function nf(r){if(nr(r)==="collection_group")return r.stages[0].collectionId}function Ey(r){switch(nr(r)){case"collection":return Be.fromString(hc(r)).lastSegment();case"collection_group":return nf(r);default:return}}function Ou(r){if(nr(r)==="documents")return r.stages[0].gi}class b{constructor(e,t){this.type=e,this.value=t}static Oi(){return new b("ERROR",void 0)}static Mi(){return new b("UNSET",void 0)}static Ni(){return new b("NULL",ur)}static newValue(e){return Xt(e)?new b("NULL",ur):(function(n){return!!n&&"booleanValue"in n})(e)?new b("BOOLEAN",e):bn(e)?new b("INT",e):vn(e)?new b("DOUBLE",e):(function(n){return!!n&&"timestampValue"in n&&!!n.timestampValue})(e)?new b("TIMESTAMP",e):(function(n){return!!n&&"stringValue"in n})(e)?new b("STRING",e):(function(n){return!!n&&"bytesValue"in n})(e)?new b("BYTES",e):e.referenceValue?new b("REFERENCE",e):e.geoPointValue?new b("GEO_POINT",e):Kr(e)?new b("ARRAY",e):hh(e)?new b("VECTOR",e):Fs(e)?new b("MAP",e):new b("ERROR",void 0)}Bi(){return this.type==="ERROR"||this.type==="UNSET"}Li(){return this.type==="NULL"}}function ma(r){if(!r.Bi())return r.value}function Iy(r){return r instanceof Wr?r._expr:r}function ue(r){if((r=Iy(r))instanceof ii)return new US(r);if(r instanceof oi)return new HS(r);if(r instanceof sa)return new qS(r);if(r instanceof V){if(r.name==="add")return new KS(r);if(r.name==="subtract")return new zS(r);if(r.name==="multiply")return new WS(r);if(r.name==="divide")return new $S(r);if(r.name==="mod")return new QS(r);if(r.name==="and")return new YS(r);if(r.name==="equal")return new uN(r);if(r.name==="not_equal")return new lN(r);if(r.name==="less_than")return new BN(r);if(r.name==="less_than_or_equal")return new hN(r);if(r.name==="greater_than")return new dN(r);if(r.name==="greater_than_or_equal")return new fN(r);if(r.name==="array_concat")return new pN(r);if(r.name==="array_reverse")return new CN(r);if(r.name==="array_contains")return new gN(r);if(r.name==="array_contains_all")return new mN(r);if(r.name==="array_contains_any")return new _N(r);if(r.name==="array_length")return new EN(r);if(r.name==="array_element")return new IN(r);if(r.name==="equal_any")return new yy(r);if(r.name==="not_equal_any")return new ZS(r);if(r.name==="is_nan")return new eN(r);if(r.name==="is_not_nan")return new tN(r);if(r.name==="is_null")return new nN(r);if(r.name==="is_not_null")return new rN(r);if(r.name==="is_error")return new sN(r);if(r.name==="exists")return new iN(r);if(r.name==="not")return new Ol(r);if(r.name==="or")return new XS(r);if(r.name==="xor")return new rf(r);if(r.name==="conditional")return new oN(r);if(r.name==="maximum")return new aN(r);if(r.name==="minimum")return new cN(r);if(r.name==="reverse")return new yN(r);if(r.name==="replace_first")return new wN(r);if(r.name==="replace_all")return new DN(r);if(r.name==="char_length")return new TN(r);if(r.name==="byte_length")return new AN(r);if(r.name==="like")return new bN(r);if(r.name==="regex_contains")return new vN(r);if(r.name==="regex_match")return new RN(r);if(r.name==="string_contains")return new PN(r);if(r.name==="starts_with")return new SN(r);if(r.name==="ends_with")return new NN(r);if(r.name==="to_lower")return new ON(r);if(r.name==="to_upper")return new FN(r);if(r.name==="trim")return new xN(r);if(r.name==="string_concat")return new LN(r);if(r.name==="map_get")return new VN(r);if(r.name==="cosine_distance")return new kN(r);if(r.name==="dot_product")return new MN(r);if(r.name==="euclidean_distance")return new GN(r);if(r.name==="vector_length")return new UN(r);if(r.name==="unix_micros_to_timestamp")return new KN(r);if(r.name==="timestamp_to_unix_micros")return new $N(r);if(r.name==="unix_millis_to_timestamp")return new zN(r);if(r.name==="timestamp_to_unix_millis")return new QN(r);if(r.name==="unix_seconds_to_timestamp")return new WN(r);if(r.name==="timestamp_to_unix_seconds")return new YN(r);if(r.name==="timestamp_add")return new XN(r);if(r.name==="timestamp_subtract")return new ZN(r)}throw new Error(`Unknown Expr : ${r}`)}class US{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===Tn)return b.newValue({referenceValue:Wi(e.serializer,t.key)});if(this.expr.fieldName==="__update_time__")return b.newValue({timestampValue:Bu(e.serializer,t.version)});if(this.expr.fieldName==="__create_time__")return b.newValue({timestampValue:Bu(e.serializer,t.createTime)});const n=t.data.field(this.expr._fieldPath);return n?dl(n)?b.newValue((function(i,o){if(i.serverTimestampBehavior==="estimate")return{timestampValue:Bu(i.serializer,re.fromTimestamp(xi(o)))};if(i.serverTimestampBehavior==="previous"){const a=nc(o);if(a)return a}return{nullValue:"NULL_VALUE"}})(e,n)):b.newValue(n):b.Mi()}}class HS{constructor(e){this.expr=e}evaluate(e,t){return b.newValue(this.expr._getValue())}}class qS{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.di.map((s=>ue(s).evaluate(e,t)));return n.some((s=>s.Bi()))?b.Oi():b.newValue({arrayValue:{values:n.map((s=>s.value))}})}}function It(r){return vn(r)?Number(r.doubleValue):Number(r.integerValue)}function Gn(r){return BigInt(r.integerValue)}const jS=BigInt("0x7fffffffffffffff"),JS=-BigInt("0x8000000000000000");class dc{constructor(e){this.expr=e}evaluate(e,t){j(this.expr.params.length>=2,24778);const n=ue(this.expr.params[0]).evaluate(e,t),s=ue(this.expr.params[1]).evaluate(e,t);let i=this.$i(n,s);for(const o of this.expr.params.slice(2)){const a=ue(o).evaluate(e,t);i=this.$i(i,a)}return i}$i(e,t){if(e.Bi()||t.Bi())return b.Oi();if(e.Li()||t.Li())return b.Ni();const n=e.value,s=t.value;if(!vn(n)&&!bn(n)||!vn(s)&&!bn(s))return b.Oi();if(vn(n)||vn(s)){const i=this.Ui(n,s);return i?b.newValue(i):b.Oi()}if(bn(n)&&bn(s)){const i=this.ki(n,s);return i===void 0?b.Oi():typeof i=="number"?b.newValue({doubleValue:i}):i<JS||i>jS?b.Oi():b.newValue({integerValue:`${i}`})}return b.Oi()}}function Br(r,e){return rt(r)!==rt(e)?"TYPE_MISMATCH":pt(r)||pt(e)?"NOT_EQ":Xt(r)&&Xt(e)?"EQ":Xt(r)||Xt(e)?"NULL":Kr(r)&&Kr(e)?(function(n,s){var o,a,c;if(((o=n.values)==null?void 0:o.length)!==((a=s.values)==null?void 0:a.length))return"NOT_EQ";let i=!1;for(let l=0;l<(((c=n.values)==null?void 0:c.length)??0);l++){const B=n.values[l],h=s.values[l];switch(Br(B,h)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:Z(44609,{Qi:B,qi:h})}}return i?"NULL":"EQ"})(r.arrayValue,e.arrayValue):hh(r)&&hh(e)||Fs(r)&&Fs(e)?(function(n,s){const i=n.fields||{},o=s.fields||{};if(Ms(i)!==Ms(o))return"NOT_EQ";let a=!1;for(const c in i)if(i.hasOwnProperty(c)){if(o[c]===void 0)return"NOT_EQ";switch(Br(i[c],o[c])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":a=!0}}return a?"NULL":"EQ"})(r.mapValue,e.mapValue):(function(n,s){return an(n,s,{be:!1,ye:!0,we:!0})})(r,e)?"EQ":"NOT_EQ"}class KS extends dc{ki(e,t){return Gn(e)+Gn(t)}Ui(e,t){return{doubleValue:It(e)+It(t)}}}class zS extends dc{constructor(e){super(e),this.expr=e}ki(e,t){return Gn(e)-Gn(t)}Ui(e,t){return{doubleValue:It(e)-It(t)}}}class WS extends dc{constructor(e){super(e),this.expr=e}ki(e,t){return Gn(e)*Gn(t)}Ui(e,t){return{doubleValue:It(e)*It(t)}}}class $S extends dc{constructor(e){super(e),this.expr=e}ki(e,t){const n=Gn(t);if(n!==BigInt(0))return Gn(e)/n}Ui(e,t){const n=It(t);return n===0?{doubleValue:Li(n)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:It(e)/n}}}class QS extends dc{constructor(e){super(e),this.expr=e}ki(e,t){const n=Gn(t);if(n!==BigInt(0))return Gn(e)%n}Ui(e,t){const n=It(t);if(n!==0)return{doubleValue:It(e)%n}}}class YS{constructor(e){this.expr=e}evaluate(e,t){var i;let n=!1,s=!1;for(const o of this.expr.params){const a=ue(o).evaluate(e,t);switch(a.type){case"BOOLEAN":if(!((i=a.value)!=null&&i.booleanValue))return b.newValue(ft);break;case"NULL":s=!0;break;default:n=!0}}return n?b.Oi():s?b.Ni():b.newValue(Kt)}}class Ol{constructor(e){this.expr=e}evaluate(e,t){var s;j(this.expr.params.length===1,9634);const n=ue(this.expr.params[0]).evaluate(e,t);switch(n.type){case"BOOLEAN":return b.newValue({booleanValue:!((s=n.value)!=null&&s.booleanValue)});case"NULL":return b.Ni();default:return b.Oi()}}}class XS{constructor(e){this.expr=e}evaluate(e,t){var i;let n=!1,s=!1;for(const o of this.expr.params){const a=ue(o).evaluate(e,t);switch(a.type){case"BOOLEAN":if((i=a.value)!=null&&i.booleanValue)return b.newValue(Kt);break;case"NULL":s=!0;break;default:n=!0}}return n?b.Oi():s?b.Ni():b.newValue(ft)}}class rf{constructor(e){this.expr=e}evaluate(e,t){var i;let n=!1,s=!1;for(const o of this.expr.params){const a=ue(o).evaluate(e,t);switch(a.type){case"BOOLEAN":n=rf.xor(n,!!((i=a.value)!=null&&i.booleanValue));break;case"NULL":s=!0;break;default:return b.Oi()}}return s?b.Ni():b.newValue({booleanValue:n})}static xor(e,t){return(e||t)&&!(e&&t)}}class yy{constructor(e){this.expr=e}evaluate(e,t){var o,a;j(this.expr.params.length===2,55094);let n=!1;const s=ue(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":n=!0;break;case"ERROR":case"UNSET":return b.Oi()}const i=ue(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":n=!0;break;default:return b.Oi()}if(n)return b.Ni();for(const c of((a=(o=i.value)==null?void 0:o.arrayValue)==null?void 0:a.values)??[])switch(Xt(s.value)&&Xt(c)?"EQ":Br(s.value,c)){case"EQ":return b.newValue(Kt);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":n=!0;break;default:Z(44608,{value:s.value,candidate:c})}return n?b.Ni():b.newValue(ft)}}class ZS{constructor(e){this.expr=e}evaluate(e,t){return new Ol(new V("not",[new V("equal_any",this.expr.params)])).evaluate(e,t)}}class eN{constructor(e){this.expr=e}evaluate(e,t){j(this.expr.params.length===1,23322);const n=ue(this.expr.params[0]).evaluate(e,t);switch(n.type){case"INT":return b.newValue(ft);case"DOUBLE":return b.newValue({booleanValue:isNaN(It(n.value))});case"NULL":return b.Ni();default:return b.Oi()}}}class tN{constructor(e){this.expr=e}evaluate(e,t){return j(this.expr.params.length===1,50406),new Ol(new V("not",[new V("is_nan",this.expr.params)])).evaluate(e,t)}}class nN{constructor(e){this.expr=e}evaluate(e,t){switch(j(this.expr.params.length===1,23123),ue(this.expr.params[0]).evaluate(e,t).type){case"NULL":return b.newValue(Kt);case"UNSET":case"ERROR":return b.Oi();default:return b.newValue(ft)}}}class rN{constructor(e){this.expr=e}evaluate(e,t){return j(this.expr.params.length===1,23167),new Ol(new V("not",[new V("is_null",this.expr.params)])).evaluate(e,t)}}class sN{constructor(e){this.expr=e}evaluate(e,t){return j(this.expr.params.length===1,5228),ue(this.expr.params[0]).evaluate(e,t).type==="ERROR"?b.newValue(Kt):b.newValue(ft)}}class iN{constructor(e){this.expr=e}evaluate(e,t){switch(j(this.expr.params.length===1,6877),ue(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return b.Oi();case"UNSET":return b.newValue(ft);default:return b.newValue(Kt)}}}class oN{constructor(e){this.expr=e}evaluate(e,t){var s;j(this.expr.params.length===3,11706);const n=ue(this.expr.params[0]).evaluate(e,t);switch(n.type){case"BOOLEAN":return(s=n.value)!=null&&s.booleanValue?ue(this.expr.params[1]).evaluate(e,t):ue(this.expr.params[2]).evaluate(e,t);case"NULL":return ue(this.expr.params[2]).evaluate(e,t);default:return b.Oi()}}}class aN{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.params.map((i=>ue(i).evaluate(e,t)));let s;for(const i of n)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||vt(i.value,s.value)>0?i:s}return s===void 0?b.Ni():s}}class cN{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.params.map((i=>ue(i).evaluate(e,t)));let s;for(const i of n)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||vt(i.value,s.value)<0?i:s}return s===void 0?b.Ni():s}}class mo{constructor(e){this.expr=e}evaluate(e,t){j(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);const n=ue(this.expr.params[0]).evaluate(e,t);switch(n.type){case"ERROR":case"UNSET":return b.Oi()}const s=ue(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ERROR":case"UNSET":return b.Oi()}return this.Ki(n,s)}}class uN extends mo{constructor(e){super(e),this.expr=e}Ki(e,t){if(e.Li()&&t.Li())return b.newValue(Kt);if(e.Li()||t.Li()||pt(e.value)||pt(t.value)||rt(e.value)!==rt(t.value))return b.newValue(ft);switch(Br(e.value,t.value)){case"EQ":return b.newValue(Kt);case"NOT_EQ":return b.newValue(ft);case"NULL":return b.Ni();default:Z(44615,{left:e,right:t})}}}class lN extends mo{constructor(e){super(e),this.expr=e}Ki(e,t){switch(Br(e.value,t.value)){case"EQ":return b.newValue(ft);case"NOT_EQ":case"TYPE_MISMATCH":return b.newValue(Kt);case"NULL":return b.Ni();default:Z(44614,{left:e,right:t})}}}class BN extends mo{constructor(e){super(e),this.expr=e}Ki(e,t){return rt(e.value)!==rt(t.value)||pt(e.value)||pt(t.value)?b.newValue(ft):b.newValue({booleanValue:vt(e.value,t.value)<0})}}class hN extends mo{constructor(e){super(e),this.expr=e}Ki(e,t){return rt(e.value)!==rt(t.value)||pt(e.value)||pt(t.value)?b.newValue(ft):Br(e.value,t.value)==="EQ"?b.newValue(Kt):b.newValue({booleanValue:vt(e.value,t.value)<0})}}class dN extends mo{constructor(e){super(e),this.expr=e}Ki(e,t){return rt(e.value)!==rt(t.value)||pt(e.value)||pt(t.value)?b.newValue(ft):b.newValue({booleanValue:vt(e.value,t.value)>0})}}class fN extends mo{constructor(e){super(e),this.expr=e}Ki(e,t){return rt(e.value)!==rt(t.value)||pt(e.value)||pt(t.value)?b.newValue(ft):Br(e.value,t.value)==="EQ"?b.newValue(Kt):b.newValue({booleanValue:vt(e.value,t.value)>0})}}class pN{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class CN{constructor(e){this.expr=e}evaluate(e,t){var s;j(this.expr.params.length===1,216);const n=ue(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return b.Ni();case"ARRAY":{const i=((s=n.value.arrayValue)==null?void 0:s.values)??[];return b.newValue({arrayValue:{values:[...i].reverse()}})}default:return b.Oi()}}}class gN{constructor(e){this.expr=e}evaluate(e,t){return j(this.expr.params.length===2,52884),new yy(new V("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}}class mN{constructor(e){this.expr=e}evaluate(e,t){var c,l,B,h;j(this.expr.params.length===2,1392);let n=!1;const s=ue(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":n=!0;break;default:return b.Oi()}const i=ue(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":n=!0;break;default:return b.Oi()}if(n)return b.Ni();const o=((l=(c=i.value)==null?void 0:c.arrayValue)==null?void 0:l.values)??[],a=((h=(B=s.value)==null?void 0:B.arrayValue)==null?void 0:h.values)??[];for(const p of o){let C=!1;n=!1;for(const m of a){switch(Xt(p)&&Xt(m)?"EQ":Br(p,m)){case"EQ":C=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":n=!0;break;default:Z(44613,{value:m,search:p})}if(C)break}if(!C)return b.newValue(ft)}return b.newValue(Kt)}}class _N{constructor(e){this.expr=e}evaluate(e,t){var c,l,B,h;j(this.expr.params.length===2,2680);let n=!1;const s=ue(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":n=!0;break;default:return b.Oi()}const i=ue(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":n=!0;break;default:return b.Oi()}if(n)return b.Ni();const o=((l=(c=i.value)==null?void 0:c.arrayValue)==null?void 0:l.values)??[],a=((h=(B=s.value)==null?void 0:B.arrayValue)==null?void 0:h.values)??[];for(const p of a)for(const C of o)switch(Xt(p)&&Xt(C)?"EQ":Br(p,C)){case"EQ":return b.newValue(Kt);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":n=!0;break;default:Z(60403,{value:p,search:C})}return n?b.Ni():b.newValue(ft)}}class EN{constructor(e){this.expr=e}evaluate(e,t){var s,i,o;j(this.expr.params.length===1,38605);const n=ue(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return b.Ni();case"ARRAY":return b.newValue({integerValue:`${((o=(i=(s=n.value)==null?void 0:s.arrayValue)==null?void 0:i.values)==null?void 0:o.length)??0}`});default:return b.Oi()}}}class IN{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class yN{constructor(e){this.expr=e}evaluate(e,t){var s,i;j(this.expr.params.length===1,1508);const n=ue(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return b.Ni();case"BYTES":{const o=(s=n.value)==null?void 0:s.bytesValue;if(typeof o=="string"){const a=Re.fromBase64String(o).toUint8Array();return a.reverse(),b.newValue({bytesValue:Re.fromUint8Array(a).toBase64()})}return b.newValue({bytesValue:new Uint8Array(o).reverse()})}case"STRING":{const o=(i=n.value)==null?void 0:i.stringValue,a=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(o),c=Array.from(a,(l=>l.segment)).reverse();return b.newValue({stringValue:c.join("")})}default:return b.Oi()}}}class wN{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class DN{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class TN{constructor(e){this.expr=e}evaluate(e,t){j(this.expr.params.length===1,19400);const n=ue(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return b.Ni();case"STRING":{const s=(function(o){let a=0;for(let c=0;c<o.length;c++){const l=o.codePointAt(c);if(l===void 0)return;if(l<=65535)if(l>=55296&&l<=57343)if(l<=56319){const B=o.codePointAt(c+1);B!==void 0&&B>=56320&&B<=57343?(a+=1,c++):a+=1}else a+=1;else a+=1;else{if(!(l<=1114111))return;a+=1,c++}}return a})(n.value.stringValue);return s===void 0?b.Oi():b.newValue({integerValue:s})}default:return b.Oi()}}}class AN{constructor(e){this.expr=e}evaluate(e,t){var s,i;j(this.expr.params.length===1,8486);const n=ue(this.expr.params[0]).evaluate(e,t);switch(n.type){case"BYTES":{const o=(s=n.value)==null?void 0:s.bytesValue;return typeof o=="string"?b.newValue({integerValue:Re.fromBase64String(o).toUint8Array().length}):b.newValue({integerValue:new Uint8Array(o).length})}case"STRING":{const o=(function(c){let l=0;for(let B=0;B<c.length;B++){const h=c.codePointAt(B);if(h===void 0)return;if(h>=55296&&h<=57343){if(!(h<=56319))return;{const p=c.codePointAt(B+1);if(p===void 0||!(p>=56320&&p<=57343))return;l+=4,B++}}else if(h<=127)l+=1;else if(h<=2047)l+=2;else if(h<=65535)l+=3;else{if(!(h<=1114111))return;l+=4,B++}}return l})((i=n.value)==null?void 0:i.stringValue);return o===void 0?b.Oi():b.newValue({integerValue:o})}case"NULL":return b.Ni();default:return b.Oi()}}}class _o{constructor(e){this.expr=e}evaluate(e,t){var o,a;j(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let n=!1;const s=ue(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":break;case"NULL":n=!0;break;default:return b.Oi()}const i=ue(this.expr.params[1]).evaluate(e,t);switch(i.type){case"STRING":break;case"NULL":n=!0;break;default:return b.Oi()}return n?b.Ni():this.Wi((o=s.value)==null?void 0:o.stringValue,(a=i.value)==null?void 0:a.stringValue)}}class bN extends _o{Wi(e,t){try{const n=(function(o){let a="";for(let c=0;c<o.length;c++){const l=o.charAt(c);switch(l){case"_":a+=".";break;case"%":a+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":a+="\\"+l;break;default:a+=l}}return"^"+a+"$"})(t),s=Ed.compile(n);return b.newValue({booleanValue:s.matches(e)})}catch(n){return at(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${n}`),b.Oi()}}}class vN extends _o{Wi(e,t){try{const n=Ed.compile(t);return b.newValue({booleanValue:n.test(e)})}catch{return at(`Invalid regex pattern found in regex_contains: ${t}, returning error`),b.Oi()}}}class RN extends _o{Wi(e,t){try{return b.newValue({booleanValue:Ed.compile(t).matches(e)})}catch{return at(`Invalid regex pattern found in regex_match: ${t}, returning error`),b.Oi()}}}class PN extends _o{Wi(e,t){return b.newValue({booleanValue:e.includes(t)})}}class SN extends _o{Wi(e,t){return b.newValue({booleanValue:e.startsWith(t)})}}class NN extends _o{Wi(e,t){return b.newValue({booleanValue:e.endsWith(t)})}}class ON{constructor(e){this.expr=e}evaluate(e,t){var s,i;j(this.expr.params.length===1,29079);const n=ue(this.expr.params[0]).evaluate(e,t);switch(n.type){case"STRING":return b.newValue({stringValue:(i=(s=n.value)==null?void 0:s.stringValue)==null?void 0:i.toLowerCase()});case"NULL":return b.Ni();default:return b.Oi()}}}class FN{constructor(e){this.expr=e}evaluate(e,t){var s,i;j(this.expr.params.length===1,60487);const n=ue(this.expr.params[0]).evaluate(e,t);switch(n.type){case"STRING":return b.newValue({stringValue:(i=(s=n.value)==null?void 0:s.stringValue)==null?void 0:i.toUpperCase()});case"NULL":return b.Ni();default:return b.Oi()}}}class xN{constructor(e){this.expr=e}evaluate(e,t){var s,i;j(this.expr.params.length===1,28544);const n=ue(this.expr.params[0]).evaluate(e,t);switch(n.type){case"STRING":return b.newValue({stringValue:(i=(s=n.value)==null?void 0:s.stringValue)==null?void 0:i.trim()});case"NULL":return b.Ni();default:return b.Oi()}}}class LN{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.params.map((o=>ue(o).evaluate(e,t)));let s="",i=!1;for(const o of n)switch(o.type){case"STRING":s+=o.value.stringValue;break;case"NULL":i=!0;break;default:return b.Oi()}return i?b.Ni():b.newValue({stringValue:s})}}class VN{constructor(e){this.expr=e}evaluate(e,t){var o,a,c,l;j(this.expr.params.length===2,4483);const n=ue(this.expr.params[0]).evaluate(e,t);switch(n.type){case"UNSET":return b.Mi();case"MAP":break;default:return b.Oi()}const s=ue(this.expr.params[1]).evaluate(e,t);if(s.type!=="STRING")return b.Oi();const i=(l=(a=(o=n.value)==null?void 0:o.mapValue)==null?void 0:a.fields)==null?void 0:l[(c=s.value)==null?void 0:c.stringValue];return i===void 0?b.Mi():b.newValue(i)}}class sf{constructor(e){this.expr=e}evaluate(e,t){var l,B;j(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let n=!1;const s=ue(this.expr.params[0]).evaluate(e,t);switch(s.type){case"VECTOR":break;case"NULL":n=!0;break;default:return b.Oi()}const i=ue(this.expr.params[1]).evaluate(e,t);switch(i.type){case"VECTOR":break;case"NULL":n=!0;break;default:return b.Oi()}if(n)return b.Ni();const o=dh(s.value),a=dh(i.value);if(o===void 0||a===void 0||((l=o.values)==null?void 0:l.length)!==((B=a.values)==null?void 0:B.length))return b.Oi();const c=this.Gi(o,a);return c===void 0||isNaN(c)?b.Oi():b.newValue({doubleValue:c})}}class kN extends sf{Gi(e,t){const n=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(n.length===0)return;let i=0,o=0,a=0;for(let l=0;l<n.length;l++){if(!lr(n[l])||!lr(s[l]))return;const B=It(n[l]),h=It(s[l]);i+=B*h,o+=B*B,a+=h*h}const c=Math.sqrt(o)*Math.sqrt(a);if(c!==0)return 1-Math.max(-1,Math.min(1,i/c))}}class MN extends sf{Gi(e,t){const n=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(n.length===0)return 0;let i=0;for(let o=0;o<n.length;o++){if(!lr(n[o])||!lr(s[o]))return;i+=It(n[o])*It(s[o])}return i}}class GN extends sf{Gi(e,t){const n=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(n.length===0)return 0;let i=0;for(let o=0;o<n.length;o++){if(!lr(n[o])||!lr(s[o]))return;const a=It(n[o]),c=It(s[o]);i+=Math.pow(a-c,2)}return Math.sqrt(i)}}class UN{constructor(e){this.expr=e}evaluate(e,t){var s;j(this.expr.params.length===1,39044);const n=ue(this.expr.params[0]).evaluate(e,t);switch(n.type){case"VECTOR":{const i=dh(n.value);return b.newValue({integerValue:((s=i==null?void 0:i.values)==null?void 0:s.length)??0})}case"NULL":return b.Ni();default:return b.Oi()}}}const Ha=BigInt(-62135596800),qa=BigInt(253402300799),Fu=BigInt(1e3),Gr=BigInt(1e6),HN=Ha*Fu,qN=qa*Fu+BigInt(999),jN=Ha*Gr,JN=qa*Gr+BigInt(999999);function of(r){return r>=jN&&r<=JN}function wy(r){return r>=Ha&&r<=qa}function ja(r,e){const t=BigInt(r);return!(t<Ha||t>qa)&&!(e<0||e>=1e9)&&(t!==Ha||e===0)&&!(t===qa&&e>999999999)}function Dy(r,e){return e<0?{seconds:r-1,nanos:e+1e9}:{seconds:r,nanos:e}}function af(r){return BigInt(r.seconds)*Gr+BigInt(Math.trunc(r.nanoseconds/1e3))}class cf{constructor(e){this.expr=e}evaluate(e,t){j(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);const n=ue(this.expr.params[0]).evaluate(e,t);switch(n.type){case"INT":return this.toTimestamp(BigInt(n.value.integerValue));case"NULL":return b.Ni();default:return b.Oi()}}}class KN extends cf{toTimestamp(e){if(!of(e))return b.Oi();let t=Number(e/Gr),n=Number(e%Gr*BigInt(1e3));const s=Dy(t,n);return t=s.seconds,n=s.nanos,ja(t,n)?b.newValue({timestampValue:{seconds:t,nanos:n}}):b.Oi()}}class zN extends cf{toTimestamp(e){if(!(function(o){return o>=HN&&o<=qN})(e))return b.Oi();let t=Number(e/Fu),n=Number(e%Fu*BigInt(1e6));const s=Dy(t,n);return t=s.seconds,n=s.nanos,ja(t,n)?b.newValue({timestampValue:{seconds:t,nanos:n}}):b.Oi()}}class WN extends cf{toTimestamp(e){if(!wy(e))return b.Oi();const t=Number(e);return b.newValue({timestampValue:{seconds:t,nanos:0}})}}class uf{constructor(e){this.expr=e}evaluate(e,t){j(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);const n=ue(this.expr.params[0]).evaluate(e,t);switch(n.type){case"TIMESTAMP":break;case"NULL":return b.Ni();default:return b.Oi()}const s=kd(n.value.timestampValue);return ja(s.seconds,s.nanoseconds)?this.ji(s):b.Oi()}}class $N extends uf{ji(e){const t=af(e);return of(t)?b.newValue({integerValue:`${t.toString()}`}):b.Oi()}}class QN extends uf{ji(e){const t=af(e),n=t/BigInt(1e3),s=t%BigInt(1e3);return n>BigInt(0)||s===BigInt(0)?b.newValue({integerValue:n.toString()}):b.newValue({integerValue:(n-BigInt(1)).toString()})}}class YN extends uf{ji(e){const t=BigInt(e.seconds);return wy(t)?b.newValue({integerValue:t.toString()}):b.Oi()}}class Ty{constructor(e){this.expr=e}evaluate(e,t){j(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let n=!1;const s=ue(this.expr.params[0]).evaluate(e,t);switch(s.type){case"TIMESTAMP":break;case"NULL":n=!0;break;default:return b.Oi()}const i=ue(this.expr.params[1]).evaluate(e,t);let o;switch(i.type){case"STRING":if(o=(function(J){switch(J){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}})(i.value.stringValue),o===void 0)return b.Oi();break;case"NULL":n=!0;break;default:return b.Oi()}const a=ue(this.expr.params[2]).evaluate(e,t);switch(a.type){case"INT":break;case"NULL":n=!0;break;default:return b.Oi()}if(n)return b.Ni();const c=BigInt(a.value.integerValue);let l;try{switch(o){case"microsecond":l=c;break;case"millisecond":l=c*BigInt(1e3);break;case"second":l=c*BigInt(1e6);break;case"minute":l=c*BigInt(6e7);break;case"hour":l=c*BigInt(36e8);break;case"day":l=c*BigInt(864e8);break;default:return b.Oi()}if(o!=="microsecond"&&c!==BigInt(0)&&l/c!==BigInt(this.zi(o)))return b.Oi()}catch(G){return at(`Error during timestamp arithmetic: ${G}`),b.Oi()}const B=kd(s.value.timestampValue);if(!ja(B.seconds,B.nanoseconds))return b.Oi();const h=af(B),p=this.Hi(h,l);if(!of(p))return b.Oi();const C=Number(p/Gr),m=p%Gr,D=Number((m<0?m+Gr:m)*BigInt(1e3)),N=m<0?C-1:C;return ja(N,D)?b.newValue({timestampValue:{seconds:N,nanos:D}}):b.Oi()}zi(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}}class XN extends Ty{Hi(e,t){return e+t}}class ZN extends Ty{Hi(e,t){return e-t}}function Ja(r){if((r=Iy(r))instanceof ii)return`fld(${r.fieldName})`;if(r instanceof oi)return`cst(${(function(t){return t===null?"null":typeof t=="number"?t.toString():typeof t=="string"?`"${t}"`:t instanceof be?`ref(${t.path})`:t instanceof xt?`vec(${JSON.stringify(t)})`:JSON.stringify(t)})(r.value)})`;if(r instanceof V)return`fn(${r.name},[${r.params.map(Ja).join(",")}])`;if(r.expressionType==="ListOfExpressions")return`list([${r.di.map(Ja).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(r,null,2)}`)}function eO(r){if(r instanceof gy)return`${r._name}(${Wc(r.fields)})`;if(r instanceof my){let e=`${r._name}(${Wc(r.accumulators)})`;return r.groups.size>0&&(e+=`grouping(${Wc(r.groups)})`),e}if(r instanceof _y)return`${r._name}(${Wc(r.groups)})`;if(r instanceof uc)return`${r._name}(${r.pi})`;if(r instanceof lc)return`${r._name}(${r.collectionId})`;if(r instanceof Sl)return`${r._name}()`;if(r instanceof Nl)return`${r._name}(${r.gi.sort()})`;if(r instanceof Bc)return`${r._name}(${Ja(r.condition)})`;if(r instanceof $r)return`${r._name}(${r.limit})`;if(r instanceof Sn)return`${r._name}(${(function(t){return t.map((n=>`${Ja(n.expr)}${n.direction}`)).join(",")})(r.orderings)})`;throw new Error(`Unrecognized stage ${r._name}`)}function Wc(r){return`${Array.from(r.entries()).sort().map((([e,t])=>`${e}=${Ja(t)}`)).join(",")}`}function rr(r){return r.stages.map((e=>eO(e))).join("|")}function Ay(r,e){return rr(r)===rr(e)}function Je(r){return r instanceof Tt}function Wg(r){return Je(r)?rr(r):da(r)}function by(r){return Je(r)?rr(r):(function(t){return`${vu(At(t))}|lt:${t.limitType}`})(r)}function Fl(r,e){return r instanceof Tt&&e instanceof Tt?Ay(r,e):!(r instanceof Tt&&!(e instanceof Tt)||!(r instanceof Tt)&&e instanceof Tt)&&II(r,e)}function xl(r){return Qn(r)?rr(r):vu(r)}function lf(r,e){return r instanceof Tt&&e instanceof Tt?Ay(r,e):!(r instanceof Tt&&!(e instanceof Tt)||!(r instanceof Tt)&&e instanceof Tt)&&Nd(r,e)}function tO(r,e){const t=(function(s){let i=!1;const o=[];for(const a of s)if(a instanceof Sn)if(i=!0,a.orderings.some((c=>c.expr instanceof ii&&c.expr.fieldName===Tn)))o.push(a);else{const c=a.orderings.map((l=>l));c.push(hu(Tn).ascending()),o.push(new Sn(c,{}))}else a instanceof $r&&(i||(o.push(new Sn([hu(Tn).ascending()],{})),i=!0)),o.push(a);return i||o.push(new Sn([hu(Tn).ascending()],{})),o})(r.stages);if(r.userDataReader){const n=r.userDataReader.createContext(3,"toCorePipeline");t.forEach((s=>s._readUserData(n)))}return new Tt(r.userDataReader.serializer,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bf{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&lP(i,e,n[s])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=ha(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=ha(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=AI();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=t.has(s.key)?null:a;const c=aI(o,a);c!==null&&n.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(re.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),le())}isEqual(e){return this.batchId===e.batchId&&Fi(this.mutations,e.mutations,((t,n)=>Dg(t,n)))&&Fi(this.baseMutations,e.baseMutations,((t,n)=>Dg(t,n)))}}class hf{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){j(e.mutations.length===n.length,58842,{Ji:e.mutations.length,Yi:n.length});let s=(function(){return RP})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,n[o].version);return new hf(e,t,n,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xu="";function bt(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=$g(e)),e=nO(r.get(t),e);return $g(e)}function nO(r,e){let t=e;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":t+="";break;case xu:t+="";break;default:t+=i}}return t}function $g(r){return r+xu+""}function Nn(r){const e=r.length;if(j(e>=2,64408,{path:r}),e===2)return j(r.charAt(0)===xu&&r.charAt(1)==="",56145,{path:r}),Be.emptyPath();const t=e-2,n=[];let s="";for(let i=0;i<e;){const o=r.indexOf(xu,i);switch((o<0||o>t)&&Z(50515,{path:r}),r.charAt(o+1)){case"":const a=r.substring(i,o);let c;s.length===0?c=a:(s+=a,c=s,s=""),n.push(c);break;case"":s+=r.substring(i,o),s+="\0";break;case"":s+=r.substring(i,o+1);break;default:Z(61167,{path:r})}i=o+2}return new Be(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _s="remoteDocuments",fc="owner",di="owner",Ka="mutationQueues",rO="userId",ln="mutations",Qg="batchId",vs="userMutationsIndex",Yg=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function du(r,e){return[r,bt(e)]}function vy(r,e,t){return[r,bt(e),t]}const sO={},$i="documentMutations",Lu="remoteDocumentsV14",iO=["prefixPath","collectionGroup","readTime","documentId"],fu="documentKeyIndex",oO=["prefixPath","collectionGroup","documentId"],Ry="collectionGroupIndex",aO=["collectionGroup","readTime","prefixPath","documentId"],za="remoteDocumentGlobal",Ah="remoteDocumentGlobalKey",Qi="targets",Py="queryTargetsIndex",cO=["canonicalId","targetId"],Yi="targetDocuments",uO=["targetId","path"],df="documentTargetsIndex",lO=["path","targetId"],Vu="targetGlobalKey",Vs="targetGlobal",Wa="collectionParents",BO=["collectionId","parent"],Xi="clientMetadata",hO="clientId",Ll="bundles",dO="bundleId",Vl="namedQueries",fO="name",ff="indexConfiguration",pO="indexId",bh="collectionGroupIndex",CO="collectionGroup",_a="indexState",gO=["indexId","uid"],Sy="sequenceNumberIndex",mO=["uid","sequenceNumber"],Ea="indexEntries",_O=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Ny="documentKeyIndex",EO=["indexId","uid","orderedDocumentKey"],kl="documentOverlays",IO=["userId","collectionPath","documentId"],vh="collectionPathOverlayIndex",yO=["userId","collectionPath","largestBatchId"],Oy="collectionGroupOverlayIndex",wO=["userId","collectionGroup","largestBatchId"],pf="globals",DO="name",Fy=[Ka,ln,$i,_s,Qi,fc,Vs,Yi,Xi,za,Wa,Ll,Vl],TO=[...Fy,kl],xy=[Ka,ln,$i,Lu,Qi,fc,Vs,Yi,Xi,za,Wa,Ll,Vl,kl],Ly=xy,Cf=[...Ly,ff,_a,Ea],AO=Cf,Vy=[...Cf,pf],bO=Vy;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ky(r,e,t){const n=r.store(ln),s=r.store($i),i=[],o=IDBKeyRange.only(t.batchId);let a=0;const c=n._i({range:o},((B,h,p)=>(a++,p.delete())));i.push(c.next((()=>{j(a===1,47070,{batchId:t.batchId})})));const l=[];for(const B of t.mutations){const h=vy(e,B.key.path,t.batchId);i.push(s.delete(h)),l.push(B.key)}return P.waitFor(i).next((()=>l))}function ku(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw Z(14731);e=r.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rh extends $I{constructor(e,t){super(),this.Zi=e,this.currentSequenceNumber=t}}function ut(r,e){const t=Q(r);return xn.qr(t.Zi,e)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gf{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(e,t,n,s,i=re.min(),o=re.min(),a=Re.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=c}withSequenceNumber(e){return new On(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new On(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new On(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new On(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class My{constructor(e){this.Xi=e}}function vO(r,e){let t;if(e.document)t=El(r.Xi,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=z.fromSegments(e.noDocument.path),s=Ks(e.noDocument.readTime);t=Me.newNoDocument(n,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return Z(56709);{const n=z.fromSegments(e.unknownDocument.path),s=Ks(e.unknownDocument.version);t=Me.newUnknownDocument(n,s)}}return e.readTime&&t.setReadTime((function(s){const i=new we(s[0],s[1]);return re.fromTimestamp(i)})(e.readTime)),t}function Xg(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Mu(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=(function(i,o){return{name:Wi(i,o.key),fields:o.data.value.mapValue.fields,updateTime:Ls(i,o.version.toTimestamp()),createTime:Ls(i,o.createTime.toTimestamp())}})(r.Xi,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:Js(e.version)};else{if(!e.isUnknownDocument())return Z(57904,{document:e});n.unknownDocument={path:t.path.toArray(),version:Js(e.version)}}return n}function Mu(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function Js(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Ks(r){const e=new we(r.seconds,r.nanoseconds);return re.fromTimestamp(e)}function ys(r,e){const t=(e.baseMutations||[]).map((i=>wh(r.Xi,i)));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const a=e.mutations[i+1];o.updateTransforms=a.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const n=e.mutations.map((i=>wh(r.Xi,i))),s=we.fromMillis(e.localWriteTimeMs);return new Bf(e.batchId,s,t,n)}function ia(r,e){const t=Ks(e.readTime),n=e.lastLimboFreeSnapshotVersion!==void 0?Ks(e.lastLimboFreeSnapshotVersion):re.min();let s;return s=(function(o){return o.structuredPipeline!==void 0})(e.query)?(function(o,a){var B,h;const c=o.structuredPipeline;j((((B=c==null?void 0:c.pipeline)==null?void 0:B.stages)??[]).length>0,1845);const l=(h=c==null?void 0:c.pipeline)==null?void 0:h.stages.map(RO);return new Tt(a,l)})(e.query,r.Xi):(function(o){return o.documents!==void 0})(e.query)?(function(o){const a=o.documents.length;return j(a===1,1966,{count:a}),At(Co(NI(o.documents[0])))})(e.query):(function(o){return At(LI(o))})(e.query),new On(s,e.targetId,"TargetPurposeListen",e.lastListenSequenceNumber,t,n,Re.fromBase64String(e.resumeToken))}function Gy(r,e){const t=Js(e.snapshotVersion),n=Js(e.lastLimboFreeSnapshotVersion);let s;s=Qn(e.target)?VI(r.Xi,e.target):Od(e.target)?FI(r.Xi,e.target):Il(r.Xi,e.target).Lt;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:xl(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function Ml(r){const e=LI({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?Pu(e,e.limit,"L"):e}function $c(r,e){return new gf(e.largestBatchId,wh(r.Xi,e.overlayMutation))}function Zg(r,e){const t=e.path.lastSegment();return[r,bt(e.path.popLast()),t]}function em(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:Js(n.readTime),documentKey:bt(n.documentKey.path),largestBatchId:n.largestBatchId}}function RO(r){switch(r.name){case"collection":return new uc(r.args[0].referenceValue,{});case"collection_group":return new lc(r.args[1].stringValue,{});case"database":return new Sl({});case"documents":return new Nl(r.args.map((e=>e.referenceValue)),{});case"where":return new Bc(Ph(r.args[0]),{});case"limit":{const e=r.args[0].integerValue??r.args[0].doubleValue;return new $r(typeof e=="number"?e:Number(e),{})}case"sort":return new Sn(r.args.map((e=>(function(n){var i,o;const s=(i=n.mapValue)==null?void 0:i.fields;return new Zd(Ph(s.expression),(o=s.direction)==null?void 0:o.stringValue,"orderingFromProto")})(e))),{});default:throw new Error(`Stage type: ${r.name} not supported.`)}}function Ph(r){return r.fieldReferenceValue?new ii(_n("_exprFromProto",r.fieldReferenceValue),"_exprFromProto"):r.functionValue?(function(t){var n;return new V(t.functionValue.name,((n=t.functionValue.args)==null?void 0:n.map(Ph))||[])})(r):oi._fromProto(r)}class Gl{constructor(e,t,n,s){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=s,this.es={}}static ts(e,t,n,s){j(e.uid!=="",64387);const i=e.isAuthenticated()?e.uid:"";return new Gl(i,t,n,s)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Ar(e)._i({index:vs,range:n},((s,i,o)=>{t=!1,o.done()})).next((()=>t))}addMutationBatch(e,t,n,s){const i=wi(e),o=Ar(e);return o.add({}).next((a=>{j(typeof a=="number",49019);const c=new Bf(a,t,n,s),l=(function(C,m,D){const N=D.baseMutations.map((J=>Ma(C.Xi,J))),G=D.mutations.map((J=>Ma(C.Xi,J)));return{userId:m,batchId:D.batchId,localWriteTimeMs:D.localWriteTime.toMillis(),baseMutations:N,mutations:G}})(this.serializer,this.userId,c),B=[];let h=new ve(((p,C)=>ce(p.canonicalString(),C.canonicalString())));for(const p of s){const C=vy(this.userId,p.key.path,a);h=h.add(p.key.path.popLast()),B.push(o.put(l)),B.push(i.put(C,sO))}return h.forEach((p=>{B.push(this.indexManager.addToCollectionParentIndex(e,p))})),e.addOnCommittedListener((()=>{this.es[a]=c.keys()})),P.waitFor(B).next((()=>c))}))}lookupMutationBatch(e,t){return Ar(e).get(t).next((n=>n?(j(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:t}),ys(this.serializer,n)):null))}ns(e,t){return this.es[t]?P.resolve(this.es[t]):this.lookupMutationBatch(e,t).next((n=>{if(n){const s=n.keys();return this.es[t]=s,s}return null}))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return Ar(e)._i({index:vs,range:s},((o,a,c)=>{a.userId===this.userId&&(j(a.batchId>=n,47524,{rs:n}),i=ys(this.serializer,a)),c.done()})).next((()=>i))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=Mr;return Ar(e)._i({index:vs,range:t,reverse:!0},((s,i,o)=>{n=i.batchId,o.done()})).next((()=>n))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,Mr],[this.userId,Number.POSITIVE_INFINITY]);return Ar(e).ti(vs,t).next((n=>n.map((s=>ys(this.serializer,s)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=du(this.userId,t.path),s=IDBKeyRange.lowerBound(n),i=[];return wi(e)._i({range:s},((o,a,c)=>{const[l,B,h]=o,p=Nn(B);if(l===this.userId&&t.path.isEqual(p))return Ar(e).get(h).next((C=>{if(!C)throw Z(61480,{ss:o,batchId:h});j(C.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:C.userId,batchId:h}),i.push(ys(this.serializer,C))}));c.done()})).next((()=>i))}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new ve(ce);const s=[];return t.forEach((i=>{const o=du(this.userId,i.path),a=IDBKeyRange.lowerBound(o),c=wi(e)._i({range:a},((l,B,h)=>{const[p,C,m]=l,D=Nn(C);p===this.userId&&i.path.isEqual(D)?n=n.add(m):h.done()}));s.push(c)})),P.waitFor(s).next((()=>this._s(e,n)))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1,i=du(this.userId,n),o=IDBKeyRange.lowerBound(i);let a=new ve(ce);return wi(e)._i({range:o},((c,l,B)=>{const[h,p,C]=c,m=Nn(p);h===this.userId&&n.isPrefixOf(m)?m.length===s&&(a=a.add(C)):B.done()})).next((()=>this._s(e,a)))}_s(e,t){const n=[],s=[];return t.forEach((i=>{s.push(Ar(e).get(i).next((o=>{if(o===null)throw Z(35274,{batchId:i});j(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:i}),n.push(ys(this.serializer,o))})))})),P.waitFor(s).next((()=>n))}removeMutationBatch(e,t){return ky(e.Zi,this.userId,t).next((n=>(e.addOnCommittedListener((()=>{this.us(t.batchId)})),P.forEach(n,(s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))))}us(e){delete this.es[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return P.resolve();const n=IDBKeyRange.lowerBound((function(o){return[o]})(this.userId)),s=[];return wi(e)._i({range:n},((i,o,a)=>{if(i[0]===this.userId){const c=Nn(i[1]);s.push(c)}else a.done()})).next((()=>{j(s.length===0,56720,{cs:s.map((i=>i.canonicalString()))})}))}))}containsKey(e,t){return Uy(e,this.userId,t)}ls(e){return Hy(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:Mr,lastStreamToken:""}))}}function Uy(r,e,t){const n=du(e,t.path),s=n[1],i=IDBKeyRange.lowerBound(n);let o=!1;return wi(r)._i({range:i,si:!0},((a,c,l)=>{const[B,h,p]=a;B===e&&h===s&&(o=!0),l.done()})).next((()=>o))}function Ar(r){return ut(r,ln)}function wi(r){return ut(r,$i)}function Hy(r){return ut(r,Ka)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PO{getBundleMetadata(e,t){return tm(e).get(t).next((n=>{if(n)return(function(i){return{id:i.bundleId,createTime:Ks(i.createTime),version:i.version}})(n)}))}saveBundleMetadata(e,t){return tm(e).put((function(s){return{bundleId:s.id,createTime:Js(Xe(s.createTime)),version:s.version}})(t))}getNamedQuery(e,t){return nm(e).get(t).next((n=>{if(n)return(function(i){return{name:i.name,query:Ml(i.bundledQuery),readTime:Ks(i.readTime)}})(n)}))}saveNamedQuery(e,t){return nm(e).put((function(s){return{name:s.name,readTime:Js(Xe(s.readTime)),bundledQuery:s.bundledQuery}})(t))}}function tm(r){return ut(r,Ll)}function nm(r){return ut(r,Vl)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ul{constructor(e,t){this.serializer=e,this.userId=t}static ts(e,t){const n=t.uid||"";return new Ul(e,n)}getOverlay(e,t){return fi(e).get(Zg(this.userId,t)).next((n=>n?$c(this.serializer,n):null))}getOverlays(e,t){const n=rn();return P.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}getAllOverlays(e,t){const n=rn();return fi(e)._i(((s,i)=>{const o=$c(this.serializer,i);o.largestBatchId>t&&n.set(o.getKey(),o)})).next((()=>n))}saveOverlays(e,t,n){const s=[];return n.forEach(((i,o)=>{const a=new gf(t,o);s.push(this.Es(e,a))})),P.waitFor(s)}removeOverlaysForBatchId(e,t,n){const s=new Set;t.forEach((o=>s.add(bt(o.getCollectionPath()))));const i=[];return s.forEach((o=>{const a=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);i.push(fi(e).ii(vh,a))})),P.waitFor(i)}getOverlaysForCollection(e,t,n){const s=rn(),i=bt(t),o=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return fi(e).ti(vh,o).next((a=>{for(const c of a){const l=$c(this.serializer,c);s.set(l.getKey(),l)}return s}))}getOverlaysForCollectionGroup(e,t,n,s){const i=rn();let o;const a=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return fi(e)._i({index:Oy,range:a},((c,l,B)=>{const h=$c(this.serializer,l);i.size()<s||h.largestBatchId===o?(i.set(h.getKey(),h),o=h.largestBatchId):B.done()})).next((()=>i))}Es(e,t){return fi(e).put((function(s,i,o){const[a,c,l]=Zg(i,o.mutation.key);return{userId:i,collectionPath:c,documentId:l,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Ma(s.Xi,o.mutation)}})(this.serializer,this.userId,t))}}function fi(r){return ut(r,kl)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SO{hs(e){return ut(e,pf)}getSessionToken(e){return this.hs(e).get("sessionToken").next((t=>{const n=t==null?void 0:t.value;return n?Re.fromUint8Array(n):Re.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.hs(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(){}Ts(e,t){this.Ps(e,t),t.Is()}Ps(e,t){var n;if("nullValue"in e)this.Rs(t,5);else if("booleanValue"in e)this.Rs(t,10),t.As(e.booleanValue?1:0);else if("integerValue"in e)this.Rs(t,15),t.As(Le(e.integerValue));else if("doubleValue"in e){const s=Le(e.doubleValue);this.Vs(s,t)}else if("timestampValue"in e)this.ds(e.timestampValue,t);else if("stringValue"in e)this.fs(e.stringValue,t),this.ps(t);else if("bytesValue"in e)this.Rs(t,30),t.gs(fn(e.bytesValue)),this.ps(t);else if("referenceValue"in e)this.ys(e.referenceValue,t);else if("geoPointValue"in e)this.ws(e.geoPointValue,t);else if("mapValue"in e){const s=ic(e);if(s===oe.fe)this.Rs(t,Number.MAX_SAFE_INTEGER);else if(s===oe.me)this.bs(e.mapValue,t);else if(s===oe.de)this.Rs(t,999);else if(s===oe.Ve)this.Rs(t,7);else if(s===oe.Ae){const i=(n=e.mapValue)==null?void 0:n.fields,o=i==null?void 0:i[Mi],a=o==null?void 0:o.bytesValue,c=fn(a).toUint8Array();if(c[0]===0){const l=c.slice(1);this.Rs(t,30),t.gs(Re.fromUint8Array(l)),this.ps(t)}else this.Ss(e.mapValue,t)}else if(s===oe.he)this.xs(e.mapValue,t);else if(s===oe.Re)this.vs(e.mapValue,t);else if(s===oe.Te)this.Ds(e.mapValue,t);else if(s===oe.Pe)this.Cs(e.mapValue,t);else if(s===oe.Ie){const i=parseFloat(e.mapValue.fields[cr].stringValue);this.Vs(i,t)}else this.Fs(e.mapValue,t),this.ps(t)}else"arrayValue"in e?(this.Os(e.arrayValue,t),this.ps(t)):Z(19022,{Ms:e})}fs(e,t){this.Rs(t,25),this.Ns(e,t)}Ns(e,t){t.Bs(e)}Vs(e,t){isNaN(e)?this.Rs(t,13):(this.Rs(t,15),Li(e)?t.As(0):t.As(e))}Cs(e,t){this.Rs(t,15),t.As(Le(e.fields[ns].integerValue))}ds(e,t){this.Rs(t,20),typeof e=="string"&&(e=or(e)),t.Bs(`${e.seconds||""}`),t.As(e.nanos||0)}ws(e,t){this.Rs(t,45),t.As(e.latitude||0),t.As(e.longitude||0)}Fs(e,t){const n=e.fields||{};this.Rs(t,55);for(const s of Object.keys(n))this.fs(s,t),this.Ps(n[s],t)}bs(e,t){var o,a;const n=e.fields||{};this.Rs(t,53);const s=Gs,i=((a=(o=n[s].arrayValue)==null?void 0:o.values)==null?void 0:a.length)||0;this.Rs(t,15),t.As(Le(i)),this.fs(s,t),this.Ps(n[s],t)}Os(e,t){const n=e.values||[];this.Rs(t,50);for(const s of n)this.Ps(s,t)}ys(e,t){this.Rs(t,37);const n=e.split("/").filter((s=>s.length>0));z.fromSegments(n.slice(5)).path.forEach((s=>{this.Rs(t,60),this.Ns(s,t)}))}Rs(e,t){e.As(t)}ps(e){e.As(2)}vs(e,t){this.Rs(t,22);const n=e.fields||{};n&&this.Fs(n[Zn].mapValue,t)}Ds(e,t){var i;this.Rs(t,43);const n=e.fields||{},s=((i=n[Us])==null?void 0:i.stringValue)||"";t.gs(fn(s))}Ss(e,t){var i;this.Rs(t,31);const n=e.fields||{},s=((i=n[Mi])==null?void 0:i.bytesValue)||"";t.gs(fn(s)),this.ps(t)}xs(e,t){var i,o,a,c;this.Rs(t,47);const n=e.fields||{},s=((o=(i=n[An])==null?void 0:i.mapValue)==null?void 0:o.fields)||{};s&&(t.Bs(((a=s[Vi])==null?void 0:a.stringValue)||""),t.Bs(((c=s[ki])==null?void 0:c.stringValue)||"")),this.ps(t)}}ws.Ls=new ws;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pi=255;function NO(r){if(r===0)return 8;let e=0;return r>>4||(e+=4,r<<=4),r>>6||(e+=2,r<<=2),r>>7||(e+=1),e}function rm(r){const e=64-(function(n){let s=0;for(let i=0;i<8;++i){const o=NO(255&n[i]);if(s+=o,o!==8)break}return s})(r);return Math.ceil(e/8)}class OO{constructor(){this.buffer=new Uint8Array(1024),this.position=0}$s(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Us(n.value),n=t.next();this.ks()}Qs(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.qs(n.value),n=t.next();this.Ks()}Ws(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Us(n);else if(n<2048)this.Us(960|n>>>6),this.Us(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Us(480|n>>>12),this.Us(128|63&n>>>6),this.Us(128|63&n);else{const s=t.codePointAt(0);this.Us(240|s>>>18),this.Us(128|63&s>>>12),this.Us(128|63&s>>>6),this.Us(128|63&s)}}this.ks()}Gs(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.qs(n);else if(n<2048)this.qs(960|n>>>6),this.qs(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.qs(480|n>>>12),this.qs(128|63&n>>>6),this.qs(128|63&n);else{const s=t.codePointAt(0);this.qs(240|s>>>18),this.qs(128|63&s>>>12),this.qs(128|63&s>>>6),this.qs(128|63&s)}}this.Ks()}js(e){const t=this.zs(e),n=rm(t);this.Hs(1+n),this.buffer[this.position++]=255&n;for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=255&t[s]}Js(e){const t=this.zs(e),n=rm(t);this.Hs(1+n),this.buffer[this.position++]=~(255&n);for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}Ys(){this.Zs(pi),this.Zs(255)}Xs(){this.e_(pi),this.e_(255)}reset(){this.position=0}seed(e){this.Hs(e.length),this.buffer.set(e,this.position),this.position+=e.length}t_(){return this.buffer.slice(0,this.position)}zs(e){const t=(function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)})(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let s=1;s<t.length;++s)t[s]^=n?255:0;return t}Us(e){const t=255&e;t===0?(this.Zs(0),this.Zs(255)):t===pi?(this.Zs(pi),this.Zs(0)):this.Zs(t)}qs(e){const t=255&e;t===0?(this.e_(0),this.e_(255)):t===pi?(this.e_(pi),this.e_(0)):this.e_(e)}ks(){this.Zs(0),this.Zs(1)}Ks(){this.e_(0),this.e_(1)}Zs(e){this.Hs(1),this.buffer[this.position++]=e}e_(e){this.Hs(1),this.buffer[this.position++]=~e}Hs(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class FO{constructor(e){this.n_=e}gs(e){this.n_.$s(e)}Bs(e){this.n_.Ws(e)}As(e){this.n_.js(e)}Is(){this.n_.Ys()}}class xO{constructor(e){this.n_=e}gs(e){this.n_.Qs(e)}Bs(e){this.n_.Gs(e)}As(e){this.n_.Js(e)}Is(){this.n_.Xs()}}class Wo{constructor(){this.n_=new OO,this.ascending=new FO(this.n_),this.descending=new xO(this.n_)}seed(e){this.n_.seed(e)}r_(e){return e===0?this.ascending:this.descending}t_(){return this.n_.t_()}reset(){this.n_.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds{constructor(e,t,n,s){this.i_=e,this.s_=t,this.__=n,this.o_=s}a_(){const e=this.o_.length,t=e===0||this.o_[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.o_,0),t!==e?n.set([0],this.o_.length):++n[n.length-1],new Ds(this.i_,this.s_,this.__,n)}u_(e,t,n){return{indexId:this.i_,uid:e,arrayValue:pu(this.__),directionalValue:pu(this.o_),orderedDocumentKey:pu(t),documentKey:n.path.toArray()}}c_(e,t,n){const s=this.u_(e,t,n);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function br(r,e){let t=r.i_-e.i_;return t!==0?t:(t=sm(r.__,e.__),t!==0?t:(t=sm(r.o_,e.o_),t!==0?t:z.comparator(r.s_,e.s_)))}function sm(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}function pu(r){return Ym()?(function(t){let n="";for(let s=0;s<t.length;s++)n+=String.fromCharCode(t[s]);return n})(r):r}function im(r){return typeof r!="string"?r:(function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n})(r)}class om{constructor(e){this.l_=new ve(((t,n)=>Ye.comparator(t.field,n.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.E_=e.orderBy,this.h_=[];for(const t of e.filters){const n=t;n.isInequality()?this.l_=this.l_.add(n):this.h_.push(n)}}get T_(){return this.l_.size>1}P_(e){if(j(e.collectionGroup===this.collectionId,49279),this.T_)return!1;const t=Ch(e);if(t!==void 0&&!this.I_(t))return!1;const n=ms(e);let s=new Set,i=0,o=0;for(;i<n.length&&this.I_(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.l_.size>0){const a=this.l_.getIterator().getNext();if(!s.has(a.field.canonicalString())){const c=n[i];if(!this.R_(a,c)||!this.A_(this.E_[o++],c))return!1}++i}for(;i<n.length;++i){const a=n[i];if(o>=this.E_.length||!this.A_(this.E_[o++],a))return!1}return!0}V_(){if(this.T_)return null;let e=new ve(Ye.comparator);const t=[];for(const n of this.h_)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new xs(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new xs(n.field,0))}for(const n of this.E_)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new xs(n.field,n.dir==="asc"?0:1)));return new Ki(Ki.UNKNOWN_ID,this.collectionId,t,zi.empty())}I_(e){for(const t of this.h_)if(this.R_(t,e))return!0;return!1}R_(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}A_(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qy(r){var t,n;if(j(r instanceof _e||r instanceof Pe,20012),r instanceof _e){if(r instanceof pI){const s=((n=(t=r.value.arrayValue)==null?void 0:t.values)==null?void 0:n.map((i=>_e.create(r.field,"==",i))))||[];return Pe.create(s,"or")}return r}const e=r.filters.map((s=>qy(s)));return Pe.create(e,r.op)}function LO(r){if(r.getFilters().length===0)return[];const e=Oh(qy(r));return j(jy(e),7391),Sh(e)||Nh(e)?[e]:e.getFilters()}function Sh(r){return r instanceof _e}function Nh(r){return r instanceof Pe&&Pd(r)}function jy(r){return Sh(r)||Nh(r)||(function(t){if(t instanceof Pe&&fh(t)){for(const n of t.getFilters())if(!Sh(n)&&!Nh(n))return!1;return!0}return!1})(r)}function Oh(r){if(j(r instanceof _e||r instanceof Pe,34018),r instanceof _e)return r;if(r.filters.length===1)return Oh(r.filters[0]);const e=r.filters.map((n=>Oh(n)));let t=Pe.create(e,r.op);return t=Gu(t),jy(t)?t:(j(t instanceof Pe,64498),j(ji(t),40251),j(t.filters.length>1,57927),t.filters.reduce(((n,s)=>mf(n,s))))}function mf(r,e){let t;return j(r instanceof _e||r instanceof Pe,38388),j(e instanceof _e||e instanceof Pe,25473),t=r instanceof _e?e instanceof _e?(function(s,i){return Pe.create([s,i],"and")})(r,e):am(r,e):e instanceof _e?am(e,r):(function(s,i){if(j(s.filters.length>0&&i.filters.length>0,48005),ji(s)&&ji(i))return hI(s,i.getFilters());const o=fh(s)?s:i,a=fh(s)?i:s,c=o.filters.map((l=>mf(l,a)));return Pe.create(c,"or")})(r,e),Gu(t)}function am(r,e){if(ji(e))return hI(e,r.getFilters());{const t=e.filters.map((n=>mf(r,n)));return Pe.create(t,"or")}}function Gu(r){if(j(r instanceof _e||r instanceof Pe,11850),r instanceof _e)return r;const e=r.getFilters();if(e.length===1)return Gu(e[0]);if(lI(r))return r;const t=e.map((s=>Gu(s))),n=[];return t.forEach((s=>{s instanceof _e?n.push(s):s instanceof Pe&&(s.op===r.op?n.push(...s.filters):n.push(s))})),n.length===1?n[0]:Pe.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VO{constructor(){this.d_=new _f}addToCollectionParentIndex(e,t){return this.d_.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.d_.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(Zt.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(Zt.min())}updateCollectionGroup(e,t,n){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}}class _f{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new ve(Be.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new ve(Be.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cm="IndexedDbIndexManager",Qc=new Uint8Array(0);class kO{constructor(e,t){this.databaseId=t,this.f_=new _f,this.m_=new gr((n=>vu(n)),((n,s)=>Nd(n,s))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.f_.has(t)){const n=t.lastSegment(),s=t.popLast();e.addOnCommittedListener((()=>{this.f_.add(t)}));const i={collectionId:n,parent:bt(s)};return um(e).put(i)}return P.resolve()}getCollectionParents(e,t){const n=[],s=IDBKeyRange.bound([t,""],[xE(t),""],!1,!0);return um(e).ti(s).next((i=>{for(const o of i){if(o.collectionId!==t)break;n.push(Nn(o.parent))}return n}))}addFieldIndex(e,t){const n=$o(e),s=(function(a){return{indexId:a.indexId,collectionGroup:a.collectionGroup,fields:a.fields.map((c=>[c.fieldPath.canonicalString(),c.kind]))}})(t);delete s.indexId;const i=n.add(s);if(t.indexState){const o=gi(e);return i.next((a=>{o.put(em(a,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return i.next()}deleteFieldIndex(e,t){const n=$o(e),s=gi(e),i=Ci(e);return n.delete(t.indexId).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=$o(e),n=Ci(e),s=gi(e);return t.ii().next((()=>n.ii())).next((()=>s.ii()))}createTargetIndexes(e,t){return P.forEach(this.p_(t),(n=>this.getIndexType(e,n).next((s=>{if(s===0||s===1){const i=new om(n).V_();if(i!=null)return this.addFieldIndex(e,i)}}))))}getDocumentsMatchingTarget(e,t){const n=Ci(e);let s=!0;const i=new Map;return P.forEach(this.p_(t),(o=>this.g_(e,o).next((a=>{s&&(s=!!a),i.set(o,a)})))).next((()=>{if(s){let o=le();const a=[];return P.forEach(i,((c,l)=>{U(cm,`Using index ${(function(te){return`id=${te.indexId}|cg=${te.collectionGroup}|f=${te.fields.map((he=>`${he.fieldPath}:${he.kind}`)).join(",")}`})(c)} to execute ${vu(t)}`);const B=(function(te,he){const de=Ch(he);if(de===void 0)return null;for(const fe of Ru(te,de.fieldPath))switch(fe.op){case"array-contains-any":return fe.value.arrayValue.values||[];case"array-contains":return[fe.value]}return null})(l,c),h=(function(te,he){const de=new Map;for(const fe of ms(he))for(const A of Ru(te,fe.fieldPath))switch(A.op){case"==":case"in":de.set(fe.fieldPath.canonicalString(),A.value);break;case"not-in":case"!=":return de.set(fe.fieldPath.canonicalString(),A.value),Array.from(de.values())}return null})(l,c),p=(function(te,he){const de=[];let fe=!0;for(const A of ms(he)){const I=A.kind===0?Rg(te,A.fieldPath,te.startAt):Pg(te,A.fieldPath,te.startAt);de.push(I.value),fe&&(fe=I.inclusive)}return new zr(de,fe)})(l,c),C=(function(te,he){const de=[];let fe=!0;for(const A of ms(he)){const I=A.kind===0?Pg(te,A.fieldPath,te.endAt):Rg(te,A.fieldPath,te.endAt);de.push(I.value),fe&&(fe=I.inclusive)}return new zr(de,fe)})(l,c),m=this.y_(c,l,p),D=this.y_(c,l,C),N=this.w_(c,l,h),G=this.b_(c.indexId,B,m,p.inclusive,D,C.inclusive,N);return P.forEach(G,(J=>n.ri(J,t.limit).next((te=>{te.forEach((he=>{const de=z.fromSegments(he.documentKey);o.has(de)||(o=o.add(de),a.push(de))}))}))))})).next((()=>a))}return P.resolve(null)}))}p_(e){let t=this.m_.get(e);return t||(e.filters.length===0?t=[e]:t=LO(Pe.create(e.filters,"and")).map((n=>gh(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt))),this.m_.set(e,t),t)}b_(e,t,n,s,i,o,a){const c=(t!=null?t.length:1)*Math.max(n.length,i.length),l=c/(t!=null?t.length:1),B=[];for(let h=0;h<c;++h){const p=t?this.S_(t[h/l]):Qc,C=this.x_(e,p,n[h%l],s),m=this.v_(e,p,i[h%l],o),D=a.map((N=>this.x_(e,p,N,!0)));B.push(...this.createRange(C,m,D))}return B}x_(e,t,n,s){const i=new Ds(e,z.empty(),t,n);return s?i:i.a_()}v_(e,t,n,s){const i=new Ds(e,z.empty(),t,n);return s?i.a_():i}g_(e,t){const n=new om(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next((i=>{let o=null;for(const a of i)n.P_(a)&&(!o||a.fields.length>o.fields.length)&&(o=a);return o}))}getIndexType(e,t){let n=2;const s=this.p_(t);return P.forEach(s,(i=>this.g_(e,i).next((o=>{o?n!==0&&o.fields.length<(function(c){let l=new ve(Ye.comparator),B=!1;for(const h of c.filters)for(const p of h.getFlattenedFilters())p.field.isKeyField()||(p.op==="array-contains"||p.op==="array-contains-any"?B=!0:l=l.add(p.field));for(const h of c.orderBy)h.field.isKeyField()||(l=l.add(h.field));return l.size+(B?1:0)})(i)&&(n=1):n=0})))).next((()=>(function(o){return o.limit!==null})(t)&&s.length>1&&n===2?1:n))}D_(e,t){const n=new Wo;for(const s of ms(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=n.r_(s.kind);ws.Ls.Ts(i,o)}return n.t_()}S_(e){const t=new Wo;return ws.Ls.Ts(e,t.r_(0)),t.t_()}C_(e,t){const n=new Wo;return ws.Ls.Ts(jr(this.databaseId,t),n.r_((function(i){const o=ms(i);return o.length===0?0:o[o.length-1].kind})(e))),n.t_()}w_(e,t,n){if(n===null)return[];let s=[];s.push(new Wo);let i=0;for(const o of ms(e)){const a=n[i++];for(const c of s)if(this.F_(t,o.fieldPath)&&Kr(a))s=this.O_(s,o,a);else{const l=c.r_(o.kind);ws.Ls.Ts(a,l)}}return this.M_(s)}y_(e,t,n){return this.w_(e,t,n.position)}M_(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].t_();return t}O_(e,t,n){const s=[...e],i=[];for(const o of n.arrayValue.values||[])for(const a of s){const c=new Wo;c.seed(a.t_()),ws.Ls.Ts(o,c.r_(t.kind)),i.push(c)}return i}F_(e,t){return!!e.filters.find((n=>n instanceof _e&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in")))}getFieldIndexes(e,t){const n=$o(e),s=gi(e);return(t?n.ti(bh,IDBKeyRange.bound(t,t)):n.ti()).next((i=>{const o=[];return P.forEach(i,(a=>s.get([a.indexId,this.uid]).next((c=>{o.push((function(B,h){const p=h?new zi(h.sequenceNumber,new Zt(Ks(h.readTime),new z(Nn(h.documentKey)),h.largestBatchId)):zi.empty(),C=B.fields.map((([m,D])=>new xs(Ye.fromServerFormat(m),D)));return new Ki(B.indexId,B.collectionGroup,C,p)})(a,c))})))).next((()=>o))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:ce(n.collectionGroup,s.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,n){const s=$o(e),i=gi(e);return this.N_(e).next((o=>s.ti(bh,IDBKeyRange.bound(t,t)).next((a=>P.forEach(a,(c=>i.put(em(c.indexId,this.uid,o,n))))))))}updateIndexEntries(e,t){const n=new Map;return P.forEach(t,((s,i)=>{const o=n.get(s.collectionGroup);return(o?P.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next((a=>(n.set(s.collectionGroup,a),P.forEach(a,(c=>this.B_(e,s,c).next((l=>{const B=this.L_(i,c);return l.isEqual(B)?P.resolve():this.U_(e,i,c,l,B)})))))))}))}k_(e,t,n,s){return Ci(e).put(s.u_(this.uid,this.C_(n,t.key),t.key))}Q_(e,t,n,s){return Ci(e).delete(s.c_(this.uid,this.C_(n,t.key),t.key))}B_(e,t,n){const s=Ci(e);let i=new ve(br);return s._i({index:Ny,range:IDBKeyRange.only([n.indexId,this.uid,pu(this.C_(n,t))])},((o,a)=>{i=i.add(new Ds(n.indexId,t,im(a.arrayValue),im(a.directionalValue)))})).next((()=>i))}L_(e,t){let n=new ve(br);const s=this.D_(t,e);if(s==null)return n;const i=Ch(t);if(i!=null){const o=e.data.field(i.fieldPath);if(Kr(o))for(const a of o.arrayValue.values||[])n=n.add(new Ds(t.indexId,e.key,this.S_(a),s))}else n=n.add(new Ds(t.indexId,e.key,Qc,s));return n}U_(e,t,n,s,i){U(cm,"Updating index entries for document '%s'",t.key);const o=[];return(function(c,l,B,h,p){const C=c.getIterator(),m=l.getIterator();let D=hi(C),N=hi(m);for(;D||N;){let G=!1,J=!1;if(D&&N){const te=B(D,N);te<0?J=!0:te>0&&(G=!0)}else D!=null?J=!0:G=!0;G?(h(N),N=hi(m)):J?(p(D),D=hi(C)):(D=hi(C),N=hi(m))}})(s,i,br,(a=>{o.push(this.k_(e,t,n,a))}),(a=>{o.push(this.Q_(e,t,n,a))})),P.waitFor(o)}N_(e){let t=1;return gi(e)._i({index:Sy,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((n,s,i)=>{i.done(),t=s.sequenceNumber+1})).next((()=>t))}createRange(e,t,n){n=n.sort(((o,a)=>br(o,a))).filter(((o,a,c)=>!a||br(o,c[a-1])!==0));const s=[];s.push(e);for(const o of n){const a=br(o,e),c=br(o,t);if(a===0)s[0]=e.a_();else if(a>0&&c<0)s.push(o),s.push(o.a_());else if(c>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.q_(s[o],s[o+1]))return[];const a=s[o].c_(this.uid,Qc,z.empty()),c=s[o+1].c_(this.uid,Qc,z.empty());i.push(IDBKeyRange.bound(a,c))}return i}q_(e,t){return br(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(lm)}getMinOffset(e,t){return P.mapArray(this.p_(t),(n=>this.g_(e,n).next((s=>s||Z(44426))))).next(lm)}}function um(r){return ut(r,Wa)}function Ci(r){return ut(r,Ea)}function $o(r){return ut(r,ff)}function gi(r){return ut(r,_a)}function lm(r){j(r.length!==0,28825);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;Sd(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new Zt(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(e){this.K_=e}next(){return this.K_+=2,this.K_}static W_(){return new hr(0)}static G_(){return new hr(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MO{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.j_(e).next((t=>{const n=new hr(t.highestTargetId);return t.highestTargetId=n.next(),this.z_(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.j_(e).next((t=>re.fromTimestamp(new we(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.j_(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,n){return this.j_(e).next((s=>(s.highestListenSequenceNumber=t,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.z_(e,s))))}addTargetData(e,t){return this.H_(e,t).next((()=>this.j_(e).next((n=>(n.targetCount+=1,this.J_(t,n),this.z_(e,n))))))}updateTargetData(e,t){return this.H_(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>mi(e).delete(t.targetId))).next((()=>this.j_(e))).next((n=>(j(n.targetCount>0,8065),n.targetCount-=1,this.z_(e,n))))}removeTargets(e,t,n){let s=0;const i=[];return mi(e)._i(((o,a)=>{const c=ia(this.serializer,a);c.sequenceNumber<=t&&n.get(c.targetId)===null&&(s++,i.push(this.removeTargetData(e,c)))})).next((()=>P.waitFor(i))).next((()=>s))}forEachTarget(e,t){return mi(e)._i(((n,s)=>{const i=ia(this.serializer,s);t(i)}))}j_(e){return Bm(e).get(Vu).next((t=>(j(t!==null,2888),t)))}z_(e,t){return Bm(e).put(Vu,t)}H_(e,t){return mi(e).put(Gy(this.serializer,t))}J_(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.j_(e).next((t=>t.targetCount))}getTargetData(e,t){const n=xl(t),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return mi(e)._i({range:s,index:Py},((o,a,c)=>{const l=ia(this.serializer,a);lf(t,l.target)&&(i=l,c.done())})).next((()=>i))}addMatchingKeys(e,t,n){const s=[],i=Nr(e);return t.forEach((o=>{const a=bt(o.path);s.push(i.put({targetId:n,path:a})),s.push(this.referenceDelegate.addReference(e,n,o))})),P.waitFor(s)}removeMatchingKeys(e,t,n){const s=Nr(e);return P.forEach(t,(i=>{const o=bt(i.path);return P.waitFor([s.delete([n,o]),this.referenceDelegate.removeReference(e,n,i)])}))}removeMatchingKeysForTargetId(e,t){const n=Nr(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),s=Nr(e);let i=le();return s._i({range:n,si:!0},((o,a,c)=>{const l=Nn(o[1]),B=new z(l);i=i.add(B)})).next((()=>i))}containsKey(e,t){const n=bt(t.path),s=IDBKeyRange.bound([n],[xE(n)],!1,!0);let i=0;return Nr(e)._i({index:df,si:!0,range:s},(([o,a],c,l)=>{o!==0&&(i++,l.done())})).next((()=>i>0))}Mt(e,t){return mi(e).get(t).next((n=>n?ia(this.serializer,n):null))}}function mi(r){return ut(r,Qi)}function Bm(r){return ut(r,Vs)}function Nr(r){return ut(r,Yi)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GO{constructor(e,t){this.db=e,this.garbageCollector=ZI(this,t)}Pi(e){const t=this.Y_(e);return this.db.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}Y_(e){let t=0;return this.Ii(e,(n=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Ii(e,t){return this.Z_(e,((n,s)=>t(s)))}addReference(e,t,n){return Yc(e,n)}removeReference(e,t,n){return Yc(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return Yc(e,t)}X_(e,t){return(function(s,i){let o=!1;return Hy(s).oi((a=>Uy(s,a,i).next((c=>(c&&(o=!0),P.resolve(!c)))))).next((()=>o))})(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.Z_(e,((o,a)=>{if(a<=t){const c=this.X_(e,o).next((l=>{if(!l)return i++,n.getEntry(e,o).next((()=>(n.removeEntry(o,re.min()),Nr(e).delete((function(h){return[0,bt(h.path)]})(o)))))}));s.push(c)}})).next((()=>P.waitFor(s))).next((()=>n.apply(e))).next((()=>i))}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return Yc(e,t)}Z_(e,t){const n=Nr(e);let s,i=Gt.Br;return n._i({index:df},(([o,a],{path:c,sequenceNumber:l})=>{o===0?(i!==Gt.Br&&t(new z(Nn(s)),i),i=l,s=c):i=Gt.Br})).next((()=>{i!==Gt.Br&&t(new z(Nn(s)),i)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Yc(r,e){return Nr(r).put((function(n,s){return{targetId:0,path:bt(n.path),sequenceNumber:s}})(e,r.currentSequenceNumber))}// Copyright 2024 Google LLC* @license
function Jy(r,e){var n;let t=e;for(const s of r.stages)t=UO({serializer:r.serializer,serverTimestampBehavior:(n=r.listenOptions)==null?void 0:n.serverTimestampBehavior},s,t);return t}function Hl(r,e){return Jy(r,[e]).length>0}function Ky(r,e){return Je(r)?Hl(r,e):ml(r,e)}function UO(r,e,t){if(e instanceof uc)return(function(s,i,o){return o.filter((a=>a.isFoundDocument()&&`/${a.key.getCollectionPath().canonicalString()}`===i.pi))})(0,e,t);if(e instanceof Bc)return(function(s,i,o){return o.filter((a=>{const c=ma(ue(i.condition).evaluate(s,a));return c!==void 0&&an(c,Kt)}))})(r,e,t);if(e instanceof lc)return(function(s,i,o){return o.filter((a=>a.isFoundDocument()&&a.key.getCollectionPath().lastSegment()===i.collectionId))})(0,e,t);if(e instanceof Sl)return(function(s,i,o){return o.filter((a=>a.isFoundDocument()))})(0,0,t);if(e instanceof Nl)return(function(s,i,o){return o.filter((a=>a.isFoundDocument()&&i.yi.has(a.key.path.toStringWithLeadingSlash())))})(0,e,t);if(e instanceof $r)return(function(s,i,o){return o.slice(0,i.limit)})(0,e,t);if(e instanceof Sn)return(function(s,i,o){const a=i.orderings.map((c=>({eo:ue(c.expr),direction:c.direction})));return[...o].sort(((c,l)=>{for(const{eo:B,direction:h}of a){const p=ma(B.evaluate(s,c)),C=ma(B.evaluate(s,l)),m=vt(p??ur,C??ur);if(m!==0)return h==="ascending"?m:-m}return 0}))})(r,e,t);throw new Error(`Unknown stage: ${e._name}`)}function Uu(r){const e=(function(n){for(let s=n.stages.length-1;s>=0;s--){const i=n.stages[s];if(i instanceof Sn)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")})(r);return(t,n)=>{for(const s of e){const i=ma(ue(s.expr).evaluate({serializer:r.serializer},t)),o=ma(ue(s.expr).evaluate({serializer:r.serializer},n)),a=vt(i||ur,o||ur);if(a!==0)return s.direction==="ascending"?a:-a}return 0}}function HB(r){for(let e=r.stages.length-1;e>=0;e--){const t=r.stages[e];if(t instanceof $r)return{limit:t.limit}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zy{constructor(){this.changes=new gr((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Me.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?P.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HO{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return vr(e).put(n)}removeEntry(e,t,n){return vr(e).delete((function(i,o){const a=i.path.toArray();return[a.slice(0,a.length-2),a[a.length-2],Mu(o),a[a.length-1]]})(t,n))}updateMetadata(e,t){return this.getMetadata(e).next((n=>(n.byteSize+=t,this.no(e,n))))}getEntry(e,t){let n=Me.newInvalidDocument(t);return vr(e)._i({index:fu,range:IDBKeyRange.only(Qo(t))},((s,i)=>{n=this.ro(t,i)})).next((()=>n))}io(e,t){let n={size:0,document:Me.newInvalidDocument(t)};return vr(e)._i({index:fu,range:IDBKeyRange.only(Qo(t))},((s,i)=>{n={document:this.ro(t,i),size:ku(i)}})).next((()=>n))}getEntries(e,t){let n=nt();return this.so(e,t,((s,i)=>{const o=this.ro(s,i);n=n.insert(s,o)})).next((()=>n))}getAllEntries(e){let t=nt();return vr(e)._i(((n,s)=>{const i=this.ro(z.fromSegments(s.prefixPath.concat(s.collectionGroup,s.documentId)),s);t=t.insert(i.key,i)})).next((()=>t))}_o(e,t){let n=nt(),s=new Fe(z.comparator);return this.so(e,t,((i,o)=>{const a=this.ro(i,o);n=n.insert(i,a),s=s.insert(i,ku(o))})).next((()=>({documents:n,oo:s})))}so(e,t,n){if(t.isEmpty())return P.resolve();let s=new ve(fm);t.forEach((c=>s=s.add(c)));const i=IDBKeyRange.bound(Qo(s.first()),Qo(s.last())),o=s.getIterator();let a=o.getNext();return vr(e)._i({index:fu,range:i},((c,l,B)=>{const h=z.fromSegments([...l.prefixPath,l.collectionGroup,l.documentId]);for(;a&&fm(a,h)<0;)n(a,null),a=o.getNext();a&&a.isEqual(h)&&(n(a,l),a=o.hasNext()?o.getNext():null),a?B.ei(Qo(a)):B.done()})).next((()=>{for(;a;)n(a,null),a=o.hasNext()?o.getNext():null}))}getDocumentsMatchingQuery(e,t,n,s,i){const o=Je(t)?Be.fromString(hc(t)):t.path,a=[o.popLast().toArray(),o.lastSegment(),Mu(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],c=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return vr(e).ti(IDBKeyRange.bound(a,c,!0)).next((l=>{i==null||i.incrementDocumentReadCount(l.length);let B=nt();for(const h of l){const p=this.ro(z.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);p.isFoundDocument()&&(Ky(t,p)||s.has(p.key))&&(B=B.insert(p.key,p))}return B}))}getAllFromCollectionGroup(e,t,n,s){let i=nt();const o=dm(t,n),a=dm(t,Zt.max());return vr(e)._i({index:Ry,range:IDBKeyRange.bound(o,a,!0)},((c,l,B)=>{const h=this.ro(z.fromSegments(l.prefixPath.concat(l.collectionGroup,l.documentId)),l);i=i.insert(h.key,h),i.size===s&&B.done()})).next((()=>i))}newChangeBuffer(e){return new qO(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return hm(e).get(Ah).next((t=>(j(!!t,20021),t)))}no(e,t){return hm(e).put(Ah,t)}ro(e,t){if(t){const n=vO(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(re.min())))return n}return Me.newInvalidDocument(e)}}function Wy(r){return new HO(r)}class qO extends zy{constructor(e,t){super(),this.ao=e,this.trackRemovals=t,this.uo=new gr((n=>n.toString()),((n,s)=>n.isEqual(s)))}applyChanges(e){const t=[];let n=0,s=new ve(((i,o)=>ce(i.canonicalString(),o.canonicalString())));return this.changes.forEach(((i,o)=>{const a=this.uo.get(i);if(t.push(this.ao.removeEntry(e,i,a.readTime)),o.isValidDocument()){const c=Xg(this.ao.serializer,o);s=s.add(i.path.popLast());const l=ku(c);n+=l-a.size,t.push(this.ao.addEntry(e,i,c))}else if(n-=a.size,this.trackRemovals){const c=Xg(this.ao.serializer,o.convertToNoDocument(re.min()));t.push(this.ao.addEntry(e,i,c))}})),s.forEach((i=>{t.push(this.ao.indexManager.addToCollectionParentIndex(e,i))})),t.push(this.ao.updateMetadata(e,n)),P.waitFor(t)}getFromCache(e,t){return this.ao.io(e,t).next((n=>(this.uo.set(t,{size:n.size,readTime:n.document.readTime}),n.document)))}getAllFromCache(e,t){return this.ao._o(e,t).next((({documents:n,oo:s})=>(s.forEach(((i,o)=>{this.uo.set(i,{size:o,readTime:n.get(i).readTime})})),n)))}}function hm(r){return ut(r,za)}function vr(r){return ut(r,Lu)}function Qo(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function dm(r,e){const t=e.documentKey.path.toArray();return[r,Mu(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function fm(r,e){const t=r.path.toArray(),n=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<n.length-2;++i)if(s=ce(t[i],n[i]),s)return s;return s=ce(t.length,n.length),s||(s=ce(t[t.length-2],n[n.length-2]),s||ce(t[t.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jO{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $y{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(n=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(n!==null&&ha(n.mutation,s,Mt.empty(),we.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.getLocalViewOfDocuments(e,n,le()).next((()=>n))))}getLocalViewOfDocuments(e,t,n=le()){const s=rn();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,n).next((i=>{let o=Es();return i.forEach(((a,c)=>{o=o.insert(a,c.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const n=rn();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,le())))}populateOverlays(e,t,n){const s=[];return n.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,a)=>{t.set(o,a)}))}))}computeViews(e,t,n,s){let i=nt();const o=fa(),a=(function(){return fa()})();return t.forEach(((c,l)=>{const B=n.get(l.key);s.has(l.key)&&(B===void 0||B.mutation instanceof pr)?i=i.insert(l.key,l):B!==void 0?(o.set(l.key,B.mutation.getFieldMask()),ha(B.mutation,l,B.mutation.getFieldMask(),we.now())):o.set(l.key,Mt.empty())})),this.recalculateAndSaveOverlays(e,i).next((c=>(c.forEach(((l,B)=>o.set(l,B))),t.forEach(((l,B)=>a.set(l,new jO(B,o.get(l)??null)))),a)))}recalculateAndSaveOverlays(e,t){const n=fa();let s=new Fe(((o,a)=>o-a)),i=le();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const a of o)a.keys().forEach((c=>{const l=t.get(c);if(l===null)return;let B=n.get(c)||Mt.empty();B=a.applyToLocalView(l,B),n.set(c,B);const h=(s.get(a.batchId)||le()).add(c);s=s.insert(a.batchId,h)}))})).next((()=>{const o=[],a=s.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),l=c.key,B=c.value,h=AI();B.forEach((p=>{if(!i.has(p)){const C=aI(t.get(p),n.get(p));C!==null&&h.set(p,C),i=i.add(p)}})),o.push(this.documentOverlayCache.saveOverlays(e,l,h))}return P.waitFor(o)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.recalculateAndSaveOverlays(e,n)))}getDocumentsMatchingQuery(e,t,n,s){return Je(t)?this.getDocumentsMatchingPipeline(e,t,n,s):yP(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Fd(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):P.resolve(rn());let a=Ji,c=i;return o.next((l=>P.forEach(l,((B,h)=>(a<h.largestBatchId&&(a=h.largestBatchId),i.get(B)?P.resolve():this.remoteDocumentCache.getEntry(e,B).next((p=>{c=c.insert(B,p)}))))).next((()=>this.populateOverlays(e,l,i))).next((()=>this.computeViews(e,c,l,le()))).next((B=>({batchId:a,changes:TI(B)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new z(t)).next((n=>{let s=Es();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){const i=t.collectionGroup;let o=Es();return this.indexManager.getCollectionParents(e,i).next((a=>P.forEach(a,(c=>{const l=(function(h,p){return new Cr(p,null,h.explicitOrderBy.slice(),h.filters.slice(),h.limit,h.limitType,h.startAt,h.endAt)})(t,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,l,n,s).next((B=>{B.forEach(((h,p)=>{o=o.insert(h,p)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s)))).next((o=>this.retrieveMatchingLocalDocuments(i,o,(a=>ml(t,a)))))}getDocumentsMatchingPipeline(e,t,n,s){if(nr(t)==="collection_group"){const i=nf(t);let o=Es();return this.indexManager.getCollectionParents(e,i).next((a=>P.forEach(a,(c=>{const l=(function(h,p){const C=h.stages.map((m=>m instanceof lc?new uc(p.canonicalString(),{}):m));return new Tt(h.serializer,C)})(t,c.child(i));return this.getDocumentsMatchingPipeline(e,l,n,s).next((B=>{B.forEach(((h,p)=>{o=o.insert(h,p)}))}))})).next((()=>o))))}{let i;return this.getOverlaysForPipeline(e,t,n.largestBatchId).next((o=>{switch(i=o,nr(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s);case"documents":let a=le();for(const c of Ou(t))a=a.add(z.fromPath(c));return this.remoteDocumentCache.getEntries(e,a);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new k("invalid-argument",`Invalid pipeline source to execute offline: ${rr(t)}`)}})).next((o=>this.retrieveMatchingLocalDocuments(i,o,(a=>Hl(t,a)))))}}retrieveMatchingLocalDocuments(e,t,n){e.forEach(((i,o)=>{const a=o.getKey();t.get(a)===null&&(t=t.insert(a,Me.newInvalidDocument(a)))}));let s=Es();return t.forEach(((i,o)=>{const a=e.get(i);a!==void 0&&ha(a.mutation,o,Mt.empty(),we.now()),n(o)&&(s=s.insert(i,o))})),s}getOverlaysForPipeline(e,t,n){switch(nr(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,Be.fromString(hc(t)),n);case"collection_group":throw new k("invalid-argument",`Unexpected collection group pipeline: ${rr(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,Ou(t).map((s=>z.fromPath(s))));case"database":return this.documentOverlayCache.getAllOverlays(e,n);default:throw new k("invalid-argument",`Failed to get overlays for pipeline: ${rr(t)}`)}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JO{constructor(e){this.serializer=e,this.co=new Map,this.lo=new Map}getBundleMetadata(e,t){return P.resolve(this.co.get(t))}saveBundleMetadata(e,t){return this.co.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Xe(s.createTime)}})(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.lo.get(t))}saveNamedQuery(e,t){return this.lo.set(t.name,(function(s){return{name:s.name,query:Ml(s.bundledQuery),readTime:Xe(s.readTime)}})(t)),P.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KO{constructor(){this.overlays=new Fe(z.comparator),this.Eo=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){const n=rn();return P.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}getAllOverlays(e,t){const n=rn();return this.overlays.forEach(((s,i)=>{i.largestBatchId>t&&n.set(s,i)})),P.resolve(n)}saveOverlays(e,t,n){return n.forEach(((s,i)=>{this.Es(e,t,i)})),P.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.Eo.get(n);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Eo.delete(n)),P.resolve()}getOverlaysForCollection(e,t,n){const s=rn(),i=t.length+1,o=new z(t.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const c=a.getNext().value,l=c.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===i&&c.largestBatchId>n&&s.set(c.getKey(),c)}return P.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new Fe(((l,B)=>l-B));const o=this.overlays.getIterator();for(;o.hasNext();){const l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>n){let B=i.get(l.largestBatchId);B===null&&(B=rn(),i=i.insert(l.largestBatchId,B)),B.set(l.getKey(),l)}}const a=rn(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((l,B)=>a.set(l,B))),!(a.size()>=s)););return P.resolve(a)}Es(e,t,n){const s=this.overlays.get(n.key);if(s!==null){const o=this.Eo.get(s.largestBatchId).delete(n.key);this.Eo.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new gf(t,n));let i=this.Eo.get(t);i===void 0&&(i=le(),this.Eo.set(t,i)),this.Eo.set(t,i.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zO{constructor(){this.sessionToken=Re.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef{constructor(){this.ho=new ve(ht.To),this.Po=new ve(ht.Io)}isEmpty(){return this.ho.isEmpty()}addReference(e,t){const n=new ht(e,t);this.ho=this.ho.add(n),this.Po=this.Po.add(n)}Ro(e,t){e.forEach((n=>this.addReference(n,t)))}removeReference(e,t){this.Ao(new ht(e,t))}Vo(e,t){e.forEach((n=>this.removeReference(n,t)))}fo(e){const t=new z(new Be([])),n=new ht(t,e),s=new ht(t,e+1),i=[];return this.Po.forEachInRange([n,s],(o=>{this.Ao(o),i.push(o.key)})),i}mo(){this.ho.forEach((e=>this.Ao(e)))}Ao(e){this.ho=this.ho.delete(e),this.Po=this.Po.delete(e)}po(e){const t=new z(new Be([])),n=new ht(t,e),s=new ht(t,e+1);let i=le();return this.Po.forEachInRange([n,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new ht(e,0),n=this.ho.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class ht{constructor(e,t){this.key=e,this.yo=t}static To(e,t){return z.comparator(e.key,t.key)||ce(e.yo,t.yo)}static Io(e,t){return ce(e.yo,t.yo)||z.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WO{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.rs=1,this.wo=new ve(ht.To)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,s){const i=this.rs;this.rs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Bf(i,t,n,s);this.mutationQueue.push(o);for(const a of s)this.wo=this.wo.add(new ht(a.key,i)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return P.resolve(o)}lookupMutationBatch(e,t){return P.resolve(this.bo(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.So(n),i=s<0?0:s;return P.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?Mr:this.rs-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new ht(t,0),s=new ht(t,Number.POSITIVE_INFINITY),i=[];return this.wo.forEachInRange([n,s],(o=>{const a=this.bo(o.yo);i.push(a)})),P.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new ve(ce);return t.forEach((s=>{const i=new ht(s,0),o=new ht(s,Number.POSITIVE_INFINITY);this.wo.forEachInRange([i,o],(a=>{n=n.add(a.yo)}))})),P.resolve(this.xo(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let i=n;z.isDocumentKey(i)||(i=i.child(""));const o=new ht(new z(i),0);let a=new ve(ce);return this.wo.forEachWhile((c=>{const l=c.key.path;return!!n.isPrefixOf(l)&&(l.length===s&&(a=a.add(c.yo)),!0)}),o),P.resolve(this.xo(a))}xo(e){const t=[];return e.forEach((n=>{const s=this.bo(n);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){j(this.vo(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.wo;return P.forEach(t.mutations,(s=>{const i=new ht(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.wo=n}))}us(e){}containsKey(e,t){const n=new ht(t,0),s=this.wo.firstAfterOrEqual(n);return P.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}vo(e,t){return this.So(e)}So(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}bo(e){const t=this.So(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $O{constructor(e){this.Do=e,this.docs=(function(){return new Fe(z.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),i=s?s.size:0,o=this.Do(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return P.resolve(n?n.document.mutableCopy():Me.newInvalidDocument(t))}getEntries(e,t){let n=nt();return t.forEach((s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():Me.newInvalidDocument(s))})),P.resolve(n)}getAllEntries(e){let t=nt();return this.docs.forEach(((n,s)=>{t=t.insert(n,s.document)})),P.resolve(t)}getDocumentsMatchingQuery(e,t,n,s){let i,o;Je(t)?(i=Be.fromString(hc(t)),o=B=>Hl(t,B)):(i=t.path,o=B=>ml(t,B));let a=nt();const c=new z(i.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:B,value:{document:h}}=l.getNext();if(!i.isPrefixOf(B.path))break;B.path.length>i.length+1||Sd(gI(h),n)<=0||(s.has(h.key)||o(h))&&(a=a.insert(h.key,h.mutableCopy()))}return P.resolve(a)}getAllFromCollectionGroup(e,t,n,s){Z(9500)}Co(e,t){return P.forEach(this.docs,(n=>t(n)))}newChangeBuffer(e){return new QO(this)}getSize(e){return P.resolve(this.size)}}class QO extends zy{constructor(e){super(),this.ao=e}applyChanges(e){const t=[];return this.changes.forEach(((n,s)=>{s.isValidDocument()?t.push(this.ao.addEntry(e,s)):this.ao.removeEntry(n)})),P.waitFor(t)}getFromCache(e,t){return this.ao.getEntry(e,t)}getAllFromCache(e,t){return this.ao.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YO{constructor(e){this.persistence=e,this.Fo=new gr((t=>xl(t)),lf),this.lastRemoteSnapshotVersion=re.min(),this.highestTargetId=0,this.Oo=0,this.Mo=new Ef,this.targetCount=0,this.No=hr.W_()}forEachTarget(e,t){return this.Fo.forEach(((n,s)=>t(s))),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.Oo)}allocateTargetId(e){return this.highestTargetId=this.No.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Oo&&(this.Oo=t),P.resolve()}H_(e){this.Fo.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.No=new hr(t),this.highestTargetId=t),e.sequenceNumber>this.Oo&&(this.Oo=e.sequenceNumber)}addTargetData(e,t){return this.H_(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.H_(t),P.resolve()}removeTargetData(e,t){return this.Fo.delete(t.target),this.Mo.fo(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,n){let s=0;const i=[];return this.Fo.forEach(((o,a)=>{a.sequenceNumber<=t&&n.get(a.targetId)===null&&(this.Fo.delete(o),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),s++)})),P.waitFor(i).next((()=>s))}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){const n=this.Fo.get(t)||null;return P.resolve(n)}addMatchingKeys(e,t,n){return this.Mo.Ro(t,n),P.resolve()}removeMatchingKeys(e,t,n){this.Mo.Vo(t,n);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),P.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Mo.fo(t),P.resolve()}getMatchingKeysForTargetId(e,t){const n=this.Mo.po(t);return P.resolve(n)}containsKey(e,t){return P.resolve(this.Mo.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class If{constructor(e,t){this.Bo={},this.overlays={},this.Lo=new Gt(0),this.$o=!1,this.$o=!0,this.Uo=new zO,this.referenceDelegate=e(this),this.ko=new YO(this),this.indexManager=new VO,this.remoteDocumentCache=(function(s){return new $O(s)})((n=>this.referenceDelegate.Qo(n))),this.serializer=new My(t),this.qo=new JO(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.$o=!1,Promise.resolve()}get started(){return this.$o}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new KO,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.Bo[e.toKey()];return n||(n=new WO(t,this.referenceDelegate),this.Bo[e.toKey()]=n),n}getGlobalsCache(){return this.Uo}getTargetCache(){return this.ko}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.qo}runTransaction(e,t,n){U("MemoryPersistence","Starting transaction:",e);const s=new XO(this.Lo.next());return this.referenceDelegate.Ko(),n(s).next((i=>this.referenceDelegate.Wo(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Go(e,t){return P.or(Object.values(this.Bo).map((n=>()=>n.containsKey(e,t))))}}class XO extends $I{constructor(e){super(),this.currentSequenceNumber=e}}class ql{constructor(e){this.persistence=e,this.jo=new Ef,this.zo=null}static Ho(e){return new ql(e)}get Jo(){if(this.zo)return this.zo;throw Z(60996)}addReference(e,t,n){return this.jo.addReference(n,t),this.Jo.delete(n.toString()),P.resolve()}removeReference(e,t,n){return this.jo.removeReference(n,t),this.Jo.add(n.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.Jo.add(t.toString()),P.resolve()}removeTarget(e,t){this.jo.fo(t.targetId).forEach((s=>this.Jo.add(s.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.Jo.add(i.toString())))})).next((()=>n.removeTargetData(e,t)))}Ko(){this.zo=new Set}Wo(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.Jo,(n=>{const s=z.fromPath(n);return this.Yo(e,s).next((i=>{i||t.removeEntry(s,re.min())}))})).next((()=>(this.zo=null,t.apply(e))))}updateLimboDocument(e,t){return this.Yo(e,t).next((n=>{n?this.Jo.delete(t.toString()):this.Jo.add(t.toString())}))}Qo(e){return 0}Yo(e,t){return P.or([()=>P.resolve(this.jo.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Go(e,t)])}}class Hu{constructor(e,t){this.persistence=e,this.Zo=new gr((n=>bt(n.path)),((n,s)=>n.isEqual(s))),this.garbageCollector=ZI(this,t)}static Ho(e,t){return new Hu(e,t)}Ko(){}Wo(e){return P.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Pi(e){const t=this.Y_(e);return this.persistence.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}Y_(e){let t=0;return this.Ii(e,(n=>{t++})).next((()=>t))}Ii(e,t){return P.forEach(this.Zo,((n,s)=>this.X_(e,n,s).next((i=>i?P.resolve():t(s)))))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.Co(e,(o=>this.X_(e,o,t).next((a=>{a||(n++,i.removeEntry(o,re.min()))})))).next((()=>i.apply(e))).next((()=>n))}markPotentiallyOrphaned(e,t){return this.Zo.set(t,e.currentSequenceNumber),P.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.Zo.set(n,e.currentSequenceNumber),P.resolve()}removeReference(e,t,n){return this.Zo.set(n,e.currentSequenceNumber),P.resolve()}updateLimboDocument(e,t){return this.Zo.set(t,e.currentSequenceNumber),P.resolve()}Qo(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=bu(e.data.value)),t}X_(e,t,n){return P.or([()=>this.persistence.Go(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.Zo.get(t);return P.resolve(s!==void 0&&s>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZO{constructor(e){this.serializer=e}jr(e,t,n,s){const i=new Al("createOrUpgrade",t);n<1&&s>=1&&((function(c){c.createObjectStore(fc)})(e),(function(c){c.createObjectStore(Ka,{keyPath:rO}),c.createObjectStore(ln,{keyPath:Qg,autoIncrement:!0}).createIndex(vs,Yg,{unique:!0}),c.createObjectStore($i)})(e),pm(e),(function(c){c.createObjectStore(_s)})(e));let o=P.resolve();return n<3&&s>=3&&(n!==0&&((function(c){c.deleteObjectStore(Yi),c.deleteObjectStore(Qi),c.deleteObjectStore(Vs)})(e),pm(e)),o=o.next((()=>(function(c){const l=c.store(Vs),B={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:re.min().toTimestamp(),targetCount:0};return l.put(Vu,B)})(i)))),n<4&&s>=4&&(n!==0&&(o=o.next((()=>(function(c,l){return l.store(ln).ti().next((h=>{c.deleteObjectStore(ln),c.createObjectStore(ln,{keyPath:Qg,autoIncrement:!0}).createIndex(vs,Yg,{unique:!0});const p=l.store(ln),C=h.map((m=>p.put(m)));return P.waitFor(C)}))})(e,i)))),o=o.next((()=>{(function(c){c.createObjectStore(Xi,{keyPath:hO})})(e)}))),n<5&&s>=5&&(o=o.next((()=>this.Xo(i)))),n<6&&s>=6&&(o=o.next((()=>((function(c){c.createObjectStore(za)})(e),this.ea(i))))),n<7&&s>=7&&(o=o.next((()=>this.ta(i)))),n<8&&s>=8&&(o=o.next((()=>this.na(e,i)))),n<9&&s>=9&&(o=o.next((()=>{(function(c){c.objectStoreNames.contains("remoteDocumentChanges")&&c.deleteObjectStore("remoteDocumentChanges")})(e)}))),n<10&&s>=10&&(o=o.next((()=>this.ra(i)))),n<11&&s>=11&&(o=o.next((()=>{(function(c){c.createObjectStore(Ll,{keyPath:dO})})(e),(function(c){c.createObjectStore(Vl,{keyPath:fO})})(e)}))),n<12&&s>=12&&(o=o.next((()=>{(function(c){const l=c.createObjectStore(kl,{keyPath:IO});l.createIndex(vh,yO,{unique:!1}),l.createIndex(Oy,wO,{unique:!1})})(e)}))),n<13&&s>=13&&(o=o.next((()=>(function(c){const l=c.createObjectStore(Lu,{keyPath:iO});l.createIndex(fu,oO),l.createIndex(Ry,aO)})(e))).next((()=>this.ia(e,i))).next((()=>e.deleteObjectStore(_s)))),n<14&&s>=14&&(o=o.next((()=>this.sa(e,i)))),n<15&&s>=15&&(o=o.next((()=>(function(c){c.createObjectStore(ff,{keyPath:pO,autoIncrement:!0}).createIndex(bh,CO,{unique:!1}),c.createObjectStore(_a,{keyPath:gO}).createIndex(Sy,mO,{unique:!1}),c.createObjectStore(Ea,{keyPath:_O}).createIndex(Ny,EO,{unique:!1})})(e)))),n<16&&s>=16&&(o=o.next((()=>{t.objectStore(_a).clear()})).next((()=>{t.objectStore(Ea).clear()}))),n<17&&s>=17&&(o=o.next((()=>{(function(c){c.createObjectStore(pf,{keyPath:DO})})(e)}))),n<18&&s>=18&&Ym()&&(o=o.next((()=>{t.objectStore(_a).clear()})).next((()=>{t.objectStore(Ea).clear()}))),o}ea(e){let t=0;return e.store(_s)._i(((n,s)=>{t+=ku(s)})).next((()=>{const n={byteSize:t};return e.store(za).put(Ah,n)}))}Xo(e){const t=e.store(Ka),n=e.store(ln);return t.ti().next((s=>P.forEach(s,(i=>{const o=IDBKeyRange.bound([i.userId,Mr],[i.userId,i.lastAcknowledgedBatchId]);return n.ti(vs,o).next((a=>P.forEach(a,(c=>{j(c.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:c.batchId});const l=ys(this.serializer,c);return ky(e,i.userId,l).next((()=>{}))}))))}))))}ta(e){const t=e.store(Yi),n=e.store(_s);return e.store(Vs).get(Vu).next((s=>{const i=[];return n._i(((o,a)=>{const c=new Be(o),l=(function(h){return[0,bt(h)]})(c);i.push(t.get(l).next((B=>B?P.resolve():(h=>t.put({targetId:0,path:bt(h),sequenceNumber:s.highestListenSequenceNumber}))(c))))})).next((()=>P.waitFor(i)))}))}na(e,t){e.createObjectStore(Wa,{keyPath:BO});const n=t.store(Wa),s=new _f,i=o=>{if(s.add(o)){const a=o.lastSegment(),c=o.popLast();return n.put({collectionId:a,parent:bt(c)})}};return t.store(_s)._i({si:!0},((o,a)=>{const c=new Be(o);return i(c.popLast())})).next((()=>t.store($i)._i({si:!0},(([o,a,c],l)=>{const B=Nn(a);return i(B.popLast())}))))}ra(e){const t=e.store(Qi);return t._i(((n,s)=>{const i=ia(this.serializer,s),o=Gy(this.serializer,i);return t.put(o)}))}ia(e,t){const n=t.store(_s),s=[];return n._i(((i,o)=>{const a=t.store(Lu),c=(function(h){return h.document?new z(Be.fromString(h.document.name).popFirst(5)):h.noDocument?z.fromSegments(h.noDocument.path):h.unknownDocument?z.fromSegments(h.unknownDocument.path):Z(36783)})(o).path.toArray(),l={prefixPath:c.slice(0,c.length-2),collectionGroup:c[c.length-2],documentId:c[c.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(a.put(l))})).next((()=>P.waitFor(s)))}sa(e,t){const n=t.store(ln),s=Wy(this.serializer),i=new If(ql.Ho,this.serializer.Xi);return n.ti().next((o=>{const a=new Map;return o.forEach((c=>{let l=a.get(c.userId)??le();ys(this.serializer,c).keys().forEach((B=>l=l.add(B))),a.set(c.userId,l)})),P.forEach(a,((c,l)=>{const B=new dt(l),h=Ul.ts(this.serializer,B),p=i.getIndexManager(B),C=Gl.ts(B,this.serializer,p,i.referenceDelegate);return new $y(s,C,h,p).recalculateAndSaveOverlaysForDocumentKeys(new Rh(t,Gt.Br),c).next()}))}))}}function pm(r){r.createObjectStore(Yi,{keyPath:uO}).createIndex(df,lO,{unique:!0}),r.createObjectStore(Qi,{keyPath:"targetId"}).createIndex(Py,cO,{unique:!0}),r.createObjectStore(Vs)}const Rr="IndexedDbPersistence",qB=18e5,jB=5e3,JB="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",Qy="main";class yf{constructor(e,t,n,s,i,o,a,c,l,B,h=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.qn=i,this.window=o,this.document=a,this._a=l,this.oa=B,this.aa=h,this.Lo=null,this.$o=!1,this.isPrimary=!1,this.networkEnabled=!0,this.ua=null,this.inForeground=!1,this.ca=null,this.la=null,this.Ea=Number.NEGATIVE_INFINITY,this.ha=p=>Promise.resolve(),!yf.cn())throw new k(S.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new GO(this,s),this.Ta=t+Qy,this.serializer=new My(c),this.Pa=new xn(this.Ta,this.aa,new ZO(this.serializer)),this.Uo=new SO,this.ko=new MO(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Wy(this.serializer),this.qo=new PO,this.window&&this.window.localStorage?this.Ia=this.window.localStorage:(this.Ia=null,B===!1&&$e(Rr,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Ra().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new k(S.FAILED_PRECONDITION,JB);return this.Aa(),this.Va(),this.da(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.ko.getHighestSequenceNumber(e)))})).then((e=>{this.Lo=new Gt(e,this._a)})).then((()=>{this.$o=!0})).catch((e=>(this.Pa&&this.Pa.close(),Promise.reject(e))))}fa(e){return this.ha=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Pa.Hr((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.qn.enqueueAndForget((async()=>{this.started&&await this.Ra()})))}Ra(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>Xc(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.ma(e).next((t=>{t||(this.isPrimary=!1,this.qn.enqueueRetryable((()=>this.ha(!1))))}))})).next((()=>this.pa(e))).next((t=>this.isPrimary&&!t?this.ga(e).next((()=>!1)):!!t&&this.ya(e).next((()=>!0)))))).catch((e=>{if(ss(e))return U(Rr,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return U(Rr,"Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.qn.enqueueRetryable((()=>this.ha(e))),this.isPrimary=e}))}ma(e){return Yo(e).get(di).next((t=>P.resolve(this.wa(t))))}ba(e){return Xc(e).delete(this.clientId)}async Sa(){if(this.isPrimary&&!this.xa(this.Ea,qB)){this.Ea=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const n=ut(t,Xi);return n.ti().next((s=>{const i=this.va(s,qB),o=s.filter((a=>i.indexOf(a)===-1));return P.forEach(o,(a=>n.delete(a.clientId))).next((()=>o))}))})).catch((()=>[]));if(this.Ia)for(const t of e)this.Ia.removeItem(this.Da(t.clientId))}}da(){this.la=this.qn.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.Ra().then((()=>this.Sa())).then((()=>this.da()))))}wa(e){return!!e&&e.ownerId===this.clientId}pa(e){return this.oa?P.resolve(!0):Yo(e).get(di).next((t=>{if(t!==null&&this.xa(t.leaseTimestampMs,jB)&&!this.Ca(t.ownerId)){if(this.wa(t)&&this.networkEnabled)return!0;if(!this.wa(t)){if(!t.allowTabSynchronization)throw new k(S.FAILED_PRECONDITION,JB);return!1}}return!(!this.networkEnabled||!this.inForeground)||Xc(e).ti().next((n=>this.va(n,jB).find((s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,a=this.networkEnabled===s.networkEnabled;if(i||o&&a)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&U(Rr,`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.$o=!1,this.Fa(),this.la&&(this.la.cancel(),this.la=null),this.Oa(),this.Ma(),await this.Pa.runTransaction("shutdown","readwrite",[fc,Xi],(e=>{const t=new Rh(e,Gt.Br);return this.ga(t).next((()=>this.ba(t)))})),this.Pa.close(),this.Na()}va(e,t){return e.filter((n=>this.xa(n.updateTimeMs,t)&&!this.Ca(n.clientId)))}Ba(){return this.runTransaction("getActiveClients","readonly",(e=>Xc(e).ti().next((t=>this.va(t,qB).map((n=>n.clientId))))))}get started(){return this.$o}getGlobalsCache(){return this.Uo}getMutationQueue(e,t){return Gl.ts(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.ko}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new kO(e,this.serializer.Xi.databaseId)}getDocumentOverlayCache(e){return Ul.ts(this.serializer,e)}getBundleCache(){return this.qo}runTransaction(e,t,n){U(Rr,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=(function(c){return c===18?bO:c===17?Vy:c===16?AO:c===15?Cf:c===14?Ly:c===13?xy:c===12?TO:c===11?Fy:void Z(60245)})(this.aa);let o;return this.Pa.runTransaction(e,s,i,(a=>(o=new Rh(a,this.Lo?this.Lo.next():Gt.Br),t==="readwrite-primary"?this.ma(o).next((c=>!!c||this.pa(o))).next((c=>{if(!c)throw $e(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.qn.enqueueRetryable((()=>this.ha(!1))),new k(S.FAILED_PRECONDITION,WI);return n(o)})).next((c=>this.ya(o).next((()=>c)))):this.La(o).next((()=>n(o)))))).then((a=>(o.raiseOnCommittedEvent(),a)))}La(e){return Yo(e).get(di).next((t=>{if(t!==null&&this.xa(t.leaseTimestampMs,jB)&&!this.Ca(t.ownerId)&&!this.wa(t)&&!(this.oa||this.allowTabSynchronization&&t.allowTabSynchronization))throw new k(S.FAILED_PRECONDITION,JB)}))}ya(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Yo(e).put(di,t)}static cn(){return xn.cn()}ga(e){const t=Yo(e);return t.get(di).next((n=>this.wa(n)?(U(Rr,"Releasing primary lease."),t.delete(di)):P.resolve()))}xa(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||($e(`Detected an update time that is in the future: ${e} > ${n}`),!1))}Aa(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.ca=()=>{this.qn.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.Ra())))},this.document.addEventListener("visibilitychange",this.ca),this.inForeground=this.document.visibilityState==="visible")}Oa(){this.ca&&(this.document.removeEventListener("visibilitychange",this.ca),this.ca=null)}Va(){var e;typeof((e=this.window)==null?void 0:e.addEventListener)=="function"&&(this.ua=()=>{this.Fa();const t=/(?:Version|Mobile)\/1[456]/;Qm()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.qn.enterRestrictedMode(!0),this.qn.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.ua))}Ma(){this.ua&&(this.window.removeEventListener("pagehide",this.ua),this.ua=null)}Ca(e){var t;try{const n=((t=this.Ia)==null?void 0:t.getItem(this.Da(e)))!==null;return U(Rr,`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return $e(Rr,"Failed to get zombied client id.",n),!1}}Fa(){if(this.Ia)try{this.Ia.setItem(this.Da(this.clientId),String(Date.now()))}catch(e){$e("Failed to set zombie client id.",e)}}Na(){if(this.Ia)try{this.Ia.removeItem(this.Da(this.clientId))}catch{}}Da(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Yo(r){return ut(r,fc)}function Xc(r){return ut(r,Xi)}function wf(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.$a=n,this.Ua=s}static ka(e,t){let n=le(),s=le();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Df(e,t.fromCache,n,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eF(r,e){return z.comparator(r.key,e.key)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tF{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yy{constructor(){this.Qa=!1,this.qa=!1,this.Ka=100,this.Wa=(function(){return Qm()?8:QI(ot())>0?6:4})()}initialize(e,t){this.Ga=e,this.indexManager=t,this.Qa=!0}getDocumentsMatchingQuery(e,t,n,s){const i={result:null};return this.ja(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.za(e,t,s,n).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new tF;return this.Ha(e,t,o).next((a=>{if(i.result=a,this.qa)return this.Ja(e,t,o,a.size)}))})).next((()=>i.result))}Ja(e,t,n,s){return Je(t)?P.resolve():n.documentReadCount<this.Ka?(Ei()<=me.DEBUG&&U("QueryEngine","SDK will not create cache indexes for query:",da(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Ka,"documents"),P.resolve()):(Ei()<=me.DEBUG&&U("QueryEngine","Query:",da(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.Wa*s?(Ei()<=me.DEBUG&&U("QueryEngine","The SDK decides to create cache indexes for query:",da(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,At(t))):P.resolve())}ja(e,t){if(Je(t))return P.resolve(null);let n=t;if(Sg(n))return P.resolve(null);let s=At(n);return this.indexManager.getIndexType(e,s).next((i=>i===0?null:(n.limit!==null&&i===1&&(n=Pu(n,null,"F"),s=At(n)),this.indexManager.getDocumentsMatchingTarget(e,s).next((o=>{const a=le(...o);return this.Ga.getDocuments(e,a).next((c=>this.indexManager.getMinOffset(e,s).next((l=>{const B=this.Ya(n,c);return this.Za(n,B,a,l.readTime)?this.ja(e,Pu(n,null,"F")):this.Xa(e,B,n,l)}))))})))))}za(e,t,n,s){return(Je(t)?(function(o){for(const a of o.stages){if(a instanceof $r||a instanceof zg)return!1;if(a instanceof Bc){if(a.condition instanceof fy&&a.condition._expr.name==="exists"&&a.condition._expr.params[0]instanceof ii&&a.condition._expr.params[0].fieldName===Tn)continue;return!1}}return!0})(t):Sg(t))||s.isEqual(re.min())?P.resolve(null):this.Ga.getDocuments(e,n).next((i=>{const o=this.Ya(t,i);return this.Za(t,o,n,s)?P.resolve(null):(Ei()<=me.DEBUG&&U("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Wg(t)),this.Xa(e,o,t,CI(s,Ji)).next((a=>a)))}))}Ya(e,t){let n,s;return Je(e)?(n=new ve(eF),s=i=>Hl(e,i)):(n=new ve(_l(e)),s=i=>ml(e,i)),t.forEach(((i,o)=>{s(o)&&(n=n.add(o))})),n}Za(e,t,n,s){if(Je(e))return(function(a){return a.stages.some((c=>c instanceof $r||c instanceof zg))})(e);if(e.limit===null)return!1;if(n.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ha(e,t,n){return Ei()<=me.DEBUG&&U("QueryEngine","Using full collection scan to execute query:",Wg(t)),this.Ga.getDocumentsMatchingQuery(e,t,Zt.min(),n)}Xa(e,t,n,s){return this.Ga.getDocumentsMatchingQuery(e,n,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tf="LocalStore",nF=3e8;class rF{constructor(e,t,n,s){this.persistence=e,this.eu=t,this.serializer=s,this.tu=new Fe(ce),this.nu=new gr((i=>xl(i)),lf),this.ru=new Map,this.iu=e.getRemoteDocumentCache(),this.ko=e.getTargetCache(),this.qo=e.getBundleCache(),this.su(n)}su(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new $y(this.iu,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.iu.setIndexManager(this.indexManager),this.eu.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.tu)))}}function Xy(r,e,t,n){return new rF(r,e,t,n)}async function Zy(r,e){const t=Q(r);return await t.persistence.runTransaction("Handle user change","readonly",(n=>{let s;return t.mutationQueue.getAllMutationBatches(n).next((i=>(s=i,t.su(e),t.mutationQueue.getAllMutationBatches(n)))).next((i=>{const o=[],a=[];let c=le();for(const l of s){o.push(l.batchId);for(const B of l.mutations)c=c.add(B.key)}for(const l of i){a.push(l.batchId);for(const B of l.mutations)c=c.add(B.key)}return t.localDocuments.getDocuments(n,c).next((l=>({_u:l,removedBatchIds:o,addedBatchIds:a})))}))}))}function sF(r,e){const t=Q(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{const s=e.batch.keys(),i=t.iu.newChangeBuffer({trackRemovals:!0});return(function(a,c,l,B){const h=l.batch,p=h.keys();let C=P.resolve();return p.forEach((m=>{C=C.next((()=>B.getEntry(c,m))).next((D=>{const N=l.docVersions.get(m);j(N!==null,48541),D.version.compareTo(N)<0&&(h.applyToRemoteDocument(D,l),D.isValidDocument()&&(D.setReadTime(l.commitVersion),B.addEntry(D)))}))})),C.next((()=>a.mutationQueue.removeMutationBatch(c,h)))})(t,n,e,i).next((()=>i.apply(n))).next((()=>t.mutationQueue.performConsistencyCheck(n))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(n,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(a){let c=le();for(let l=0;l<a.mutationResults.length;++l)a.mutationResults[l].transformResults.length>0&&(c=c.add(a.batch.mutations[l].key));return c})(e)))).next((()=>t.localDocuments.getDocuments(n,s)))}))}function ew(r){const e=Q(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.ko.getLastRemoteSnapshotVersion(t)))}function iF(r,e){const t=Q(r),n=e.snapshotVersion;let s=t.tu;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.iu.newChangeBuffer({trackRemovals:!0});s=t.tu;const a=[];e.targetChanges.forEach(((B,h)=>{const p=s.get(h);if(!p)return;a.push(t.ko.removeMatchingKeys(i,B.removedDocuments,h).next((()=>t.ko.addMatchingKeys(i,B.addedDocuments,h))));let C=p.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(h)!==null?C=C.withResumeToken(Re.EMPTY_BYTE_STRING,re.min()).withLastLimboFreeSnapshotVersion(re.min()):B.resumeToken.approximateByteSize()>0&&(C=C.withResumeToken(B.resumeToken,n)),s=s.insert(h,C),(function(D,N,G){return D.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=nF?!0:G.addedDocuments.size+G.modifiedDocuments.size+G.removedDocuments.size>0})(p,C,B)&&a.push(t.ko.updateTargetData(i,C))}));let c=nt(),l=le();if(e.documentUpdates.forEach((B=>{e.resolvedLimboDocuments.has(B)&&a.push(t.persistence.referenceDelegate.updateLimboDocument(i,B))})),a.push(tw(i,o,e.documentUpdates).next((B=>{c=B.ou,l=B.au}))),!n.isEqual(re.min())){const B=t.ko.getLastRemoteSnapshotVersion(i).next((h=>t.ko.setTargetsMetadata(i,i.currentSequenceNumber,n)));a.push(B)}return P.waitFor(a).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,c,l))).next((()=>c))})).then((i=>(t.tu=s,i)))}function tw(r,e,t){let n=le(),s=le();return t.forEach((i=>n=n.add(i))),e.getEntries(r,n).next((i=>{let o=nt();return t.forEach(((a,c)=>{const l=i.get(a);c.isFoundDocument()!==l.isFoundDocument()&&(s=s.add(a)),c.isNoDocument()&&c.version.isEqual(re.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!l.isValidDocument()||c.version.compareTo(l.version)>0||c.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):U(Tf,"Ignoring outdated watch update for ",a,". Current version:",l.version," Watch version:",c.version)})),{ou:o,au:s}}))}function oF(r,e){const t=Q(r);return t.persistence.runTransaction("Get next mutation batch","readonly",(n=>(e===void 0&&(e=Mr),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e))))}function Zi(r,e){const t=Q(r);return t.persistence.runTransaction("Allocate target","readwrite",(n=>{let s;return t.ko.getTargetData(n,e).next((i=>i?(s=i,P.resolve(s)):t.ko.allocateTargetId(n).next((o=>(s=new On(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.ko.addTargetData(n,s).next((()=>s)))))))})).then((n=>{const s=t.tu.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.tu=t.tu.insert(n.targetId,n),t.nu.set(e,n.targetId)),n}))}async function eo(r,e,t){const n=Q(r),s=n.tu.get(e),i=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",i,(o=>n.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!ss(o))throw o;U(Tf,`Failed to update sequence numbers for target ${e}: ${o}`)}n.tu=n.tu.remove(e),n.nu.delete(s.target)}function qu(r,e,t){const n=Q(r);let s=re.min(),i=le();return n.persistence.runTransaction("Execute query","readwrite",(o=>(function(c,l,B){const h=Q(c),p=h.nu.get(B);return p!==void 0?P.resolve(h.tu.get(p)):h.ko.getTargetData(l,B)})(n,o,Je(e)?e:At(e)).next((a=>{if(a)return s=a.lastLimboFreeSnapshotVersion,n.ko.getMatchingKeysForTargetId(o,a.targetId).next((c=>{i=c}))})).next((()=>n.eu.getDocumentsMatchingQuery(o,e,t?s:re.min(),t?i:le()))).next((a=>(rw(n,a),{documents:a,uu:i})))))}function nw(r,e){const t=Q(r),n=Q(t.ko),s=t.tu.get(e);return s?Promise.resolve(s.target??null):t.persistence.runTransaction("Get target data","readonly",(i=>n.Mt(i,e).next((o=>(o==null?void 0:o.target)??null))))}function Fh(r,e){const t=Q(r),n=t.ru.get(e)||re.min();return t.persistence.runTransaction("Get new document changes","readonly",(s=>t.iu.getAllFromCollectionGroup(s,e,CI(n,Ji),Number.MAX_SAFE_INTEGER))).then((s=>(rw(t,s),s)))}function rw(r,e){e.forEach(((t,n)=>{const s=n.key.getCollectionGroup(),i=r.ru.get(s)||re.min();n.readTime.compareTo(i)>0&&r.ru.set(s,n.readTime)}))}async function aF(r,e,t,n){const s=Q(r);let i=le(),o=nt();for(const l of t){const B=e.cu(l.metadata.name);l.document&&(i=i.add(B));const h=e.lu(l);h.setReadTime(e.Eu(l.metadata.readTime)),o=o.insert(B,h)}const a=s.iu.newChangeBuffer({trackRemovals:!0}),c=await Zi(s,(function(B){return At(Co(Be.fromString(`__bundle__/docs/${B}`)))})(n));return s.persistence.runTransaction("Apply bundle documents","readwrite",(l=>tw(l,a,o).next((B=>(a.apply(l),B))).next((B=>s.ko.removeMatchingKeysForTargetId(l,c.targetId).next((()=>s.ko.addMatchingKeys(l,i,c.targetId))).next((()=>s.localDocuments.getLocalViewOfDocuments(l,B.ou,B.au))).next((()=>B.ou))))))}async function cF(r,e,t=le()){const n=await Zi(r,At(Ml(e.bundledQuery))),s=Q(r);return s.persistence.runTransaction("Save named query","readwrite",(i=>{const o=Xe(e.readTime);if(n.snapshotVersion.compareTo(o)>=0)return s.qo.saveNamedQuery(i,e);const a=n.withResumeToken(Re.EMPTY_BYTE_STRING,o);return s.tu=s.tu.insert(a.targetId,a),s.ko.updateTargetData(i,a).next((()=>s.ko.removeMatchingKeysForTargetId(i,n.targetId))).next((()=>s.ko.addMatchingKeys(i,t,n.targetId))).next((()=>s.qo.saveNamedQuery(i,e)))}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sw{constructor(e,t){this.hu=e,this.byteLength=t}Tu(){return"metadata"in this.hu}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cm(r,e=10240){let t=0;return{async read(){if(t<r.byteLength){const n={value:r.slice(t,t+e),done:!1};return t+=e,n}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uF{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.Pu=0,this.Iu=null,this.Ru=!0}Au(){this.Pu===0&&(this.Vu("Unknown"),this.Iu=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.Iu=null,this.du("Backend didn't respond within 10 seconds."),this.Vu("Offline"),Promise.resolve()))))}fu(e){this.state==="Online"?this.Vu("Unknown"):(this.Pu++,this.Pu>=1&&(this.mu(),this.du(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.Vu("Offline")))}set(e){this.mu(),this.Pu=0,e==="Online"&&(this.Ru=!1),this.Vu(e)}Vu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}du(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Ru?($e(t),this.Ru=!1):U("OnlineStateTracker",t)}mu(){this.Iu!==null&&(this.Iu.cancel(),this.Iu=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Un="RemoteStore";class lF{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.pu=[],this.gu=new Map,this.yu=new Map,this.wu=new Map,this.bu=new hr(1e3),this.Su=new hr(1001),this.xu=new Set,this.vu=[],this.Du=i,this.Du.tn((o=>{n.enqueueAndForget((async()=>{os(this)&&(U(Un,"Restarting streams for network reachability change."),await(async function(c){const l=Q(c);l.xu.add(4),await Eo(l),l.Cu.set("Unknown"),l.xu.delete(4),await pc(l)})(this))}))})),this.Cu=new uF(n,s)}}async function pc(r){if(os(r))for(const e of r.vu)await e(!0)}async function Eo(r){for(const e of r.vu)await e(!1)}function xh(r,e){return r.yu.get(e)||void 0}function jl(r,e){const t=Q(r),n=xh(t,e.targetId);if(n!==void 0&&t.gu.has(n))return;const s=(function(a,c){const l=xh(a,c);l!==void 0&&a.wu.delete(l);const B=(function(p,C){return C%2!=0?p.Su.next():p.bu.next()})(a,c);return a.yu.set(c,B),a.wu.set(B,c),B})(t,e.targetId);U(Un,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new On(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.gu.set(s,i),vf(t)?bf(t):yo(t).ur()&&Af(t,i)}function to(r,e){const t=Q(r),n=yo(t),s=xh(t,e);U(Un,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.gu.delete(s),t.yu.delete(e),t.wu.delete(s),n.ur()&&iw(t,s),t.gu.size===0&&(n.ur()?n.Er():os(t)&&t.Cu.set("Unknown"))}function Af(r,e){if(r.Fu.rt(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(re.min())>0){const t=r.wu.get(e.targetId);if(t===void 0)return void U(Un,"SDK target ID not found for remote ID: "+e.targetId);const n=r.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(n)}yo(r).yr(e)}function iw(r,e){r.Fu.rt(e),yo(r).wr(e)}function bf(r){r.Fu=new FP({getRemoteKeysForTarget:e=>{const t=r.wu.get(e);return t!==void 0?r.remoteSyncer.getRemoteKeysForTarget(t):le()},Mt:e=>r.gu.get(e)||null,xt:()=>r.datastore.serializer.databaseId}),yo(r).start(),r.Cu.Au()}function vf(r){return os(r)&&!yo(r).ar()&&r.gu.size>0}function os(r){return Q(r).xu.size===0}function ow(r){r.Fu=void 0}async function BF(r){r.Cu.set("Online")}async function hF(r){r.gu.forEach(((e,t)=>{Af(r,e)}))}async function dF(r,e){ow(r),vf(r)?(r.Cu.fu(e),bf(r)):r.Cu.set("Unknown")}async function fF(r,e,t){if(r.Cu.set("Online"),e instanceof RI&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const a of i.targetIds){if(s.gu.has(a)){const c=s.wu.get(a);c!==void 0&&(await s.remoteSyncer.rejectListen(c,o),s.yu.delete(c),s.wu.delete(a)),s.gu.delete(a)}s.Fu.removeTarget(a)}})(r,e)}catch(n){U(Un,"Failed to remove targets %s: %s ",e.targetIds.join(","),n),await ju(r,n)}else if(e instanceof lu?r.Fu.Tt(e):e instanceof vI?r.Fu.ft(e):r.Fu.Rt(e),!t.isEqual(re.min()))try{const n=await ew(r.localStore);t.compareTo(n)>=0&&await(function(i,o){const a=i.Fu.Dt(o);a.targetChanges.forEach(((l,B)=>{if(l.resumeToken.approximateByteSize()>0){const h=i.gu.get(B);h&&i.gu.set(B,h.withResumeToken(l.resumeToken,o))}})),a.targetMismatches.forEach(((l,B)=>{const h=i.gu.get(l);if(!h)return;i.gu.set(l,h.withResumeToken(Re.EMPTY_BYTE_STRING,h.snapshotVersion)),iw(i,l);const p=new On(h.target,l,B,h.sequenceNumber);Af(i,p)}));const c=(function(B,h){const p=new Map;h.targetChanges.forEach(((m,D)=>{const N=B.wu.get(D);N!==void 0&&p.set(N,m)}));let C=new Fe(ce);return h.targetMismatches.forEach(((m,D)=>{const N=B.wu.get(m);N!==void 0&&(C=C.insert(N,D))})),new go(h.snapshotVersion,p,C,h.documentUpdates,h.augmentedDocumentUpdates,h.resolvedLimboDocuments)})(i,a);return i.remoteSyncer.applyRemoteEvent(c)})(r,t)}catch(n){U(Un,"Failed to raise snapshot:",n),await ju(r,n)}}async function ju(r,e,t){if(!ss(e))throw e;r.xu.add(1),await Eo(r),r.Cu.set("Offline"),t||(t=()=>ew(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{U(Un,"Retrying IndexedDB access"),await t(),r.xu.delete(1),await pc(r)}))}function aw(r,e){return e().catch((t=>ju(r,t,e)))}async function Io(r){const e=Q(r),t=Yr(e);let n=e.pu.length>0?e.pu[e.pu.length-1].batchId:Mr;for(;pF(e);)try{const s=await oF(e.localStore,n);if(s===null){e.pu.length===0&&t.Er();break}n=s.batchId,CF(e,s)}catch(s){await ju(e,s)}cw(e)&&uw(e)}function pF(r){return os(r)&&r.pu.length<10}function CF(r,e){r.pu.push(e);const t=Yr(r);t.ur()&&t.br&&t.Sr(e.mutations)}function cw(r){return os(r)&&!Yr(r).ar()&&r.pu.length>0}function uw(r){Yr(r).start()}async function gF(r){Yr(r).Cr()}async function mF(r){const e=Yr(r);for(const t of r.pu)e.Sr(t.mutations)}async function _F(r,e,t){const n=r.pu.shift(),s=hf.from(n,e,t);await aw(r,(()=>r.remoteSyncer.applySuccessfulWrite(s))),await Io(r)}async function EF(r,e){e&&Yr(r).br&&await(async function(n,s){if((function(o){return yI(o)&&o!==S.ABORTED})(s.code)){const i=n.pu.shift();Yr(n).lr(),await aw(n,(()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Io(n)}})(r,e),cw(r)&&uw(r)}async function gm(r,e){const t=Q(r);t.asyncQueue.verifyOperationInProgress(),U(Un,"RemoteStore received new credentials");const n=os(t);t.xu.add(3),await Eo(t),n&&t.Cu.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.xu.delete(3),await pc(t)}async function Lh(r,e){const t=Q(r);e?(t.xu.delete(2),await pc(t)):e||(t.xu.add(2),await Eo(t),t.Cu.set("Unknown"))}function yo(r){return r.Ou||(r.Ou=(function(t,n,s){const i=Q(t);return i.Or(),new sS(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{pn:BF.bind(null,r),yn:hF.bind(null,r),bn:dF.bind(null,r),gr:fF.bind(null,r)}),r.vu.push((async e=>{e?(r.Ou.lr(),vf(r)?bf(r):r.Cu.set("Unknown")):(await r.Ou.stop(),ow(r))}))),r.Ou}function Yr(r){return r.Mu||(r.Mu=(function(t,n,s){const i=Q(t);return i.Or(),new iS(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{pn:()=>Promise.resolve(),yn:gF.bind(null,r),bn:EF.bind(null,r),vr:mF.bind(null,r),Dr:_F.bind(null,r)}),r.vu.push((async e=>{e?(r.Mu.lr(),await Io(r)):(await r.Mu.stop(),r.pu.length>0&&(U(Un,`Stopping write stream with ${r.pu.length} pending writes`),r.pu=[]))}))),r.Mu}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Nu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Nu(this.observer.error,e):$e("Uncaught Error in snapshot listener:",e.toString()))}Bu(){this.muted=!0}Nu(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rf{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new gt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,i){const o=Date.now()+n,a=new Rf(e,t,o,s,i);return a.start(n),a}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new k(S.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function wo(r,e){if($e("AsyncQueue",`${e}: ${r}`),ss(r))return new k(S.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IF{constructor(e,t){this.Lu=e,this.serializer=t,this.metadata=new gt,this.buffer=new Uint8Array,this.$u=bI(),this.Uu().then((n=>{n&&n.Tu()?this.metadata.resolve(n.hu.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(n==null?void 0:n.hu)}`))}),(n=>this.metadata.reject(n)))}close(){return this.Lu.cancel()}async getMetadata(){return this.metadata.promise}async ku(){return await this.getMetadata(),this.Uu()}async Uu(){const e=await this.Qu();if(e===null)return null;const t=this.$u.decode(e),n=Number(t);isNaN(n)&&this.qu(`length string (${t}) is not valid number`);const s=await this.Ku(n);return new sw(JSON.parse(s),e.length+n)}Wu(){return this.buffer.findIndex((e=>e===123))}async Qu(){for(;this.Wu()<0&&!await this.Gu(););if(this.buffer.length===0)return null;const e=this.Wu();e<0&&this.qu("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Ku(e){for(;this.buffer.length<e;)await this.Gu()&&this.qu("Reached the end of bundle when more is expected.");const t=this.$u.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}qu(e){throw this.Lu.cancel(),new Error(`Invalid bundle format: ${e}`)}async Gu(){const e=await this.Lu.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}class yF{constructor(e,t){this.serializer=t,this.$u=bI(),this.bundleData=Ld().encode(e),this.cursor=0,this.elements=[];let n=this.ku();if(!n||!n.Tu())throw new Error(`The first element of the bundle is not a metadata object, it is
         ${JSON.stringify(n==null?void 0:n.hu)}`);this.metadata=n.hu.metadata;do n=this.ku(),n!==null&&this.elements.push(n);while(n!==null)}getMetadata(){return this.metadata}ju(){return this.elements}ku(){if(this.cursor===this.bundleData.length)return null;const e=this.cursor,t=this.Qu(),n=this.cursor-e,s=this.Ku(t);return new sw(JSON.parse(s),n+t)}Ku(e){if(this.cursor+e>this.bundleData.length)throw new k(S.INTERNAL,"Reached the end of bundle when more is expected.");return this.$u.decode(this.bundleData.subarray(this.cursor,this.cursor+=e))}Qu(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if(this.bundleData[t]===123){if(t===e)throw new Error("First character is a bracket and not a number");const n=this.$u.decode(this.bundleData.subarray(e,t)),s=Number(n);if(!Number.isInteger(s)||s<0)throw new Error(`length string (${n}) is not valid number`);return this.cursor=t,s}t++}throw new Error("Reached the end of bundle when more is expected.")}}const Ia="IndexBackfiller";class wF{constructor(e,t){this.asyncQueue=e,this.zu=t,this.task=null}start(){this.Hu(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}Hu(e){U(Ia,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{const t=await this.zu.Ju();U(Ia,`Documents written: ${t}`)}catch(t){ss(t)?U(Ia,"Ignoring IndexedDB error during index backfill: ",t):await rs(t)}await this.Hu(6e4)}))}}class DF{constructor(e,t){this.localStore=e,this.persistence=t}async Ju(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.Yu(t,e)))}Yu(e,t){const n=new Set;let s=t,i=!0;return P.doWhile((()=>i===!0&&s>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((o=>{if(o!==null&&!n.has(o))return U(Ia,`Processing collection: ${o}`),this.Zu(e,o,s).next((a=>{s-=a,n.add(o)}));i=!1})))).next((()=>t-s))}Zu(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((s=>this.localStore.localDocuments.getNextDocuments(e,t,s,n).next((i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next((()=>this.Xu(s,i))).next((a=>(U(Ia,`Updating offset: ${a}`),this.localStore.indexManager.updateCollectionGroup(e,t,a)))).next((()=>o.size))}))))}Xu(e,t){let n=e;return t.changes.forEach(((s,i)=>{const o=gI(i);Sd(o,n)>0&&(n=o)})),new Zt(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lw="firestore_clients";function mm(r,e){return`${lw}_${r}_${e}`}const Bw="firestore_mutations";function _m(r,e,t){let n=`${Bw}_${r}_${t}`;return e.isAuthenticated()&&(n+=`_${e.uid}`),n}const hw="firestore_targets";function KB(r,e){return`${hw}_${r}_${e}`}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wn="SharedClientState";class Ju{constructor(e,t,n,s){this.user=e,this.batchId=t,this.state=n,this.error=s}static ec(e,t,n){const s=JSON.parse(n);let i,o=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return o&&s.error&&(o=typeof s.error.message=="string"&&typeof s.error.code=="string",o&&(i=new k(s.error.code,s.error.message))),o?new Ju(e,t,s.state,i):($e(wn,`Failed to parse mutation state for ID '${t}': ${n}`),null)}tc(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class ya{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static ec(e,t){const n=JSON.parse(t);let s,i=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return i&&n.error&&(i=typeof n.error.message=="string"&&typeof n.error.code=="string",i&&(s=new k(n.error.code,n.error.message))),i?new ya(e,n.state,s):($e(wn,`Failed to parse target state for ID '${e}': ${t}`),null)}tc(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Ku{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static ec(e,t){const n=JSON.parse(t);let s=typeof n=="object"&&n.activeTargetIds instanceof Array,i=xd();for(let o=0;s&&o<n.activeTargetIds.length;++o)s=jE(n.activeTargetIds[o]),i=i.add(n.activeTargetIds[o]);return s?new Ku(e,i):($e(wn,`Failed to parse client data for instance '${e}': ${t}`),null)}}class Pf{constructor(e,t){this.clientId=e,this.onlineState=t}static ec(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new Pf(t.clientId,t.onlineState):($e(wn,`Failed to parse online state: ${e}`),null)}}class Vh{constructor(){this.activeTargetIds=xd()}nc(e){this.activeTargetIds=this.activeTargetIds.add(e)}rc(e){this.activeTargetIds=this.activeTargetIds.delete(e)}tc(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class zB{constructor(e,t,n,s,i){this.window=e,this.qn=t,this.persistenceKey=n,this.sc=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this._c=this.oc.bind(this),this.ac=new Fe(ce),this.started=!1,this.uc=[];const o=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.cc=mm(this.persistenceKey,this.sc),this.lc=(function(c){return`firestore_sequence_number_${c}`})(this.persistenceKey),this.ac=this.ac.insert(this.sc,new Vh),this.Ec=new RegExp(`^${lw}_${o}_([^_]*)$`),this.hc=new RegExp(`^${Bw}_${o}_(\\d+)(?:_(.*))?$`),this.Tc=new RegExp(`^${hw}_${o}_(\\d+)$`),this.Pc=(function(c){return`firestore_online_state_${c}`})(this.persistenceKey),this.Ic=(function(c){return`firestore_bundle_loaded_v2_${c}`})(this.persistenceKey),this.window.addEventListener("storage",this._c)}static cn(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Ba();for(const n of e){if(n===this.sc)continue;const s=this.getItem(mm(this.persistenceKey,n));if(s){const i=Ku.ec(n,s);i&&(this.ac=this.ac.insert(i.clientId,i))}}this.Rc();const t=this.storage.getItem(this.Pc);if(t){const n=this.Ac(t);n&&this.Vc(n)}for(const n of this.uc)this.oc(n);this.uc=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(e){this.setItem(this.lc,JSON.stringify(e))}getAllActiveQueryTargets(){return this.dc(this.ac)}isActiveQueryTarget(e){let t=!1;return this.ac.forEach(((n,s)=>{s.activeTargetIds.has(e)&&(t=!0)})),t}addPendingMutation(e){this.fc(e,"pending")}updateMutationState(e,t,n){this.fc(e,t,n),this.mc(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const s=this.storage.getItem(KB(this.persistenceKey,e));if(s){const i=ya.ec(e,s);i&&(n=i.state)}}return t&&this.gc.nc(e),this.Rc(),n}removeLocalQueryTarget(e){this.gc.rc(e),this.Rc()}isLocalQueryTarget(e){return this.gc.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(KB(this.persistenceKey,e))}updateQueryState(e,t,n){this.yc(e,t,n)}handleUserChange(e,t,n){t.forEach((s=>{this.mc(s)})),this.currentUser=e,n.forEach((s=>{this.addPendingMutation(s)}))}setOnlineState(e){this.wc(e)}notifyBundleLoaded(e){this.bc(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this._c),this.removeItem(this.cc),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return U(wn,"READ",e,t),t}setItem(e,t){U(wn,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){U(wn,"REMOVE",e),this.storage.removeItem(e)}oc(e){const t=e;if(t.storageArea===this.storage){if(U(wn,"EVENT",t.key,t.newValue),t.key===this.cc)return void $e("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.qn.enqueueRetryable((async()=>{if(this.started){if(t.key!==null){if(this.Ec.test(t.key)){if(t.newValue==null){const n=this.Sc(t.key);return this.xc(n,null)}{const n=this.vc(t.key,t.newValue);if(n)return this.xc(n.clientId,n)}}else if(this.hc.test(t.key)){if(t.newValue!==null){const n=this.Dc(t.key,t.newValue);if(n)return this.Cc(n)}}else if(this.Tc.test(t.key)){if(t.newValue!==null){const n=this.Fc(t.key,t.newValue);if(n)return this.Oc(n)}}else if(t.key===this.Pc){if(t.newValue!==null){const n=this.Ac(t.newValue);if(n)return this.Vc(n)}}else if(t.key===this.lc){const n=(function(i){let o=Gt.Br;if(i!=null)try{const a=JSON.parse(i);j(typeof a=="number",30636,{Mc:i}),o=a}catch(a){$e(wn,"Failed to read sequence number from WebStorage",a)}return o})(t.newValue);n!==Gt.Br&&this.sequenceNumberHandler(n)}else if(t.key===this.Ic){const n=this.Nc(t.newValue);await Promise.all(n.map((s=>this.syncEngine.Bc(s))))}}}else this.uc.push(t)}))}}get gc(){return this.ac.get(this.sc)}Rc(){this.setItem(this.cc,this.gc.tc())}fc(e,t,n){const s=new Ju(this.currentUser,e,t,n),i=_m(this.persistenceKey,this.currentUser,e);this.setItem(i,s.tc())}mc(e){const t=_m(this.persistenceKey,this.currentUser,e);this.removeItem(t)}wc(e){const t={clientId:this.sc,onlineState:e};this.storage.setItem(this.Pc,JSON.stringify(t))}yc(e,t,n){const s=KB(this.persistenceKey,e),i=new ya(e,t,n);this.setItem(s,i.tc())}bc(e){const t=JSON.stringify(Array.from(e));this.setItem(this.Ic,t)}Sc(e){const t=this.Ec.exec(e);return t?t[1]:null}vc(e,t){const n=this.Sc(e);return Ku.ec(n,t)}Dc(e,t){const n=this.hc.exec(e),s=Number(n[1]),i=n[2]!==void 0?n[2]:null;return Ju.ec(new dt(i),s,t)}Fc(e,t){const n=this.Tc.exec(e),s=Number(n[1]);return ya.ec(s,t)}Ac(e){return Pf.ec(e)}Nc(e){return JSON.parse(e)}async Cc(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.Lc(e.batchId,e.state,e.error);U(wn,`Ignoring mutation for non-active user ${e.user.uid}`)}Oc(e){return this.syncEngine.$c(e.targetId,e.state,e.error)}xc(e,t){const n=t?this.ac.insert(e,t):this.ac.remove(e),s=this.dc(this.ac),i=this.dc(n),o=[],a=[];return i.forEach((c=>{s.has(c)||o.push(c)})),s.forEach((c=>{i.has(c)||a.push(c)})),this.syncEngine.Uc(o,a).then((()=>{this.ac=n}))}Vc(e){this.ac.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}dc(e){let t=xd();return e.forEach(((n,s)=>{t=t.unionWith(s.activeTargetIds)})),t}}class dw{constructor(){this.kc=new Vh,this.Qc={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.kc.nc(e),this.Qc[e]||"not-current"}updateQueryState(e,t,n){this.Qc[e]=t}removeLocalQueryTarget(e){this.kc.rc(e)}isLocalQueryTarget(e){return this.kc.activeTargetIds.has(e)}clearQueryState(e){delete this.Qc[e]}getAllActiveQueryTargets(){return this.kc.activeTargetIds}isActiveQueryTarget(e){return this.kc.activeTargetIds.has(e)}start(){return this.kc=new Vh,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fw(){return typeof window<"u"?window:null}function Cu(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{static emptySet(e){return new Ur(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||z.comparator(t.key,n.key):(t,n)=>z.comparator(t.key,n.key),this.keyedMap=Es(),this.sortedSet=new Fe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Ur)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new Ur;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Em{constructor(){this.qc=new Fe(z.comparator)}track(e){const t=e.doc.key,n=this.qc.get(t);n?e.type!==0&&n.type===3?this.qc=this.qc.insert(t,e):e.type===3&&n.type!==1?this.qc=this.qc.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.qc=this.qc.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.qc=this.qc.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.qc=this.qc.remove(t):e.type===1&&n.type===2?this.qc=this.qc.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.qc=this.qc.insert(t,{type:2,doc:e.doc}):Z(63341,{Nt:e,Kc:n}):this.qc=this.qc.insert(t,e)}Wc(){const e=[];return this.qc.inorderTraversal(((t,n)=>{e.push(n)})),e}}class zs{constructor(e,t,n,s,i,o,a,c,l){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=l}static fromInitialDocuments(e,t,n,s,i){const o=[];return t.forEach((a=>{o.push({type:0,doc:a})})),new zs(e,t,Ur.emptySet(t),o,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Fl(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==n[s].type||!t[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TF{constructor(){this.Gc=void 0,this.jc=[]}zc(){return this.jc.some((e=>e.Hc()))}}class AF{constructor(){this.queries=Im(),this.onlineState="Unknown",this.Jc=new Set}terminate(){(function(t,n){const s=Q(t),i=s.queries;s.queries=Im(),i.forEach(((o,a)=>{for(const c of a.jc)c.onError(n)}))})(this,new k(S.ABORTED,"Firestore shutting down"))}}function Im(){return new gr((r=>by(r)),Fl)}async function Sf(r,e){const t=Q(r);let n=3;const s=e.query;let i=t.queries.get(s);i?!i.zc()&&e.Hc()&&(n=2):(i=new TF,n=e.Hc()?0:1);try{switch(n){case 0:i.Gc=await t.onListen(s,!0);break;case 1:i.Gc=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const a=wo(o,`Initialization of query '${Je(e.query)?rr(e.query):da(e.query)}' failed`);return void e.onError(a)}t.queries.set(s,i),i.jc.push(e),e.Yc(t.onlineState),i.Gc&&e.Zc(i.Gc)&&Of(t)}async function Nf(r,e){const t=Q(r),n=e.query;let s=3;const i=t.queries.get(n);if(i){const o=i.jc.indexOf(e);o>=0&&(i.jc.splice(o,1),i.jc.length===0?s=e.Hc()?0:1:!i.zc()&&e.Hc()&&(s=2))}switch(s){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function bF(r,e){const t=Q(r);let n=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const a of o.jc)a.Zc(s)&&(n=!0);o.Gc=s}}n&&Of(t)}function vF(r,e,t){const n=Q(r),s=n.queries.get(e);if(s)for(const i of s.jc)i.onError(t);n.queries.delete(e)}function Of(r){r.Jc.forEach((e=>{e.next()}))}var kh;(function(r){r.Default="default",r.Cache="cache"})(kh||(kh={}));class Ff{constructor(e,t,n){this.query=e,this.Xc=t,this.el=!1,this.tl=null,this.onlineState="Unknown",this.options=n||{}}Zc(e){if(!this.options.includeMetadataChanges){const n=[];for(const s of e.docChanges)s.type!==3&&n.push(s);e=new zs(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.el?this.nl(e)&&(this.Xc.next(e),t=!0):this.rl(e,this.onlineState)&&(this.il(e),t=!0),this.tl=e,t}onError(e){this.Xc.error(e)}Yc(e){this.onlineState=e;let t=!1;return this.tl&&!this.el&&this.rl(this.tl,e)&&(this.il(this.tl),t=!0),t}rl(e,t){if(!e.fromCache||!this.Hc())return!0;const n=t!=="Offline";return(!this.options.waitForSyncWhenOnline||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}nl(e){if(e.docChanges.length>0)return!0;const t=this.tl&&this.tl.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}il(e){e=zs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.el=!0,this.Xc.next(e)}Hc(){return this.options.source!==kh.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ym{constructor(e){this.serializer=e}cu(e){return Fn(this.serializer,e)}lu(e){return e.metadata.exists?El(this.serializer,e.document,!1):Me.newNoDocument(this.cu(e.metadata.name),this.Eu(e.metadata.readTime))}Eu(e){return Xe(e)}}class xf{constructor(e,t){this.sl=e,this.serializer=t,this._l=[],this.ol=[],this.collectionGroups=new Set,this.progress=pw(e)}get queries(){return this._l}get documents(){return this.ol}al(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.hu.namedQuery)this._l.push(e.hu.namedQuery);else if(e.hu.documentMetadata){this.ol.push({metadata:e.hu.documentMetadata}),e.hu.documentMetadata.exists||++t;const n=Be.fromString(e.hu.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else e.hu.document&&(this.ol[this.ol.length-1].document=e.hu.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}ul(e){const t=new Map,n=new ym(this.serializer);for(const s of e)if(s.metadata.queries){const i=n.cu(s.metadata.name);for(const o of s.metadata.queries){const a=(t.get(o)||le()).add(i);t.set(o,a)}}return t}async cl(e){const t=await aF(e,new ym(this.serializer),this.ol,this.sl.id),n=this.ul(this.documents);for(const s of this._l)await cF(e,s,n.get(s.name));return this.progress.taskState="Success",{progress:this.progress,ll:this.collectionGroups,El:t}}}function pw(r){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:r.totalDocuments,totalBytes:r.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cw{constructor(e){this.key=e}}class gw{constructor(e){this.key=e}}class mw{constructor(e,t){this.query=e,this.hl=t,this.Tl=null,this.hasCachedResults=!1,this.current=!1,this.Pl=le(),this.mutatedKeys=le(),this.Il=Je(e)?Uu(e):_l(e),this.Rl=new Ur(this.Il)}get Al(){return this.hl}Vl(e,t){const n=t?t.dl:new Em,s=t?t.Rl:this.Rl;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,a=!1;const[c,l]=this.fl(this.query,s);e.inorderTraversal(((h,p)=>{const C=s.get(h),m=Ky(this.query,p)?p:null,D=!!C&&this.mutatedKeys.has(C.key),N=!!m&&(m.hasLocalMutations||this.mutatedKeys.has(m.key)&&m.hasCommittedMutations);let G=!1;C&&m?C.data.isEqual(m.data)?D!==N&&(n.track({type:3,doc:m}),G=!0):this.ml(C,m)||(n.track({type:2,doc:m}),G=!0,(c&&this.Il(m,c)>0||l&&this.Il(m,l)<0)&&(a=!0)):!C&&m?(n.track({type:0,doc:m}),G=!0):C&&!m&&(n.track({type:1,doc:C}),G=!0,(c||l)&&(a=!0)),G&&(m?(o=o.add(m),i=N?i.add(h):i.delete(h)):(o=o.delete(h),i=i.delete(h)))}));const B=this.pl(this.query);if(B)if(Je(this.query)){const h=[];o.forEach((m=>h.push(m)));const p=Jy(this.query,h);let C=new Ur(Uu(this.query));for(const m of p)C=C.add(m);o.forEach((m=>{C.has(m.key)||(i=i.delete(m.key),n.track({type:1,doc:m}))})),o=C}else{const h=this.gl(this.query);for(;o.size>B;){const p=h==="F"?o.last():o.first();o=o.delete(p.key),i=i.delete(p.key),n.track({type:1,doc:p})}}return{Rl:o,dl:n,Za:a,mutatedKeys:i}}pl(e){var t;return Je(e)?(t=HB(e))==null?void 0:t.limit:e.limit||void 0}gl(e){if(Je(e)){const t=HB(e);return t&&t.limit<0?"L":"F"}return e.limitType}fl(e,t){var n;if(Je(e)){const s=(n=HB(e))==null?void 0:n.limit;return[t.size===s?t.last():null,null]}return[e.limitType==="F"&&t.size===this.pl(this.query)?t.last():null,e.limitType==="L"&&t.size===this.pl(this.query)?t.first():null]}ml(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){const i=this.Rl;this.Rl=e.Rl,this.mutatedKeys=e.mutatedKeys;const o=e.dl.Wc();o.sort(((B,h)=>(function(C,m){const D=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Z(20277,{Nt:N})}};return D(C)-D(m)})(B.type,h.type)||this.Il(B.doc,h.doc))),this.yl(n),s=s??!1;const a=t&&!s?this.wl():[],c=this.Pl.size===0&&this.current&&!s?1:0,l=c!==this.Tl;return this.Tl=c,o.length!==0||l?{snapshot:new zs(this.query,e.Rl,i,o,e.mutatedKeys,c===0,l,!1,!!n&&n.resumeToken.approximateByteSize()>0),bl:a}:{bl:a}}Yc(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Rl:this.Rl,dl:new Em,mutatedKeys:this.mutatedKeys,Za:!1},!1)):{bl:[]}}Sl(e){return!this.hl.has(e)&&!!this.Rl.has(e)&&!this.Rl.get(e).hasLocalMutations}yl(e){e&&(e.addedDocuments.forEach((t=>this.hl=this.hl.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.hl=this.hl.delete(t))),this.current=e.current)}wl(){if(!this.current)return[];const e=this.Pl;this.Pl=le(),this.Rl.forEach((n=>{this.Sl(n.key)&&(this.Pl=this.Pl.add(n.key))}));const t=[];return e.forEach((n=>{this.Pl.has(n)||t.push(new gw(n))})),this.Pl.forEach((n=>{e.has(n)||t.push(new Cw(n))})),t}xl(e){this.hl=e.uu,this.Pl=le();const t=this.Vl(e.documents);return this.applyChanges(t,!0)}vl(){return zs.fromInitialDocuments(this.query,this.Rl,this.mutatedKeys,this.Tl===0,this.hasCachedResults)}}const as="SyncEngine";class RF{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class PF{constructor(e){this.key=e,this.Dl=!1}}class SF{constructor(e,t,n,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Cl={},this.Fl=new gr((a=>by(a)),Fl),this.Ol=new Map,this.Ml=new Set,this.Nl=new Fe(z.comparator),this.Bl=new Map,this.Ll=new Ef,this.$l={},this.Ul=new Map,this.kl=hr.G_(),this.onlineState="Unknown",this.Ql=void 0}get isPrimaryClient(){return this.Ql===!0}}async function NF(r,e,t=!0){const n=Kl(r);let s;const i=n.Fl.get(e);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.vl()):s=await _w(n,e,t,!0),s}async function OF(r,e){const t=Kl(r);await _w(t,e,!0,!1)}async function _w(r,e,t,n){const s=await Zi(r.localStore,Je(e)?e:At(e)),i=s.targetId,o=r.sharedClientState.addLocalQueryTarget(i,t);let a;return n&&(a=await Lf(r,e,i,o==="current",s.resumeToken)),r.isPrimaryClient&&t&&jl(r.remoteStore,s),a}async function Lf(r,e,t,n,s){r.ql=(h,p,C)=>(async function(D,N,G,J){let te=N.view.Vl(G);te.Za&&(te=await qu(D.localStore,N.query,!1).then((({documents:A})=>N.view.Vl(A,te))));const he=J&&J.targetChanges.get(N.targetId),de=J&&J.targetMismatches.get(N.targetId)!=null,fe=N.view.applyChanges(te,D.isPrimaryClient,he,de);return Mh(D,N.targetId,fe.bl),fe.snapshot})(r,h,p,C);const i=await qu(r.localStore,e,!0),o=new mw(e,i.uu),a=o.Vl(i.documents),c=oc.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",s),l=o.applyChanges(a,r.isPrimaryClient,c);Mh(r,t,l.bl);const B=new RF(e,t,o);return r.Fl.set(e,B),r.Ol.has(t)?r.Ol.get(t).push(e):r.Ol.set(t,[e]),l.snapshot}async function FF(r,e,t){const n=Q(r),s=n.Fl.get(e),i=n.Ol.get(s.targetId);if(i.length>1)return n.Ol.set(s.targetId,i.filter((o=>!Fl(o,e)))),void n.Fl.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await eo(n.localStore,s.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(s.targetId),t&&to(n.remoteStore,s.targetId),no(n,s.targetId)})).catch(rs)):(no(n,s.targetId),await eo(n.localStore,s.targetId,!0))}async function xF(r,e){const t=Q(r),n=t.Fl.get(e),s=t.Ol.get(n.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),to(t.remoteStore,n.targetId))}async function LF(r,e,t){const n=Gf(r);try{const s=await(function(o,a){const c=Q(o),l=we.now(),B=a.reduce(((C,m)=>C.add(m.key)),le());let h,p;return c.persistence.runTransaction("Locally write mutations","readwrite",(C=>{let m=nt(),D=le();return c.iu.getEntries(C,B).next((N=>{m=N,m.forEach(((G,J)=>{J.isValidDocument()||(D=D.add(G))}))})).next((()=>c.localDocuments.getOverlayedDocuments(C,m))).next((N=>{h=N;const G=[];for(const J of a){const te=BP(J,h.get(J.key).overlayedDocument);te!=null&&G.push(new pr(J.key,te,nI(te.value.mapValue),qe.exists(!0)))}return c.mutationQueue.addMutationBatch(C,l,G,a)})).next((N=>{p=N;const G=N.applyToLocalDocumentSet(h,D);return c.documentOverlayCache.saveOverlays(C,N.batchId,G)}))})).then((()=>({batchId:p.batchId,changes:TI(h)})))})(n.localStore,e);n.sharedClientState.addPendingMutation(s.batchId),(function(o,a,c){let l=o.$l[o.currentUser.toKey()];l||(l=new Fe(ce)),l=l.insert(a,c),o.$l[o.currentUser.toKey()]=l})(n,s.batchId,t),await mr(n,s.changes),await Io(n.remoteStore)}catch(s){const i=wo(s,"Failed to persist write");t.reject(i)}}async function Ew(r,e){const t=Q(r);try{const n=await iF(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.Bl.get(i);o&&(j(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.Dl=!0:s.modifiedDocuments.size>0?j(o.Dl,14607):s.removedDocuments.size>0&&(j(o.Dl,42227),o.Dl=!1))})),await mr(t,n,e)}catch(n){await rs(n)}}function wm(r,e,t){const n=Q(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const s=[];n.Fl.forEach(((i,o)=>{const a=o.view.Yc(e);a.snapshot&&s.push(a.snapshot)})),(function(o,a){const c=Q(o);c.onlineState=a;let l=!1;c.queries.forEach(((B,h)=>{for(const p of h.jc)p.Yc(a)&&(l=!0)})),l&&Of(c)})(n.eventManager,e),s.length&&n.Cl.gr(s),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function VF(r,e,t){const n=Q(r);n.sharedClientState.updateQueryState(e,"rejected",t);const s=n.Bl.get(e),i=s&&s.key;if(i){let o=new Fe(z.comparator);o=o.insert(i,Me.newNoDocument(i,re.min()));const a=le().add(i),c=new go(re.min(),new Map,new Fe(ce),o,nt(),a);await Ew(n,c),n.Nl=n.Nl.remove(i),n.Bl.delete(e),Mf(n)}else await eo(n.localStore,e,!1).then((()=>no(n,e,t))).catch(rs)}async function kF(r,e){const t=Q(r),n=e.batch.batchId;try{const s=await sF(t.localStore,e);kf(t,n,null),Vf(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await mr(t,s)}catch(s){await rs(s)}}async function MF(r,e,t){const n=Q(r);try{const s=await(function(o,a){const c=Q(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",(l=>{let B;return c.mutationQueue.lookupMutationBatch(l,a).next((h=>(j(h!==null,37113),B=h.keys(),c.mutationQueue.removeMutationBatch(l,h)))).next((()=>c.mutationQueue.performConsistencyCheck(l))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(l,B,a))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,B))).next((()=>c.localDocuments.getDocuments(l,B)))}))})(n.localStore,e);kf(n,e,t),Vf(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await mr(n,s)}catch(s){await rs(s)}}async function GF(r,e){const t=Q(r);os(t.remoteStore)||U(as,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const n=await(function(o){const a=Q(o);return a.persistence.runTransaction("Get highest unacknowledged batch id","readonly",(c=>a.mutationQueue.getHighestUnacknowledgedBatchId(c)))})(t.localStore);if(n===Mr)return void e.resolve();const s=t.Ul.get(n)||[];s.push(e),t.Ul.set(n,s)}catch(n){const s=wo(n,"Initialization of waitForPendingWrites() operation failed");e.reject(s)}}function Vf(r,e){(r.Ul.get(e)||[]).forEach((t=>{t.resolve()})),r.Ul.delete(e)}function kf(r,e,t){const n=Q(r);let s=n.$l[n.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),n.$l[n.currentUser.toKey()]=s}}function no(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Ol.get(e))r.Fl.delete(n),t&&r.Cl.Kl(n,t);r.Ol.delete(e),r.isPrimaryClient&&r.Ll.fo(e).forEach((n=>{r.Ll.containsKey(n)||Iw(r,n)}))}function Iw(r,e){r.Ml.delete(e.path.canonicalString());const t=r.Nl.get(e);t!==null&&(to(r.remoteStore,t),r.Nl=r.Nl.remove(e),r.Bl.delete(t),Mf(r))}function Mh(r,e,t){for(const n of t)n instanceof Cw?(r.Ll.addReference(n.key,e),UF(r,n)):n instanceof gw?(U(as,"Document no longer in limbo: "+n.key),r.Ll.removeReference(n.key,e),r.Ll.containsKey(n.key)||Iw(r,n.key)):Z(19791,{Wl:n})}function UF(r,e){const t=e.key,n=t.path.canonicalString();r.Nl.get(t)||r.Ml.has(n)||(U(as,"New document in limbo: "+t),r.Ml.add(n),Mf(r))}function Mf(r){for(;r.Ml.size>0&&r.Nl.size<r.maxConcurrentLimboResolutions;){const e=r.Ml.values().next().value;r.Ml.delete(e);const t=new z(Be.fromString(e)),n=r.kl.next();r.Bl.set(n,new PF(t)),r.Nl=r.Nl.insert(t,n),jl(r.remoteStore,new On(At(Co(t.path)),n,"TargetPurposeLimboResolution",Gt.Br))}}async function mr(r,e,t){const n=Q(r),s=[],i=[],o=[];n.Fl.isEmpty()||(n.Fl.forEach(((a,c)=>{o.push(n.ql(c,e,t).then((l=>{var B;if((l||t)&&n.isPrimaryClient){const h=l?!l.fromCache:(B=t==null?void 0:t.targetChanges.get(c.targetId))==null?void 0:B.current;n.sharedClientState.updateQueryState(c.targetId,h?"current":"not-current")}if(l){s.push(l);const h=Df.ka(c.targetId,l);i.push(h)}})))})),await Promise.all(o),n.Cl.gr(s),await(async function(c,l){const B=Q(c);try{await B.persistence.runTransaction("notifyLocalViewChanges","readwrite",(h=>P.forEach(l,(p=>P.forEach(p.$a,(C=>B.persistence.referenceDelegate.addReference(h,p.targetId,C))).next((()=>P.forEach(p.Ua,(C=>B.persistence.referenceDelegate.removeReference(h,p.targetId,C)))))))))}catch(h){if(!ss(h))throw h;U(Tf,"Failed to update sequence numbers: "+h)}for(const h of l){const p=h.targetId;if(!h.fromCache){const C=B.tu.get(p),m=C.snapshotVersion,D=C.withLastLimboFreeSnapshotVersion(m);B.tu=B.tu.insert(p,D)}}})(n.localStore,i))}async function HF(r,e){const t=Q(r);if(!t.currentUser.isEqual(e)){U(as,"User change. New user:",e.toKey());const n=await Zy(t.localStore,e);t.currentUser=e,(function(i,o){i.Ul.forEach((a=>{a.forEach((c=>{c.reject(new k(S.CANCELLED,o))}))})),i.Ul.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await mr(t,n._u)}}function qF(r,e){const t=Q(r),n=t.Bl.get(e);if(n&&n.Dl)return le().add(n.key);{let s=le();const i=t.Ol.get(e);if(!i)return s;for(const o of i??[]){const a=t.Fl.get(o);s=s.unionWith(a.view.Al)}return s}}async function jF(r,e){const t=Q(r),n=await qu(t.localStore,e.query,!0),s=e.view.xl(n);return t.isPrimaryClient&&Mh(t,e.targetId,s.bl),s}async function JF(r,e){const t=Q(r);return Fh(t.localStore,e).then((n=>mr(t,n)))}async function KF(r,e,t,n){const s=Q(r),i=await(function(a,c){const l=Q(a),B=Q(l.mutationQueue);return l.persistence.runTransaction("Lookup mutation documents","readonly",(h=>B.ns(h,c).next((p=>p?l.localDocuments.getDocuments(h,p):P.resolve(null)))))})(s.localStore,e);i!==null?(t==="pending"?await Io(s.remoteStore):t==="acknowledged"||t==="rejected"?(kf(s,e,n||null),Vf(s,e),(function(a,c){Q(Q(a).mutationQueue).us(c)})(s.localStore,e)):Z(6720,"Unknown batchState",{Gl:t}),await mr(s,i)):U(as,"Cannot apply mutation batch with id: "+e)}async function zF(r,e){const t=Q(r);if(Kl(t),Gf(t),e===!0&&t.Ql!==!0){const n=t.sharedClientState.getAllActiveQueryTargets(),s=await Dm(t,n.toArray());t.Ql=!0,await Lh(t.remoteStore,!0);for(const i of s)jl(t.remoteStore,i)}else if(e===!1&&t.Ql!==!1){const n=[];let s=Promise.resolve();t.Ol.forEach(((i,o)=>{t.sharedClientState.isLocalQueryTarget(o)?n.push(o):s=s.then((()=>(no(t,o),eo(t.localStore,o,!0)))),to(t.remoteStore,o)})),await s,await Dm(t,n),(function(o){const a=Q(o);a.Bl.forEach(((c,l)=>{to(a.remoteStore,l)})),a.Ll.mo(),a.Bl=new Map,a.Nl=new Fe(z.comparator)})(t),t.Ql=!1,await Lh(t.remoteStore,!1)}}async function Dm(r,e,t){const n=Q(r),s=[],i=[];for(const o of e){let a;const c=n.Ol.get(o);if(c&&c.length!==0){a=await Zi(n.localStore,Je(c[0])?c[0]:At(c[0]));for(const l of c){const B=n.Fl.get(l),h=await jF(n,B);h.snapshot&&i.push(h.snapshot)}}else{const l=await nw(n.localStore,o);a=await Zi(n.localStore,l),await Lf(n,yw(l),o,!1,a.resumeToken)}s.push(a)}return n.Cl.gr(i),s}function yw(r){return Qn(r)?r:mI(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function WF(r){return(function(t){return Q(Q(t).persistence).Ba()})(Q(r).localStore)}async function $F(r,e,t,n){const s=Q(r);if(s.Ql)return void U(as,"Ignoring unexpected query state notification.");const i=s.Ol.get(e);if(i&&i.length>0)switch(t){case"current":case"not-current":{let o;if(Je(i[0]))switch(nr(i[0])){case"collection_group":case"collection":o=await Fh(s.localStore,Ey(i[0]));break;case"documents":o=await(function(l,B){const h=Q(l),p=le(...Ou(B).map((C=>z.fromPath(C))));return h.persistence.runTransaction("Get documents for pipeline","readonly",(C=>h.iu.getEntries(C,p))).then((C=>C))})(s.localStore,i[0]);break;default:at(""),o=Es()}else o=await Fh(s.localStore,(function(l){return l.collectionGroup||(l.path.length%2==1?l.path.lastSegment():l.path.get(l.path.length-2))})(i[0]));const a=go.createSynthesizedRemoteEventForCurrentChange(e,t==="current",Re.EMPTY_BYTE_STRING);await mr(s,o,a);break}case"rejected":await eo(s.localStore,e,!0),no(s,e,n);break;default:Z(64155,t)}}async function QF(r,e,t){const n=Kl(r);if(n.Ql){for(const s of e){if(n.Ol.has(s)&&n.sharedClientState.isActiveQueryTarget(s)){U(as,"Adding an already active target "+s);continue}const i=await nw(n.localStore,s),o=await Zi(n.localStore,i);await Lf(n,yw(i),o.targetId,!1,o.resumeToken),jl(n.remoteStore,o)}for(const s of t)n.Ol.has(s)&&await eo(n.localStore,s,!1).then((()=>{to(n.remoteStore,s),no(n,s)})).catch(rs)}}function Kl(r){const e=Q(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=Ew.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=qF.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=VF.bind(null,e),e.Cl.gr=bF.bind(null,e.eventManager),e.Cl.Kl=vF.bind(null,e.eventManager),e}function Gf(r){const e=Q(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=kF.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=MF.bind(null,e),e}function YF(r,e,t){const n=Q(r);(async function(i,o,a){try{const c=await o.getMetadata();if(await(function(C,m){const D=Q(C),N=Xe(m.createTime);return D.persistence.runTransaction("hasNewerBundle","readonly",(G=>D.qo.getBundleMetadata(G,m.id))).then((G=>!!G&&G.createTime.compareTo(N)>=0))})(i.localStore,c))return await o.close(),a._completeWith((function(C){return{taskState:"Success",documentsLoaded:C.totalDocuments,bytesLoaded:C.totalBytes,totalDocuments:C.totalDocuments,totalBytes:C.totalBytes}})(c)),Promise.resolve(new Set);a._updateProgress(pw(c));const l=new xf(c,o.serializer);let B=await o.ku();for(;B;){const p=await l.al(B);p&&a._updateProgress(p),B=await o.ku()}const h=await l.cl(i.localStore);return await mr(i,h.El,void 0),await(function(C,m){const D=Q(C);return D.persistence.runTransaction("Save bundle","readwrite",(N=>D.qo.saveBundleMetadata(N,m)))})(i.localStore,c),a._completeWith(h.progress),Promise.resolve(h.ll)}catch(c){return at(as,`Loading bundle failed with ${c}`),a._failWith(c),Promise.resolve(new Set)}})(n,e,t).then((s=>{n.sharedClientState.notifyBundleLoaded(s)}))}class ro{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ni(e.databaseInfo.databaseId),this.sharedClientState=this.jl(e),this.persistence=this.zl(e),await this.persistence.start(),this.localStore=this.Hl(e),this.gcScheduler=this.Jl(e,this.localStore),this.indexBackfillerScheduler=this.Yl(e,this.localStore)}Jl(e,t){return null}Yl(e,t){return null}Hl(e){return Xy(this.persistence,new Yy,e.initialUser,this.serializer)}zl(e){return new If(ql.Ho,this.serializer)}jl(e){return new dw}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ro.provider={build:()=>new ro};class Uf extends ro{constructor(e){super(),this.cacheSizeBytes=e}Jl(e,t){j(this.persistence.referenceDelegate instanceof Hu,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new XI(n,e.asyncQueue,t)}zl(e){const t=this.cacheSizeBytes!==void 0?Dt.withCacheSize(this.cacheSizeBytes):Dt.DEFAULT;return new If((n=>Hu.Ho(n,t)),this.serializer)}}class Hf extends ro{constructor(e,t,n){super(),this.Zl=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Zl.initialize(this,e),await Gf(this.Zl.syncEngine),await Io(this.Zl.remoteStore),await this.persistence.fa((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}Hl(e){return Xy(this.persistence,new Yy,e.initialUser,this.serializer)}Jl(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new XI(n,e.asyncQueue,t)}Yl(e,t){const n=new DF(t,this.persistence);return new wF(e.asyncQueue,n)}zl(e){const t=wf(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?Dt.withCacheSize(this.cacheSizeBytes):Dt.DEFAULT;return new yf(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,fw(),Cu(),this.serializer,this.sharedClientState,!!this.forceOwnership)}jl(e){return new dw}}class ww extends Hf{constructor(e,t){super(e,t,!1),this.Zl=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Zl.syncEngine;this.sharedClientState instanceof zB&&(this.sharedClientState.syncEngine={Lc:KF.bind(null,t),$c:$F.bind(null,t),Uc:QF.bind(null,t),Ba:WF.bind(null,t),Bc:JF.bind(null,t)},await this.sharedClientState.start()),await this.persistence.fa((async n=>{await zF(this.Zl.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())}))}jl(e){const t=fw();if(!zB.cn(t))throw new k(S.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=wf(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new zB(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class Xr{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>wm(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=HF.bind(null,this.syncEngine),await Lh(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new AF})()}createDatastore(e){const t=ni(e.databaseInfo.databaseId),n=rS(e.databaseInfo);return cS(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return(function(n,s,i,o,a){return new lF(n,s,i,o,a)})(this.localStore,this.datastore,e.asyncQueue,(t=>wm(this.syncEngine,t,0)),(function(){return kg.cn()?new kg:new ZP})())}createSyncEngine(e,t){return(function(s,i,o,a,c,l,B){const h=new SF(s,i,o,a,c,l);return B&&(h.Ql=!0),h})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(s){const i=Q(s);U(Un,"RemoteStore shutting down."),i.xu.add(5),await Eo(i),i.Du.shutdown(),i.Cu.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Xr.provider={build:()=>new Xr};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let XF=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new k(S.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await(async function(s,i){const o=Q(s),a={documents:i.map((h=>Wi(o.serializer,h)))},c=await o.dn("BatchGetDocuments",o.serializer.databaseId,Be.emptyPath(),a,i.length),l=new Map;c.forEach((h=>{const p=MP(o.serializer,h);l.set(p.key.toString(),p)}));const B=[];return i.forEach((h=>{const p=l.get(h.toString());j(!!p,55234,{key:h}),B.push(p)})),B})(this.datastore,e);return t.forEach((n=>this.recordVersion(n))),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(n){this.lastTransactionError=n}this.writtenDocs.add(e.toString())}delete(e){this.write(new po(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach((t=>{e.delete(t.key.toString())})),e.forEach(((t,n)=>{const s=z.fromPath(n);this.mutations.push(new Rd(s,this.precondition(s)))})),await(async function(n,s){const i=Q(n),o={writes:s.map((a=>Ma(i.serializer,a)))};await i.In("Commit",i.serializer.databaseId,Be.emptyPath(),o)})(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw Z(50498,{Xl:e.constructor.name});t=re.min()}const n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new k(S.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(re.min())?qe.exists(!1):qe.updateTime(t):qe.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(re.min()))throw new k(S.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return qe.updateTime(t)}return qe.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZF{constructor(e,t,n,s,i){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=s,this.deferred=i,this.eE=n.maxAttempts,this._r=new Gd(this.asyncQueue,"transaction_retry")}tE(){this.eE-=1,this.nE()}nE(){this._r.Yn((async()=>{const e=new XF(this.datastore),t=this.rE(e);t&&t.then((n=>{this.asyncQueue.enqueueAndForget((()=>e.commit().then((()=>{this.deferred.resolve(n)})).catch((s=>{this.iE(s)}))))})).catch((n=>{this.iE(n)}))}))}rE(e){try{const t=this.updateFunction(e);return!rc(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}iE(e){this.eE>0&&this.sE(e)?(this.eE-=1,this.asyncQueue.enqueueAndForget((()=>(this.nE(),Promise.resolve())))):this.deferred.reject(e)}sE(e){if((e==null?void 0:e.name)==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!yI(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zr="FirestoreClient";class ex{constructor(e,t,n,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=s,this.user=dt.UNAUTHENTICATED,this.clientId=Bl.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,(async o=>{U(Zr,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(n,(o=>(U(Zr,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new gt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=wo(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}async function WB(r,e){r.asyncQueue.verifyOperationInProgress(),U(Zr,"Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener((async s=>{n.isEqual(s)||(await Zy(e.localStore,s),n=s)})),e.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=e}async function Tm(r,e){r.asyncQueue.verifyOperationInProgress();const t=await qf(r);U(Zr,"Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener((n=>gm(e.remoteStore,n))),r.setAppCheckTokenChangeListener(((n,s)=>gm(e.remoteStore,s))),r._onlineComponents=e}async function qf(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){U(Zr,"Using user provided OfflineComponentProvider");try{await WB(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===S.FAILED_PRECONDITION||s.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;at("Error using user provided cache. Falling back to memory cache: "+t),await WB(r,new ro)}}else U(Zr,"Using default OfflineComponentProvider"),await WB(r,new Uf(void 0));return r._offlineComponents}async function zl(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(U(Zr,"Using user provided OnlineComponentProvider"),await Tm(r,r._uninitializedComponentsProvider._online)):(U(Zr,"Using default OnlineComponentProvider"),await Tm(r,new Xr))),r._onlineComponents}function Dw(r){return qf(r).then((e=>e.persistence))}function Do(r){return qf(r).then((e=>e.localStore))}function Tw(r){return zl(r).then((e=>e.remoteStore))}function jf(r){return zl(r).then((e=>e.syncEngine))}function Aw(r){return zl(r).then((e=>e.datastore))}async function so(r){const e=await zl(r),t=e.eventManager;return t.onListen=NF.bind(null,e.syncEngine),t.onUnlisten=FF.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=OF.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=xF.bind(null,e.syncEngine),t}function tx(r){return r.asyncQueue.enqueue((async()=>{const e=await Dw(r),t=await Tw(r);return e.setNetworkEnabled(!0),(function(s){const i=Q(s);return i.xu.delete(0),pc(i)})(t)}))}function nx(r){return r.asyncQueue.enqueue((async()=>{const e=await Dw(r),t=await Tw(r);return e.setNetworkEnabled(!1),(async function(s){const i=Q(s);i.xu.add(0),await Eo(i),i.Cu.set("Offline")})(t)}))}function rx(r,e,t,n){const s=new Jl(n),i=new Ff(e,s,t);return r.asyncQueue.enqueueAndForget((async()=>Sf(await so(r),i))),()=>{s.Bu(),r.asyncQueue.enqueueAndForget((async()=>Nf(await so(r),i)))}}function sx(r,e){const t=new gt;return r.asyncQueue.enqueueAndForget((async()=>(async function(s,i,o){try{const a=await(function(l,B){const h=Q(l);return h.persistence.runTransaction("read document","readonly",(p=>h.localDocuments.getDocument(p,B)))})(s,i);a.isFoundDocument()?o.resolve(a):a.isNoDocument()?o.resolve(null):o.reject(new k(S.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(a){const c=wo(a,`Failed to get document '${i} from cache`);o.reject(c)}})(await Do(r),e,t))),t.promise}function bw(r,e,t={}){const n=new gt;return r.asyncQueue.enqueueAndForget((async()=>(function(i,o,a,c,l){const B=new Jl({next:p=>{B.Bu(),o.enqueueAndForget((()=>Nf(i,h)));const C=p.docs.has(a);!C&&p.fromCache?l.reject(new k(S.UNAVAILABLE,"Failed to get document because the client is offline.")):C&&p.fromCache&&c&&c.source==="server"?l.reject(new k(S.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(p)},error:p=>l.reject(p)}),h=new Ff(Co(a.path),B,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return Sf(i,h)})(await so(r),r.asyncQueue,e,t,n))),n.promise}function ix(r,e){const t=new gt;return r.asyncQueue.enqueueAndForget((async()=>(async function(s,i,o){try{const a=await qu(s,i,!0),c=new mw(i,a.uu),l=c.Vl(a.documents),B=c.applyChanges(l,!1);o.resolve(B.snapshot)}catch(a){const c=wo(a,`Failed to execute query '${i} against cache`);o.reject(c)}})(await Do(r),e,t))),t.promise}function vw(r,e,t={}){const n=new gt;return r.asyncQueue.enqueueAndForget((async()=>(function(i,o,a,c,l){const B=new Jl({next:p=>{B.Bu(),o.enqueueAndForget((()=>Nf(i,h))),p.fromCache&&c.source==="server"?l.reject(new k(S.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):l.resolve(p)},error:p=>l.reject(p)}),h=new Ff(a instanceof ga?tO(a):a,B,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return Sf(i,h)})(await so(r),r.asyncQueue,e,t,n))),n.promise}function ox(r,e,t){const n=new gt;return r.asyncQueue.enqueueAndForget((async()=>{try{const s=await Aw(r);n.resolve((async function(o,a,c){var D;const l=Q(o),{request:B,$t:h,parent:p}=xI(l.serializer,_I(a),c);l.connection.En||delete B.parent;const C=(await l.dn("RunAggregationQuery",l.serializer.databaseId,p,B,1)).filter((N=>!!N.result));j(C.length===1,64727);const m=(D=C[0].result)==null?void 0:D.aggregateFields;return Object.keys(m).reduce(((N,G)=>(N[h[G]]=m[G],N)),{})})(s,e,t))}catch(s){n.reject(s)}})),n.promise}function ax(r,e){const t=new gt;return r.asyncQueue.enqueueAndForget((async()=>LF(await jf(r),e,t))),t.promise}function cx(r,e){const t=new Jl(e);return r.asyncQueue.enqueueAndForget((async()=>(function(s,i){Q(s).Jc.add(i),i.next()})(await so(r),t))),()=>{t.Bu(),r.asyncQueue.enqueueAndForget((async()=>(function(s,i){Q(s).Jc.delete(i)})(await so(r),t)))}}function ux(r,e,t){const n=new gt;return r.asyncQueue.enqueueAndForget((async()=>{const s=await Aw(r);new ZF(r.asyncQueue,s,t,e,n).tE()})),n.promise}function lx(r,e,t,n){const s=(function(o,a){let c;return c=typeof o=="string"?Ld().encode(o):o,(function(B,h){return new IF(B,h)})((function(B,h){if(B instanceof Uint8Array)return Cm(B,h);if(B instanceof ArrayBuffer)return Cm(new Uint8Array(B),h);if(B instanceof ReadableStream)return B.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")})(c),a)})(t,ni(e));r.asyncQueue.enqueueAndForget((async()=>{YF(await jf(r),s,n)}))}function Bx(r,e){return r.asyncQueue.enqueue((async()=>(function(n,s){const i=Q(n);return i.persistence.runTransaction("Get named query","readonly",(o=>i.qo.getNamedQuery(o,s)))})(await Do(r),e)))}function Rw(r,e){return(function(n,s){return new yF(n,s)})(r,e)}function hx(r,e){return r.asyncQueue.enqueue((async()=>(async function(n,s){const i=Q(n),o=i.indexManager,a=[];return i.persistence.runTransaction("Configure indexes","readwrite",(c=>o.getFieldIndexes(c).next((l=>(function(h,p,C,m,D){h=[...h],p=[...p],h.sort(C),p.sort(C);const N=h.length,G=p.length;let J=0,te=0;for(;J<G&&te<N;){const he=C(h[te],p[J]);he<0?D(h[te++]):he>0?m(p[J++]):(J++,te++)}for(;J<G;)m(p[J++]);for(;te<N;)D(h[te++])})(l,s,_P,(B=>{a.push(o.addFieldIndex(c,B))}),(B=>{a.push(o.deleteFieldIndex(c,B))})))).next((()=>P.waitFor(a)))))})(await Do(r),e)))}function dx(r,e){return r.asyncQueue.enqueue((async()=>(function(n,s){Q(n).eu.qa=s})(await Do(r),e)))}function fx(r){return r.asyncQueue.enqueue((async()=>(function(t){const n=Q(t),s=n.indexManager;return n.persistence.runTransaction("Delete All Indexes","readwrite",(i=>s.deleteAllFieldIndexes(i)))})(await Do(r))))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $a=class{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new be(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new px(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(_n("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},px=class extends $a{data(){return super.data()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf{convertValue(e,t="none"){switch(rt(e)){case 0:return null;case 2:return e.booleanValue;case 3:if("mapValue"in e){if(Jr(e))return this.convertToInt32Value(e.mapValue);if(cn(e))return this.convertToDecimal128Value(e.mapValue)}return Le(e.integerValue||e.doubleValue);case 4:return this.convertTimestamp(e.timestampValue);case 6:return this.convertServerTimestamp(e,t);case 7:return e.stringValue;case 8:return"bytesValue"in e?this.convertBytes(fn(e.bytesValue)):this.convertToBytesWithSubtype(e.mapValue);case 9:return this.convertReference(e.referenceValue);case 11:return this.convertGeoPoint(e.geoPointValue);case 13:return this.convertArray(e.arrayValue,t);case 15:return this.convertObject(e.mapValue,t);case 14:return this.convertVectorValue(e.mapValue);case 12:return this.convertToRegexValue(e.mapValue);case 10:return this.convertToBsonObjectId(e.mapValue);case 5:return this.convertToBsonTimestamp(e.mapValue);case 16:return Rn.instance();case 1:return Pn.instance();default:throw Z(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return ts(e,((s,i)=>{n[s]=this.convertValue(i,t)})),n}convertVectorValue(e){var n,s,i;const t=(i=(s=(n=e.fields)==null?void 0:n[Gs].arrayValue)==null?void 0:s.values)==null?void 0:i.map((o=>Le(o.doubleValue)));return new xt(t)}convertToBsonObjectId(e){var n,s;const t=((s=(n=e.fields)==null?void 0:n[Us])==null?void 0:s.stringValue)??"";return new yl(t)}convertToBytesWithSubtype(e){var a;const t=(a=e.fields)==null?void 0:a[Mi],n=t==null?void 0:t.bytesValue;if(!n)throw new Error("Received incorrect bytesValue for Bytes with subtype");const s=fn(n).toUint8Array();if(s.length===0)throw new Error("Received empty bytesValue for Bytes with subtype");const i=s[0],o=s.slice(1);return new Nt(Re.fromUint8Array(o),i)}convertToBsonTimestamp(e){var i,o,a,c,l,B,h;const t=(i=e.fields)==null?void 0:i[Zn],n=Number((c=(a=(o=t==null?void 0:t.mapValue)==null?void 0:o.fields)==null?void 0:a[Oa])==null?void 0:c.integerValue),s=Number((h=(B=(l=t==null?void 0:t.mapValue)==null?void 0:l.fields)==null?void 0:B[Fa])==null?void 0:h.integerValue);return new wl(n,s)}convertToRegexValue(e){var s,i,o,a,c,l,B,h,p,C;const t=((c=(a=(o=(i=(s=e.fields)==null?void 0:s[An])==null?void 0:i.mapValue)==null?void 0:o.fields)==null?void 0:a[Vi])==null?void 0:c.stringValue)??"",n=((C=(p=(h=(B=(l=e.fields)==null?void 0:l[An])==null?void 0:B.mapValue)==null?void 0:h.fields)==null?void 0:p[ki])==null?void 0:C.stringValue)??"";return new bl(t,n)}convertToInt32Value(e){var n,s;const t=Number((s=(n=e.fields)==null?void 0:n[ns])==null?void 0:s.integerValue);return new Tl(t)}convertToDecimal128Value(e){var n,s;const t=((s=(n=e.fields)==null?void 0:n[cr])==null?void 0:s.stringValue)??"";return new Dl(t)}convertGeoPoint(e){return new pn(Le(e.latitude),Le(e.longitude))}convertArray(e,t){return(e.values||[]).map((n=>this.convertValue(n,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const n=nc(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(xi(e));default:return null}}convertTimestamp(e){const t=or(e);return new we(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=Be.fromString(e);j(GI(n),9688,{name:e});const s=new ar(n.get(1),n.get(3)),i=new z(n.popFirst(5));return s.isEqual(t)||$e(`A document reference to ${i} refers to a different database (${s.projectId}/${s.database}), which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wl(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}class Kf extends Jf{constructor(e){super(),this.firestore=e}convertBytes(e){return new Nt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new be(this.firestore,null,t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Am="AsyncQueue";class bm{constructor(e=Promise.resolve()){this._E=[],this.oE=!1,this.aE=[],this.uE=null,this.cE=!1,this.lE=!1,this.EE=[],this._r=new Gd(this,"async_queue_retry"),this.hE=()=>{const n=Cu();n&&U(Am,"Visibility state changed to "+n.visibilityState),this._r.Xn()},this.TE=e;const t=Cu();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.hE)}get isShuttingDown(){return this.oE}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.PE(),this.IE(e)}enterRestrictedMode(e){if(!this.oE){this.oE=!0,this.lE=e||!1;const t=Cu();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.hE)}}enqueue(e){if(this.PE(),this.oE)return new Promise((()=>{}));const t=new gt;return this.IE((()=>this.oE&&this.lE?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this._E.push(e),this.RE())))}async RE(){if(this._E.length!==0){try{await this._E[0](),this._E.shift(),this._r.reset()}catch(e){if(!ss(e))throw e;U(Am,"Operation failed with retryable error: "+e)}this._E.length>0&&this._r.Yn((()=>this.RE()))}}IE(e){const t=this.TE.then((()=>(this.cE=!0,e().catch((n=>{throw this.uE=n,this.cE=!1,$e("INTERNAL UNHANDLED ERROR: ",vm(n)),n})).then((n=>(this.cE=!1,n))))));return this.TE=t,t}enqueueAfterDelay(e,t,n){this.PE(),this.EE.indexOf(e)>-1&&(t=0);const s=Rf.createAndSchedule(this,e,t,n,(i=>this.AE(i)));return this.aE.push(s),s}PE(){this.uE&&Z(47125,{VE:vm(this.uE)})}verifyOperationInProgress(){}async dE(){let e;do e=this.TE,await e;while(e!==this.TE)}fE(e){for(const t of this.aE)if(t.timerId===e)return!0;return!1}mE(e){return this.dE().then((()=>{this.aE.sort(((t,n)=>t.targetTimeMs-n.targetTimeMs));for(const t of this.aE)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.dE()}))}pE(e){this.EE.push(e)}AE(e){const t=this.aE.indexOf(e);this.aE.splice(t,1)}}function vm(r){let e=r.message||"";return r.stack&&(e=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pw{constructor(){this._progressObserver={},this._taskCompletionResolver=new gt,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,n){this._progressObserver={next:e,error:t,complete:n}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cx=-1;class Se extends ac{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new bm,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new bm(e),this._firestoreClient=void 0,await e}}}function gx(r,e,t){t||(t=Na);const n=qn(r,"firestore");if(n.isInitialized(t)){const s=n.getImmediate({identifier:t}),i=n.getOptions(t);if(sn(i,e))return s;throw new k(S.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new k(S.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<YI)throw new k(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&ao(e.host)&&Qh(e.host),n.initialize({options:e,instanceIdentifier:t})}function mx(r,e){const t=typeof r=="object"?r:Xu(),n=typeof r=="string"?r:e||Na,s=qn(t,"firestore").getImmediate({identifier:n});if(!s._initialized){const i=cT("firestore");i&&ty(s,...i)}return s}function je(r){if(r._terminated)throw new k(S.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||Sw(r),r._firestoreClient}function Sw(r){var n,s,i,o;const e=r._freezeSettings(),t=lS(r._databaseId,((n=r._app)==null?void 0:n.options.appId)||"",r._persistenceKey,(s=r._app)==null?void 0:s.options.apiKey,e);r._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(r._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),r._firestoreClient=new ex(r._authCredentials,r._appCheckCredentials,r._queue,t,r._componentsProvider&&(function(c){const l=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(l),_online:l}})(r._componentsProvider))}function _x(r,e){at("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=r._freezeSettings();return Nw(r,Xr.provider,{build:n=>new Hf(n,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}async function Ex(r){at("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=r._freezeSettings();Nw(r,Xr.provider,{build:t=>new ww(t,e.cacheSizeBytes)})}function Nw(r,e,t){if((r=ge(r,Se))._firestoreClient||r._terminated)throw new k(S.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(r._componentsProvider||r._getSettings().localCache)throw new k(S.FAILED_PRECONDITION,"SDK cache is already specified.");r._componentsProvider={_online:e,_offline:t},Sw(r)}function Ix(r){if(r._initialized&&!r._terminated)throw new k(S.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new gt;return r._queue.enqueueAndForgetEvenWhileRestricted((async()=>{try{await(async function(n){if(!xn.cn())return Promise.resolve();const s=n+Qy;await xn.delete(s)})(wf(r._databaseId,r._persistenceKey)),e.resolve()}catch(t){e.reject(t)}})),e.promise}function yx(r){return(function(t){const n=new gt;return t.asyncQueue.enqueueAndForget((async()=>GF(await jf(t),n))),n.promise})(je(r=ge(r,Se)))}function wx(r){return tx(je(r=ge(r,Se)))}function Dx(r){return nx(je(r=ge(r,Se)))}function Tx(r){return s_(r.app,"firestore",r._databaseId.database),r._delete()}function Gh(r,e){const t=je(r=ge(r,Se)),n=new Pw;return lx(t,r._databaseId,e,n),n}function Ow(r,e){return Bx(je(r=ge(r,Se)),e).then((t=>t?new ct(r,null,t.query):null))}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cs extends Jf{constructor(e){super(),this.firestore=e}convertBytes(e){return new Nt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new be(this.firestore,null,t)}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fw="NOT SUPPORTED";class er{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Ht extends $a{constructor(e,t,n,s,i,o){super(e,t,n,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new wa(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(_n("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new k(S.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Ht._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}function Ax(r,e,t){if(Zs(e,Ht._jsonSchema)){if(e.bundle===Fw)throw new k(S.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const n=ni(r._databaseId),s=Rw(e.bundle,n),i=s.ju(),o=new xf(s.getMetadata(),n);for(const B of i)o.al(B);const a=o.documents;if(a.length!==1)throw new k(S.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${a.length} documents.`);const c=El(n,a[0].document),l=new z(Be.fromString(e.bundleName));return new Ht(r,new Kf(r),l,c,new er(!1,!1),t||null)}}Ht._jsonSchemaVersion="firestore/documentSnapshot/1.0",Ht._jsonSchema={type:Qe("string",Ht._jsonSchemaVersion),bundleSource:Qe("string","DocumentSnapshot"),bundleName:Qe("string"),bundle:Qe("string")};class wa extends Ht{data(e={}){return super.data(e)}}class qt{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new er(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((n=>{e.call(t,new wa(this._firestore,this._userDataWriter,n.key,n,new er(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new k(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((a=>{Je(s._snapshot.query)?Uu(s._snapshot.query):_l(s.query._query);const c=new wa(s._firestore,s._userDataWriter,a.doc.key,a.doc,new er(s._snapshot.mutatedKeys.has(a.doc.key),s._snapshot.fromCache),s.query.converter);return a.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((a=>i||a.type!==3)).map((a=>{const c=new wa(s._firestore,s._userDataWriter,a.doc.key,a.doc,new er(s._snapshot.mutatedKeys.has(a.doc.key),s._snapshot.fromCache),s.query.converter);let l=-1,B=-1;return a.type!==0&&(l=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),B=o.indexOf(a.doc.key)),{type:vx(a.type),doc:c,oldIndex:l,newIndex:B}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new k(S.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=qt._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Bl.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function bx(r,e,t){if(Zs(e,qt._jsonSchema)){if(e.bundle===Fw)throw new k(S.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const n=ni(r._databaseId),s=Rw(e.bundle,n),i=s.ju(),o=new xf(s.getMetadata(),n);for(const C of i)o.al(C);if(o.queries.length!==1)throw new k(S.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${o.queries.length} queries.`);const a=Ml(o.queries[0].bundledQuery),c=Je(a)?Uu(a):_l(a),l=o.documents;let B=new Ur(c);l.map((C=>{const m=El(n,C.document);B=B.add(m)}));const h=zs.fromInitialDocuments(a,B,le(),!1,!1),p=new ct(r,t||null,a);return new qt(r,new Kf(r),p,h)}}function vx(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Z(61501,{type:r})}}function Rx(r,e){return r instanceof Ht&&e instanceof Ht?r._firestore===e._firestore&&r._key.isEqual(e._key)&&(r._document===null?e._document===null:r._document.isEqual(e._document))&&r._converter===e._converter:r instanceof qt&&e instanceof qt&&r._firestore===e._firestore&&Hd(r.query,e.query)&&r.metadata.isEqual(e.metadata)&&r._snapshot.isEqual(e._snapshot)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */qt._jsonSchemaVersion="firestore/querySnapshot/1.0",qt._jsonSchema={type:Qe("string",qt._jsonSchemaVersion),bundleSource:Qe("string","QuerySnapshot"),bundleName:Qe("string"),bundle:Qe("string")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Px(r){var n;const e=je(ge(r.firestore,Se)),t=(n=e._onlineComponents)==null?void 0:n.datastore.serializer;return t===void 0?null:Il(t,At(r._query)).Lt}function Sx(r,e){var i;const t=yd(e,((o,a)=>new OE(a,o.aggregateType,o._internalFieldPath))),n=je(ge(r.firestore,Se)),s=(i=n._onlineComponents)==null?void 0:i.datastore.serializer;return s===void 0?null:xI(s,_I(r._query),t,!0).request}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class io{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class xw{constructor(e,t,n){this._userDataWriter=t,this._data=n,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new it({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lw(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new k(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class zf{}class To extends zf{}function Nx(r,e,...t){let n=[];e instanceof zf&&n.push(e),n=n.concat(t),(function(i){const o=i.filter((c=>c instanceof ai)).length,a=i.filter((c=>c instanceof Ao)).length;if(o>1||o>0&&a>0)throw new k(S.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(n);for(const s of n)r=s._apply(r);return r}class Ao extends To{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new Ao(e,t,n)}_apply(e){const t=this._parse(e);return kw(e._query,t),new ct(e.firestore,e.converter,mh(e._query,t))}_parse(e){const t=si(e.firestore);return(function(i,o,a,c,l,B,h){let p;if((function(D,N){if(typeof D=="number"&&isNaN(D)&&N!=="=="&&N!=="!="&&N!=="array-contains")throw new Error("Invalid query. You can only perform '==' and '!=' comparisons on NaN.");if(D===null&&N!=="=="&&N!=="!="&&N!=="array-contains")throw new Error("Invalid query. You can only perform '==' and '!=' comparisons on Null.")})(h,B),l.isKeyField()){if(B==="array-contains"||B==="array-contains-any")throw new k(S.INVALID_ARGUMENT,`Invalid Query. You can't perform '${B}' queries on documentId().`);if(B==="in"||B==="not-in"){Pm(h,B);const m=[];for(const D of h)m.push(Rm(c,i,D));p={arrayValue:{values:m}}}else p=Rm(c,i,h)}else B!=="in"&&B!=="not-in"&&B!=="array-contains-any"||Pm(h,B),p=oy(a,o,h,B==="in"||B==="not-in");return _e.create(l,B,p)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Ox(r,e,t){const n=e,s=_n("where",r);return Ao._create(s,n,t)}class ai extends zf{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new ai(e,t)}_parse(e){const t=this._queryConstraints.map((n=>n._parse(e))).filter((n=>n.getFilters().length>0));return t.length===1?t[0]:Pe.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let o=s;const a=i.getFlattenedFilters();for(const c of a)kw(o,c),o=mh(o,c)})(e._query,t),new ct(e.firestore,e.converter,mh(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Fx(...r){return r.forEach((e=>Mw("or",e))),ai._create("or",r)}function xx(...r){return r.forEach((e=>Mw("and",e))),ai._create("and",r)}class $l extends To{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new $l(e,t)}_apply(e){const t=(function(s,i,o){if(s.startAt!==null)throw new k(S.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new k(S.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new ka(i,o)})(e._query,this._field,this._direction);return new ct(e.firestore,e.converter,wP(e._query,t))}}function Lx(r,e="asc"){const t=e,n=_n("orderBy",r);return $l._create(n,t)}class Cc extends To{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new Cc(e,t,n)}_apply(e){return new ct(e.firestore,e.converter,Pu(e._query,this._limit,this._limitType))}}function Vx(r){return kE("limit",r),Cc._create("limit",r,"F")}function kx(r){return kE("limitToLast",r),Cc._create("limitToLast",r,"L")}class gc extends To{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new gc(e,t,n)}_apply(e){const t=Vw(e,this.type,this._docOrFields,this._inclusive);return new ct(e.firestore,e.converter,DP(e._query,t))}}function Mx(...r){return gc._create("startAt",r,!0)}function Gx(...r){return gc._create("startAfter",r,!1)}class mc extends To{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new mc(e,t,n)}_apply(e){const t=Vw(e,this.type,this._docOrFields,this._inclusive);return new ct(e.firestore,e.converter,TP(e._query,t))}}function Ux(...r){return mc._create("endBefore",r,!1)}function Hx(...r){return mc._create("endAt",r,!0)}function Vw(r,e,t,n){if(t[0]=ne(t[0]),t[0]instanceof $a)return(function(i,o,a,c,l){if(!c)throw new k(S.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${a}().`);const B=[];for(const h of vi(i))if(h.field.isKeyField())B.push(jr(o,c.key));else{const p=c.data.field(h.field);if(dl(p))throw new k(S.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+h.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(p===null){const C=h.field.canonicalString();throw new k(S.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${C}' (used as the orderBy) does not exist.`)}B.push(p)}return new zr(B,l)})(r._query,r.firestore._databaseId,e,t[0]._document,n);{const s=si(r.firestore);return(function(o,a,c,l,B,h){const p=o.explicitOrderBy;if(B.length>p.length)throw new k(S.INVALID_ARGUMENT,`Too many arguments provided to ${l}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const C=[];for(let m=0;m<B.length;m++){const D=B[m];if(p[m].field.isKeyField()){if(typeof D!="string")throw new k(S.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${l}(), but got a ${typeof D}`);if(!Fd(o)&&D.indexOf("/")!==-1)throw new k(S.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${l}() must be a plain document ID, but '${D}' contains a slash.`);const N=o.path.child(Be.fromString(D));if(!z.isDocumentKey(N))throw new k(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${l}() must result in a valid document path, but '${N}' is not because it contains an odd number of segments.`);const G=new z(N);C.push(jr(a,G))}else{const N=oy(c,l,D);C.push(N)}}return new zr(C,h)})(r._query,r.firestore._databaseId,s,e,t,n)}}function Rm(r,e,t){if(typeof(t=ne(t))=="string"){if(t==="")throw new k(S.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Fd(e)&&t.indexOf("/")!==-1)throw new k(S.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(Be.fromString(t));if(!z.isDocumentKey(n))throw new k(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return jr(r,new z(n))}if(t instanceof be)return jr(r,t._key);throw new k(S.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${hl(t)}.`)}function Pm(r,e){if(!Array.isArray(r)||r.length===0)throw new k(S.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function kw(r,e){const t=(function(s,i){for(const o of s)for(const a of o.getFlattenedFilters())if(i.indexOf(a.op)>=0)return a.op;return null})(r.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new k(S.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new k(S.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function Mw(r,e){if(!(e instanceof Ao||e instanceof ai))throw new k(S.INVALID_ARGUMENT,`Function ${r}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}function qx(r){return new io("sum",_n("sum",r))}function jx(r){return new io("avg",_n("average",r))}function Gw(){return new io("count")}function Jx(r,e){var t,n;return r instanceof io&&e instanceof io&&r.aggregateType===e.aggregateType&&((t=r._internalFieldPath)==null?void 0:t.canonicalString())===((n=e._internalFieldPath)==null?void 0:n.canonicalString())}function Kx(r,e){return Hd(r.query,e.query)&&sn(r.data(),e.data())}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pi(r){return(function(t,n){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1})(r,["next","error","complete"])}function zx(r){return Uw(r,{count:Gw()})}function Uw(r,e){const t=ge(r.firestore,Se),n=je(t),s=yd(e,((i,o)=>new OE(o,i.aggregateType,i._internalFieldPath)));return ox(n,r._query,s).then((i=>(function(a,c,l){const B=new cs(a);return new xw(c,B,l)})(t,r,i)))}class Wx{constructor(e){this.kind="memory",this._onlineComponentProvider=Xr.provider,this._offlineComponentProvider=e!=null&&e.garbageCollector?e.garbageCollector._offlineComponentProvider:{build:()=>new Uf(void 0)}}toJSON(){return{kind:this.kind}}}class $x{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=Hw(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class Qx{constructor(){this.kind="memoryEager",this._offlineComponentProvider=ro.provider}toJSON(){return{kind:this.kind}}}class Yx{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new Uf(e)}}toJSON(){return{kind:this.kind}}}function Xx(){return new Qx}function Zx(r){return new Yx(r==null?void 0:r.cacheSizeBytes)}function eL(r){return new Wx(r)}function tL(r){return new $x(r)}class nL{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Xr.provider,this._offlineComponentProvider={build:t=>new Hf(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class rL{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Xr.provider,this._offlineComponentProvider={build:t=>new ww(t,e==null?void 0:e.cacheSizeBytes)}}}function Hw(r){return new nL(r==null?void 0:r.forceOwnership)}function sL(){return new rL}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iL={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qw{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=si(e)}set(e,t,n){this._verifyNotCommitted();const s=Or(e,this._firestore),i=Wl(s.converter,t,n),o=Rl(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,n);return this._mutations.push(o.toMutation(s._key,qe.none())),this}update(e,t,n,...s){this._verifyNotCommitted();const i=Or(e,this._firestore);let o;return o=typeof(t=ne(t))=="string"||t instanceof ri?Qd(this._dataReader,"WriteBatch.update",i._key,t,n,s):$d(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(o.toMutation(i._key,qe.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Or(e,this._firestore);return this._mutations=this._mutations.concat(new po(t._key,qe.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new k(S.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Or(r,e){if((r=ne(r)).firestore!==e)throw new k(S.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let oL=class{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=si(e)}get(e){const t=Or(e,this._firestore),n=new Kf(this._firestore);return this._transaction.lookup([t._key]).then((s=>{if(!s||s.length!==1)return Z(24041);const i=s[0];if(i.isFoundDocument())return new $a(this._firestore,n,i.key,i,t.converter);if(i.isNoDocument())return new $a(this._firestore,n,t._key,null,t.converter);throw Z(18433,{doc:i})}))}set(e,t,n){const s=Or(e,this._firestore),i=Wl(s.converter,t,n),o=Rl(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,n);return this._transaction.set(s._key,o),this}update(e,t,n,...s){const i=Or(e,this._firestore);let o;return o=typeof(t=ne(t))=="string"||t instanceof ri?Qd(this._dataReader,"Transaction.update",i._key,t,n,s):$d(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,o),this}delete(e){const t=Or(e,this._firestore);return this._transaction.delete(t._key),this}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jw extends oL{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Or(e,this._firestore),n=new cs(this._firestore);return super.get(e).then((s=>new Ht(this._firestore,n,t._key,s._document,new er(!1,!1),t.converter)))}}function aL(r,e,t){r=ge(r,Se);const n={...iL,...t};(function(o){if(o.maxAttempts<1)throw new k(S.INVALID_ARGUMENT,"Max attempts must be at least 1")})(n);const s=je(r);return ux(s,(i=>e(new jw(r,i))),n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cL(r){r=ge(r,be);const e=ge(r.firestore,Se),t=je(e);return bw(t,r._key).then((n=>Wf(e,r,n)))}function uL(r){r=ge(r,be);const e=ge(r.firestore,Se),t=je(e),n=new cs(e);return sx(t,r._key).then((s=>new Ht(e,n,r._key,s,new er(s!==null&&s.hasLocalMutations,!0),r.converter)))}function lL(r){r=ge(r,be);const e=ge(r.firestore,Se),t=je(e);return bw(t,r._key,{source:"server"}).then((n=>Wf(e,r,n)))}function BL(r){r=ge(r,ct);const e=ge(r.firestore,Se),t=je(e),n=new cs(e);return Lw(r._query),vw(t,r._query).then((s=>new qt(e,n,r,s)))}function hL(r){r=ge(r,ct);const e=ge(r.firestore,Se),t=je(e),n=new cs(e);return ix(t,r._query).then((s=>new qt(e,n,r,s)))}function dL(r){r=ge(r,ct);const e=ge(r.firestore,Se),t=je(e),n=new cs(e);return vw(t,r._query,{source:"server"}).then((s=>new qt(e,n,r,s)))}function fL(r,e,t){r=ge(r,be);const n=ge(r.firestore,Se),s=Wl(r.converter,e,t),i=si(n);return bo(n,[Rl(i,"setDoc",r._key,s,r.converter!==null,t).toMutation(r._key,qe.none())])}function pL(r,e,t,...n){r=ge(r,be);const s=ge(r.firestore,Se),i=si(s);let o;return o=typeof(e=ne(e))=="string"||e instanceof ri?Qd(i,"updateDoc",r._key,e,t,n):$d(i,"updateDoc",r._key,e),bo(s,[o.toMutation(r._key,qe.exists(!0))])}function CL(r){return bo(ge(r.firestore,Se),[new po(r._key,qe.none())])}function gL(r,e){const t=ge(r.firestore,Se),n=ny(r),s=Wl(r.converter,e),i=si(r.firestore);return bo(t,[Rl(i,"addDoc",n._key,s,r.converter!==null,{}).toMutation(n._key,qe.exists(!1))]).then((()=>n))}function Uh(r,...e){var l,B,h;r=ne(r);let t={includeMetadataChanges:!1,source:"default"},n=0;typeof e[n]!="object"||Pi(e[n])||(t=e[n++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Pi(e[n])){const p=e[n];e[n]=(l=p.next)==null?void 0:l.bind(p),e[n+1]=(B=p.error)==null?void 0:B.bind(p),e[n+2]=(h=p.complete)==null?void 0:h.bind(p)}let i,o,a;if(r instanceof be)o=ge(r.firestore,Se),a=Co(r._key.path),i={next:p=>{e[n]&&e[n](Wf(o,r,p))},error:e[n+1],complete:e[n+2]};else{const p=ge(r,ct);o=ge(p.firestore,Se),a=p._query;const C=new cs(o);i={next:m=>{e[n]&&e[n](new qt(o,C,p,m))},error:e[n+1],complete:e[n+2]},Lw(r._query)}const c=je(o);return rx(c,a,s,i)}function mL(r,e,...t){const n=ne(r),s=(function(c){const l={bundle:"",bundleName:"",bundleSource:""},B=["bundle","bundleName","bundleSource"];for(const h of B){if(!(h in c)){l.error=`snapshotJson missing required field: ${h}`;break}const p=c[h];if(typeof p!="string"){l.error=`snapshotJson field '${h}' must be a string.`;break}if(p.length===0){l.error=`snapshotJson field '${h}' cannot be an empty string.`;break}h==="bundle"?l.bundle=p:h==="bundleName"?l.bundleName=p:h==="bundleSource"&&(l.bundleSource=p)}return l})(e);if(s.error)throw new k(S.INVALID_ARGUMENT,s.error);let i,o=0;if(typeof t[o]!="object"||Pi(t[o])||(i=t[o++]),s.bundleSource==="QuerySnapshot"){let a=null;if(typeof t[o]=="object"&&Pi(t[o])){const c=t[o++];a={next:c.next,error:c.error,complete:c.complete}}else a={next:t[o++],error:t[o++],complete:t[o++]};return(function(l,B,h,p,C){let m,D=!1;return Gh(l,B.bundle).then((()=>Ow(l,B.bundleName))).then((G=>{G&&!D&&(C&&G.withConverter(C),m=Uh(G,h||{},p))})).catch((G=>(p.error&&p.error(G),()=>{}))),()=>{D||(D=!0,m&&m())}})(n,s,i,a,t[o])}if(s.bundleSource==="DocumentSnapshot"){let a=null;if(typeof t[o]=="object"&&Pi(t[o])){const c=t[o++];a={next:c.next,error:c.error,complete:c.complete}}else a={next:t[o++],error:t[o++],complete:t[o++]};return(function(l,B,h,p,C){let m,D=!1;return Gh(l,B.bundle).then((()=>{if(!D){const G=new be(l,C||null,z.fromPath(B.bundleName));m=Uh(G,h||{},p)}})).catch((G=>(p.error&&p.error(G),()=>{}))),()=>{D||(D=!0,m&&m())}})(n,s,i,a,t[o])}throw new k(S.INVALID_ARGUMENT,`unsupported bundle source: ${s.bundleSource}`)}function _L(r,e){r=ge(r,Se);const t=je(r),n=Pi(e)?e:{next:e};return cx(t,n)}function bo(r,e){const t=je(r);return ax(t,e)}function Wf(r,e,t){const n=t.docs.get(e._key),s=new cs(r);return new Ht(r,s,e._key,n,new er(t.hasPendingWrites,t.fromCache),e.converter)}function EL(r){return r=ge(r,Se),je(r),new qw(r,(e=>bo(r,e)))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IL(r,e){r=ge(r,Se);const t=je(r);if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return at("Cannot enable indexes when persistence is disabled"),Promise.resolve();const n=(function(i){const o=typeof i=="string"?(function(l){try{return JSON.parse(l)}catch(B){throw new k(S.INVALID_ARGUMENT,"Failed to parse JSON: "+(B==null?void 0:B.message))}})(i):i,a=[];if(Array.isArray(o.indexes))for(const c of o.indexes){const l=Sm(c,"collectionGroup"),B=[];if(Array.isArray(c.fields))for(const h of c.fields){const p=Sm(h,"fieldPath"),C=Xd("setIndexConfiguration",p);h.arrayConfig==="CONTAINS"?B.push(new xs(C,2)):h.order==="ASCENDING"?B.push(new xs(C,0)):h.order==="DESCENDING"&&B.push(new xs(C,1))}a.push(new Ki(Ki.UNKNOWN_ID,l,B,zi.empty()))}return a})(e);return hx(t,n)}function Sm(r,e){if(typeof r[e]!="string")throw new k(S.INVALID_ARGUMENT,"Missing string value for: "+e);return r[e]}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jw{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function yL(r){var s;r=ge(r,Se);const e=Nm.get(r);if(e)return e;if(((s=je(r)._uninitializedComponentsProvider)==null?void 0:s._offline.kind)!=="persistent")return null;const n=new Jw(r);return Nm.set(r,n),n}function wL(r){Kw(r,!0)}function DL(r){Kw(r,!1)}function TL(r){const e=je(r._firestore);fx(e).then((t=>U("deleting all persistent cache indexes succeeded"))).catch((t=>at("deleting all persistent cache indexes failed",t)))}function Kw(r,e){const t=je(r._firestore);dx(t,e).then((n=>U(`setting persistent cache index auto creation isEnabled=${e} succeeded`))).catch((n=>at(`setting persistent cache index auto creation isEnabled=${e} failed`,n)))}const Nm=new WeakMap;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AL{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return $f.instance.onExistenceFilterMismatch(e)}}class $f{constructor(){this.t=new Map}static get instance(){return Zc||(Zc=new $f,NP(Zc)),Zc}St(e){this.t.forEach((t=>t(e)))}onExistenceFilterMismatch(e){const t=Symbol(),n=this.t;return n.set(t,e),()=>n.delete(t)}}let Zc=null;const Om="@firebase/firestore",Fm="4.20.0";(function(e,t=!0){JR(Ys),mn(new gn("firestore",((n,{instanceIdentifier:s,options:i})=>{const o=n.getProvider("app").getImmediate(),a=new Se(new WP(n.getProvider("auth-internal")),new YP(o,n.getProvider("app-check-internal")),tP(o,s),o);return i={useFetchStreams:t,...i},a._setSettings(i),a}),"PUBLIC").setMultipleInstances(!0)),Ut(Om,Fm,e),Ut(Om,Fm,"esm2020")})();const uk=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Jf,AggregateField:io,AggregateQuerySnapshot:xw,BsonObjectId:yl,BsonTimestamp:wl,Bytes:Nt,CACHE_SIZE_UNLIMITED:Cx,CollectionReference:Cn,Decimal128Value:Dl,DocumentReference:be,DocumentSnapshot:Ht,FieldPath:ri,FieldValue:jn,Firestore:Se,FirestoreError:k,GeoPoint:pn,Int32Value:Tl,LoadBundleTask:Pw,MaxKey:Rn,MinKey:Pn,PersistentCacheIndexManager:Jw,Query:ct,QueryCompositeFilterConstraint:ai,QueryConstraint:To,QueryDocumentSnapshot:wa,QueryEndAtConstraint:mc,QueryFieldFilterConstraint:Ao,QueryLimitConstraint:Cc,QueryOrderByConstraint:$l,QuerySnapshot:qt,QueryStartAtConstraint:gc,RegexValue:bl,SnapshotMetadata:er,Timestamp:we,Transaction:jw,VectorValue:xt,WriteBatch:qw,_AutoId:Bl,_ByteString:Re,_DatabaseId:ar,_DocumentKey:z,_EmptyAppCheckTokenProvider:XP,_EmptyAuthCredentialsProvider:jI,_FieldPath:Ye,_TestingHooks:AL,_cast:ge,_debugAssert:zR,_internalAggregationQueryToProtoRunAggregationQueryRequest:Sx,_internalQueryToProtoQueryTarget:Px,_isBase64Available:XR,_logWarn:at,_validateIsNotUsedTogether:VE,addDoc:gL,aggregateFieldEqual:Jx,aggregateQuerySnapshotEqual:Kx,and:xx,arrayRemove:AS,arrayUnion:TS,average:jx,clearIndexedDbPersistence:Ix,collection:pS,collectionGroup:CS,connectFirestoreEmulator:ty,count:Gw,deleteAllPersistentCacheIndexes:TL,deleteDoc:CL,deleteField:wS,disableNetwork:Dx,disablePersistentCacheIndexAutoCreation:DL,doc:ny,documentId:HI,documentSnapshotFromJSON:Ax,enableIndexedDbPersistence:_x,enableMultiTabIndexedDbPersistence:Ex,enableNetwork:wx,enablePersistentCacheIndexAutoCreation:wL,endAt:Hx,endBefore:Ux,ensureFirestoreConfigured:je,executeWrite:bo,getAggregateFromServer:Uw,getCountFromServer:zx,getDoc:cL,getDocFromCache:uL,getDocFromServer:lL,getDocs:BL,getDocsFromCache:hL,getDocsFromServer:dL,getFirestore:mx,getPersistentCacheIndexManager:yL,increment:bS,initializeFirestore:gx,limit:Vx,limitToLast:kx,loadBundle:Gh,maximum:RS,memoryEagerGarbageCollector:Xx,memoryLocalCache:eL,memoryLruGarbageCollector:Zx,minimum:vS,namedQuery:Ow,onSnapshot:Uh,onSnapshotResume:mL,onSnapshotsInSync:_L,or:Fx,orderBy:Lx,persistentLocalCache:tL,persistentMultipleTabManager:sL,persistentSingleTabManager:Hw,query:Nx,queryEqual:Hd,querySnapshotFromJSON:bx,refEqual:gS,runTransaction:aL,serverTimestamp:DS,setDoc:fL,setIndexConfiguration:IL,setLogLevel:KR,snapshotEqual:Rx,startAfter:Gx,startAt:Mx,sum:qx,terminate:Tx,updateDoc:pL,vector:hy,waitForPendingWrites:yx,where:Ox,writeBatch:EL},Symbol.toStringTag,{value:"Module"})),zw="@firebase/installations",Qf="0.6.24";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ww=1e4,$w=`w:${Qf}`,Qw="FIS_v2",bL="https://firebaseinstallations.googleapis.com/v1",vL=3600*1e3,RL="installations",PL="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SL={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Ws=new Qs(RL,PL,SL);function Yw(r){return r instanceof un&&r.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xw({projectId:r}){return`${bL}/projects/${r}/installations`}function Zw(r){return{token:r.token,requestStatus:2,expiresIn:OL(r.expiresIn),creationTime:Date.now()}}async function eD(r,e){const n=(await e.json()).error;return Ws.create("request-failed",{requestName:r,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function tD({apiKey:r}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":r})}function NL(r,{refreshToken:e}){const t=tD(r);return t.append("Authorization",FL(e)),t}async function nD(r){const e=await r();return e.status>=500&&e.status<600?r():e}function OL(r){return Number(r.replace("s","000"))}function FL(r){return`${Qw} ${r}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xL({appConfig:r,heartbeatServiceProvider:e},{fid:t}){const n=Xw(r),s=tD(r),i=e.getImmediate({optional:!0});if(i){const l=await i.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={fid:t,authVersion:Qw,appId:r.appId,sdkVersion:$w},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await nD(()=>fetch(n,a));if(c.ok){const l=await c.json();return{fid:l.fid||t,registrationStatus:2,refreshToken:l.refreshToken,authToken:Zw(l.authToken)}}else throw await eD("Create Installation",c)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rD(r){return new Promise(e=>{setTimeout(e,r)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LL(r){return btoa(String.fromCharCode(...r)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VL=/^[cdef][\w-]{21}$/,Hh="";function kL(){try{const r=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(r),r[0]=112+r[0]%16;const t=ML(r);return VL.test(t)?t:Hh}catch{return Hh}}function ML(r){return LL(r).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ql(r){return`${r.appName}!${r.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sD=new Map;function iD(r,e){const t=Ql(r);oD(t,e),GL(t,e)}function oD(r,e){const t=sD.get(r);if(t)for(const n of t)n(e)}function GL(r,e){const t=UL();t&&t.postMessage({key:r,fid:e}),HL()}let Rs=null;function UL(){return!Rs&&"BroadcastChannel"in self&&(Rs=new BroadcastChannel("[Firebase] FID Change"),Rs.onmessage=r=>{oD(r.data.key,r.data.fid)}),Rs}function HL(){sD.size===0&&Rs&&(Rs.close(),Rs=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qL="firebase-installations-database",jL=1,$s="firebase-installations-store";let $B=null;function Yf(){return $B||($B=r_(qL,jL,{upgrade:(r,e)=>{switch(e){case 0:r.createObjectStore($s)}}})),$B}async function zu(r,e){const t=Ql(r),s=(await Yf()).transaction($s,"readwrite"),i=s.objectStore($s),o=await i.get(t);return await i.put(e,t),await s.done,(!o||o.fid!==e.fid)&&iD(r,e.fid),e}async function aD(r){const e=Ql(r),n=(await Yf()).transaction($s,"readwrite");await n.objectStore($s).delete(e),await n.done}async function Yl(r,e){const t=Ql(r),s=(await Yf()).transaction($s,"readwrite"),i=s.objectStore($s),o=await i.get(t),a=e(o);return a===void 0?await i.delete(t):await i.put(a,t),await s.done,a&&(!o||o.fid!==a.fid)&&iD(r,a.fid),a}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xf(r){let e;const t=await Yl(r.appConfig,n=>{const s=JL(n),i=KL(r,s);return e=i.registrationPromise,i.installationEntry});return t.fid===Hh?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function JL(r){const e=r||{fid:kL(),registrationStatus:0};return cD(e)}function KL(r,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Ws.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},n=zL(r,t);return{installationEntry:t,registrationPromise:n}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:WL(r)}:{installationEntry:e}}async function zL(r,e){try{const t=await xL(r,e);return zu(r.appConfig,t)}catch(t){throw Yw(t)&&t.customData.serverCode===409?await aD(r.appConfig):await zu(r.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function WL(r){let e=await xm(r.appConfig);for(;e.registrationStatus===1;)await rD(100),e=await xm(r.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:n}=await Xf(r);return n||t}return e}function xm(r){return Yl(r,e=>{if(!e)throw Ws.create("installation-not-found");return cD(e)})}function cD(r){return $L(r)?{fid:r.fid,registrationStatus:0}:r}function $L(r){return r.registrationStatus===1&&r.registrationTime+Ww<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function QL({appConfig:r,heartbeatServiceProvider:e},t){const n=YL(r,t),s=NL(r,t),i=e.getImmediate({optional:!0});if(i){const l=await i.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={installation:{sdkVersion:$w,appId:r.appId}},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await nD(()=>fetch(n,a));if(c.ok){const l=await c.json();return Zw(l)}else throw await eD("Generate Auth Token",c)}function YL(r,{fid:e}){return`${Xw(r)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zf(r,e=!1){let t;const n=await Yl(r.appConfig,i=>{if(!uD(i))throw Ws.create("not-registered");const o=i.authToken;if(!e&&eV(o))return i;if(o.requestStatus===1)return t=XL(r,e),i;{if(!navigator.onLine)throw Ws.create("app-offline");const a=nV(i);return t=ZL(r,a),a}});return t?await t:n.authToken}async function XL(r,e){let t=await Lm(r.appConfig);for(;t.authToken.requestStatus===1;)await rD(100),t=await Lm(r.appConfig);const n=t.authToken;return n.requestStatus===0?Zf(r,e):n}function Lm(r){return Yl(r,e=>{if(!uD(e))throw Ws.create("not-registered");const t=e.authToken;return rV(t)?{...e,authToken:{requestStatus:0}}:e})}async function ZL(r,e){try{const t=await QL(r,e),n={...e,authToken:t};return await zu(r.appConfig,n),t}catch(t){if(Yw(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await aD(r.appConfig);else{const n={...e,authToken:{requestStatus:0}};await zu(r.appConfig,n)}throw t}}function uD(r){return r!==void 0&&r.registrationStatus===2}function eV(r){return r.requestStatus===2&&!tV(r)}function tV(r){const e=Date.now();return e<r.creationTime||r.creationTime+r.expiresIn<e+vL}function nV(r){const e={requestStatus:1,requestTime:Date.now()};return{...r,authToken:e}}function rV(r){return r.requestStatus===1&&r.requestTime+Ww<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sV(r){const e=r,{installationEntry:t,registrationPromise:n}=await Xf(e);return n?n.catch(console.error):Zf(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iV(r,e=!1){const t=r;return await oV(t),(await Zf(t,e)).token}async function oV(r){const{registrationPromise:e}=await Xf(r);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aV(r){if(!r||!r.options)throw QB("App Configuration");if(!r.name)throw QB("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!r.options[t])throw QB(t);return{appName:r.name,projectId:r.options.projectId,apiKey:r.options.apiKey,appId:r.options.appId}}function QB(r){return Ws.create("missing-app-config-values",{valueName:r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lD="installations",cV="installations-internal",uV=r=>{const e=r.getProvider("app").getImmediate(),t=aV(e),n=qn(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:n,_delete:()=>Promise.resolve()}},lV=r=>{const e=r.getProvider("app").getImmediate(),t=qn(e,lD).getImmediate();return{getId:()=>sV(t),getToken:s=>iV(t,s)}};function BV(){mn(new gn(lD,uV,"PUBLIC")),mn(new gn(cV,lV,"PRIVATE"))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */BV();Ut(zw,Qf);Ut(zw,Qf,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wu="analytics",hV="firebase_id",dV="origin",fV=60*1e3,pV="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",BD="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Et=new Yu("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hD(r){return Promise.all(r.map(e=>e.catch(t=>t)))}function CV(r,e){const t=document.createElement("script");ed(t,`${BD}?l=${r}&id=${e}`),t.async=!0,document.head.appendChild(t)}function gV(r){let e=[];return Array.isArray(window[r])?e=window[r]:window[r]=e,e}async function mV(r,e,t,n,s,i){const o=n[s];try{if(o)await e[o];else{const c=(await hD(t)).find(l=>l.measurementId===s);c&&await e[c.appId]}}catch(a){Et.error(a)}r("config",s,i)}async function _V(r,e,t,n,s){try{let i=[];if(s&&s.send_to){let o=s.send_to;Array.isArray(o)||(o=[o]);const a=await hD(t);for(const c of o){const l=a.find(h=>h.measurementId===c),B=l&&e[l.appId];if(B)i.push(B);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),r("event",n,s||{})}catch(i){Et.error(i)}}function EV(r,e,t,n){async function s(i,...o){try{if(i==="event"){const[a,c]=o;await _V(r,e,t,a,c)}else if(i==="config"){const[a,c]=o;await mV(r,e,t,n,a,c)}else if(i==="consent"){const[a,c]=o;r("consent",a,c)}else if(i==="get"){const[a,c,l]=o;r("get",a,c,l)}else if(i==="set"){const[a]=o;r("set",a)}else r(i,...o)}catch(a){Et.error(a)}}return s}function IV(r,e,t,n,s){let i=function(...o){window[n].push(arguments)};return window[s]&&typeof window[s]=="function"&&(i=window[s]),window[s]=EV(i,r,e,t),{gtagCore:i,wrappedGtag:window[s]}}function yV(r){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(BD)&&t.src.includes(r))return t;return null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wV={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.'},jt=new Qs("analytics","Analytics",wV);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DV=30,TV=1e3;class AV{constructor(e={},t=TV){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const dD=new AV;function bV(r){return new Headers({Accept:"application/json","x-goog-api-key":r})}async function vV(r){var o;const{appId:e,apiKey:t}=r,n={method:"GET",headers:bV(t)},s=pV.replace("{app-id}",e),i=await fetch(s,n);if(i.status!==200&&i.status!==304){let a="";try{const c=await i.json();(o=c.error)!=null&&o.message&&(a=c.error.message)}catch{}throw jt.create("config-fetch-failed",{httpStatus:i.status,responseMessage:a})}return i.json()}async function RV(r,e=dD,t){const{appId:n,apiKey:s,measurementId:i}=r.options;if(!n)throw jt.create("no-app-id");if(!s){if(i)return{measurementId:i,appId:n};throw jt.create("no-api-key")}const o=e.getThrottleMetadata(n)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new NV;return setTimeout(async()=>{a.abort()},fV),fD({appId:n,apiKey:s,measurementId:i},o,a,e)}async function fD(r,{throttleEndTimeMillis:e,backoffCount:t},n,s=dD){var a;const{appId:i,measurementId:o}=r;try{await PV(n,e)}catch(c){if(o)return Et.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:i,measurementId:o};throw c}try{const c=await vV(r);return s.deleteThrottleMetadata(i),c}catch(c){const l=c;if(!SV(l)){if(s.deleteThrottleMetadata(i),o)return Et.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:i,measurementId:o};throw c}const B=Number((a=l==null?void 0:l.customData)==null?void 0:a.httpStatus)===503?rC(t,s.intervalMillis,DV):rC(t,s.intervalMillis),h={throttleEndTimeMillis:Date.now()+B,backoffCount:t+1};return s.setThrottleMetadata(i,h),Et.debug(`Calling attemptFetch again in ${B} millis`),fD(r,h,n,s)}}function PV(r,e){return new Promise((t,n)=>{const s=Math.max(e-Date.now(),0),i=setTimeout(t,s);r.addEventListener(()=>{clearTimeout(i),n(jt.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function SV(r){if(!(r instanceof un)||!r.customData)return!1;const e=Number(r.customData.httpStatus);return e===429||e===500||e===503||e===504}class NV{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qh;async function OV(r,e,t,n,s){if(s&&s.global){r("event",t,n);return}else{const i=await e,o={...n,send_to:i};r("event",t,o)}}async function FV(r,e,t,n){if(n&&n.global)return r("set",{screen_name:t}),Promise.resolve();{const s=await e;r("config",s,{update:!0,screen_name:t})}}async function xV(r,e,t,n){if(n&&n.global)return r("set",{user_id:t}),Promise.resolve();{const s=await e;r("config",s,{update:!0,user_id:t})}}async function LV(r,e,t,n){if(n&&n.global){const s={};for(const i of Object.keys(t))s[`user_properties.${i}`]=t[i];return r("set",s),Promise.resolve()}else{const s=await e;r("config",s,{update:!0,user_properties:t})}}async function VV(r,e){const t=await e;return new Promise((n,s)=>{r("get",t,"client_id",i=>{i||s(jt.create("no-client-id")),n(i)})})}async function kV(r,e){const t=await r;window[`ga-disable-${t}`]=!e}let jh;function pD(r){jh=r}function CD(r){qh=r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function MV(){if(Qu())try{await $h()}catch(r){return Et.warn(jt.create("indexeddb-unavailable",{errorInfo:r==null?void 0:r.toString()}).message),!1}else return Et.warn(jt.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function GV(r,e,t,n,s,i,o){const a=RV(r);a.then(p=>{t[p.measurementId]=p.appId,r.options.measurementId&&p.measurementId!==r.options.measurementId&&Et.warn(`The measurement ID in the local Firebase config (${r.options.measurementId}) does not match the measurement ID fetched from the server (${p.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(p=>Et.error(p)),e.push(a);const c=MV().then(p=>{if(p)return n.getId()}),[l,B]=await Promise.all([a,c]);yV(i)||CV(i,l.measurementId),jh&&(s("consent","default",jh),pD(void 0)),s("js",new Date);const h=(o==null?void 0:o.config)??{};return h[dV]="firebase",h.update=!0,B!=null&&(h[hV]=B),s("config",l.measurementId,h),qh&&(s("set",qh),CD(void 0)),l.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UV{constructor(e){this.app=e}_delete(){return delete Ln[this.app.options.appId],Promise.resolve()}}let Ln={},Vm=[];const km={};let gu="dataLayer",gD="gtag",Mm,Hn,Jh=!1;function HV(r){if(Jh)throw jt.create("already-initialized");r.dataLayerName&&(gu=r.dataLayerName),r.gtagName&&(gD=r.gtagName)}function qV(){const r=[];if(Wh()&&r.push("This is a browser extension environment."),Xm()||r.push("Cookies are not available."),r.length>0){const e=r.map((n,s)=>`(${s+1}) ${n}`).join(" "),t=jt.create("invalid-analytics-context",{errorInfo:e});Et.warn(t.message)}}function jV(r,e,t){qV();const n=r.options.appId;if(!n)throw jt.create("no-app-id");if(!r.options.apiKey)if(r.options.measurementId)Et.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${r.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw jt.create("no-api-key");if(Ln[n]!=null)throw jt.create("already-exists",{id:n});if(!Jh){gV(gu);const{wrappedGtag:i,gtagCore:o}=IV(Ln,Vm,km,gu,gD);Hn=i,Mm=o,Jh=!0}return Ln[n]=GV(r,Vm,km,e,Mm,gu,t),new UV(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JV(r=Xu()){r=ne(r);const e=qn(r,Wu);return e.isInitialized()?e.getImmediate():mD(r)}function mD(r,e={}){const t=qn(r,Wu);if(t.isInitialized()){const s=t.getImmediate();if(sn(e,t.getOptions()))return s;throw jt.create("already-initialized")}return t.initialize({options:e})}async function KV(){if(Wh()||!Xm()||!Qu())return!1;try{return await $h()}catch{return!1}}function zV(r,e,t){r=ne(r),FV(Hn,Ln[r.app.options.appId],e,t).catch(n=>Et.error(n))}async function WV(r){return r=ne(r),VV(Hn,Ln[r.app.options.appId])}function $V(r,e,t){r=ne(r),xV(Hn,Ln[r.app.options.appId],e,t).catch(n=>Et.error(n))}function _D(r,e,t){r=ne(r),LV(Hn,Ln[r.app.options.appId],e,t).catch(n=>Et.error(n))}function QV(r,e){r=ne(r),kV(Ln[r.app.options.appId],e).catch(t=>Et.error(t))}function YV(r){Hn?Hn("set",r):CD(r)}function ED(r,e,t,n){r=ne(r),OV(Hn,Ln[r.app.options.appId],e,t,n).catch(s=>Et.error(s))}function XV(r){Hn?Hn("consent","update",r):pD(r)}const Gm="@firebase/analytics",Um="0.10.26";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZV(){mn(new gn(Wu,(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return jV(n,s,t)},"PUBLIC")),mn(new gn("analytics-internal",r,"PRIVATE")),Ut(Gm,Um),Ut(Gm,Um,"esm2020");function r(e){try{const t=e.getProvider(Wu).getImmediate();return{logEvent:(n,s,i)=>ED(t,n,s,i),setUserProperties:(n,s)=>_D(t,n,s)}}catch(t){throw jt.create("interop-component-reg-failed",{reason:t})}}}ZV();const lk=Object.freeze(Object.defineProperty({__proto__:null,getAnalytics:JV,getGoogleAnalyticsClientId:WV,initializeAnalytics:mD,isSupported:KV,logEvent:ED,setAnalyticsCollectionEnabled:QV,setConsent:XV,setCurrentScreen:zV,setDefaultEventParameters:YV,setUserId:$V,setUserProperties:_D,settings:HV},Symbol.toStringTag,{value:"Module"}));export{nk as a,uk as b,lk as c,tk as i};
