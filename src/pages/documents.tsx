import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DocCard from "@/components/documents/doc-card";
import { Button } from "@/components/ui/button";
import { documents } from "@/lib/constants";
import { setOpenFolder } from "@/store/slices/global";
import type { RootState } from "@/types/global";

const Documents = () => {
  const dispatch = useDispatch();
  const [content, _setContent] = useState<DocumentItem[]>(documents);
  const { openFolder } = useSelector((state: RootState) => state.global);

  const handleCloseFolder = () => {
    dispatch(setOpenFolder(""));
  };

  useEffect(() => {
    /**
     * Set the Contents of the Folder Selected in the Global Redux State
     * setContent();
     */
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-5">
      <div className="flex w-full items-center justify-center">
        <span className="w-full text-left font-bold text-[30px] text-primary leading-[30px]">Documents</span>
        <Button type="button" variant="default" size="lg">
          Add Document
        </Button>
      </div>
      <div className="flex w-full flex-col items-start justify-start">
        <div className="flex h-8 w-full items-start justify-start">
          <div className="flex h-full w-fit items-center justify-center gap-2 rounded-t-lg border-x border-t bg-card px-3 py-2">
            <span className="flex-1 text-left text-[14px] leading-[14px]">Root</span>
          </div>
          {openFolder && (
            <div className="flex h-full w-fit items-center justify-center gap-2 rounded-t-lg border-x border-t bg-card px-3 py-2">
              <span className="flex-1 text-left text-[14px] leading-[14px]">{openFolder}</span>
              <X className="size-4 text-destructive" onClick={() => handleCloseFolder()} />
            </div>
          )}
        </div>
        <div className="grid h-fit max-h-[calc(100vh-196px)] w-full grid-cols-8 items-start justify-start gap-5 overflow-y-auto rounded-b-xl border p-5">
          {content.map((document) => (
            <DocCard key={document.id} name={document.name} type={document.type} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;
