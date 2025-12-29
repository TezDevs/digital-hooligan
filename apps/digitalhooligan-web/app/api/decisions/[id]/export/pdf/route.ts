import { NextRequest, NextResponse } from "next/server";
import { loadDecisionEntries } from "@/lib/decisionEntryStore";
import { renderDecisionDossierHtml } from "@/lib/decisionDossierHtml";
import { renderPdfFromHtml } from "@/lib/htmlToPdf";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const entries = await loadDecisionEntries();
  const decision = entries.find((d) => d.id === id);

  if (!decision) {
    return NextResponse.json({ error: "Decision not found" }, { status: 404 });
  }

  const html = renderDecisionDossierHtml(decision);
  const pdfBuffer = await renderPdfFromHtml(html);

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="decision-${decision.id}.pdf"`,
    },
  });
}
