import MDEditor from "@uiw/react-md-editor";
import { jsPDF } from "jspdf";
import { CircleAlert, Download, FileText, Loader2, Paperclip, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { truncateString } from "@/lib/utils";
import type { RootState } from "@/store";
import { useGetPoliciesQuery } from "@/store/services/company";
import { Button } from "../ui/button";

interface Policy {
  id: string;
  file_name: string;
  file_data?: string;
}

const CulturePolicies = () => {
  const id = useSelector((state: RootState) => state.global.id);
  const { data, isLoading, error } = useGetPoliciesQuery(id!, { skip: !id });

  const [open, setOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const handleOpenModal = (policy: Policy) => {
    setSelectedPolicy(policy);
    setOpen(true);
  };

  const handleDownloadPDF = async () => {
    if (!selectedPolicy?.file_data) {
      toast.error("No content available for this document!");
      return;
    }

    try {
      const pdf = new jsPDF({
        orientation: "p",
        unit: "pt",
        format: "a4",
      });

      const margin = 50;
      const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2;
      const lineHeight = 18;
      let cursorY = 60;

      const addText = (text: string, isBold = false, fontSize = 12) => {
        pdf.setFont("helvetica", isBold ? "bold" : "normal");
        pdf.setFontSize(fontSize);

        const lines = pdf.splitTextToSize(text, pageWidth);
        lines.forEach((line: string) => {
          if (cursorY + lineHeight > pdf.internal.pageSize.getHeight() - 40) {
            pdf.addPage();
            cursorY = 60;
          }
          pdf.text(line, margin, cursorY);
          cursorY += lineHeight;
        });
        cursorY += 4;
      };

      const lines = selectedPolicy.file_data.split("\n");
      for (const line of lines) {
        if (line.startsWith("# ")) {
          addText(line.replace("# ", ""), true, 18);
        } else if (line.startsWith("## ")) {
          addText(line.replace("## ", ""), true, 16);
        } else if (line.startsWith("### ")) {
          addText(line.replace("### ", ""), true, 14);
        } else if (line.startsWith("- ") || line.startsWith("* ")) {
          addText(`• ${line.replace(/^[-*]\s*/, "")}`, false, 12);
        } else if (line.trim() === "") {
          cursorY += 8;
        } else {
          addText(line.trim(), false, 12);
        }
      }

      pdf.save(`${selectedPolicy.file_name || "policy"}.pdf`);
      toast.success("PDF downloaded successfully!");
    } catch (_err) {
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl border lg:h-[618px]">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl border lg:h-[618px]">
        <p className="flex flex-col items-center justify-center gap-2.5 text-muted-foreground">
          <TriangleAlert className="size-8 text-destructive" />
          Something went wrong
        </p>
      </div>
    );
  }

  return (
    <>
      <Card className="h-full w-full shadow-none">
        <CardHeader>
          <CardTitle className="font-semibold text-primary text-xl">Company Documents</CardTitle>
        </CardHeader>
        <CardContent className="h-full space-y-4 overflow-y-scroll lg:h-[618px]">
          <div className="flex flex-col items-start gap-2.5">
            {data && data.length > 0 ? (
              data.map((policy: Policy, idx: number) => (
                <div key={policy.id ?? idx} className="flex w-full items-center justify-center gap-2.5 border-b pb-3">
                  <div className="size-10 rounded-full bg-primary p-2 text-white">
                    <FileText className="size-full" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{truncateString(policy.file_name, 20)}</h3>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => handleOpenModal(policy)}>
                    <Paperclip className="size-4 text-muted-foreground" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="flex h-full w-full flex-col items-center justify-center text-muted-foreground lg:h-[618px]">
                <CircleAlert className="size-8 text-primary" />
                No documents found.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex max-h-[85vh] w-screen-xl flex-col p-0">
          <DialogHeader className="flex flex-row items-center justify-between border-b px-6 py-4">
            <DialogTitle className="font-semibold text-lg">
              {selectedPolicy?.file_name || "Policy Document"}
            </DialogTitle>
          </DialogHeader>

          <div id="markdown-preview" className="flex-1 overflow-y-auto px-6 py-4" data-color-mode="light">
            {selectedPolicy?.file_data ? (
              <MDEditor.Markdown
                source={selectedPolicy.file_data}
                style={{
                  backgroundColor: "transparent",
                  fontSize: 14,
                  color: "inherit",
                }}
              />
            ) : (
              <div className="flex h-40 items-center justify-center text-muted-foreground">
                <Loader2 className="mr-2 size-5 animate-spin" />
                Loading policy content...
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end border-t bg-background px-6 py-4">
            <Button variant="default" onClick={handleDownloadPDF}>
              <Download className="mr-2 size-4" /> Download PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CulturePolicies;
