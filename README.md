# automation-scenario-spec

Canonical machine-readable specification for automation scenarios used to generate executable flows and human-facing guide artifacts.

## Overview

This repository defines the shared scenario format that acts as the single source of truth for:

- Robot Framework suite generation
- Markdown guide generation
- Annotated screenshot/video generation

## Versioning

- Current schema version: `2.0.0`
- Backward compatibility with `1.x` is intentionally not provided.

## Schema

- JSON Schema: `schema/scenario.schema.json`
- Example scenarios:
  - `examples/unity-basic.scenario.json`
  - `examples/web-basic.scenario.json`
  - `examples/unity-cross-project.scenario.json`

## 2.0.0 Focus

`2.0.0` is designed for Power Automate style growth while staying practical in real projects:

- variable-first reuse across projects/environments,
- profile-based value overrides without scenario duplication,
- action/control/group step model for advanced flow composition,
- explicit selector strategies (`uia`, `web`, `unity_hierarchy`, `image`, `coordinate`),
- first-class annotation metadata for markdown/image/video rendering.

Design document:

- `docs/plans/2026-02-15-power-automate-style-scenario-v2-design.md`

## Core Fields

- `schema_version`: spec version string (`2.0.0`)
- `scenario_id`: stable id (slug)
- `name`: display title
- `target`: `unity` | `web` | `desktop` | `hybrid`
- `variables[]`: reusable runtime inputs
- `profiles`: named variable sets for project/environment differences
- `execution`: execution defaults and attach/launch options
- `outputs`: markdown/image/video/trace generation options
- `steps[]`: ordered action/control/group steps

## Validation

Use your preferred JSON Schema validator against `schema/scenario.schema.json`.

## Links

- License: `LICENSE`
- Changelog: `CHANGELOG.md`
