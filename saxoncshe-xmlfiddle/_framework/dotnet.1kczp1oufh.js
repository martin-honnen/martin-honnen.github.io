//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"e2f47b0110ed922f21a1522da67279133ce28f32",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "SaxonCSHEXMLWorkbench",
  "resources": {
    "hash": "sha256-jPO+lyi3ML5Ke6TOvv8SJbghjpoMBflE/d/tegjaJJY=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.jzqpkm00im.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.zbexyp8zrs.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.i2sf21lyr1.wasm",
        "hash": "sha256-Jg4HOS1O94nCO11N2kSeg57cfFBp8Y/vqnkT12Cf4Hw=",
        "cache": "force-cache"
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.tjcz0u77k5.dat",
        "hash": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.tptq2av103.dat",
        "hash": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.lfu7j35m59.dat",
        "hash": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs=",
        "cache": "force-cache"
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.l4nao9l17b.wasm",
        "hash": "sha256-lf8bNUBMbJYeAqYxKK6pKywcrKELO2tVs32xlLoJd/M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.medmrps6zc.wasm",
        "hash": "sha256-XixsFCn5v+BuSGpwTcxKIIUs0XQtA8q67JToJ2S1rAo=",
        "cache": "force-cache"
      }
    ],
    "assembly": [
      {
        "virtualPath": "AngleSharp.wasm",
        "name": "AngleSharp.up7648hgwu.wasm",
        "hash": "sha256-kiD87S/tghFUydyHWNfGo1G3AnugOsqK5Y55LSHS43w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ICU4N.wasm",
        "name": "ICU4N.2qd4narb4g.wasm",
        "hash": "sha256-em2SGEfH4O4JqSvMezsykaO1ZWavU6fSdI1Ubwcd8rQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ICU4N.resources.wasm",
        "name": "ICU4N.resources.rbz6rh0bxo.wasm",
        "hash": "sha256-qWiUoNzNulXjxMl/WMlre4Xkbh4R65Ak6Voje7MQ0QQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "IndexRange.wasm",
        "name": "IndexRange.q7nix6q99n.wasm",
        "hash": "sha256-Br/3hM6QTQUavfZ8qQ8ZURdCxxN3AaDllpRbG3KRdxE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "J2N.wasm",
        "name": "J2N.6dr8k6xnd5.wasm",
        "hash": "sha256-dod/9JRTP7SvAD6NEceGDhEPo6JjxFmJlT03HTIwq9c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.1d9cvrsqmn.wasm",
        "hash": "sha256-ZcUsw0e+zvo6SFCzImS4+VhIXK10CUOvnbvtmqwVShk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.fxgjiqtx4w.wasm",
        "hash": "sha256-jRnxNdhFGA//GDUwQ9C9VJ0VPPX2w62ZQxoxAKTGqEA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.ldlm6mwpgv.wasm",
        "hash": "sha256-R8yJqde/jqObwW4sbPjVY1ETnzxdfVeGJZP8FMBilqI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Hosting.Abstractions.wasm",
        "name": "Microsoft.AspNetCore.Hosting.Abstractions.kb9z3q8jmd.wasm",
        "hash": "sha256-EBu0K8SFe/KbDl6H4PhdQZcfOWBAQS9MiNm+0jjq0xo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Hosting.Server.Abstractions.wasm",
        "name": "Microsoft.AspNetCore.Hosting.Server.Abstractions.wyr9zkt2c4.wasm",
        "hash": "sha256-KOdV8nnepJvdzz9YZQF2IiESUrXNx6nNMN2Uvhssmi4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.Abstractions.wasm",
        "name": "Microsoft.AspNetCore.Http.Abstractions.5jy9omvvsv.wasm",
        "hash": "sha256-7wgz1ZHwXmXV8y00xn+jT4BGeuCQQbVYGQl+PNvBfnQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.Extensions.wasm",
        "name": "Microsoft.AspNetCore.Http.Extensions.57zig84vjd.wasm",
        "hash": "sha256-sbIJEHnGL6std1HkIJ83mfNTk5yznrGRZbaacPDI5w4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.Features.wasm",
        "name": "Microsoft.AspNetCore.Http.Features.pqxjsc5k5q.wasm",
        "hash": "sha256-bzIPAVp+XhD63CRn9cVTB4tJRU+oDEAuwFYoHytMhUk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.StaticFiles.wasm",
        "name": "Microsoft.AspNetCore.StaticFiles.4ivrppu1sl.wasm",
        "hash": "sha256-xEq/1p41+Nng/s1Dmt9ZfQfCRupYpGS5Mfm+CsMNWyQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Caching.Abstractions.wasm",
        "name": "Microsoft.Extensions.Caching.Abstractions.6ztgan1fmh.wasm",
        "hash": "sha256-Pi6QOyL1//nvmQLsNmSdh2/FBTuC8TxXygAku5BjfLk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Caching.Memory.wasm",
        "name": "Microsoft.Extensions.Caching.Memory.z36lop5dsa.wasm",
        "hash": "sha256-L75YVpHeRGNcecmkU32VqphgLXWWRxF+3ZQOqMr0S/g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.vqg6lzww0m.wasm",
        "hash": "sha256-RzvF7Ck7ZUxkaPd1hDbQv+BZfbwuXgRbnm1QDUf//n8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.2nequ1jgxk.wasm",
        "hash": "sha256-YoGurfTWvOz6CujlEtdHIxgMqRc8ZGjDSGaG7IIwcL4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.FileExtensions.wasm",
        "name": "Microsoft.Extensions.Configuration.FileExtensions.dbib1xhsfg.wasm",
        "hash": "sha256-h/kwne1ft6epM1YztYpIbQcqW/0hon/gv4YIOlEAypM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.1rw2gzqai7.wasm",
        "hash": "sha256-s1ErRCGcdX/elOMBBgMqyQnWLlFOYFZx+c7NTwr0TWQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Xml.wasm",
        "name": "Microsoft.Extensions.Configuration.Xml.87ep04lo8t.wasm",
        "hash": "sha256-3AsF+HDea5SK0YOVBDvrP/caNoXa4zKRxJi32P+JfCU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.b9mcrj62ry.wasm",
        "hash": "sha256-Uf2OoF4AD/nB8bEP9+Vtasx3otZscbwOarFh3Uu7bQI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.rr5m0wu5v5.wasm",
        "hash": "sha256-SZlteeaC56SePJKjOm7dGMVqf9tcg5o8GG+g7+MXSlY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Abstractions.wasm",
        "name": "Microsoft.Extensions.FileProviders.Abstractions.rg13fhe05d.wasm",
        "hash": "sha256-K13zbZsuapVMtVRxK8z99kMl0uvoMhXgaCUWYyQxIYY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Physical.wasm",
        "name": "Microsoft.Extensions.FileProviders.Physical.2u7jk43vqg.wasm",
        "hash": "sha256-lj3WHxsUdX7VIXJECD2jF4450txizPa94h8/hxgD+1o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.FileSystemGlobbing.wasm",
        "name": "Microsoft.Extensions.FileSystemGlobbing.7eil2p354w.wasm",
        "hash": "sha256-XwbVkRtMletFNqiC36VMGJwvPV0qYuRHTkN34bhgrbA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.vqiumbbk2y.wasm",
        "hash": "sha256-mbNEmfqRHcXa1eXIsnSfoKUSC1/ZdphrzRhl3iZFUjU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.rrpvsi20l8.wasm",
        "hash": "sha256-ySdpTedTgUbsxHfyv+9trnPz9lnAxZDT+xFDC7iER0U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.7f85fudcxr.wasm",
        "hash": "sha256-Hc9A5YIXypiP2nVW0afzJORCuE6/Et8IZe7B0C2PxXo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.z3bpax8f41.wasm",
        "hash": "sha256-f7Inb0yw9yp0EX2kqzRUY9/faUDqImUwZDT9O8pLgfc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.WebEncoders.wasm",
        "name": "Microsoft.Extensions.WebEncoders.vzzjoxjizn.wasm",
        "hash": "sha256-Bdf9d9pn2Uq2eIqSFAduDgy/genNDe0U87Tc6tyw3fY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.mnwds181lv.wasm",
        "hash": "sha256-bhm2ukyDghndCFOzqpXWj3O52p1Y/wu5bVpMoNjiJXI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.5ydn64ly88.wasm",
        "hash": "sha256-Xcxd+z/8v1MjYI/6IsNgJ46ifV38aKmiGyz4RR+L0ms=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Net.Http.Headers.wasm",
        "name": "Microsoft.Net.Http.Headers.vhfw8f9f40.wasm",
        "hash": "sha256-jfXK+cfJd/PteHB+5Bay/NDY9b9VLvVw6G/Bm262Lpo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NLog.wasm",
        "name": "NLog.bqjm7fylnu.wasm",
        "hash": "sha256-Y3BtmwEVUhhom1zEskgxRlFvdWFy7PWKJQ3WsxnW+Rg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NSec.Cryptography.wasm",
        "name": "NSec.Cryptography.4bkrgyjgtq.wasm",
        "hash": "sha256-cFjBqIYlayC5sOq+0r/uFfrPN5DH6/TJbas17hJ9y30=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SaxonCS-HE.wasm",
        "name": "SaxonCS-HE.i5y53z3xyg.wasm",
        "hash": "sha256-JvsqpAiS97lB9foMJqI0FiPCSce6Xp4GmmQmIqwRopY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Singulink.Enums.wasm",
        "name": "Singulink.Enums.i4ebciv360.wasm",
        "hash": "sha256-vh9Rhnt16jvfqJVFx+lmkw8INwjEgNjyL/M96vw68Go=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Singulink.Numerics.BigDecimal.wasm",
        "name": "Singulink.Numerics.BigDecimal.q0qoiyg3zj.wasm",
        "hash": "sha256-unOD41uoboc8u7fWJ7AKuvBpCiWz5eNX/IcuXAGbeKQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Singulink.Numerics.BigIntegerExtensions.wasm",
        "name": "Singulink.Numerics.BigIntegerExtensions.z6v580saz3.wasm",
        "hash": "sha256-1YprgH1iTOSGhymslFPH2TRPOyYPcZFuDKsa2TIuKQA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Packaging.wasm",
        "name": "System.IO.Packaging.tf6qgvxup5.wasm",
        "hash": "sha256-GR+wmxgwOIgg/1z4SNBlGC8QAwKTdDGPGrXBr/3ZvzQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Pkcs.wasm",
        "name": "System.Security.Cryptography.Pkcs.6flgg1zzob.wasm",
        "hash": "sha256-cnSW6k+nE1J9Sj8TIY9zQLousLDn5XYP069MC7MUH6k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Xml.wasm",
        "name": "System.Security.Cryptography.Xml.f8geel6fa2.wasm",
        "hash": "sha256-UVQtNRujPEia2MZ0hmFflf7Y36NMd/CI85RSH7pAVNY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "XmlResolver.wasm",
        "name": "XmlResolver.72qbi8dss7.wasm",
        "hash": "sha256-UWV6nkhenSCzNMmi42NrGUeqZmXNl3QPOxLRigLfEdE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "XmlResolverData.wasm",
        "name": "XmlResolverData.kbtpqnnv83.wasm",
        "hash": "sha256-UFnmtrvRZLWC6zrldDsN8r17mQVFabIVaXv5pXkH4EM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.szbpba64o9.wasm",
        "hash": "sha256-CERqfO73WpfM4Zr+CvsMpMB1PH+9Z848WxKdV6xrz2E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Buffers.wasm",
        "name": "System.Buffers.btmwue87xb.wasm",
        "hash": "sha256-ga5ZjqahvbTg3fgvXaJf0niy9awi+WePtQm5p/VIRrY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.9p4mai86wn.wasm",
        "hash": "sha256-s2xWcHxnKxm+4dHm0NUpjK1grHGHBDbI17S2oPGKYtY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.frup90mukn.wasm",
        "hash": "sha256-BQ8AsTcGw0SkCJbEPmRrN4bmkZqXj+VXkoIEU5B0NU0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.1indd7ur1c.wasm",
        "hash": "sha256-OQEXuW55d4FUfqTz1e6T+mvVXTI6uWhWd47df5FJ2eo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.ngrp5fo5cc.wasm",
        "hash": "sha256-uScRRcOHCQGxf0HnyDsqUHM2J4czk6J5peUmKMPZsCg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.0bfbjv0q1m.wasm",
        "hash": "sha256-PHGUf1EOk3ZZDfIyWfaYm4GNAyw4iUkBZZxSb3o34ms=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.rpg7psbgxq.wasm",
        "hash": "sha256-X6myAlfbn55/4GpxKGpMoMJ7mmdMRO7Mv+1WwqTbN58=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.ylpxseu3h2.wasm",
        "hash": "sha256-5jNSu2FmpRUOWLZiaIIbk+v9thudwAJIrTTnfQ0YOgQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.tpqldnnl29.wasm",
        "hash": "sha256-gROd1mGPH8FaEgzh0nUJBEL8MD/doQc5GIW6YJYD3W4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.lf07mdhpz3.wasm",
        "hash": "sha256-8XfG4cwJKV8jGE3IZxrSkniQxagVOmALGx8fCusDTcE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.xnt6ywsfr0.wasm",
        "hash": "sha256-U8KY6F2pyDyKdEWuw65DgT40dYeX8OjAGwZJn1g8ObE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.gpjrhhbi40.wasm",
        "hash": "sha256-hGEG5z/RpOcjnpj2yyK/w8RL4tc1K/KFHa5iPKq+QBg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Process.wasm",
        "name": "System.Diagnostics.Process.q7acjz7dov.wasm",
        "hash": "sha256-SjJFXAQjESiGqIWWk7Ttha8JiAIAD3GDRJaj9Cq3lAo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.StackTrace.wasm",
        "name": "System.Diagnostics.StackTrace.bj9yel8vbs.wasm",
        "hash": "sha256-ORkEeVx9W77yrQvYgXrlDot9DvTQBC7gJ1y5wuK1Y5I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.efkm3qtkz4.wasm",
        "hash": "sha256-6mt2l92OIgMYDrdSLoNn3O9aQ4l5u4T5xVk77ednDCo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.ycx8qnege6.wasm",
        "hash": "sha256-4lACzDRn9WsgIAX8pDVVMdD2iIJ/i3enbRfbYPEYY4k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.ZipFile.wasm",
        "name": "System.IO.Compression.ZipFile.o52msftuqu.wasm",
        "hash": "sha256-lMNQN03hDkrJ2q3jYYt7/lavVVDDmivpIhipstv487E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.azdwshr0s9.wasm",
        "hash": "sha256-xj6wK/vEuDZPnl972lTPvlRn8jLmukQkR4KJqWeO/XQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.Watcher.wasm",
        "name": "System.IO.FileSystem.Watcher.gtx2qlctty.wasm",
        "hash": "sha256-tOXyzRxYop1LgPA1aFkhLJEoX4x6iGK+m5ssHnATQ+Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.ly4euihxfx.wasm",
        "hash": "sha256-ncYDHgFogrFtGy6E+Ppa66y2We/nMRtOphky/XgxlJM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.9azjszgsci.wasm",
        "hash": "sha256-YUHUP3fb8mUiEFOdfQqM/stc3OxmfyDdEIl8P1n6F5o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.widqfwhv9x.wasm",
        "hash": "sha256-+IW+9dQNZHV88ke41aHdCTEQJ9pPyvIfKIlMMHUNQ7Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.c07o144cuo.wasm",
        "hash": "sha256-fKqaK1q6ZZJgj4zDI0QQbm/fKCjSVV/l/xFpiVhEHFI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.hyp4iiocy1.wasm",
        "hash": "sha256-l0nFxNZqJ3C3R9TyOjjy1xA6ga5cd76F8yS5PV0y+sI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.Json.wasm",
        "name": "System.Net.Http.Json.4ykyexm57b.wasm",
        "hash": "sha256-jDCkY6KNSrgnpzBtMn1h5dImTyqX0wRk+JKBU8mTSOo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.4o9r7qvh9g.wasm",
        "hash": "sha256-tKiZ9ohW3tljovBjT7mDqmXlw0WEoGg1h8VcT9kVeKk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.350e0t83r1.wasm",
        "hash": "sha256-yTMPPsZCdWe4gCDEaf+bLcDrpRe/1greh15AoU9WklU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.io6m84ihl5.wasm",
        "hash": "sha256-UsOxsfIFzEg3j6707f2huxSmprisxlJCN/eIldsDQnQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.ServicePoint.wasm",
        "name": "System.Net.ServicePoint.p11m6ppm32.wasm",
        "hash": "sha256-zYhAMY7jDllcdSWVGfIAir48x4bFZ84ALjObWCY7xcU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.k1eyosw4ys.wasm",
        "hash": "sha256-mIPm3LD9w7J1vTwuvICujGmrfmUul9jhoz7yfUmUnxc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebSockets.wasm",
        "name": "System.Net.WebSockets.kxyiex25vy.wasm",
        "hash": "sha256-WNPvF443uTMWog6lP5ValbwxOO+/8PFFZPAO722VxAA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.c3da2ecrw3.wasm",
        "hash": "sha256-yBrxpe4hzUtQTGpplwTbd3Z+Uw4eBi79SKcxAtuCcjE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.31iki23sq3.wasm",
        "hash": "sha256-R2JTflIXboMm9562TOgtNRHKtOht6tJ1OOxBJfKHDXM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.ubu8fvuqqv.wasm",
        "hash": "sha256-dgkjtoTRPxDmMWUN/5B3oTgze3wqTKzyB2jYKQ+WVAw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.t4w2b8geta.wasm",
        "hash": "sha256-02URjJNVJC2KXp+zOdPH6m6LszkzLnzl/N5iy96ZYrc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.Unsafe.wasm",
        "name": "System.Runtime.CompilerServices.Unsafe.qcdw6vqpki.wasm",
        "hash": "sha256-mo2y/v+zey8ez/bm9LFCX3trJwiFNnnfzdR0LIXvhuw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.2kutdn9fz6.wasm",
        "hash": "sha256-8niPYPdvmuxs3t+oB+mno9R7GBMKpgVrg6xc7fadgPs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.yamj867hb0.wasm",
        "hash": "sha256-VngekajvAA2o1FwneuOcn76IUT90usS2xkzz8mz5NGo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.38ebnf81tw.wasm",
        "hash": "sha256-w+/ol6LFrBw9+2S56soV9YatmYnrwLbX+PYOTm5f3mU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.AccessControl.wasm",
        "name": "System.Security.AccessControl.eukov1z6wy.wasm",
        "hash": "sha256-eq08xZIsd1OuFlWu/KLPoNWFkZtY0NcqyK+W2qCErvo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.jyaqggeh0u.wasm",
        "hash": "sha256-+ykEVT74Aqkh7TBlG8noMpHjKUJU+OFmiDUsH6M9CqA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.2cmnuppiuv.wasm",
        "hash": "sha256-Lj3xmo8a//muHE8RPyqdikdI5ayq8I2TBhLNLaSHOWY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Primitives.wasm",
        "name": "System.Security.Cryptography.Primitives.0tgbt6t75x.wasm",
        "hash": "sha256-1M4wbOPbpbN8MebmbpONjRlYuMW3i0yOk7aUFGlyoyw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.ydi7ewgmdn.wasm",
        "hash": "sha256-1ibEVr/wlfkMgfOSWDTHvL6ssxYHKb+QC3kAno3+5G8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.CodePages.wasm",
        "name": "System.Text.Encoding.CodePages.aqa1m562nr.wasm",
        "hash": "sha256-ktbjLQGD62N/yFiwVMjhIDmsErpQBp54nyXZYoceYhQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.in49851766.wasm",
        "hash": "sha256-MnR2ktnyojiy+TFJkCQDotcLoVA3eBA6KeY6TJ+L6g8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.s1gvld282r.wasm",
        "hash": "sha256-AAw5MK5inf9SV1xydDDiOpA/CRCUEcRDnDph9e7P7EQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.zgvtvldvd6.wasm",
        "hash": "sha256-bTiuyu1Yn2Gwl/UcIXvlA5yBF9JLanry2dB1n23zjmA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.ul63czseu0.wasm",
        "hash": "sha256-zoOKBEkGTCDBePvDEWcQcQKdvZut7gXkI1yJPiWQjXI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.86f7u5c1f9.wasm",
        "hash": "sha256-kFqBUbmVg/Ut7Ryao8b0g5Icx3PlqeV2ZlSyjKqKxqI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.0xarh0miue.wasm",
        "hash": "sha256-BAGJk0Su7p5sZjYpCEruM3jAowzHF3B0ierhDUSUJfo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.qykanit10k.wasm",
        "hash": "sha256-opfnEVMkOYtHBF5c+RFoe6ZNGYV49IiCwa0eiiN74GE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.1h5i8a3bq8.wasm",
        "hash": "sha256-y7NnWh8z8gPuKAQI4hhBL69y2e7NlYbHZDvyDbFBTHI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "mscorlib.wasm",
        "name": "mscorlib.ojzmpzedjd.wasm",
        "hash": "sha256-jF3nbrSlikjziokoZBFtvlAOaWPVfkPdR435DSv8e2g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.2xtohjcbw4.wasm",
        "hash": "sha256-dgrRolf8oXgjeDPJv/oQvpQIMRp6actbExy78uyNyGY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SaxonCSHEXMLWorkbench.wasm",
        "name": "SaxonCSHEXMLWorkbench.d7kwlyzevr.wasm",
        "hash": "sha256-tyRTry7GyUSBj/CWF6zbUEexgdBSJonN9+8mdHIfYGY=",
        "cache": "force-cache"
      }
    ],
    "satelliteResources": {
      "af": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.k73kqt4e7y.wasm",
          "hash": "sha256-wATg23V9lCnJoKJJUzTEDy3nhg1Tsp72eYaGT5j5YcI=",
          "cache": "force-cache"
        }
      ],
      "agq": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.pfgfkcjkgu.wasm",
          "hash": "sha256-9XQe2Z5cIDs/NMU/c5kmVHgF+5yx7VzS7fYNqSwGvII=",
          "cache": "force-cache"
        }
      ],
      "ak": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.tjcua80qyl.wasm",
          "hash": "sha256-93qskk6XwvHo+ihl+jcyWXctiZo9MfCxIBpTk7kH6r8=",
          "cache": "force-cache"
        }
      ],
      "am": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.djcofm7tpi.wasm",
          "hash": "sha256-h3MMLjF/8a+93NnwuVCJuMYg7MWwIoCZaJpPOB9f7tY=",
          "cache": "force-cache"
        }
      ],
      "ar": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.s0f3hlsz7p.wasm",
          "hash": "sha256-NOy2twd+etfgtBml/8d+Cft8BSkK/E0lg9hxuJRcy0M=",
          "cache": "force-cache"
        }
      ],
      "ars": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.4bp517gats.wasm",
          "hash": "sha256-oFPLvOLGniWjknhk5Ju6ykETJedRSACC+WY/4/o4eSk=",
          "cache": "force-cache"
        }
      ],
      "as": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.9kd9e9k9ll.wasm",
          "hash": "sha256-F0H8m1pZbGvVji937qzbD2XwhM78vpv2j4Xa3SaqrQI=",
          "cache": "force-cache"
        }
      ],
      "asa": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.j71vvzod7q.wasm",
          "hash": "sha256-IT3Zq5mgs5KzBynv1/xzsGdkWiSlFK/zdjO8tB/WGoo=",
          "cache": "force-cache"
        }
      ],
      "ast": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.elx15xjtxv.wasm",
          "hash": "sha256-UhkZhliVgd18QQqiYHGu+YMmdvr9lhaSadXI0uhqllU=",
          "cache": "force-cache"
        }
      ],
      "az-Cyrl": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.2xuq8osigl.wasm",
          "hash": "sha256-+jh2aS/XWobTkrnB9ijdUqQbLMbUc1xH5z0D9y9KYD8=",
          "cache": "force-cache"
        }
      ],
      "az-Latn": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.0ifr6yns0q.wasm",
          "hash": "sha256-OIXYMJ/4S2Y6aKbTKlrFLsFbCCh/YClk8I4oqFuVgSY=",
          "cache": "force-cache"
        }
      ],
      "az": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.s0m4jdwrjv.wasm",
          "hash": "sha256-hLCpCMRcVzS3j4P6Fy7AZVtFqRHBYXmh9kJiA9HjPUI=",
          "cache": "force-cache"
        }
      ],
      "bas": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.r6dj9pt7jf.wasm",
          "hash": "sha256-ffk5M0T0Nhi5DsMemFFMo879ZosxUUaMOhvt/a4Y6ns=",
          "cache": "force-cache"
        }
      ],
      "be": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.4on0q88qvn.wasm",
          "hash": "sha256-1PF1E3be6+8+nHBKAZA7hjWer+O6s7pWpAjyit9T96k=",
          "cache": "force-cache"
        }
      ],
      "bem": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.g9nua5ifnv.wasm",
          "hash": "sha256-vNB8aDoiXZ2os2jloCgi0PT8uzJmxLCyA4spWxD+csI=",
          "cache": "force-cache"
        }
      ],
      "bez": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.nr3vcbevqz.wasm",
          "hash": "sha256-LaOeQdGn+tXHKVrnuATJsISMGVU5AOhPIbXnbb+jsNU=",
          "cache": "force-cache"
        }
      ],
      "bg": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.ubafa27mkp.wasm",
          "hash": "sha256-9puUcHZ6QvWOqB0wSU89YI/Et6sjQBrtkHexyJna0RE=",
          "cache": "force-cache"
        }
      ],
      "bm": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.5nfzujnz67.wasm",
          "hash": "sha256-D4zcjxzMCzLT/STEXX/zo+cGsIuSdIEKY2w3r0WjpPI=",
          "cache": "force-cache"
        }
      ],
      "bn": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.de161n4ndw.wasm",
          "hash": "sha256-a1bc5wPuRrvfixgOK+6VRH99gmKupwB9Z49d4kzGC2o=",
          "cache": "force-cache"
        }
      ],
      "bo": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.uk4qc9hnmr.wasm",
          "hash": "sha256-Ukbwp+wtO1j0kM5tgjKyA1tbhWUeK0Zp1duj/qEGG0s=",
          "cache": "force-cache"
        }
      ],
      "br": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.i25pp61w0p.wasm",
          "hash": "sha256-6oZN22zrLONO7pV7mLmWczrac3vl6htNkM/PnRBQJzg=",
          "cache": "force-cache"
        }
      ],
      "brx": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.am74p6ftwj.wasm",
          "hash": "sha256-bj9RzQlN0UvaRpvf/KMDDF2B8Lw8K+dGqx8VECBcdoE=",
          "cache": "force-cache"
        }
      ],
      "bs-Cyrl": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.xdvqf9pvi8.wasm",
          "hash": "sha256-m1tYjZZPCy+gprB+OxvnfBoHo6BrW3Nl2o/bXmz1PhA=",
          "cache": "force-cache"
        }
      ],
      "bs-Latn": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.sp4gn7ip3y.wasm",
          "hash": "sha256-4M7B/+4I7KQWNUBnKPmstmjCGdZxRDLwEgd9Fy1AAFE=",
          "cache": "force-cache"
        }
      ],
      "bs": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.idsccds0y0.wasm",
          "hash": "sha256-WkUBLqVG826VvYud4WiqxdOYFKhSMhR30XHFeNyNoZA=",
          "cache": "force-cache"
        }
      ],
      "ca": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.9de2zaytcx.wasm",
          "hash": "sha256-w3/FiBLzHxmC4ulx/T2gfuJAce8JL3tAZ0jvmZt8r4g=",
          "cache": "force-cache"
        }
      ],
      "ccp": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.ypq6779oem.wasm",
          "hash": "sha256-OsB5Ipr6HlK9YXv5NaMC1Tzpm9lmzqXTlpdn9kLbKoA=",
          "cache": "force-cache"
        }
      ],
      "ce": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.quxf9qjmk2.wasm",
          "hash": "sha256-3qXlicxFyACBP8S+bliCPOJkZwOMOYYpnIS8DncIwb0=",
          "cache": "force-cache"
        }
      ],
      "cgg": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.3wcw3xen7p.wasm",
          "hash": "sha256-vU/nwFPAleT+BKTx4MzqJMzi884EtHAOdy4edVIWkXM=",
          "cache": "force-cache"
        }
      ],
      "chr": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.xryao7isqb.wasm",
          "hash": "sha256-c31Ccnmjmh3+5fCM7acRckZiI/Mc7/z+xix61mwLwQE=",
          "cache": "force-cache"
        }
      ],
      "ku": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.mhjkci4ji4.wasm",
          "hash": "sha256-VkzhUTC6MBXV4qhy8hikO0X6H0pTNLBtJl94m/4AnpY=",
          "cache": "force-cache"
        }
      ],
      "cs": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.9e4ud34wg0.wasm",
          "hash": "sha256-PzVpDOqSLYy+IzcZO4/J7U6K4ErtVP7cpvByhD51TG0=",
          "cache": "force-cache"
        }
      ],
      "cy": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.mpd4wi57bf.wasm",
          "hash": "sha256-atZsMyWiJgwF4mMhWdJ6Ve9iobJ8rpaK9cXgZ5fyw5M=",
          "cache": "force-cache"
        }
      ],
      "da": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.l7tvgt13lr.wasm",
          "hash": "sha256-X+bPVQL0sY2JKLnrUDZsnXZuvUfAAKLKp+pjqL08iks=",
          "cache": "force-cache"
        }
      ],
      "dav": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.86lel6g75l.wasm",
          "hash": "sha256-UNA9eQ5jKRXL1HahR3adY2mHe43gwERU7BTMNpqL4FY=",
          "cache": "force-cache"
        }
      ],
      "de": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.tbsc5rw60t.wasm",
          "hash": "sha256-l/T7Iuv41myAsVL6471q5tAAYi7wVeqEXUe6B4ym2pI=",
          "cache": "force-cache"
        }
      ],
      "dje": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.jteynhad6e.wasm",
          "hash": "sha256-h7o4NMyyn5keYQGEMteHK36+AdlJdjuESWJJ6ZXbnMo=",
          "cache": "force-cache"
        }
      ],
      "dsb": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.z4eof00hvs.wasm",
          "hash": "sha256-bfO85Z5f9xDrn33398e+8KD4RFFvjsE/dkPe9d1B9Gg=",
          "cache": "force-cache"
        }
      ],
      "dua": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.0ol9jr2b0x.wasm",
          "hash": "sha256-8PQLJu/4IyV7kFuIaeQiuyH57iP8P6M4lxs5apq7a3w=",
          "cache": "force-cache"
        }
      ],
      "dyo": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.g78gu2xj7b.wasm",
          "hash": "sha256-jIMk0QWmBHMgCETkX7ZvinyBE23TIqebT/QM/I/4++k=",
          "cache": "force-cache"
        }
      ],
      "dz": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.7fbb9zaw46.wasm",
          "hash": "sha256-k8N9A1RucSZW2WOGQTfBlJe5XuawUEbJCj5jAZuUXcs=",
          "cache": "force-cache"
        }
      ],
      "ebu": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.vpty6dfb19.wasm",
          "hash": "sha256-DWtvv7PrH/Hgq3x+MUKeLNaA3h1R+I4qUXteyekrcQM=",
          "cache": "force-cache"
        }
      ],
      "ee": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.vl0yvb64a0.wasm",
          "hash": "sha256-kyLV0eeEGSdgemUez8e+2iumwe/PREIm6a1tYEz714k=",
          "cache": "force-cache"
        }
      ],
      "el": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.tibzj2po5m.wasm",
          "hash": "sha256-FfDAKE86ep0XPsUAsznN53ORt/A4fjqaTSJbnavAqX8=",
          "cache": "force-cache"
        }
      ],
      "en": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.o5d19tf8ji.wasm",
          "hash": "sha256-3CUr0Y9o6h454smiioeYVnifiXy2dsPYxLh/LnSRdwc=",
          "cache": "force-cache"
        }
      ],
      "eo": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.p1t2ozjfua.wasm",
          "hash": "sha256-c4wIBMLoffzBA42i8XNfFf5D3wMBizjVtx7h4SI0G6I=",
          "cache": "force-cache"
        }
      ],
      "es": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.axj0yf4g3r.wasm",
          "hash": "sha256-3qKWpD+Yb4o8n0NHiAQdQ1EAac65NiDETFy6arkeRs8=",
          "cache": "force-cache"
        }
      ],
      "et": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.4m703jv0k0.wasm",
          "hash": "sha256-dNrB6nm6zievkBNKgvoP7Zj5KlP0ml1dcU8vBCKyh3E=",
          "cache": "force-cache"
        }
      ],
      "eu": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.mb9djssgsq.wasm",
          "hash": "sha256-jux3T2YNyuLJw6jzocoaXBJ9ZCdybuvcNJJkktwuamc=",
          "cache": "force-cache"
        }
      ],
      "ewo": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.l8jz7bjl1t.wasm",
          "hash": "sha256-29BvfC0KJt6P0iPnlFEF0qB/x/oWpWu6khOEeOUhDUA=",
          "cache": "force-cache"
        }
      ],
      "fa": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.hgex5vpcaa.wasm",
          "hash": "sha256-j6fYBWOxQLq444SH9BKB9hHGpzF6tQZFQle8SzgsXws=",
          "cache": "force-cache"
        }
      ],
      "ff": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.7nivl3g3ii.wasm",
          "hash": "sha256-I1HWe44Hf4pSpv7TJq/97Qrns1H+94P3pupAgSio4y8=",
          "cache": "force-cache"
        }
      ],
      "fi": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.4pt551owgn.wasm",
          "hash": "sha256-mG5sMTcpa3x6yls+lo6xsUsr2c+mtkJdT0SVr1vCPpI=",
          "cache": "force-cache"
        }
      ],
      "fil": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.6lngp81gme.wasm",
          "hash": "sha256-asSS2GnZsLBsO8B8OdR7vmhX1KXAwiNQPRD0/urOU8g=",
          "cache": "force-cache"
        }
      ],
      "fo": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.ljoc9sjn7h.wasm",
          "hash": "sha256-QZC6hj5Z4vMzF7lwXReZJmswsQ8/DgUe9poJU/kVKW8=",
          "cache": "force-cache"
        }
      ],
      "fr": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.44kmzr4kqq.wasm",
          "hash": "sha256-VJ4LBIIy3qJchLteWJ0yDHbMyCzQN3F0LzHiAMijgzc=",
          "cache": "force-cache"
        }
      ],
      "fur": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.5w6hvkcp9j.wasm",
          "hash": "sha256-23Pm8xixxHWdSCn5XowoFbJwYN4XrlPHW3KzO9jjgXE=",
          "cache": "force-cache"
        }
      ],
      "fy": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.kux0quw6yb.wasm",
          "hash": "sha256-pEIwtX9tQLOrj9WoZ5+KzOe3zbZrK4gIXl1aZR/zz5k=",
          "cache": "force-cache"
        }
      ],
      "ga": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.8ezk40vhy8.wasm",
          "hash": "sha256-MKQMvQ+cUIJ715lcBdyrFuY+i1FxCj3sn4Ewan6QSmc=",
          "cache": "force-cache"
        }
      ],
      "gd": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.xdwyv8nsaw.wasm",
          "hash": "sha256-ixhUIIVeTpvVwhEbmqDDG0C95HXyDzCUuv/VkAG9HbQ=",
          "cache": "force-cache"
        }
      ],
      "gl": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.bygkgv40vo.wasm",
          "hash": "sha256-LUGyJYDD8IL6f0iB5DFr9+HCyiNP3vDBhrXz59PYa3k=",
          "cache": "force-cache"
        }
      ],
      "gsw": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.j1cipt78la.wasm",
          "hash": "sha256-d8rKSdxqtwIr7jOBdgtX5nLIdX4ZTBpwafWDyi9v41w=",
          "cache": "force-cache"
        }
      ],
      "gu": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.e70v3d2ed9.wasm",
          "hash": "sha256-yukzVTHGoSsG06Hgc06xTHrhCZMQjtyuoz2jd17kbiU=",
          "cache": "force-cache"
        }
      ],
      "guz": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.ov5zyn5cu5.wasm",
          "hash": "sha256-fInylOQeIiWz+cHWc26lc8mKWQCrst/pxzNLHcrikes=",
          "cache": "force-cache"
        }
      ],
      "gv": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.fo16ky79p2.wasm",
          "hash": "sha256-/1kJVTF3faJeKdKjd6gUCiMc78QwB5Acvb1Mg3INLJY=",
          "cache": "force-cache"
        }
      ],
      "ha": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.klywx111ig.wasm",
          "hash": "sha256-2NMARC/XpuzltQ1B3+fiM4wX8tedEPFHS2o6YNRpxQc=",
          "cache": "force-cache"
        }
      ],
      "haw": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.ogaaqervfe.wasm",
          "hash": "sha256-iOpRtIX8zIrpURJwwopeU8Jszb2vonBcvxFOaY0EvN4=",
          "cache": "force-cache"
        }
      ],
      "he": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.v0x23vnr9d.wasm",
          "hash": "sha256-rwLBqLCX3hUYov0ucZiTVk4KlEQZBHXn3jeliuQ0A1Q=",
          "cache": "force-cache"
        }
      ],
      "hi": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.s6i9xw2h0s.wasm",
          "hash": "sha256-VGXJokJAwxBghPw0/JN+6egCoEPGqdxkZ5EFXuUIQl8=",
          "cache": "force-cache"
        }
      ],
      "hr": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.jhzaap81ds.wasm",
          "hash": "sha256-J+DFN5oXFd5u48s05N5BH6ZsjGn+x8LMML1/CxNb53s=",
          "cache": "force-cache"
        }
      ],
      "hsb": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.izpy9ihs5p.wasm",
          "hash": "sha256-Dvnmy+YQs5Zexwv7SgbhgDo+Ly30c05vI6VMKrCWJbs=",
          "cache": "force-cache"
        }
      ],
      "hu": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.f0ukykd4fu.wasm",
          "hash": "sha256-ESnxBnUcXfqH+YJPdS3t06d0ByOGkbptusPe/+H4voI=",
          "cache": "force-cache"
        }
      ],
      "hy": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.fmbnt0fjki.wasm",
          "hash": "sha256-aXg7GPiFvHbd2gpzYYewsBgKdihl1CCYQ6X3vbf/i9Q=",
          "cache": "force-cache"
        }
      ],
      "id": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.7kolqisko1.wasm",
          "hash": "sha256-lxGYc8F2xRFhHhvblFwglx7j/nAOSLUXFHU5BtV38uA=",
          "cache": "force-cache"
        }
      ],
      "ig": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.brbh9z3v10.wasm",
          "hash": "sha256-x1oPkonSI88WAWDrKLjQGCbw4YN/L6E+Od3jAVREZu4=",
          "cache": "force-cache"
        }
      ],
      "ii": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.5iii6isb37.wasm",
          "hash": "sha256-0wP4RFDC7+zNq23ZqfGgM7VsOZ+Wm4C17kXoOhAyrak=",
          "cache": "force-cache"
        }
      ],
      "in": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.5bvyc4v137.wasm",
          "hash": "sha256-/+BorjVGXxquHhGP96TIn22w9HO2C4oXt7OTFFuCFk8=",
          "cache": "force-cache"
        }
      ],
      "is": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.z3no3uont5.wasm",
          "hash": "sha256-ARrwz9q6RBG81EifSllvgAbiFFhrwEG7WN0j+ea5u0U=",
          "cache": "force-cache"
        }
      ],
      "it": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.6y30qk8g4k.wasm",
          "hash": "sha256-AkIABWzW2Ar6jHc7ZD3LMhy+UAJG9y6A3inICDxL6nc=",
          "cache": "force-cache"
        }
      ],
      "iw": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.4t73wcbmry.wasm",
          "hash": "sha256-SEr47oreZbNYrG5zB+b5dYMtkOX2uni3vR5z+dvKjAE=",
          "cache": "force-cache"
        }
      ],
      "ja": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.rlerolh7qs.wasm",
          "hash": "sha256-USFITB3urQH20KqDMjsNrGUJVa2zhN8qPUz67NRnOqY=",
          "cache": "force-cache"
        }
      ],
      "jgo": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.zcty1clhul.wasm",
          "hash": "sha256-3VVd3/PQTTbfuMLgEKGXAACo8Wp60jRyfhamEtY6eG8=",
          "cache": "force-cache"
        }
      ],
      "jmc": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.zl1qm77usg.wasm",
          "hash": "sha256-p8zBiUWKKTRyganD1PAfJl8O4qf73RDR63N4K1n/igM=",
          "cache": "force-cache"
        }
      ],
      "ka": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.7q7a7sgay0.wasm",
          "hash": "sha256-YeNJ1KhNZgCpUCezG3wLcHh1zSK7Svovl7+MxR+1fzQ=",
          "cache": "force-cache"
        }
      ],
      "kab": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.j1wwhk64l4.wasm",
          "hash": "sha256-N0u4PBuQM20u3OzMAhwLr4LKjvaJlk7Bd0QT0ahvO6U=",
          "cache": "force-cache"
        }
      ],
      "kam": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.sp901gverj.wasm",
          "hash": "sha256-MIJlLEZv7S4MqmGBkNpc8LnWPTKRfnxsr4OIUGp68Vo=",
          "cache": "force-cache"
        }
      ],
      "kde": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.00dga4ndca.wasm",
          "hash": "sha256-MNCxJGhcFJnMOmTesG2aPXDUfNp0y+xQJrEgNj0dd1Q=",
          "cache": "force-cache"
        }
      ],
      "kea": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.8eeymeb7u7.wasm",
          "hash": "sha256-oESLffp7q9uLT0H5b2FVWzyfoOphbYCXRX1xS2H7oQ4=",
          "cache": "force-cache"
        }
      ],
      "khq": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.0oinkstc7z.wasm",
          "hash": "sha256-QBKeaWNCVWQE+PxfYJbSoTRF2HPBfvEZgIrz87TkCU0=",
          "cache": "force-cache"
        }
      ],
      "ki": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.9a2tg50a8r.wasm",
          "hash": "sha256-0XT2MzJjmJlMzvUdC77zx8SMemQFCnfZnzmcHxFu2WQ=",
          "cache": "force-cache"
        }
      ],
      "kk": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.33t9tzthjc.wasm",
          "hash": "sha256-f7SMnHZ7oAYZryovd8vI+MG0eRkXEz9uvLQWf4hBpNI=",
          "cache": "force-cache"
        }
      ],
      "kkj": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.zeb0kj0wxm.wasm",
          "hash": "sha256-y/k7OeE6+IxBNIgKfeUTVeiodGcdVotfXx17F6G45qY=",
          "cache": "force-cache"
        }
      ],
      "kl": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.1b5w09krht.wasm",
          "hash": "sha256-I1kmi/QZVkX6awaP6kOWJs2JHMR6n30n+Pz4GDy8tm8=",
          "cache": "force-cache"
        }
      ],
      "kln": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.h7zexmr4rv.wasm",
          "hash": "sha256-Q81WlV5+8g2IG+2uq749bjlHNTnyKwepJ34TmxbCD3A=",
          "cache": "force-cache"
        }
      ],
      "km": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.fqhj0eqmpk.wasm",
          "hash": "sha256-eQejROZTsnqaxjAfhq1O5Fv1FH6V2y/d++uZ5tlc8cA=",
          "cache": "force-cache"
        }
      ],
      "kn": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.s0v98odk1z.wasm",
          "hash": "sha256-TD1BICzUtwITJ3bodKejJ8I7hztgj7SpmtaKW+/zCWA=",
          "cache": "force-cache"
        }
      ],
      "ko": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.xktsl8pfvi.wasm",
          "hash": "sha256-P9b2PDwq3nqm0v8KiLxWIq6MNPJRTLQ3+xoyN0zb3U0=",
          "cache": "force-cache"
        }
      ],
      "kok": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.63oiog76om.wasm",
          "hash": "sha256-cpL9BG69wnlXaT+sS0OiylZY1SdT7CSTY/Owj6JnvSo=",
          "cache": "force-cache"
        }
      ],
      "ks": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.8fmg3f69y7.wasm",
          "hash": "sha256-hPQAxMe/75Vigz2GFO5V1WVzA6TfuauzJbV9l5Zk3aE=",
          "cache": "force-cache"
        }
      ],
      "ksb": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.q3mqrnmy7r.wasm",
          "hash": "sha256-mnYhU9i3GUr9gAQaejrBeolenUUf0bsTzg35bKWUBdc=",
          "cache": "force-cache"
        }
      ],
      "ksf": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.19yxs13mnu.wasm",
          "hash": "sha256-W+QJbADS2gWjU00/RfyvsSAL7VdUWfsQON9Aa2Hqg5M=",
          "cache": "force-cache"
        }
      ],
      "ksh": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.ts0t1m80u5.wasm",
          "hash": "sha256-sx3tR+9oZObfhc+/VbHRzft1qeNCXq5F222C5BA6v6w=",
          "cache": "force-cache"
        }
      ],
      "kw": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.qkvdkai6ei.wasm",
          "hash": "sha256-5oJQLTzwR52oIv2Tbv43vmUXB1biiwghTTT3rGkm8eE=",
          "cache": "force-cache"
        }
      ],
      "ky": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.rw33bzbp80.wasm",
          "hash": "sha256-i31SWqf7xsgpvP5fB064IVUyM5EIq57dq21283fjGl0=",
          "cache": "force-cache"
        }
      ],
      "lag": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.ij4dvv9tkl.wasm",
          "hash": "sha256-wny1WoA/e7vY5hyK/dtetFt3+pkIEHylnMCr3jMA46c=",
          "cache": "force-cache"
        }
      ],
      "lb": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.iyt9c2wcxs.wasm",
          "hash": "sha256-Fizi1Xig1hGJ2hWxtj5qBqhwxd651ylfHt0hLzZsGdM=",
          "cache": "force-cache"
        }
      ],
      "lg": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.5vaw2ot86t.wasm",
          "hash": "sha256-/46FME83A9zA+b+7hbZ0EmcrbrS2xYO5T59ovfRZjgI=",
          "cache": "force-cache"
        }
      ],
      "lkt": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.c7wlod6j8h.wasm",
          "hash": "sha256-uN3JAdY1rMvq8dPf5gRnBsQv/riaEPsdwDwi1VFvEMw=",
          "cache": "force-cache"
        }
      ],
      "ln": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.ei8vv6jkrw.wasm",
          "hash": "sha256-KjzZxGtIUS/gn0fZWNLyfuvLgkis1L7GTK9SUlpEb6c=",
          "cache": "force-cache"
        }
      ],
      "lo": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.v09gr4l7a4.wasm",
          "hash": "sha256-ryykrM1kPchZ6OAIMLvQwvb1ZEm8sk3Lb5wcw1E+C2g=",
          "cache": "force-cache"
        }
      ],
      "lrc": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.d6t5qc09pz.wasm",
          "hash": "sha256-C5MMiyv1AmCj6DAF+mAaCoyuVTWorkrVHpfNYkvlOHM=",
          "cache": "force-cache"
        }
      ],
      "lt": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.hqeute6i4g.wasm",
          "hash": "sha256-50Sf22EvusXWuZtAQoMZtDmLaEVzUUJ1zT6HI+JMNAg=",
          "cache": "force-cache"
        }
      ],
      "lu": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.hjp7ku9cb0.wasm",
          "hash": "sha256-8yYN8gHkuumBEz3Zo+A5Cai5tPrdSRTj2CMBmJvOatA=",
          "cache": "force-cache"
        }
      ],
      "luo": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.ddr8kh1a94.wasm",
          "hash": "sha256-b7ttCvNhPROWtDqY9PFbHnNjAxYa0ktbjqjWda/cRQU=",
          "cache": "force-cache"
        }
      ],
      "luy": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.24ghopkcm3.wasm",
          "hash": "sha256-LjiIpRQpt66BMM7Dc7eCpxIdksHG+UardlcUjuEdkrM=",
          "cache": "force-cache"
        }
      ],
      "lv": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.7k46f18x44.wasm",
          "hash": "sha256-ly/SPa4sECU1MRprNTLhYtRO6yKvpAxxQQo1Nl2LTng=",
          "cache": "force-cache"
        }
      ],
      "mas": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.rrs9ogjfhl.wasm",
          "hash": "sha256-Gb5u6f8yOvn32SnGYP49yCj1iBB8vQOjyKsF1xY57L8=",
          "cache": "force-cache"
        }
      ],
      "mer": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.2hz6rytn4z.wasm",
          "hash": "sha256-6rOAMq0apbS1dTnS5bR5z9CCQAQYAJkemj0UP4OnwV0=",
          "cache": "force-cache"
        }
      ],
      "mfe": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.9t52ofv44c.wasm",
          "hash": "sha256-7S0oduj1Chw1Xd5OeFVGTIwrgHAqoOUm/LzqRcFmkcg=",
          "cache": "force-cache"
        }
      ],
      "mg": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.7cwhc3ncl2.wasm",
          "hash": "sha256-96WSuK2yr785QJs15a4xBWfScqdmXdqb1uXopx5HmnE=",
          "cache": "force-cache"
        }
      ],
      "mgh": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.p5sgdgxndy.wasm",
          "hash": "sha256-jS/h32gATdRzcyzH2OJaZscPnaImrszVpNzCRLdDpt4=",
          "cache": "force-cache"
        }
      ],
      "mgo": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.pd0ci7baru.wasm",
          "hash": "sha256-7YonvtSII/ANXFK61f4A1oO4/hbREtewHuwTqgZP2BY=",
          "cache": "force-cache"
        }
      ],
      "mk": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.pewmgglvn2.wasm",
          "hash": "sha256-ka1pDghgiXMS2xh70MgEJbU6Lh6qQmructPgdS+qtbM=",
          "cache": "force-cache"
        }
      ],
      "ml": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.2zezcnqyr1.wasm",
          "hash": "sha256-jp4MdI/X+wZgzjBMRoXf7XciZ0Ca18UZ/6DmRzjCCCg=",
          "cache": "force-cache"
        }
      ],
      "mn": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.esuxo1dwf8.wasm",
          "hash": "sha256-4lkb742Dmq7b0z+1Og7Fxv+TmbBXBJh0s3ir3g6zQI4=",
          "cache": "force-cache"
        }
      ],
      "mo": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.xp22zj10dd.wasm",
          "hash": "sha256-u0bDJkx1K3rCoptth8PKVMHdnbxN2aKO0sKCDRxalys=",
          "cache": "force-cache"
        }
      ],
      "mr": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.fh9t76y7as.wasm",
          "hash": "sha256-vQvqokAHmvPIkBedtmh/dc6T8vslxIsbzFgV6wxhPoE=",
          "cache": "force-cache"
        }
      ],
      "ms": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.hiuou661aa.wasm",
          "hash": "sha256-eQa96dxH0FYvbk3/0hEuFxjTrdE22xzjW1JF3kfKML4=",
          "cache": "force-cache"
        }
      ],
      "mt": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.ib1oyuvjrp.wasm",
          "hash": "sha256-UpkHCzrQhBumW/CFd/yIP0KR49Js6v7pU0MqDZ9KbDE=",
          "cache": "force-cache"
        }
      ],
      "mua": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.zvnbxid44c.wasm",
          "hash": "sha256-r2bG+LFj6VMEQikbI0VTn8WT9Aq+oGjOrT4PFMfXPwk=",
          "cache": "force-cache"
        }
      ],
      "my": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.sk0cbnzk9v.wasm",
          "hash": "sha256-FJsXC6NarjK+H4h552UN/gbLVkBySS+iX/09VXYSPbA=",
          "cache": "force-cache"
        }
      ],
      "mzn": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.7kqhsu2g4n.wasm",
          "hash": "sha256-SWtEzjIPwaDNF4w5PdKH3C7v6AqlP3uHz4gw09cPDQU=",
          "cache": "force-cache"
        }
      ],
      "naq": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.8pjgvrykg2.wasm",
          "hash": "sha256-vLK6y0GqM7Jkb1rGsdeEx4JQFOeDaRePXymY9//wfuk=",
          "cache": "force-cache"
        }
      ],
      "nb": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.gsifjcv3f9.wasm",
          "hash": "sha256-4F/CP939P+RPhOFpWw3f9+K7gtqRNp00OyU+GC589VY=",
          "cache": "force-cache"
        }
      ],
      "nd": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.j24m69w6mw.wasm",
          "hash": "sha256-G8gmYSMf3pRAhLPMaU0QaUJHO65mQWpo8VLtnMtK4vU=",
          "cache": "force-cache"
        }
      ],
      "nds": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.ei5z880sl2.wasm",
          "hash": "sha256-pi5nG0HBuDlbOfoQIlJ9q3l+ngzpuCcSFRvXj/Zewnk=",
          "cache": "force-cache"
        }
      ],
      "ne": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.3u2sh4zbyp.wasm",
          "hash": "sha256-pdE7pfx89UH00jA6SkAGvNBsQRtXNuv+8/fQZ6H9dZg=",
          "cache": "force-cache"
        }
      ],
      "nl": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.8h4xxi2u75.wasm",
          "hash": "sha256-7H1JvsRPczZNFHWQmhxlsDInQKAqvYoZzYtida3yn0c=",
          "cache": "force-cache"
        }
      ],
      "nmg": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.2q4bu93ejp.wasm",
          "hash": "sha256-VsH7zrTW2z6vM2uCojTEkcYIIB3Ay7zLB7c9Q2lQzdM=",
          "cache": "force-cache"
        }
      ],
      "nn": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.j0e4lcmn25.wasm",
          "hash": "sha256-8yQW8tn2SVtk/MqBLsYqfoG8UF2yI9/d0PYlDzsQkfo=",
          "cache": "force-cache"
        }
      ],
      "nnh": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.4ist9f6l4o.wasm",
          "hash": "sha256-dOX66BSXWoLV6feRJkqj+3iH4AuSHlkMNAJRR1rIw4o=",
          "cache": "force-cache"
        }
      ],
      "no": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.jjvu3jvw8c.wasm",
          "hash": "sha256-L/rf6IxGrvpPQXC8Zut3/AkM1c5HSMC7NKZNnvfofAU=",
          "cache": "force-cache"
        }
      ],
      "nus": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.hyfitvkwg9.wasm",
          "hash": "sha256-SXoHxUzdPrIdevaUavv5CVD1FlXCanBT3wKdSgGPVgI=",
          "cache": "force-cache"
        }
      ],
      "nyn": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.1u31r6deo5.wasm",
          "hash": "sha256-qez7UIVVIAgAqD8KAdVdUSG3WXME5UqaRMCEBf/rRIc=",
          "cache": "force-cache"
        }
      ],
      "om": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.tzb8us1k8s.wasm",
          "hash": "sha256-uczU/YD1laccmkfH2RGFvbV4Mjf5yhvO7Eu7BEB3zs8=",
          "cache": "force-cache"
        }
      ],
      "or": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.5p7ox7sncq.wasm",
          "hash": "sha256-BwZVl6d3HG/qeMwxR7WOjVUMcHPft2HE++StbgKNHU0=",
          "cache": "force-cache"
        }
      ],
      "os": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.cd50y1fp2a.wasm",
          "hash": "sha256-0K7t5yLMJavoo3B1TZ5NDJrL6QwcChd0faq98l0S+D4=",
          "cache": "force-cache"
        }
      ],
      "pa-Arab": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.mgh1ex0xb2.wasm",
          "hash": "sha256-pkCAEZuV9tcZ5yu5GYjlEM858nNOg59drd2LbBUgQhQ=",
          "cache": "force-cache"
        }
      ],
      "pa-Guru": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.so09btnoc1.wasm",
          "hash": "sha256-RKVqnQ8WKZObM3mI2PB4cDRxz3MJ3CLfB7XKLP+4bmw=",
          "cache": "force-cache"
        }
      ],
      "pa": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.ied8hv74p3.wasm",
          "hash": "sha256-Jg2F1sJ9yzD+I5x7nQu2jDDkrqASaL2/NxLBsDcwV80=",
          "cache": "force-cache"
        }
      ],
      "pl": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.j7cab6z8qr.wasm",
          "hash": "sha256-sbCXnno8gVDta8NX6NkBNKp8WmY+KECziqcKOyqur2g=",
          "cache": "force-cache"
        }
      ],
      "ps": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.h2gb1g7i40.wasm",
          "hash": "sha256-GffJzO4SrNkAviTXtt5QeIYr3YJqM0wzm+yDAxO2Vx8=",
          "cache": "force-cache"
        }
      ],
      "pt": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.o7nvcd6yog.wasm",
          "hash": "sha256-vLgUTVSJXhnyR+cTIas57W4ZJ35b0jkzXC7JEbRCMGo=",
          "cache": "force-cache"
        }
      ],
      "quz": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.1q5x0hwla1.wasm",
          "hash": "sha256-x0DYXv0IEB6YaErI/DH1KdvowY1ghhVCsY2GN0x/k20=",
          "cache": "force-cache"
        }
      ],
      "rm": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.jlm8th1uhl.wasm",
          "hash": "sha256-Z9XxBmLf8w5XA4qP7ks7sPClZYWQOwfaHrZJA0sSrx0=",
          "cache": "force-cache"
        }
      ],
      "rn": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.9d994bvuu3.wasm",
          "hash": "sha256-rZfqQnrXreYrpbeyVXczjipWK/QJ9YGftKtSJD15+K8=",
          "cache": "force-cache"
        }
      ],
      "ro": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.epw9gqkzgp.wasm",
          "hash": "sha256-0sXpvqlMyRNmSQHHbe5YHwGGGu6xwHzsNv0ObXJy6Ko=",
          "cache": "force-cache"
        }
      ],
      "rof": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.30bhuhywic.wasm",
          "hash": "sha256-DcwjYj7dUgvlh/v8zplTt8651WFlhWc3pTDTOWjpLQQ=",
          "cache": "force-cache"
        }
      ],
      "ru": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.ldzocahtbw.wasm",
          "hash": "sha256-GQ2oa5VwSp8J+rLDDOh4C2W9HiS4VqDpLsrYl6NlCtA=",
          "cache": "force-cache"
        }
      ],
      "rw": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.m6icbrrt91.wasm",
          "hash": "sha256-8vF8ejARBHXeZtgAqSZAgOMNkFT5zq9AK19dVIJ3o3Y=",
          "cache": "force-cache"
        }
      ],
      "rwk": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.4l2tfir6hy.wasm",
          "hash": "sha256-WNkJyEpZaRQMlcX/9U2NbP32muEArpdt4bxF8d9UBMY=",
          "cache": "force-cache"
        }
      ],
      "sah": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.32up4avug0.wasm",
          "hash": "sha256-lT9OtbAQdmPeniDOLuWyGWTL142kufGpNPnw1rQjOgI=",
          "cache": "force-cache"
        }
      ],
      "saq": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.k1a4e9sak4.wasm",
          "hash": "sha256-2N3Bdwfom4pTYjn96z9AWCxPdTZBBDAzjknSzpEIV9w=",
          "cache": "force-cache"
        }
      ],
      "sbp": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.r2d7ujnvcr.wasm",
          "hash": "sha256-83cMHQzP5kJL9wNMLAdZ4PLiCYCaWtV9XkurQP2i8IE=",
          "cache": "force-cache"
        }
      ],
      "se": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.5jwslp5s6t.wasm",
          "hash": "sha256-sRytZSBGKZ5ZWSxTx3Ltml2asahCZWQJFjxLYfMoC0Q=",
          "cache": "force-cache"
        }
      ],
      "seh": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.shl1wqjcm6.wasm",
          "hash": "sha256-EBuhIMjzjF9fc8vLpjICZenkUprIkXJmWWsuY2KXbxM=",
          "cache": "force-cache"
        }
      ],
      "ses": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.7our6pwf0g.wasm",
          "hash": "sha256-+aFAGBEKsvbyXMW2IlgfZL8FDcKZWq6oo6F+MVG4XEg=",
          "cache": "force-cache"
        }
      ],
      "sg": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.xs27hf30zs.wasm",
          "hash": "sha256-D3n32N6GfB3AfmVqZpq/y8UM8fCviq86uGuKpso9XZw=",
          "cache": "force-cache"
        }
      ],
      "sh": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.2yv9z6u2fq.wasm",
          "hash": "sha256-BrvgXAUmk1zecekvlo9vYTwFVJApGBYwPYXdE/U41qw=",
          "cache": "force-cache"
        }
      ],
      "shi-Latn": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.d14m2f2482.wasm",
          "hash": "sha256-D0RWAManz5DhBc7fe3QCYLU3R8Ylm5OCOQ2U9SC2SUY=",
          "cache": "force-cache"
        }
      ],
      "shi-Tfng": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.0wm9gx8jb1.wasm",
          "hash": "sha256-IFCGQ7gt9JR395QG9rwEUinkt3EFTsHfLytTjG93cRo=",
          "cache": "force-cache"
        }
      ],
      "shi": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.rcop4y8oyj.wasm",
          "hash": "sha256-dexgAbRJ5MfmtpFGubyEk/PiBPvwMg+nkMsNZqHeOYM=",
          "cache": "force-cache"
        }
      ],
      "si": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.k1z5kl9jql.wasm",
          "hash": "sha256-WGc3macAjMPBBM7FPltfs+Ph1gvcOjPbEPPrysk2Vgw=",
          "cache": "force-cache"
        }
      ],
      "sk": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.b0z9ufszfo.wasm",
          "hash": "sha256-exM/YNZnyPAnUsdAEiMxMTypSNmCsEONyhRat1j8cFw=",
          "cache": "force-cache"
        }
      ],
      "sl": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.t2bficcmfn.wasm",
          "hash": "sha256-1ScRy53r2XRZc7MrrULMbSJyA5uzPytCIAUHTLRLpDs=",
          "cache": "force-cache"
        }
      ],
      "smn": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.4789ughg4n.wasm",
          "hash": "sha256-wL+1ew4DrRR5fN6jgN9+Ctz3Hi0os1iaGc/7Qru0oAk=",
          "cache": "force-cache"
        }
      ],
      "sn": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.lkihazcsqe.wasm",
          "hash": "sha256-uxFZkILypP2JHlA/p9QJhw9YULK2nBJq1YN1oHYwQ0w=",
          "cache": "force-cache"
        }
      ],
      "so": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.3rx5lf58m1.wasm",
          "hash": "sha256-H1tV4OdVKqIAsjwvay1/tpnx2K+cGnZD2kln1ueYrBg=",
          "cache": "force-cache"
        }
      ],
      "sq": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.wnzydbo9ey.wasm",
          "hash": "sha256-DOKqH3uTPwEYWwkFicAnL6TTFBNneot/tJBoHtVuOKQ=",
          "cache": "force-cache"
        }
      ],
      "sr-Cyrl": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.6yd12mc3c6.wasm",
          "hash": "sha256-3tZB6As5j59/GyD9LzW60FK9g/TkmLqqyzY9JjXxrKs=",
          "cache": "force-cache"
        }
      ],
      "sr-Latn": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.ld26kbi22v.wasm",
          "hash": "sha256-d24cFr7STe6Blqlq3rDmU67ih81eSwwSRNA6cfESLAU=",
          "cache": "force-cache"
        }
      ],
      "sr": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.3cppswqdj7.wasm",
          "hash": "sha256-g0iEJka1EaZLXeTRX8xNWqL13IKq4UeLduzUggg8w3M=",
          "cache": "force-cache"
        }
      ],
      "sv": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.l7t9e6nc9n.wasm",
          "hash": "sha256-3+2nbJXcgwmwLk3AhntQ/ga7D5Y00x8sWspUoS9YZXs=",
          "cache": "force-cache"
        }
      ],
      "sw": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.grqlit3ism.wasm",
          "hash": "sha256-vBDzH2STx/8ops363UdjdNJ5E8vKXVmdAX3SsBTH1To=",
          "cache": "force-cache"
        }
      ],
      "ta": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.5t59erz1o2.wasm",
          "hash": "sha256-qQ8qkRTAJdEf4MKmGqgk7TzQaHow/Fh+n/0xtJbC7zQ=",
          "cache": "force-cache"
        }
      ],
      "te": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.ttg1rnt7rp.wasm",
          "hash": "sha256-cVLRrQ/5fXtuxinJ2CzfNfZKRs4TCC1tXbBylut9pjo=",
          "cache": "force-cache"
        }
      ],
      "teo": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.8zf7q7cuc2.wasm",
          "hash": "sha256-XJ3hnf4jcHukJg7iEBcT6e1AgcYOaTx6sSmpkBAfKss=",
          "cache": "force-cache"
        }
      ],
      "tg": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.2944aemu1q.wasm",
          "hash": "sha256-hhBoi1Wwq6BnvHEALgIDEsHCjb9nrDufXl+Q2m3w41g=",
          "cache": "force-cache"
        }
      ],
      "th": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.1wzgyfm3mn.wasm",
          "hash": "sha256-T8jEu+AdXACag1RnsnoER/iU7NO1Is8RDsSpXwfaAOk=",
          "cache": "force-cache"
        }
      ],
      "ti": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.nix2icgdmc.wasm",
          "hash": "sha256-0afgsOqVBzT+t5dNVsgGNFqunFx4l9jZufMz8ieoMkE=",
          "cache": "force-cache"
        }
      ],
      "tl": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.x4igyg5gul.wasm",
          "hash": "sha256-L05xGIhBokz7XCOM33BdohJvJa1CqtLdfBw64yHgKUU=",
          "cache": "force-cache"
        }
      ],
      "to": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.g11qk5ni6y.wasm",
          "hash": "sha256-xD/BVcjSCyIF88pYheNh+3WWbv5udLJbajgBSzG4xGg=",
          "cache": "force-cache"
        }
      ],
      "tr": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.xcalgafs43.wasm",
          "hash": "sha256-sY9kE2gTVy1Ea/OJMJglU1naWq2UCii+iPqKm53ddJE=",
          "cache": "force-cache"
        }
      ],
      "tt": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.d8167t2rsp.wasm",
          "hash": "sha256-vSZbLSxsIxNorUstAubL+x290hAcz1QL2jhwxSQYai0=",
          "cache": "force-cache"
        }
      ],
      "twq": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.uaqre0qpin.wasm",
          "hash": "sha256-GpR7uDWwOzL0IwXZN6uQ/LkFtq3i5vj3vhu/mW2veAI=",
          "cache": "force-cache"
        }
      ],
      "tzm": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.0zd60hc1es.wasm",
          "hash": "sha256-xI8lqK2cQ+/6WItOqr3rk8AObHiLTXJPuT7MoxF/9Kg=",
          "cache": "force-cache"
        }
      ],
      "ug": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.cpouc4cbgc.wasm",
          "hash": "sha256-cIvKwSjUovqh1ehWpSrmHLNaIoZIqoUUSZiqRIdDAfc=",
          "cache": "force-cache"
        }
      ],
      "uk": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.tbb0tvmchk.wasm",
          "hash": "sha256-p01n6xGW9JanlgfvYZ1IVIhO6SNWu2EqFKVZ83JFQ6k=",
          "cache": "force-cache"
        }
      ],
      "ur": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.bfnthezqe8.wasm",
          "hash": "sha256-13TN1qSGeDJoJ4eEV5sg2tmLOYU/vDXzDQhF1wllGzo=",
          "cache": "force-cache"
        }
      ],
      "uz-Arab": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.nv7i298d1d.wasm",
          "hash": "sha256-Y752vg+/H9QwyvgEO4Zh1iKfJP2soIKaGet1/mvClV0=",
          "cache": "force-cache"
        }
      ],
      "uz-Cyrl": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.8kia3kf58q.wasm",
          "hash": "sha256-iKBdhqehn/H+vPWB1GVApt/4xDWWaM9qeINUaeLvqOc=",
          "cache": "force-cache"
        }
      ],
      "uz-Latn": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.n5k8ey7aa0.wasm",
          "hash": "sha256-C54YVkl0NBMJpAthwNyP6ZnUDKaiIx3T5PdEhQXzMms=",
          "cache": "force-cache"
        }
      ],
      "uz": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.pvehv4c94p.wasm",
          "hash": "sha256-lXT+GSiTr+9KLhM0RdPBVtJGEUOgGrJkwoEULDy5DJs=",
          "cache": "force-cache"
        }
      ],
      "vai-Latn": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.c4pf0xfqqb.wasm",
          "hash": "sha256-FD/bcBEzoSPTZIpFu0Ls1WfJdCbjjdNK9/csTYu6Fbw=",
          "cache": "force-cache"
        }
      ],
      "vai-Vaii": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.m3f0wisw2p.wasm",
          "hash": "sha256-crSnbzg0eHJHv6WfrsPO8QHv3so6aWhE28eEDghLxpQ=",
          "cache": "force-cache"
        }
      ],
      "vai": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.jg38s2cfq2.wasm",
          "hash": "sha256-gydlzs5mAdk5fSynVvwMJPqlqQr9pwbEldxpNwhQG+U=",
          "cache": "force-cache"
        }
      ],
      "vi": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.2r3cpjyipx.wasm",
          "hash": "sha256-/iIRmiA5lvQy2SNj2Uy6pbFmXh3gT1Q1FHEZHqT/BMg=",
          "cache": "force-cache"
        }
      ],
      "vun": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.rj4k1dceak.wasm",
          "hash": "sha256-+XY3ze81M7uzP2T74bZboyDulf1w+DTP/EGl+mJMCL8=",
          "cache": "force-cache"
        }
      ],
      "wae": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.5nfpjvj3ws.wasm",
          "hash": "sha256-jyUEDRVTQuDvzZbMQqLInOnft/Mj4feP9EXMx3xjFII=",
          "cache": "force-cache"
        }
      ],
      "wo": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.ccl05cua9b.wasm",
          "hash": "sha256-DKGn7usn+V5ojMfvld5Tf0jOvFszSvzc7IVBF2w7FtE=",
          "cache": "force-cache"
        }
      ],
      "xog": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.dqv6ne1sqm.wasm",
          "hash": "sha256-JWVXhzaIwJUQN02jq0mS8E61dlk/UK8enmT3+zjI0Co=",
          "cache": "force-cache"
        }
      ],
      "yav": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.a5kfuq2w2c.wasm",
          "hash": "sha256-QkYXX2XZ6uDm/5KvTCzKxGEjQCquZIUxzPrmhfotCQY=",
          "cache": "force-cache"
        }
      ],
      "yi": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.9vd6lgaf1e.wasm",
          "hash": "sha256-S5/xnUCde/Ts8ITAklBlVa2Y10UMREssua0RABSOLgA=",
          "cache": "force-cache"
        }
      ],
      "yo": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.yc1vf4xixm.wasm",
          "hash": "sha256-oqcL/VDnD55bCnSzn8OvBkCEU61yW+8+puiHW59B4aA=",
          "cache": "force-cache"
        }
      ],
      "zgh": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.3ulr8428kd.wasm",
          "hash": "sha256-S18zs5++HOgCD8sanEORfp/d5dsH9w1g1rjzzOI0Zjs=",
          "cache": "force-cache"
        }
      ],
      "zh-Hans": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.x90ectp8k5.wasm",
          "hash": "sha256-G1fbKkEEjNavc3PPbeeAeZlN8Q3bW79GsJriTIp9w5o=",
          "cache": "force-cache"
        }
      ],
      "zh-Hant": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.27ao1gkdan.wasm",
          "hash": "sha256-nqoRdO6yzsxiwoLaM2LZwGuuOBpRyzi7LgW3d0X/+tE=",
          "cache": "force-cache"
        }
      ],
      "zh": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.jngeujx063.wasm",
          "hash": "sha256-MZq3F4N8bnaMQtMzjmukjeAvZ+WRVHFeANGNO4/25IE=",
          "cache": "force-cache"
        }
      ],
      "zu": [
        {
          "virtualPath": "ICU4N.resources.wasm",
          "name": "ICU4N.resources.z457xl3uwk.wasm",
          "hash": "sha256-w/q6T4k6DuIYyCGFreSwqV/UGWVOwAZhEtmff6fc2Ws=",
          "cache": "force-cache"
        }
      ]
    }
  },
  "debugLevel": 0,
  "linkerEnabled": true,
  "globalizationMode": "sharded",
  "extensions": {
    "blazor": {}
  },
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Microsoft.AspNetCore.Components.Routing.RegexConstraintSupport": false,
        "Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability": true,
        "System.ComponentModel.DefaultValueAttribute.IsSupported": false,
        "System.ComponentModel.Design.IDesignerHost.IsSupported": false,
        "System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization": false,
        "System.ComponentModel.TypeDescriptor.IsComObjectDescriptorSupported": false,
        "System.Data.DataSet.XmlSerializationIsSupported": false,
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.GC.Server": true,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.ResourceManager.AllowCustomResourceTypes": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported": true,
        "System.Runtime.InteropServices.BuiltInComInterop.IsSupported": false,
        "System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting": false,
        "System.Runtime.InteropServices.EnableCppCLIHostActivation": false,
        "System.Runtime.InteropServices.Marshalling.EnableGeneratedComInterfaceComImportInterop": false,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.StartupHookProvider.IsSupported": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": true,
        "System.Threading.Thread.EnableAutoreleasePool": false,
        "Microsoft.AspNetCore.Components.Endpoints.NavigationManager.DisableThrowNavigationException": false
      }
    }
  }
}/*json-end*/);export{gt as default,ft as dotnet,mt as exit};
