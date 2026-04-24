"use client";

import { create } from "@orama/orama";
import { createTokenizer } from "@orama/tokenizers/mandarin";
import { useDocsSearch } from "fumadocs-core/search/client";
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from "fumadocs-ui/components/dialog/search";
import { Search } from "lucide-react";
import { useCallback, useState } from "react";

export default function DefaultSearchDialog(props: SharedProps) {
  const [open, setOpen] = useState(false);

  const { search, setSearch, query } = useDocsSearch({
    type: "fetch",
    api: "/api/search",
    delayMs: 100,
    allowEmpty: true,
  });

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-fd-foreground transition hover:bg-fd-accent/10 hover:text-fd-accent-foreground"
      >
        <Search className="size-5" />
      </button>

      <SearchDialog
        open={open}
        onOpenChange={setOpen}
        search={search}
        onSearchChange={setSearch}
        isLoading={query.isLoading}
        {...props}
      >
        <SearchDialogOverlay />
        <SearchDialogContent>
          <SearchDialogHeader>
            <SearchDialogIcon />
            <SearchDialogInput autoFocus />
            <SearchDialogClose />
          </SearchDialogHeader>
          <SearchDialogList items={query.data !== "empty" ? query.data : null} />
        </SearchDialogContent>
      </SearchDialog>
    </>
  );
}
