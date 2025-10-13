import { BarChart3, Building2, FileSearch, GitCompare, Heart, Loader2, TrendingUp, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddFolderDialog from "@/components/documents/add-folder";
import DocCard from "@/components/documents/doc-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleDesired, handleReal, handleRoleModelEmployee } from "@/lib/api";
import { useGetFilesQuery } from "@/store/services/file-system";
import { setOpenFolder } from "@/store/slices/global";
import type { RootState } from "@/types/global";

const Documents = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState<DocumentItem[]>([]);
  const [addfolder, setAddfolder] = useState<boolean>(false);
  const { id, openFolder } = useSelector((state: RootState) => state.global);

  const { data, isFetching } = useGetFilesQuery(id, { skip: !id });

  const handleCloseFolder = () => {
    dispatch(setOpenFolder(""));
  };

  useEffect(() => {
    setAddfolder(false);
  }, []);

  useEffect(() => {
    if (!data) return;

    const allFolders = (data.folders ?? []).map((folder) => ({
      id: folder.id,
      name: folder.name,
      parent_id: folder.parent_id ?? null,
    }));

    const currentFolderId = openFolder || null;
    const folderItems: DocumentItem[] = allFolders
      .filter((f) => (currentFolderId ? f.parent_id === currentFolderId : !f.parent_id))
      .map((f) => ({ id: f.id, name: f.name, type: "folder" }));

    const employeeFileItems: DocumentItem[] = (data.files?.employee_files ?? [])
      .filter((file) => file.file_data)
      .map((file) => ({
        id: file.id,
        name: file.file_name,
        type: "file",
      }));

    const companyFileItems: DocumentItem[] = (data.files?.company_files ?? [])
      .filter((item: string | CompanyFile) => {
        if (typeof item === "string") return false;
        return item?.file_data;
      })
      .map((item: string | CompanyFile, index: number) => {
        if (typeof item === "string") {
          return { id: `company-${index}`, name: item, type: "file" as const };
        }
        return {
          id: item?.id ?? `company-${index}`,
          name: item?.file_name ?? "",
          type: "file" as const,
        };
      });

    const companyFilesReports: DocumentItem[] = (data.reports?.company_files_reports ?? [])
      .filter((report) => report.summary)
      .map((report) => ({
        id: report.id,
        name: report.file_name,
        type: "file" as const,
      }));

    const employeeCultureFitReports: DocumentItem[] = (data.reports?.employee_culture_fit_reports ?? [])
      .filter((report) => report.summary)
      .map((report) => ({
        id: report.id,
        name: `Employee Culture Fit Report - ${new Date(report.created_at).toLocaleDateString()}`,
        type: "file" as const,
      }));

    const candidateCultureReports: DocumentItem[] = (data.reports?.candidate_culture_reports ?? [])
      .filter((report) => report.summary)
      .map((report) => ({
        id: report.id,
        name: `Candidate Culture Report - ${
          report.created_at ? new Date(report.created_at).toLocaleDateString() : "N/A"
        }`,
        type: "file" as const,
      }));

    const candidateChatReports: DocumentItem[] = (data.reports?.candidate_chat_reports ?? [])
      .filter((report) => report.summary)
      .map((report) => ({
        id: report.id,
        name: `Candidate Chat Report - ${new Date(report.created_at).toLocaleDateString()}`,
        type: "file" as const,
      }));

    const roleModelEmployeeChatReports: DocumentItem[] = (data.reports?.role_model_employee_chat_reports ?? [])
      .filter((report) => typeof report === "string" || report)
      .map((report, index) => ({
        id: `role-model-emp-${index}`,
        name: typeof report === "string" ? report : `Role Model Employee Chat Report ${index + 1}`,
        type: "file" as const,
      }));

    const companyEmployeeRoleModelChatReports: DocumentItem[] = (
      data.reports?.company_employee_role_model_chat_reports ?? []
    )
      .filter((report) => typeof report === "string" || report)
      .map((report, index) => ({
        id: `comp-emp-role-${index}`,
        name: typeof report === "string" ? report : `Company Employee Role Model Chat Report ${index + 1}`,
        type: "file" as const,
      }));

    const finalReports: DocumentItem[] = (data.reports?.final_reports ?? [])
      .filter((report) => typeof report === "string" || report)
      .map((report, index) => ({
        id: `final-${index}`,
        name: typeof report === "string" ? report : `Final Report ${index + 1}`,
        type: "file" as const,
      }));

    const candidateAndRoleModelReports: DocumentItem[] = (data.reports?.candidate_and_role_model_reports ?? [])
      .filter((report) => typeof report === "string" || report)
      .map((report, index) => ({
        id: `cand-role-${index}`,
        name: typeof report === "string" ? report : `Candidate & Role Model Report ${index + 1}`,
        type: "file" as const,
      }));

    const isRoot = !currentFolderId;
    const filesToShow = isRoot
      ? [
          ...employeeFileItems,
          ...companyFileItems,
          ...companyFilesReports,
          ...employeeCultureFitReports,
          ...candidateCultureReports,
          ...candidateChatReports,
          ...roleModelEmployeeChatReports,
          ...companyEmployeeRoleModelChatReports,
          ...finalReports,
          ...candidateAndRoleModelReports,
        ]
      : [];

    setContent([...folderItems, ...filesToShow]);
  }, [data, openFolder]);

  return (
    <>
      <div className="flex h-full w-full flex-col items-start justify-start gap-5">
        <div className="flex w-full items-center justify-center">
          <span className="w-full text-left font-bold text-[30px] text-primary leading-[30px]">Documents</span>
          <div className="flex items-center gap-2">
            <Button type="button" variant="default" size="lg" onClick={() => setAddfolder(true)}>
              Add Folder
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg">
                  Generate
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-fit" align="end">
                <DropdownMenuItem onClick={() => handleDesired(id)}>
                  <Heart />
                  Desired Culture
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleReal(id)}>
                  <Building2 />
                  Real Culture
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleModelEmployee(id)}>
                  <Users />
                  Role Model vs. Employees
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BarChart3 />
                  Cumulative Company Culture
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileSearch />
                  Candidates Interview Analysis
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <GitCompare />
                  Candidates vs. Role Models
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <TrendingUp />
                  Cumulative Cultural Performance
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-start">
          <div className="flex h-8 w-full items-start justify-start">
            <div className="flex h-full w-fit items-center justify-center gap-2 rounded-t-lg border-x border-t bg-card px-3 py-2">
              <span className="flex-1 text-left text-[14px] leading-[14px]">Root</span>
            </div>
            {openFolder && (
              <div className="flex h-full w-fit items-center justify-center gap-2 rounded-t-lg border-x border-t bg-card px-3 py-2">
                <span className="flex-1 text-left text-[14px] leading-[14px]">
                  {data?.folders?.find((f) => f.id === openFolder)?.name ?? "Folder"}
                </span>
                <X className="size-4 text-destructive" onClick={() => handleCloseFolder()} />
              </div>
            )}
          </div>
          <div className="grid h-fit max-h-[calc(100vh-196px)] w-full grid-cols-8 items-start justify-start gap-5 overflow-y-auto rounded-b-xl border p-5">
            {isFetching && content.length === 0 && (
              <span className="col-span-8 h-full w-full items-center justify-center text-center text-muted-foreground text-sm">
                <Loader2 className="mx-auto size-4 animate-spin" />
              </span>
            )}
            {content.map((document, idx) => {
              const filePayload = (() => {
                if (!data) return undefined;

                const employeeFile = (data.files?.employee_files ?? []).find((f) => f.id === document.id);
                if (employeeFile?.file_data) return employeeFile.file_data;

                const companyFile = (data.files?.company_files ?? []).find(
                  (f: string | CompanyFile) => f && typeof f === "object" && f.id === document.id,
                );
                if (companyFile && typeof companyFile === "object" && "file_data" in companyFile) {
                  return companyFile.file_data as string;
                }

                const companyFileReport = (data.reports?.company_files_reports ?? []).find((r) => r.id === document.id);
                if (companyFileReport?.summary) return companyFileReport.summary;

                const employeeCultureFitReport = (data.reports?.employee_culture_fit_reports ?? []).find(
                  (r) => r.id === document.id,
                );
                if (employeeCultureFitReport?.summary) return employeeCultureFitReport.summary;

                const candidateCultureReport = (data.reports?.candidate_culture_reports ?? []).find(
                  (r) => r.id === document.id,
                );
                if (candidateCultureReport?.summary) return candidateCultureReport.summary;

                const candidateChatReport = (data.reports?.candidate_chat_reports ?? []).find(
                  (r) => r.id === document.id,
                );
                if (candidateChatReport?.summary) return candidateChatReport.summary;

                return undefined;
              })();

              return (
                <DocCard
                  key={idx}
                  id={document.id}
                  file_name={document.name}
                  type={document.type}
                  file_data={filePayload}
                  folders={(data?.folders ?? []).map((f) => ({
                    id: f.id,
                    name: f.name,
                  }))}
                />
              );
            })}
          </div>
        </div>
      </div>
      <AddFolderDialog open={addfolder} onClose={() => setAddfolder(false)} parentId={openFolder} />
    </>
  );
};

export default Documents;
