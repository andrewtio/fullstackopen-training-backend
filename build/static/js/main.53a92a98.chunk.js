(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{42:function(t,e,n){},43:function(t,e,n){"use strict";n.r(e);var c=n(18),o=n.n(c),r=n(8),i=n(3),a=n(2),u=n(5),s=n.n(u),l="https://zenfein1.herokuapp.com/api/notes",j=function(){var t=s.a.get(l),e={id:1e4,content:"This note is not saved to server",date:"2019-05-30T17:30:31.098Z",important:!0};return t.then((function(t){return t.data.concat(e)}))},f=function(t){return s.a.post(l,t).then((function(t){return t.data}))},b=function(t,e){return s.a.put("".concat(l,"/").concat(t),e).then((function(t){return t.data}))},d=n(0),p=function(t){var e=t.note,n=t.toggleImportance,c=e.important?"make not important":"make important";return Object(d.jsxs)("li",{className:"note",children:[e.content," ",Object(d.jsx)("button",{onClick:n,children:c})]})},m=function(t){var e=t.message;return null===e?null:Object(d.jsx)("div",{className:"error",children:e})},h=function(){return Object(d.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(d.jsx)("br",{}),Object(d.jsx)("em",{children:"Note app, Departement of Computer Science, University of Helsinki 2022"})]})},O=(n(42),function(){var t=Object(a.useState)([]),e=Object(i.a)(t,2),n=e[0],c=e[1],o=Object(a.useState)(""),u=Object(i.a)(o,2),s=u[0],l=u[1],O=Object(a.useState)(!0),v=Object(i.a)(O,2),g=v[0],x=v[1],S=Object(a.useState)(null),k=Object(i.a)(S,2),y=k[0],w=k[1];Object(a.useEffect)((function(){j().then((function(t){c(t)}))}),[]);var N=g?n:n.filter((function(t){return t.important}));return Object(d.jsxs)("div",{children:[Object(d.jsx)("h1",{children:"Notes"}),Object(d.jsx)(m,{message:y}),Object(d.jsx)("div",{children:Object(d.jsxs)("button",{onClick:function(){return x(!g)},children:["show ",g?"important":"all"]})}),Object(d.jsx)("ul",{children:N.map((function(t){return Object(d.jsx)(p,{note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),o=Object(r.a)(Object(r.a)({},e),{},{important:!e.important});b(t,o).then((function(e){c(n.map((function(n){return n.id!==t?n:e})))})).catch((function(o){w("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){w(null)}),5e3),c(n.filter((function(e){return e.id!==t})))})),console.log("importance of ".concat(t," needs to be toggled")),console.log(y,"errorMessage")}(t.id)}},t.id)}))}),Object(d.jsxs)("form",{onSubmit:function(t){t.preventDefault();var e={content:s,date:(new Date).toISOString(),important:Math.random()>.5,id:n.length+1};f(e).then((function(t){c(n.concat(t)),l("")}))},children:[Object(d.jsx)("input",{value:s,onChange:function(t){l(t.target.value)}}),Object(d.jsx)("button",{type:"submit",children:"save"})]}),Object(d.jsx)(h,{})]})});o.a.render(Object(d.jsx)(O,{}),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.53a92a98.chunk.js.map