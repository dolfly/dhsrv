/**
 * 状态模式管理器
 * 需要传入states：
 * states:{
 * 		states1 : function(){
 * 
 * 		},
 * 		states2 : function(){
 * 
 * 		}
 * }
 * @author ronizhang
 */
(function(namespace){
	
	var StatesManager = {
		setStates : function(states){
			this.states[states] && this.states[states]();
			this.curState = states;
		},
		getStates : function(){
			return this.curState;
		},
		extendStates : function(obj, states){
			for (var i in this) {
				obj[i] = this[i];
	        }
			obj.curState = undefined;
			obj.states = states;
		}
	};
	
	namespace.StatesManager = StatesManager;
		
})(haoqq.namespace('util'));