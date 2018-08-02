(function () {
var cs = new CSInterface();
var fs = require('fs');

var scriptName = 'Skelotron';
var devName = 'BattleAxe';


var devPath = cs.getSystemPath(SystemPath.USER_DATA) + '/' + devName + '/';
var userPath = devPath + scriptName + '/';


cs.setWindowTitle(scriptName + ' Settings');

var appColor = cs.getHostEnvironment().appSkinInfo.panelBackgroundColor.color;
document.body.style.background = 'rgb(' + Math.floor(appColor.red) + ', '+ Math.floor(appColor.green) + ', ' + Math.floor(appColor.blue) + ' )';


}());
