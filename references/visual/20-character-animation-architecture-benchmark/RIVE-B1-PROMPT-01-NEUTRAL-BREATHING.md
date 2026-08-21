# Rive B1 Prompt 01 — Neutral Fidelity + Grounded Breathing

Use this prompt in the Rive in-editor AI Agent **after importing** the approved raster source:

`references/visual/12-maitte-character-master/MAITTE_MASTER_APPROVED.png`

Do not proceed to hair, arm, blink, heart, restoration or runtime integration in this prompt.

---

## Prompt for Rive AI Agent

We are running a controlled character-animation architecture benchmark.

The imported raster image `MAITTE_MASTER_APPROVED.png` is the immutable approved visual identity of the character.

DO NOT redraw, restyle, recolor, regenerate, crop, replace, reinterpret or vector-trace the character.

Do not create a new character image.

Do not use a whole-image translation or bobbing animation as a substitute for breathing.

Goal of this proof:

1. preserve the neutral imported raster visually unchanged at rest;
2. create one subtle grounded breathing animation by deforming only local raster-mesh vertices;
3. keep both feet/shoes visually fixed to the ground for the entire loop.

Work in Design mode for setup and create only one proof timeline named:

`idle-breathing-proof`

### Neutral setup

- Use the imported raster at its original aspect ratio.
- Keep the character centered and upright.
- Do not animate the artboard, root image position, root group position, or global Y translation.
- The neutral/rest frame must reproduce the imported artwork without visible distortion.

### Mesh setup

Add a mesh directly to the raster image.

Use the minimum number of vertices necessary.

The feet, shoes, ankles, and lowest leg area are the fixed ground anchor and must not move.

Keep hips/skirt base nearly fixed.

Add enough local control around:

- lower torso / waist;
- upper torso / chest;
- shoulders.

Do not add facial, eye, hair or arm animation in this proof.

### Breathing motion

Create a slow looping breathing cycle of about 4 seconds.

The movement must read as a micro expansion/contraction of the torso, not as the whole character floating.

Requirements:

- zero root/image translateY animation;
- feet/shoes remain stationary;
- waist/hips remain nearly stationary;
- chest/shoulder mesh vertices may move only a few source pixels;
- a very small upward/outward expansion of the upper torso is acceptable;
- return exactly to the neutral mesh at the end of the cycle;
- use smooth natural easing, not bounce or elastic easing.

Suggested maximum starting amplitude at the 1024×1536 source scale:

- chest/shoulder vertical displacement: about 2–4 px;
- lateral chest expansion: about 1–3 px per side;
- feet/shoes displacement: exactly 0 px.

Prefer lower amplitude if the motion becomes visually obvious rather than subconscious.

### Validation

At the end, report:

1. whether you were able to add/edit a mesh directly on the imported raster;
2. whether the feet/shoe-region vertices remain fixed;
3. whether any global transform was animated;
4. what mesh regions/vertices were animated;
5. timeline duration and loop behavior;
6. any limitation that prevented true local mesh deformation.

If the AI Agent cannot directly create or edit the raster mesh in the current editor, DO NOT fake the requested result using whole-image translation/scaling.

Instead, stop and tell me the exact minimal manual Rive Editor actions required to create the mesh and key the breathing deformation.

Do not proceed beyond neutral fidelity + grounded breathing.
