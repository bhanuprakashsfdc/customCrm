# Single-User Config with Region-Based Currency Implementation

## Completed Steps
- [x] Create TODO.md with implementation steps

## Pending Steps
## Completed Steps
- [x] Update server/routes.ts - Handle region in /api/config endpoints (already dynamic, test)
- [x] Implement per-user config (userId UNIQUE, UPSERT)
## Next Steps
1. Test: Login, change region/currency, verify DB has one record per userId, no new records created.
2. Run `npm run dev` to test frontend.


## Completed Steps
- [x] Update lib/currency.ts - Implement US/UK/IND specific formatting (100K US/UK, 1L IND)
- [x] Update Settings.tsx - Add region selector, dynamic currency options based on region

## Completed Steps
- [x] Update types/index.ts - Add region to Localization interface (added to ConfigContext)
- [x] Update default-config.json - Add region: "US" to localization
- [x] Update ConfigContext.tsx - Extend interfaces, load/save region
- [x] Update server/config.ts - Add region to Config/DB
- [x] Update server/database.ts or init-db.ts - Add region column to config table if needed

## Next Step
Proceed to step 1: Update types and default config.

