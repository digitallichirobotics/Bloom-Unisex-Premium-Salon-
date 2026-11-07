/** Business details sourced from the screenshots the user shared. Reconfirm before launch. */
export type VideoReview = {
  name: string;
  service: string;
  video: string;
  poster?: string;
  caption?: string;
};

export const salon = {
  name: "BLOOM",
  subtitle: "UNISEX PREMIUM SALON",
  tagline: "Your style. Your moment.",
  // Salon contact number used for booking and WhatsApp enquiries.
  phone: "+91 73279 25333",
  whatsappNumber: "917327925333",
  address: "Near Sirdi Sai Temple, Tankapani Road, Bhubaneswar, Odisha 751018",
  hours: "", // verify before adding opening hours
  instagram: "https://www.instagram.com/bloomunisex.salon/",
  featuredReel: "https://www.facebook.com/reel/3261661514223149",
  heroVideo: "", // optional local video, e.g. "/videos/bloom-tour.mp4" (upload original MP4 first)
  // Demo amounts in INR. Replace with confirmed prices and set sample to false.
  servicePricing: [
    { original: 500, offer: 400, sample: true },
    { original: 2000, offer: 1600, sample: true },
    { original: 5000, offer: 4000, sample: true },
    { original: 300, offer: 240, sample: true },
    { original: 1500, offer: 1200, sample: true },
    { original: 1000, offer: 800, sample: true },
    { original: 4000, offer: 3200, sample: true },
  ],
  // Real team photos; add confirmed names and roles when available.
  team: [
    { name: "", role: "BLOOM Team", photo: "/images/team/team1.png", description: "" },
    { name: "", role: "BLOOM Team", photo: "/images/team/team2.png", description: "" },
    { name: "", role: "BLOOM Team", photo: "/images/team/team3.png", description: "" },
    { name: "", role: "BLOOM Team", photo: "/images/team/team4.png", description: "" },
    { name: "", role: "BLOOM Team", photo: "/images/team/team5.png", description: "" },
  ],
  galleryVideos: [
    { video: "/images/gallery_video/Video-13391.mp4", poster: "" },
    { video: "/images/gallery_video/Video-19394.mp4", poster: "" },
    { video: "/images/gallery_video/Video-46311.mp4", poster: "" },
    { video: "/images/gallery_video/Video-34539.mp4", poster: "" },
    { video: "/images/gallery_video/Video-99004.mp4", poster: "" },
  ],
  // Video paths are relative to public/. Update names and services when available.
  videoReviews: [
    { name: "Customer review 01", service: "BLOOM experience", video: "/images/review_video/Video-19892.mp4" },
    { name: "Customer review 02", service: "BLOOM experience", video: "/images/review_video/Video-2993.mp4" },
    { name: "Customer review 03", service: "BLOOM experience", video: "/images/review_video/Video-39643.mp4" },
    { name: "Customer review 04", service: "BLOOM experience", video: "/images/review_video/Video-65743.mp4" },
    { name: "Customer review 05", service: "BLOOM experience", video: "/images/review_video/Video-29047.mp4" },
  ] as VideoReview[],
};
