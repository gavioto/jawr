/*
 * Copyright (c) 2001-2007, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.gui.Block");jsx3.Class.defineClass("jsx3.gui.Splitter",jsx3.gui.Block,null,function(m,f){var W=jsx3.gui.Event;var Q=jsx3.gui.Interactive;m.ORIENTATIONH=0;m.ORIENTATIONV=1;m.vy="jsx:///images/splitter/v.gif";m.Mt="jsx:///images/splitter/h.gif";jsx3.html.loadImages("jsx:///images/splitter/v.gif","jsx:///images/splitter/h.gif");m.tg="#2050df";m.RE="#c8c8d5";m.Gw="#ffffff";f.init=function(c,k){this.jsxsuper(c);if(k!=null)this.setOrientation(k);for(var nc=1;nc<=2;nc++){var Sb=new jsx3.gui.Block(c+"_"+nc,null,null,"100%","100%","");Sb.setRelativePosition(jsx3.gui.Block.RELATIVE);Sb.setBackgroundColor(m.Gw);this.setChild(Sb,jsx3.app.Model.PERSISTEMBED,null,jsx3.app.Model.FRAGMENTNS);}};f.paintChild=function(d,p){if(!p)this.repaint();};f.IO=function(c){var v=this.getParent().IO(this);var zb=v.width?v.width:v.parentwidth;var _=v.height?v.height:v.parentheight;var ec=Number(this.getSubcontainer1Pct().doReplace("%",""))/100;var P=0;if(this.getChild(0)==c){if(this.getOrientation()==m.ORIENTATIONH){P=parseInt(zb*ec);return {boxtype:"box",tagname:"div",left:0,top:0,width:P,height:_,parentwidth:P,parentheight:_};}else{P=parseInt(_*ec);return {boxtype:"box",tagname:"div",left:0,top:0,width:zb,height:P,parentwidth:zb,parentheight:P};}}else{if(this.getOrientation()==m.ORIENTATIONH){P=parseInt(zb*ec);return {boxtype:"box",tagname:"div",left:P+8,top:0,width:zb-parseInt(zb*ec)-8,height:_,parentwidth:zb-parseInt(zb*ec)-8,parentheight:_};}else{P=parseInt(_*ec);return {boxtype:"box",tagname:"div",left:0,top:P+8,width:zb,height:_-parseInt(_*ec)-8,parentwidth:zb,parentheight:_-parseInt(_*ec)-8};}}};f.k7=function(n,k,d){var kc=this.RL(true,n);if(k){kc.recalculate(n,k,d);var tb=this.getChildren();var wb=tb.length>2?2:tb.length;var Ic=0;for(var qc=0;qc<wb;qc++){var D=this.IO(tb[qc]);if(qc==1){var mb=kc.pQ(0);if(this.getOrientation()==m.ORIENTATIONH){mb.recalculate({left:Ic,parentheight:wc},k?k.childNodes[0]:null,d);}else{mb.recalculate({top:Ic,parentwidth:w},k?k.childNodes[0]:null,d);}}d.add(tb[qc],D,k?k.childNodes[qc+1]:null,true);var w=D.width!=null?D.width:D.parentwidth;var wc=D.height!=null?D.height:D.parentheight;Ic=this.getOrientation()==m.ORIENTATIONH?w:wc;}}};f.T5=function(r){this.applyDynamicProperties();if(this.getParent()&&(r==null||!isNaN(r.parentwidth)&&!isNaN(r.parentheight)||!isNaN(r.width)&&!isNaN(r.height))){r=this.getParent().IO(this);}else{if(r==null){r={};}}var zc=this.getRelativePosition()!=0;if(r.left==null||!zc&&!jsx3.util.strEmpty(this.getLeft()))r.left=this.getLeft();if(r.top==null||!zc&&!jsx3.util.strEmpty(this.getTop()))r.top=this.getTop();if(r.width==null)r.width="100%";if(r.height==null)r.height="100%";r.tagname="div";r.boxtype="box";var nb=new jsx3.gui.Painted.Box(r);var Vb={};Vb.tagname="div";Vb.boxtype="box";var mb=Number(this.getSubcontainer1Pct().doReplace("%",""))/100;Vb.parentwidth=nb.XK();Vb.parentheight=nb.P5();var oc=this.IO(this.getChild(0));var Nc=this.getOrientation()==m.ORIENTATIONH?oc.width:oc.height;if(this.getOrientation()==m.ORIENTATIONH){Vb.left=Nc;Vb.top=0;Vb.width=8;Vb.height="100%";}else{Vb.left=0;Vb.top=Nc;Vb.width="100%";Vb.height=8;}var eb=new jsx3.gui.Painted.Box(Vb);nb.W8(eb);return nb;};f.paint=function(){this.applyDynamicProperties();var zc=this.RX(W.MOUSEDOWN,"doBeginMove",1);var Wb=this.renderAttributes(null,true);var fc=this.RL(true);fc.setAttributes(this.CI()+this.vH()+" id=\""+this.getId()+"\" class=\"jsx30splitter\" label=\""+this.getName()+"\" "+Wb);fc.setStyles(this.UZ()+this.T1()+this.MU()+this.paintWrap()+this.iN());var E=fc.pQ(0);E.setAttributes(zc+" class=\"jsx30splitter_"+(this.getOrientation()==m.ORIENTATIONH?"h":"v")+"bar\"");E.setStyles(this.UZ()+(this.getOrientation()==m.ORIENTATIONH?this.LA():this.dp()));var pc,D;if((pc=this.getChild(0))!=null)pc.J1(this.IO(pc));if((D=this.getChild(1))!=null)D.J1(this.IO(D));return fc.paint().join(E.paint().join("&#160;")+this.paintChildren());};f.UZ=function(){return "background-color:"+(this.getBackgroundColor()?this.getBackgroundColor():m.RE)+";";};f.paintWrap=function(){return "";};f.doBeginMove=function(b,k){if(!b.leftButton())return;if(this.doEvent(Q.BEFORE_RESIZE,{objEVENT:b,objGUI:k})===false)return;k.style.backgroundColor=m.tg;this._jsxmoving=true;if(this.getOrientation()==m.ORIENTATIONH){jsx3.EventHelp.constrainY=true;}else{jsx3.EventHelp.constrainX=true;}this.jsxsupermix(b,k);W.subscribe(W.MOUSEUP,this,"doResizeEnd");};f.doResizeEnd=function(e){e=e.event;var mc=this.getRendered(e).childNodes[0];W.unsubscribe(W.MOUSEUP,this,"doResizeEnd");if(!this._jsxmoving)return;this._jsxmoving=false;e.releaseCapture(mc);mc.style.backgroundColor=this.getBackgroundColor()?this.getBackgroundColor():m.RE;if(this.getOrientation()==m.ORIENTATIONH){var Vb=parseInt(mc.style.left);var cb=mc.parentNode.offsetWidth;if(Vb<this.getSubcontainer1Min())Vb=this.getSubcontainer1Min();if(Vb>cb-8)Vb=cb-8;var A=Vb/cb*100;A=parseInt(A*100)/100;var Nb=A+"%";}else{var Vb=parseInt(mc.style.top);var cb=mc.parentNode.offsetHeight;if(Vb<this.getSubcontainer1Min())Vb=this.getSubcontainer1Min();if(Vb>cb-8)Vb=cb-8;var A=Vb/cb*100;A=parseInt(A*100)/100;var Nb=A+"%";}this.setSubcontainer1Pct(Nb,true);this.doEvent(Q.AFTER_RESIZE,{objEVENT:e,objGUI:mc});};f.getSubcontainer1Pct=function(){return this.jsxsubcontainer1pct==null?"50%":this.jsxsubcontainer1pct;};f.setSubcontainer1Pct=function(l,q){if(typeof(l)=="number")l=l+"%";this.jsxsubcontainer1pct=l;if(q){var G=this.getRendered();if(G!=null)this.nW({parentwidth:G.offsetWidth,parentheight:G.offsetHeight},G);}return this;};f.getSubcontainer2Pct=function(){return this.jsxsubcontainer2pct==null?"49.999%":this.jsxsubcontainer2pct;};f.setSubcontainer2Pct=function(i){this.jsxsubcontainer2pct=i;return this;};f.getSubcontainer1Min=function(){return this.jsxsubcontainer1min==null?1:this.jsxsubcontainer1min;};f.setSubcontainer1Min=function(p){this.jsxsubcontainer1min=p;return this;};f.getSubcontainer2Min=function(){return this.jsxsubcontainer2min==null?8:this.jsxsubcontainer2min;};f.setSubcontainer2Min=function(a){this.jsxsubcontainer2min=a;return this;};f.getOrientation=function(){return this.jsxorientation==null?m.ORIENTATIONH:this.jsxorientation;};f.setOrientation=function(k){this.jsxorientation=k;this.C5();return this;};f.getVSplitImage=function(){return this.jsxvsplitimage==null?m.vy:this.jsxvsplitimage;};f.setVSplitImage=function(s){this.jsxvsplitimage=s;return this;};f.getHSplitImage=function(){return this.jsxhsplitimage==null?m.Mt:this.jsxhsplitimage;};f.setHSplitImage=function(k){this.jsxhsplitimage=k;return this;};f.dp=function(){var cc=this.getVSplitImage();return cc.search(/background-image\s*:\s*url\(/)!=-1?cc:"background-image:url("+jsx3.resolveURI(cc)+");background-repeat:no-repeat;background-position:center center;";};f.LA=function(){var ob=this.getHSplitImage();return ob.search(/background-image\s*:\s*url\(/)!=-1?ob:"background-image:url("+jsx3.resolveURI(ob)+");background-repeat:no-repeat;background-position:center center;";};f.onSetChild=function(i){return this.getChildren().length<2;};m.getVersion=function(){return "3.0.00";};});jsx3.Splitter=jsx3.gui.Splitter;
