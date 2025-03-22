import Phone from "./icons/Phone";
import { useRouter } from "next/router";

const Help = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/community")}
      className="z-999 p-4 cursor-pointer text-white rounded-full shadow-lg"
      style={{ backgroundColor: "rgb(219, 125, 75)" }}
    >
      <Phone />
    </button>
  );
};

export default Help;
