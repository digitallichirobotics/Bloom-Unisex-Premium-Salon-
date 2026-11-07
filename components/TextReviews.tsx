"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Star, X } from "lucide-react";

type Review = { id: string; name: string; text: string; rating: number; date: string };
const storageKey = "bloom-customer-reviews-v1";
const demoReviews: Review[] = [
  { id: "demo-1", name: "Aarav", rating: 5, text: "Loved the fresh haircut and styling. The team listened to the look I had in mind and made the visit comfortable.", date: "2026-11-01T12:00:00Z" },
  { id: "demo-2", name: "Priya", rating: 5, text: "A relaxing salon experience with a welcoming atmosphere. Really happy with how my hair was styled.", date: "2026-11-02T12:00:00Z" },
  { id: "demo-3", name: "Rohan", rating: 4, text: "Came in for a grooming refresh. I liked the attention to detail and the neat finish.", date: "2026-11-03T12:00:00Z" },
  { id: "demo-4", name: "Ananya", rating: 5, text: "The makeup look was just the style I wanted for an evening out. A lovely space to get ready and unwind.", date: "2026-11-04T12:00:00Z" },
  { id: "demo-5", name: "Sneha", rating: 5, text: "Enjoyed the hair care session and the friendly conversation. Left feeling refreshed with a look I loved.", date: "2026-11-05T12:00:00Z" },
];

function isReview(value: unknown): value is Review {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<Review>;
  return typeof item.id === "string" && typeof item.name === "string" && typeof item.text === "string" && typeof item.date === "string" && Number.isInteger(item.rating) && item.rating! >= 1 && item.rating! <= 5;
}

export default function TextReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const displayedReviews = [...reviews, ...demoReviews];
  const [carouselPaused, setCarouselPaused] = useState(false);

  useEffect(() => {
    if (carouselPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      const track = slider.current;
      if (!track || dialog.current?.open) return;
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 1) return;
      const card = track.querySelector<HTMLElement>(".text-review-card");
      track.scrollTo({ left: track.scrollLeft >= max - 2 ? 0 : track.scrollLeft + (card?.offsetWidth || track.clientWidth) + 16, behavior: "smooth" });
    }, 4000);
    return () => window.clearInterval(timer);
  }, [carouselPaused, reviews.length]);

  function deleteReview(id: string) {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(storageKey) || "[]");
      const next = (Array.isArray(saved) ? saved.filter(isReview) : []).filter(review => review.id !== id);
      localStorage.setItem(storageKey, JSON.stringify(next));
      setReviews(next);
      setStatus("Review deleted from this browser.");
    } catch { setStatus("The review could not be deleted. Please try again."); }
  }

  function slide(direction: number) {
    const track = slider.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".text-review-card");
    track.scrollBy({ left: direction * ((card?.offsetWidth || track.clientWidth) + 16), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(saved)) setReviews(saved.filter(isReview));
    } catch { setStatus("Saved reviews could not be loaded in this browser."); }
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const text = String(data.get("review") || "").trim();
    if (!name || !text) { setStatus("Please enter your name and review."); return; }
    const review: Review = { id: crypto.randomUUID(), name, text, rating, date: new Date().toISOString() };
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(storageKey) || "[]");
      const next = [review, ...(Array.isArray(saved) ? saved.filter(isReview) : [])];
      localStorage.setItem(storageKey, JSON.stringify(next));
      setReviews(next);
      form.reset();
      setRating(5);
      setStatus("Thank you! Your review is saved in this browser.");
      dialog.current?.close();
      slider.current?.scrollTo({ left: 0 });
    } catch { setStatus("Your review could not be saved. Browser storage may be unavailable or full. Please try again."); }
  }

  return (
    <section className="section text-reviews-section" aria-labelledby="text-reviews-title">
      <div className="container">
        <div className="section-intro">
          <div className="eyebrow"><span className="eyebrow-line" />YOUR WORDS MATTER</div>
          <h2 id="text-reviews-title" className="section-title">Share your <i>BLOOM experience.</i></h2>
          <p className="section-description">Tell us about your visit and what made it special.</p>
        </div>
        <div className="review-actions">
          <button type="button" className="btn btn-dark" onClick={() => { setStatus(""); dialog.current?.showModal(); }}>WRITE A REVIEW <Star size={17} /></button>
          <div className="review-slider-controls"><button type="button" onClick={() => slide(-1)} aria-label="Previous reviews"><ArrowLeft size={20} /></button><button type="button" onClick={() => slide(1)} aria-label="Next reviews"><ArrowRight size={20} /></button></div>
        </div>
        <p className="review-storage-note">Reviews added here are saved on this browser and are visible only on this device.</p>
        <p className="review-storage-note">Demo reviews are fictional examples for previewing this layout.</p>
        {!reviews.length && status && <p role="status" className="form-feedback">{status}</p>}
        <div className="text-reviews-layout" onMouseEnter={() => setCarouselPaused(true)} onMouseLeave={() => setCarouselPaused(false)} onFocus={() => setCarouselPaused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setCarouselPaused(false); }}>
          <div ref={slider} className="text-reviews-list" tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Written customer reviews">
            {[...displayedReviews, ...displayedReviews].map((review, index) => (
              <article className="text-review-card" key={`${review.id}-${index}`} aria-hidden={index >= displayedReviews.length ? true : undefined} inert={index >= displayedReviews.length ? true : undefined}>
                <div className="review-customer"><span className="review-avatar" aria-hidden="true">{review.name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase()}</span><div className="text-review-heading"><h3>{review.name}</h3><time dateTime={review.date}>{new Date(review.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</time></div></div>
                <div className="review-card-topline"><span className="review-stars" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: 5 }, (_, i) => <Star key={i} size={15} fill={i < review.rating ? "currentColor" : "none"} aria-hidden="true" />)}</span></div>
                <p className="review-card-quote">{review.text}</p>
                {review.id.startsWith("demo-") && <span className="review-demo-label">DEMO REVIEW</span>}
                {!review.id.startsWith("demo-") && <button className="review-delete" type="button" onClick={() => deleteReview(review.id)} aria-label={`Delete your review by ${review.name}`}>Delete review</button>}
              </article>
            ))}
          </div>
        </div>
        {reviews.length > 0 && status && <p role="status" className="form-feedback">{status}</p>}
        <dialog ref={dialog} className="review-dialog" aria-labelledby="review-form-title">
          <form className="booking-form text-review-form" onSubmit={submit}>
            <div className="form-title"><h3 id="review-form-title">Write a review</h3><button className="review-dialog-close" type="button" aria-label="Close review form" onClick={() => dialog.current?.close()}><X size={22} /></button></div>
            <label>Your name<input name="name" autoComplete="name" autoFocus required maxLength={80} placeholder="Your name" /></label>
            <fieldset className="review-rating"><legend>Your rating</legend><div>{[1, 2, 3, 4, 5].map(value => <label key={value}><input type="radio" name="rating" value={value} checked={rating === value} onChange={() => setRating(value)} /><span><Star size={26} fill={value <= rating ? "currentColor" : "none"} aria-hidden="true" /><span className="rating-label">{value} {value === 1 ? "star" : "stars"}</span></span></label>)}</div></fieldset>
            <label>Your review<textarea name="review" required maxLength={2000} rows={5} placeholder="How was your experience at BLOOM?" /></label>
            <p className="review-storage-note">Reviews added here are saved on this browser and are visible only on this device.</p>
            <button className="btn btn-dark" type="submit">SAVE REVIEW</button>
            {status && <p className="form-feedback" role="status">{status}</p>}
          </form>
        </dialog>
      </div>
    </section>
  );
}
