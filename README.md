# automation-scenario-spec

Canonical machine-readable specification for automation scenarios used to generate executable flows and human-facing guide artifacts.

## Overview

This repository defines the shared scenario format that acts as the single source of truth for:

- Robot Framework suite generation
- Markdown guide generation
- Annotated screenshot/video generation

## Versioning

- Current schema version: `1.0.0`
- Backward-incompatible changes require a new major version.

## Schema

- JSON Schema: `schema/scenario.schema.json`
- Example scenarios:
  - `examples/unity-basic.scenario.json`
  - `examples/web-basic.scenario.json`

## Core Fields

- `schema_version`: spec version string (`1.0.0`)
- `scenario_id`: stable id (slug)
- `name`: display title
- `target`: `unity` or `web`
- `metadata`: target/runtime-specific options
- `steps[]`: ordered automation steps

## Validation

Use your preferred JSON Schema validator against `schema/scenario.schema.json`.

## Links

- License: `LICENSE`
- Changelog: `CHANGELOG.md`
