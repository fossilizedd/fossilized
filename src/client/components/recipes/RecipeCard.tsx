import type { Recipe, RecipeCuisine } from "@/server/types/recipe";

const CUISINE_LABEL: Record<RecipeCuisine, string> = {
  american:      "American",
  chinese:       "Chinese",
  japanese:      "Japanese",
  italian:       "Italian",
  mexican:       "Mexican",
  french:        "French",
  thai:          "Thai",
  indian:        "Indian",
  mediterranean: "Mediterranean",
  korean:        "Korean",
  other:         "Other",
};

const CUISINE_BORDER: Record<RecipeCuisine, string> = {
  american:      "border-[rgba(200,120,24,0.40)] hover:border-[rgba(200,120,24,0.70)]",
  chinese:       "border-[rgba(24,88,152,0.40)]  hover:border-[rgba(24,88,152,0.70)]",
  japanese:      "border-[rgba(26,58,92,0.40)]   hover:border-[rgba(26,58,92,0.70)]",
  italian:       "border-[rgba(176,96,24,0.40)]  hover:border-[rgba(176,96,24,0.70)]",
  mexican:       "border-[rgba(40,104,72,0.40)]  hover:border-[rgba(40,104,72,0.70)]",
  french:        "border-[rgba(168,78,112,0.40)] hover:border-[rgba(168,78,112,0.70)]",
  thai:          "border-[rgba(40,104,72,0.40)]  hover:border-[rgba(40,104,72,0.70)]",
  indian:        "border-[rgba(176,96,24,0.40)]  hover:border-[rgba(176,96,24,0.70)]",
  mediterranean: "border-[rgba(24,88,152,0.30)]  hover:border-[rgba(24,88,152,0.60)]",
  korean:        "border-[rgba(168,78,112,0.40)] hover:border-[rgba(168,78,112,0.70)]",
  other:         "border-[rgba(42,80,130,0.25)]  hover:border-[rgba(42,80,130,0.50)]",
};

const ROLE_LABEL: Record<string, string> = {
  main: "main dish",
  side: "side dish",
  both: "main or side",
};

function linkLabel(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host.includes("youtube") || host.includes("youtu.be")) return "video";
    return host;
  } catch {
    return "link";
  }
}

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const cardBase =
    "rounded-[10px] p-[1.1rem] bg-[rgba(255,255,255,0.52)] border backdrop-blur transition hover:shadow-[0_4px_20px_rgba(0,0,0,0.14)]";

  return (
    <div className={`${cardBase} ${CUISINE_BORDER[recipe.cuisine]}`}>
      <h3 className="font-semibold text-mist text-sm leading-tight mb-1.5">{recipe.name}</h3>

      <p className="text-[11px] text-mist/50 mb-2.5 leading-none">
        {CUISINE_LABEL[recipe.cuisine]} · {ROLE_LABEL[recipe.role]}
      </p>

      {recipe.techniques.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2.5">
          {recipe.techniques.map((t) => (
            <span
              key={t}
              className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
              style={{
                background: "rgba(40,104,72,0.10)",
                color: "#286848",
                border: "1px solid rgba(40,104,72,0.28)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {recipe.notes && (
        <p className="text-[11px] text-mist/45 italic mb-2">{recipe.notes}</p>
      )}

      {recipe.links.length > 0 && (
        <div className="flex flex-col gap-0.5">
          {recipe.links.map((url, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-ocean hover:text-ocean/70 transition-colors"
            >
              ↗ {linkLabel(url)}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
