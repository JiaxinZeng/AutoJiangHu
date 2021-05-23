if (!images.requestScreenCapture(false)) {
    toastLog('请求截图失败')
    exit()
}

while(true) {
    let screenImg = images.captureScreen()
    sleep(100)
}
