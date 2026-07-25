import pdfParse from "pdf-parse";

/**
 * Extracts plain text from an uploaded resume file buffer.
 * PDF is fully supported via pdf-parse. DOC/DOCX are accepted at the
 * upload layer but treated as plain text here - for production use beyond
 * a hackathon, swap in a proper DOCX text extractor (e.g. mammoth) for
 * those mime types.
 */
export async function extractResumeText(fileBuffer, mimeType) {
  if (mimeType === "application/pdf") {
    const { text } = await pdfParse(fileBuffer);
    return text.trim();
  }

  // text/plain and doc/docx fallback - read as UTF-8 text
  return fileBuffer.toString("utf-8").trim();
}
