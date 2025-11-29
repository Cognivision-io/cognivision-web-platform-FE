import { CircleAlert, CircleCheckIcon, CircleX } from "lucide-react";
import { toast } from "sonner";

const CustomToast = {
  success: (message: string) => {
    const toastId = toast(
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <CircleCheckIcon
            className="mr-2 shrink-0 w-5 h-5"
            color="#106c0e"
            fontSize={20}
          />
          <h1 className="text-[1rem]">{message}</h1>
        </div>
        <CircleX
          className="ml-2 hover:cursor-pointer shrink-0 w-5 h-5"
          color="#d20000"
          onClick={() => toast.dismiss(toastId)}
          fontSize={20}
        />
      </div>
    );
  },
  error: (message: string) => {
    const toastId = toast(
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <CircleAlert
            className="mr-2 shrink-0 w-5 h-5"
            color="#d20000"
            fontSize={20}
          />
          <h1 className="text-[1rem]">{message}</h1>
        </div>
        <CircleX
          className="ml-2 shrink-0 w-5 h-5 hover:cursor-pointer"
          color="#d20000"
          onClick={() => toast.dismiss(toastId)}
          fontSize={20}
        />
      </div>
    );
  },
};

export default CustomToast;
