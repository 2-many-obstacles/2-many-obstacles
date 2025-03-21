import Phone from "./icons/Phone";
import { useRouter } from "next/router";

const Help = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/community")}
      className="fixed bottom-12 right-12 p-4 bg-green-500 hover:bg-green-600 cursor-pointer text-white rounded-full shadow-lg"
    >
      <Phone />
    </button>
  );
};

export default Help;
