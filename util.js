const ocr = $plugins.load("com.hraps.ocr")
const ra = new RootAutomator()

events.on('exit', () => {
    ra.exit()
})

module.exports = {
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
    tap: function () {
        if (arguments.length === 1) {
            let pos = arguments[0]
            ra.tap(pos.x, pos.y)
        }
        else if (arguments.length === 2) {
            ra.tap(arguments[0], arguments[1])
        }
    },
    randomTap: function (x, y, dx, dy) {
        ra.tap(
            random(x, x + dx),
            random(y, y + dy)
        )
    },
    absRandomTap: function (x, y, x1, y1) {
        ra.tap(
            random(x, x1),
            random(y, y1)
        )
    }
}
