import { Building2, Download, Loader2, UserPlus } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRowColumns } from "@/components/dashboard/columns";
import EmployeeSheet from "@/components/dashboard/employee-sheet";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { RootState } from "@/store";
import { useGetEmployeesQuery } from "@/store/services/employees";

const Dashboard = () => {
  const columns = useRowColumns();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const { mode } = useSelector((state: RootState) => state.global);

  const id = useSelector((state: RootState) => state.global.id);
  const { data: employee, isLoading: isLoadingEmployee } = useGetEmployeesQuery(
    id!,
    { skip: !id }
  );

  return (
    <>
      <div className="flex h-full w-full flex-col items-start justify-start gap-5 md:overflow-hidden">
        <div className="flex w-full items-start justify-start gap-2.5">
          <span className="flex-1 text-left font-bold text-[32px] leading-[32px]">
            {mode === "employees" ? "Candidates" : "Employees"}
          </span>
          <div className="hidden flex-col gap-2.5 md:flex md:flex-row">
            <Button
              variant="default"
              size="sm"
              type="button"
              onClick={() => setOpen(true)}
            >
              Add {mode === "employees" ? "Candidates" : "Employees"} &nbsp;
              <UserPlus />
            </Button>
            <Button variant="default" size="sm" type="button">
              Export as Excel &nbsp;
              <Download />
            </Button>
          </div>
          <div className="flex gap-2.5 md:hidden">
            <Button
              variant="default"
              size="icon"
              type="button"
              onClick={() => setOpen(true)}
            >
              <Building2 />
            </Button>
            <Button variant="default" size="icon" type="button">
              <Download />
            </Button>
          </div>
        </div>
        <div className="flex h-[calc(100vh-156px)] w-full flex-col gap-3.5 overflow-hidden">
          <Input
            type="text"
            className="w-1/3"
            placeholder={`Filter ${
              mode === "employees" ? "Candidates" : "Employees"
            } by Email...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {isLoadingEmployee ? (
            <div className="flex h-full w-full items-center justify-center">
              <Loader2 className="size-8 animate-spin text-primary" />
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={
                employee
                  ?.filter(
                    (e: { email: string; is_candidate: boolean }) =>
                      e.is_candidate === (mode === "employees") 
                  )
                  .filter((e: { email: string }) =>
                    search
                      ? e.email.toLowerCase().includes(search.toLowerCase())
                      : true
                  ) || []
              }
            />
          )}
        </div>
        <EmployeeSheet
          open={open}
          setOpen={setOpen}
          employee={employee?.find((e: { id: string }) => e.id === id)}
          companyId={id}
        />
      </div>
    </>
  );
};

export default Dashboard;
