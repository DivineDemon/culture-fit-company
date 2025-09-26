import { Building2, Download, UserRound } from "lucide-react";
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

  const id = useSelector((state: RootState) => state.global.id);
  const { data: employee, isLoading: isLoadingEmployee } = useGetEmployeesQuery(id!, { skip: !id });

  return (
    <>
      <div className="flex h-full w-full flex-col items-start justify-start gap-5 md:overflow-hidden">
        <div className="flex w-full items-start justify-start gap-2.5">
          <span className="flex-1 text-left font-bold text-[32px] leading-[32px]">Employees</span>
          <div className="hidden flex-col gap-2.5 md:flex md:flex-row">
            <Button variant="default" size="sm" type="button" onClick={() => setOpen(true)}>
              Add User &nbsp;
              <UserRound />
            </Button>
            <Button variant="default" size="sm" type="button">
              Export as Excel &nbsp;
              <Download />
            </Button>
          </div>
          <div className="flex gap-2.5 md:hidden">
            <Button variant="default" size="icon" type="button" onClick={() => setOpen(true)}>
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
            placeholder="Filter Employees by Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {isLoadingEmployee ? (
            <div>Loading...</div>
          ) : (
            <DataTable
              columns={columns}
              data={
                search
                  ? employee.filter((e: { email: string }) => e.email.toLowerCase().includes(search.toLowerCase()))
                  : employee
              }
            />
          )}
        </div>
        <EmployeeSheet open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default Dashboard;
