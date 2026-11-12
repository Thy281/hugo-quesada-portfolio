type ContributionDay = {
  date: string;
  count: number;
  level: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export async function GET() {
  try {
    const response = await fetch("https://github.com/users/Thy281/contributions", { next: { revalidate: 300 } });

    if (!response.ok) {
      return Response.json({ days: [] }, { status: 502 });
    }

    const html = await response.text();
    const cells = new Map<string, Omit<ContributionDay, "count">>();

    for (const [, attributes] of html.matchAll(/<td\b([^>]*)>/g)) {
      const getAttribute = (name: string) => attributes.match(new RegExp(`(?:^|\\s)${name}="([^"]+)"`))?.[1];
      const id = getAttribute("id");
      const date = getAttribute("data-date");
      const index = Number(getAttribute("data-ix"));
      const level = Number(getAttribute("data-level"));
      const cellPosition = id?.match(/contribution-day-component-(\d+)-(\d+)/);

      if (!attributes.includes("ContributionCalendar-day") || !date || !cellPosition || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        continue;
      }

      const row = Number(cellPosition[1]);
      if (!Number.isInteger(index) || index < 0 || !Number.isInteger(level) || level < 0 || level > 4 || row < 0 || row > 6) {
        continue;
      }

      cells.set(id as string, {
        date,
        level,
        x: 27 + index * 12,
        y: 20 + row * 12,
        width: 10,
        height: 10
      });
    }

    const daysByDate = new Map<string, ContributionDay>();
    for (const [, attributes, tooltipContent] of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)) {
      const cellId = attributes.match(/(?:^|\s)for="([^"]+)"/)?.[1];
      const cell = cellId ? cells.get(cellId) : undefined;
      const text = tooltipContent.replace(/<[^>]+>/g, "").trim();
      const count = text.match(/^(\d+)\s+contributions?\s+on\b/)?.[1];
      const isZero = /^No contributions on\b/.test(text);

      if (cell && (count !== undefined || isZero)) {
        daysByDate.set(cell.date, { ...cell, count: count === undefined ? 0 : Number(count) });
      }
    }

    const days = Array.from(daysByDate.values());
    if (days.length === 0) {
      return Response.json({ days: [] }, { status: 502 });
    }

    return Response.json({ days });
  } catch {
    return Response.json({ days: [] }, { status: 502 });
  }
}
