var Registry = new Class({
 
	Implements : [Events],
 
	conf : {},
 
	set : function(path,value){
		var fragments = path.split('/');
 
		if( fragments.shift() !== '') return false; // remove empty, first component
		if(fragments.length > 0 && fragments[fragments.length - 1] == '') fragments.pop();
 
		var obj = {}; var ref = obj; var len = fragments.length;
		if( len > 0){
			for(i = 0; i < len-1; i++){
				ref[fragments[i]] = {};
				ref = ref[fragments[i]];
			}					
			ref[fragments[len-1]] = value;
			this.conf = $merge(this.conf,obj);
		} else {
			this.conf = value;
		}
	},
 
	get : function(path){
		var fragments = path.split('/');
 
		if( fragments.shift() !== '') return null;
		if(fragments.length > 0 && fragments[fragments.length -1] == '') fragments.pop();
 
		var ref = this.conf; var path_exists = true; var i = 0; var len = fragments.length;
		while(path_exists && i < len){
			path_exists = path_exists && (ref[fragments[i]] !== undefined);
			ref = ref[fragments[i]]; i++;
		}
 
		return ref;
	}
 
});