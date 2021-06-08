var Assets = require('asset.js')
var Util = require('util.js')

if (!$settings.isEnabled('foreground_service')) {
    $settings.setEnabled('foreground_service', true)
}

if (!requestScreenCapture(false)) {
    toastLog('请求截图失败')
    exit()
}

sleep(2000)

let running = true

// 运行次数
let tick = 0

let lastEquipTime = 0

let lastMissionTime = 0

// 首次进入子菜单
let fristEnterSubMenu = true

// 首次进入经验副本
let fristEnterExpLevel = true

// 首次打开鼓舞面板
let fristOpenGuWuMenu = true

// 首次打开效率面板
let fristOpenXiaoLvMenu = true

let pressGuWuBtnTimes = 0

let pressShiYongBtnTimes = 0

while (running) {
    let screenImg = captureScreen()

    let pos

    let match

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

    // 穿上装备弹窗
    if (pos = findImage(screenImg, Assets.buttonChuanShang, {
        threshold: 0.9,
        region: [867, 383, 111, 38]
    })) {
        console.log('按下按钮： 穿上\n' + pos)
        Util.randomTap(pos.x, pos.y, 30, 18)

        lastEquipTime = 0
    }

    // 地图弹窗
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

    // 日常活动任务弹窗
    if (pos = findImage(screenImg, Assets.wordQianWang, {
        threshold: 0.9,
        region: [610, 560, 44, 22]
    })) {
        console.log('按下按钮： 前往')
        Util.randomTap(610, 560, 44, 22)
        sleep(1000)
        continue
    }

    // 首充弹窗2
    if (pos = findImage(screenImg, Assets.buttonNoName2, {
        threshold: 0.9,
        region: [1136, 191, 14, 14]
    })) {
        console.log('按下按钮： 首充弹窗2关闭按钮' + pos)
        Util.randomTap(pos.x, pos.y, 14, 14)

        sleep(1000)

        continue
    }

    // 鼓舞弹窗
    if (pos = findImage(screenImg, Assets.wordGuWu3, {
        threshold: 0.9,
        region: [501, 377, 48, 22]
    })) {
        console.log('遭遇鼓舞弹窗')

        if (pressGuWuBtnTimes++ < 5) {
            Util.randomTap(500, 376, 50, 24)
            Util.randomTap(732, 376, 50, 24)
            sleep(1000)
            continue
        }
        else {
            fristOpenGuWuMenu = false
            Util.randomTap(837, 153, 18, 18)
            sleep(2000)
            continue
        }
    }

    // 效率弹窗
    if (pos = findImage(screenImg, Assets.wordJingYan, {
        threshold: 0.9,
        region: [527, 255, 45, 20]
    })) {
        console.log('遭遇效率弹窗')

        if (pos = findImage(screenImg, Assets.wordGouMai, {
            threshold: 0.9,
            region: [764, 253, 48, 23]
        })) {
            fristOpenXiaoLvMenu = false;
            Util.randomTap(837, 137, 18, 18)
            sleep(2000)
            continue
        }

        if (pressShiYongBtnTimes++ < 2) {
            Util.randomTap(763, 253, 49, 22)
            sleep(1000)
            continue
        }
        else {
            fristOpenXiaoLvMenu = false;
            Util.randomTap(837, 137, 18, 18)
            sleep(2000)
            continue
        }
    }

    // 通过战力字样判断是否在主界面
    if (pos = findImage(screenImg, Assets.wordZhanLi, {
        threshold: 0.9,
        region: [101, 7, 51, 27]
    })) {
        fristEnterSubMenu = true

        // 经验副本
        if (
            (pos = findImage(
                screenImg,
                Assets.wordGuWu,
                {
                    threshold: 0.9,
                    region: [91, 343, 44, 21]
                }
            )) ||
            (pos = findImage(screenImg,
                Assets.wordGuWu2,
                {
                    threshold: 0.9,
                    region: [91, 334, 44, 21]
                }
            ))
        ) {
            console.log('当前位置： 经验副本\n运行次数： ' + tick + '\n' + pos)

            if (fristEnterExpLevel) {

                if (fristOpenGuWuMenu) {
                    pressGuWuBtnTimes = 0
                    Util.randomTap(pos.x, pos.y, 44, 21)
                    sleep(2000)
                    continue
                }
                else if (fristOpenXiaoLvMenu) {
                    pos = findImage(screenImg, Assets.wordTiGaoXiaoLv, {
                        threshold: 0.9,
                        region: [229, 334, 45, 21]
                    })

                    if (!pos) {
                        pos = findImage(screenImg, Assets.wordTiGaoXiaoLv2, {
                            threshold: 0.9,
                            region: [229, 343, 45, 21]
                        })
                    }

                    if (pos) {
                        pressShiYongBtnTimes = 0
                        Util.randomTap(pos.x, pos.y, 45, 21)
                    }
                    sleep(2000)
                    continue
                }
                else
                    fristEnterExpLevel = false
            }
        }
        else {
            console.log('当前位置： 主界面\n运行次数： ' + tick + '\n' + pos)

            fristEnterExpLevel = true

            // 主界面上有“交任务”按钮
            if (match = images.matchTemplate(screenImg, Assets.buttonJiaoRenWu, {
                max: 1,
                threshold: 0.9,
                region: [157, 570, 82, 27]
            }).best()) {
                console.log('按下按钮： 交任务\n' + match)
                lastMissionTime = 0
                Util.randomTap(match.point.x + 10, match.point.y + 10, 62, 7)
            }

            if (lastMissionTime++ > 5) {
                lastMissionTime = 0
                Util.randomTap(88, 156, 107, 38)
            }
        }

        if (lastEquipTime++ > 5)
            Util.randomTap(378, 573, 30, 30)
    }

    // 通过"进阶"图标判断是否在进阶界面
    else if (pos = images.findImage(screenImg, Assets.logoJinJie, {
        threshold: 0.9,
        region: [18, 0, 180, 64]
    })) {
        if (fristEnterSubMenu) {
            sleep(1000)
            screenImg = images.captureScreen()
            fristEnterSubMenu = false
        }

        // 坐骑进阶
        if (pos = findImage(screenImg, Assets.charItemActive, {
            threshold: 0.9,
            region: [1113, 110, 22, 38]
        })) {
            console.log('当前位置： 坐骑进阶\n运行次数： ' + tick + '\n' + pos)

            // 坐骑可以进阶
            if (pos = images.findMultiColors(
                screenImg,
                "#ea824d",
                [[-4, 7, "#ac290f"], [3, 8, "#b4280f"]],
                {
                    threshold: 0.9,
                    region: [1267, 92, 7, 8]
                }
            )) {
                console.log('可以进阶')

                if (pos = findImage(screenImg, Assets.wordYiJianShengJie, {
                    threshold: 0.9,
                    region: [951, 661, 93, 21]
                })) {
                    console.log('按下按钮： 一建升阶\n' + pos)

                    Util.randomTap(pos.x, pos.y, 93, 21)

                    sleep(300)
                }

            }
            else {
                // 退出
                Util.absRandomTap(1177, 17, 1205, 42)
                sleep(1000)
            }
        }

        // 翅膀进阶
        else if (pos = findImage(screenImg, Assets.charItemActive, {
            threshold: 0.9,
            region: [1113, 187, 22, 38]
        })) {
            console.log('当前位置： 翅膀进阶\n运行次数： ' + tick + '\n' + pos)

            // 翅膀可以进阶
            if (pos = images.findMultiColors(
                screenImg,
                "#e9814c",
                [[-4, 8, "#a42007"], [2, 6, "#b73b19"]],
                {
                    threshold: 0.9,
                    region: [1267, 169, 6, 8]
                }
            )) {
                console.log('可以进阶')

                if (pos = findImage(screenImg, Assets.wordYiJianShengJie, {
                    threshold: 0.9,
                    region: [952, 661, 93, 21]
                })) {
                    console.log('按下按钮： 一建升阶\n' + pos)

                    Util.randomTap(pos.x, pos.y, 93, 21)

                    sleep(300)
                }
            }
            else {
                // 退出
                Util.absRandomTap(1177, 17, 1205, 42)
                sleep(1000)
            }
        }

        // 宠物进阶
        else if (pos = findImage(screenImg, Assets.charItemActive, {
            threshold: 0.9,
            region: [1113, 264, 22, 38]
        })) {
            console.log('当前位置： 宠物进阶\n运行次数： ' + tick + '\n' + pos)

            // 宠物可以进阶
            if (pos = images.findMultiColors(
                screenImg,
                "#e87f4b",
                [[-5, 8, "#a01c04"], [3, 8, "#b3250d"]],
                {
                    threshold: 0.9,
                    region: [1266, 246, 8, 8]
                }
            )) {
                console.log('可以进阶')

                if (pos = findImage(screenImg, Assets.wordYiJianShengJie, {
                    threshold: 0.9,
                    region: [952, 661, 93, 21]
                })) {
                    console.log('按下按钮： 一建升阶\n' + pos)

                    Util.randomTap(pos.x, pos.y, 93, 21)

                    sleep(300)
                }
            }
            else {
                // 退出
                Util.absRandomTap(1177, 17, 1205, 42)
                sleep(1000)
            }
        }

        else {
            console.log('当前位置： 未知进阶\n运行次数： ' + tick)

            // 退出
            Util.absRandomTap(1177, 17, 1205, 42)
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
            sleep(1000)
        }
    }

    // 通过“强化”图标判断是否在强化界面
    else if (pos = findImage(screenImg, Assets.logoQiangHua, {
        threshold: 0.9,
        region: [24, 4, 114, 47]
    })) {
        if (fristEnterSubMenu) {
            sleep(1000)
            screenImg = images.captureScreen()
            fristEnterSubMenu = false
        }

        // 装备强化
        if (pos = findImage(screenImg, Assets.charItemActive, {
            threshold: 0.9,
            region: [1113, 110, 22, 38]
        })) {
            console.log('当前位置： 装备强化\n运行次数： ' + tick + '\n' + pos)

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
                sleep(1000)
            }
        }

        // 宝石镶嵌
        else if (pos = findImage(screenImg, Assets.charItemActive, {
            threshold: 0.9,
            region: [1113, 187, 22, 38]
        })) {
            console.log('当前位置： 宝石镶嵌\n运行次数： ' + tick + '\n' + pos)

            // 可以镶嵌或合成
            if (pos = findImage(screenImg, Assets.charRedPoint, {
                threshold: 0.9,
                region: [1066, 163, 22, 557]
            })) {
                console.log('按下按钮： “镶嵌”或“合成”\n' + pos)

                Util.randomTap(pos.x - 69, pos.y + 6, 47, 23)
            }
            else if (pos = findImage(screenImg, Assets.charArrowUp2, {
                threshold: 0.9,
                region: [89, 94, 142, 626]
            })) {
                console.log('按下按钮： “绿色箭头”\n' + pos)

                Util.randomTap(pos.x, pos.y, 8, 11)
            }
            else {
                // 退出
                Util.absRandomTap(1177, 17, 1205, 42)
                sleep(1000)
            }
            sleep(300)
        }

        else {
            console.log('当前位置： 未知进阶\n运行次数： ' + tick)

            // 退出
            Util.absRandomTap(1177, 17, 1205, 42)
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

            if (pos = findImage(screenImg, Assets.charRedPoint, {
                threshold: 0.9,
                region: [486, 611, 230, 71]
            })) {
                console.log('使用天石\n' + pos)

                Util.randomTap(pos.x, pos.y, 10, 10)

                sleep(300)
            }
            else if (pos = findImage(screenImg, Assets.wordYiJianShengJi, {
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
            sleep(1000)
        }
    }

    // 通过“背包”图标判断是否在背包界面
    else if (pos = findImage(screenImg, Assets.logoBeiBao, {
        threshold: 0.9,
        region: [21, 8, 116, 40]
    })) {
        console.log('当前位置： 背包\n运行次数： ' + tick + '\n' + pos)

        // 退出
        Util.absRandomTap(1177, 17, 1205, 42)
        sleep(1000)
    }

    // 通过“经脉”图标判断是否在经脉界面
    else if (pos = findImage(screenImg, Assets.logoJingMai, {
        threshold: 0.9,
        region: [25, 5, 116, 44]
    })) {
        console.log('当前位置： 经脉\n运行次数： ' + tick + '\n' + pos)

        if (fristEnterSubMenu) {
            sleep(1000)
            screenImg = images.captureScreen()
            fristEnterSubMenu = false
        }

        // 可以通脉
        if (pos = images.findMultiColors(
            screenImg,
            "#e77d4a",
            [[-5, 7, "#a62209"], [3, 8, "#b1230b"]],
            {
                threshold: 0.9,
                region: [1256, 562, 8, 8]
            }
        )) {
            console.log('可以通脉')

            if (pos = findImage(screenImg, Assets.wordTongMai, {
                threshold: 0.9,
                region: [817, 645, 45, 20]
            })) {
                console.log('按下按钮： 通脉\n' + pos)

                Util.randomTap(pos.x, pos.y, 45, 20)

                sleep(300)
            }
        }
        else {
            // 退出
            Util.absRandomTap(1177, 17, 1205, 42)
            sleep(1000)
        }
    }

    // 通过“兵器谱”图标判断是否在兵器界面
    else if (pos = findImage(screenImg, Assets.logoBingQiPu, {
        threshold: 0.9,
        region: [20, 6, 155, 43]
    })) {
        console.log('当前位置： 兵器\n运行次数： ' + tick + '\n' + pos)

        if (fristEnterSubMenu) {
            sleep(1000)
            screenImg = images.captureScreen()
            fristEnterSubMenu = false
        }

        // 可以激活
        if (pos = images.findMultiColors(
            screenImg,
            "#e27645",
            [[-3, 5, "#b33515"], [1, 8, "#a71d05"]],
            {
                threshold: 0.9,
                region: [1258, 486, 4, 8]
            }
        )) {
            console.log('可以激活')

            if (pos = findImage(screenImg, Assets.wordJiHuo, {
                threshold: 0.9,
                region: [931, 647, 54, 26]
            })) {
                console.log('按下按钮： 激活\n' + pos)

                Util.randomTap(pos.x, pos.y, 54, 26)

                sleep(300)
            }
        }
        else {
            // 退出
            Util.absRandomTap(1177, 17, 1205, 42)
            sleep(1000)
        }
    }

    // 通过“副本”图标判断是否在副本界面
    else if (pos = findImage(screenImg, Assets.logoFuBen, {
        threshold: 0.9,
        region: [22, 5, 116, 45]
    })) {
        console.log('当前位置： 副本\n运行次数： ' + tick + '\n' + pos)

        Util.randomTap(841, 606, 56, 23)
    }

    else {
        console.log('当前位置： 无\n运行次数： ' + tick + '\n')
    }

    tick++;
    sleep(500)
}

sh.exit()
