/*
 * Copyright (c) 2001-2007, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.xml.Cacheable","jsx3.gui.Form","jsx3.gui.Block");jsx3.Class.defineClass("jsx3.gui.Tree",jsx3.gui.Block,[jsx3.gui.Form,jsx3.xml.Cacheable,jsx3.xml.CDF],function(h,d){var Ob=jsx3.gui.Event;var Ib=jsx3.gui.Interactive;h.DEFAULTXSLID="JSX_TREE_XSL";h.DEFAULTXSLURL=jsx3.resolveURI("jsx:///xsl/jsxtree.xsl");h.ICONMINUS="jsx:///images/tree/minus.gif";h.ICONPLUS="jsx:///images/tree/plus.gif";h.ICON=jsx3.resolveURI("jsx:///images/tree/file.gif");h.SELECTEDIMAGE=jsx3.resolveURI("jsx:///images/tree/select.gif");h.ONDROPBGIMAGE="url("+jsx3.resolveURI("jsx:///images/tree/over.gif")+")";jsx3.html.loadImages(h.ICONMINUS,h.ICONPLUS,h.ICON,h.SELECTEDIMAGE,"jsx:///images/tree/over.gif");h.BORDERCOLOR="#8CAEDF";h.DEFAULTBACKGROUNDCOLOR="#ffffff";h.DEFAULTNODATAMSG="&#160;";h.vg=null;h.Yl=null;h.rf=250;h.De=null;h.MULTI=1;h.SINGLE=0;d.init=function(m,i){this.jsxsuper(m);if(i!=null)this.insertRecordProperty(i,"jsxselected","1",false);};d.onAfterAttach=function(){if(this.jsxvalue!=null&&this.jsxvalue!=""&&this.jsxvalue!="null")this.setValue(this.jsxvalue);this.jsxsuper();};d.getXSL=function(){var Ec=this.jsxsupermix(true);return Ec||this.getServer().getCache().getOrOpenDocument(h.DEFAULTXSLURL,h.DEFAULTXSLID);};d.doValidate=function(){var N=this.Et();var Zb=N.length>0||this.getRequired()==jsx3.gui.Form.OPTIONAL;this.setValidationState(Zb?jsx3.gui.Form.STATEVALID:jsx3.gui.Form.STATEINVALID);return this.getValidationState();};d.UZ=function(){return "background-color:"+(this.getBackgroundColor()?this.getBackgroundColor():h.DEFAULTBACKGROUNDCOLOR)+";";};d.setValue=function(g,c){var Gc=this.getMultiSelect()==h.MULTI;var Pb=this.isOldEventProtocol();if(g instanceof Array){if(!Gc)throw new jsx3.IllegalArgumentException("strRecordId",g);}else{if(Gc){g=[g];}}if(Gc){this.oj();for(var X=0;X<g.length;X++){var hc=g[X];if(hc!=null&&!this.g5(hc))continue;this.pn(hc);}if(c&&g.length>0)this.revealRecord(g[0]);if(Pb)this.doEvent(Ib.SELECT,{strRECORDID:g[0],strRECORDIDS:g});}else{if(g!=null&&!this.g5(g))return this;this.oj();if(g!=null){this.pn(g);if(c)this.revealRecord(g);}if(Pb)this.doEvent(Ib.SELECT,{strRECORDID:g,strRECORDIDS:[g]});}if(Pb)this.doEvent(Ib.CHANGE,{objEVENT:null});return this;};d.Ko=function(i,q,j,o,g){var Hc=this.getMultiSelect()==h.MULTI;if(Hc&&j){if(q!=null&&!this.g5(q))return;var yb=false;if(this.getRecordNode(q).getAttribute("jsxselected")=="1"){if(o)this.Eo(q);}else{this.pn(q);yb=true;}if(yb&&!g)this.doEvent(Ib.SELECT,{objEVENT:i,strRECORDID:q});}else{var vb=this.getValue()==q;if(!o&&vb&&!j)return;this.oj();if(q!=null&&!this.g5(q))q=null;if(q!=null){if(vb)this.Eo(q);else this.pn(q);}if(!g)this.doEvent(Ib.SELECT,{objEVENT:i,strRECORDID:vb?null:q});}if(!g)this.doEvent(Ib.CHANGE,{objEVENT:i});};d.So=function(b){var vc=typeof(b)=="string"?this.mF(b):b;if(vc!=null&&vc.getAttribute){b=vc.getAttribute("jsxid");if(b){try{vc.childNodes[0].childNodes[2].focus();this.rh(vc.getAttribute("jsxid"));}catch(Kc){}}}else{this.rh(null);}};d.rh=function(e){if(e!=null){if(this._jsxto==null){if(this.getMultiSelect()==h.MULTI)Ob.subscribeLoseFocus(this,this.getRendered(),"Po");}this._jsxto=e;}else{if(this._jsxto!=null)Ob.unsubscribeLoseFocus(this);this._jsxto=null;}};d.Po=function(n){Ob.unsubscribeLoseFocus(this);this._jsxto=null;};d.Ax=function(k){var gc=this.mF(k);if(gc!=null){var Gc=jsx3.html.selectSingleElm(gc,0,2);Gc.style.backgroundImage="url("+h.SELECTEDIMAGE+")";Gc.style.borderRight="solid 1px "+h.BORDERCOLOR;}};d.bw=function(q){var z=this.mF(q);if(z!=null){var Lc=jsx3.html.selectSingleElm(z,0,2);Lc.style.backgroundImage="";Lc.style.borderRight="";}};d.oj=function(){var z=this.Ei();for(var ic=0;ic<z.getLength();ic++){var Wb=z.getItem(ic);Wb.removeAttribute("jsxselected");this.bw(Wb.getAttribute("jsxid"));}};d.Eo=function(k){this.deleteRecordProperty(k,"jsxselected",false);this.bw(k);};d.pn=function(c){this.insertRecordProperty(c,"jsxselected","1",false);this.Ax(c);};d.Ei=function(){return this.getXML().selectNodes("//record[@jsxselected='1']");};d.Et=function(){var B=this.Ei();var rc=[];var Hb=B.getLength();for(var jc=0;jc<Hb;jc++){rc[jc]=B.getItem(jc).getAttribute("jsxid");}return rc;};d.revealRecord=function(f,g){var Ec=this.getRecordNode(f);var w=Ec?Ec.getParent():null;while(w!=null){this.toggleItem(w.getAttribute("jsxid"),true);w=w.getParent();}var rc=this.mF(f);if(rc){var pc=g?g.getRendered(rc):this.getRendered(rc);if(pc)jsx3.html.scrollIntoView(rc,pc,0,10);}};d.getValue=function(){return this.getMultiSelect()==h.SINGLE?this.Et()[0]:this.Et();};d.getKeyListener=function(){return this.jsxkeylistener==null?jsx3.Boolean.TRUE:this.jsxkeylistener;};d.setKeyListener=function(m){this.jsxkeylistener=m;return this;};d.getText=function(){var ab=this.Ei().getItem(0);return ab!=null?ab.getAttribute("jsxtext"):null;};d.getMultiSelect=function(){return this.jsxmultiselect==null?h.SINGLE:this.jsxmultiselect;};d.setMultiSelect=function(m){this.jsxmultiselect=m;return this;};d.redrawRecord=function(m,l){var Lc=this.mF(m);if(l==jsx3.xml.CDF.DELETE){if(Lc){if(Lc.parentNode.childNodes.length>1){Lc.parentNode.removeChild(Lc);}else{var M=Lc.parentNode.parentNode;var cc=M.getAttribute("jsxid");jsx3.html.setOuterHTML(M,this.doTransform(cc));}}return this;}if(Lc==null){var sc=this.getRecordNode(m);if(sc!=null){if(this.getParent()!=null){sc=sc.getParent();var cc=sc.getAttribute("jsxid");var M=this.mF(cc);if(M!=null){jsx3.html.setOuterHTML(M,this.doTransform(cc));}}}}else{jsx3.html.setOuterHTML(Lc,this.doTransform(m));}return this;};d.getRoot=function(){return this.jsxuseroot!=null?this.jsxuseroot:jsx3.Boolean.TRUE;};d.setRoot=function(o){this.jsxuseroot=o;return this;};d.getIcon=function(){return this.jsxicon!=null?this.jsxicon:h.ICON;};d.setIcon=function(p){this.jsxicon=p;return this;};d.getIconMinus=function(){return this.jsxiconminus!=null?this.jsxiconminus:h.ICONMINUS;};d.setIconMinus=function(j){this.jsxiconminus=j;return this;};d.getIconPlus=function(){return this.jsxiconplus!=null?this.jsxiconplus:h.ICONPLUS;};d.setIconPlus=function(k){this.jsxiconplus=k;return this;};d.mF=function(j){var rc=this.getDocument();return rc!=null?rc.getElementById(this.getId()+"_"+j):null;};d.SU=function(i,m){if(m!=i.srcElement())return;var hb=this.Et()[0];if(hb){this.So(hb);}else{var qb=this.getRendered(m).childNodes[0];if(qb!=null)this.So(qb);}};d.IU=function(l,i){if(!l.leftButton())return;i=l.srcElement();var Tb=this.getRendered(i);while(jsx3.util.strEmpty(i.getAttribute("jsxtype"))&&i!=Tb)i=i.parentNode;if(i.getAttribute("jsxtype")!=null){if(i.getAttribute("jsxtype")=="plusminus"){this.Sk(l,i.parentNode.parentNode.getAttribute("jsxid"));}else{if(i.getAttribute("jsxtype")=="text"||i.getAttribute("jsxtype")=="icon"){var bc=i.parentNode.parentNode.getAttribute("jsxid");this.So(i.parentNode.parentNode);if(!i.parentNode)i=this.mF(bc).childNodes[0].childNodes[2];if(this.g5(bc)){if(l.shiftKey()&&this.getMultiSelect()==h.MULTI){var wb=this.sC();if(wb){this.revealRecord(wb);this.dl(l,wb,bc);}else{this.Ko(l,bc,true,true);}}else{var yb=jsx3.gui.isMouseEventModKey(l);this.Ko(l,bc,yb,yb);}}}else{this.So(this.Et()[0]);}}}else{this.So(this.Et()[0]);}};d.sC=function(){return this._jsxto;};d.dl=function(j,b,g){var oc=false;var tb=!jsx3.gui.isMouseEventModKey(j)||this.getRecordNode(g).getAttribute("jsxselected")!="1";var ec=[b];var Hb=b;while((Hb=this.Ii(Hb))!=null){ec.push(Hb);if(Hb==g){oc=true;break;}}if(!oc){ec=[b];Hb=b;while((Hb=this.uv(Hb))!=null){ec.push(Hb);if(Hb==g){oc=true;break;}}if(!oc){return;}}if(!jsx3.gui.isMouseEventModKey(j))this.oj();for(var tc=0;tc<ec.length;tc++){var u=ec[tc];var cc=tc==ec.length-1;var G=this.getRecordNode(u).getAttribute("jsxselected")=="1";if(tb||G){this.Ko(j,u,true,!tb&&G,!cc);}}};d.g5=function(e){var uc=e instanceof jsx3.xml.Entity?e:this.getRecord(e);return uc!=null&&uc.jsxunselectable!="1";};h.getDragIcon=function(o,k,p,r){return "<div id='JSX' class='jsx30tree_dragicon' style='"+jsx3.html.getCSSOpacity(0.75)+"'>"+jsx3.html.getOuterHTML(o.parentNode.childNodes[1])+jsx3.html.getOuterHTML(o)+"</div>";};d.toggleItem=function(b,l,q){var W=this.getRecordNode(b);var v=this.mF(b);if(v!=null){this.SA(W,v,l,q);}return this;};d.Sk=function(j,p,q,l){var nc=this.getRecordNode(p);var qb=this.mF(p);if(qb!=null){var Ic=null;if(nc.getAttribute("jsxlazy")=="1"&&nc.getAttribute("jsxopen")!="1"&&(q==null||q===true)){jsx3.html.updateCSSOpacity(qb.childNodes[0].childNodes[0],0.5);jsx3.sleep(function(){if(this.getParent()==null)return;var nb=this.doEvent(Ib.DATA,{objXML:this.getXML(),objNODE:nc});if(nb&&typeof(nb)=="object"){if(nb.bCLEAR)nc.removeAttribute("jsxlazy");if(nb.arrNODES!=null){nc.removeChildren();for(var db=0;db<nb.arrNODES.length;db++)nc.appendChild(nb.arrNODES[db]);}}else{nc.removeAttribute("jsxlazy");}this.redrawRecord(p,jsx3.xml.CDF.UPDATE);if(l!=null)l();},null,this);nc.setAttribute("jsxopen","1");Ic=true;}else{Ic=this.SA(nc,qb,q,false);}this.doEvent(Ib.TOGGLE,{objEVENT:j,strRECORDID:p,objRECORD:nc,bOPEN:Ic});}};d.SA=function(k,n,f,i){var Ic=k.getAttribute("jsxopen")=="1";if(f==null)f=!Ic;if(Ic==f)return f;if(f){n.childNodes[0].childNodes[0].src=this.getUriResolver().resolveURI(this.getIconMinus());n.childNodes[1].style.display="block";k.setAttribute("jsxopen","1");}else{n.childNodes[0].childNodes[0].src=this.getUriResolver().resolveURI(this.getIconPlus());n.childNodes[1].style.display="none";k.removeAttribute("jsxopen");}if(i)n.childNodes[0].childNodes[0].setAttribute("jsxtype","plusminus");return f;};d.mL=function(m,s){if(this.getCanDrag()==1&&!m.rightButton()){var yb=m.srcElement();if(yb==null)return;var u=false;if(jsx3.util.strEmpty(yb.getAttribute("jsxtype")))yb=yb.parentNode;if(yb.getAttribute("jsxtype")=="icon"){u=true;yb=yb.parentNode.childNodes[2];}if(yb.getAttribute("jsxtype")=="text"){if(!this.g5(yb.getAttribute("JSXDragId")))return;var rc=this;m._0();h.De=window.setTimeout(function(){h.De=null;Ob.unsubscribe(Ob.MOUSEUP,rc,"Ff");if(rc.getParent()!=null){rc.IU(m,s);rc.doDrag(m,yb,h.getDragIcon);}},h.rf);Ob.subscribe(Ob.MOUSEUP,this,"Ff");if(u){Ob.publish(m);m.cancelAll();}}}};d.Ff=function(n){Ob.unsubscribe(Ob.MOUSEUP,this,"Ff");if(h.De)window.clearTimeout(h.De);};d._4=function(a,l){var eb=a.srcElement();if(eb==null)return;var Db=eb.getAttribute("jsxtype");if(jsx3.util.strEmpty(Db))eb=eb.parentNode;Db=eb.getAttribute("jsxtype");if(Db=="text"||Db=="icon"){var X=eb.parentNode.parentNode.getAttribute("jsxid");if(this.getCanDrop()==1&&jsx3.EventHelp.isDragging()){var Ec=jsx3.EventHelp.JSXID;var Hb=jsx3.EventHelp.DRAGID;var Wb=jsx3.EventHelp.DRAGTYPE;var vc=jsx3.gui.isMouseEventModKey(a);eb.parentNode.style.backgroundImage="";if(Ec==null)return;var Ac=Ec.doEvent(Ib.ADOPT,{objEVENT:a,strRECORDID:Hb,objTARGET:this,bCONTROL:vc});var gc={objEVENT:a,strRECORDID:X,objSOURCE:Ec,strDRAGID:Hb,strDRAGTYPE:Wb,bALLOWADOPT:Ac!==false};var Bb=this.doEvent(vc?Ib.CTRL_DROP:Ib.DROP,gc);if(Ac!=false&&Bb!==false&&Ec.instanceOf(jsx3.xml.CDF))this.adoptRecord(Ec,Hb,X);}else{if(a.rightButton()&&this.getMenu()){var Gc=this.getServer().getJSX(this.getMenu());if(Gc!=null&&this.g5(X)){var Eb=this.doEvent(Ib.MENU,{objEVENT:a,objMENU:Gc,strRECORDID:X});if(Eb!==false){if(Eb instanceof Object&&Eb.objMENU instanceof jsx3.gui.Menu)Gc=Eb.objMENU;var Qb=a.shiftKey()||jsx3.gui.isMouseEventModKey(a);this.Ko(a,X,Qb,Qb);Gc.showContextMenu(a,this,X);}}}}}};d.CL=function(i,r){var Jc=i.toElement();if(Jc==null)return;var dc=Jc.getAttribute("jsxtype");var S=Jc.parentNode.parentNode.getAttribute("jsxid");var nb=Jc.parentNode.parentNode;if(jsx3.EventHelp.isDragging()&&this.getCanDrop()==1){var Ac=jsx3.EventHelp.JSXID;var H=jsx3.EventHelp.DRAGID;var O=jsx3.EventHelp.DRAGTYPE;if(dc=="plusminus"){var W=this;i._0();h.vg=window.setTimeout(function(){if(W.getParent()!=null)W.Sk(i,S);},500);}else{if(dc=="text"){var Cb=this.doEvent(Ib.BEFORE_DROP,{objEVENT:i,strRECORDID:S,objSOURCE:Ac,strDRAGID:H,strDRAGTYPE:O,objGUI:nb});if(!(Cb===false))Jc.parentNode.style.backgroundImage=h.ONDROPBGIMAGE;}}}else{if(dc=="text"&&this.getEvent(Ib.SPYGLASS)){this.applySpyStyle(Jc);var Fc=i.clientX()+jsx3.EventHelp.DEFAULTSPYLEFTOFFSET;var jc=i.clientY()+jsx3.EventHelp.DEFAULTSPYTOPOFFSET;i._0();var W=this;if(h.Yl)window.clearTimeout(h.Yl);h.Yl=window.setTimeout(function(){h.Yl=null;if(W.getParent()!=null)W.Zx(i,Fc,jc,S,Jc,nb);},jsx3.EventHelp.SPYDELAY);}}};d.Zx=function(s,m,i,n,g,j){this.removeSpyStyle(g);var Kb=this.doEvent(Ib.SPYGLASS,{objEVENT:s,strRECORDID:n});if(Kb){jsx3.gui.Interactive.hideSpy();this.showSpy(Kb,m,i);}};d.u2=function(m,c){var Ab=m.fromElement();if(Ab==null)return;var lc=Ab.getAttribute("jsxtype");if(jsx3.EventHelp.isDragging()&&this.getCanDrop()==1){if(lc=="plusminus"){window.clearTimeout(h.vg);}else{if(lc=="text"){var Gb=jsx3.EventHelp.JSXID;var v=jsx3.EventHelp.DRAGID;var oc=jsx3.EventHelp.DRAGTYPE;var K=Ab.parentNode.parentNode.getAttribute("jsxid");var O=Ab.parentNode.parentNode;var ob=this.doEvent(Ib.CANCEL_DROP,{objEVENT:m,strRECORDID:K,objSOURCE:Gb,strDRAGID:v,strDRAGTYPE:oc,objGUI:O});if(!(ob===false))Ab.parentNode.style.backgroundImage="";}}}else{if(lc=="text"&&this.getEvent(Ib.SPYGLASS)){var C=m.toElement();if(!C||C.id!="_jsxspy"){jsx3.sleep(jsx3.gui.Interactive.hideSpy);this.removeSpyStyle(Ab);if(h.Yl)window.clearTimeout(h.Yl);}}}};d.DY=function(a,j){if(this.jsxsupermix(a,j))return;var v=a.keyCode();var xb=this.getXML();var Pb=a.srcElement().parentNode.parentNode;if(Pb!=null&&Pb.getAttribute("jsxid")!=null){var ib=Pb.getAttribute("jsxid");if(v>=Ob.KEY_ARROW_LEFT&&v<=Ob.KEY_ARROW_DOWN){var Hb=this.getRecordNode(ib);var Dc=Hb.getAttribute("jsxlazy")=="1";if(Dc||Hb.selectSingleNode("record")!=null){var S=true;var ic=Hb.getAttribute("jsxopen")=="1";}else{var S=false;}if(v==Ob.KEY_ARROW_LEFT){if(S&&ic){this.Sk(a,ib,false);}else{this.Ud(Hb);}}else{if(v==Ob.KEY_ARROW_UP){this.Ud(Hb);}else{if(v==Ob.KEY_ARROW_RIGHT){if(Dc&&!ic){var hc=this;this.Sk(a,ib,true,function(){hc.So(ib);});}else{if(S&&!ic){this.Sk(a,ib,true);}else{this.Gk(Hb);}}}else{if(v==Ob.KEY_ARROW_DOWN){this.Gk(Hb);}}}}a.cancelAll();}else{if(v==Ob.KEY_TAB){if(a.shiftKey()){jsx3.html.focusPrevious(this.getRendered(j),a);}else{jsx3.html.focusNext(this.getRendered(j),a);}}else{if(a.spaceKey()||a.enterKey()){var tc=this.getRecordNode(ib).getAttribute("jsxselected")=="1";if(tc&&a.enterKey()){this.nF(a,ib);}else{this.Ko(a,ib,jsx3.gui.isMouseEventModKey(a)||a.shiftKey(),true);}a.cancelAll();}}}}};d.Ud=function(c){var ub=this.uv(c.getAttribute("jsxid"));if(ub!=null)this.So(ub);};d.Gk=function(o){var sc=this.Ii(o.getAttribute("jsxid"));if(sc!=null)this.So(sc);};d.uv=function(r){var vb=this.mF(r);if(vb!=null){var wb=vb.previousSibling;if(wb!=null){while(wb.childNodes[1].style.display=="block"){var bb=wb.childNodes[1].lastChild;if(bb==null)break;wb=bb;}return wb.getAttribute("jsxid");}else{return vb.parentNode.parentNode.getAttribute("jsxid");}}return null;};d.Ii=function(k){var Hc=this.mF(k);if(Hc!=null){if(Hc.childNodes[1].style.display=="block"){var Jb=Hc.childNodes[1].firstChild;if(Jb!=null)return Jb.getAttribute("jsxid");}var eb=Hc.nextSibling;if(eb!=null){return eb.getAttribute("jsxid");}else{var hb=this.getId();var lc=Hc.parentNode.parentNode;while(lc!=null&&lc.id&&lc.id.indexOf(hb)==0){if(lc.nextSibling!=null)return lc.nextSibling.getAttribute("jsxid");lc=lc.parentNode.parentNode;}}}return null;};d.executeRecord=function(p){this.nF(this.isOldEventProtocol(),p);};d.nF=function(l,n){var vc=null;if(n==null)vc=this.Et();else{if(!(n instanceof Array))vc=[n];else vc=n;}for(var K=0;K<vc.length;K++){var Zb=vc[K];if(Zb==null||!this.g5(Zb))continue;var xc=this.getRecordNode(Zb);var uc={strRECORDID:Zb,objRECORD:xc};if(l instanceof jsx3.gui.Event)uc.objEVENT=l;var Pb=null;if(xc!=null&&(Pb=xc.getAttribute("jsxexecute"))!=null)this.eval(Pb,uc);if(l)this.doEvent(Ib.EXECUTE,uc);}};d.LH=function(e,r){var Cc=null;var Zb=e.srcElement();if(Zb!=null&&jsx3.util.strEmpty(Zb.getAttribute("jsxtype")))Zb=Zb.parentNode;if(Zb!=null&&Zb.getAttribute("jsxtype")!=null&&(Zb.getAttribute("jsxtype")=="text"||Zb.getAttribute("jsxtype")=="icon"))Cc=Zb.parentNode.parentNode.getAttribute("jsxid");if(Cc)this.nF(e,Cc);};h.s5={};h.s5[Ob.CLICK]=true;h.s5[Ob.DOUBLECLICK]=true;h.s5[Ob.MOUSEOVER]=true;h.s5[Ob.MOUSEOUT]=true;h.s5[Ob.MOUSEUP]=true;h.s5[Ob.MOUSEDOWN]=true;h.s5[Ob.KEYDOWN]=true;h.s5[Ob.FOCUS]=true;d.k7=function(n,k,q){this.B_(n,k,q,3);};d.T5=function(g){this.applyDynamicProperties();if(this.getParent()&&(g==null||isNaN(g.parentwidth)||isNaN(g.parentheight))){g=this.getParent().IO(this);}else{if(g==null){g={};}}g.boxtype="box";g.tagname="div";if(g.left==null)g.left=0;if(g.top==null)g.top=0;if(g.width==null)g.width="100%";if(g.height==null)g.height="100%";var Cb,Hc;if((Cb=this.getBorder())!=null&&Cb!="")g.border=Cb;if((Hc=this.getPadding())!=null&&Hc!="")g.padding=Hc;return new jsx3.gui.Painted.Box(g);};d.paint=function(){this.applyDynamicProperties();var dc=this.getId();var nb=this.doTransform().trim();if(!nb)nb=this.getNoDataMessage();nb=nb+("<img src=\""+jsx3.gui.Block.SPACE+"\""+this.RX(Ob.FOCUS,"SU")+" style=\"position:absolute;left:0px;top:0px;width:1px;height:1px;\" "+this.CI()+"/>");var U="";if(this.getEnabled()==1)U=this.lM(h.s5,0);var C=this.renderAttributes(null,true);var fb=this.RL(true);fb.setAttributes(this.vH()+U+" id=\""+dc+"\" label=\""+this.getName()+"\" class=\"jsx30tree\" "+C);fb.setStyles(this.g0()+this.UZ()+this.K2()+this.QP()+this.A0()+this.oY()+this.D6()+this.I6()+this.T1()+this.MU()+this.iN());return fb.paint().join(nb);};d.doTransform=function(n){var Gb={};var v=false;if(n==null){var Y=this.getXML().getRootNode();if(Y){var Hc=Y.getChildNodes();if(Hc.getLength()>0)n=Hc.getItem(0).getAttribute("jsxid");}}else{v=true;}if(n!=null)Gb.jsxrootid=n;Gb.jsxtabindex=this.getIndex()==null?0:this.getIndex();Gb.jsxselectedimage=h.SELECTEDIMAGE;Gb.jsxbordercolor=h.BORDERCOLOR;Gb.jsxicon=this.getIcon();Gb.jsxiconminus=this.getUriResolver().resolveURI(this.getIconMinus());Gb.jsxiconplus=this.getUriResolver().resolveURI(this.getIconPlus());Gb.jsxtransparentimage=jsx3.gui.Block.SPACE;Gb.jsxdragtype="JSX_GENERIC";Gb.jsxid=this.getId();Gb.jsxuseroot=v?1:this.getRoot();Gb.jsxfragment=v?1:0;Gb.jsxpath=jsx3.getEnv("jsxabspath");Gb.jsxpathapps=jsx3.getEnv("jsxhomepath");Gb.jsxpathprefix=this.getUriResolver().getUriPrefix();var Db=this.getXSLParams();for(var Wb in Db)Gb[Wb]=Db[Wb];var zc=this.jsxsupermix(Gb);zc=zc.doReplace("<[/]*JSX_FF_WELLFORMED_WRAPPER[/]*>","");return zc;};d.getNoDataMessage=function(){return this.jsxnodata==null?h.DEFAULTNODATAMSG:this.jsxnodata;};d.onSetChild=function(k){return false;};d.onDestroy=function(m){this.jsxsuper(m);this.onDestroyCached(m);};h.getVersion=function(){return "3.0.00";};});jsx3.Tree=jsx3.gui.Tree;
