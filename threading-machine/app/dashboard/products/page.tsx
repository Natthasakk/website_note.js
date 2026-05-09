import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";

export const metadata: Metadata = { title: "Products" };

export default function DashboardProductsPage() {
  const threading = products.filter((p) => p.category === "threading");
  const grooving = products.filter((p) => p.category === "grooving");

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 6 }}>
            Products
          </h1>
          <p style={{ fontSize: 15, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>
            {products.length} products · {threading.length} threading · {grooving.length} grooving
          </p>
        </div>
        <Link
          href="/dashboard/products/add"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#D70015",
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: 400,
            fontFamily: "'SF Pro Text', sans-serif",
            padding: "0 20px",
            height: 40,
            borderRadius: 8,
            border: "none",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Add Product
        </Link>
      </div>

      {/* Threading table */}
      <ProductTable title="Threading Machines" accentColor="#D70015" rows={threading} />

      <div style={{ marginTop: 32 }}>
        <ProductTable title="Grooving Machines" accentColor="#1D1D1F" rows={grooving} />
      </div>
    </div>
  );
}

function ProductTable({
  title,
  accentColor,
  rows,
}: {
  title: string;
  accentColor: string;
  rows: typeof products;
}) {
  return (
    <div>
      {/* Section heading */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ width: 3, height: 20, backgroundColor: accentColor, borderRadius: 2 }} />
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif" }}>
          {title}
        </h2>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            padding: "2px 8px",
            borderRadius: 10,
            backgroundColor: "#F5F5F7",
            color: "#86868B",
            fontFamily: "'SF Pro Text', sans-serif",
          }}
        >
          {rows.length}
        </span>
      </div>

      <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8ED", borderRadius: 20, overflow: "hidden", boxShadow: "0px 2px 8px rgba(0,0,0,0.06)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#F5F5F7", borderBottom: "1px solid #E8E8ED" }}>
              {["Product", "Pipe Range", "Price", "Status", "Meta Title", "Actions"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#86868B",
                    fontFamily: "'SF Pro Text', sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((product, idx) => (
              <tr key={product.id} style={{ borderBottom: idx < rows.length - 1 ? "1px solid #E8E8ED" : "none" }}>
                <td style={{ padding: "16px 16px" }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif" }}>
                    {product.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>
                    {product.series}
                  </div>
                </td>
                <td style={{ padding: "16px 16px", fontSize: 14, color: "#1D1D1F", fontFamily: "'SF Pro Text', sans-serif", whiteSpace: "nowrap" }}>
                  {product.pipeRange}
                </td>
                <td style={{ padding: "16px 16px", fontSize: 14, fontWeight: 600, color: "#D70015", fontFamily: "'SF Pro TH', sans-serif", whiteSpace: "nowrap" }}>
                  {product.price}
                </td>
                <td style={{ padding: "16px 16px" }}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 600,
                      backgroundColor: "rgba(52,199,89,0.12)",
                      color: "#28A745",
                      fontFamily: "'SF Pro Text', sans-serif",
                    }}
                  >
                    Published
                  </span>
                </td>
                <td style={{ padding: "16px 16px", maxWidth: 240 }}>
                  <div
                    style={{ fontSize: 12, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    title={`${product.name} ${product.category === "grooving" ? "Pipe Grooving" : "Pipe Threading"} Machine | TechThread Pro`}
                  >
                    {product.name} {product.category === "grooving" ? "Pipe Grooving" : "Pipe Threading"} Machine | TechThread Pro
                  </div>
                </td>
                <td style={{ padding: "16px 16px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Link
                      href={`/dashboard/products/add?edit=${product.id}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "6px 12px",
                        backgroundColor: "#F5F5F7",
                        border: "1px solid #E8E8ED",
                        borderRadius: 6,
                        fontSize: 12,
                        color: "#1D1D1F",
                        fontFamily: "'SF Pro Text', sans-serif",
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M8.5 1.5l2 2L4 10H2V8l6.5-6.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                      </svg>
                      Edit
                    </Link>
                    <Link
                      href={`/products/${product.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "6px 12px",
                        backgroundColor: "#F5F5F7",
                        border: "1px solid #E8E8ED",
                        borderRadius: 6,
                        fontSize: 12,
                        color: "#86868B",
                        fontFamily: "'SF Pro Text', sans-serif",
                        textDecoration: "none",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M8 1h3v3M11 1L6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
