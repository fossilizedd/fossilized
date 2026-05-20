# Agents

## almanac-researcher

Verifies and improves a single item in `src/server/data/almanac.json`.

**Invoke:** `@almanac-researcher <item-id>` — e.g. `@almanac-researcher walleye`

Returns a JSON patch with updated `origin`, `months`, `peakMonths`, `description`, and `notes`,
plus a `sources` list and a `flags` list for anything that needs human review.

Full instruction set: [.base/almanac-researcher.md](.base/almanac-researcher.md)
