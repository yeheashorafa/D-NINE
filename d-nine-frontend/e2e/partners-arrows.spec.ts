import { test, expect } from '@playwright/test';

test.describe('Partners Carousel and Navigation arrows validation', () => {
  const viewports = [
    { name: 'Mobile', width: 375, height: 812 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1280, height: 720 },
  ];

  const pagesToTest = [
    { path: '/ar', name: 'Home AR', isRtl: true },
    { path: '/en', name: 'Home EN', isRtl: false },
    { path: '/ar/about', name: 'About AR', isRtl: true },
    { path: '/en/about', name: 'About EN', isRtl: false },
  ];

  for (const vp of viewports) {
    for (const p of pagesToTest) {
      test(`Navigation arrows bounding box, elementFromPoint and no-overflow on ${p.name} [${vp.name} ${vp.width}x${vp.height}]`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(p.path);

        // Verify document has no horizontal overflow
        const noHorizontalScroll = await page.evaluate(
          () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
        );
        expect(noHorizontalScroll).toBe(true);

        // Find all visible carousel navigation buttons on the page
        const navButtons = page.locator('.swiper-button-prev:visible, .swiper-button-next:visible');
        const count = await navButtons.count();

        if (p.path === '/ar' || p.path === '/en') {
          // Home page strictly contains navigation arrows for Testimonials
          expect(count).toBeGreaterThan(0);
        }

        for (let i = 0; i < count; i++) {
          const arrow = navButtons.nth(i);

          // Scroll button into center of view to ensure it is not obscured by fixed headers/footers
          const rect = await arrow.evaluate((el) => {
            el.scrollIntoView({ block: 'center', inline: 'center' });
            const r = el.getBoundingClientRect();
            return {
              x: r.x,
              y: r.y,
              width: r.width,
              height: r.height,
              top: r.top,
              bottom: r.bottom,
              left: r.left,
              right: r.right,
            };
          });
          expect(rect).toBeTruthy();

          if (rect) {
            // Horizontal bounds within viewport
            expect(rect.left).toBeGreaterThanOrEqual(0);
            expect(rect.right).toBeLessThanOrEqual(vp.width + 1); // 1px rounding tolerance

            // Vertical bounds within viewport after scrollIntoView
            expect(rect.top).toBeGreaterThanOrEqual(0);
            expect(rect.bottom).toBeLessThanOrEqual(vp.height + 1);

            // Accessible touch target (min 44x44px standard)
            expect(rect.width).toBeGreaterThanOrEqual(44);
            expect(rect.height).toBeGreaterThanOrEqual(44);

            // Verify elementFromPoint ensures button is not obscured or covered
            const isClickable = await page.evaluate(
              ({ cx, cy }) => {
                const el = document.elementFromPoint(cx, cy);
                return el !== null && (el.closest('.swiper-button-prev') !== null || el.closest('.swiper-button-next') !== null);
              },
              { cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2 }
            );
            expect(isClickable).toBe(true);
          }
        }
      });
    }
  }

  test('Explicit section carousel arrows advance active slide on Next and Previous (RTL & LTR)', async ({ page }) => {
    // 1. Test Testimonials Carousel on /ar (RTL)
    await page.goto('/ar');
    const testimonialsSection = page.locator('#testimonials');
    await expect(testimonialsSection).toBeVisible();
    await testimonialsSection.scrollIntoViewIfNeeded();

    const testNextBtn = testimonialsSection.locator('.swiper-button-next:visible').first();
    const testPrevBtn = testimonialsSection.locator('.swiper-button-prev:visible').first();
    await expect(testNextBtn).toBeVisible();
    await expect(testPrevBtn).toBeVisible();

    const getTestimonialsIndex = async () => {
      return await testimonialsSection.locator('.swiper').first().evaluate((el: HTMLElement & { swiper?: { activeIndex: number } }) => el.swiper?.activeIndex ?? 0);
    };
    const initialActive = await getTestimonialsIndex();
    await testNextBtn.click();
    await page.waitForTimeout(400);
    const afterNextActive = await getTestimonialsIndex();
    expect(afterNextActive).not.toBe(initialActive);

    await testPrevBtn.click();
    await page.waitForTimeout(400);
    const afterPrevActive = await getTestimonialsIndex();
    expect(afterPrevActive).toBe(initialActive);

    // 2. Test Team Carousel on /en/about (LTR) at Mobile viewport where slidesPerView=1
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/en/about');
    const teamSection = page.locator('#team');
    await expect(teamSection).toBeVisible();
    await teamSection.scrollIntoViewIfNeeded();

    const teamNextBtn = teamSection.locator('.swiper-button-next:visible').first();
    const teamPrevBtn = teamSection.locator('.swiper-button-prev:visible').first();
    await expect(teamNextBtn).toBeVisible();
    await expect(teamPrevBtn).toBeVisible();

    const getTeamIndex = async () => {
      return await teamSection.locator('.swiper').first().evaluate((el: HTMLElement & { swiper?: { activeIndex: number } }) => el.swiper?.activeIndex ?? 0);
    };
    const teamInitial = await getTeamIndex();
    await teamNextBtn.click();
    await page.waitForTimeout(400);
    const teamAfterNext = await getTeamIndex();
    expect(teamAfterNext).not.toBe(teamInitial);
  });

  test('Check each carousel section explicitly (#hero, #testimonials, #team)', async ({ page }) => {
    // 1. #hero on Home
    await page.goto('/ar');
    const heroSection = page.locator('section[aria-roledescription="carousel"]');
    await expect(heroSection).toBeVisible();
    const heroToggle = heroSection.getByRole('button', { name: /Pause slideshow|Play slideshow|إيقاف التبديل التلقائي|تشغيل التبديل التلقائي/i });
    await expect(heroToggle).toBeVisible();

    // 2. #testimonials on Home has 2 navigation arrows
    const testimonialsArrows = page.locator('#testimonials .swiper-button-prev:visible, #testimonials .swiper-button-next:visible');
    await expect(testimonialsArrows).toHaveCount(2);

    // 3. #team on About has 2 navigation arrows on mobile (where slidesPerView=1 and items=2)
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/ar/about');
    const teamArrows = page.locator('#team .swiper-button-prev:visible, #team .swiper-button-next:visible');
    await expect(teamArrows).toHaveCount(2);
  });

  test('Partners Section on Real Application — verifies published partner logo in white circle with object-fit contain, no name text, and no links/CTAs', async ({ page }) => {
    // 1. Visit Arabic Home Route at Mobile 375x812
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/ar');

    const partnersSectionAr = page.locator('#partners');
    await expect(partnersSectionAr).toBeVisible();

    // Verify exactly published partners are rendered (no fake duplicates)
    const slidesAr = partnersSectionAr.locator('.swiper-slide');
    const slideCount = await slidesAr.count();
    expect(slideCount).toBe(3);

    // Verify ZERO links (<a>) and ZERO CTA buttons inside partner cards
    await expect(partnersSectionAr.locator('.swiper-slide a')).toHaveCount(0);
    await expect(partnersSectionAr.locator('.swiper-slide button')).toHaveCount(0);

    // Verify images have object-fit: contain and non-empty alt
    const images = partnersSectionAr.locator('.swiper-slide img');
    const imageCount = await images.count();
    expect(imageCount).toBe(3);

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();
      await expect(img).toHaveCSS('object-fit', 'contain');
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt?.length).toBeGreaterThan(0);
    }

    // Verify circular container styles and no visual text inside card
    const circularCardAr = partnersSectionAr.locator('.rounded-full.aspect-square').first();
    await expect(circularCardAr).toBeVisible();
    await expect(circularCardAr).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(circularCardAr).toHaveCSS('border-radius', '9999px');
    await expect(circularCardAr).toHaveCSS('overflow', 'hidden');

    // Partner name is not visually present anywhere inside slide
    await expect(partnersSectionAr.locator('.swiper-slide span')).toHaveCount(0);

    // On Mobile 375px: 3 partners > 2 visible slides, so navigation is possible and arrows are visible
    const mobileArrows = partnersSectionAr.locator('.swiper-button-prev:visible, .swiper-button-next:visible');
    await expect(mobileArrows).toHaveCount(2);
    const mobileArrowBox = await mobileArrows.first().boundingBox();
    expect(mobileArrowBox).toBeTruthy();
    if (mobileArrowBox) {
      expect(mobileArrowBox.x).toBeGreaterThanOrEqual(0);
      expect(mobileArrowBox.x + mobileArrowBox.width).toBeLessThanOrEqual(375 + 1);
      expect(mobileArrowBox.width).toBeGreaterThanOrEqual(44);
      expect(mobileArrowBox.height).toBeGreaterThanOrEqual(44);
    }

    // 2. Switch to Desktop 1280x720 on /ar:
    // With 3 partners <= 5 visible slides, all items fit on screen without sliding;
    // navigation is locked, so useless arrows must be hidden
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(300);
    const desktopArrows = partnersSectionAr.locator('.swiper-button-prev:visible, .swiper-button-next:visible');
    await expect(desktopArrows).toHaveCount(0);

    // 3. Visit English Home Route at Desktop 1280x720
    await page.goto('/en');
    const partnersSectionEn = page.locator('#partners');
    await expect(partnersSectionEn).toBeVisible();
    const slidesEn = partnersSectionEn.locator('.swiper-slide');
    expect(await slidesEn.count()).toBe(3);

    // Verify zero links, zero buttons, and zero visual name spans on /en
    await expect(partnersSectionEn.locator('.swiper-slide a')).toHaveCount(0);
    await expect(partnersSectionEn.locator('.swiper-slide button')).toHaveCount(0);
    await expect(partnersSectionEn.locator('.swiper-slide span')).toHaveCount(0);

    const circularCardEn = partnersSectionEn.locator('.rounded-full.aspect-square').first();
    await expect(circularCardEn).toBeVisible();
    await expect(circularCardEn).toHaveCSS('background-color', 'rgb(255, 255, 255)');

    // Ensure no horizontal overflow
    const noHorizontalScroll = await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
    );
    expect(noHorizontalScroll).toBe(true);
  });

  test('Testimonials Carousel Autoplay verification on real carousel — activeIndex advances, pauses on hover/focus, resumes on leave/blur, handles interaction and reducedMotion', async ({ page }) => {
    test.setTimeout(60000);

    // 1. Test reduced motion keeps activeIndex static
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/ar');
    await page.waitForLoadState('domcontentloaded');

    const testimonialsRM = page.locator('#testimonials');
    await expect(testimonialsRM).toBeVisible();

    const getRMIndex = async () => {
      const activeSlide = testimonialsRM.locator('.swiper-slide-active').first();
      return (await activeSlide.getAttribute('data-swiper-slide-index')) || '0';
    };

    const initialRMIdx = await getRMIndex();
    await page.waitForTimeout(5500);
    const afterRMIdx = await getRMIndex();
    expect(afterRMIdx).toBe(initialRMIdx); // reduced motion must keep slide static

    // 2. Normal motion testing
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/ar');
    await page.waitForLoadState('domcontentloaded');

    const testimonials = page.locator('#testimonials');
    await expect(testimonials).toBeVisible();

    const getActiveSlideIndex = async () => {
      const activeSlide = testimonials.locator('.swiper-slide-active').first();
      return (await activeSlide.getAttribute('data-swiper-slide-index')) || '0';
    };

    const initialIdx = await getActiveSlideIndex();

    // 2a. activeIndex changes after more than 5000ms using expect.poll
    await expect.poll(async () => {
      return await getActiveSlideIndex();
    }, { timeout: 8000, intervals: [500] }).not.toBe(initialIdx);

    // 2b. Hover pauses autoplay (remains unchanged after 5500ms)
    await testimonials.hover();
    const hoverPausedIdx = await getActiveSlideIndex();
    await page.waitForTimeout(5500);
    const stillHoverPausedIdx = await getActiveSlideIndex();
    expect(stillHoverPausedIdx).toBe(hoverPausedIdx);

    // 2c. Mouseleave resumes autoplay (poll until advances)
    await page.mouse.move(0, 0);
    await expect.poll(async () => {
      return await getActiveSlideIndex();
    }, { timeout: 8000, intervals: [500] }).not.toBe(stillHoverPausedIdx);

    // 2d. Focus on arrow button pauses autoplay
    const nextBtn = testimonials.locator('.swiper-button-next:visible').first();
    await nextBtn.focus();
    await page.waitForTimeout(100);
    const focusPausedIdx = await getActiveSlideIndex();
    await page.waitForTimeout(5500);
    const stillFocusPausedIdx = await getActiveSlideIndex();
    expect(stillFocusPausedIdx).toBe(focusPausedIdx);

    // 2e. Mouseleave while focus remains does NOT resume
    await page.mouse.move(0, 0);
    await page.waitForTimeout(5500);
    const stillFocusWithoutHoverIdx = await getActiveSlideIndex();
    expect(stillFocusWithoutHoverIdx).toBe(focusPausedIdx);

    // 2f. Blur resumes autoplay (poll until advances)
    await nextBtn.blur();
    await expect.poll(async () => {
      return await getActiveSlideIndex();
    }, { timeout: 8000, intervals: [500] }).not.toBe(stillFocusWithoutHoverIdx);

    // 2g. Arrow click and while hovering does not resume upon 4000ms expiration
    await testimonials.hover();
    const prevBtn = testimonials.locator('.swiper-button-prev:visible').first();
    await prevBtn.click();
    await page.waitForTimeout(500);
    const postClickIdx = await getActiveSlideIndex();
    // Wait past 4000ms interaction timer (hover is still active, so must remain paused)
    await page.waitForTimeout(4500);
    const postClickHoverIdx = await getActiveSlideIndex();
    expect(postClickHoverIdx).toBe(postClickIdx);
  });
});
