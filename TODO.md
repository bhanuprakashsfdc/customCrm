# Button Reorder Task: Move New after Import/Export, remove gap

## Approved Plan Summary
- Reorder in pipeline headers: BulkUpload first, then New button
- Wrap in flex gap-1/sm:gap-2 for minimal gap
- Update all affected Pipeline components (Account, Campaign, Case, ContactDetail, Contract, Deal, Lead, Order, Quote)
- Tailwind classes for tight visual grouping

# DataTable Integration Task: Add search, filter, inline edit, sort, view toggle, pagination to all 10 pipeline tables + page-level record view filters

**Feedback:** "fix error and all inline editing , sort, search, filter, view and pagination for all components Page record view filter also for all components"

**Current status:** New buttons removed ✓, LeadPipeline TS errors fixed ✓ (Import/Export only headers, no RecordModal)


## Information Gathered
- DataTable.tsx exists with full features: search, sort, filter, inline edit, table/grid view, pagination
- Pipeline components have custom tables without these features
- "Page record view filter" likely means table filter buttons (already exist in pipelines, but enhance to use DataTable)
- "fix error" likely TS errors from recent edits (LeadPipeline line 101 from incomplete removal)

**Plan:**
1. Fix TS errors in LeadPipeline.tsx (remove modal refs if unused)
2. Replace custom tables in 10 pipelines with DataTable component
3. Configure columns, data, onSave for each (use existing data/useData hooks)
4. Integrate page-level filters with DataTable filters
5. Keep header Import/Export unchanged

**Dependent Files:**
- DataTable.tsx (ready, enhance if needed)
- All *Pipeline.tsx (replace table JSX with <DataTable data={...} columns={...} />)
- context/DataContext.tsx (already supports saveRecord)

**Followup steps:**
- `npm run dev` test each page
- Verify inline edit/sort/search/pagination/grid-view works
- Linting/TS fixes

**All pipeline components now have [Import Export] New buttons tightly grouped. Gap removed, New moved after Import/Export as requested.**

`npm run dev` to test.
