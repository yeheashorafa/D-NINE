import { test, expect } from '@playwright/test';

test.describe('Carousels', () => {
  test('Hero Slider displays image-only artwork without text overlay in English and Arabic', async ({ page }) => {
    for (const locale of ['en', 'ar']) {
      await page.goto(`/${locale}`);

      const heroSection = page.locator('section[aria-roledescription="carousel"]');
      await expect(heroSection).toBeVisible();

      // Verify no marketing titles or CTA text overlays rendered on hero
      const titles = heroSection.locator('h2');
      await expect(titles).toHaveCount(0);

      // Verify foreground slide image is rendered with object-fit: contain, natural aspect ratio, and localized alt
      const slideImage = heroSection.locator('img').last();
      await expect(slideImage).toBeVisible();
      await expect(slideImage).toHaveCSS('object-fit', 'contain');
      const altText = await slideImage.getAttribute('alt');
      expect(altText).toBeTruthy();
      expect(altText?.length).toBeGreaterThan(0);

      // Verify slide image fits within the hero viewport and does not create horizontal overflow
      const heroBox = await heroSection.boundingBox();
      const imageBox = await slideImage.boundingBox();
      expect(heroBox).toBeTruthy();
      expect(imageBox).toBeTruthy();
      if (heroBox && imageBox) {
        expect(imageBox.width).toBeLessThanOrEqual(heroBox.width + 1);
        expect(imageBox.height).toBeLessThanOrEqual(heroBox.height + 1);
      }

      // Assert no horizontal scroll on page
      const hasNoHorizontalScroll = await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
      );
      expect(hasNoHorizontalScroll).toBe(true);

      // Verify navigation and pause controls exist and are accessible
      const nextBtn = heroSection.locator('.swiper-button-next');
      const prevBtn = heroSection.locator('.swiper-button-prev');
      await expect(nextBtn).toBeVisible();
      await expect(prevBtn).toBeVisible();

      const pauseToggle = heroSection.getByRole('button', { name: /Pause slideshow|Play slideshow|إيقاف التبديل التلقائي|تشغيل التبديل التلقائي/i });
      await expect(pauseToggle).toBeVisible();
    }
  });

  test('Team and Testimonials sections are visible', async ({ page }) => {
    await page.goto('/en');
    
    const teamSection = page.locator('#team');
    await expect(teamSection).toBeVisible();

    const testimonialsSection = page.locator('#testimonials');
    await expect(testimonialsSection).toBeVisible();
  });

  test('Team slider respects keyboard navigation and is loop-safe', async ({ page }) => {
    await page.goto('/en');
    
    const teamSwiper = page.locator('#team .swiper').first();
    await teamSwiper.scrollIntoViewIfNeeded();
    await expect(teamSwiper).toHaveClass(/swiper-initialized/);
    await teamSwiper.focus();
    
    const activeSlideIndex = await teamSwiper.evaluate((el: HTMLElement & { swiper?: { activeIndex: number } }) => el.swiper?.activeIndex ?? 0);
    
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);
    
    const newSlideIndex = await teamSwiper.evaluate((el: HTMLElement & { swiper?: { activeIndex: number } }) => el.swiper?.activeIndex ?? 0);
    expect(newSlideIndex).not.toBe(activeSlideIndex);
  });

  test('RTL/LTR works correctly across viewports', async ({ page }) => {
    // Desktop AR (RTL)
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/ar');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    let teamSwiper = page.locator('#team .swiper').first();
    await teamSwiper.scrollIntoViewIfNeeded();
    await expect(teamSwiper).toHaveClass(/swiper-initialized/);
    await expect(teamSwiper).toHaveAttribute('dir', 'rtl');
    
    // Assert scroll width <= client width (no horizontal scrolling)
    let hasNoHorizontalScroll = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
    expect(hasNoHorizontalScroll).toBe(true);

    // Check desktop slides per view is at least 3
    let activeSlides = teamSwiper.locator('.swiper-slide-visible');
    expect(await activeSlides.count()).toBeGreaterThanOrEqual(3);

    // Navigation usable and semantically advances slide
    const nextButton = page.locator('#team .swiper-button-next').first();
    const prevButton = page.locator('#team .swiper-button-prev').first();
    await expect(nextButton).toBeVisible();
    await expect(nextButton).toBeEnabled();
    await expect(prevButton).toBeVisible();
    await expect(prevButton).toBeEnabled();

    const arInitialIndex = await teamSwiper.evaluate((el: HTMLElement & { swiper?: { activeIndex: number } }) => el.swiper?.activeIndex ?? 0);
    await nextButton.click();
    await page.waitForTimeout(400);
    const arAfterNextIndex = await teamSwiper.evaluate((el: HTMLElement & { swiper?: { activeIndex: number } }) => el.swiper?.activeIndex ?? 0);
    expect(arAfterNextIndex).not.toBe(arInitialIndex);

    await prevButton.click();
    await page.waitForTimeout(400);
    const arAfterPrevIndex = await teamSwiper.evaluate((el: HTMLElement & { swiper?: { activeIndex: number } }) => el.swiper?.activeIndex ?? 0);
    expect(arAfterPrevIndex).not.toBe(arAfterNextIndex);

    // Mobile EN (LTR)
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');

    teamSwiper = page.locator('#team .swiper').first();
    await teamSwiper.scrollIntoViewIfNeeded();
    await expect(teamSwiper).toHaveClass(/swiper-initialized/);
    await expect(teamSwiper).toHaveAttribute('dir', 'ltr');

    hasNoHorizontalScroll = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
    expect(hasNoHorizontalScroll).toBe(true);

    activeSlides = teamSwiper.locator('.swiper-slide-visible');
    // Mobile should show 1 visible slide
    expect(await activeSlides.count()).toBe(1);

    // Tablet EN (LTR)
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');

    teamSwiper = page.locator('#team .swiper').first();
    await teamSwiper.scrollIntoViewIfNeeded();
    await expect(teamSwiper).toHaveClass(/swiper-initialized/);
    await expect(teamSwiper).toHaveAttribute('dir', 'ltr');

    hasNoHorizontalScroll = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
    expect(hasNoHorizontalScroll).toBe(true);

    activeSlides = teamSwiper.locator('.swiper-slide-visible');
    expect(await activeSlides.count()).toBeGreaterThanOrEqual(2);
  });

  test('Testimonials slider hover autoplay pause', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/en');
    
    const testimonialsSwiper = page.locator('#testimonials .swiper').first();
    await testimonialsSwiper.scrollIntoViewIfNeeded();
    await expect(testimonialsSwiper).toHaveClass(/swiper-initialized/);
    
    const initialSlideIndex = await testimonialsSwiper.evaluate((el: HTMLElement & { swiper?: { activeIndex: number } }) => el.swiper?.activeIndex ?? 0);
    
    // Hover inside the container
    await testimonialsSwiper.hover();
    
    // Wait longer than the autoplay delay (5000ms)
    await page.waitForTimeout(5500);
    
    const hoveredSlideIndex = await testimonialsSwiper.evaluate((el: HTMLElement & { swiper?: { activeIndex: number } }) => el.swiper?.activeIndex ?? 0);
    // Assert slide remains unchanged
    expect(hoveredSlideIndex).toBe(initialSlideIndex);
    
    // Remove hover
    await page.mouse.move(0, 0);
    
    // Assert autoplay resumes and active slide changes
    await page.waitForTimeout(5500);
    const resumedSlideIndex = await testimonialsSwiper.evaluate((el: HTMLElement & { swiper?: { activeIndex: number } }) => el.swiper?.activeIndex ?? 0);
    expect(resumedSlideIndex).not.toBe(hoveredSlideIndex);
  });

  test('Testimonials slider focus autoplay pause', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/en');
    
    const testimonialsSwiper = page.locator('#testimonials .swiper').first();
    await testimonialsSwiper.scrollIntoViewIfNeeded();
    await expect(testimonialsSwiper).toHaveClass(/swiper-initialized/);
    
    // 1. Prove autoplay is running before focus
    const startSlideIndex = await testimonialsSwiper.evaluate((el: HTMLElement & { swiper?: { activeIndex: number } }) => el.swiper?.activeIndex ?? 0);
    await page.waitForTimeout(5500);
    const beforeFocusSlideIndex = await testimonialsSwiper.evaluate((el: HTMLElement & { swiper?: { activeIndex: number } }) => el.swiper?.activeIndex ?? 0);
    expect(beforeFocusSlideIndex).not.toBe(startSlideIndex);

    // 2. Focus inside the container (the next button) to trigger focus capture pause
    const nextButton = testimonialsSwiper.locator('.swiper-button-next');
    await nextButton.focus();
    
    // 3. Wait longer than the autoplay delay (5000ms) to prove slide remains unchanged
    await page.waitForTimeout(5500);
    const focusedSlideIndex = await testimonialsSwiper.evaluate((el: HTMLElement & { swiper?: { activeIndex: number } }) => el.swiper?.activeIndex ?? 0);
    expect(focusedSlideIndex).toBe(beforeFocusSlideIndex);

    // 4. Move focus outside to body to resume autoplay
    await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
    await page.locator('body').focus();
    await page.mouse.move(0, 0); // ensure no hover

    // 5. Wait longer than autoplay delay to verify it resumes
    await page.waitForTimeout(6000);
    const resumedSlideIndex = await testimonialsSwiper.evaluate((el: HTMLElement & { swiper?: { activeIndex: number } }) => el.swiper?.activeIndex ?? 0);
    expect(resumedSlideIndex).not.toBe(focusedSlideIndex);
  });

  test('Reduced motion disables Team and Testimonials autoplay and transitions', async ({ page }) => {
    test.setTimeout(30000);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en');

    // Testimonials
    await expect(page.locator('#testimonials')).toBeVisible();
    await page.evaluate(() => document.getElementById('testimonials')?.scrollIntoView());
    
    const testimonialsSwiper = page.locator('#testimonials .swiper').first();
    await expect(testimonialsSwiper).toHaveClass(/swiper-initialized/);
    
    let initialSlideIndex = await testimonialsSwiper.evaluate((el: HTMLElement & { swiper?: { activeIndex: number } }) => el.swiper?.activeIndex ?? 0);
    await page.waitForTimeout(5500);
    let afterWaitSlideIndex = await testimonialsSwiper.evaluate((el: HTMLElement & { swiper?: { activeIndex: number } }) => el.swiper?.activeIndex ?? 0);
    expect(afterWaitSlideIndex).toBe(initialSlideIndex);

    // Team
    await expect(page.locator('#team')).toBeVisible();
    await page.evaluate(() => document.getElementById('team')?.scrollIntoView());
    
    const teamSwiper = page.locator('#team .swiper').first();
    await expect(teamSwiper).toHaveClass(/swiper-initialized/);

    initialSlideIndex = await teamSwiper.evaluate((el: HTMLElement & { swiper?: { activeIndex: number } }) => el.swiper?.activeIndex ?? 0);
    await page.waitForTimeout(5500);
    afterWaitSlideIndex = await teamSwiper.evaluate((el: HTMLElement & { swiper?: { activeIndex: number } }) => el.swiper?.activeIndex ?? 0);
    expect(afterWaitSlideIndex).toBe(initialSlideIndex);
  });

  test('Team CTA/social links are present with correct attributes and routing', async ({ page }) => {
    // EN Check
    await page.goto('/en');
    
    let teamSection = page.locator('#team');
    await expect(teamSection).toBeVisible();

    // Social Links Check
    const activeSlide = teamSection.locator('.swiper-slide-active').first();
    const socialLink = activeSlide.locator('a[aria-label*="Social link"]').first();
    
    await expect(socialLink).toBeVisible();
    await expect(socialLink).toHaveAttribute('href', 'https://linkedin.com/');
    await expect(socialLink).toHaveAttribute('target', '_blank');
    await expect(socialLink).toHaveAttribute('rel', 'noopener noreferrer');

    // CTA Check (EN)
    let cta = teamSection.getByRole('link', { name: 'Meet the Team' });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', '/en/about');
    await cta.click();
    await expect(page).toHaveURL(/\/en\/about\/?$/);
    await expect(page.locator('main')).toBeVisible();

    // AR Check
    await page.goto('/ar');
    
    teamSection = page.locator('#team');
    await expect(teamSection).toBeVisible();

    // CTA Check (AR)
    cta = teamSection.getByRole('link', { name: 'تعرف على الفريق' });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', '/ar/about');
    await cta.click();
    await expect(page).toHaveURL(/\/ar\/about\/?$/);
    await expect(page.locator('main')).toBeVisible();
  });
});
