"use client";
import StoreImage from "./store-image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import ProductCard from "./product-card";
import { Newsletter } from "./shell";
import Icon from "./icons";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    api("/products?sort=newest")
      .then((data) => setProducts(data.data.slice(0, 4)))
      .catch((e) => setError(e.message));
  }, []);
  return (
    <>
      <section className="hero">
        <StoreImage
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=2200&q=90"
          alt="A sunlit collection of thoughtfully chosen everyday clothing"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">THE EVERYDAY COLLECTION / 2026</p>
          <h1>
            Less effort.
            <br />
            More <em>you.</em>
          </h1>
          <p>
            Thoughtfully made. Effortlessly worn.
            <br />
            Meet the pieces you’ll keep coming back to.
          </p>
          <Link className="button light" href="/shop">
            Discover new arrivals <Icon name="arrow" />
          </Link>
        </div>
        <div className="hero-bottom">
          <span>GOOD CLOTHES. GREAT DAYS.</span>
          <span>
            01 <span className="hero-line" /> 03
          </span>
        </div>
        <span className="vertical-note">A NEW WAY TO EVERYDAY</span>
      </section>
      <section className="benefits">
        {[
          ["truck", "On us, from $150", "Complimentary standard shipping"],
          ["leaf", "Thoughtfully chosen", "Pieces to wear again and again"],
          ["return", "Find your perfect fit", "Easy returns within 30 days"],
        ].map(([icon, title, text]) => (
          <div key={icon}>
            <Icon name={icon} size={27} />
            <div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          </div>
        ))}
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR WARDROBE, REIMAGINED</p>
            <h2>Find your everyday.</h2>
          </div>
          <p>
            A little less searching.
            <br />A little more feeling like yourself.
          </p>
        </div>
        <div className="category-grid">
          {[
            [
              "Women",
              "women",
              "photo-1483985988355-763728e1935b",
              "For all the ways you are.",
            ],
            ["Men", "men", "photo-1516257984-b1b4d707412e", "Easy does it."],
            [
              "The essentials",
              "essentials",
              "photo-1434389677669-e08b4cac3105",
              "Always in rotation.",
            ],
          ].map(([name, slug, photo, tag]) => (
            <Link
              href={`/category/${slug}`}
              className="category-card"
              key={slug}
            >
              <StoreImage
                src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=850&q=85`}
                alt={`${name} clothing collection`}
                loading="lazy"
              />
              <div>
                <span>{tag}</span>
                <h3>
                  {name}
                  <Icon name="arrow" size={28} />
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section arrivals">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FRESH FINDS, FAMILIAR FEELING</p>
            <h2>New & noteworthy.</h2>
          </div>
          <Link className="underlined" href="/shop">
            Shop all new arrivals <Icon name="arrow" size={18} />
          </Link>
        </div>
        {error ? (
          <p role="status" className="notice">
            {error} <Link href="/shop">Visit the shop →</Link>
          </p>
        ) : (
          <div className="product-grid home-grid">
            {products.length
              ? products.map((p) => <ProductCard product={p} key={p.id} />)
              : [1, 2, 3, 4].map((n) => <div className="skeleton" key={n} />)}
          </div>
        )}
      </section>
      <section className="editorial">
        <div className="editorial-image">
          <StoreImage
            src="https://images.unsplash.com/photo-1473181488821-2d23949a045a?auto=format&fit=crop&w=1200&q=85"
            alt="Quiet moments outdoors, inspiration for the Everyday Edit"
            loading="lazy"
          />
          <span>THE MASCOT WAY</span>
        </div>
        <div className="editorial-copy">
          <p className="eyebrow">FEWER PIECES. MORE POSSIBILITIES.</p>
          <h2>
            Good style.
            <br />
            No overthinking.
          </h2>
          <p>
            We believe your favorite clothes should feel like you. So we focus
            on the things that matter: easy silhouettes, thoughtful details, and
            pieces that work beautifully together.
          </p>
          <Link className="button" href="/collections/everyday-edit">
            Explore the everyday edit <Icon name="arrow" />
          </Link>
          <Link className="underlined" href="/about">
            A little more about us ↗
          </Link>
        </div>
      </section>
      <section className="brand-note">
        <p className="eyebrow">MADE TO BE LIVED IN</p>
        <h2>
          For coffee runs. For slow Sundays.
          <br />
          For wherever your day takes you.
        </h2>
        <span>THAT’S THE MASCOT WAY.</span>
      </section>
      <Newsletter />
    </>
  );
}
