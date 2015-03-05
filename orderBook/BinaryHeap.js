// Exchange Engine
// Hyo Yul Byun 2015
// Binary heap data structure used for keeping asks and bids in the order books
// The comparator should be overridden unless you're sorting integers

function BinaryHeap() {
	this.content = [];

	//This should be overridden depending on use
	this.comparator = function(a,b) {
		return b-a;
	}
}

BinaryHeap.prototype = {
	insert:function(element){
		this.content.push(element);

		var pos=this.content.length-1;
		while (pos>0){
			var parentPos=Math.floor(pos/2+1)-1;
			if (this.comparator(this.content[pos],this.content[parentPos])<=0) {
				var tmp=this.content[parentPos];
				this.content[parentPos]=this.content[pos];
				this.content[pos]=tmp;
				pos=parentPos;
			} else {
				break;
			}
		}
	},

	pop:function() {
		var head=this.content[0];
		var tail=this.content.pop();
		if (this.content.length > 0) {
      		this.content[0] = tail;
     		this.bubbleDown(0);
    	}
   		return head;
	},

	bubbleDown:function(pos) {
		var	rightPos=(pos+1)*2;
		var	leftPos=rightPos-1;
		while (this.content.length>leftPos) {
			rightPos=(pos+1)*2;
			leftPos=rightPos-1;
			var swapPos=leftPos;
			if (this.content.length>rightPos && this.comparator(this.content[leftPos] , this.content[rightPos])>0)
				swapPos=rightPos;
			if (this.content.length>leftPos && this.comparator(this.content[pos] , this.content[swapPos])>0){
				var tmp=this.content[swapPos];
				this.content[swapPos]=this.content[pos];
				this.content[pos]=tmp;
			} else {
				break;
			}
			pos=swapPos;

		}
	},
	length:function() {
		return this.content.length;
	}
}

module.exports = BinaryHeap;
