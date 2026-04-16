import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, ChevronDown, ArrowRight } from 'lucide-react';
import { client } from '../sanityClient';

const CONTACT_QUERY = `*[_type == "contactPage"][0]{
  hero{ badge, headingLine1, headingLine2, subtext },
  contactInfo{ heading, subtext, address, phone, email, hoursLine1, hoursLine2 },
  stats[]{ value, label },
  map{ embedUrl, title },
  faq{ heading, subtext, items[]{ q, a } }
}`;

// ─── Fallbacks ────────────────────────────────────────────────────────────────
const FALLBACK = {
  hero: {
    badge: 'Get In Touch',
    headingLine1: "We're here",
    headingLine2: 'to help you',
    subtext: "Have a question, need to book an appointment, or want to learn more about our services? Reach out \u2014 our team responds within one business day.",
  },
  contactInfo: {
    heading: 'Contact Information',
    subtext: "We'd love to hear from you. Here's how to reach us.",
    address: '719 New Loudon Rd\nLatham, NY 12110',
    phone: '(518) 555-0192',
    email: 'hello@lathamgateway.com',
    hoursLine1: 'Mon \u2013 Fri: 8am \u2013 6pm',
    hoursLine2: 'Sat: 9am \u2013 2pm',
  },
  stats: [
    { value: '10+',  label: 'Specialties'    },
    { value: '3',    label: 'Floors of Care' },
    { value: '5\u2605',   label: 'Patient Rating' },
    { value: '1 Day',label: 'Response Time'  },
  ],
  map: {
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.123456789!2d-73.7600!3d42.7450!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89de0f0000000001%3A0x1!2s719+New+Loudon+Rd%2C+Latham%2C+NY+12110!5e0!3m2!1sen!2sus!4v1700000000000',
    title: 'Lathamw Gateway Location',
  },
  faq: {
    heading: 'Frequently Asked Questions',
    subtext: 'Quick answers to the questions we hear most often.',
    items: [
      { q: 'How do I schedule an appointment?', a: 'You can book online through our Patient Portal, call us directly, or fill out the contact form above and our team will reach out within one business day.' },
      { q: 'Do you accept walk-ins?', a: 'Walk-ins are welcome for select services. We recommend calling ahead to confirm availability and reduce your wait time.' },
      { q: 'What insurance plans do you accept?', a: 'We accept most major insurance plans. Please contact our billing team or check our Patient Portal for a full list of accepted providers.' },
      { q: 'Is parking available at the facility?', a: 'Yes, complimentary parking is available in our dedicated lot directly adjacent to the building.' },
      { q: 'How do I access my medical records?', a: 'Medical records can be requested through the Patient Portal or by contacting our front desk. Processing typically takes 3\u20135 business days.' },
    ],
  },
};

