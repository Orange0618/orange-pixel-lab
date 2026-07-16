async page => {
  await page.evaluate(() => {
    sessionStorage.clear()
    localStorage.removeItem('orange-pixel-lab-language')
    localStorage.removeItem('orange-pixel-lab-theme')
  })
  await page.reload()
  await page.waitForTimeout(800)

  const heroCopy = page.locator('.hero-copy')
  const heroIsWaiting = await heroCopy.evaluate(element =>
    element.classList.contains('motion-item') && !element.classList.contains('is-visible')
  )
  if (!heroIsWaiting) throw new Error('Hero motion is not held until the access gate unlocks.')

  await page.getByRole('textbox', { name: '准入密码' }).fill('266502')
  await page.getByRole('button', { name: '进入 ↗' }).click()
  await page.waitForTimeout(320)

  const heroState = await heroCopy.evaluate(element => ({
    visible: element.classList.contains('is-visible'),
    active: element.getAnimations().some(animation => animation.playState === 'running')
  }))
  if (!heroState.visible || !heroState.active) {
    throw new Error('Hero entrance motion does not start after the access gate unlocks.')
  }

  await page.waitForTimeout(800)
  const aboutHeading = page.locator('#about .section-heading')
  if (await aboutHeading.evaluate(element => element.classList.contains('is-visible'))) {
    throw new Error('Off-screen section motion played before the section entered the viewport.')
  }

  await aboutHeading.scrollIntoViewIfNeeded()
  await page.waitForTimeout(260)
  if (!await aboutHeading.evaluate(element => element.classList.contains('is-visible'))) {
    throw new Error('Section motion did not play when the section entered the viewport.')
  }

  await page.getByRole('button', { name: '切换为深色模式' }).click()
  const darkPalette = await page.evaluate(() => ({
    enabled: document.body.classList.contains('dark-mode'),
    body: getComputedStyle(document.body).backgroundColor,
    education: getComputedStyle(document.querySelector('.education-card')).backgroundColor,
    skills: getComputedStyle(document.querySelector('.skills-card')).backgroundColor,
    records: getComputedStyle(document.querySelector('.notes-area')).backgroundColor,
    category: getComputedStyle(document.querySelector('.category-card')).backgroundColor
  }))
  const colorLayers = new Set(Object.values(darkPalette).filter(value => typeof value === 'string'))
  if (!darkPalette.enabled || colorLayers.size < 5 || darkPalette.education === darkPalette.skills) {
    throw new Error(`Dark theme has insufficient color hierarchy: ${JSON.stringify(darkPalette)}`)
  }

  await page.getByRole('link', { name: 'DIR / 01 嵌入式 07 条记录 →' }).click()
  await page.getByRole('link', { name: '嵌入式 / MD 电子基础 →' }).click()
  await page.locator('#reader-content h3').first().waitFor()
  const readerCategoryWidth = await page.locator('#reader-category').evaluate(element => element.getBoundingClientRect().width)
  if (readerCategoryWidth <= 10) {
    throw new Error(`Reader category label collapsed to ${readerCategoryWidth}px.`)
  }

  const imageLoadingPolicies = await page.locator('#reader-content img').evaluateAll(images => images.map(image => ({
    loading: image.loading,
    decoding: image.decoding,
    fetchPriority: image.fetchPriority,
    width: image.getAttribute('width'),
    height: image.getAttribute('height')
  })))
  if (imageLoadingPolicies.length < 100) {
    throw new Error(`Expected the image-heavy note fixture, found ${imageLoadingPolicies.length} images.`)
  }
  const [leadImage, ...deferredImages] = imageLoadingPolicies
  if (leadImage.loading !== 'eager' || leadImage.fetchPriority !== 'high') {
    throw new Error(`Lead note image is not prioritized: ${JSON.stringify(leadImage)}`)
  }
  if (deferredImages.some(image => image.loading !== 'lazy' || image.decoding !== 'async')) {
    throw new Error('Below-the-fold note images are not deferred.')
  }
  if (imageLoadingPolicies.some(image => Number(image.width) <= 0 || Number(image.height) <= 0)) {
    throw new Error('Note images do not reserve their intrinsic aspect ratio before loading.')
  }
}
