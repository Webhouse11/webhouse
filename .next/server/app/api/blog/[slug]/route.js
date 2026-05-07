(()=>{var e={};e.id=618,e.ids=[618],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3873:e=>{"use strict";e.exports=require("path")},4690:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>d,routeModule:()=>p,serverHooks:()=>l,workAsyncStorage:()=>E,workUnitAsyncStorage:()=>c});var s={};r.r(s),r.d(s,{GET:()=>T});var o=r(2706),a=r(8203),n=r(5994),i=r(9187),u=r(3979);async function T(e,{params:t}){try{let{slug:e}=await t,r=u.A.prepare("SELECT * FROM blog_posts WHERE slug = ?").get(e);if(!r)return i.NextResponse.json({error:"Post not found"},{status:404});return i.NextResponse.json(r)}catch(e){return i.NextResponse.json({error:"Failed to fetch post"},{status:500})}}let p=new o.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/blog/[slug]/route",pathname:"/api/blog/[slug]",filename:"route",bundlePath:"app/api/blog/[slug]/route"},resolvedPagePath:"/workspaces/webhouse/src/app/api/blog/[slug]/route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:E,workUnitAsyncStorage:c,serverHooks:l}=p;function d(){return(0,n.patchFetch)({workAsyncStorage:E,workUnitAsyncStorage:c})}},6487:()=>{},8335:()=>{},3979:(e,t,r)=>{"use strict";let s;r.d(t,{A:()=>T});let o=require("better-sqlite3");var a=r.n(o),n=r(3873);let i=r.n(n)().resolve(process.cwd(),"webhouse.db"),u=global;try{s=u.db?u.db:new(a())(i,{timeout:1e4})}catch(e){console.error("Database connection error:",e),s=new(a())(":memory:")}try{s.exec(`
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
  `)}catch(e){console.error("Database schema initialization error:",e)}let T=s}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,452],()=>r(4690));module.exports=s})();