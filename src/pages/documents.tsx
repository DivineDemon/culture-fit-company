import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddFolderDialog from "@/components/documents/add-folder";
import DocCard from "@/components/documents/doc-card";
import { Button } from "@/components/ui/button";
import { useGetFilesQuery } from "@/store/services/file-system";
import { setOpenFolder } from "@/store/slices/global";
import type { RootState } from "@/types/global";

const Documents = () => {
  const dispatch = useDispatch();
  const { id, openFolder } = useSelector((state: RootState) => state.global);
  const { data, isFetching } = useGetFilesQuery(id, { skip: !id });
  const [content, setContent] = useState<DocumentItem[]>([]);
  const [addfolder, setAddfolder] = useState(false);

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

    const employeeFileItems: DocumentItem[] = (data.files?.employee_files ?? []).map((file) => ({
      id: file.id,
      name: file.file_name,
      type: "file",
    }));

    const companyFileItems: DocumentItem[] = (data.files?.company_files ?? []).map(
      (item: string | CompanyFile, index: number) => {
        if (typeof item === "string") {
          return { id: `company-${index}`, name: item, type: "file" as const };
        }
        return { id: item?.id ?? `company-${index}`, name: item?.file_name ?? "", type: "file" as const };
      },
    );

    const physicalFileItems: DocumentItem[] = (data.files?.physical_files ?? []).map(
      (item: string | CompanyFile, index: number) => {
        if (typeof item === "string") {
          return { id: `physical-${index}`, name: item, type: "file" as const };
        }
        return { id: item?.id ?? `physical-${index}`, name: item?.file_name ?? "", type: "file" as const };
      },
    );

    const isRoot = !currentFolderId;
    const filesToShow = isRoot ? [...employeeFileItems, ...companyFileItems, ...physicalFileItems] : [];

    setContent([...folderItems, ...filesToShow]);
  }, [data, openFolder]);

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-5">
      <div className="flex w-full items-center justify-center">
        <span className="w-full text-left font-bold text-[30px] text-primary leading-[30px]">Documents</span>
        <div className="flex items-center gap-2" onClick={() => setAddfolder(true)}>
          <Button type="button" variant="default" size="lg">
            Add Folder
          </Button>
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
          {content.map((document) => {
            const filePayload = (() => {
              if (!data) return undefined;
              const allFiles: (string | CompanyFile)[] = [
                ...(data.files?.employee_files ?? []),
                ...(data.files?.company_files ?? []),
                ...(data.files?.physical_files ?? []),
              ];
              const found = allFiles.find(
                (f: string | CompanyFile) => f && typeof f === "object" && f.id === document.id,
              );
              return found && typeof found === "object" && "file_data" in found
                ? (found.file_data as string)
                : undefined;
            })();
            return (
              <DocCard
                key={document.id}
                id={document.id}
                file_name={document.name}
                type={document.type}
                file_data={filePayload}
                folders={(data?.folders ?? []).map((f) => ({ id: f.id, name: f.name }))}
              />
            );
          })}
        </div>
      </div>
      <AddFolderDialog open={addfolder} onClose={() => setAddfolder(false)} parentId={openFolder} />
    </div>
  );
};

export default Documents;
