// const ocr = $plugins.load("com.hraps.ocr")
const ra = new RootAutomator()

events.on('exit', () => {
    ra.exit()
})

module.exports = {
    /*
         wordOcr: function (img) {
            let ocrResults = ocr.detect(img.getBitmap(), 1)
            ocrResults = ocr.filterScore(ocrResults, 0.5, 0.5, 0.5)
            if (ocrResults.size() === 1) {
                let ocrResult = ocrResults.get(0).text
                console.log('ocr result: ' + ocrResult)
                return ocrResult
            }
    
            return null
        }, 
    */
    tap: function () {
        let duration = random(300, 400)
        if (arguments.length === 1) {
            let pos = arguments[0]
            ra.press(
                pos.x,
                pos.y,
                duration
            )
            sleep(duration)
        }
        else if (arguments.length === 2) {
            ra.press(
                arguments[0],
                arguments[1],
                duration
            )
            sleep(duration)
        }
    },
    randomTap: function (x, y, dx, dy) {
        let duration = random(300, 400)
        ra.press(
            random(x, x + dx),
            random(y, y + dy),
            duration
        )
        sleep(duration)
    },
    absRandomTap: function (x, y, x1, y1) {
        let duration = random(300, 400)
        ra.press(
            random(x, x1),
            random(y, y1),
            duration
        )
        sleep(duration)
    }
}
