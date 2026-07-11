import { indexContent } from "@/data/index-content";
import type { Locale } from "@/data/site";
import type { IndexItem } from "@/types/index";

function localizeItem(item: IndexItem, locale: Locale): IndexItem {
  const copy = indexContent[locale][item.href];

  return {
    ...item,
    title: copy?.title ?? item.title,
    description: copy?.description ?? item.description,
    children: item.children?.map((child) => localizeItem(child, locale)),
  };
}

export function localizeIndexItems(
  items: IndexItem[],
  locale: Locale,
): IndexItem[] {
  return items.map((item) => localizeItem(item, locale));
}
