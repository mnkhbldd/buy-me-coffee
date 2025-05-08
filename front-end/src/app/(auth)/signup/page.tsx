import { UsernameSection } from "../components/UsernameSection";

export default function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">
        <UsernameSection />
      </h1>
    </div>
  );
}
