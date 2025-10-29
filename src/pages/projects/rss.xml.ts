import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { siteConfig } from "@/site.config";

export const GET = async () => {
  const projects = await getCollection("project");

  const items = projects
    .filter((p) => !!p.data.publishDate)
    .sort(
      (a, b) => (b.data.publishDate!.getTime() ?? 0) - (a.data.publishDate!.getTime() ?? 0),
    )
    .map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.publishDate!,
      link: `projects/${p.id}/`,
    }));

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: import.meta.env.SITE,
    items,
  });
};