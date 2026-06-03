import { useState } from "react";

type TreeNode = { name: string; children?: TreeNode[] };

function TreeItem({
  node,
  depth,
  selected,
  onSelect,
}: {
  node: TreeNode;
  depth: number;
  selected: string | null;
  onSelect: (path: string) => void;
}) {
  const hasChildren = node.children && node.children.length > 0;
  const [open, setOpen] = useState(depth < 2);

  if (hasChildren) {
    return (
      <li>
        <span
          onClick={() => setOpen(!open)}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          {open ? "▾" : "▸"} {node.name}
        </span>
        {open && (
          <ul>
            {node.children!.map((child) => (
              <TreeItem
                key={child.name}
                node={child}
                depth={depth + 1}
                selected={selected}
                onSelect={onSelect}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  const fullPath = node.name.endsWith(".tsx") || node.name.endsWith(".ts") || node.name.endsWith(".css")
    ? `src/.../${node.name}`
    : node.name;

  return (
    <li
      className={selected === fullPath ? "selected" : ""}
      onClick={() => onSelect(fullPath)}
    >
      {node.name}
    </li>
  );
}

export function FileTree({
  tree,
  selected,
  onSelect,
}: {
  tree: TreeNode[];
  selected: string | null;
  onSelect: (path: string) => void;
}) {
  return (
    <ul className="file-tree">
      {tree.map((node) => (
        <TreeItem
          key={node.name}
          node={node}
          depth={0}
          selected={selected}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}
