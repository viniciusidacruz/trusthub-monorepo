import { createAccessControl } from "better-auth/plugins/access";

const statements = {
  company: [
    "view-directory",
    "view-own",
    "update-profile",
    "configure-channels",
  ],
  feedback: [
    "create",
    "list-public",
    "list-company",
    "respond",
    "assign",
    "view-own-history",
  ],
  suggestions: ["view"],
  analytics: ["view-limited", "view-full"],
  contacts: ["view-public"],
  collaborators: ["list", "invite", "update", "remove"],
} as const;

export const accessControl = createAccessControl(statements);

export const adminRole = accessControl.newRole({
  company: ["view-own", "update-profile", "configure-channels"],
  feedback: ["list-company", "respond", "assign"],
  suggestions: ["view"],
  analytics: ["view-full"],
  contacts: ["view-public"],
  collaborators: ["list", "invite", "update", "remove"],
});

export const userRole = accessControl.newRole({
  company: ["view-directory"],
  feedback: ["create", "list-public", "view-own-history"],
  suggestions: [],
  analytics: [],
  contacts: ["view-public"],
  collaborators: [],
});

export const permissionStatements = statements;
export type PermissionStatements = typeof statements;
export type PermissionResource = keyof PermissionStatements;
