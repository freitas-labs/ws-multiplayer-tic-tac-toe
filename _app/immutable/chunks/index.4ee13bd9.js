var a=new Array;function l(o){a.length=0,a.push(...o)}function n(o){a.forEach(r=>r.logError(o))}var e=class{logMessage(o,r){console.info(`ℹ️  (${o})`,r)}logWarning(o,r){console.warn(`⚠️  (${o})`,r)}logFatal(o,r){console.trace(`💀  (${o})`,r)}logError(o){console.error(`🐛  (${o})`)}};export{e as E,n as l,l as p};