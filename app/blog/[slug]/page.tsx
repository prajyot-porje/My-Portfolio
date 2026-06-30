import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient from "@/components/ui/BlogPostClient";
import { blogs } from "@/lib/data/blogs";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogs.find((p) => p.slug === slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const ogImageUrl = `/api/og?title=${encodeURIComponent(post.title)}&readTime=${encodeURIComponent(post.readTime)}`;

  return {
    title: `${post.title} — Blog — Prajyot Porje`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} — Blog — Prajyot Porje`,
      description: post.excerpt,
      type: "article",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — Blog — Prajyot Porje`,
      description: post.excerpt,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogs.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    // Google prefers ISO 8601 but accepts descriptive strings.
    // We provide standard properties.
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Prajyot Porje",
      url: "https://www.prajyotporje.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Prajyot Porje",
      logo: {
        "@type": "ImageObject",
        url: "https://www.prajyotporje.in/images/profile/new.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.prajyotporje.in/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: injecting static generated JSON-LD schema is safe
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient post={post} />
    </>
  );
}
