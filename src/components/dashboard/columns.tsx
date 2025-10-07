import type { Column, Row } from "@tanstack/react-table";
import { ArrowDownAZ, FilePenLine, FileText, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmployeeSheet from "@/components/dashboard/employee-sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RootState } from "@/store";

export type Employee = {
  id: string;
  company_id: string;
  user_id: string;
  name: string;
  email: string;
  password: string | null;
  date_of_birth: string;
  user_phone_number: string;
  user_designation: string;
  department: string;
  salary: number;
  is_role_model: boolean;
  is_candidate: boolean;
  files: string[];
};

const ActionsCell = ({ row }: { row: Row<Employee> }) => {
  const [open, setOpen] = useState<boolean>(false);
  // const [warn, setWarn] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
  const mode  = useSelector((state: RootState) => state.global.mode);

  const navigate = useNavigate();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" type="button">
            <MoreHorizontal className="rotate-90" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setSelected(row.original.id);
              setOpen(true);
            }}
          >
            <FilePenLine />
            <span className="ml-2 text-sm">Edit {mode === "employees" ? "Candidate" : "Employee"}</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate(`/user/${row.original.id}`);
            }}
          >
            <FileText />
            <span className="ml-2 text-sm">View Details</span>
          </DropdownMenuItem>

          {/* <DropdownMenuItem
            onClick={() => {
              setSelected(row.original.id);
              setWarn(true);
            }}
          >
            <Trash2 className="text-destructive" />
            <span className="ml-2 text-sm">Remove</span>
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <WarningModal
        open={warn}
        title="Are you sure?"
        text={<span>Are you sure you want to Remove this User?</span>}
        setOpen={setWarn}
      /> */}

      <EmployeeSheet
        companyId={row.original.company_id}
        id={selected}
        open={open}
        setOpen={setOpen}
        employee={row.original ?? undefined}
      />
    </>
  );
};

export const useRowColumns = () => {
  return [
    {
      id: "employee_name",
      accessorFn: (row: Employee) => `${row.name}`,
      header: ({ column }: { column: Column<Employee> }) => (
        <Button variant="ghost" type="button" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Employee Name
          <ArrowDownAZ className="ml-2" />
        </Button>
      ),
      cell: ({ row }: { row: Row<Employee> }) => (
        <span className="ml-3 flex cursor-pointer items-center gap-1 font-medium">{row.original.name || "N/A"}</span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }: { row: Row<Employee> }) => (
        <span className="font-semibold text-[#71717A] text-sm">{row.getValue("email") || "N/A"}</span>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }: { row: Row<Employee> }) => (
        <span className="font-semibold text-[#71717A] text-sm">{row.getValue("department") || "N/A"}</span>
      ),
    },
    {
      accessorKey: "user_designation",
      header: "Designation",
      cell: ({ row }: { row: Row<Employee> }) => (
        <span className="font-semibold text-[#71717A] text-sm">{row.getValue("user_designation") || "N/A"}</span>
      ),
    },
    {
      accessorKey: "is_candidate",
      header: "Status",
      cell: ({ row }: { row: Row<Employee> }) => (
        <span className="font-semibold text-[#71717A] text-sm">
          {row.getValue("is_candidate") ? "Candidate" : "Employee"}
        </span>
      ),
    },
    {
      accessorKey: "is_role_model",
      header: "Role Model",
      cell: ({ row }: { row: Row<Employee> }) => {
        const isRoleModel = row.getValue("is_role_model");
        return (
          <Badge variant="outline" className="w-1/2 px-3">
            {isRoleModel ? "Yes" : "- -"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<Employee> }) => <ActionsCell row={row} />,
    },
  ];
};