// ─── FAQ accordion item ───────────────────────────────────────────────────────
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#d8e7e4] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left text-[0.97rem] font-medium text-brand-text-main hover:text-brand-teal transition-colors"
      >
        {q}
        <ChevronDown
          size={18}
          className={`shrink-0 text-brand-teal transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 pb-5' : 'max-h-0'}`}>
        <p className="text-[0.92rem] leading-7 text-[#667085]">{a}</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Contact() {
  const [data, setData]     = useState(null);
  const [form, setForm]     = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');

  useEffect(() => {
    client
      .fetch(CONTACT_QUERY)
      .then((result) => setData(result))
      .catch(console.error);
  }, []);

  const hero        = data?.hero        ?? FALLBACK.hero;
  const info        = data?.contactInfo ?? FALLBACK.contactInfo;
  const stats       = data?.stats       ?? FALLBACK.stats;
  const map         = data?.map         ?? FALLBACK.map;
  const faq         = data?.faq         ?? FALLBACK.faq;

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setSent(true);
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f0f4f4] via-[#e6f0f0] via-[800px] to-white font-inter text-brand-text-main">
      <section className="px-5 pb-20 pt-36 md:px-8 md:pb-24 md:pt-44">
        <div className="mx-auto max-w-[1220px]">

          {/* ── Hero header ─────────────────────────────────── */}
          <div className="mx-auto mb-16 max-w-[720px] text-center md:mb-20">
            <div className="mb-6 inline-flex items-center rounded-full border border-[#d8ebe6] bg-white px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-teal shadow-[0_8px_20px_rgba(17,75,83,0.04)]">
              {hero.badge}
            </div>
            <h1 className="text-[3rem] font-medium leading-[0.95] tracking-[-0.05em] text-brand-text-main md:text-[5rem]">
              {hero.headingLine1}
              <span className="mt-2 block text-brand-teal">{hero.headingLine2}</span>
            </h1>
            <p className="mx-auto mt-7 max-w-[600px] text-[1rem] leading-8 text-[#6b7280] md:text-[1.08rem]">
              {hero.subtext}
            </p>
          </div>

          {/* ── Info + Form grid ─────────────────────────────── */}
          <div className="grid gap-6 md:grid-cols-[1fr_1.6fr]">

            {/* Left — Contact Info (CMS-driven) */}
            <div className="flex flex-col gap-5">
              <div className="relative overflow-hidden rounded-[28px] border border-[#d8e7e4] bg-brand-teal p-8 text-white">
                <h2 className="mb-1 text-[1.4rem] font-medium tracking-[-0.03em]">{info.heading}</h2>
                <p className="mb-8 text-[0.88rem] leading-6 text-white/70">{info.subtext}</p>

                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-white/60">Address</p>
                      <p className="mt-1 text-[0.93rem] leading-6 whitespace-pre-line">{info.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-white/60">Phone</p>
                      <a href={`tel:${info.phone}`} className="mt-1 block text-[0.93rem] hover:text-white/80 transition-colors">{info.phone}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-white/60">Email</p>
                      <a href={`mailto:${info.email}`} className="mt-1 block text-[0.93rem] hover:text-white/80 transition-colors">{info.email}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-white/60">Hours</p>
                      <p className="mt-1 text-[0.93rem] leading-6">
                        {info.hoursLine1}<br />{info.hoursLine2}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 translate-x-1/3 translate-y-1/3 rounded-full bg-white/5" />
                <div className="pointer-events-none absolute bottom-10 right-10 h-24 w-24 rounded-full bg-white/5" />
              </div>

              {/* Quick Stats (CMS-driven) */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ value, label }) => (
                  <div key={label} className="rounded-[20px] border border-[#d8e7e4] bg-white p-5 text-center shadow-[0_4px_12px_rgba(17,75,83,0.04)]">
                    <p className="text-[1.6rem] font-medium tracking-[-0.04em] text-brand-teal">{value}</p>
                    <p className="mt-1 text-[0.78rem] text-[#667085]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form (hardcoded) */}
            <div className="rounded-[28px] border border-[#e8e2dc] bg-white p-8 shadow-[0_10px_30px_rgba(17,75,83,0.05)] md:p-10">
              {sent ? (
                <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f2f0] text-brand-teal">
                    <Mail size={28} />
                  </div>
                  <h3 className="mb-3 text-[1.5rem] font-medium tracking-[-0.03em]">Message Sent!</h3>
                  <p className="max-w-[340px] text-[0.95rem] leading-7 text-[#667085]">
                    Thank you for reaching out. A member of our team will get back to you within one business day.
                  </p>
                  <button
                    onClick={() => { setSent(false); setError(''); setForm({ name: '', email: '', phone: '', service: '', message: '' }); }}
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#d8e7e4] px-6 py-2.5 text-[0.88rem] font-semibold text-brand-teal hover:bg-[#f0f8f7] transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="mb-1 text-[1.5rem] font-medium tracking-[-0.03em]">Send us a message</h2>
                  <p className="mb-8 text-[0.9rem] text-[#667085]">Fill out the form and we'll be in touch shortly.</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-[#667085]">Full Name</label>
                        <input name="name" value={form.name} onChange={handleChange} required placeholder="Jane Smith"
                          className="rounded-[14px] border border-[#e2eded] bg-[#f8fbfb] px-4 py-3 text-[0.93rem] text-brand-text-main placeholder-[#b0bec5] outline-none transition-[border-color,box-shadow] focus:border-brand-teal focus:shadow-[0_0_0_3px_rgba(2,99,98,0.08)]" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-[#667085]">Email Address</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="jane@email.com"
                          className="rounded-[14px] border border-[#e2eded] bg-[#f8fbfb] px-4 py-3 text-[0.93rem] text-brand-text-main placeholder-[#b0bec5] outline-none transition-[border-color,box-shadow] focus:border-brand-teal focus:shadow-[0_0_0_3px_rgba(2,99,98,0.08)]" />
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-[#667085]">Phone Number</label>
                        <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(518) 000-0000"
                          className="rounded-[14px] border border-[#e2eded] bg-[#f8fbfb] px-4 py-3 text-[0.93rem] text-brand-text-main placeholder-[#b0bec5] outline-none transition-[border-color,box-shadow] focus:border-brand-teal focus:shadow-[0_0_0_3px_rgba(2,99,98,0.08)]" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-[#667085]">Service of Interest</label>
                        <select name="service" value={form.service} onChange={handleChange}
                          className="rounded-[14px] border border-[#e2eded] bg-[#f8fbfb] px-4 py-3 text-[0.93rem] text-brand-text-main outline-none transition-[border-color,box-shadow] focus:border-brand-teal focus:shadow-[0_0_0_3px_rgba(2,99,98,0.08)]">
                          <option value="">Select a service</option>
                          <option>Dental Care</option>
                          <option>Family Practice</option>
                          <option>IV Hydration Therapy</option>
                          <option>Cosmetics & Aesthetics</option>
                          <option>Weight Loss Programs</option>
                          <option>Vaccination Center</option>
                          <option>Immigration Medical Exams</option>
                          <option>DOT Physicals</option>
                          <option>Travel Health Guidance</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-[#667085]">Message</label>
                      <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                        placeholder="Tell us how we can help you..."
                        className="resize-none rounded-[14px] border border-[#e2eded] bg-[#f8fbfb] px-4 py-3 text-[0.93rem] text-brand-text-main placeholder-[#b0bec5] outline-none transition-[border-color,box-shadow] focus:border-brand-teal focus:shadow-[0_0_0_3px_rgba(2,99,98,0.08)]" />
                    </div>

                    {error && (
                      <p className="rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-[0.88rem] text-red-600">
                        {error}
                      </p>
                    )}

                    <button type="submit" disabled={loading}
                      className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-brand-teal px-8 py-3.5 text-[0.92rem] font-semibold text-white transition-colors hover:bg-brand-teal-dark disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? 'Sending…' : <><span>Send Message</span><ArrowRight size={16} /></>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* ── Map (CMS embed URL) ──────────────────────────── */}
          {map.embedUrl && (
            <div className="mt-8 overflow-hidden rounded-[28px] border border-[#d8e7e4] shadow-[0_10px_30px_rgba(17,75,83,0.05)]">
              <iframe
                title={map.title || 'Lathamw Gateway Location'}
                src={map.embedUrl}
                width="100%"
                height="360"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}

          {/* ── FAQ (CMS-driven) ─────────────────────────────── */}
          <div className="mt-16 md:mt-20">
            <div className="mx-auto mb-12 max-w-[560px] text-center">
              <h2 className="text-[2rem] font-medium tracking-[-0.04em] text-brand-text-main md:text-[2.8rem]">
                {faq.heading}
              </h2>
              <p className="mt-4 text-[0.97rem] leading-7 text-[#6b7280]">{faq.subtext}</p>
            </div>

            <div className="mx-auto max-w-[780px] rounded-[28px] border border-[#d8e7e4] bg-white px-8 py-2 shadow-[0_10px_30px_rgba(17,75,83,0.05)]">
              {(faq.items ?? []).map((item) => (
                <FAQItem key={item.q} {...item} />
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
