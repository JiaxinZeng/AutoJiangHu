var Assets = {
    wordZhanLi: images.read(
        files.path('./assets/战力.png')
    ),
    wordShengJie: images.read(
        files.path('./assets/升阶.png')
    ),
    wordJingYanPaoHuan: images.read(
        files.path('./assets/经验跑环.png')
    ),
    buttonJiaoRenWu: images.read(
        files.path('./assets/交任务.png')
    ),
    buttonChuanShang: images.read(
        files.path('./assets/穿上.png')
    ),
    buttonJingRuYouXi: images.read(
        files.path('./assets/进入游戏.png')
    ),
    buttonShengJie: images.read(
        files.path('./assets/升阶按钮.png')
    ),
    buttonShengJie2: images.read(
        files.path('./assets/升阶按钮2.png')
    ),
    buttonShengJie3: images.read(
        files.path('./assets/升阶按钮3.png')
    ),
    buttonNoName: images.read(
        files.path('./assets/按钮.png')
    ),
    logoJinJie: images.read(
        files.path('./assets/进阶.png')
    ),
    logoShouChongHaoLi: images.read(
        files.path('./assets/首充豪礼.png')
    ),
    logoJueXing: images.read(
        files.path('./assets/觉醒.png')
    ),
    logoXinXiangMuJieSuo: images.read(
        files.path('./assets/新项目解锁.png')
    ),
    logoQiangHua: images.read(
        files.path('./assets/强化.png')
    ),
    charInGameStartGame: images.read(
        files.path('./assets/游戏中开始游戏特征.png')
    ),
    charNewItemUnlock: images.read(
        files.path('./assets/新项目解锁.png')
    ),
    charMap: images.read(
        files.path('./assets/地图特征.png')
    )
}

for (let key in Assets) {
    if (!Assets[key]) {
        toastLog("资源加载失败")
        exit()
    }
}

events.on('exit', () => {
    for (let key in Assets) {
        Assets[key].recycle()
    }
})

console.log('资源加载完成')

module.exports = Assets