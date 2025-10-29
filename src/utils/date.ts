import type { CollectionEntry } from "astro:content";
import { siteConfig } from "@/site.config";

export function getFormattedDate(
    date: Date | undefined,
    options?: Intl.DateTimeFormatOptions,
    locale?: string | string[] | undefined,
): string {
    if (date === undefined) {
        return "Invalid Date";
    }

    const resolvedLocale = locale ?? siteConfig.date.locale;

    return new Intl.DateTimeFormat(resolvedLocale, {
        ...(siteConfig.date.options as Intl.DateTimeFormatOptions),
        ...options,
    }).format(date);
}

export function collectionDateSort(
	a: CollectionEntry<"post" | "note">,
	b: CollectionEntry<"post" | "note">,
) {
	return b.data.publishDate.getTime() - a.data.publishDate.getTime();
}
