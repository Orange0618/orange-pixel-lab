async page => {
  await page.evaluate(() => {
    sessionStorage.clear()
    localStorage.removeItem('orange-pixel-lab-language')
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
}
