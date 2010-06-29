/*
 * Copyright (c) 2001-2007, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.gui.Painted","jsx3.gui.Interactive");jsx3.Class.defineClass("jsx3.gui.Block",jsx3.gui.Painted,[jsx3.gui.Interactive],function(l,k){var gb=jsx3.gui.Event;var F=jsx3.gui.Interactive;l.SCROLLSIZE=16;l.OVERFLOWSCROLL=1;l.OVERFLOWHIDDEN=2;l.OVERFLOWEXPAND=3;l.DEFAULTFONTNAME="Verdana";l.DEFAULTFONTSIZE=10;l.DEFAULTCOLOR="#000000";l.DEFAULTTEXT="&#160;";l.DEFAULTCLASSNAME="jsx30block";l.DEFAULTTAGNAME="span";l.FONTBOLD="bold";l.FONTNORMAL="normal";l.DISPLAYBLOCK="";l.DISPLAYNONE="none";l.VISIBILITYVISIBLE="";l.VISIBILITYHIDDEN="hidden";l.NULLSTYLE=-1;l.ALIGNLEFT="left";l.ALIGNCENTER="center";l.ALIGNRIGHT="right";l.ABSOLUTE=0;l.RELATIVE=1;l.MASK_NO_EDIT=jsx3.gui.Painted.MASK_NO_EDIT;l.MASK_ALL_EDIT=jsx3.gui.Painted.MASK_ALL_EDIT;l.MASK_EAST_ONLY={NN:false,EE:true,SS:false,WW:false,MM:false};l.SPACE=jsx3.resolveURI("jsx:///images/spc.gif");jsx3.html.loadImages(l.SPACE);k.init=function(h,q,j,f,c,m){this.jsxsuper(h);if(q!=null)this.setLeft(q);if(j!=null)this.setTop(j);if(f!=null)this.setWidth(f);if(c!=null)this.setHeight(c);if(m!=null)this.setText(m);};k.getBackgroundColor=function(){return this.jsxbgcolor;};k.setBackgroundColor=function(g,m){this.jsxbgcolor=g;if(m)this.updateGUI("backgroundColor",g==l.NULLSTYLE?"":g);return this;};k.getBackground=function(){return this.jsxbg;};k.setBackground=function(j){this.jsxbg=j;return this;};k.getBorder=function(){return this.jsxborder;};k.setBorder=function(e,n){this.jsxborder=e;if(n)this.recalcBox(["border"]);else this.C5();return this;};k.getColor=function(){return this.jsxcolor;};k.setColor=function(b,h){this.jsxcolor=b;if(h)this.updateGUI("color",b==l.NULLSTYLE?"":b);return this;};k.getCursor=function(){return this.jsxcursor;};k.setCursor=function(f,i){this.jsxcursor=f;if(i)this.updateGUI("cursor",f);return this;};k.getCSSOverride=function(){return this.jsxstyleoverride;};k.setCSSOverride=function(o){this.jsxstyleoverride=o;return this;};k.getClassName=function(){return this.jsxclassname;};k.setClassName=function(o){this.jsxclassname=o;return this;};k.getDisplay=function(){return this.jsxdisplay;};k.setDisplay=function(p,o){this.jsxdisplay=p;if(o){if(p!=l.DISPLAYNONE){var x=this.RL();if(!(this.getRelativePosition()==l.ABSOLUTE||x&&x.getBoxType()!="relativebox")){var Nc=jsx3.gui.Painted.Box.getCssFix().split(":");if(Nc.length==2)p=Nc[1];}}this.updateGUI("display",p);}return this;};k.getFontName=function(){return this.jsxfontname;};k.setFontName=function(i){this.jsxfontname=i;return this;};k.getFontSize=function(){return this.jsxfontsize;};k.setFontSize=function(a){this.jsxfontsize=a;return this;};k.getFontWeight=function(){return this.jsxfontweight;};k.setFontWeight=function(j){this.jsxfontweight=j;return this;};k.getHeight=function(){return this.jsxheight;};k.setHeight=function(h,e){this.jsxheight=h;if(e){var Lc=this.RL(true);this.nW({height:h,parentwidth:Lc.implicit.parentwidth,parentheight:Lc.implicit.parentheight},true);}else{this.C5();}return this;};k.getIndex=function(){return this.jsxindex;};k.setIndex=function(m,r){this.jsxindex=m;if(r){var Tb=this.getRendered();if(Tb!=null)Tb.tabIndex=m;}return this;};l.getJSXParent=function(g){return jsx3.html.getJSXParent(g);};k.getLeft=function(){return this.jsxleft;};k.setLeft=function(s,b){this.jsxleft=s;if(b){if(s==null)s=0;var qc=this.RL(true);this.nW({left:s,parentwidth:qc.implicit.parentwidth,parentheight:qc.implicit.parentheight},true,true);}else{this.vQ(false);}return this;};k.setDimensions=function(b,o,h,p,a){if(b instanceof Array){this.setLeft(b[0],a);this.setTop(b[1],a);this.setWidth(b[2],a);this.setHeight(b[3],a);}else{this.setLeft(b,a);this.setTop(o,a);this.setWidth(h,a);this.setHeight(p,a);}};k.getDimensions=function(){return [this.getLeft(),this.getTop(),this.getWidth(),this.getHeight()];};k.getMargin=function(){return this.jsxmargin;};k.setMargin=function(r,h){this.jsxmargin=r;if(h)this.recalcBox(["margin"]);else this.C5();return this;};k.getMaskProperties=function(){var Q={};Q.NN=true;Q.SS=true;Q.EE=true;Q.WW=true;Q.MM=this.getRelativePosition()==l.ABSOLUTE;return Q;};k.doBeginMove=function(m,s){if(m.leftButton()){this.jsxsupermix(m,s);gb.subscribe(gb.MOUSEUP,this,"doEndMove");m.cancelAll();}};k.doEndMove=function(f){f=f.event;var ic=this.getRendered(f);if(f.leftButton()){gb.unsubscribe(gb.MOUSEUP,this,"doEndMove");this.jsxsupermix(f,ic);}else{this._4(f,ic);}};k.doBeginDrag=function(h,e){if(h.leftButton())this.doDrag(h,e,null);};k.getOverflow=function(){return this.jsxoverflow;};k.setOverflow=function(j){this.jsxoverflow=j;return this;};k.getPadding=function(){return this.jsxpadding;};k.setPadding=function(s,i){this.jsxpadding=s;if(i)this.recalcBox(["padding"]);else this.C5();return this;};k.getPropertiesPath=function(){return null;};k.getModelEventsPath=function(){return null;};k.getRelativePosition=function(){return this.jsxrelativeposition;};k.setRelativePosition=function(o,e){this.C5();this.jsxrelativeposition=o;if(e){if(o==l.ABSOLUTE){this.setLeft(this.getLeft()?this.getLeft():0,true);this.setTop(this.getTop()?this.getTop():0,true);this.updateGUI("margin","0px");}else{this.updateGUI("left","0px");this.updateGUI("top","0px");if(this.getMargin())this.setMargin(this.getMargin(),true);}this.updateGUI("position",o==l.RELATIVE?"relative":"absolute");if(this.getDisplay()!=l.DISPLAYNONE)this.setDisplay(l.DISPLAYBLOCK,true);}return this;};k.getTagName=function(){return this.jsxtagname;};k.setTagName=function(r){this.jsxtagname=r;return this;};k.getText=function(){return this.jsxtext;};k.setText=function(g,f){this.jsxtext=g;if(f){if(this.getChild(0)!=null||this.RL(true).pQ(0)!=null){this.repaint();}else{var _=this.getRendered();if(_!=null)_.innerHTML=g;}}return this;};k.getTextAlign=function(){return this.jsxtextalign;};k.setTextAlign=function(r){this.jsxtextalign=r;return this;};k.getTip=function(){return this.jsxtip;};k.setTip=function(g){this.jsxtip=g;var ab;if(ab=this.getRendered())ab.title=g;return this;};k.getTop=function(){return this.jsxtop;};k.setTop=function(o,m){this.jsxtop=o;if(m){if(o==null)o=0;var Ic=this.RL(true);this.nW({top:o,parentwidth:Ic.implicit.parentwidth,parentheight:Ic.implicit.parentheight},true,true);}else{this.vQ(false);}return this;};k.updateGUI=function(r,b){var jb=this.getRendered();if(jb!=null){try{jb.style[r]=b;}catch(Kc){}}};k.getVisibility=function(){return this.jsxvisibility;};k.setVisibility=function(h,g){this.jsxvisibility=h;if(g)this.updateGUI("visibility",h);return this;};k.getWidth=function(){return this.jsxwidth;};k.setWidth=function(h,p){this.jsxwidth=h;if(p){var fb=this.RL(true);this.nW({width:h,parentwidth:fb.implicit.parentwidth,parentheight:fb.implicit.parentheight},true);}else{this.C5();}return this;};k.getZIndex=function(){return this.jsxzindex;};k.setZIndex=function(e,q){this.jsxzindex=e;if(q)this.updateGUI("zIndex",e);return this;};k.k7=function(j,g,h){this.B_(j,g,h,2);};k.T5=function(c){this.applyDynamicProperties();if(this.getParent()&&(c==null||isNaN(c.parentwidth)||isNaN(c.parentheight))){c=this.getParent().IO(this);}else{if(c==null){c={};}}var D=c.boxtype&&c.boxtype!="box"||this.getRelativePosition()!=0;var rb=D?null:c.left?c.left:this.getLeft();var fb=D?null:c.top?c.top:this.getTop();if(!D&&!rb)rb=0;if(!D&&!fb)fb=0;var S,zc,hb,vc;if(c.boxtype==null)c.boxtype=D?"relativebox":"box";if(c.tagname==null)c.tagname=(S=this.getTagName())?S.toLowerCase():jsx3.gui.Block.DEFAULTTAGNAME;if(c.left==null&&c.boxtype=="box")c.left=rb;if(c.top==null&&c.boxtype=="box")c.top=fb;if(c.width==null)c.width=c.width?c.width:this.getWidth();if(c.height==null)c.height=c.height?c.height:this.getHeight();if(c.width=="100%"||c.tagName=="div"&&this.AN()==""){c.tagname="div";c.container=true;}if((zc=this.getPadding())!=null&&zc!="")c.padding=zc;if(D&&(hb=this.getMargin())!=null&&hb!="")c.margin=hb;if((vc=this.getBorder())!=null&&vc!="")c.border=vc;return new jsx3.gui.Painted.Box(c);};k.paint=function(m){this.applyDynamicProperties();m=m==null?this.AN():m;var zb=this.getId();var fc={};if(this.hasEvent(F.JSXDOUBLECLICK))fc[gb.DOUBLECLICK]=true;if(this.hasEvent(F.JSXCLICK))fc[gb.CLICK]=true;if(this.hasEvent(F.JSXKEYDOWN))fc[gb.KEYDOWN]=true;var tc="";if(this.getCanSpy()==1){fc[gb.MOUSEOVER]=true;fc[gb.MOUSEOUT]=true;}if(this.getCanMove()==1){if(this.getCanMove()==1){fc[gb.MOUSEDOWN]="doBeginMove";}}else{if(this.getMenu()!=null){fc[gb.MOUSEUP]=true;}else{if(this.getCanDrop()==1){fc[gb.MOUSEUP]=true;}}}if(fc[gb.MOUSEDOWN]==null&&this.getCanDrag()==1){fc[gb.MOUSEDOWN]="doBeginDrag";tc=tc+(" JSXDragId=\""+zb+"\" JSXDragType=\"JSX_GENERIC\"");}var rb=this.lM(fc,0)+tc;var Q=this.renderAttributes(null,true);var bb=this.RL(true);bb.setAttributes(this.CI()+this.vH()+rb+" id=\""+zb+"\" label=\""+this.getName()+"\" class=\""+this.CH()+"\" "+Q);bb.setStyles(this.g0()+this.UZ()+this.K2()+this.QP()+this.A0()+this.oY()+this.d9()+this.D6()+this.eQ()+this.I6()+this.T1()+this.paintBlockDisplay()+this.iN());return bb.paint().join(m+this.paintChildren());};k.CL=function(r,n){if(this.getCanSpy()==1)this.doSpyOver(r,n);if(this.getCanDrop()==1)this.doDrop(r,n,jsx3.EventHelp.ONBEFOREDROP);};k.u2=function(d,i){if(this.getCanSpy()==1)this.doSpyOut(d,i);if(this.getCanDrop()==1)this.doDrop(d,i,jsx3.EventHelp.ONCANCELDROP);};k._4=function(o,q){if(this.getCanDrop()==1)this.doDrop(o,q,jsx3.EventHelp.ONDROP);else this.jsxsupermix(o,q);};k.UZ=function(){var Nc=this.getBackgroundColor();return Nc?"background-color:"+Nc+";":"";};k.K2=function(){return this.getBackground()?this.getBackground()+";":"";};k.QP=function(){var bc=this.getColor();return bc?"color:"+bc+";":"";};k.I6=function(){var Nc=this.getCursor();return Nc?"cursor:"+Nc+";":"";};k.iN=function(){return this.getCSSOverride()?this.getCSSOverride():"";};k.CH=function(){var v=this.getClassName();return l.DEFAULTCLASSNAME+(v?" "+v:"");};k.paintBlockDisplay=function(){if(jsx3.util.strEmpty(this.getDisplay())||this.getDisplay()=="block"){var O=this.RL();if(this.getWidth()=="100%"){return "display:block;";}else{return "";}}else{if(this.getDisplay()=="none"){return "display:none;";}}return "";};k.MU=function(){var Dc=this.getDisplay();return jsx3.util.strEmpty(Dc)||Dc==l.DISPLAYBLOCK?"":"display:none;";};k.oY=function(){var Hb=this.getFontName();return Hb?"font-family:"+Hb+";":"";};k.g0=function(){var Nb=parseInt(this.getFontSize());return isNaN(Nb)?"":"font-size:"+Nb+"px;";};k.D6=function(){var bc=this.getFontWeight();return bc?"font-weight:"+bc+";":"";};k.CI=function(a){if(a==null)a=this.getIndex();return a!=null?" tabindex=\""+a+"\" jsxtabindex=\""+a+"\"":"";};k.A0=function(){if(this.getOverflow()==l.OVERFLOWSCROLL){return "overflow:auto;";}else{if(this.getOverflow()==l.OVERFLOWHIDDEN){return "overflow:hidden;";}else{return "";}}};k.fY=function(){return this.getTagName()?this.getTagName():l.DEFAULTTAGNAME;};k.AN=function(){return this.getText()?this.getText():"";};k.eQ=function(){var ub=this.getTextAlign();return ub?"text-align:"+ub+";":"";};k.vH=function(){var Qb=this.getTip();if(Qb!=null){Qb=Qb.doReplace("\"","&quot;");return Qb?" title=\""+Qb+"\" ":"";}else{if(jsx3.gui.Form&&this.instanceOf(jsx3.gui.Form)){var E=this.getKeyBinding();return E?" title=\""+E.doReplace("\"","&quot;")+"\" ":"";}else{return "";}}};k.T1=function(){return jsx3.util.strEmpty(this.getVisibility())||this.getVisibility()==l.VISIBILITYVISIBLE?"":"visibility:hidden;";};k.d9=function(){var R=this.getZIndex();return isNaN(R)?"":"z-index:"+R+";";};k.showMask=function(d){if(this._jsxQD)this.hideMask();var Ub;if(Ub=this.getRendered()){var sc=this.getAbsolutePosition().H;if(Ub.onfocus)Ub._jsxwx=Ub.onfocus;jsx3.html.addEventListener(Ub,"onfocus",l.Wf);if(Ub.tabIndex)Ub._jsxtabindex=Ub.tabIndex;Ub.tabIndex=0;this._jsxQD=jsx3.gui.Heavyweight.getKey();var rc=(new l(this._jsxQD,0,0,"100%","100%",d)).setOverflow(l.OVERFLOWHIDDEN).setFontWeight(l.FONTBOLD).setTextAlign(l.ALIGNCENTER).setIndex(0).setRelativePosition(0).setZIndex(32000).setDynamicProperty("jsxbgcolor","@Solid Shadow").setDynamicProperty("jsxbg","@Mask 70%").setDynamicProperty("jsxcursor","@Wait");rc.setWidth("100%");rc.setHeight("100%");rc.setPadding(parseInt(sc/2));rc.setEvent("if (objEVENT.tabKey() && objEVENT.shiftKey()) { this.getParent().focus(); }",F.JSXKEYDOWN);rc.setAttribute("onfocus","var objEVENT = jsx3.gui.Event.wrap(event); if (objEVENT.shiftKey()) { jsx3.GO(this.id).getParent().focus(); }");this.setChild(rc);this.paintChild(rc);}};l.Wf=function(i){var rc=jsx3.GO(this.id);if(rc){var G=gb.wrap(i||window.event);if(!G.shiftKey()){if(rc.getChildren().length)rc.getLastChild().focus();}}};k.hideMask=function(){var Fb;if(Fb=jsx3.GO(this._jsxQD)){this.removeChild(Fb);delete this._jsxQD;var X;if(X=this.getRendered()){if(X._jsxtabindex){X.tabIndex=X._jsxtabindex;}else{X.removeAttribute("tabIndex");}jsx3.html.removeEventListener(X,"onfocus",l.Wf);if(X._jsxwx){X.onfocus=X._jsxwx;delete X._jsxwx;}else{}}}};l.getVersion=function(){return "3.00.00";};k.onDestroy=function(h){this.jsxsuper(h);this.doEvent(jsx3.gui.Interactive.DESTROY,{objPARENT:h});};});jsx3.Block=jsx3.gui.Block;
