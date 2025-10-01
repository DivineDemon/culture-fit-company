import { EllipsisVertical, LogOut, Upload, User2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/img/logo.jpg";
import LogoBlack from "@/assets/img/logo-black.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MaxWidthWrapper from "./max-width-wrapper";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import WarningModal from "./warning-modal";
import { Switch } from "./ui/switch";
import type { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { setMode } from "@/store/slices/global";

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
        <MaxWidthWrapper className="flex items-center justify-between px-5 py-2.5 lg:px-0">
          <img
            src={theme === "dark" ? Logo : LogoBlack}
            alt="logo"
            className="h-full cursor-pointer rounded-md"
            onClick={() => navigate("/dashboard")}
          />

          <div className="flex items-center justify-center gap-2.5">
            <div className="flex items-center gap-2.5  justify-center pr-3">
              <span className="text-muted-foreground text-xs font-medium">
                Employees
              </span>
              <Switch
                checked={mode === "employees"}
                onCheckedChange={toggleValidationMode}
              />
              <span className="text-muted-foreground text-xs font-medium">
                Candidates
              </span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <EllipsisVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <span className="mr-2">
                    <User2 />
                  </span>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="mr-2">
                    <Upload />
                  </span>
                  Upload Documents
                </DropdownMenuItem>
                <DropdownMenuItem className="" onClick={() => setLogout(true)}>
                  <span className="mr-2">
                    <LogOut />
                  </span>
                  Logout
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
