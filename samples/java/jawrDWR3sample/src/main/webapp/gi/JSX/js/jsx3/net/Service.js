/*
 * Copyright (c) 2001-2007, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.Class.defineClass("jsx3.net.Service",null,[jsx3.util.EventDispatcher],function(c,g){c.simpletypes={};c.simpletypestext="Lorem ipsum dolor sit amet consectetuer adipiscing elit In pharetra wisi non dolor Pellentesque a ipsum Nulla laoreet erat a nulla In porta luctus justo Pellentesque arcu odio sollicitudin ac hendrerit non ornare et risus Proin aliquam viverra ligula Aliquam eget lectus eu lorem convallis volutpat Aliquam erat volutpat";c.simpletypes["string"]=function(){var zc=parseInt(Math.random()*(c.simpletypestext.length-15));return c.simpletypestext.substring(zc,zc+15).trim();};c.simpletypes["int"]="1000";c.simpletypes["integer"]="2000";c.simpletypes["double"]="1.234";c.simpletypes["boolean"]="true";c.simpletypes["date"]="2005-10-19Z";c.simpletypes["time"]="22:33:12Z";c.simpletypes["short"]="1";c.simpletypes["unsignedLong"]="26216842";c.simpletypes["unsignedInt"]="10";c.simpletypes["unsignedShort"]="1";c.simpletypes["unsignedByte"]="10";c.simpletypes["byte"]="10";c.simpletypes["long"]="48216842";c.simpletypes["decimal"]="1.00";c.simpletypes["positiveInteger"]="100";c.simpletypes["negativeInteger"]="-30";c.simpletypes["nonPositiveInteger"]="-40";c.simpletypes["nonNegativeInteger"]="10";c.simpletypes["nonPositiveInteger"]="-10";c.simpletypes["duration"]="1696-09-01T00:00:00";c.simpletypes["dateTime"]="10-25-2004T11:34:01";c.simpletypes["gYear"]="2005";c.simpletypes["date"]="10-25-2004";c.simpletypes["gMonthDay"]="12-25";c.simpletypes["gDay"]="25";c.simpletypes["gMonth"]="12";c.simpletypes["gYearMonth"]="2004-12";c.simpletypes["base64Binary"]="bGJpcmRlYXVAdGliY28uY29t";c.simpletypes["float"]="134.52";c.simpletypes["decimal"]="0.923874";c.simpletypes["anyURI"]="http://www.tibco.com/jsx/";c.simpletypes["NMTOKEN"]="Y";c.simpletypes["NMTOKENS"]="NO";c.simpletypes["Name"]="abc";c.simpletypes["NCName"]="abcdefg";c.simpletypes["token"]="Y";c.simpletypes["language"]="en-cockney";c.simpletypes["normalizedString"]=c.simpletypes["string"];c.simpletypes["ID"]="ID";c.simpletypes["IDREFS"]="IDREFS";c.simpletypes["ENTITY"]="ENTITY";c.simpletypes["ENTITIES"]="ENTITIES";c.simpletypes["QName"]="qname";c.simpletypes["hexBinary"]="\\u255\\u254";c.simpletypes["notation"]="here is a note";c.inc_inc=0;c.ns={};c.ns["SOAP-ENV"]="http://schemas.xmlsoap.org/soap/envelope/";c.ns["SOAP-ENC"]="http://schemas.xmlsoap.org/soap/encoding/";c.ns["xsi"]="http://www.w3.org/2001/XMLSchema-instance";c.ns["xsd"]="http://www.w3.org/2001/XMLSchema";c.ON_SUCCESS="onSuccess";c.ON_ERROR="onError";c.ON_TIMEOUT="onTimeout";c.ON_INVALID="onInvalid";c.ON_PROCESS_RULE="onProcessRule";g.init=function(k,b,r,j){this.setRulesURL(k);this.setOperationName(b);if(r!=null)this.setOutboundURL(r);if(j!=null)this.setInboundURL(j);var Ub=new jsx3.net.Request(this.getUniqueId());Ub.subscribe(jsx3.HttpRequest.EVENT_ON_RESPONSE,this,"onResponse");this.setRequest(Ub);};g.getSupportedNamespaces=function(){var lb="";for(var L in c.ns){lb=lb+(L+"\t:\t"+c.ns[L]+"\r\n");}return lb;};g.getRulesURL=function(){return this.jsxrulesurl;};g.setRulesURL=function(n){this.jsxrulesurl=n;this.resetRulesTree();return this;};g._getOutboundStubDocument=function(){if(this.jsxstubdocument instanceof jsx3.xml.Document)return this.jsxstubdocument;};g.setOutboundStubDocument=function(r){this.jsxstubdocument=r;return this;};g.getOutboundStubURL=function(){if(this.jsxstuburl==null){var Jb=this.getMEPNode("I");if(Jb){var Nc=Jb.getAttribute("stubsrc");return Nc!=null&&Nc.trim()!=""?Nc:null;}}else{return this.jsxstuburl;}};g.setOutboundStubURL=function(d){this.jsxstuburl=d;return this;};g.getNamespace=function(){var Bc=this.getServer();return Bc!=null?Bc.getEnv("namespace"):null;};g.getServer=function(){if(this._jsxW9){return this._jsxW9;}else{if(this.jsxserverns){var xb=jsx3.lang.System.getApp(this.jsxserverns);if(xb instanceof jsx3.app.Server){return xb;}else{c.ng(2,"The server namespace referenced by this jsx3.net.Service instance could not be resolved. Please validate that the namespace is correct: "+this.jsxserverns);}}else{var yb=jsx3.System.getAllApps();for(var Gb=0;Gb<yb.length;Gb++){if(yb[Gb].getEnv("namespace")!="jsx3.IDE")return yb[Gb];}}}if(jsx3.IDE){c.ng(2,"When using the XML Mapping Utility, you must have at lease one GUI component open for edit within GI Builder. Otherwise, there is no server instance to to use as the server context. For now, the IDE context will be used.");return jsx3.IDE;}};g.setNamespace=function(a){if(a instanceof jsx3.app.Server){this._jsxW9=a;this.jsxserverns=a.getEnv("namespace");}else{this._jsxW9=null;this.jsxserverns=a;}return this;};g.getOutboundStubPath=function(){if(this.jsxstubpath==null){var M=this.getMEPNode("I");if(M){var X=M.getAttribute("stubpath");return X!=null&&X.trim()!=""?X:null;}}else{return this.jsxstubpath;}};g.setOutboundStubPath=function(q){this.jsxstubpath=q;return this;};g.getInboundURL=function(){if(this.jsxinboundurl==null){var M=this.getMEPNode("O");if(M){var H=M.getAttribute("stubsrc");return H!=null&&H.trim()!=""?H:null;}}else{return this.jsxinboundurl;}};g.setInboundURL=function(p){this.jsxinboundurl=p;return this;};g.getOutboundURL=function(){return this.jsxoutboundurl;};g.setOutboundURL=function(a){this.jsxoutboundurl=a;return this;};g.getOperationName=function(){return this.operation;};g.setOperationName=function(q){this.operation=q;return this;};g.getRulesXML=function(){if(!this.jsxrulesxml){var Gb=this.getRulesURL();var gc=new jsx3.xml.Document();gc.load(Gb);if(gc.hasError()){c.ng(2,"The URL for the rules file does not reference a valid CXF document. Please make sure that the URL is correct ("+Gb+") and that it returns a valid document:\n\t"+gc.getError().description);}else{this.jsxrulesxml=gc;}}return this.jsxrulesxml;};g.setRulesXML=function(m){this.jsxrulesxml=m;};g.resetRulesTree=function(){delete this.jsxrulesxml;return this;};g.getOperationNode=function(){var X=this.getRulesXML();if(X){var jc=X.selectSingleNode("//record[@opname='"+this.getOperationName()+"']");return jc?jc:this.getRulesXML().selectSingleNode("//record[@type='T']");}};g.getMEPNode=function(f){var bc=this.getOperationNode();return bc?bc.selectSingleNode("record[@type='"+f+"']"):null;};g.getUserName=function(){return this.jsxusername;};g.setUserName=function(p){this.jsxusername=p;return this;};g.getUserPass=function(){return this.jsxuserpass;};g.setUserPass=function(f){this.jsxuserpass=f;return this;};g.setOnSuccess=function(p){this.jsxonsuccess=p;return this;};g.setOnError=function(a){this.jsxonerror=a;return this;};g.onSuccess=function(){this.publish({subject:c.ON_SUCCESS});var E=typeof(this.jsxonsuccess);if(E=="function"||E=="object"){this.jsxonsuccess(this);}else{if(E=="string"){this.eval(this.jsxonsuccess);}}};g.onError=function(){this.publish({subject:c.ON_ERROR});var tc=typeof(this.jsxonerror);if(tc=="function"||tc=="object"){this.jsxonerror(this);}else{if(tc=="string"){this.eval(this.jsxonerror);}}};g.setRequest=function(i){if(i!=null){this.jsxhttprequest=i;}else{delete this.jsxhttprequest;}};g.getRequest=function(){return this.jsxhttprequest;};g.getInboundDocument=function(){return this.jsxinbounddocument==null?null:this.jsxinbounddocument;};g.setInboundDocument=function(r){this.jsxinbounddocument=r;};g.getOutboundDocument=function(){return this.jsxoutbounddocument==null?null:this.jsxoutbounddocument;};g.setOutboundDocument=function(d){this.jsxoutbounddocument=d;};g.getWSDL=function(){if(this.wsdl==null){var U=this.getRulesXML().selectSingleNode("//record[@type='W']");if(U){var v=U.getAttribute("src");}else{return;}}return this.wsdl==null?this.wsdl=jsx3.CACHE.openDocument(v):this.wsdl;};g.getEndpointURL=function(){return this.jsxserviceurl==null?this.getOperationNode().getAttribute("endpoint"):this.jsxserviceurl;};g.setEndpointURL=function(b){this.jsxserviceurl=b;return this;};g.doOutboundFilter=function(s){c.ng(5,"Executing the Outbound Filter.");if(s==null)s=this.getMEPNode("I").getAttribute("onbeforesend");this.eval(s);};g.doInboundFilter=function(n){c.ng(5,"Executing the Inbound Filter.");if(n==null)n=this.getMEPNode("O").getAttribute("onafterreceive");this.eval(n);};g.getMethod=function(){if(this.jsxmethod==null){var Rb=this.getOperationNode().getAttribute("method");if(jsx3.util.strEmpty(Rb))Rb="POST";this.jsxmethod=Rb;}return this.jsxmethod;};g.setMethod=function(a){this.jsxmethod=a;};g._setValid=function(h){this.Kk=h;};g._isValid=function(){return this.Kk;};g.doCall=function(m){var lb=this.getRulesXML();if(lb!=null){if(!this.getMode()){var Mc=this.getServer().resolveURI(this.getInboundURL());c.ng(5,"Running in static mode. Using sample response document at '"+Mc+"'");var Yb=this.getServer().getCache().getOrOpenDocument(Mc,Mc);if(Yb.hasError()){c.ng(2,"The static response URL does not reference a valid document. The transaction has been cancelled.  Please make sure that the URL is correct ("+Mc+") and that it returns a valid document:\n\t"+Yb.getError().description);}else{Yb=Yb.cloneDocument();jsx3.sleep(function(){this.onResponse({target:{getResponseXML:function(){return Yb;}}});},null,this);}}else{var W=this.getOutboundURL();var rb;if(W){W=this.getServer().resolveURI(W);c.ng(5,"Using static request document located at '"+W+"'");rb=this.getServer().getCache().getOrOpenDocument(W,W);if(rb.hasError()){c.ng(2,"The static request URL does not reference a valid document. The transaction has been cancelled.  Please make sure that the URL is correct ("+W+") and that it returns a valid document:\n\t"+rb.getError().description);return;}else{rb=rb.cloneDocument();}}else{rb=this.getServiceMessage();if(this.getMethod().toUpperCase()=="POST"&&!rb){c.ng(4,"The request message could not be generated. The transaction has been cancelled");return;}}if(!this._isValid()&&m){return false;}else{this.setOutboundDocument(rb);this.doOutboundFilter();c.ng(5,"Sending request to remote service located at '"+this.getEndpointURL()+"'");var Eb=this.getRequest();Eb.open(this.getMethod(),this.getEndpointURL(),true,this.getUserName(),this.getUserPass());var Tb=this.getHeaders();var mc;for(mc in Tb){if(!(typeof(Tb[mc])=="function"||typeof(Tb[mc])=="object")){Eb.setRequestHeader(mc.toString(),Tb[mc]);c.ng(5,"Setting HTTP Request Header, "+mc+" ==> "+Tb[mc]+"'");}}var S=rb!=null&&rb instanceof jsx3.xml.Document&&!rb.hasError()?rb.serialize("1.0"):null;Eb.send(S,this.getTimeout());return true;}}}};g.setRequestHeader=function(o,s){var Ac=this.getHeaders();Ac[o]=s;};g.getHeaders=function(){if(this.jsxheaders==null){this.jsxheaders={};var w=this.getOperationNode().selectNodes("headers/record");for(var D=0;D<w.getLength();D++){var Xb=w.getItem(D);this.jsxheaders[Xb.getAttribute("name")+""]=Xb.getAttribute("value")+"";}}return this.jsxheaders;};g.setTimeouts=function(o,j,e,m){c.ng(4,"Invalid method. setTimeouts() no longer valid. Use setTimeout() instead.");return this;};g.onTimeout=function(){this.publish({subject:c.ON_TIMEOUT});};g.setTimeout=function(l,e,k){this.getRequest().subscribe(jsx3.net.Request.EVENT_ON_TIMEOUT,this,"onTimeout");this.subscribe(c.ON_TIMEOUT,e,k);this.jsxtimeout=l;return this;};g.getTimeout=function(){return this.jsxtimeout;};g.resetRules=function(){var nc=this.getRulesXML().selectNodes("//record[@jsxskip]");for(var Nb=nc.getLength()-1;Nb>=0;Nb--)nc.getItem(Nb).removeAttribute("jsxskip");return this;};g._resetNamespaceRegistry=function(){this.nshash={};this.nsinc=0;};c.ng=function(s,p){if(c.gr==null){if(jsx3.util.Logger){c.gr=jsx3.util.Logger.getLogger(c.jsxclass.getName());if(c.gr==null)return;}else{return;}}c.gr.log(s,p);};g._reset=function(){this.resetRules();this._setValid(true);this._resetNamespaceRegistry();};g.getServiceMessage=function(m,a){var fc,fb;this._reset();var W=this.getOperationNode();c.ng(5,"Creating the request message for the operation, '"+this.getOperationName()+"', using the rules file located at, '"+this.getRulesURL()+"'");if(!a){fc=this._getOutboundStubDocument();a=this.getOutboundStubURL();}if(a||fc instanceof jsx3.xml.Document){var X=this.getServer();if(!(fc instanceof jsx3.xml.Document)){a=X.resolveURI(a);fc=this.getServer().getCache().getOrOpenDocument(a,a);}if(!fc.hasError()){var Bb=this.getOutboundStubPath();var V=Bb.split("/");var I={};for(var eb=0;eb<V.length;eb++){if(V[eb].search(/^([^:]*)(:)/)>-1)I[RegExp.$1]=1;}fc=fc.cloneDocument();fc.setSelectionLanguage("XPath");fb=fc.selectSingleNode(Bb,fc.getDeclaredNamespaces(I));if(!fb){c.ng(2,"The stub path (typically the path to the SOAP Envelope Body) does not return a valid node ("+Bb+").");return;}}else{c.ng(2,"The outbound stub URL does not reference a valid document.  Please make sure that the URL is correct ("+a+") and that it returns a valid document:\n\t"+fc.getError().description);return;}}var Q=W.selectSingleNode("record[@type='"+(m==null?"I":m.substring(0,1).toUpperCase())+"']");var yc=Q.selectNodes("record");var rb=yc.getLength();var sc;for(var eb=0;eb<rb;eb++)sc=this.doAddAndRecurse(fc,fb,yc.getItem(eb),m,true);return fc?fc:sc;};g.registerNamespace=function(o,m,f){var Y="";var Db="";if(o!=""&&this.nshash[o]!=null){Db=o;Y=this.nshash[o];}else{if(o!=""){this.nsinc++;this.nshash[o]="jsx"+this.nsinc;Db=o;Y="jsx"+this.nsinc;if(f!=true){var Lc=m.getRootNode();Lc.setAttribute("xmlns:"+Y,Db);}}}return {prefix:Y,uri:Db};};g.doAddAndRecurse=function(_jsxa,_jsxj,f,n,h){if(f.getAttribute("jsxskip"))return;var H=false;var Wb=this;var Kb=function(r){r.setAttribute("jsxskip","1");};var Cb=function(k){k.removeAttribute("jsxskip");};var vc=function(o){o.getParent().removeChild(o);};var nb=function(o){Wb.setNodeValue(R,o);};var eb=function(a){return Wb.getNamedNodeChild(a,f);};var Ob=function(e){Wb.getNamedRuleChild(e,f).setAttribute("jsxskip","1");};var Dc=function(e){Wb.getNamedRuleChild(e,f).setAttribute("jsxskip","1");};var Tb=function(p){Wb.getNamedRuleChild(p,f).removeAttribute("jsxskip");};var N=function(l){Wb.CDFCONTEXT.context=Wb.CDFCONTEXT.context.selectSingleNode(l);};var K=function(l){Wb.CDFCONTEXT.records=Wb.CDFCONTEXT.context.selectNodes(l);};var ib=f.getAttribute("tns");var jb=ib?this.registerNamespace(ib,_jsxa,h):{prefix:"",uri:""};var Lc=f.getAttribute("jsxtext");if(f.getAttribute("type")=="A"){var Pb=true;var R=_jsxa.createNode(jsx3.Entity.TYPEATTRIBUTE,jb.prefix+(jb.prefix!=""?":":"")+Lc,jb.uri);_jsxj.setAttributeNode(R);}else{if(f.getAttribute("type")=="D"){var Pb=false;var R=_jsxa.createNode(jsx3.xml.Entity.TYPECDATA);_jsxj.appendChild(R);}else{var Pb=false;if(_jsxa){var R=_jsxa.createNode(jsx3.Entity.TYPEELEMENT,jb.prefix+(jb.prefix!=""?":":"")+Lc,jb.uri);_jsxj.appendChild(R);}else{_jsxa=new jsx3.xml.Document();var R=_jsxa.createDocumentElement(jb.prefix+(jb.prefix!=""?":":"")+f.getAttribute("jsxtext"),jb.uri);}var B=this.getOperationNode().selectSingleNode("record[@soapencstyle='"+c.ns["SOAP-ENC"]+"']");if(B!=null&&B!=""){var M;if((M=f.getAttribute("datatype"))!=null&&M!=""){var sb=f.getAttribute("simple");if(sb!=null&&sb!=""){if(M.indexOf(":")>0)M=M.replace(/[^:]*[:]?/,"");M="xsd:"+M;}else{if(M.indexOf(":")>0)M=M.replace(/[^:]*[:]?/,"");ib=f.getAttribute("ttns");jb=this.registerNamespace(ib,_jsxa,h);M=jb.prefix==""?M:jb.prefix+":"+M;}var Zb=_jsxa.createNode(jsx3.Entity.TYPEATTRIBUTE,"xsi:type","http://www.w3.org/2001/XMLSchema-instance");Zb.setValue(M);R.setAttributeNode(Zb);}}}}this.publish({subject:c.ON_PROCESS_RULE,rule:f,action:"Create Node",description:"<"+R.getNodeName()+">",level:6});var Lb=f.selectNodes("mappings/record");var ac=false;var _b;for(var S=0;S<Lb.getLength();S++){var Ub=this.CDFCONTEXT?this.CDFCONTEXT.context:null;var bc=this.CDFCONTEXT?this.CDFCONTEXT.records:null;var xc=this.CDFCONTEXT&&this.CDFCONTEXT.parentContext?this.CDFCONTEXT.parentcontext:null;var gb=Lb.getItem(S);var nc=gb.getAttribute("name");var rb=gb.getAttribute("value");var Fc=this.getNamespace();if(Fc==null||Fc.trim()=="")Fc=null;if(nc=="DOM"){var ec=jsx3.GO(rb,Fc);if(ec!=null){this.publish({subject:c.ON_PROCESS_RULE,rule:f,action:"Map to DOM",description:"jsx3.GO(\""+rb+"\""+(Fc?",\""+Fc+"\"":"")+").getValue();",level:6});this.doMapAndUpdate(R,ec,"OUTBOUND",f);}else{c.ng(2,"Could not map the JSX object named, '"+rb+"', because it is null.");}}else{if(nc=="NODE"||nc=="CACHE"){var Ac=rb.split("::");var U=Ac[0];var Q=this.getServer();if(Q!=null){var fb=Q.getCache().getDocument(U);}else{var fb=jsx3.CACHE.getDocument(U);}if(fb!=null){var cb=fb.selectSingleNode(Ac[1]);if(cb!=null){this.publish({subject:c.ON_PROCESS_RULE,rule:f,action:"Map to Cache Node",description:(Fc?"jsx3.getApp(\""+Fc+"\")":"jsx3.CACHE")+".getDocument(\""+Ac[0]+"\").selectSingleNode(\""+Ac[1]+"\").getValue();",level:6});this.updateNode(R,cb,"OUTBOUND");}else{c.ng(2,"The map has a rule that references an invalid path to a node in the XML cache document, "+Ac[0]+": "+Ac[1]+".");}}else{c.ng(2,"The map has a rule that references an invalid XML document in the cache: "+Ac[0]+".");}}else{if(nc=="CDF Document"){this.publish({subject:c.ON_PROCESS_RULE,rule:f,action:"Map to CDF Document",description:(Fc?"jsx3.getApp(\""+Fc+"\")":"jsx3.CACHE")+".getDocument(\""+rb+"\");",level:6});this.getCDFDocument(rb,"OUTBOUND",Fc);}else{if(nc=="CDF Record"){var wb;if(wb=this.CDFCONTEXT.records.next()){this.publish({subject:c.ON_PROCESS_RULE,rule:f,action:"Map to CDF Record",description:"this.CDFCONTEXT.records.next().selectNodes(\"record\");",level:6});var _=wb;var E=wb.selectNodes("record");this.CDFCONTEXT=new c.CdfContext(_,this.CDFCONTEXT,E);_b=true;ac=true;}else{vc(R);_b=false;}}else{if(nc=="CDF Attribute"){var v=this.CDFCONTEXT.context.getAttribute(rb);if(v){this.publish({subject:c.ON_PROCESS_RULE,rule:f,action:"Map to CDF Attribute",description:"this.CDFCONTEXT.context.getAttribute(\""+rb+"\");",level:6});nb(v);}}else{if(nc=="Script"){this.publish({subject:c.ON_PROCESS_RULE,rule:f,action:"Map to Script",description:"this.eval("+rb+");",level:6});var Bb={MESSAGENODE:R,my:Wb,OBJECTNAME:rb,OBJECTTYPE:nc,CDFCONTEXTPARENT:xc,CDFCONTEXT:Ub,CDFRECORDS:bc,setCDFRecords:K,setCDFContext:N,enableNamedRule:Tb,disableNamedRule:Dc,enableReferencedRule:Kb,disableReferencedRule:Cb,skipNamedRule:Ob,getNamedChild:eb,setValue:nb,removeChild:vc};var Gc=this.eval(rb,Bb);}}}}}}}if(R.getValue()==""&&n!=null&&f.selectSingleNode("record")==null){var ob=f.getAttribute("datatype");if(ob!=null&&ob!=""){var rc=c.simpletypes[ob.substring(ob.indexOf(":")+1)];var Qb=rc!=null?typeof(rc)=="function"?rc():rc:"???";R.setValue(Qb);}}else{if(R.getValue()==""&&f.selectSingleNode("record")==null&&f.getAttribute("type")!="A"&&!h&&f.selectSingleNode("restrictions/record[@name='nillable' and @value='true']")==null){vc(R);H=true;}}if(H!=true)this.validate(R,f);if(_b==null){var Mb=(Mb=f.getAttribute("repeat"))!=null?Mb:false;_b=this.eval(Mb);}if(!H&&f.getAttribute("groupref")!="1"&&f.getParent().getAttribute("groupref")=="1"){var L=false;var wc=R.getParent();var Eb=f.getParent();while(Eb.getAttribute("groupref")=="1"){Eb=Eb.getParent();var w=wc;wc=wc.getParent();}wc.insertBefore(R,w);}else{if(f.getAttribute("groupref")=="1"){var L=true;}else{var L=false;}}var kc=f.selectNodes("record");for(var S=0;S<kc.getLength();S++)this.doAddAndRecurse(_jsxa,R,kc.getItem(S),n,null);if(ac)this.CDFCONTEXT=this.CDFCONTEXT.parentcontext;var ib=f.getAttribute("soaparray");if(ib!=null&&ib!=""){jb=this.registerNamespace(ib,_jsxa,h);R.setValue(jb.prefix+":"+f.getAttribute("soaparraytype"));}if(f.getAttribute("datatype")=="Array"&&f.getAttribute("ttns")=="http://schemas.xmlsoap.org/soap/encoding/"){var Vb=R.getAttributes();for(var S=0;S<Vb.getLength();S++){if(Vb.getItem(S).getBaseName()=="arrayType"){var Gb=f.selectSingleNode("record[@jsxtext='arrayType']/@ttns").getValue();var I=this.nshash[Gb];var Kc=I+":"+f.selectSingleNode("record[@jsxtext='arrayType']/@datatype").getValue()+"["+R.selectNodes("./*").getLength()+"]";Vb.getItem(S).setValue(Kc);}}}if(_b&&!L){this.doAddAndRecurse(_jsxa,_jsxj,f,n,null);}else{if(L){R.getParent().removeChild(R);}}return _jsxa;};g.findNameByValue=function(d,a){for(var Ab in d){if(d[Ab]==a)return Ab.toString();}};g.validate=function(o,m){var zb=m.selectNodes("restrictions/record[@name!='minoccur' and @name!='maxoccur']");if(zb.getLength()>0){var Hb=o.getValue()+"";if(m.selectSingleNode("restrictions/record[@name='enumeration' and @value='"+Hb+"']")!=null)return true;for(var Cb=0;Cb<zb.getLength();Cb++){var t=zb.getItem(Cb);var sb=t.getAttribute("name");var v=t.getAttribute("value");if(sb=="enumeration"){this.invalidate(o,m,Hb,sb,v);return false;}else{if(sb=="maxExclusive"&&!(Hb<v)){this.invalidate(o,m,Hb,sb,v);return false;}else{if(sb=="maxInclusive"&&!(Hb<=v)){this.invalidate(o,m,Hb,sb,v);return false;}else{if(sb=="minInclusive"&&!(Hb>=v)){this.invalidate(o,m,Hb,sb,v);return false;}else{if(sb=="minExclusive"&&!(Hb>v)){this.invalidate(o,m,Hb,sb,v);return false;}else{if(sb=="length"&&Hb.length!=Number(v)){this.invalidate(o,m,Hb,sb,v);return false;}else{if(sb=="maxLength"&&Hb.length>Number(v)){this.invalidate(o,m,Hb,sb,v);return false;}else{if(sb=="pattern"){var db=new RegExp(v);if(Hb.search(db)!=0){this.invalidate(o,m,Hb,sb,v);return false;}}}}}}}}}}}return true;};g.invalidate=function(p,l,i,m,b){this._setValid(false);this.publish({subject:c.ON_INVALID,rule:l,message:p,type:m,value:b});this.publish({subject:c.ON_PROCESS_RULE,rule:l,action:"Invalidate",description:i+" != "+m+":"+b,level:3});};g.updateNode=function(o,q,i){if(i=="INBOUND"){var rb=o;var F=q;}else{var rb=q;var F=o;}var w=this.getNodeValue(rb);this.setNodeValue(F,w);};g.setNodeValue=function(q,j){q.setValue(j+"");};g.getNodeValue=function(d){return d.getValue();};g.doMapAndUpdate=function(k,q,e,j){if(q.isInstanceOf("jsx3.gui.Form")){if(q.isInstanceOf("jsx3.gui.RadioButton")){if(e=="INBOUND"){q.setGroupValue(this.getNodeValue(k));}else{var w=q.getGroupValue();this.setNodeValue(k,w==null?"":w);}}else{if(q.isInstanceOf("jsx3.gui.CheckBox")){if(e=="INBOUND"){var V=this.getNodeValue(k);q.setChecked(this.eval(V)?1:0);}else{this.setNodeValue(k,q.getChecked()?"true":"false");}}else{if(e=="INBOUND"){q.setValue(this.getNodeValue(k));}else{if(e=="OUTBOUND"){this.setNodeValue(k,q.getValue()+"");}}}}}else{if(q.isInstanceOf("jsx3.gui.Block")){if(e=="INBOUND"){q.setText(this.getNodeValue(k),true);}else{this.setNodeValue(k,q.getText());}}}};g.doReadAndRecurse=function(l,f){var Kb=this;var E=function(b){return Kb.getNamedNodeChild(b,l);};this.publish({subject:c.ON_PROCESS_RULE,rule:f,action:"Locate Node",description:"<"+l.getNodeName()+">",level:6});var t=f.selectNodes("mappings/record");var Hc=true;var Fb=false;for(var eb=0;eb<t.getLength();eb++){var ec=this.CDFCONTEXT?this.CDFCONTEXT.context:null;var mc=t.getItem(eb);var H=mc.getAttribute("name");var Hb=mc.getAttribute("value");var cc=this.getNamespace();if(H=="DOM"){var xb=jsx3.GO(Hb,cc);if(xb!=null){this.publish({subject:c.ON_PROCESS_RULE,rule:f,action:"Map to DOM",description:"jsx3.GO(\""+Hb+"\""+(cc?",\""+cc+"\"":"")+").setValue(\""+l.getValue()+"\");",level:6});this.doMapAndUpdate(l,xb,"INBOUND",f);}else{c.ng(2,"Could not map the JSX object named, '"+Hb+"', because it is null.");}}else{if(H=="NODE"||H=="CACHE"){var Xb=Hb.split("::");var Y=Xb[0];var Fc=this.getServer();if(Fc!=null){var u=Fc.getCache().getDocument(Y);}else{var u=jsx3.CACHE.getDocument(Y);}if(u!=null){var T=u.selectSingleNode(Xb[1]);if(T!=null){this.publish({subject:c.ON_PROCESS_RULE,rule:f,action:"Map to Cache Node",description:(cc?"jsx3.getApp(\""+cc+"\")":"jsx3.CACHE")+".getDocument(\""+Xb[0]+"\").selectSingleNode(\""+Xb[1]+"\").setValue(\""+l.getValue().constrainLength(30)+"\");",level:6});this.updateNode(l,T,"INBOUND");}else{c.ng(2,"The map has a rule that references an invalid path to a node in the XML cache document, "+Xb[0]+": "+Xb[1]+".");}}else{c.ng(2,"The map has a rule that references an invalid XML document in the cache: "+Xb[0]+".");}}else{if(H=="CDF Document"){this.publish({subject:c.ON_PROCESS_RULE,rule:f,action:"Map to CDF Document",description:(cc?"jsx3.getApp(\""+cc+"\")":"jsx3.CACHE")+".setDocument(\""+Hb+"\",jsx3.xml.CDF.Document.newDocument());",level:6});this.getCDFDocument(Hb,"INBOUND",cc);}else{if(H=="CDF Record"){this.publish({subject:c.ON_PROCESS_RULE,rule:f,action:"Map to CDF Record",description:"this.CDFCONTEXT.context.createNode(jsx3.xml.Entity.TYPEELEMENT,\"record\");",level:6});var Ec=this.CDFCONTEXT.context.createNode(jsx3.xml.Entity.TYPEELEMENT,"record");Ec.setAttribute("jsxid",this.getUniqueId());this.CDFCONTEXT.context.appendChild(Ec);this.CDFCONTEXT=new c.CdfContext(Ec,this.CDFCONTEXT);Fb=true;}else{if(H=="CDF Attribute"){this.publish({subject:c.ON_PROCESS_RULE,rule:f,action:"Map to CDF Attribute",description:"this.CDFCONTEXT.context.setAttribute(\""+Hb+"\",\""+l.getValue().constrainLength(30)+"\");",level:6});this.CDFCONTEXT.context.setAttribute(Hb,l.getValue());Hc=false;}else{if(H=="Script"){this.publish({subject:c.ON_PROCESS_RULE,rule:f,action:"Map to Script",description:"this.eval("+Hb+");",level:6});var Bc={my:Kb,OBJECTNAME:Hb,OBJECTTYPE:H,CDFCONTEXT:ec,MESSAGENODE:l,RULENODE:f,RECURSE:Hc,getNamedChild:E};this.eval(Hb,Bc);}}}}}}}if(Hc){var ab=f.selectNodes("*[name()='record' and (record or mappings)]");var B=ab.getLength();for(var eb=0;eb<B;eb++){var Zb=ab.getItem(eb);var Ub=Zb.getAttribute("jsxtext");if(Zb.getAttribute("type")=="A"){var ib=l.getAttributes();var Gb=ib.getLength();L2:for(var M=0;M<Gb;M++){if(ib.getItem(M).getBaseName()==Ub){this.doReadAndRecurse(ib.getItem(M),Zb);break L2;}}}else{var ib=l.selectNodes("*[local-name()='"+Ub+"']");var Gb=ib.getLength();for(var M=0;M<Gb;M++)this.doReadAndRecurse(ib.getItem(M),Zb);}}}if(Fb)this.CDFCONTEXT=this.CDFCONTEXT.parentcontext;};c.CdfContext=function(n,k,f){this.context=n;this.parentcontext=k;this.records=f;};g.getNamedNodeChild=function(a,f){var Q=f.getChildNodes();var kc=Q.getLength();for(var Zb=0;Zb<kc;Zb++){var Eb=Q.getItem(Zb).getBaseName();if(Eb==a){return Q.getItem(Zb);}}};g.doval=function(l){this.eval(l);};g.getNamedRuleChild=function(r,o){return o.selectSingleNode("record[@jsxtext='"+r+"']");};g.getUniqueId=function(){return jsx3.xml.CDF.getKey();};g.onResponse=function(o){var Jb=o.target;if(Jb instanceof jsx3.net.Request){this.responseheaders=Jb.getAllResponseHeaders();this.status=Jb.getStatus();this.statusText=Jb.getStatusText();c.ng(5,"The call to the operation, '"+this.getOperationName()+"', hosted at '"+this.getEndpointURL()+"' just returned with the HTTP Status code, "+this.status);if(this.status!=200&&this.status!=202){var D=true;c.ng(2,"The call to the operation, '"+this.getOperationName()+"', hosted at '"+Jb.getURL()+"' has returned an error (HTTP Status Code: '"+this.status+"').\nDescription: "+this.statusText);}else{var D=false;}var ac=Jb.getResponseXML();if(ac&&!ac.hasError()){this.setInboundDocument(ac);}else{c.ng(2,"The call to the operation, '"+this.getOperationName()+"', hosted at '"+this.getEndpointURL()+"' did not return a valid response document. The inbound filter (e.g., doInboundFilter()) as well as the inbound mappings (e.g., doInboundMap()) will not be executed.\nDescription: "+this.statusText);this.onError();return;}}else{this.setInboundDocument(Jb.getResponseXML());this.status=200;this.statusText="Executing in Static mode, using service message proxy, '"+this.getInboundURL()+"'.";}this.doInboundFilter();this.doInboundMap();if(D){this.onError();}else{this.onSuccess();}};g.getCDFDocument=function(p,b,r){var Q=this.getServer();var hb=Q!=null?Q.getCache():jsx3.CACHE;if(b=="OUTBOUND"){var x=hb.getDocument(p);if(x){this.CDFCONTEXT=new c.CdfContext(x.getRootNode(),null,x.getRootNode().selectNodes("record"));}else{c.ng(2,"The Cache document, '"+p+"', is being referenced as a bound CDF document for the operation, '"+this.getOperationName()+"'. However, this document cannot be located.");}}else{var x=jsx3.xml.CDF.Document.newDocument();hb.setDocument(p,x);this.CDFCONTEXT=new c.CdfContext(x.getRootNode(),null);}};g.getStatus=function(){var C=this._status||this.status;return !C?jsx3.net.Request.STATUS_OK:C;};g.setStatus=function(p){this._status=p;};g.getMode=function(){return this._jsxmode!=null?this._jsxmode:this.getServer().getEnv("mode");};g.setMode=function(f){this._jsxmode=f;};g.doInboundMap=function(){c.ng(5,"Executing the inbound mappings.");var Nc=this.getOperationNode();if(Nc){var mb=this.getInboundDocument();var yc=this.getStatus();var jb=yc!=200&&yc!=202&&yc!=0?"F":"O";if(jb=="O"&&this.Tk&&this.Tk.instanceOf&&this.Tk.instanceOf(jsx3.xml.Document)){c.ng(5,"This operation uses a compiled XSLT document to transform the server results to CDF.");jsx3.require("jsx3.xml.Processor");var zc=new jsx3.xml.Processor(mb,this.Tk);var hb=zc.transform();var Ic=jsx3.xml.CDF.Document.newDocument();Ic.loadXML(hb);if(!Ic.hasError()){c.ng(5,"The compiled transformation was successful. Adding the CDF to the server's cache.");var Ec=this.getMEPNode("O");var cc=Ec.selectSingleNode(".//record/mappings/record[@name='CDF Document']");if(cc){var X=cc.getAttribute("value");if(X&&(X=(X+"").trim())!=""){var xc=this.getServer();var Fc=xc!=null?xc.getCache():jsx3.CACHE;Fc.setDocument(X,Ic);}else{c.ng(2,"The CDF document that was just created could not be cached, because it has no name. Update the Rules document to use a name for the CDF document being created.");}}else{c.ng(2,"CDF Mappings require that the first mapping be of type 'CDF Document' and that this mapping type exist only once for an output. Update the Rules document to use a a CDF Document mapping.");}}else{c.ng(2,"The merge failed and a CDF Document could not be created, using the compiled CXF. Run this operation in an uncompiled state to better discern the cause of this error:\n\t"+Ic.getError().description);}}else{var Lc=Nc.selectSingleNode("record[@type='"+jb+"']");if(Lc==null&&jb=="F")Lc=Nc.selectSingleNode("record[@type='O']");var ic=Lc.selectNodes("record");var Dc=ic.getLength();mb.setSelectionLanguage("XPath");this.getRulesXML().setSelectionLanguage("XPath");for(var V=0;V<Dc;V++){var fc=ic.getItem(V);var Hb=fc.getAttribute("jsxtext");var Vb=fc.getAttribute("tns");var rb="";if(Vb!=null&&Vb.trim()!=""){rb="jsx:";mb.setSelectionNamespaces("xmlns:jsx='"+Vb+"'");}var ib="//"+rb+Hb;var Yb=mb.selectSingleNode(ib);if(Yb!=null){if(!Yb.equals(mb.getRootNode())){var pb=Yb.getParent();var ab=pb.selectNodes(rb+Hb);var Bb=ab.getLength();for(var ob=0;ob<Bb;ob++)this.doReadAndRecurse(ab.getItem(ob),fc);}else{this.doReadAndRecurse(Yb,fc);}}}}}};c.getNSForURL=function(f,a){var ab=f.getRootNode().getAttributes();for(var Gc=ab.getLength()-1;Gc>=0;Gc--){if(ab.getItem(Gc).getValue()==a){return ab.getItem(Gc).getBaseName();}}};c.getURLForNS=function(s,l){if(jsx3.util.strEmpty(l))return null;try{var Mc=s.selectSingleNode("//*[@xmlns:"+l+"]/@xmlns:"+l);}catch(Kc){var Bb={};Bb.FUNCTION="jsx3.net.Service.getURLForNS";Bb.PREFIX=l+"";Bb.DESCRIPTION="Could not finde the URI for the given namespace prefix.";jsx3.util.Logger.logError(Bb);return null;}return Mc?Mc.getValue():null;};c.getVersion=function(){return "3.0.00";};g.compile=function(){this._resetCompiler();var K=this.getMEPNode("O");var _=[];_.push("<?xml version=\"1.0\" ?>");_.push("<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" ");_.push("<xsl:output method=\"xml\" omit-xml-declaration=\"no\"/>");this._compile(K,_,true);_.push("</xsl:stylesheet>");var Bc=[],kb=[];for(var Qb in this.sx){Bc.push(this.sx[Qb]);kb.push("xmlns:"+this.sx[Qb]+"=\""+Qb+"\"");}_[1]+=(kb.join(" ")+" exclude-result-prefixes=\""+Bc.join(" ")+"\" >");var cc=_.join("\n");var Zb=new jsx3.xml.Document();Zb.loadXML(cc);if(Zb.hasError()){c.ng(2,"The XSLT could not be compiled from the CXF source document:\n\t"+Zb.getError().description);}else{this.Tk=Zb;return Zb;}};g._compile=function(l,n,m){var yb=this.ku(l);if(m){n.push("<xsl:template match=\"/\">");}else{var cc=yb?yb.prefix+":":"";var Kb=l.getAttribute("jsxtext");if(l.getAttribute("type")=="A")Kb="@"+Kb;var C=l.getAttribute("jsxid");n.push("<xsl:template match=\""+cc+Kb+"\" mode=\"x"+C+"\">");}var gc=l.selectNodes("mappings/record[@name='CDF Document' or @name='CDF Record' or @name='CDF Attribute']");var Nc=[];for(var Z=0;Z<gc.getLength();Z++){var hb=gc.getItem(Z);var z=hb.getAttribute("name");var ib=hb.getAttribute("value");if(z=="CDF Document"){n.push("<data jsxid=\"jsxroot\">");Nc.push("</data>");}else{if(z=="CDF Record"){n.push("<record jsxid=\"{generate-id()}\">");Nc.push("</record>");}else{n.push("<xsl:attribute name=\""+ib+"\"><xsl:value-of select=\".\"/></xsl:attribute>");}}}var qb=l.selectNodes("record");for(var Z=0;Z<qb.getLength();Z++){var R=qb.getItem(Z);var P=this.ku(R);var cc=P?P.prefix+":":"";if(m)cc="//"+cc;var Kb=R.getAttribute("jsxtext");if(R.getAttribute("type")=="A")Kb="@"+Kb;var C=R.getAttribute("jsxid");n.push("<xsl:apply-templates select=\""+cc+Kb+"\" mode=\"x"+C+"\"/>");}for(var Z=Nc.length-1;Z>=0;Z--)n.push(Nc[Z]);n.push("</xsl:template>");for(var Z=0;Z<qb.getLength();Z++){var R=qb.getItem(Z);this._compile(R,n);}};g._resetCompiler=function(){this.Tk=null;this.sx={};this.Sg=0;};g.ku=function(k){var Ac=k.getAttribute("tns");if(Ac&&(Ac=(Ac+"").trim())!=""){if(!this.sx[Ac]){this.Sg+=1;this.sx[Ac]="jsx"+this.Sg;}return {prefix:"jsx"+this.Sg,namespace:Ac};}};});jsx3.net.Service.prototype.getOperation=jsx3.net.Service.prototype.getOperationName;jsx3.net.Service.prototype.setOperation=jsx3.net.Service.prototype.setOperationName;jsx3.net.Service.prototype.getStubURL=jsx3.net.Service.prototype.getOutboundStubURL;jsx3.net.Service.prototype.setStubURL=jsx3.net.Service.prototype.setOutboundStubURL;jsx3.net.Service.prototype.addHeader=jsx3.net.Service.prototype.setRequestHeader;jsx3.net.Service.prototype.setServiceURL=jsx3.net.Service.prototype.setEndpointURL;jsx3.Service=jsx3.net.Service;
