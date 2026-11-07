"use client";



import { FormEvent, useState } from "react";

import Image from "next/image";

import { motion, useReducedMotion } from "framer-motion";

import {

  ArrowDownRight,

  ArrowRight,

  ArrowUpRight,

  CalendarDays,

  Check,

  ChevronDown,

  Clock3,

  Droplets,

  Instagram,

  PlayCircle,


  MapPin,

  MessageCircle,

  Menu,

  Phone,

  Scissors,

  ShieldCheck,

  Sparkles,

  SprayCan,

  WandSparkles,

  X,

} from "lucide-react";

import { salon } from "@/config/salon";

import TextReviews from "@/components/TextReviews";
import AutoPlayVideo from "@/components/AutoPlayVideo";



type Service = { index: string; title: string; details: string; icon: typeof Scissors; tag: string };



const services: Service[] = [

  { index: "01", title: "Haircut & Styling", details: "Personalized cuts, blowouts and styling for every look.", icon: Scissors, tag: "HAIR" },

  { index: "02", title: "Hair Colour", details: "Colour, highlights, toning and creative transformations.", icon: WandSparkles, tag: "HAIR" },

  { index: "03", title: "Keratin & Straightening", details: "Enquire about keratin, straightening and smoothing hair treatments.", icon: Droplets, tag: "HAIR TREATMENT" },

  { index: "04", title: "Beard & Grooming", details: "Precision trimming, shaping and modern grooming.", icon: SprayCan, tag: "GROOMING" },

  { index: "05", title: "Skin & Facials", details: "Refreshing facial treatments and personalized skin care.", icon: Sparkles, tag: "SKIN" },

  { index: "06", title: "Hair Spa & Care", details: "Treatments designed to nourish and revitalize your hair.", icon: Droplets, tag: "WELLNESS" },

  { index: "07", title: "Makeup & Bridal", details: "Enquire about party looks, bridal makeup and finishing touches.", icon: ShieldCheck, tag: "MAKEUP" },

  { index: "08", title: "Academy Enquiries", details: "Ask our team about beauty and hair education opportunities.", icon: Sparkles, tag: "ACADEMY" },

];



