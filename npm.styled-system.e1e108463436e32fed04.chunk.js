(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"0cb451c65b1b200b90c8":function(e,r,t){"use strict";r.__esModule=!0,r.default=r.layout=void 0;var a=t("ea8b7bb70dde4d77e44a"),o={width:{property:"width",scale:"sizes",transform:function(e,r){return(0,a.get)(r,e,!function(e){return"number"===typeof e&&!isNaN(e)}(e)||e>1?e:100*e+"%")}},height:{property:"height",scale:"sizes"},minWidth:{property:"minWidth",scale:"sizes"},minHeight:{property:"minHeight",scale:"sizes"},maxWidth:{property:"maxWidth",scale:"sizes"},maxHeight:{property:"maxHeight",scale:"sizes"},size:{properties:["width","height"],scale:"sizes"},overflow:!0,overflowX:!0,overflowY:!0,display:!0,verticalAlign:!0},d=(0,a.system)(o);r.layout=d;var i=d;r.default=i},"1c80765e3beaf47542b1":function(e,r,t){"use strict";r.__esModule=!0,r.default=r.border=void 0;var a=t("ea8b7bb70dde4d77e44a"),o={border:{property:"border",scale:"borders"},borderWidth:{property:"borderWidth",scale:"borderWidths"},borderStyle:{property:"borderStyle",scale:"borderStyles"},borderColor:{property:"borderColor",scale:"colors"},borderRadius:{property:"borderRadius",scale:"radii"},borderTop:{property:"borderTop",scale:"borders"},borderTopLeftRadius:{property:"borderTopLeftRadius",scale:"radii"},borderTopRightRadius:{property:"borderTopRightRadius",scale:"radii"},borderRight:{property:"borderRight",scale:"borders"},borderBottom:{property:"borderBottom",scale:"borders"},borderBottomLeftRadius:{property:"borderBottomLeftRadius",scale:"radii"},borderBottomRightRadius:{property:"borderBottomRightRadius",scale:"radii"},borderLeft:{property:"borderLeft",scale:"borders"},borderX:{properties:["borderLeft","borderRight"],scale:"borders"},borderY:{properties:["borderTop","borderBottom"],scale:"borders"},borderTopWidth:{property:"borderTopWidth",scale:"borderWidths"},borderTopColor:{property:"borderTopColor",scale:"colors"},borderTopStyle:{property:"borderTopStyle",scale:"borderStyles"}};o.borderTopLeftRadius={property:"borderTopLeftRadius",scale:"radii"},o.borderTopRightRadius={property:"borderTopRightRadius",scale:"radii"},o.borderBottomWidth={property:"borderBottomWidth",scale:"borderWidths"},o.borderBottomColor={property:"borderBottomColor",scale:"colors"},o.borderBottomStyle={property:"borderBottomStyle",scale:"borderStyles"},o.borderBottomLeftRadius={property:"borderBottomLeftRadius",scale:"radii"},o.borderBottomRightRadius={property:"borderBottomRightRadius",scale:"radii"},o.borderLeftWidth={property:"borderLeftWidth",scale:"borderWidths"},o.borderLeftColor={property:"borderLeftColor",scale:"colors"},o.borderLeftStyle={property:"borderLeftStyle",scale:"borderStyles"},o.borderRightWidth={property:"borderRightWidth",scale:"borderWidths"},o.borderRightColor={property:"borderRightColor",scale:"colors"},o.borderRightStyle={property:"borderRightStyle",scale:"borderStyles"};var d=(0,a.system)(o);r.border=d;var i=d;r.default=i},"2da53528f84ea3bd9774":function(e,r,t){"use strict";r.__esModule=!0,r.default=r.createShouldForwardProp=r.props=void 0;var a=i(t("cd0eb74073caaf1fe8d0")),o=i(t("de2af4d9afcc5a974eab")),d=t("6791513f8551a51bbc1a");function i(e){return e&&e.__esModule?e:{default:e}}var n=(0,d.compose)(d.space,d.typography,d.color,d.layout,d.flexbox,d.border,d.background,d.position,d.grid,d.shadow,d.buttonStyle,d.textStyle,d.colorStyle).propNames;r.props=n;var l=function(e){var r=new RegExp("^("+e.join("|")+")$");return(0,a.default)((function(e){return(0,o.default)(e)&&!r.test(e)}))};r.createShouldForwardProp=l;var s=l(n);r.default=s},"3603a438226a89547382":function(e,r,t){"use strict";r.__esModule=!0,r.default=r.position=void 0;var a=t("ea8b7bb70dde4d77e44a"),o={space:[0,4,8,16,32,64,128,256,512]},d={position:!0,zIndex:{property:"zIndex",scale:"zIndices"},top:{property:"top",scale:"space",defaultScale:o.space},right:{property:"right",scale:"space",defaultScale:o.space},bottom:{property:"bottom",scale:"space",defaultScale:o.space},left:{property:"left",scale:"space",defaultScale:o.space}},i=(0,a.system)(d);r.position=i;var n=i;r.default=n},"6791513f8551a51bbc1a":function(e,r,t){"use strict";r.__esModule=!0,r.style=r.left=r.bottom=r.right=r.top=r.zIndex=r.backgroundRepeat=r.backgroundPosition=r.backgroundSize=r.backgroundImage=r.borderRadius=r.borderLeft=r.borderBottom=r.borderRight=r.borderTop=r.borderColor=r.borderStyle=r.borderWidth=r.gridArea=r.gridTemplateAreas=r.gridTemplateRows=r.gridTemplateColumns=r.gridAutoRows=r.gridAutoColumns=r.gridAutoFlow=r.gridRow=r.gridColumn=r.gridRowGap=r.gridColumnGap=r.gridGap=r.order=r.alignSelf=r.justifySelf=r.flexBasis=r.flexShrink=r.flexGrow=r.flex=r.flexDirection=r.flexWrap=r.justifyContent=r.justifyItems=r.alignContent=r.alignItems=r.letterSpacing=r.fontStyle=r.textAlign=r.lineHeight=r.fontWeight=r.fontFamily=r.fontSize=r.opacity=r.overflowY=r.overflowX=r.overflow=r.display=r.verticalAlign=r.size=r.maxHeight=r.maxWidth=r.minHeight=r.minWidth=r.height=r.width=r.colorStyle=r.textStyle=r.buttonStyle=r.variant=r.borders=r.textShadow=r.boxShadow=r.shadow=r.space=r.padding=r.margin=r.system=r.compose=r.get=void 0;var a=t("ea8b7bb70dde4d77e44a");r.createStyleFunction=a.createStyleFunction,r.createParser=a.createParser,r.get=a.get,r.compose=a.compose,r.system=a.system;var o=m(t("0cb451c65b1b200b90c8"));r.layout=o.layout;var d=m(t("f1be97bca962967ca093"));r.color=d.color;var i=m(t("b406a03b8848ee78e119"));r.typography=i.typography;var n=m(t("b70553e2eb2367c8bfaa"));r.flexbox=n.flexbox;var l=m(t("c98b65110c8031093733"));r.grid=l.grid;var s=m(t("1c80765e3beaf47542b1"));r.border=s.border,r.borders=s.default;var p=m(t("7ae5d9e3ef526a693337"));r.background=p.background;var c=m(t("3603a438226a89547382"));r.position=c.position;var f=t("ace4cf3791022bc10e0d");r.margin=f.margin,r.padding=f.padding,r.space=f.space;var u=m(t("73b3483519087044d068"));r.shadow=u.shadow,r.boxShadow=u.default,r.textShadow=u.default;var g=t("d460552fce0c61eb638b");function b(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return b=function(){return e},e}function m(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var r=b();if(r&&r.has(e))return r.get(e);var t={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var d=a?Object.getOwnPropertyDescriptor(e,o):null;d&&(d.get||d.set)?Object.defineProperty(t,o,d):t[o]=e[o]}return t.default=e,r&&r.set(e,t),t}r.variant=g.variant,r.buttonStyle=g.buttonStyle,r.textStyle=g.textStyle,r.colorStyle=g.colorStyle;var y=o.default.width,h=o.default.height,v=o.default.minWidth,S=o.default.minHeight,R=o.default.maxWidth,w=o.default.maxHeight,x=o.default.size,k=o.default.verticalAlign,W=o.default.display,T=o.default.overflow,C=o.default.overflowX,B=o.default.overflowY;r.overflowY=B,r.overflowX=C,r.overflow=T,r.display=W,r.verticalAlign=k,r.size=x,r.maxHeight=w,r.maxWidth=R,r.minHeight=S,r.minWidth=v,r.height=h,r.width=y;var z=d.default.opacity;r.opacity=z;var L=i.default.fontSize,_=i.default.fontFamily,A=i.default.fontWeight,j=i.default.lineHeight,G=i.default.textAlign,M=i.default.fontStyle,I=i.default.letterSpacing;r.letterSpacing=I,r.fontStyle=M,r.textAlign=G,r.lineHeight=j,r.fontWeight=A,r.fontFamily=_,r.fontSize=L;var P=n.default.alignItems,H=n.default.alignContent,O=n.default.justifyItems,F=n.default.justifyContent,X=n.default.flexWrap,Y=n.default.flexDirection,E=n.default.flex,D=n.default.flexGrow,N=n.default.flexShrink,J=n.default.flexBasis,V=n.default.justifySelf,$=n.default.alignSelf,q=n.default.order;r.order=q,r.alignSelf=$,r.justifySelf=V,r.flexBasis=J,r.flexShrink=N,r.flexGrow=D,r.flex=E,r.flexDirection=Y,r.flexWrap=X,r.justifyContent=F,r.justifyItems=O,r.alignContent=H,r.alignItems=P;var K=l.default.gridGap,Q=l.default.gridColumnGap,U=l.default.gridRowGap,Z=l.default.gridColumn,ee=l.default.gridRow,re=l.default.gridAutoFlow,te=l.default.gridAutoColumns,ae=l.default.gridAutoRows,oe=l.default.gridTemplateColumns,de=l.default.gridTemplateRows,ie=l.default.gridTemplateAreas,ne=l.default.gridArea;r.gridArea=ne,r.gridTemplateAreas=ie,r.gridTemplateRows=de,r.gridTemplateColumns=oe,r.gridAutoRows=ae,r.gridAutoColumns=te,r.gridAutoFlow=re,r.gridRow=ee,r.gridColumn=Z,r.gridRowGap=U,r.gridColumnGap=Q,r.gridGap=K;var le=s.default.borderWidth,se=s.default.borderStyle,pe=s.default.borderColor,ce=s.default.borderTop,fe=s.default.borderRight,ue=s.default.borderBottom,ge=s.default.borderLeft,be=s.default.borderRadius;r.borderRadius=be,r.borderLeft=ge,r.borderBottom=ue,r.borderRight=fe,r.borderTop=ce,r.borderColor=pe,r.borderStyle=se,r.borderWidth=le;var me=p.default.backgroundImage,ye=p.default.backgroundSize,he=p.default.backgroundPosition,ve=p.default.backgroundRepeat;r.backgroundRepeat=ve,r.backgroundPosition=he,r.backgroundSize=ye,r.backgroundImage=me;var Se=c.default.zIndex,Re=c.default.top,we=c.default.right,xe=c.default.bottom,ke=c.default.left;r.left=ke,r.bottom=xe,r.right=we,r.top=Re,r.zIndex=Se;r.style=function(e){var r=e.prop,t=e.cssProperty,o=e.alias,d=e.key,i=e.transformValue,n=e.scale,l=e.properties,s={};return s[r]=(0,a.createStyleFunction)({properties:l,property:t||r,scale:d,defaultScale:n,transform:i}),o&&(s[o]=s[r]),(0,a.createParser)(s)}},"73b3483519087044d068":function(e,r,t){"use strict";r.__esModule=!0,r.default=r.shadow=void 0;var a=(0,t("ea8b7bb70dde4d77e44a").system)({boxShadow:{property:"boxShadow",scale:"shadows"},textShadow:{property:"textShadow",scale:"shadows"}});r.shadow=a;var o=a;r.default=o},"7ae5d9e3ef526a693337":function(e,r,t){"use strict";r.__esModule=!0,r.default=r.background=void 0;var a=t("ea8b7bb70dde4d77e44a"),o={background:!0,backgroundImage:!0,backgroundSize:!0,backgroundPosition:!0,backgroundRepeat:!0};o.bgImage=o.backgroundImage,o.bgSize=o.backgroundSize,o.bgPosition=o.backgroundPosition,o.bgRepeat=o.backgroundRepeat;var d=(0,a.system)(o);r.background=d;var i=d;r.default=i},ace4cf3791022bc10e0d:function(e,r,t){"use strict";r.__esModule=!0,r.default=r.space=r.padding=r.margin=void 0;var a=t("ea8b7bb70dde4d77e44a"),o={space:[0,4,8,16,32,64,128,256,512]},d=function(e){return"number"===typeof e&&!isNaN(e)},i=function(e,r){if(!d(e))return(0,a.get)(r,e,e);var t=e<0,o=Math.abs(e),i=(0,a.get)(r,o,o);return d(i)?i*(t?-1:1):t?"-"+i:i},n={};n.margin={margin:{property:"margin",scale:"space",transform:i,defaultScale:o.space},marginTop:{property:"marginTop",scale:"space",transform:i,defaultScale:o.space},marginRight:{property:"marginRight",scale:"space",transform:i,defaultScale:o.space},marginBottom:{property:"marginBottom",scale:"space",transform:i,defaultScale:o.space},marginLeft:{property:"marginLeft",scale:"space",transform:i,defaultScale:o.space},marginX:{properties:["marginLeft","marginRight"],scale:"space",transform:i,defaultScale:o.space},marginY:{properties:["marginTop","marginBottom"],scale:"space",transform:i,defaultScale:o.space}},n.margin.m=n.margin.margin,n.margin.mt=n.margin.marginTop,n.margin.mr=n.margin.marginRight,n.margin.mb=n.margin.marginBottom,n.margin.ml=n.margin.marginLeft,n.margin.mx=n.margin.marginX,n.margin.my=n.margin.marginY,n.padding={padding:{property:"padding",scale:"space",defaultScale:o.space},paddingTop:{property:"paddingTop",scale:"space",defaultScale:o.space},paddingRight:{property:"paddingRight",scale:"space",defaultScale:o.space},paddingBottom:{property:"paddingBottom",scale:"space",defaultScale:o.space},paddingLeft:{property:"paddingLeft",scale:"space",defaultScale:o.space},paddingX:{properties:["paddingLeft","paddingRight"],scale:"space",defaultScale:o.space},paddingY:{properties:["paddingTop","paddingBottom"],scale:"space",defaultScale:o.space}},n.padding.p=n.padding.padding,n.padding.pt=n.padding.paddingTop,n.padding.pr=n.padding.paddingRight,n.padding.pb=n.padding.paddingBottom,n.padding.pl=n.padding.paddingLeft,n.padding.px=n.padding.paddingX,n.padding.py=n.padding.paddingY;var l=(0,a.system)(n.margin);r.margin=l;var s=(0,a.system)(n.padding);r.padding=s;var p=(0,a.compose)(l,s);r.space=p;var c=p;r.default=c},b406a03b8848ee78e119:function(e,r,t){"use strict";r.__esModule=!0,r.default=r.typography=void 0;var a={fontFamily:{property:"fontFamily",scale:"fonts"},fontSize:{property:"fontSize",scale:"fontSizes",defaultScale:[12,14,16,20,24,32,48,64,72]},fontWeight:{property:"fontWeight",scale:"fontWeights"},lineHeight:{property:"lineHeight",scale:"lineHeights"},letterSpacing:{property:"letterSpacing",scale:"letterSpacings"},textAlign:!0,fontStyle:!0},o=(0,t("ea8b7bb70dde4d77e44a").system)(a);r.typography=o;var d=o;r.default=d},b70553e2eb2367c8bfaa:function(e,r,t){"use strict";r.__esModule=!0,r.default=r.flexbox=void 0;var a=(0,t("ea8b7bb70dde4d77e44a").system)({alignItems:!0,alignContent:!0,justifyItems:!0,justifyContent:!0,flexWrap:!0,flexDirection:!0,flex:!0,flexGrow:!0,flexShrink:!0,flexBasis:!0,justifySelf:!0,alignSelf:!0,order:!0});r.flexbox=a;var o=a;r.default=o},c98b65110c8031093733:function(e,r,t){"use strict";r.__esModule=!0,r.default=r.grid=void 0;var a=t("ea8b7bb70dde4d77e44a"),o={space:[0,4,8,16,32,64,128,256,512]},d={gridGap:{property:"gridGap",scale:"space",defaultScale:o.space},gridColumnGap:{property:"gridColumnGap",scale:"space",defaultScale:o.space},gridRowGap:{property:"gridRowGap",scale:"space",defaultScale:o.space},gridColumn:!0,gridRow:!0,gridAutoFlow:!0,gridAutoColumns:!0,gridAutoRows:!0,gridTemplateColumns:!0,gridTemplateRows:!0,gridTemplateAreas:!0,gridArea:!0},i=(0,a.system)(d);r.grid=i;var n=i;r.default=n},cd0eb74073caaf1fe8d0:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e){var r=Object.create(null);return function(t){return void 0===r[t]&&(r[t]=e(t)),r[t]}}},d460552fce0c61eb638b:function(e,r,t){"use strict";r.__esModule=!0,r.colorStyle=r.textStyle=r.buttonStyle=r.default=r.variant=void 0;var a,o=t("ea8b7bb70dde4d77e44a"),d=(a=t("d61ac4e1a73301ca5faf"))&&a.__esModule?a:{default:a};var i=function(e){var r,t,a=e.scale,i=e.prop,n=void 0===i?"variant":i,l=e.variants,s=void 0===l?{}:l,p=e.key;(t=Object.keys(s).length?function(e,r,t){return(0,d.default)((0,o.get)(r,e,null))(t.theme)}:function(e,r){return(0,o.get)(r,e,null)}).scale=a||p,t.defaults=s;var c=((r={})[n]=t,r);return(0,o.createParser)(c)};r.variant=i;var n=i;r.default=n;var l=i({key:"buttons"});r.buttonStyle=l;var s=i({key:"textStyles",prop:"textStyle"});r.textStyle=s;var p=i({key:"colorStyles",prop:"colors"});r.colorStyle=p},d61ac4e1a73301ca5faf:function(e,r,t){"use strict";function a(){return(a=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e}).apply(this,arguments)}r.__esModule=!0,r.default=r.css=r.responsive=r.get=void 0;var o=function(e,r,t,a,o){for(r=r&&r.split?r.split("."):[r],a=0;a<r.length;a++)e=e?e[r[a]]:o;return e===o?t:e};r.get=o;var d=[40,52,64].map((function(e){return e+"em"})),i={space:[0,4,8,16,32,64,128,256,512],fontSizes:[12,14,16,20,24,32,48,64,72]},n={bg:"backgroundColor",m:"margin",mt:"marginTop",mr:"marginRight",mb:"marginBottom",ml:"marginLeft",mx:"marginX",my:"marginY",p:"padding",pt:"paddingTop",pr:"paddingRight",pb:"paddingBottom",pl:"paddingLeft",px:"paddingX",py:"paddingY"},l={marginX:["marginLeft","marginRight"],marginY:["marginTop","marginBottom"],paddingX:["paddingLeft","paddingRight"],paddingY:["paddingTop","paddingBottom"],size:["width","height"]},s={color:"colors",backgroundColor:"colors",borderColor:"colors",margin:"space",marginTop:"space",marginRight:"space",marginBottom:"space",marginLeft:"space",marginX:"space",marginY:"space",padding:"space",paddingTop:"space",paddingRight:"space",paddingBottom:"space",paddingLeft:"space",paddingX:"space",paddingY:"space",top:"space",right:"space",bottom:"space",left:"space",gridGap:"space",gridColumnGap:"space",gridRowGap:"space",gap:"space",columnGap:"space",rowGap:"space",fontFamily:"fonts",fontSize:"fontSizes",fontWeight:"fontWeights",lineHeight:"lineHeights",letterSpacing:"letterSpacings",border:"borders",borderTop:"borders",borderRight:"borders",borderBottom:"borders",borderLeft:"borders",borderWidth:"borderWidths",borderStyle:"borderStyles",borderRadius:"radii",borderTopRightRadius:"radii",borderTopLeftRadius:"radii",borderBottomRightRadius:"radii",borderBottomLeftRadius:"radii",borderTopWidth:"borderWidths",borderTopColor:"colors",borderTopStyle:"borderStyles",borderBottomWidth:"borderWidths",borderBottomColor:"colors",borderBottomStyle:"borderStyles",borderLeftWidth:"borderWidths",borderLeftColor:"colors",borderLeftStyle:"borderStyles",borderRightWidth:"borderWidths",borderRightColor:"colors",borderRightStyle:"borderStyles",outlineColor:"colors",boxShadow:"shadows",textShadow:"shadows",zIndex:"zIndices",width:"sizes",minWidth:"sizes",maxWidth:"sizes",height:"sizes",minHeight:"sizes",maxHeight:"sizes",flexBasis:"sizes",size:"sizes",fill:"colors",stroke:"colors"},p=function(e,r){if("number"!==typeof r||r>=0)return o(e,r,r);var t=Math.abs(r),a=o(e,t,t);return"string"===typeof a?"-"+a:-1*a},c=["margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","top","bottom","left","right"].reduce((function(e,r){var t;return a({},e,((t={})[r]=p,t))}),{}),f=function(e){return function(r){var t={},a=o(r,"breakpoints",d),i=[null].concat(a.map((function(e){return"@media screen and (min-width: "+e+")"})));for(var n in e){var l="function"===typeof e[n]?e[n](r):e[n];if(null!=l)if(Array.isArray(l))for(var s=0;s<l.slice(0,i.length).length;s++){var p=i[s];p?(t[p]=t[p]||{},null!=l[s]&&(t[p][n]=l[s])):t[n]=l[s]}else t[n]=l}return t}};r.responsive=f;var u=function e(r){return function(t){void 0===t&&(t={});var d=a({},i,{},t.theme||t),p={},u="function"===typeof r?r(d):r,g=f(u)(d);for(var b in g){var m=g[b],y="function"===typeof m?m(d):m;if("variant"!==b)if(y&&"object"===typeof y)p[b]=e(y)(d);else{var h=o(n,b,b),v=o(s,h),S=o(d,v,o(d,h,{})),R=o(c,h,o)(S,y,y);if(l[h])for(var w=l[h],x=0;x<w.length;x++)p[w[x]]=R;else p[h]=R}else p=a({},p,{},e(o(d,y))(d))}return p}};r.css=u;var g=u;r.default=g},ea8b7bb70dde4d77e44a:function(e,r,t){"use strict";r.__esModule=!0,r.compose=r.system=r.createStyleFunction=r.createParser=r.get=r.merge=void 0;var a,o=(a=t("83406643bfb209d249f4"))&&a.__esModule?a:{default:a};var d=function(e,r){var t=(0,o.default)({},e,r);for(var a in e){var d;e[a]&&"object"===typeof r[a]&&(0,o.default)(t,((d={})[a]=(0,o.default)(e[a],r[a]),d))}return t};r.merge=d;var i={breakpoints:[40,52,64].map((function(e){return e+"em"}))},n=function(e){return"@media screen and (min-width: "+e+")"},l=function(e,r){return s(r,e,e)},s=function(e,r,t,a,o){for(r=r&&r.split?r.split("."):[r],a=0;a<r.length;a++)e=e?e[r[a]]:o;return e===o?t:e};r.get=s;var p=function e(r){var t={},a=function(e){var a={},l=!1,p=e.theme&&e.theme.disableStyledSystemCache;for(var u in e)if(r[u]){var g=r[u],b=e[u],m=s(e.theme,g.scale,g.defaults);if("object"!==typeof b)(0,o.default)(a,g(b,m,e));else{if(t.breakpoints=!p&&t.breakpoints||s(e.theme,"breakpoints",i.breakpoints),Array.isArray(b)){t.media=!p&&t.media||[null].concat(t.breakpoints.map(n)),a=d(a,c(t.media,g,m,b,e));continue}null!==b&&(a=d(a,f(t.breakpoints,g,m,b,e)),l=!0)}}return l&&(a=function(e){var r={};return Object.keys(e).sort((function(e,r){return e.localeCompare(r,void 0,{numeric:!0,sensitivity:"base"})})).forEach((function(t){r[t]=e[t]})),r}(a)),a};a.config=r,a.propNames=Object.keys(r),a.cache=t;var l=Object.keys(r).filter((function(e){return"config"!==e}));return l.length>1&&l.forEach((function(t){var o;a[t]=e(((o={})[t]=r[t],o))})),a};r.createParser=p;var c=function(e,r,t,a,d){var i={};return a.slice(0,e.length).forEach((function(a,n){var l,s=e[n],p=r(a,t,d);s?(0,o.default)(i,((l={})[s]=(0,o.default)({},i[s],p),l)):(0,o.default)(i,p)})),i},f=function(e,r,t,a,d){var i={};for(var l in a){var s=e[l],p=r(a[l],t,d);if(s){var c,f=n(s);(0,o.default)(i,((c={})[f]=(0,o.default)({},i[f],p),c))}else(0,o.default)(i,p)}return i},u=function(e){var r=e.properties,t=e.property,a=e.scale,o=e.transform,d=void 0===o?l:o,i=e.defaultScale;r=r||[t];var n=function(e,t,a){var o={},i=d(e,t,a);if(null!==i)return r.forEach((function(e){o[e]=i})),o};return n.scale=a,n.defaults=i,n};r.createStyleFunction=u;r.system=function(e){void 0===e&&(e={});var r={};return Object.keys(e).forEach((function(t){var a=e[t];r[t]=!0!==a?"function"!==typeof a?u(a):a:u({property:t,scale:t})})),p(r)};r.compose=function(){for(var e={},r=arguments.length,t=new Array(r),a=0;a<r;a++)t[a]=arguments[a];t.forEach((function(r){r&&r.config&&(0,o.default)(e,r.config)}));var d=p(e);return d}},f1be97bca962967ca093:function(e,r,t){"use strict";r.__esModule=!0,r.default=r.color=void 0;var a=t("ea8b7bb70dde4d77e44a"),o={color:{property:"color",scale:"colors"},backgroundColor:{property:"backgroundColor",scale:"colors"},opacity:!0};o.bg=o.backgroundColor;var d=(0,a.system)(o);r.color=d;var i=d;r.default=i}}]);