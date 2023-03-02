import{S as I,i as O,s as R,H as D,k as F,l as P,m as G,h as $,n as q,b as u,I as L,J as N,K as z,g as _,d as v,q as p,r as g,E as A,y as k,a as S,z as E,c as M,M as x,A as H,B as T}from"../chunks/index.c7ee9b71.js";import{H as tt}from"../chunks/HdgMain.9bab85a3.js";function et(i){let t,r;const a=i[1].default,n=D(a,i,i[0],null);return{c(){t=F("div"),n&&n.c(),this.h()},l(s){t=P(s,"DIV",{class:!0});var o=G(t);n&&n.l(o),o.forEach($),this.h()},h(){q(t,"class","container svelte-drjrlj")},m(s,o){u(s,t,o),n&&n.m(t,null),r=!0},p(s,[o]){n&&n.p&&(!r||o&1)&&L(n,a,s,s[0],r?z(a,s[0],o,null):N(s[0]),null)},i(s){r||(_(n,s),r=!0)},o(s){v(n,s),r=!1},d(s){s&&$(t),n&&n.d(s)}}}function rt(i,t,r){let{$$slots:a={},$$scope:n}=t;return i.$$set=s=>{"$$scope"in s&&r(0,n=s.$$scope)},[n,a]}class j extends I{constructor(t){super(),O(this,t,rt,et,R,{})}}function st(i){let t,r,a,n,s,o,m;const b=i[1].default,f=D(b,i,i[0],null);return{c(){t=F("pre"),r=p(""),a=F("code"),n=p(`\r
`),f&&f.c(),s=p(`\r
`),o=p(`\r
`),this.h()},l(c){t=P(c,"PRE",{class:!0});var d=G(t);r=g(d,""),a=P(d,"CODE",{});var h=G(a);n=g(h,`\r
`),f&&f.l(h),s=g(h,`\r
`),h.forEach($),o=g(d,`\r
`),d.forEach($),this.h()},h(){q(t,"class","bg-gray-600 p-2 m-2 text-white svelte-1amsh77")},m(c,d){u(c,t,d),A(t,r),A(t,a),A(a,n),f&&f.m(a,null),A(a,s),A(t,o),m=!0},p(c,[d]){f&&f.p&&(!m||d&1)&&L(f,b,c,c[0],m?z(b,c[0],d,null):N(c[0]),null)},i(c){m||(_(f,c),m=!0)},o(c){v(f,c),m=!1},d(c){c&&$(t),f&&f.d(c)}}}function nt(i,t,r){let{$$slots:a={},$$scope:n}=t;return i.$$set=s=>{"$$scope"in s&&r(0,n=s.$$scope)},[n,a]}class Z extends I{constructor(t){super(),O(this,t,nt,st,R,{})}}function at(i){let t,r;const a=i[1].default,n=D(a,i,i[0],null);return{c(){t=F("p"),n&&n.c(),this.h()},l(s){t=P(s,"P",{class:!0});var o=G(t);n&&n.l(o),o.forEach($),this.h()},h(){q(t,"class","p-2 m-2 bg-gray-700")},m(s,o){u(s,t,o),n&&n.m(t,null),r=!0},p(s,[o]){n&&n.p&&(!r||o&1)&&L(n,a,s,s[0],r?z(a,s[0],o,null):N(s[0]),null)},i(s){r||(_(n,s),r=!0)},o(s){v(n,s),r=!1},d(s){s&&$(t),n&&n.d(s)}}}function it(i,t,r){let{$$slots:a={},$$scope:n}=t;return i.$$set=s=>{"$$scope"in s&&r(0,n=s.$$scope)},[n,a]}class lt extends I{constructor(t){super(),O(this,t,it,at,R,{})}}function ot(i){let t;return{c(){t=p("Grid Template Areas")},l(r){t=g(r,"Grid Template Areas")},m(r,a){u(r,t,a)},d(r){r&&$(t)}}}function ft(i){let t;return{c(){t=p('One of the easies way to layout a page is by using "grid-template-areas". Following is a simple example of creatign a classic layout using "grid-template-areas".')},l(r){t=g(r,'One of the easies way to layout a page is by using "grid-template-areas". Following is a simple example of creatign a classic layout using "grid-template-areas".')},m(r,a){u(r,t,a)},d(r){r&&$(t)}}}function $t(i){let t;return{c(){t=p("HTML Code")},l(r){t=g(r,"HTML Code")},m(r,a){u(r,t,a)},d(r){r&&$(t)}}}function ct(i){let t;return{c(){t=p(`<div class="grid_container">\r
	<div class="grid_item nav">Nav</div>\r
	<div class="grid_item sidebar">SideBar</div>\r
	<div class="grid_item article">Main Article</div>\r
	<div class="grid_item footer">Footer</div>\r
</div>`)},l(r){t=g(r,`<div class="grid_container">\r
	<div class="grid_item nav">Nav</div>\r
	<div class="grid_item sidebar">SideBar</div>\r
	<div class="grid_item article">Main Article</div>\r
	<div class="grid_item footer">Footer</div>\r
</div>`)},m(r,a){u(r,t,a)},d(r){r&&$(t)}}}function dt(i){let t;return{c(){t=p("The CSS Code")},l(r){t=g(r,"The CSS Code")},m(r,a){u(r,t,a)},d(r){r&&$(t)}}}function ut(i){let t;return{c(){t=p(`.grid_container {\r
	display:grid;\r
  	grid-template-columns: 2fr 4fr 4fr;\r
  	grid-template-rows: auto 1fr auto;\r
	grid-template-areas:	\r
	 		"nav 	 	nav 	nav "\r
			"sidebar 	article 	article"\r
			"sidebar 	footer 	footer";\r
			\r
	padding : 4px;\r
	background-color: pink;\r
\r
}\r
\r
.grid_item {\r
padding: 5px;\r
margin :5px;\r
background-color: beige;\r
color:red;\r
border: 2px solid black;\r
}\r
\r
.nav {	grid-area: nav;	}\r
.sidebar {	grid-area: sidebar;	}\r
.article {	\r
grid-area: article;	\r
  height: 80vh;\r
}\r
.footer {	grid-area: footer;	}`)},l(r){t=g(r,`.grid_container {\r
	display:grid;\r
  	grid-template-columns: 2fr 4fr 4fr;\r
  	grid-template-rows: auto 1fr auto;\r
	grid-template-areas:	\r
	 		"nav 	 	nav 	nav "\r
			"sidebar 	article 	article"\r
			"sidebar 	footer 	footer";\r
			\r
	padding : 4px;\r
	background-color: pink;\r
\r
}\r
\r
.grid_item {\r
padding: 5px;\r
margin :5px;\r
background-color: beige;\r
color:red;\r
border: 2px solid black;\r
}\r
\r
.nav {	grid-area: nav;	}\r
.sidebar {	grid-area: sidebar;	}\r
.article {	\r
grid-area: article;	\r
  height: 80vh;\r
}\r
.footer {	grid-area: footer;	}`)},m(r,a){u(r,t,a)},d(r){r&&$(t)}}}function mt(i){let t;return{c(){t=p("Result")},l(r){t=g(r,"Result")},m(r,a){u(r,t,a)},d(r){r&&$(t)}}}function pt(i){let t,r,a,n,s,o,m,b,f,c,d,h,w,y,C,J,B;return t=new tt({props:{$$slots:{default:[ot]},$$scope:{ctx:i}}}),a=new lt({props:{$$slots:{default:[ft]},$$scope:{ctx:i}}}),s=new j({props:{$$slots:{default:[$t]},$$scope:{ctx:i}}}),m=new Z({props:{$$slots:{default:[ct]},$$scope:{ctx:i}}}),f=new j({props:{$$slots:{default:[dt]},$$scope:{ctx:i}}}),d=new Z({props:{$$slots:{default:[ut]},$$scope:{ctx:i}}}),w=new j({props:{$$slots:{default:[mt]},$$scope:{ctx:i}}}),{c(){k(t.$$.fragment),r=S(),k(a.$$.fragment),n=S(),k(s.$$.fragment),o=S(),k(m.$$.fragment),b=S(),k(f.$$.fragment),c=S(),k(d.$$.fragment),h=S(),k(w.$$.fragment),y=S(),C=F("img"),this.h()},l(e){E(t.$$.fragment,e),r=M(e),E(a.$$.fragment,e),n=M(e),E(s.$$.fragment,e),o=M(e),E(m.$$.fragment,e),b=M(e),E(f.$$.fragment,e),c=M(e),E(d.$$.fragment,e),h=M(e),E(w.$$.fragment,e),y=M(e),C=P(e,"IMG",{src:!0,alt:!0}),this.h()},h(){x(C.src,J="/images/grid_template_area_result.png")||q(C,"src",J),q(C,"alt","result image")},m(e,l){H(t,e,l),u(e,r,l),H(a,e,l),u(e,n,l),H(s,e,l),u(e,o,l),H(m,e,l),u(e,b,l),H(f,e,l),u(e,c,l),H(d,e,l),u(e,h,l),H(w,e,l),u(e,y,l),u(e,C,l),B=!0},p(e,[l]){const K={};l&1&&(K.$$scope={dirty:l,ctx:e}),t.$set(K);const V={};l&1&&(V.$$scope={dirty:l,ctx:e}),a.$set(V);const Q={};l&1&&(Q.$$scope={dirty:l,ctx:e}),s.$set(Q);const U={};l&1&&(U.$$scope={dirty:l,ctx:e}),m.$set(U);const W={};l&1&&(W.$$scope={dirty:l,ctx:e}),f.$set(W);const X={};l&1&&(X.$$scope={dirty:l,ctx:e}),d.$set(X);const Y={};l&1&&(Y.$$scope={dirty:l,ctx:e}),w.$set(Y)},i(e){B||(_(t.$$.fragment,e),_(a.$$.fragment,e),_(s.$$.fragment,e),_(m.$$.fragment,e),_(f.$$.fragment,e),_(d.$$.fragment,e),_(w.$$.fragment,e),B=!0)},o(e){v(t.$$.fragment,e),v(a.$$.fragment,e),v(s.$$.fragment,e),v(m.$$.fragment,e),v(f.$$.fragment,e),v(d.$$.fragment,e),v(w.$$.fragment,e),B=!1},d(e){T(t,e),e&&$(r),T(a,e),e&&$(n),T(s,e),e&&$(o),T(m,e),e&&$(b),T(f,e),e&&$(c),T(d,e),e&&$(h),T(w,e),e&&$(y),e&&$(C)}}}class vt extends I{constructor(t){super(),O(this,t,null,pt,R,{})}}export{vt as default};
