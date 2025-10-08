import { EllipsisVertical, LogOut, User2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/img/logo.jpg";
import LogoBlack from "@/assets/img/logo-black.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RootState } from "@/store";
import { setMode } from "@/store/slices/global";
import MaxWidthWrapper from "./max-width-wrapper";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import WarningModal from "./warning-modal";

const Navbar = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, setLogout] = useState(false);
  const { mode } = useSelector((state: RootState) => state.global);

  const toggleValidationMode = () => {
    if (mode === "employees") {
      dispatch(setMode("candidates"));
    } else {
      dispatch(setMode("employees"));
    }
  };

  return (
    <>
      <nav className="fixed top-0 z-[1] h-16 w-full border-b backdrop-blur">
        <MaxWidthWrapper className="flex items-center justify-between px-5 py-2.5 xl:px-0">
          <img
            src={theme === "dark" ? Logo : LogoBlack}
            alt="logo"
            className="h-full cursor-pointer rounded-md"
            onClick={() => navigate("/dashboard")}
          />

          <div className="flex items-center justify-center gap-2.5">
            <div className="hidden items-center justify-center gap-2.5 pr-3 md:flex">
              <span className="font-medium text-muted-foreground text-xs">Candidates</span>
              <Switch checked={mode === "employees"} onCheckedChange={toggleValidationMode} />
              <span className="font-medium text-muted-foreground text-xs">Employees</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <EllipsisVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="md:hidden">
                  <span className="font-medium text-muted-foreground text-sm">Candidates</span>
                  <Switch checked={mode === "employees"} onCheckedChange={toggleValidationMode} />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <Button variant="outline" size="lg" className="w-full">
                    <User2 className="mr-3 text-white" />
                    Profile
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="" onClick={() => setLogout(true)}>
                  <Button variant="destructive" size="lg" className="w-full">
                    <LogOut className="mr-2 text-white" />
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ModeToggle />
          </div>
        </MaxWidthWrapper>
      </nav>

      <WarningModal
        open={logout}
        title="Are you Sure"
        text={
          <span>
            You want to Logout? <br />
            You can always log back in.
          </span>
        }
        setOpen={setLogout}
        cta={() => {
          localStorage.clear();
          void navigate("/");
        }}
      />
    </>
  );
};

export default Navbar;
