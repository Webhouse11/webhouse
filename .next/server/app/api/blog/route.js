(()=>{var e={};e.id=778,e.ids=[778],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3873:e=>{"use strict";e.exports=require("path")},8598:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>g,routeModule:()=>l,serverHooks:()=>R,workAsyncStorage:()=>E,workUnitAsyncStorage:()=>d});var s={};r.r(s),r.d(s,{GET:()=>u,POST:()=>c,dynamic:()=>p});var o=r(2706),a=r(8203),n=r(5994),i=r(9187),T=r(3979);let p="force-dynamic";async function u(){try{let e=T.A.prepare("SELECT * FROM blog_posts ORDER BY published_at DESC").all();return i.NextResponse.json(e)}catch(e){return i.NextResponse.json({error:"Failed to fetch blog posts"},{status:500})}}async function c(e){try{let{title:t,slug:r,excerpt:s,content:o,author:a,category:n,image_url:p}=await e.json(),u=T.A.prepare(`
      INSERT INTO blog_posts (title, slug, excerpt, content, author, category, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(t,r,s,o,a,n,p);return i.NextResponse.json({id:u.lastInsertRowid})}catch(e){return i.NextResponse.json({error:"Failed to create blog post"},{status:500})}}let l=new o.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/blog/route",pathname:"/api/blog",filename:"route",bundlePath:"app/api/blog/route"},resolvedPagePath:"/workspaces/webhouse/src/app/api/blog/route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:E,workUnitAsyncStorage:d,serverHooks:R}=l;function g(){return(0,n.patchFetch)({workAsyncStorage:E,workUnitAsyncStorage:d})}},6487:()=>{},8335:()=>{},3979:(e,t,r)=>{"use strict";let s;r.d(t,{A:()=>p});let o=require("better-sqlite3");var a=r.n(o),n=r(3873);let i=r.n(n)().resolve(process.cwd(),"webhouse.db"),T=global;try{s=T.db?T.db:new(a())(i,{timeout:1e4})}catch(e){console.error("Database connection error:",e),s=new(a())(":memory:")}try{s.exec(`
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
  `)}catch(e){console.error("Database schema initialization error:",e)}let p=s}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,452],()=>r(8598));module.exports=s})();