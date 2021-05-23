var Assets = require('asset.js')
var Util = require('util.js')

if (!$settings.isEnabled('foreground_service'))
{
    $settings.setEnabled('foreground_service', true)
}

if (!images.requestScreenCapture(false)) {
    toastLog('请求截图失败')
    exit()
}

sleep(500)

let running = true

// 运行次数
let tick = 0

// 底部按钮序号
let wordNum = 0

// 首次进入进阶界面
let fristEnterAdvanceMenu = true

while (running) {
    let screenImg = images.captureScreen()

    // 判断界面的依据元素的位置
    let pos;

    // 首充弹窗
    if (pos = images.findImage(screenImg, Assets.logoShouChongHaoLi, {
        threshold: 0.9,
        region: [0, 0, 1280, 360]
    })) {
        console.log('遭遇首充弹窗 正在关闭')

        let match;

        if (match = images.matchTemplate(screenImg, Assets.buttonNoName, {
            max: 1,
            threshold: 0.9,
            region: [0, 0, 1280, 360]
        }).best()) {
            Util.randomTap(match.point.x, match.point.y, 10, 10)
        }
        sleep(1000)

        continue
    }

    // 开始游戏弹窗
    if (pos = images.findImage(screenImg, Assets.charInGameStartGame, {
        threshold: 0.9,
        region: [547, 357, 63, 50]
    })) {
        console.log('遭遇开始游戏弹窗 正在关闭')

        Util.absRandomTap(515, 466, 720, 534)

        sleep(1000)

        continue
    }

    // 新功能开启弹窗
    if (pos = images.findImage(screenImg, Assets.charNewItemUnlock, {
        threshold: 0.9,
        region: [569, 478, 157, 93]
    })) {
        console.log('遭遇新功能开启弹窗 正在关闭')

        Util.absRandomTap(630, 350, 650, 370)

        sleep(1000)

        continue
    }

    // 经验跑环弹窗
    if (pos = images.findImage(screenImg, Assets.wordJingYanPaoHuan, {
        threshold: 0.9,
        region: [574, 63, 95, 22]
    })) {
        console.log('遭遇经验跑环弹窗 正在关闭')

        Util.absRandomTap(558, 506, 674, 532)

        sleep(1000)

        continue
    }

    // 穿上装备弹窗
    if (pos = images.findImage(screenImg, Assets.buttonChuanShang, {
        threshold: 0.9,
        region: [867, 383, 111, 38]
    })) {
        console.log('按下按钮： 穿上\n' + pos)
        Util.tap(
            random(pos.x, pos.x + 30),
            random(pos.y, pos.y + 18)
        )
    }

    // 地图
    if (pos = images.findImage(screenImg, Assets.charMap, {
        threshold: 0.9,
        region: [218, 180, 25, 96]
    })) {
        console.log('按下按钮： 关闭地图')
        Util.randomTap(1054, 91, 24, 21)
        sleep(1000)
        continue
    }

    // 通过战力字样判断是否在主界面
    if (pos = images.findImage(screenImg, Assets.wordZhanLi, {
        threshold: 0.9,
        region: [101, 7, 51, 27]
    })) {
        console.log('当前位置： 主界面\n运行次数： ' + tick + '\n' + pos)

        let match;

        // 主界面上有“交任务”按钮
        if (match = images.matchTemplate(screenImg, Assets.buttonJiaoRenWu, {
            max: 1,
            threshold: 0.9,
            region: [157, 570, 82, 27]
        }).best()) {
            console.log('按下按钮： 交任务\n' + match)
            Util.tap(
                random(match.point.x + 10, match.point.x + 72),
                random(match.point.y + 10, match.point.y + 17)
            )
        }

        // 需要点击的底部按钮文字
        let needToTapWords = ['觉', '骑', '宠', '翅']

        // 底部按钮文字
        let word

        switch (wordNum++) {
            // 底部按钮1
            case 0:
                console.log('orc0')
                word = Util.wordOcr(
                    images.scale(images.clip(screenImg, 368, 563, 44, 44), 2, 2)
                )
                if (word && needToTapWords.indexOf(word) > -1) {
                    Util.randomTap(378, 573, 30, 30)
                    sleep(1000)
                    continue
                }
                break

            // 底部按钮2
            case 5:
                console.log('orc1')
                word = Util.wordOcr(
                    images.scale(images.clip(screenImg, 438, 563, 44, 44), 2, 2)
                )
                if (word && needToTapWords.indexOf(word) > -1) {
                    Util.tap(
                        random(438 + 10, 438 + 40),
                        random(563 + 10, 563 + 40)
                    )
                    sleep(1000)
                    continue
                }
                break

            // 底部按钮3
            case 10:
                console.log('orc2')
                word = Util.wordOcr(
                    images.scale(images.clip(screenImg, 509, 563, 44, 44), 2, 2)
                )
                if (word && needToTapWords.indexOf(word) > -1) {
                    Util.tap(
                        random(509 + 10, 509 + 40),
                        random(563 + 10, 563 + 40)
                    )
                    sleep(1000)
                    continue
                }
                break

            // 底部按钮4
            case 15:
                console.log('orc3')
                word = Util.wordOcr(
                    images.scale(images.clip(screenImg, 578, 563, 44, 44), 2, 2)
                )
                if (word && needToTapWords.indexOf(word) > -1) {
                    Util.tap(
                        random(578 + 10, 578 + 40),
                        random(563 + 10, 563 + 40)
                    )
                    sleep(1000)
                    continue
                }
                break

            // 底部按钮5
            case 20:
                console.log('orc4')
                word = Util.wordOcr(
                    images.scale(images.clip(screenImg, 648, 563, 44, 44), 2, 2)
                )
                if (word && needToTapWords.indexOf(word) > -1) {
                    Util.tap(
                        random(648 + 10, 648 + 40),
                        random(563 + 10, 563 + 40)
                    )
                    sleep(1000)
                    continue
                }
                break
            default:
                break
        }

        if (wordNum > 20)
            wordNum = 0
    }

    // 通过“进入游戏”按钮判断是否在开始游戏界面
    else if (pos = images.findImage(screenImg, Assets.buttonJingRuYouXi, {
        threshold: 0.9,
        region: [490, 487, 261, 88]
    })) {
        console.log('当前位置： 开始游戏界面\n运行次数： ' + tick + '\n' + pos)
    }

    // 通过"进阶"图标判断是否在进阶界面
    else if (pos = images.findImage(screenImg, Assets.logoJinJie, {
        threshold: 0.7,
        region: [18, 0, 180, 64]
    })) {
        console.log('当前位置： 进阶\n运行次数： ' + tick + '\n' + pos)

        let match;

        // 等待加载完毕
        while (!(match = images.matchTemplate(screenImg, Assets.wordShengJie, {
            max: 1,
            threshold: 0.99,
            region: [0, 528],
        }))) {
            sleep(1000)
            screenImg = images.captureScreen()
        }

        if (fristEnterAdvanceMenu) {
            sleep(1000)
            screenImg = images.captureScreen()
            fristEnterAdvanceMenu = false
        }

        // 可以进阶
        if (
            (match = images.matchTemplate(screenImg, Assets.buttonShengJie, {
                max: 1,
                threshold: 0.99,
                region: [0, 528],
            }).best())
            ||
            (match = images.matchTemplate(screenImg, Assets.buttonShengJie2, {
                max: 1,
                threshold: 0.99,
                region: [0, 528],
            }).best())
        ) {
            console.log('按下按钮： “升阶”\n' + match)
            Util.tap(
                random(match.point.x + 30, match.point.x + 100),
                random(match.point.y + 30, match.point.y + 43)
            )
            sleep(300)
        }
        else {
            // 退出
            Util.tap(
                random(1177, 1205),
                random(17, 42)
            )
            fristEnterAdvanceMenu = true
            sleep(1000)
        }
    }

    // 通过"觉醒"图标判断是否在觉醒进阶界面
    else if (pos = images.findImage(screenImg, Assets.logoJueXing, {
        threshold: 0.7,
        region: [18, 0, 180, 64]
    })) {
        console.log('当前位置： 觉醒进阶\n运行次数： ' + tick + '\n' + pos)

        let match;

        // 等待加载完毕
        while (!(match = images.matchTemplate(screenImg, Assets.wordShengJie, {
            max: 1,
            threshold: 0.99,
            region: [0, 528],
        }))) {
            sleep(1000)
            screenImg = images.captureScreen()
        }

        if (fristEnterAdvanceMenu) {
            sleep(1000)
            screenImg = images.captureScreen()
            fristEnterAdvanceMenu = false
        }

        // 可以进阶
        if (match = images.matchTemplate(screenImg, Assets.buttonShengJie3, {
            max: 1,
            threshold: 0.99,
            region: [0, 528],
        }).best()) {
            console.log('按下按钮： “升阶”\n' + match)
            Util.tap(
                random(match.point.x + 30, match.point.x + 100),
                random(match.point.y + 30, match.point.y + 43)
            )
            sleep(300)
        }
        else {
            // 退出
            Util.tap(
                random(1177, 1205),
                random(17, 42)
            )
            fristEnterAdvanceMenu = true
            sleep(1000)
        }
    }

    // 通过“强化”图标判断是否在强化界面
    else if (pos = images.findImage(screenImg, Assets.logoQiangHua, {
        threshold: 0.9,
        region: [24, 4, 114, 47]
    })) {
        console.log('当前位置： 强化\n运行次数： ' + tick + '\n' + pos)
        
    }

    else {
        console.log('当前位置： 无\n运行次数： ' + tick + '\n')
    }

    tick++;
    sleep(200)
}

sh.exit()
