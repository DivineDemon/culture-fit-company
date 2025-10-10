import { FileText, Folder, FolderOpen, Move, TextCursorInput, Trash } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AddFolderDialog from "@/components/documents/add-folder";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import WarningModal from "@/components/warning-modal";
import { downloadAsPDF } from "@/lib/utils";
import { useDeleteFolderMutation, useMoveFileMutation } from "@/store/services/file-system";
import { setOpenFolder } from "@/store/slices/global";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../ui/context-menu";

interface DocCardProps {
  id: string;
  file_name?: string;
  type: "folder" | "file";
  folders?: { id: string; name: string }[];
  file_data?: string;
}

const DocCard = ({ id, file_name, type, folders = [], file_data }: DocCardProps) => {
  const dispatch = useDispatch();
  const [deleteFolder, { isLoading: isDeleting }] = useDeleteFolderMutation();
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [moveFile] = useMoveFileMutation();

  const handleOpenFolder = () => {
    dispatch(setOpenFolder(id));
  };

  const handleRenameFolder = async () => {
    setShowRename(true);
  };

  const handleDeleteFolder = async () => {
    try {
      await deleteFolder(id);
      setShowDeleteWarning(false);
    } catch (_e) {
      // no-op
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex w-fit flex-col items-center justify-center gap-2.5 rounded-lg p-2.5">
        {type === "folder" ? (
          <Folder className="size-16 fill-primary text-primary" />
        ) : (
          <FileText className="size-16 fill-primary text-white dark:text-black" />
        )}
        <span className="w-full text-wrap text-center font-medium text-[14px] leading-[18px]">
          {String(file_name ?? "")}
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-fit">
        {type === "folder" ? (
          <ContextMenuItem onClick={handleOpenFolder}>
            <FolderOpen />
            Open
          </ContextMenuItem>
        ) : (
          <ContextMenuItem>
            <FolderOpen />
            Open
          </ContextMenuItem>
        )}
        {type === "folder" && (
          <ContextMenuItem onClick={handleRenameFolder}>
            <TextCursorInput />
            Rename
          </ContextMenuItem>
        )}
        {type === "folder" && (
          <ContextMenuItem variant="destructive" onClick={() => setShowDeleteWarning(true)}>
            <Trash />
            Delete
          </ContextMenuItem>
        )}
        {type === "file" && (
          <ContextMenuItem onClick={() => setShowPreview(true)}>
            <FolderOpen />
            Open
          </ContextMenuItem>
        )}
        <ContextMenuSub>
          <ContextMenuSubTrigger className="gap-2">
            <Move />
            Move to...
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="max-h-[400px] w-fit overflow-y-auto">
            {folders.map((folder) => (
              <ContextMenuItem
                key={folder.id}
                onClick={async () => {
                  if (type === "file") {
                    await moveFile({ id, folder_id: folder.id });
                  }
                }}
              >
                <Folder />
                {folder.name}
              </ContextMenuItem>
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
      <WarningModal
        open={showDeleteWarning}
        setOpen={setShowDeleteWarning}
        title="Delete folder?"
        text={`You're about to delete "${file_name ?? "this folder"}". This action cannot be undone.`}
        isLoading={isDeleting}
        cta={handleDeleteFolder}
      />
      <AddFolderDialog
        open={showRename}
        onClose={() => setShowRename(false)}
        mode="rename"
        folderId={id}
        initialName={file_name ?? ""}
      />
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{file_name}</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-auto whitespace-pre-wrap text-sm">
            {file_data ?? "No preview available."}
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => downloadAsPDF(file_name ?? "document", file_data ?? "")}>
              Download PDF
            </Button>
            <Button type="button" variant="secondary" onClick={() => setShowPreview(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ContextMenu>
  );
};

export default DocCard;
