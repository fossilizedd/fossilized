# Recipe Input Guide

How to add a recipe you know to `src/server/data/recipes.json`.

---

## The shape

```json
{
  "id": "miso-glazed-salmon",
  "name": "Miso Glazed Salmon",
  "cuisine": "japanese",
  "role": "main",
  "techniques": ["roast", "saute"],
  "links": ["https://..."],
  "notes": "optional freeform note"
}
```

---

## Step-by-step

### 1 · Pick a name and ID

- `name` — the name you use when you think of the dish, exactly as you'd say it.
- `id` — lowercase kebab-case version: `"miso-glazed-salmon"`. No spaces, no special characters.

### 2 · Cuisine

Pick the single best-fit value from this list:

| Value | When to use |
|---|---|
| `american` | Classic American, comfort food, BBQ |
| `chinese` | Chinese regional styles |
| `japanese` | Japanese, including fusion |
| `italian` | Italian and Italian-American |
| `mexican` | Mexican and Tex-Mex |
| `french` | French classical and bistro |
| `thai` | Thai |
| `indian` | Indian and South Asian |
| `mediterranean` | Greek, Lebanese, Levantine |
| `korean` | Korean |
| `other` | Anything that doesn't fit cleanly |

If the dish spans cuisines (e.g. Japanese-Italian fusion), pick whichever feels dominant, then note the other in `notes`.

### 3 · Role

| Value | Meaning |
|---|---|
| `main` | Usually the centerpiece of the meal |
| `side` | Usually served alongside a main |
| `both` | Genuinely works either way |

### 4 · Techniques

List the cooking methods actually used, ordered from most prominent to least. Pick from:

`roast` `braise` `saute` `steam` `grill` `fry` `bake` `boil` `simmer` `stir-fry` `poach` `smoke` `raw` `ferment` `pressure-cook`

- A stir-fry with a quick steam at the end → `["stir-fry", "steam"]`
- A cold pasta salad → `["boil", "raw"]`
- A braise that starts with a sear → `["braise", "saute"]`

If none of the values fit, use the closest one and add a note in `notes`.

### 5 · Links

Zero or more URLs. Can be:

- A YouTube video you follow
- A blog post or article
- A cookbook page (if accessible online)

Leave the array empty `[]` if you have no reference link.

### 6 · Notes (optional)

One or two sentences about what makes your version of this recipe distinct, any substitutions you typically make, or why it's in your rotation.

---

## Prompts to fill in missing information

When you have a dish in mind but aren't sure how to categorize it, work through these questions:

**Cuisine:**
> "What country or region does this dish come from? What culinary tradition is it most associated with?"

**Role:**
> "If you're hosting dinner, would this be the thing people came for, or would it sit beside the main thing? Could it do both?"

**Techniques:**
> "Walk through the cooking process step by step. At each step, what physical transformation is happening — heat from dry air, from fat, from steam, from liquid?"

**Links:**
> "Is there a specific video or recipe online that you use or that best matches how you make it?"

**Notes:**
> "What's the one thing about how *you* make this that you'd want to remember or tell someone?"

---

## Adding to the JSON file

Open `src/server/data/recipes.json`. The file is an array. Append a new object inside the `[…]`:

```json
[
  { ...existing recipes... },
  {
    "id": "your-new-recipe",
    "name": "Your New Recipe",
    "cuisine": "american",
    "role": "main",
    "techniques": ["roast"],
    "links": [],
    "notes": ""
  }
]
```

Remove `"notes": ""` if you have nothing to say — the field is optional.

---

## Batch input via prompt

If you want to add several recipes at once, describe each one in plain language and ask Claude to translate them:

> I know how to make the following dishes. Convert each one to the recipe JSON shape. Ask me any clarifying questions before writing the JSON.
> 1. Shakshuka — Middle Eastern eggs poached in tomato sauce, usually a brunch main
> 2. Roasted broccoli — simple side, oven at high heat
> 3. …
