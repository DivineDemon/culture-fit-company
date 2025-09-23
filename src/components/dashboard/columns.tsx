import type { Column, Row } from "@tanstack/react-table";
import { ArrowDownAZ, FilePenLine, FileText, MoreHorizontal, Sparkles, Trash } from "lucide-react";
import { useState } from "react";
import EmployeeSheet from "@/components/dashboard/employee-sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import WarningModal from "../warning-modal";
import UserSheet from "./user-sheet";

export type Employee = {
  id: string;
  name: string;
  email: string;
  password: string;
  user_designation: string;
  department: string;
  is_role_model: boolean;
  contact_number: string;
  date_of_birth: string;
};

const ActionsCell = ({ row }: { row: Row<Employee> }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [warn, setWarn] = useState<boolean>(false);
  const [detail, setDetail] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
  const [isRoleModel, setIsRoleModel] = useState<boolean>(row.original.is_role_model);

  const handleRoleModelToggle = (value: boolean) => {
    setIsRoleModel(value);
    row.original.is_role_model = value;
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" type="button">
            <MoreHorizontal className="rotate-90" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <FilePenLine />
            <span className="ml-2 text-sm">Edit Employee</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setSelected(row.original.id);
            }}
          >
            <FileText />
            <span
              className="ml-2 text-sm"
              onClick={() => {
                setSelected(row.original.id);
                setDetail(true);
              }}
            >
              View Details
            </span>
          </DropdownMenuItem>
          {!isRoleModel ? (
            <DropdownMenuItem onClick={() => handleRoleModelToggle(true)}>
              <Sparkles className="" />
              <span className="ml-2 text-sm">Make Role Model</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => handleRoleModelToggle(false)}>
              <Sparkles className="" />
              <span className="ml-2 text-sm">Remove Role Model</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => {
              setSelected(row.original.id);
              setWarn(true);
            }}
          >
            <Trash />
            <span className="ml-2 text-sm">Remove</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <WarningModal
        open={warn}
        title="Are you sure?"
        text={<span>Are you sure you want to Remove this User?</span>}
        setOpen={setWarn}
      />
      <EmployeeSheet id={selected} open={open} setOpen={setOpen} employee={row.original ?? undefined} />
      <UserSheet id={selected} open={detail} setOpen={setDetail} employee={row.original ?? undefined} />
    </>
  );
};

export const useRowColumns = () => {
  return [
    {
      accessorKey: "name",
      header: ({ column }: { column: Column<Employee> }) => (
        <Button variant="ghost" type="button" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Employee Name
          <ArrowDownAZ className="ml-2" />
        </Button>
      ),
      cell: ({ row }: { row: Row<Employee> }) => (
        <span className="ml-3 flex cursor-pointer items-center gap-1 font-medium">
          {row.original.is_role_model && <Sparkles className="h-4 w-4 text-yellow-400" />}
          {row.getValue("name")}
        </span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }: { row: Row<Employee> }) => (
        <span className="font-semibold text-[#71717A] text-sm">{row.getValue("email")}</span>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }: { row: Row<Employee> }) => (
        <span className="font-semibold text-[#71717A] text-sm">{row.getValue("department")}</span>
      ),
    },
    {
      accessorKey: "user_designation",
      header: "Designation",
      cell: ({ row }: { row: Row<Employee> }) => (
        <span className="font-semibold text-[#71717A] text-sm">{row.getValue("user_designation")}</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<Employee> }) => <ActionsCell row={row} />,
    },
  ];
};
