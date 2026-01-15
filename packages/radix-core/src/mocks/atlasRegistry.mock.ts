import type { AtlasOperator } from "../domain/atlas";
import type { Workflow } from "../domain/workflows";

export interface AtlasRegistryMock {
  operators: AtlasOperator[];
  workflows: Workflow[];
}

export const ATLAS_REGISTRY_MOCK: AtlasRegistryMock = {
  operators: [
    {
      id: "op_devexec01",
      name: "Atlas — Dev Executor (DH Standard)",
      role: "Development execution: repo-safe plans + full-file outputs",
      status: "ready",
      description:
        "Produces branch-safe implementation steps, full-file code outputs, and PR hygiene aligned to DH standards. No secrets. No invented paths.",
      scopeTags: ["engineering", "repo", "pr_hygiene", "implementation"],
      expectedInputs: [
        "Repo tree and target file contents",
        "WorkItem scope + acceptance criteria",
        "Constraints (security, layering, cadence)",
      ],
      expectedOutputs: [
        "Repo-safe implementation plan",
        "Full-file outputs with explicit file paths",
        "PR plan + acceptance criteria",
      ],
      masterPrompt: {
        kind: "note",
        ref: "Canonical prompt lives in ChatGPT GPT configuration (consider adding repo_path later).",
        version: "v1",
      },
      updatedAt: "2026-01-14T22:10:00.000Z",
    },
    {
      id: "op_productops01",
      name: "Atlas — Product & Ops",
      role: "OpsOS / RadixOS product ops: cadence, rituals, WorkItems",
      status: "draft",
      description:
        "Helps define RadixOS objects, operating cadence, WIP, and decision hygiene.",
      scopeTags: ["ops", "cadence", "radixos", "workitems"],
      expectedInputs: [
        "Current state",
        "Constraints",
        "Desired operating rhythm",
      ],
      expectedOutputs: [
        "WorkItem definitions",
        "Decision templates",
        "Ritual checklists",
      ],
      masterPrompt: {
        kind: "note",
        ref: "Add master prompt ref later.",
        version: "v1",
      },
      updatedAt: "2026-01-14T22:12:00.000Z",
    },
  ],

  workflows: [
    {
      id: "wf_radixosbuild01",
      name: "RadixOS Feature Development (v1)",
      status: "ready",
      description:
        "Standard chain for building RadixOS: spec → repo-safe plan → implementation → PR hygiene → dogfood loop.",
      tags: ["radixos", "engineering", "cadence"],
      outputs: [
        "Merged PR",
        "Dogfood-ready UI surface",
        "Updated mocks + rituals",
      ],
      steps: [
        {
          id: "wfs_001",
          order: 1,
          operatorId: "op_productops01",
          purpose:
            "Clarify WorkItem scope and acceptance criteria aligned to RadixOS objects.",
          requiredInputs: ["Goal", "Constraints", "Cadence/WIP limits"],
          produces: ["WorkItem spec", "Acceptance criteria"],
          promptTemplate: {
            title: "WorkItem framing",
            body: "Define the WorkItem using RadixOS objects (WorkItem/Decision/HealthCheck/Cadence). Provide acceptance criteria and WIP impact.",
          },
        },
        {
          id: "wfs_002",
          order: 2,
          operatorId: "op_devexec01",
          purpose:
            "Generate repo-safe implementation plan and full-file outputs.",
          requiredInputs: [
            "Repo tree",
            "Target file contents",
            "WorkItem spec",
          ],
          produces: ["Branch plan", "Full-file outputs", "PR plan"],
          promptTemplate: {
            title: "Repo-safe execution",
            body: "Produce full-file outputs only. Do not invent paths. Provide branch setup, implementation steps, local checks, git workflow, and PR description.",
          },
        },
      ],
      updatedAt: "2026-01-14T22:15:00.000Z",
    },
  ],
};
