(()=>{var e={};e.id=299,e.ids=[299],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3873:e=>{"use strict";e.exports=require("path")},1454:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>m,routeModule:()=>d,serverHooks:()=>R,workAsyncStorage:()=>E,workUnitAsyncStorage:()=>l});var s={};r.r(s),r.d(s,{GET:()=>p,POST:()=>c,dynamic:()=>u});var a=r(2706),o=r(8203),n=r(5994),i=r(9187),T=r(3979);let u="force-dynamic";async function p(){try{let e=T.A.prepare("SELECT * FROM leads ORDER BY created_at DESC").all();return i.NextResponse.json(e)}catch(e){return i.NextResponse.json({error:"Failed to fetch leads"},{status:500})}}async function c(e){try{let{name:t,email:r,phone:s,message:a}=await e.json(),o=T.A.prepare("INSERT INTO leads (name, email, phone, message) VALUES (?, ?, ?, ?)").run(t,r,s,a);return i.NextResponse.json({id:o.lastInsertRowid})}catch(e){return i.NextResponse.json({error:"Failed to submit lead"},{status:500})}}let d=new a.AppRouteRouteModule({definition:{kind:o.RouteKind.APP_ROUTE,page:"/api/leads/route",pathname:"/api/leads",filename:"route",bundlePath:"app/api/leads/route"},resolvedPagePath:"/workspaces/webhouse/src/app/api/leads/route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:E,workUnitAsyncStorage:l,serverHooks:R}=d;function m(){return(0,n.patchFetch)({workAsyncStorage:E,workUnitAsyncStorage:l})}},6487:()=>{},8335:()=>{},3979:(e,t,r)=>{"use strict";let s;r.d(t,{A:()=>u});let a=require("better-sqlite3");var o=r.n(a),n=r(3873);let i=r.n(n)().resolve(process.cwd(),"webhouse.db"),T=global;try{s=T.db?T.db:new(o())(i,{timeout:1e4})}catch(e){console.error("Database connection error:",e),s=new(o())(":memory:")}try{s.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      phone TEXT,
      message TEXT,
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      slug TEXT UNIQUE,
      content TEXT,
      excerpt TEXT,
      category TEXT,
      author TEXT,
      image_url TEXT,
      meta_title TEXT,
      meta_description TEXT,
      published_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)}catch(e){console.error("Database schema initialization error:",e)}let u=s}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,452],()=>r(1454));module.exports=s})();