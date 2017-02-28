module.exports = {
    'find answer': (browser) => {
        let link = '//*[@id="app"]/main/div'
        browser.url('http://127.0.0.1:8080/index').maximizeWindow()
        browser.expect.element('body').be.present
        browser.waitForElementVisible(link,16000)
        // browser.click(link)
        browser.pause(5000)
    }
}
