import { useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useFilterStore } from "@/store/filterStore";

export function SearchInput() {
  const { search, setSearch } = useFilterStore();
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 z-10 text-gray-400" />
      </div>
      <Input
        id="search-input"
        placeholder="Search..."
        className="pl-10 w-full"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-xs text-gray-400">
        <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded">
          ⌘K
        </kbd>
      </div>
    </div>
  );
}
