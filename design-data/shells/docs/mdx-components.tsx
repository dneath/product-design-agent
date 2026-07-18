import type { MDXComponents } from "mdx/types";

/* Element styling lives in app/docs.css (token-driven, scoped to .docs-prose).
   Map MDX elements to custom components here when a page needs them. */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
