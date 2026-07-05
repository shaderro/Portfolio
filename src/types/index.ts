/** A single row in the portfolio index (projects page & selected work). */
export interface IndexItem {
  title: string;
  description: string;
  tags: string[];
  href: string;
  year?: string;
  meta?: string;
  collapsible?: boolean;
  optional?: boolean;
  children?: IndexItem[];
}
