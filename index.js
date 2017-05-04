var _os = require('os');
var _source = _os.hostname();
var _interval = parseInt(process.argv[1]) || 1000;
var _last; function poll()
{
   var cpus = _os.cpus();
   for(var idx = 0; idx < cpus.length; idx++)
   {
       var e = cpus[idx];
       e.total = 0;
       for(var t in e.times)
           e.total += e.times[t];
   }

   if (_last)
       {
           for(var idx = 0; idx < cpus.length; idx++)
           {
               var e = cpus[idx];
               var l = _last[idx];
               var user = (e.times.user - l.times.user) /
                          (e.total - l.total);

               console.log('CPU_CORE_DEMO %d %s-%d', user, _source, idx + 1);
           }
       }
       _last = cpus;
       setTimeout(poll, _interval);
   }

poll();