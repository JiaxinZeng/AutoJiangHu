var Assets = {
    wordZhanLi: images.read(
        files.path('./assets/战力.png')
    ),
    wordShengJie: images.read(
        files.path('./assets/升阶.png')
    ),
    wordDianJiJiHuo:images.read(
        files.path('./assets/点击激活.png')
    ),
    wordJingYanPaoHuan: images.read(
        files.path('./assets/经验跑环.png')
    ),
    wordZiDongQiangHua: images.read(
        files.path('./assets/自动强化.png')
    ),
    wordQiangHua: images.read(
        files.path('./assets/强化2.png')
    ),
    wordLingQu: images.read(
        files.path('./assets/领取.png')
    ),
    wordYiJianShengJi: images.read(
        files.path('./assets/一键升级.png')
    ),
    wordTongMai: images.read(
        files.path('./assets/通脉.png')
    ),
    wordJiHuo: images.read(
        files.path('./assets/激活.png')
    ),
    wordYiJianShengJie: images.read(
        files.path('./assets/一键升阶.png')
    ),
    wordQianWang: images.read(
        files.path('./assets/前往.png')
    ),
    wordGuWu: images.read(
        files.path('./assets/鼓舞.png')
    ),
    wordGuWu2: images.read(
        files.path('./assets/鼓舞2.png')
    ),
    wordGuWu3: images.read(
        files.path('./assets/鼓舞3.png')
    ),
    wordJingYan: images.read(
        files.path('./assets/经验.png')
    ),
    wordTiGaoXiaoLv: images.read(
        files.path('./assets/效率.png')
    ),
    wordTiGaoXiaoLv2: images.read(
        files.path('./assets/效率2.png')
    ),
    wordGouMai: images.read(
        files.path('./assets/购买.png')
    ),
    buttonJiaoRenWu: images.read(
        files.path('./assets/交任务.png')
    ),
    buttonChuanShang: images.read(
        files.path('./assets/穿上.png')
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
    buttonNoName2: images.read(
        files.path('./assets/按钮2.png')
    ),
    buttonNoName3: images.read(
        files.path('./assets/按钮3.png')
    ),
    logoJinJie: images.read(
        files.path('./assets/进阶.png')
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
    logoChengJiu: images.read(
        files.path('./assets/成就.png')
    ),
    logoLingQi: images.read(
        files.path('./assets/灵器.png')
    ),
    logoBeiBao: images.read(
        files.path('./assets/背包.png')
    ),
    logoJingMai: images.read(
        files.path('./assets/经脉.png')
    ),
    logoBingQiPu: images.read(
        files.path('./assets/兵器谱.png')
    ),
    logoFuBen: images.read(
        files.path('./assets/副本.png')
    ),
    charInGameStartGame: images.read(
        files.path('./assets/游戏中开始游戏特征.png')
    ),
    charNewItemUnlock: images.read(
        files.path('./assets/新项目解锁.png')
    ),
    charMap: images.read(
        files.path('./assets/地图特征.png')
    ),
    charRedPoint: images.read(
        files.path('./assets/红点.png')
    ),
    charArrowUp: images.read(
        files.path('./assets/箭头上.png')
    ),
    charArrowUp2: images.read(
        files.path('./assets/箭头上2.png')
    ),
    charItemActive: images.read(
        files.path('./assets/项目激活箭头.png')
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
