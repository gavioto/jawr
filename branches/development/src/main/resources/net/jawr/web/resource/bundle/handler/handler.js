if(!window.JAWR) 
	JAWR = {};
JAWR.loader = {
	usedBundles : {},
	script : function(path) {
		this.insert(this.jsbundles,'insertScript',path);
	},
	style: function(path,media) {
		this.insert(this.cssbundles,'insertCSS',path,media);
	},
	insert : function(bundles,func,path,media){
		for(var x = 0; x < bundles.length;x++){
				var bundle = bundles[x];
				if(bundle.belongsToBundle(path) && !this.usedBundles[bundle.name]){
					this.usedBundles[bundle.name] = true;
					if(bundle.ieExpression)
						this.insertCondComment(bundle.ieExpression,func,bundle.prefix + bundle.name,media);
					else this[func](bundle.prefix + bundle.name,media);					
				}
			}			
	},
	insertScript : function(path){
		document.write(' <script type="text/javascript" src="'+this.normalizePath(this.mapping+'/'+path)+'" > </script> ');
	},
	insertCondComment : function(condition,func,path,media){
	 document.write('<!--[' + condition + ']>\n');
	 this[func](path,media);
	 document.write('<![endif]-->');
	},
	normalizePath : function(path) {
		while(path.indexOf('//')!=-1)
			path = path.replace('//','/');
		return path;
	},
	insertCSS : function(path,media){
		media = media ? media : 'screen';
		document.write(' <link rel="stylesheet" type="text/css" media="' + media + '" href="'+this.normalizePath(this.cssmapping+'/'+path)+'" ></link> ');		
	} 	
}
JAWR.ResourceBundle = function(name, prefix, itemPathList,ieExpression){this.name = name;this.prefix = prefix;this.itemPathList = itemPathList;this.ieExpression=ieExpression}
JAWR.ResourceBundle.prototype.belongsToBundle = function(path) {	
	if(path == this.name)
		return true;
	if(!this.itemPathList)
		return false;
	for(var x = 0; x < this.itemPathList.length; x++) {
		if(this.itemPathList[x] == path)
			return true;
	}
	return false;
}