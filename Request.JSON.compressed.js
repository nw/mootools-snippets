Request.JSON.extend({
 
	options : {
		inflate : []
	}
 
});
 
 
Request.JSON.implement({
 
	success : function(text){
		this.response.json = JSON.decode(text, this.options.secure);
		if(this.options.inflate.length){
			this.options.inflate.each(function(rule){
				var ret = ($defined(rule.store)) ? this.response.json[rule.store] : this.response.json[rule.data];
				ret = this.expandData(this.response.json[rule.data], this.response.json[rule.keys]);
			},this);
		}
		this.onSuccess(this.response.json, text);
	},
 
	expandData : function(data,keys){
		var arr = [];
		var len = data.length; var klen = keys.length;
		var start = 0; var stop = klen;
		while(stop < len){
			arr.push( data.slice(start,stop).associate(keys) );
			start = stop; stop += klen;
		}
		return arr;
	}
 
});