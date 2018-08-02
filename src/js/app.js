(function () {

var cs = new CSInterface();
var fs = require('fs');

var scriptName = 'Skelotron';
var devName = 'BattleAxe';


var devPath = cs.getSystemPath(SystemPath.USER_DATA) + '/' + devName + '/';
var userPath = devPath + scriptName + '/';


///// LOAD IN JSX FILES
function loadJsxFile(scriptName) {
	var f = cs.getSystemPath(SystemPath.EXTENSION) + '/jsx/' + scriptName + '.jsx';
	if (cep.fs.readFile(f).err === 0) {
		cs.evalScript('$.evalFile("'+ f +'")');
	}
	console.log('loaded:', scriptName);
}
///// promise evalScript
function evalScript(funcName, params) {
	var args = JSON.stringify(params);

	if (typeof args === "undefined" || args === "{}") {
		args = "";
	}
	var command = scriptName + '.' + funcName + '(' + args + ')'
	return new Promise(function(resolve, reject) {
		cs.evalScript(command, resolve);
	});
}
///// insures that a folder exists before saving files
function checkDir(path) {
    var stat = window.cep.fs.stat(path);
    var isDir = stat.err == window.cep.fs.NO_ERROR && stat.data.isDirectory();
	if (!isDir) { window.cep.fs.makedir(path) }
}
///// reads the prefs file outside of the signed extension
function getPrefs() {
	fs.readFile(userPath + 'config/prefs.json', 'utf8', function (err, data) {		/// read the layer data file
		console.log(err);
		if (err == null) {
			vm.prefs = JSON.parse(data);
		} else {
			vm.prefs = {
				layerName: '',
				increment: false,
			},
			vm.savePrefs();
		}
	});
}

///// Vue.js
var vm = new Vue({
	el: '#app',
	data: {
		compName: '',
		prefs: {
			layerName: '',
			increment: false,
		},
		bgColor: 'rgb(0,0,0)',
	},
	methods: {
		savePrefs: function () {
			var path = userPath + 'config/';
			checkDir(userPath);
			checkDir(path);
			window.cep.fs.writeFile(path + 'prefs.json', JSON.stringify(vm.prefs, false, 2));
			console.log(vm.prefs);
		},
		getCompName: function () {
			evalScript('getCompName').then(function (results) {
				var aeData = JSON.parse(results);
				if (aeData) {
					vm.compName = aeData.name;
				} else {
                	//// Errors and stuff ////
               }
			});
		},
		renameLayers: function () {
			vm.savePrefs();
			evalScript('renameLayers', vm.prefs);
		},
	},
});



///// Flyout and context menus
var flyoutXML = '<Menu>\
							<MenuItem Id="settings" Label="Settings" Enabled="true" Checked="false"/>\
							<MenuItem Id="reload" Label="Reload" Enabled="true" Checked="false"/>\
							<MenuItem Label="---" />\
							<MenuItem Id="help" Label="Help" Enabled="true" Checked="false"/>\
					</Menu>';

	cs.setContextMenu(flyoutXML, function (res) {
		if (res =='settings') {
			cs.requestOpenExtension('com.Skelotron.modal', '');
		}
		if (res == 'reload') {
			window.location.reload(true);
		}
		if (res == 'help') {
			cs.openURLInDefaultBrowser('http://www.google.com');
		}
	});

	cs.setPanelFlyoutMenu(flyoutXML);

	cs.addEventListener('com.adobe.csxs.events.flyoutMenuClicked', function(evt) {
	if (evt.data.menuId == 'settings') {
		cs.requestOpenExtension('com.Skelotron.modal', '');
	}
	if (evt.data.menuId == 'reload') {
		window.location.reload(true);
	}
	if (evt.data.menuId == 'help') {
		cs.openURLInDefaultBrowser('http://www.google.com');
	}
});

//// BG Color
cs.addEventListener(CSInterface.THEME_COLOR_CHANGED_EVENT, setBgColor);

	function setBgColor() {
		var appColor = cs.getHostEnvironment().appSkinInfo.panelBackgroundColor.color;
		vm.bgColor = 'rgb('+ Math.floor(appColor.red) + ', ' + Math.floor(appColor.green) + ', ' + Math.floor(appColor.blue) + ')';
	}

/// intitialize ///
loadJsxFile('script');		// loads the jsx file after the panel loads for easy right-click > Reload to update the panel without closing it or the host app
setBgColor();				// gets the interface color
getPrefs();					// reads available prefs json file that is outside of the signed extensions

}());
