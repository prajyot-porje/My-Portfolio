import type { Metadata } from "next";
import BlogListClient from "@/components/ui/BlogListClient";
import { blogs } from "@/lib/data/blogs";

export const metadata: Metadata = {
  title: "Blog — Prajyot Porje",
  description:
    "Engineering logs, SaaS execution, and product engineering insights from Prajyot Porje.",
  openGraph: {
    title: "Blog — Prajyot Porje",
    description:
      "Engineering logs, SaaS execution, and product engineering insights from Prajyot Porje.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Prajyot Porje",
    description:
      "Engineering logs, SaaS execution, and product engineering insights from Prajyot Porje.",
  },
};

export default function BlogPage() {
  return <BlogListClient blogs={blogs} />;
}