// Local fallbacks are bundled under /public/images/service-fallbacks.
// Hair Colour uses a replacement photo with the bundled salon photo as fallback.
const servicePhotos = [
  { src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80", fallback: "/images/service-fallbacks/haircut.webp" },
  { src: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800", fallback: "/images/bloom-reception.webp" },
  { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80", fallback: "/images/service-fallbacks/keratin.webp" },
  { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80", fallback: "/images/service-fallbacks/grooming.webp" },
  { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80", fallback: "/images/service-fallbacks/facials.webp" },
  { src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80", fallback: "/images/service-fallbacks/hair-spa.webp" },
  { src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80", fallback: "/images/service-fallbacks/makeup.webp" },
  { src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80", fallback: "/images/service-fallbacks/academy.webp" },
];

/** Swap to the bundled image if an external provider is unavailable or returns 404. */
function ServiceVisual({ src, fallback }: { src: string; fallback: string }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  return (
    <Image
      src={currentSrc}
      alt=""
      fill
      sizes="(max-width: 560px) 100vw, (max-width: 1100px) 50vw, 25vw"
      className="service-photo"
      unoptimized={currentSrc.startsWith("http")}
      onError={() => setCurrentSrc(fallback)}
      aria-hidden="true"
    />
  );
}

const faqs = [

  { q: "Do you offer services for all genders?", a: "Yes. BLOOM is designed as a welcoming unisex salon with hair, grooming and beauty services for everyone." },

  { q: "Can I request an appointment online?", a: "You can prepare an appointment request here. The salon must confirm availability before your appointment is booked." },

  { q: "How can I get exact prices?", a: "Contact the salon for its latest service menu, package options and pricing." },

];



function Logo({ light = false }: { light?: boolean }) {

  return (

    <a className={`logo ${light ? "logo--light" : ""}`} href="#home" aria-label="BLOOM, go to homepage">

      <Image src="/images/logo/bloom logo.png" alt="BLOOM Unisex Premium Salon" width={2048} height={683} className="logo-image" />

    </a>

  );

}



function Intro({ eyebrow, title, desc }: { eyebrow: string; title: React.ReactNode; desc?: string }) {

  return (

    <div className="section-intro">

      <div className="eyebrow"><span className="eyebrow-line" />{eyebrow}</div>

      <h2 className="section-title">{title}</h2>

      {desc && <p className="section-description">{desc}</p>}

    </div>

  );

}



export default function SalonSite() {

  const reduced = useReducedMotion();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [selected, setSelected] = useState("Haircut & Styling");

  const [requestStatus, setRequestStatus] = useState("");

  const [draft, setDraft] = useState("");

  const [openFaq, setOpenFaq] = useState(0);




  const reveal = reduced

    ? {}

    : { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.65 } };



  function closeMenu() { setMobileOpen(false); }



  function submitAppointment(event: FormEvent<HTMLFormElement>) {

    event.preventDefault();

    const form = event.currentTarget;

    const data = new FormData(form);

    const message = [

      "Hello BLOOM, I'd like to request an appointment.",

      `Name: ${String(data.get("name") || "")}`,

      `Phone: ${String(data.get("phone") || "")}`,

      `Service: ${String(data.get("service") || "")}`,

      `Preferred date: ${String(data.get("date") || "")}`,

      `Preferred time: ${String(data.get("time") || "")}`,

      `Notes: ${String(data.get("notes") || "None")}`,

      "Please confirm availability and pricing.",

    ].join("\n");

    setDraft(message);



    if (salon.whatsappNumber.trim()) {

      window.open(`https://wa.me/${salon.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");

      setRequestStatus("Continue in WhatsApp to send your request. Your appointment is confirmed only after the salon replies.");

    } else {

      void navigator.clipboard?.writeText(message).then(

        () => setRequestStatus("Request copied. Send it to the salon to check availability."),

        () => setRequestStatus("Copy the request shown below and send it to the salon.")

      );

      if (!navigator.clipboard) setRequestStatus("Copy the request shown below and send it to the salon.");

    }

  }



  return (

    <div id="home" className="site-shell">

      <div className="top-note"><span className="note-spark">✳</span> GOOD HAIR. GOOD ENERGY. EVERY DAY. <span className="note-spark">✳</span></div>

      <header className="site-header">

        <div className="container nav-inner">

          <Logo />

          <nav className={`nav-links ${mobileOpen ? "nav-links--open" : ""}`} aria-label="Main navigation">

            <a onClick={closeMenu} href="#home">Home</a>

            <a onClick={closeMenu} href="#services">Services</a>

            <a onClick={closeMenu} href="#about">Our Story</a>
            <a onClick={closeMenu} href="#team">Our Team</a>

            <a onClick={closeMenu} href="#space">Gallery</a>


            <a onClick={closeMenu} href="#reviews">Reviews</a>

            <a onClick={closeMenu} href="#training">Training</a>

            <a onClick={closeMenu} href="#contact">Contact</a>

            <a onClick={closeMenu} className="nav-mobile-cta" href="#booking">Book appointment <ArrowUpRight size={17} /></a>

          </nav>

          <a className="nav-book" href="#booking">BOOK A VISIT <ArrowUpRight size={17} /></a>

          <button className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>

            {mobileOpen ? <X size={26} /> : <Menu size={26} />}

          </button>

        </div>

      </header>



      <main>

        <section className="hero" aria-label="Welcome to BLOOM">

          {salon.heroVideo && !reduced ? (

            <video className="hero-video" autoPlay muted loop playsInline poster="/images/bloom-reception.webp" aria-hidden="true">

              <source src={salon.heroVideo} type="video/mp4" />

            </video>

          ) : (

            <Image src="/images/bloom-reception.webp" alt="BLOOM salon reception, featuring marble walls, elegant lighting and a black reception desk" fill sizes="100vw" className="hero-photo" priority />

          )}

          <div className="hero-scrim" />

          <div className="container hero-content">

            <motion.div {...(reduced ? {} : { initial: { opacity: 0, y: 25 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 } })}>

              <div className="hero-kicker"><span className="kicker-dot" /> BLOOM UNISEX SALON <span className="hero-kicker-line" /></div>

              <h1>Look good.<br /><em>Feel amazing.</em><br />Be you.</h1>

              <p>Every style has a story. Discover elevated hair, beauty and grooming in a space that feels like yours.</p>

              <div className="hero-buttons">

                <a className="btn btn-lime" href="#booking">BOOK YOUR MOMENT <ArrowUpRight size={18} /></a>

                <a className="btn btn-outline" href="#services">EXPLORE SERVICES <ArrowRight size={18} /></a>

              </div>

            </motion.div>

          </div>

          <div className="hero-bottom"><span>YOUR SPACE TO SHINE</span><span>SCROLL TO EXPLORE <ArrowDownRight size={16} /></span></div>

        </section>



        <section className="promise-bar" aria-label="BLOOM approach">

          <div className="container promise-grid">

            <span><Scissors size={19} /> EXPERT STYLING</span>

            <span><Sparkles size={19} /> CONFIDENTLY YOU</span>

            <span><ShieldCheck size={19} /> COMFORT FIRST</span>

            <span><CalendarDays size={19} /> PERSONALIZED CARE</span>

          </div>

        </section>



        <section id="services" className="section services-section" aria-label="Our salon services">

          <div className="container">

            <motion.div {...reveal} className="section-header">

              <Intro eyebrow="WHAT WE DO" title={<>A little care.<br /><i>A lot of confidence.</i></>} desc="From everyday refreshes to a complete new look, find a service that brings out your personal style." />

              <a className="text-link" href="#booking">REQUEST A SERVICE <ArrowUpRight size={18} /></a>

            </motion.div>

            <div className="services-grid">

              {services.map(({ index, title, details, icon: Icon, tag }, i) => (

                <motion.a {...reveal} key={title} href="#booking" className="service-card" onClick={() => setSelected(title)} style={{ transitionDelay: `${i * 25}ms` }}>

                  <div className="service-card-photo"><ServiceVisual src={servicePhotos[i].src} fallback={servicePhotos[i].fallback} />{salon.servicePricing[i] && <span className="service-discount">{salon.servicePricing[i].sample ? "DEMO · " : ""}{Math.round((1 - salon.servicePricing[i].offer / salon.servicePricing[i].original) * 100)}% OFF</span>}</div>

                  <div className="service-card-content">

                  <div className="service-card-top"><span className="service-index">/{index}</span><ArrowUpRight size={23} /></div>

                  <div className="service-icon"><Icon size={30} strokeWidth={1.5} /></div>

                  <div className="service-tag">{tag}</div>

                  <h3>{title}</h3>

                  <p>{details}</p>

                  <div className="service-booking">
                    {salon.servicePricing[i] ? <><span className="service-price-label">{salon.servicePricing[i].sample ? "SAMPLE PRICING · FROM" : "STARTING FROM"}</span><div className="service-price"><strong>₹{salon.servicePricing[i].offer.toLocaleString("en-IN")}</strong><del>₹{salon.servicePricing[i].original.toLocaleString("en-IN")}</del></div></> : <span className="service-price-enquiry">Contact us for course fees</span>}
                    <span className="service-book-now">{title === "Academy Enquiries" ? "ENQUIRE NOW" : "BOOK NOW"}<ArrowUpRight size={17} /></span>
                  </div>

                  </div>

                </motion.a>

              ))}

            </div>

            <p className="services-note">* Services and availability should be verified with the salon before booking.</p>

          </div>

        </section>



        <section id="about" className="about-section">

          <div className="container about-grid">

            <motion.div {...reveal} className="about-visual">

              <div className="about-photo-wrap"><Image src="/images/About/aboutimge.png" alt="Hair stylist wearing a green apron in a bright salon" fill sizes="(max-width: 800px) 100vw, 50vw" className="about-photo" /></div>

              <div className="about-photo-label"><span className="mini-star">✳</span><span>YOUR BEAUTY<br />YOUR WAY</span></div>

            </motion.div>

            <motion.div {...reveal} className="about-copy">

              <Intro eyebrow="WELCOME TO BLOOM" title={<>Beauty starts<br />with <i>being you.</i></>} />

              <p>We believe a salon visit is about more than a great look. It is time to relax, reset, and step out feeling like the best version of yourself.</p>

              <p>Our unisex space is created for all styles, all expressions and all the little moments of self-care in between.</p>

              <div className="about-traits"><span><Check size={17} /> Thoughtful service</span><span><Check size={17} /> All-gender approach</span><span><Check size={17} /> A space to unwind</span></div>

              <a className="btn btn-dark" href="#booking">MAKE TIME FOR YOU <ArrowUpRight size={18} /></a>

            </motion.div>

          </div>

        </section>



        <section id="team" className="section team-section" aria-label="Our team">
          <div className="container">
            <motion.div {...reveal} className="section-header">
              <Intro eyebrow="THE PEOPLE BEHIND BLOOM" title={<>Good hands.<br /><i>Great energy.</i></>} desc="Meet the people behind your next BLOOM moment. A little creativity, thoughtful care and a warm welcome." />
              <a className="text-link" href="#booking">MEET US AT BLOOM <ArrowUpRight size={18} /></a>
            </motion.div>
            <div className="team-grid">
              {salon.team.map((member, index) => (
                <motion.article {...reveal} className="team-card" key={`${member.role}-${index}`}>
                  <div className="team-portrait">
                    {member.photo ? <Image src={member.photo} alt={member.name || `BLOOM team member ${index + 1}`} fill unoptimized={member.photo.startsWith("https://")} sizes="(max-width: 520px) 100vw, (max-width: 800px) 50vw, (max-width: 1100px) 33vw, 20vw" /> : <div className="team-photo-placeholder"><Scissors size={52} strokeWidth={1} aria-hidden="true" /><span>BLOOM TEAM</span></div>}
                    <span className="team-number">0{index + 1}</span>
                  </div>
                  <div className="team-card-copy"><span className="team-role">{member.role}</span>{member.name && <h3>{member.name}</h3>}{member.description && <p>{member.description}</p>}<a href="#booking" aria-label={`Enquire about ${member.role.toLowerCase()}`}>LET'S CONNECT <ArrowUpRight size={18} /></a></div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="space" className="space-section">

          <div className="container">

            <motion.div {...reveal} className="space-heading">

              <Intro eyebrow="REAL MOMENTS AT BLOOM" title={<>Inside the <i>BLOOM world.</i></>} desc="Step inside BLOOM. Explore our styling stations, beauty area and the details that make our salon feel welcoming." />

            </motion.div>

            <div className="experience-gallery">

              <div className="experience-photo experience-photo--wide"><Image src="/images/space/unnamed.jpg" alt="BLOOM salon styling stations with mirrors and pendant lighting" fill sizes="(max-width: 800px) 100vw, 50vw" /><span>01 / OUR SPACE</span></div>

              <div className="experience-photo"><Image src="/images/space/unnamed (1).jpg" alt="Styling chairs and mirrors inside BLOOM salon" fill sizes="(max-width: 800px) 50vw, 25vw" /><span>02 / STYLING STATIONS</span></div>

              <div className="experience-photo experience-photo--tall"><Image src="/images/space/unnamed (3).jpg" alt="BLOOM salon beauty treatment chair and illuminated mirror" fill sizes="(max-width: 800px) 50vw, 25vw" /><span>03 / BEAUTY & CARE</span></div>

              <div className="experience-photo"><Image src="/images/space/unnamed (2).jpg" alt="Arched mirrors and product shelves inside BLOOM salon" fill sizes="(max-width: 800px) 50vw, 25vw" /><span>04 / SALON DETAILS</span></div>

            </div>

            <div className="gallery-social-cta">

              <span>More haircuts, keratin, makeup and client moments on Instagram.</span>

              <a href={salon.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={19} /> VIEW @BLOOMUNISEX.SALON <ArrowUpRight size={17} /></a>

            </div>

            {salon.galleryVideos.length > 0 && (

              <div className="gallery-videos">

                <div className="gallery-videos-heading"><h3>Moments in motion</h3><span>VIDEO GALLERY</span></div>

                <div className="gallery-video-grid">

                  {salon.galleryVideos.map((video, index) => (

                    <div className="gallery-video-card" key={video.video}>

                      <AutoPlayVideo controls preload="auto" poster={video.poster || undefined} aria-label={`BLOOM gallery video ${index + 1}`}>

                        <source src={video.video} />

                        Your browser does not support video playback. <a href={video.video}>Download video</a>.

                      </AutoPlayVideo>

                      <span>BLOOM MOMENT / {String(index + 1).padStart(2, "0")}</span>

                    </div>

                  ))}

                </div>

              </div>

            )}

          </div>

        </section>



        <section id="training" className="section training-section" aria-label="Training and academy enquiries">

          <div className="container">

            <motion.div {...reveal} className="section-header">

              <Intro eyebrow="BLOOM TRAINING & ACADEMY" title={<>Your passion.<br /><i>A new beginning.</i></>} desc="Interested in learning hair, beauty or makeup? Connect with BLOOM to explore training opportunities and find the right starting point." />

              <a className="text-link" href="#booking" onClick={() => setSelected("Academy Enquiries")}>ENQUIRE ABOUT TRAINING <ArrowUpRight size={18} /></a>

            </motion.div>

            <div className="training-grid">

              {[

                { title: "Haircut Training", icon: Scissors, description: "Ask about sectioning, cutting techniques and creating balanced shapes.", photo: "/images/traing/01_Haircut_Training.jpg" },

                { title: "Men?s Haircut Training", icon: Scissors, description: "Enquire about men?s cutting techniques, shaping and finishing.", photo: "/images/traing/02_Mens_Haircut_Training.jpg" },

                { title: "Blow Dry & Styling", icon: Scissors, description: "Ask about blowouts, brush techniques and finishing styles.", photo: "/images/traing/03_Blow_Dry_Styling_Training.jpg" },

                { title: "Facial & Skincare", icon: Sparkles, description: "Explore skin care basics, facial routines and client consultation.", photo: "/images/traing/04_Facial_Skincare_Training.jpg" },

                { title: "Hair Colour & Highlights", icon: WandSparkles, description: "Ask about colour theory, application and highlighting techniques.", photo: "/images/traing/05_Hair_Colour_Highlights_Training.jpg" },

                { title: "Manicure & Nail Training", icon: Sparkles, description: "Enquire about nail care, manicure techniques and finishing.", photo: "/images/traing/06_Manicure_Nail_Training.jpg" },

                { title: "Professional Makeup", icon: WandSparkles, description: "Explore makeup preparation, application and occasion looks.", photo: "/images/traing/07_Professional_Makeup_Training.jpg" },

                { title: "Academy Classroom Training", icon: CalendarDays, description: "Ask about classroom learning, practical sessions and academy opportunities.", photo: "/images/traing/08_Academy_Classroom_Training.jpg" },

              ].map(({ title, icon: Icon, description, photo }, index) => (

                <motion.article {...reveal} className="training-card" key={title}>

                  <div className="training-card-photo"><Image src={photo} alt={`${title} training`} fill sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 25vw" className="service-photo" /></div>
                  <div className="training-card-content">

                  <div className="training-card-top"><Icon size={30} strokeWidth={1.5} /><span>{String(index + 1).padStart(2, "0")}</span></div>

                  <h3>{title}</h3>

                  <p>{description}</p>

                  <a href="#booking" onClick={() => setSelected("Academy Enquiries")} aria-label={`Enquire about ${title.toLowerCase()} training`}>ASK ABOUT TRAINING <ArrowUpRight size={17} /></a>
                  </div>

                </motion.article>

              ))}

            </div>

            <p className="training-note">Contact the salon for current courses, eligibility, fees, schedules and certification details.</p>

          </div>

        </section>



        <section id="reviews" className="section reviews-section" aria-label="Customer video reviews">

          <div className="container">

            <motion.div {...reveal} className="section-header">

              <Intro eyebrow="CUSTOMER REVIEWS" title={<>Their stories.<br /><i>Their BLOOM moments.</i></>} desc="Hear about the BLOOM experience in our customers' own words." />

              <a className="text-link" href="#booking">PLAN YOUR VISIT <ArrowUpRight size={18} /></a>

            </motion.div>

            {salon.videoReviews.length > 0 ? (

              <div className="reviews-grid">

                {salon.videoReviews.map((review) => (

                  <article className="review-card" key={review.video}>

                    <AutoPlayVideo className="review-video" controls preload="auto" poster={review.poster || undefined} aria-label={`Video review by ${review.name}`}>

                      <source src={review.video} />

                      Your browser does not support video playback. <a href={review.video}>Download this review video</a>.

                    </AutoPlayVideo>

                    <div className="review-copy">

                      <span className="review-service">{review.service}</span>

                      <h3>{review.name}</h3>

                      {review.caption && <p>{review.caption}</p>}

                    </div>

                  </article>

                ))}

              </div>

            ) : (

              <div className="reviews-empty"><PlayCircle size={42} strokeWidth={1.4} /><h3>Every visit has a story.</h3><p>Customer video reviews are coming soon.</p></div>

            )}

          </div>

        </section>



        <TextReviews />



        <section className="manifesto-section">

          <div className="container manifesto-inner">

            <span className="manifesto-kicker">THE BLOOM WAY ✳</span>

            <h2>Your look is unique.<br /><em>Let's celebrate it.</em></h2>

            <a href="#booking" className="btn btn-lime">GET IN TOUCH <ArrowUpRight size={18} /></a>

          </div>

        </section>



        <section id="booking" className="section booking-section">

          <div className="container booking-grid">

            <motion.div {...reveal} className="booking-copy">

              <Intro eyebrow="BOOK YOUR MOMENT" title={<>A little time<br /><i>just for you.</i></>} desc="Choose a service and preferred time. We'll help you prepare a request that the salon can review and confirm." />

              <div className="booking-tip"><CalendarDays size={22} /><div><strong>Appointment requests</strong><p>Availability and prices must be confirmed directly with the salon. Submitting here does not reserve a slot.</p></div></div>

              <div className="booking-orbit">✳</div>

            </motion.div>

            <motion.form {...reveal} className="booking-form" onSubmit={submitAppointment}>

              <div className="form-title"><div><span className="eyebrow eyebrow--plain">LET'S GET STARTED</span><h3>Request a visit</h3></div><span className="form-number">01 / 01</span></div>

              <div className="form-row"><label>Your name <input required name="name" autoComplete="name" placeholder="Full name" /></label><label>Phone number <input required name="phone" type="tel" autoComplete="tel" placeholder="Your contact number" /></label></div>

              <label>Choose a service <span className="select-wrap"><select name="service" value={selected} onChange={(e) => setSelected(e.target.value)} required>{services.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}</select><ChevronDown size={18} /></span></label>

              <div className="form-row"><label>Preferred date <input type="date" required name="date" min={new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)} /></label><label>Preferred time <select name="time" required defaultValue=""><option value="" disabled>Select time</option>{["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"].map((time) => <option key={time}>{time}</option>)}</select></label></div>

              <label>Anything else? <textarea name="notes" rows={3} placeholder="Tell us what you have in mind (optional)" /></label>

              <button className="btn btn-dark form-submit" type="submit">{salon.whatsappNumber ? "OPEN WHATSAPP REQUEST" : "COPY APPOINTMENT REQUEST"} <ArrowUpRight size={18} /></button>

              {requestStatus && <p className="form-feedback" role="status">{requestStatus}</p>}

              {draft && salon.whatsappNumber && <a className="text-link" href={`https://wa.me/${salon.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(draft)}`} target="_blank" rel="noopener noreferrer">CONTINUE IN WHATSAPP <ArrowUpRight size={18} /></a>}

              {draft && !salon.whatsappNumber && <textarea className="request-preview" aria-label="Your booking request" value={draft} readOnly rows={9} />}

              <p className="form-footnote"><ShieldCheck size={15} /> This form prepares a request only. Your booking is not confirmed.</p>

            </motion.form>

          </div>

        </section>



        <section className="faq-section">

          <div className="container faq-grid"><Intro eyebrow="GOOD TO KNOW" title={<>A few <i>quick answers.</i></>} /><div>{faqs.map((item, i) => <div className="faq" key={item.q}><button aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>{item.q}</span><span className="faq-mark">{openFaq === i ? "−" : "+"}</span></button>{openFaq === i && <p>{item.a}</p>}</div>)}</div></div>

        </section>

      </main>



      {salon.whatsappNumber && (

        <a className="whatsapp-float" href={`https://wa.me/${salon.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hello BLOOM, I'd like to enquire about your services and training.")}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with BLOOM on WhatsApp">

          <MessageCircle size={25} /><span>Chat on WhatsApp</span>

        </a>

      )}



      <footer id="contact" className="footer">

        <div className="container">

          <div className="footer-grid"><div><Logo light /><p>A little beauty. A lot of you.<br />A place to feel your best.</p></div><div><h4>EXPLORE</h4><a href="#home">Home</a><a href="#services">Our services</a><a href="#about">Our story</a><a href="#space">Gallery</a><a href="#booking">Request a visit</a></div><div><h4>GET IN TOUCH</h4>{salon.address ? <p><MapPin size={16} /> {salon.address}</p> : <p><MapPin size={16} /> Address available on request</p>}{salon.phone && <a href={`tel:${salon.phone.replace(/\s/g, "")}`}><Phone size={16} /> {salon.phone}</a>}{salon.hours && <p><Clock3 size={16} /> {salon.hours}</p>}{salon.instagram && <a href={salon.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={16} /> @bloomunisex.salon</a>}</div><div><h4>YOUR NEXT GREAT LOOK</h4><p>Take a moment for yourself.</p><a className="footer-cta" href="#booking">REQUEST APPOINTMENT <ArrowUpRight size={18} /></a></div></div>

          <div className="footer-bottom"><span>© {new Date().getFullYear()} BLOOM UNISEX SALON. ALL RIGHTS RESERVED.</span><span>MADE FOR YOU ✳</span></div>

        </div>

      </footer>

    </div>

  );

}
