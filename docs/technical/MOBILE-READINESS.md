# Mobile Readiness

**Status:** PROVISIONAL/FUTURE. Web/tablet remains the active MVP runtime. No mobile packaging or native rewrite is authorized by this document.

## Purpose

Record the current direction for preserving future Android/iOS options without destabilizing the active React/web architecture.

## Current runtime authority

**DECIDED for current MVP:**

- React/web presentation remains the active runtime;
- tablet landscape is the primary child-facing target;
- desktop remains supported;
- the existing domain/evaluation/persistence boundaries remain platform-neutral wherever practical.

An IDE or coding agent is not part of the product architecture. GitHub + approved Specs/ADRs + approved assets remain the source of truth regardless of whether implementation work is performed in Claude Code, Lovable, Antigravity or another environment.

## Provisional mobile direction

**PROVISIONAL:** if Android/iOS packaging becomes a product requirement, evaluate a Capacitor-style wrapper around the existing web runtime before considering a React Native/Expo rewrite.

Rationale:

- the current presentation stack already uses React DOM, SVG/HTML/CSS and web-suitable authored assets;
- Step 1 established a replaceable presentation/asset seam without changing domain logic;
- a web-wrapper approach can preserve most current rendering/interaction behavior and reduce migration cost;
- this keeps native packaging separate from curriculum/evaluator/persistence semantics.

This is not a commitment to Capacitor as the final shipping technology. It is the first migration path to evaluate.

## Renderer independence

**DECIDED:** logical asset identity must not be coupled to one physical renderer.

Current mapping may be:

`logical key -> IllustrationAsset -> React/web renderer`

A future native implementation may introduce another presentation renderer if needed while preserving the same domain-side identity and progression facts.

If future evidence shows that native UI, device integration or performance requirements cannot be met acceptably by a wrapped web runtime, a separate native presentation layer may be proposed through a new ADR/Spec review.

## Constraints for current visual production

Current production work should:

- use stable logical asset keys;
- avoid putting physical asset paths into educational/domain schemas;
- prefer web-suitable transparent/layer-compatible exports where visual quality permits;
- preserve reliable touch interaction;
- avoid assumptions that only mouse/hover interactions exist;
- preserve reduced-motion/accessibility fallbacks;
- avoid adding native-specific dependencies merely for speculative future use.

## Explicit non-scope

This document does NOT authorize:

- Capacitor installation;
- Android Studio/Xcode configuration;
- app-store packaging;
- native plugins;
- React Native/Expo migration;
- push notifications;
- native authentication;
- mobile-specific persistence redesign;
- separate native UI implementation.

Those require an explicit future build gate.

## Decision trigger

Revisit the mobile architecture when one or more of these become concrete requirements:

- store-distributed Android/iOS builds;
- offline/device APIs beyond ordinary browser capabilities;
- platform-specific integrations;
- measurable performance issues in the wrapped web approach;
- UX requirements that cannot be satisfied acceptably by the web presentation stack.

Until then, mobile readiness means preserving architectural optionality, not migrating the application.