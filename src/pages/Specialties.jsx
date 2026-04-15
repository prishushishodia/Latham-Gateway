import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldPlus, Star, Users, Leaf, Shield, Wind,
  ArrowRight, Building2, FlaskConical,
  Stethoscope, Sparkles,
} from 'lucide-react';
import axios from 'axios';
import { urlFor } from '../sanityClient';

const SANITY_PROJECT_ID = '6v61tp8e';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';
const SANITY_API_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`;

const FLOORS_QUERY = `*[_type == "floorBreakdownPage"][0]{
  hero{
    badge,
    headingLine1,
    headingLine2,
    subtext,
    backgroundImage,
    ctas{
      primaryLabel,
      primaryHref,
      secondaryLabel,
      secondaryHref
    }
  },
  statsBar[]{
    value,
    label,
    icon
  },
  facilityDirectory{
    badge,
    headingLine1,
    headingLine2,
    description,
    floors[]{
      tabLabel,
      floorCode,
      title,
      description,
      image,
      tags,
      activeLabel
    }
  },
  architecture{
    badge,
    headingLine1,
    headingLine2,
    description,
    features[]{
      title,
      description,
      icon
    },
    ctaBox{
      heading,
      subtext,
      primaryLabel,
      secondaryLabel
    }
  }
}`;

export default function Specialties() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFloor, setActiveFloor] = useState(0);

  useEffect(() => {
    axios
      .get(SANITY_API_URL, { params: { query: FLOORS_QUERY } })
      .then((res) => {
        console.log("SANITY DATA:", res.data.result);
        setData(res.data.result);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!data) return <div className="p-10 text-center">No data found</div>;

  const hero = data.hero || {};
  const stats = data.statsBar || [];
  const directory = data.facilityDirectory || {};
  const floors = directory.floors || [];
  const architecture = data.architecture || {};
  const features = architecture.features || [];

  return (
    <div className="min-h-screen font-inter">

      {/* HERO */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        {hero.backgroundImage && (
          <img
            src={urlFor(hero.backgroundImage).width(1920).url()}
            className="absolute inset-0 w-full h-full object-cover"
            alt=""
          />
        )}

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 p-10 text-white max-w-4xl">
          <div className="mb-4 text-sm uppercase tracking-widest">
            {hero.badge}
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            {hero.headingLine1}
            <br />
            <span className="text-teal-300">{hero.headingLine2}</span>
          </h1>

          <p className="mt-4 text-lg opacity-80">
            {hero.subtext}
          </p>

          <div className="mt-6 flex gap-4">
            <Link to={hero?.ctas?.primaryHref || "#"} className="bg-teal-500 px-6 py-3 rounded-full text-white">
              {hero?.ctas?.primaryLabel}
            </Link>
            <Link to={hero?.ctas?.secondaryHref || "#"} className="border px-6 py-3 rounded-full">
              {hero?.ctas?.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 px-10 py-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow">
            {stat.icon && (
              <img
                src={urlFor(stat.icon).width(40).url()}
                className="mb-3"
                alt=""
              />
            )}
            <h2 className="text-2xl font-bold">{stat.value}</h2>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* DIRECTORY */}
      <section className="px-10 py-16">
        <h2 className="text-3xl font-bold">
          {directory.headingLine1}
          <br />
          <span className="text-teal-500">{directory.headingLine2}</span>
        </h2>

        <p className="mt-4 text-gray-600 max-w-xl">
          {directory.description}
        </p>

        {/* Tabs */}
        <div className="flex gap-3 mt-6 overflow-x-auto">
          {floors.map((floor, i) => (
            <button
              key={i}
              onClick={() => setActiveFloor(i)}
              className={`px-5 py-2 rounded-full ${
                activeFloor === i ? 'bg-teal-500 text-white' : 'border'
              }`}
            >
              {floor.tabLabel}
            </button>
          ))}
        </div>

        {/* Active Floor */}
        {floors[activeFloor] && (
          <div className="mt-10 grid md:grid-cols-2 gap-6 items-center">
            <img
              src={urlFor(floors[activeFloor].image).width(800).url()}
              className="rounded-xl"
              alt=""
            />

            <div>
              <h3 className="text-2xl font-bold">
                {floors[activeFloor].title}
              </h3>

              <p className="mt-4 text-gray-600">
                {floors[activeFloor].description}
              </p>

              <div className="mt-4 flex gap-2 flex-wrap">
                {floors[activeFloor].tags?.map((tag, i) => (
                  <span key={i} className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ARCHITECTURE */}
      <section className="px-10 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold">
          {architecture.headingLine1}
          <br />
          <span className="text-teal-500">{architecture.headingLine2}</span>
        </h2>

        <p className="mt-4 text-gray-600 max-w-xl">
          {architecture.description}
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="flex gap-4">
              {f.icon && (
                <img
                  src={urlFor(f.icon).width(40).url()}
                  alt=""
                />
              )}
              <div>
                <h4 className="font-semibold">{f.title}</h4>
                <p className="text-sm text-gray-500">{f.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 bg-teal-600 text-white p-6 rounded-xl">
          <h3 className="text-xl font-bold">
            {architecture?.ctaBox?.heading}
          </h3>
          <p className="mt-2">
            {architecture?.ctaBox?.subtext}
          </p>
        </div>
      </section>

    </div>
  );
}