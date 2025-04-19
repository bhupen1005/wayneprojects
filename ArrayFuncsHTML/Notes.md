Detecting user-made changes efficiently in large data tables (like those powered by TanStack Table) requires a strategy that balances performance, accuracy, and scalability.

Here’s an optimized approach for detecting changes (edits) without deep comparison on every re-render:

✅ Optimized Strategy Overview
🔧 Step-by-Step:

Keep original data snapshot on load (for comparison).

Track changes as they happen, instead of comparing entire data.

Use a Map or object keyed by row ID to store only changed rows.

On save or action, compare only the changed rows using _.isEqual() or shallow checks.

