var Skelotron = (function () {	/// this is the publicObject for the script

	#include './libs/json.js'
	#include './libs/aequery.js' // aequery is now available as aeq



	////// Private functions that are available within this file
	function getCompName() {
		var thisComp = aeq.getActiveComp();

		if (thisComp == null) { return null; }

		return JSON.stringify({name: thisComp.name});
	}

	function renameLayers(prefs) {
		var thisComp = aeq.getActiveComp();
		var selLayers = aeq.getSelectedLayers(thisComp);

		var newName = prefs.layerName;
		var increment = prefs.increment;

		for (var i = 0; i < selLayers.length; i++) {
			var layer = selLayers[i];
			var inc = (increment) ? ' ' + (i+1) : '';
			layer.name = newName + inc;
		}
	}


	////// Public functions that are available to the host app by calling Skelotron.getCompName() etc //////
	return {
		getCompName: function() {
			return getCompName();
		},
		renameLayers: function(prefs) {
			return renameLayers(prefs);
		},
	};
})();
