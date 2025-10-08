import { Download, FileText, Folder, FolderOpen, Move, TextCursorInput, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { documents } from "@/lib/constants";
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
  name: string;
  type: "folder" | "file";
}

const DocCard = ({ name, type }: DocCardProps) => {
  const dispatch = useDispatch();

  const handleOpenFolder = () => {
    dispatch(setOpenFolder(name));
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex w-fit flex-col items-center justify-center gap-2.5 rounded-lg p-2.5">
        {type === "folder" ? (
          <Folder className="size-16 fill-primary text-primary" />
        ) : (
          <FileText className="size-16 fill-primary text-white dark:text-black" />
        )}
        <span className="w-full text-center font-medium text-[14px] leading-[18px]">{name}</span>
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
        <ContextMenuItem>
          <TextCursorInput />
          Rename
        </ContextMenuItem>
        <ContextMenuItem variant="destructive">
          <Trash />
          Delete
        </ContextMenuItem>
        {type === "file" && (
          <ContextMenuItem>
            <Download />
            Download
          </ContextMenuItem>
        )}
        <ContextMenuSub>
          <ContextMenuSubTrigger className="gap-2">
            <Move />
            Move to...
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="max-h-[400px] w-fit overflow-y-auto">
            {documents
              .filter((document) => document.type === "folder")
              .map((document) => (
                <ContextMenuItem key={document.id}>
                  {document.type === "folder" ? <Folder /> : <FileText />}
                  {document.name}
                </ContextMenuItem>
              ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default DocCard;
