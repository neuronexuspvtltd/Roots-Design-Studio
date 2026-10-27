"use client";

import React from "react";
import Image from "next/image";
import { InstagramPost, SiteSettings } from "@/types";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/common/InstagramIcon";

interface InstagramFeedProps {
  settings?: SiteSettings | null;
}

export const InstagramFeed: React.FC<InstagramFeedProps> = ({ settings }) => {
  const posts: InstagramPost[] = settings?.instagramPosts || [];
  const handle = settings?.instagramHandle || "@rootsdesignstudio";
  const url = settings?.instagramUrl || "https://instagram.com";

  if (posts.length === 0) return null;

  return (
    <section className="py-24 sm:py-32 bg-ivory text-charcoal border-t border-stone-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center space-x-3 mb-4">
              <InstagramIcon className="w-4 h-4 text-olive" />
              <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium">
                Visual Diary
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-charcoal">
              More from Our World
            </h2>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 sm:mt-0 inline-flex items-center space-x-2 text-xs uppercase tracking-luxury font-medium text-charcoal border-b border-charcoal pb-1 hover:text-olive hover:border-olive transition-colors group"
          >
            <span>Follow {handle}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* 4-Column Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.postUrl || url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-stone-border/20 block"
              aria-label={post.caption || "Instagram photograph"}
            >
              <Image
                src={post.imageUrl}
                alt={post.caption || "Roots Design Studio Instagram post"}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-colors duration-300 flex items-center justify-center p-4">
                <InstagramIcon className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
