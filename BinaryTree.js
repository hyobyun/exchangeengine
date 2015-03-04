function BinaryTree() {
	this.content= [];
	this.comparator = function (a,b) {
		return b-a;
	}
}

BinaryTree.prototype = {
	this.insert= function (element){
		this.content.push(element);
		
		var pos=this.content.length-1;
		while(pos>0){
			var parentPos=Math.floor(pos/2+1);
			if(comparator(this.content[pos],this.content[parentPos])>0) {
				var tmp=content[parentPos];
				this.content[parentPos]=content[pos];
				this.content[pos]=tmp;
				pos=parentPos;
			} else {
				break;
			}
		}
	}
}