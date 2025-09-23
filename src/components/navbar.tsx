// import { EllipsisVertical, LogOut, User } from "lucide-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Logo from "@/assets/img/logo.jpg";
// import LogoBlack from "@/assets/img/logo-black.jpg";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import MaxWidthWrapper from "./max-width-wrapper";
// import { ModeToggle } from "./mode-toggle";
// import { useTheme } from "./theme-provider";
// import { Button } from "./ui/button";
// import WarningModal from "./warning-modal";

// const Navbar = () => {
//   const { theme } = useTheme();
//   const navigate = useNavigate();
//   const [logout, setLogout] = useState<boolean>(false);

//   return (
//     <>
//       <nav className="fixed top-0 z-[1] h-16 w-full border-b backdrop-blur">
//         <MaxWidthWrapper className="flex items-center justify-between px-5 py-2.5 lg:px-0">
//           <img src={theme === "dark" ? Logo : LogoBlack} alt="logo" className="h-full rounded-md" />
//           <div className="flex items-center justify-center gap-2.5">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" size="icon">
//                   <EllipsisVertical className="h-5 w-5" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-40">
//                 <DropdownMenuItem onClick={() => navigate("/profile")}>
//                   <User className="mr-2 h-4 w-4" />
//                   Profile
//                 </DropdownMenuItem>
//                 <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => setLogout(true)}>
//                   <LogOut className="mr-2 h-4 w-4" />
//                   Logout
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//             <ModeToggle />
//           </div>
//         </MaxWidthWrapper>
//       </nav>

//       <WarningModal
//         open={logout}
//         title="Are you Sure"
//         text={
//           <span>
//             You want to Logout? <br />
//             You can always log back in.
//           </span>
//         }
//         setOpen={setLogout}
//         cta={() => {
//           localStorage.clear();
//           void navigate("/");
//         }}
//       />
//     </>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/img/logo.jpg";
import LogoBlack from "@/assets/img/logo-black.jpg";
import MaxWidthWrapper from "./max-width-wrapper";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import WarningModal from "./warning-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { EllipsisVertical } from "lucide-react";

const Navbar = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [logout, setLogout] = useState<boolean>(false);
  const [openUpload, setOpenUpload] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <nav className="fixed top-0 z-[1] h-16 w-full border-b backdrop-blur">
        <MaxWidthWrapper className="flex items-center justify-between px-5 py-2.5 lg:px-0">
          <img
            src={theme === "dark" ? Logo : LogoBlack}
            alt="logo"
            className="h-full rounded-md"
            onClick={() => navigate("/dashboard")}
          />

          <div className="flex items-center justify-center gap-2.5">
            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <EllipsisVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpenUpload(true)}>
                  Upload Doc
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => setLogout(true)}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ModeToggle />
          </div>
        </MaxWidthWrapper>
      </nav>

      {/* Logout Warning Modal */}
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

      {/* Upload Doc Dialog */}
      <Dialog open={openUpload} onOpenChange={setOpenUpload}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="file"
              accept="application/pdf"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                if (file) {
                  // TODO: handle upload logic (API call etc.)
                  console.log("Uploaded file:", file);
                  setOpenUpload(false);
                } else {
                  alert("Please select a PDF file first.");
                }
              }}
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
