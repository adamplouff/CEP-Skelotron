# Skelotron - CEP skeleton template
[Adobe CEP][799ff023] is unnecessarily difficult to start using. There's a lot to learn and I don't claim to know it all but this is my simplified setup for building new tools with this fantastically powerful platform. [This book][799ff025] helped me a lot with understanding how data is transferred between the panel and host app and I recommend highly it.

I'm very new to build systems and so one of the key features of this setup is the ability to reload the panel with a right click and refresh the jsx at the same time –without having to build or close host app.

I am primarily an After Effects developer but this setup has been tested in Illustrator and Photoshop as well. Examples in this will be for AE but are applicable to other host apps.

**Note:** [Vue][799ff047] is my framework of choice for managing what happens within the panel. All of the

## Features
- Reloading of the jsx file with *right-click > reload* to refresh your code
- Simplified data transfer between panel and host app that handles jsoning the data and promises for returning data from the app
    - `evalScript('jsxFuncName', objectToSendToHostApp)`
- Modal popup
- Preference file saving (must be saved outside of the signed extension)
- Basic gulp setup for packaging up the extension
- Automatic detection of host app brightness to match panel - updating with Vue
- Context and flyout menus

## Usage
1. Download the repo and we'll call this the project file
- Do a search and replace for all the files  for ***Skelotron*** and name it something brutal. I used [Atom][799ff027] *Find in Project* for this.
- Create a symbolic link ([OS X][799ff029]/[Windows][799ff031]) from the **/src** folder to the Adobe Extensions folder. This allows you work with your project folder wherever you want it and still have it open in After Effects. *note: you can rename this symlinked **/src** folder to anything you want.*
    - `[Mac]: /Users/**username**/Library/Application Support/Adobe/CEP/extensions/`
    - `[Win]: C:/Users/**username**/AppData/Roaming/Adobe/CEP/extensions/`
- Download [ZXP Installer][799ff035]. Open it and navigate to settings. In here you can **enable extension debugging** which allows you to open and use unsigned (in progress) extensions.
- Open After Effects and navigate to Window > Extensions > **Brutal tool name**
- Inside of **/src** you can edit the **index.html**, **style.css**, **app.js** and **script.jsx** all you want to make it look cool and do great stuff. Bonus points if you use **modal.html** and **modal.js**.
- [Debugging][799ff033] may be done in Chrome at http://localhost:8093/
    - This address may be set to anything you want in the invisible **.debug** file

## Signing
Once you're all done and want to share with someone else you need to sign the extension. This is for security and means it can't be edited. You need to create a certificate but you only need to do this once. Reuse this certificate for future tools too.

### Certificate
1. Download [ZXPSignCmd][799ff037].
- Open terminal and **cd** to the location of the downloaded ZXPSignCmd
- Type a string similar to this:
    - `./ZXPSignCmd -selfSignedCert US GA "Battle Axe" "Adam Plouff" password cert.p12`
    - Which roughly equates to:
    - `./ZXPSignCmd -selfSignedCert [Country] [State] "[Company]" "[Author]" [password] cert.p12`
- Place this new **cert.p12** file in the main project folder with the **Gulp.js** file

### Setup
If you are a person who knows about npm and gulp you can probably skip this.
1. Download [Node.js][799ff041]. It comes with a command line app called NPM that downloads a bunch of little packages that allow you to build the extension.
- **cd** into the project folder you've been working in the whole time
- Type `npm install` and press enter to see a bunch of the fun progress bars
- There will now be a **/node_modules** folder filled with all sorts of stuff you don't need to worry about

### Build
- Open **gulpfile.js** and update the password on line 83 to reflect the password you used when creating the certificate file
- In Terminal, type **gulp** then hit enter
- A brand new **BrutalNameTool.zxp** will now be the **/Install** folder
- Delete the symlink project folder in **/Adobe/CEP/extensions/**
- Install this new zxp file with ZXP Installer to make sure it works
- High5 yourself for becoming a CEP developer

## Thank you
This package would have been a mess without the guidance and ongoing support of [Zack Lovatt][799ff039]. He came up with the really lean `evalScript()` func that is changing the way I build tools and so many other real-boy coder tips. Zack is light in the dark world of Adobe tool dev.

Many thanks to [Rune Gangsø][799ff043] for building the [jsxbin][799ff045] npm package and for helping me troubleshoot my own poor setup to help make things work on OS and Windows.

## License
Apache 2.0


[799ff023]: https://github.com/Adobe-CEP "Adobe CEP"
[799ff025]: http://htmlpanelsbook.com/ "HTML Panels"
[799ff027]: https://atom.io/ "Atom"
[799ff029]: https://www.howtogeek.com/297721/how-to-create-and-use-symbolic-links-aka-symlinks-on-a-mac/ "OS X Symlink"
[799ff031]: https://www.howtogeek.com/howto/16226/complete-guide-to-symbolic-links-symlinks-on-windows-or-linux/ "Windows Symlink"
[799ff033]: https://github.com/Adobe-CEP/Getting-Started-guides/tree/master/Client-side%20Debugging "Client side debugging"
[799ff035]: https://aescripts.com/learn/zxp-installer/ "ZXP Installer"
[799ff037]: https://github.com/Adobe-CEP/CEP-Resources/tree/master/ZXPSignCMD "ZXPSignCmd"
[799ff039]: http://zacklovatt.com/ "Zack Lovatt"
[799ff041]: https://nodejs.org/en/download/ "Node.js"
[799ff043]: https://github.com/runegan "Rune Gangsø"
[799ff045]: https://www.npmjs.com/package/jsxbin "jsxbin npm"
[799ff047]: https://vuejs.org/ "vue.js"
