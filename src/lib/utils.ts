import { type ClassValue, clsx } from "clsx";
import jsPDF from "jspdf";
import { GlobalWorkerOptions, getDocument, type PDFDocumentProxy } from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min?url";
import { twMerge } from "tailwind-merge";

GlobalWorkerOptions.workerSrc = pdfjsWorker;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateString(str: string, num: number) {
  return str.length > num ? `${str.slice(0, num)}...` : str;
}

export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = getDocument({ data: arrayBuffer });
  const pdf: PDFDocumentProxy = await loadingTask.promise;

  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item) => {
        if ("str" in item) {
          return (item as { str: string }).str;
        }
        return "";
      })
      .join(" ");
    fullText += `${pageText}\n\n`;
  }

  return fullText.trim();
}

export const downloadAsPDF = (fileName: string, content: string) => {
  if (!content) return;

  const pdf = new jsPDF({
    orientation: "p",
    unit: "pt",
    format: "a4",
  });

  const lines = pdf.splitTextToSize(content, 500);
  let y = 60;

  // Add text, automatically paginating if needed
  lines.forEach((line: string) => {
    if (y > 750) {
      pdf.addPage();
      y = 60;
    }
    pdf.text(line, 50, y);
    y += 14;
  });

  const safeFileName = fileName.replace(/[^a-z0-9\-_.]/gi, "_") || "document";
  pdf.save(`${safeFileName}.pdf`);
};
