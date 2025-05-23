const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        console.log('Запуск тестов...');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`file://${path.join(__dirname, '../index.html')}`);
        
        console.log('Тест 1: Проверка позиционирования попапа');
        await page.click('.btn');
        
        const buttonTop = await page.evaluate(() => {
            return document.querySelector('.btn').getBoundingClientRect().top;
        });
        const popoverBottom = await page.evaluate(() => {
            return document.querySelector('.popover').getBoundingClientRect().bottom;
        });
        
        if (buttonTop - popoverBottom === 5) {
            console.log('✓ Попап на 5px выше кнопки');
        } else {
            console.error(`✗ Ожидалось 5px, получено ${buttonTop - popoverBottom}px`);
        }
        
        const buttonCenter = await page.evaluate(() => {
            const btn = document.querySelector('.btn');
            const rect = btn.getBoundingClientRect();
            return rect.left + rect.width / 2;
        });
        const popoverCenter = await page.evaluate(() => {
            const popover = document.querySelector('.popover');
            const rect = popover.getBoundingClientRect();
            return rect.left + rect.width / 2;
        });
        
        if (Math.abs(buttonCenter - popoverCenter) < 1) {
            console.log('✓ Попап центрирован по горизонтали');
        } else {
            console.error('✗ Попап не центрирован');
        }
        
        await browser.close();
        console.log('Тестирование завершено');
    } catch (error) {
        console.error('Ошибка тестирования:', error);
        process.exit(1);
    }
})();