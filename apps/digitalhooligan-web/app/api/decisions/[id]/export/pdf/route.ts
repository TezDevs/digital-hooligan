import { NextRequest, NextResponse } from "next/server";
import { buildDecisionReviewSnapshot } from "@/lib/decisionReviewSnapshot";
import { renderDecisionDossierHtml } from "@/lib/decisionDossierHtml";
import { renderPdfFromHtml } from "@/lib/htmlToPdf";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const snapshot = await buildDecisionReviewSnapshot(id);

  if (!snapshot) {
    return NextResponse.json({ error: "Decision not found" }, { status: 404 });
  }

  const html = renderDecisionDossierHtml({
    id,
    title: `Decision ${id}`,
    createdAt: new Date().toISOString(),
  });

  const pdfBuffer = await renderPdfFromHtml(html);

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="decision-${id}.pdf"`,
    },
  });
}
