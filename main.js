var Assets = require('asset.js')
var Util = require('util.js')

if (!$settings.isEnabled('foreground_service')) {
    $settings.setEnabled('foreground_service', true)
}

if (!requestScreenCapture(false)) {
    toastLog('请求截图失败')
    exit()
}

sleep(500)

let running = true

// 运行次数
let tick = 0

let lastEquipTime = 0

// 首次进入子菜单
let fristEnterSubMenu = true

while (running) {
    let screenImg = captureScreen()

    let pos

    let match

    // 首充弹窗
    if (pos = findImage(screenImg, Assets.buttonNoName, {
        threshold: 0.9,
        region: [1122, 69, 25, 23]
    })) {
        console.log('遭遇首充弹窗 正在关闭')
        console.log('点击首充弹窗关闭按钮' + pos)
        Util.randomTap(pos.x, pos.y, 25, 23)

        sleep(1000)

        continue
    }

    // 首充弹窗2
    if (pos = findImage(screenImg, Assets.buttonNoName2, {
        threshold: 0.9,
        region: [1136, 191, 14, 14]
    })) {
        console.log('遭遇首充弹窗2 正在关闭')
        console.log('点击首充弹窗2关闭按钮' + pos)
        Util.randomTap(pos.x, pos.y, 14, 14)

        sleep(1000)

        continue
    }

    // 开始游戏弹窗
    if (pos = findImage(screenImg, Assets.charInGameStartGame, {
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
    if (pos = findImage(screenImg, Assets.wordJingYanPaoHuan, {
        threshold: 0.9,
        region: [574, 63, 95, 22]
    })) {
        console.log('遭遇经验跑环弹窗 正在关闭')

        Util.absRandomTap(558, 506, 674, 532)

        sleep(1000)

        continue
    }

    // 穿上装备弹窗
    if (pos = findImage(screenImg, Assets.buttonChuanShang, {
        threshold: 0.9,
        region: [867, 383, 111, 38]
    })) {
        console.log('按下按钮： 穿上\n' + pos)
        Util.randomTap(pos.x, pos.y, 30, 18)

        lastEquipTime = 0
    }

    // 地图
    if (pos = findImage(screenImg, Assets.charMap, {
        threshold: 0.9,
        region: [218, 180, 25, 96]
    })) {
        console.log('按下按钮： 关闭地图')
        Util.randomTap(1054, 91, 24, 21)
        sleep(1000)
        continue
    }

    // 激活觉醒弹窗
    if (pos = findImage(screenImg, Assets.wordDianJiJiHuo, {
        threshold: 0.9,
        region: [580, 609, 115, 27]
    })) {
        console.log('按下按钮： 点击激活')
        Util.randomTap(580, 609, 115, 27)
        sleep(1000)
        continue
    }

    // 奖励弹窗
    if (pos = findImage(screenImg, Assets.buttonNoName3, {
        threshold: 0.9,
        region: [844, 236, 17, 18]
    })) {
        console.log('按下按钮： 关闭')
        Util.randomTap(844, 236, 17, 18)
        sleep(1000)
        continue
    }

    // 通过战力字样判断是否在主界面
    if (pos = findImage(screenImg, Assets.wordZhanLi, {
        threshold: 0.9,
        region: [101, 7, 51, 27]
    })) {
        console.log('当前位置： 主界面\n运行次数： ' + tick + '\n' + pos)

        // 主界面上有“交任务”按钮
        if (match = images.matchTemplate(screenImg, Assets.buttonJiaoRenWu, {
            max: 1,
            threshold: 0.9,
            region: [157, 570, 82, 27]
        }).best()) {
            console.log('按下按钮： 交任务\n' + match)
            Util.randomTap(match.point.x + 10, match.point.y + 10, 62, 7)
        }

        if (lastEquipTime++ > 5)
            Util.randomTap(378, 573, 30, 30)
    }

    // 通过"进阶"图标判断是否在进阶界面
    else if (pos = images.findImage(screenImg, Assets.logoJinJie, {
        threshold: 0.9,
        region: [18, 0, 180, 64]
    })) {
        console.log('当前位置： 进阶\n运行次数： ' + tick + '\n' + pos)

        // 等待加载完毕
        if (fristEnterSubMenu &&
            !(match = images.matchTemplate(
                screenImg,
                Assets.wordShengJie,
                {
                    max: 1,
                    threshold: 0.99,
                    region: [0, 528],
                }
            ))) {
            sleep(1000)
            continue
        }

        if (fristEnterSubMenu) {
            sleep(1000)
            screenImg = images.captureScreen()
            fristEnterSubMenu = false
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
            Util.absRandomTap(1177, 17, 1205, 42)
            fristEnterSubMenu = true
            sleep(1000)
        }
    }

    // 通过"觉醒"图标判断是否在觉醒进阶界面
    else if (pos = images.findImage(screenImg, Assets.logoJueXing, {
        threshold: 0.9,
        region: [18, 0, 180, 64]
    })) {
        console.log('当前位置： 觉醒进阶\n运行次数： ' + tick + '\n' + pos)

        // 等待加载完毕
        if (fristEnterSubMenu &&
            !(match = images.matchTemplate(
                screenImg,
                Assets.wordShengJie,
                {
                    max: 1,
                    threshold: 0.99,
                    region: [0, 528],
                }
            ))) {
            sleep(1000)
            continue
        }

        if (fristEnterSubMenu) {
            sleep(1000)
            screenImg = images.captureScreen()
            fristEnterSubMenu = false
        }

        // 可以进阶
        if (match = images.matchTemplate(screenImg, Assets.buttonShengJie3, {
            max: 1,
            threshold: 0.99,
            region: [0, 528],
        }).best()) {
            console.log('按下按钮： “升阶”\n' + match)
            Util.randomTap(match.point.x + 30, match.point.y + 15, 70, 28)
            sleep(300)
        }
        else {
            // 退出
            Util.absRandomTap(1177, 17, 1205, 42)
            fristEnterSubMenu = true
            sleep(1000)
        }
    }

    // 通过“强化”图标判断是否在强化界面
    else if (pos = findImage(screenImg, Assets.logoQiangHua, {
        threshold: 0.9,
        region: [24, 4, 114, 47]
    })) {
        console.log('当前位置： 强化\n运行次数： ' + tick + '\n' + pos)

        // 等待加载完毕
        if (fristEnterSubMenu &&
            !(match = images.matchTemplate(
                screenImg,
                Assets.wordQiangHua,
                {
                    max: 1,
                    threshold: 0.99,
                    region: [637, 609, 57, 25]
                }
            ))) {
            sleep(1000)
            continue
        }

        if (fristEnterSubMenu) {
            sleep(1000)
            screenImg = images.captureScreen()
            fristEnterSubMenu = false
        }

        // 可以强化
        if (images.findMultiColors(
            screenImg,
            "#e27645",
            [[-3, 6, "#ab2a0d"], [4, 9, "#ca1e0c"]],
            {
                threshold: 0.99,
                region: [743, 596, 7, 9]
            }
        )) {
            console.log('可以强化')

            if (match = images.matchTemplate(screenImg, Assets.wordZiDongQiangHua, {
                max: 1,
                threshold: 0.9,
                region: [892, 609, 114, 25]
            }).best()) {
                console.log('按下按钮： “自动强化”\n' + match)

                Util.randomTap(match.point.x, match.point.y, 114, 25)
            }

            sleep(300)
        }
        else {
            // 退出
            Util.absRandomTap(1177, 17, 1205, 42)
            fristEnterSubMenu = true
            sleep(1000)
        }
    }

    // 通过“成就”图标判断是否在成就界面
    else if (pos = findImage(screenImg, Assets.logoChengJiu, {
        threshold: 0.9,
        region: [21, 7, 118, 42]
    })) {
        console.log('当前位置： 成就\n运行次数： ' + tick + '\n' + pos)

        if (fristEnterSubMenu) {
            sleep(1000)
            screenImg = images.captureScreen()
            fristEnterSubMenu = false
        }

        // 可以领取
        if (images.findMultiColors(
            screenImg,
            "#e9844c",
            [[-5, 8, "#a21e05"], [5, 5, "#bc3e1b"]],
            {
                threshold: 0.9,
                region: [1256, 408, 10, 8]
            }
        )) {
            console.log('可以领取')

            if (pos = findImage(screenImg, Assets.wordLingQu, {
                threshold: 0.9,
                region: [885, 60, 186, 660]
            })) {
                console.log('按下按钮： “领取”\n' + pos)

                Util.randomTap(pos.x, pos.y, 44, 20)

                sleep(300)
            }
        }
        else {
            // 退出
            Util.absRandomTap(1177, 17, 1205, 42)
            fristEnterSubMenu = true
            sleep(1000)
        }
    }

    // 通过“灵器”图标判断是否在灵器界面
    else if (pos = findImage(screenImg, Assets.logoLingQi, {
        threshold: 0.9,
        region: [24, 5, 117, 46]
    })) {
        console.log('当前位置： 灵器\n运行次数： ' + tick + '\n' + pos)

        if (fristEnterSubMenu) {
            sleep(1000)
            screenImg = images.captureScreen()
            fristEnterSubMenu = false
        }

        // 可以升级
        if (images.findMultiColors(
            screenImg,
            "#ea844d",
            [[-5, 8, "#a9250c"], [5, 8, "#aa2211"]],
            {
                threshold: 0.9,
                region: [1262, 100, 10, 8]
            }
        )) {
            console.log('可以升级')

            if (pos = findImage(screenImg, Assets.wordYiJianShengJi, {
                threshold: 0.9,
                region: [961, 669, 93, 20]
            })) {
                console.log('按下按钮： “一键升级”\n' + pos)

                Util.randomTap(pos.x, pos.y, 93, 20)

                sleep(300)
            }
        }
        else {
            // 退出
            Util.absRandomTap(1177, 17, 1205, 42)
            fristEnterSubMenu = true
            sleep(1000)
        }
    }

    else {
        console.log('当前位置： 无\n运行次数： ' + tick + '\n')
    }

    tick++;
    sleep(500)
}

sh.exit()
