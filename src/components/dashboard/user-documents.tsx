import { CircleAlert, Download, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { truncateString } from "@/lib/utils";
import { Button } from "../ui/button";

const Documents = () => {
  // Dummy data for testing
  const data = [
    {
      id: "1",
      file_name: "Employee_Handbook.pdf",
      description: "All company rules and policies.",
    },
    {
      id: "2",
      file_name: "Leave_Policy.pdf",
      description: "Details about vacation and leave policies.",
    },
    {
      id: "3",
      file_name: "Confidentiality_Agreement.pdf",
      description: "Confidentiality terms for employees.",
    },
  ];

  return (
    <Card className="h-full w-full shadow-none">
      <CardHeader>
        <CardTitle className="font-semibold text-primary text-xl">Company Documents</CardTitle>
      </CardHeader>
      <CardContent className="h-full space-y-4 overflow-y-scroll">
        <div className="flex flex-col items-start gap-2.5">
          {data && data.length > 0 ? (
            data.map((policy, idx: number) => (
              <div key={policy.id ?? idx} className="flex w-full items-center justify-center gap-2.5 border-b pb-3">
                <div className="size-10 rounded-full bg-primary p-2 text-white">
                  <FileText className="size-full" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{truncateString(policy.file_name, 20)}</h3>
                  <p className="text-muted-foreground text-xs">
                    {policy.description || "The policy about the company."}
                  </p>
                </div>
                <Button size="icon" variant="ghost" type="button">
                  <Download />
                </Button>
              </div>
            ))
          ) : (
            <p className="flex h-full w-full flex-col items-center justify-center text-muted-foreground">
              <CircleAlert className="size-8 text-primary" />
              No documents found.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Documents;
