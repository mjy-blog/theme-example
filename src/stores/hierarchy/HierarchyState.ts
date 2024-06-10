export type HierarchyNode = [name: string, value: HierarchyValue];

export type HierarchyValue =
  | { type: "post" }
  | { type: "category"; sub?: HierarchyNode[] };

export interface HierarchyState {
  nodes: HierarchyNode[];
}
