Elements.implement({
 
	visualSort : function(tolerance,flatten){
 
		var tolerance = (tolerance) || .5;
		var idx = [], el, c1, c2, placed;
 
		for(var i = 0, l = this.length; i < l; i++){
			el = this[i]; c1 = el.getCoordinates();
			if(!i) idx[0] = [el, c1];
			else {
				j = 0; placed = false;
				while(j < i && !placed ){
					c2 = idx[j][1];
					if(c1.top < c2.top) placed = true;
					else j++;
				}
				idx.splice(j,0,[el,c1]);
			}
		}
 
		var rows = [], row = 0, sorted = [], slen, threshold;
		for(i = 0; i < l; i++){
			c1 = idx[i][1];
			if(!i){
				rows[row] = [c1.top,(c1.top + c1.height*tolerance)];
				sorted[row] = [ idx[i] ];
			}
			else {
				threshold = rows[row];
				if((threshold[0] <= c1.top) && (c1.top <= threshold[1]) ){
					j = 0; placed = false; slen = sorted[row].length;
					while(j < slen && !placed){
						c2 = sorted[row][j][1];
						if(c1.left < c2.left) placed = true;
						else j++
					}
					sorted[row].splice(j,0,idx[i]);
				} else {
					row++;
					rows[row] = [c1.top,(c1.top + c1.height*tolerance)];
					sorted[row] = [idx[i]];
				}
			}
		}
 
		var result = [];
		for(i = 0, l = sorted.length; i < l; i++){
			result[i] = [];
			for(j = 0, len = sorted[i].length; j < len; j++){
				result[i][j] = sorted[i][j][0];
			}
		}
 
		if(flatten) return $$(result.flatten());
		return result;
 
	}
 
});