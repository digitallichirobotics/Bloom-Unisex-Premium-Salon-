# BLOOM Unisex Premium Salon — Website (Next.js)

Premium responsive website themed around BLOOM's real reception and gallery photos.

## Run locally
- Node.js 20 or newer
- `npm install`
- `npm run dev`
- Open http://localhost:3000

## Features
- Hero banner using the original BLOOM salon photo
- Optional local MP4 hero video support, with photo fallback
- Services for hair, keratin, straightening, skin, makeup, grooming, and academy enquiries
- Gallery using image crops from the salon-photo screenshot supplied in chat
- Featured Facebook Reel embed attempted **only after user clicks Play**, plus a reliable link to the original Reel
- Instagram link to @bloomunisex.salon
- Responsive navigation, FAQ, and appointment-request form

## Important: media quality and social embeds
The gallery images are **cropped previews from the user's screenshot**, not original full-resolution photos. Replace them with the original photo assets when available (`public/images/`). A screenshot of an Instagram page is not itself a video.

Facebook may prevent playback on some browsers, accounts, or non-public Reels. A `WATCH ON FACEBOOK` link is provided as fallback. No Facebook video has been downloaded or bundled in this project.

To use a high-quality autoplay hero video, put an MP4 at `public/videos/bloom-tour.mp4` and set `heroVideo: "/videos/bloom-tour.mp4"` in `config/salon.ts`. On devices with reduced motion enabled, the photo hero is used instead.

## Verify before publishing
- The contact phone `+91 73279 25333` and general address were transcribed from the salon's Instagram screenshot. Verify both before launch: another public business listing shows a different phone number.
- `whatsappNumber` is deliberately blank because the screenshot doesn't confirm whether the phone supports WhatsApp. Fill it only when verified (e.g. `"917327925333"`), then booking requests will open WhatsApp.
- No opening hours or service prices have been invented; add confirmed values to `config/salon.ts`.
- The appointment form **does not save or confirm bookings**. It copies a request, or opens WhatsApp if a number is set. Connect a backend/CRM for live appointments.
- Add privacy policy and verified business details prior to launch.

## Files
- `components/SalonSite.tsx` — main website and interactions
- `config/salon.ts` — business/social details and optional video path
- `app/globals.css` — responsive design
- `public/images/` — user-provided original reception and screenshot crops

## Customer video reviews
Add your MP4 files to `public/videos/` (create the folder if needed). In `config/salon.ts`, add entries to `videoReviews`:

```ts
videoReviews: [
  {
    name: "Customer name",
    service: "Hair styling",
    video: "/videos/review-1.mp4",
    // Optional cover image and text:
    poster: "/images/review-1.webp",
    caption: "Customer's review text",
  },
] as VideoReview[],
```

Each video has playback controls and plays only when the visitor starts it. Until videos are added, the section shows a coming-soon message.
