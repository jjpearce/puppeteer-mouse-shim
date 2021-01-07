
const patchMouse = async (puppeteer) => {

    class WinMouse {

        constructor(origMouse, page) {
            this.origMouse = origMouse;
            this.page = page;
            this.headless = page._target._browserContext._browser._process.spawnargs.indexOf('--headless') > -1;
        }
    
        async move(x, y, options) {
            if (this.headless) {
                return this.origMouse.move(x, y, options);
            }
            // native implementation
        }
    
        async click(x, y, options) {
            if (this.headless) {
                return this.origMouse.click(x, y, options);
            }
            // native implementation
        }
    
        async down(options) {
            if (this.headless) {
                return this.origMouse.down(x, y);
            }
            // native implementation
        }
        async up(options) {
            if (this.headless) {
                return this.origMouse.up(options);
            }
            // native implementation
        }
        wheel(options) {
            if (this.headless) {
                return this.origMouse.wheel(options);
            }
            // native implementation
        }
    }

    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    delete page.__proto__.mouse
    

    Object.defineProperty(page.__proto__, 'mouse', {
        get: function() {
            console.log('HACK: in mouse getter')
            return new WinMouse(this._mouse, this);
            //return this._mouse;
        }
    });

    await browser.close();
};

exports.patchMouse = patchMouse;