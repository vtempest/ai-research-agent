import { describe, expect, it } from "vitest";
import { defaultDocuments } from "../../src/documents/defaultDocuments";

const parse = (html: string) =>
  new DOMParser().parseFromString(html, "text/html").body;

describe("defaultDocuments", () => {
  it("gives every document a unique id", () => {
    const ids = defaultDocuments.map((doc) => doc.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("nests documents only under folders that exist", () => {
    const folders = new Set(
      defaultDocuments.filter((doc) => doc.isFolder).map((doc) => doc.id),
    );
    for (const doc of defaultDocuments) {
      if (doc.parentId !== null) expect(folders.has(doc.parentId)).toBe(true);
    }
  });

  it("opens each note with a heading that matches its title", () => {
    for (const doc of defaultDocuments.filter((doc) => !doc.isFolder)) {
      expect(parse(doc.content).querySelector("h1")?.textContent).toBe(doc.title);
    }
  });

  it("writes checklists in the shape the task list extension parses", () => {
    const items = defaultDocuments.flatMap((doc) => [
      ...parse(doc.content).querySelectorAll('li[data-type="taskItem"]'),
    ]);
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) {
      expect(item.parentElement?.getAttribute("data-type")).toBe("taskList");
      expect(["true", "false"]).toContain(item.getAttribute("data-checked"));
    }
  });

  it("gives every table row the same number of cells as its header", () => {
    const tables = defaultDocuments.flatMap((doc) => [
      ...parse(doc.content).querySelectorAll("table"),
    ]);
    expect(tables.length).toBeGreaterThan(0);
    for (const table of tables) {
      const widths = [...table.querySelectorAll("tr")].map((row) => row.cells.length);
      expect(new Set(widths).size).toBe(1);
    }
  });
});
