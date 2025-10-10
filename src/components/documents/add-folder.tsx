import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { folderSchema } from "@/lib/form-schemas";
import { usePostFolderMutation, useUpdateFolderMutation } from "@/store/services/file-system";
import type { RootState } from "@/types/global";

interface AddFolderProps {
  open: boolean;
  onClose: () => void;
  parentId?: string;
  mode?: "create" | "rename";
  folderId?: string;
  initialName?: string;
  initialDescription?: string;
}

type FolderFormData = z.infer<typeof folderSchema>;

const AddFolderDialog = ({
  open,
  onClose,
  parentId,
  mode = "create",
  folderId,
  initialName = "",
  initialDescription = "",
}: AddFolderProps) => {
  const { id: company_id } = useSelector((state: RootState) => state.global);

  const [postFolder, { isLoading: isCreatingFolder }] = usePostFolderMutation();
  const [updateFolder, { isLoading: isRenaming }] = useUpdateFolderMutation();

  const form = useForm<FolderFormData>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      name: initialName,
      description: initialDescription,
    },
  });

  const onSubmit = async (data: FolderFormData) => {
    try {
      if (mode === "rename" && folderId) {
        const _updated = await updateFolder({
          id: folderId,
          data: {
            id: folderId,
            name: data.name,
            description: data.description || "",
            parent_id: parentId || "",
            company_id,
            files: [],
            subfolders: [],
          } as Folder,
        }).unwrap();
        if (_updated) {
          toast.success("Folder renamed successfully");
          form.reset();
          onClose();
        }
      } else {
        const _newFolder = await postFolder({
          name: data.name,
          description: data.description || "",
          parent_id: parentId || "",
          company_id,
          files: [],
          subfolders: [],
        }).unwrap();

        if (_newFolder) {
          toast.success("Folder created successfully");
          form.reset();
          onClose();
        }
      }
    } catch (_error) {
      toast.error(mode === "rename" ? "Failed to rename folder" : "Failed to create folder");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "rename" ? "Rename Folder" : "Create New Folder"}</DialogTitle>
          <DialogDescription>
            {mode === "rename"
              ? "Update the folder name and description."
              : "Enter a name and optional description for the new folder."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Folder Name</Label>
            <Input id="name" placeholder="Enter folder name" {...form.register("name")} />
            {form.formState.errors.name && (
              <p className="text-destructive text-sm">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input id="description" placeholder="Enter description" {...form.register("description")} />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={mode === "rename" ? isRenaming : isCreatingFolder}>
              {mode === "rename"
                ? isRenaming
                  ? "Renaming..."
                  : "Rename"
                : isCreatingFolder
                  ? "Creating..."
                  : "Create Folder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFolderDialog;
