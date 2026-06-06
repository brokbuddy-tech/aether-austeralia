"use client";

import { ReviewCarousel } from "@/components/review-carousel";
import { normalizePublicTestimonials } from "@/lib/reviews";
import { replaceTemplateBranding } from "@/lib/public-site";

type TestimonialSlide = {
  id: string;
  quote: string;
  author: string;
  meta: string;
  avatar?: string | null;
  badgeLabel?: string | null;
  message?: string | null;
  clientName?: string | null;
  name?: string | null;
  location?: string | null;
  property?: string | null;
  image?: string | null;
  imageUrl?: string | null;
};

export default function TestimonialSlider({
  agencyName = "Agency Website",
  testimonials = [],
}: {
  agencyName?: string;
  testimonials?: TestimonialSlide[];
}) {
  const reviews = normalizePublicTestimonials(testimonials).map((review) => ({
    ...review,
    quote: replaceTemplateBranding(review.quote, agencyName),
  }));

  return (
    <ReviewCarousel
      title="What Our Clients Say"
      description={`Real feedback from clients who trusted ${agencyName} with their next move.`}
      items={reviews}
      variant="light"
    />
  );
}
