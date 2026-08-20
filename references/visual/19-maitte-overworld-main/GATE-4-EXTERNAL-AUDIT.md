# Maittê `idle-curious` — Gate 4 External Audit

**Status:** PASS

## Scope

External review of the Gate 3 implementation for:

`character.maitte.idle-curious`

Audit basis:

- authorized pre-build base: `5bd30bafc0220c44051a699738e2dba3a3fddfea`;
- Claude local implementation commit: `febc3b2c3742e6e808d71f715ce8e1ce7e9846cc`;
- Claude local documentation/build-validation follow-up: `dc60feead874753d7783b691bccefb07624133d4`;
- externally audited implementation patch SHA-256: `d567de2d67d6938d6c8a76c07e19a5b5460b72437ef314770fc958bbc16fb67f`.

The Claude-local SHAs are provenance only. Claude did not have remote push credentials, so the reviewed state was reconstructed on the remote feature branch through the GitHub connector and verified against the patch's final Git blob SHAs.

## Audit result

- restoration-raster reuse: **PASS**;
- exact runtime key promotion only: **PASS**;
- static full-restored direct-source invariant: **PASS**;
- breathing presentation hook: **PASS**;
- heart-localized pulse: **PASS**;
- deterministic approved-source blink structure: **PASS FOR RUNTIME VISUAL AUDIT**;
- reduced-motion structure: **PASS**;
- `listen-think` regression protection: **PASS**;
- companion / other Maittê state isolation: **PASS**;
- TypeScript: **PASS**;
- full test suite: **213/213 PASS**;
- ESLint regression: **ZERO NEW ERRORS / WARNINGS**;
- production build (`npm run build`): **PASS**, including client, SSR and Nitro/Cloudflare worker packaging;
- protected gameplay layers: **0-line diff**.

## Known non-blocking items carried forward

- glasses-mask precision remains a final-production cleanup item;
- `hairStreak` cleanup / small-scale readability remains a final-production cleanup item;
- independent hair / hairStreak secondary motion remains an explicit `MOTION-ASSET-GAP`;
- real-scale framing and motion tuning were intentionally deferred to Gate 5.

## Disposition

`GATE 4 EXTERNAL CODE / ASSET AUDIT — PASS`

This record does **not** authorize merge to `main` or final production promotion. Gate 5 isolated real-runtime review remains required.
