# Power Automate Style Scenario v2 Design

## Goal

Define a variable-first, project-reusable automation scenario specification that can serve as a single source of truth for:

- executable automation (web + desktop + Unity Editor),
- guidebook markdown generation,
- annotated screenshot/video generation,
- future low-code visual editor workflows.

This design intentionally avoids first-class template inheritance as a core feature. Reuse is achieved through variables, profiles, and composable control steps.

## Non-goals

- No hard dependency on a specific runtime engine.
- No mandatory cloud/backend service.
- No required template marketplace system.

## Design Principles

1. Variable-first reuse over copy-and-paste scenario forks.
2. Runtime-portable: one spec can target multiple engines/adapters.
3. Deterministic outputs: same scenario + same input variables => same behavior.
4. Progressive capability: simple recording flows remain valid while advanced control flow can be added incrementally.
5. Explicit evidence and annotation metadata are first-class outputs.

## High-level Architecture

The v2 scenario document contains these layers:

- `scenario header`: identity, metadata, compatibility.
- `variables`: reusable runtime parameters with validation.
- `profiles`: named variable sets for project/environment differences.
- `execution defaults`: attach/launch behavior, retries, timeout policies.
- `outputs`: markdown/video/screenshot generation preferences.
- `steps`: action/control/group steps with explicit structure.

The same v2 file is expected to be consumed by:

- runtime adapter (execute),
- renderer (markdown/image/video),
- studio/editor (record/edit/run/export).

## Variable System (Core Reuse Mechanism)

`variables[]` defines typed inputs (`string`, `number`, `boolean`, `path`, `url`, `enum`, `json`, etc.).

Each variable supports:

- `required`,
- `default`,
- validation constraints (`pattern`, min/max, length),
- runtime binding hints (`env`, `cli_arg`, `profile_key`),
- prompt metadata (`title`, `description`, `masked`).

Resolution order:

1. explicit runtime input,
2. selected profile values,
3. scenario defaults.

If a required variable remains unresolved, execution fails before step 1.

## Profiles (Project-specific Differences)

`profiles` stores named variable value sets, e.g.:

- `ryuon-dev`,
- `ryuon-prod`,
- `sample-avatar`.

Profiles make a scenario reusable across projects without duplicating steps.
The base scenario stays generic while only variable values differ.

## Step Model

v2 step kinds:

- `action`: executable operation (`click`, `drag_drop`, `select_hierarchy`, `type_text`, ...).
- `control`: flow operators (`if`, `for_each`, `while`, `try`, `parallel`, `break`, `continue`, `return`).
- `group`: logical grouping with nested steps.

Each step supports:

- stable `id`,
- human-facing `title` / `description`,
- optional `condition`,
- optional `disabled`,
- optional `continue_on_error`,
- optional `annotations` metadata for media rendering.

## Selector Model

A selector is explicit and typed by strategy:

- `uia` (desktop UI automation),
- `web` (css/xpath/role selectors),
- `unity_hierarchy` (hierarchy path targeting),
- `image` (vision fallback),
- `coordinate` (last-resort fallback).

Selector chaining (`fallbacks[]`) is supported so recorded flows can still execute when one strategy is unstable.

## Reliability and Timing

Each action step can define:

- `timing` (`timeout_seconds`, `poll_interval_seconds`, `stability_ms`),
- `retry` (`attempts`, `interval_seconds`, `on`),
- `expect` postconditions.

This enables Power Automate-like robustness without embedding opaque sleeps everywhere.

## Annotation and Guide Outputs

`annotations[]` are normalized rendering instructions (box/arrow/label/pulse/number badge).
Renderers consume this metadata for:

- markdown step images,
- recorded videos with overlays,
- future interactive guide playback.

`outputs` config controls target artifacts:

- markdown generation settings,
- screenshot settings,
- video settings,
- execution trace/evidence settings.

## Compatibility Strategy

- `2.0.0` is the production schema.
- `1.x` compatibility is intentionally removed.
- Migration from `1.x` should be handled by conversion tooling, not runtime fallback.

## Why No Template Feature in Core

Template systems often become a second language with low long-term usage.
This design treats:

- variables,
- profiles,
- group/control composition,

as the practical reuse primitives with lower maintenance and better transparency.

If template UX is needed later, it should be implemented as an editor convenience that produces normal v2 scenario files.

## Validation and Execution Guarantees

A scenario is executable only when:

1. schema validation passes,
2. all required variables are resolved,
3. runtime adapter supports all referenced actions/selectors.

When unsupported features are present, adapters must fail fast with explicit diagnostics.
