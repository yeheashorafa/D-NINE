import React from "react";
import { render, screen } from "@testing-library/react";
import { CustomPortableText } from "./portable-text";
import { describe, it, expect, vi } from "vitest";
import type { PortableTextBlock } from "@portabletext/types";

vi.mock("@/i18n/navigation", () => ({
  Link: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="internal-link">
      {children}
    </a>
  ),
}));

vi.mock("@/sanity/image", () => ({
  urlForImage: vi.fn(() => ({
    width: () => ({
      fit: () => ({
        url: () => "https://cdn.sanity.io/test-image.jpg",
      }),
    }),
  })),
}));

describe("CustomPortableText", () => {
  it("renders nothing when value is empty", () => {
    const { container } = render(<CustomPortableText value={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders headings and normal text correctly", () => {
    const value: PortableTextBlock[] = [
      {
        _type: "block",
        _key: "1",
        style: "h1",
        children: [{ _type: "span", _key: "1", text: "Heading 1" }],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "2",
        style: "normal",
        children: [{ _type: "span", _key: "2", text: "Normal text block" }],
        markDefs: [],
      },
    ];
    render(<CustomPortableText value={value} />);

    expect(screen.getByText("Heading 1").tagName).toBe("H1");
    expect(screen.getByText("Normal text block").tagName).toBe("P");
  });

  it("renders lists correctly", () => {
    const value: PortableTextBlock[] = [
      {
        _type: "block",
        _key: "1",
        style: "normal",
        listItem: "bullet",
        children: [{ _type: "span", _key: "1", text: "List item 1" }],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "2",
        style: "normal",
        listItem: "bullet",
        children: [{ _type: "span", _key: "2", text: "List item 2" }],
        markDefs: [],
      },
    ];
    render(<CustomPortableText value={value} />);

    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(2);
    expect(items[0].textContent).toBe("List item 1");
  });

  it("renders custom marks like internal and external links", () => {
    const value: PortableTextBlock[] = [
      {
        _type: "block",
        _key: "1",
        style: "normal",
        children: [
          { _type: "span", _key: "s1", text: "Click ", marks: [] },
          { _type: "span", _key: "s2", text: "external", marks: ["ext_link"] },
          { _type: "span", _key: "s3", text: " or ", marks: [] },
          { _type: "span", _key: "s4", text: "internal", marks: ["int_link"] },
        ],
        markDefs: [
          { _key: "ext_link", _type: "link", href: "https://example.com" },
          { _key: "int_link", _type: "link", href: "/about" },
        ],
      },
    ];
    render(<CustomPortableText value={value} />);

    const extLink = screen.getByText("external");
    expect(extLink.closest("a")).toHaveAttribute("href", "https://example.com");
    expect(extLink.closest("a")).toHaveAttribute("target", "_blank");

    const intLink = screen.getByText("internal");
    expect(intLink.closest("a")).toHaveAttribute(
      "data-testid",
      "internal-link",
    );
    expect(intLink.closest("a")).toHaveAttribute("href", "/about");
  });

  it("renders images using urlForImage", () => {
    const value: PortableTextBlock[] = [
      {
        _type: "image",
        _key: "img",
        alt: "Test Image",
        asset: {
          _type: "reference",
          _ref: "image-1234",
        },
      } as unknown as PortableTextBlock,
    ];
    render(<CustomPortableText value={value} />);

    const img = screen.getByAltText("Test Image");
    const src = img.getAttribute("src");

    expect(src).not.toBeNull();
    expect(decodeURIComponent(src ?? "")).toContain(
      "https://cdn.sanity.io/test-image.jpg",
    );
  });
});
