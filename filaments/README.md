# G1X Filaments — public web demo

Standalone, bilingual FR/EN demo at `/filaments/`, linked from the existing Projects section. The main navigation, section order, official logo and existing home-page styles are preserved.

## What works
- Mobile camera capture / image picker and on-device image OCR using Tesseract.js 6.0.1.
- A generated fictional label is processed through the same OCR pipeline as an uploaded photo.
- Explicit selection of catalogue suggestions, editable review form and manual entry for any brand.
- Local inventory, per-entry editing/removal, search, quantity and known-value totals in CAD.
- JSON export/import. Missing prices remain unknown; they are never guessed.
- A limited five-reference catalogue (Bambu Lab PLA Silk+ Gold 13405 / Silver 13109, PLA Basic Gold 10401, PLA Translucent Blue 13611 / Mellow Yellow 13410). Approximate colour swatches are illustrative, not calibrated colour measurements.

## Privacy and boundaries
Photos stay in browser memory, are not uploaded and are not saved in inventory exports. Local storage contains only the fields explicitly confirmed by the visitor. No analytics, account, payment, private inventory, machine address, credential, MCP connection or backend was added.

The OCR engine is downloaded from jsDelivr on demand; it downloads its worker, WebAssembly core and English language model using Tesseract.js defaults. A network connection is needed for the initial download; this is not a fully offline PWA. Third-party asset hosts receive normal asset-request metadata, not the photo. Recognition is fallible and has to be checked by the visitor. No universal barcode database or barcode decoder is included.

Local browser storage is not a backup or multi-device sync. The UI provides JSON exports and reports storage errors. Imports are validated before replacement and request confirmation when existing entries would be replaced. Test this demo on real iPhone / Android cameras before claiming device certification.

The demo is separate from any future native application using ML Kit. G1X-Control and HueForge integration have not been implemented. No TD is inferred from a label.

## Development
Serve the repository with a static HTTP server. No build or server dependency is needed.

`node --test filaments/tests/engine.test.cjs`

Tesseract.js: https://github.com/naptha/tesseract.js (Apache-2.0).
The five-reference catalogue can be expanded in `engine.js`, with manufacturer/variant validation. Unknown or multiple references never silently create an inventory entry.

## Release safety
The entire pre-demo main branch is preserved in `backup/site-avant-filaments-20260924` at commit `b934ebdcaa191a1e25922add85f9a7e5af816459`.
Only the demo directory, a Projects card in `index.html`, and three FR/EN home-page strings are changed. The separate Atelier/navigation draft is not included.
