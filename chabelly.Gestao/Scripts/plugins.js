window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){arguments.callee=arguments.callee.caller;var a=[].slice.call(arguments);(typeof console.log==="object"?log.apply.call(console.log,console,a):console.log.apply(console,a))}};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());

if(navigator.userAgent.indexOf('Linux') != -1){ var so = "Linux"; }
else if(navigator.userAgent.indexOf('Mac') != -1){ var so = "Macintosh"; }
else if(navigator.userAgent.toLowerCase().indexOf('unix') != -1){ var so = "Unix"; }
else if((navigator.userAgent.indexOf('Win')!= -1)&&(navigator.userAgent.indexOf('NT 2')!= -1)){ var so = "Windows 95"; }
else if((navigator.userAgent.indexOf('Win')!= -1)&&(navigator.userAgent.indexOf('NT 3')!= -1)){ var so = "Windows 98"; }
else if((navigator.userAgent.indexOf('Win')!=-1)&&(navigator.userAgent.indexOf('NT 4')!=-1)){ var so = "Windows 2000"; }
else if((navigator.userAgent.indexOf('Win')!=-1)&&(navigator.userAgent.indexOf('NT 5')!=-1)){ var so = "Windows XP"; }
else if((navigator.userAgent.indexOf('Win')!= -1)&&(navigator.userAgent.indexOf('NT 6')!= -1)){ var so = "Windows Vista / Windows 7"; }
else{ so="N&Atilde;O DETECTADO!"; }
