# Dilux Lane — Developer Portfolio

Personal portfolio for Dilukshan (Dilux): **AI-Native Software Developer · Student · Founder, Zyberlane**.

This is a personalized adaptation of Daniel Kiss’s portfolio source, using the design permission obtained by Dilux. The original visual direction and animation engine are retained. Daniel’s personal content, portrait, projects and award material have been replaced with Dilux’s identity and work.

## Included

- Animated opening, hero-to-sidebar transition, rulers, liquid WebGL effect and mobile menu.
- Shared curved project marquee, pinned horizontal showcase, orbiting journey cards and draggable contact grid.
- Divine Tattoo and Zyberlane case studies.
- Clearly labeled Barter-SL and Zyberlane AI prototypes.
- About/process page explaining the AI-assisted workflow and skill boundaries.
- Contact: **diluxlane@gmail.com**. Email-copy buttons and direct email links.

The prototype diagrams illustrate architecture and scope. They are not screenshots of released products. No private project source, backend credentials or model API keys are included. This portfolio is static and requires no environment variables.

## Local use

Use a current Node version supported by Vite 8 (22.12 or newer).

```sh
npm ci
npm run dev
```

```sh
npm run check
npm run build
npm run preview
```

`dist/` is the deployment output. Vercel configuration is included. Case studies and About are static HTML under `public/`, copied into the build without an extra framework.

## Verification

- Production build passes.
- Content check validates local page/media/font references, anchors, shared-gallery integrity, matching journey cards/captions, email addresses and removal of inherited achievements.
- Original animation and layout source is retained, apart from content strings, project gallery data and the added personalization stylesheet. The longer Zyberlane wordmark is sized to fit its original space.
- Generated project artwork and media exports were inspected; video files were checked with ffprobe.
- Browser, animation and mobile interaction QA could not be completed in the authoring environment. These remain visual-review tasks for the preview. Retaining the animation source does not prove identical behavior on every device.

## Review and production

This version is intended for preview review. Search indexing is disabled in HTML, `robots.txt` and Vercel response headers. No production domain, canonical URL or sitemap is invented.

Before a public launch, review desktop/mobile scrolling, menu open/close and Escape behavior, gallery links, video playback, email copy, contact dragging and scroll-to-top. Confirm all public project claims and links. After a production domain is chosen, update canonical/social URLs, robots settings, response headers and sitemap together.

## Attribution and assets

See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). This adaptation is not presented as Dilux’s original visual design or animation engine. Permission for this adaptation is not a general license for others to reuse the reference.
