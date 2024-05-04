import { Logo } from "../assets/index";
import { Button } from "@/components/ui/button.jsx";
import { ModeToggle } from "@/components/mode-toggle.jsx";

const Hero = () => {
  return (
    <header className="flex justify-center items-center flex-col select-none">
      <nav className="flex justify-between w-full mb-10 pt-5">
        <div className="flex flex-row items-center gap-1">
          <img src={Logo} className="w-8 object-contain" alt="Logo" />
          <p className="font-bold text-3xl">IntelliSum</p>
        </div>
        <div className="flex flex-row items-center gap-4">
          <ModeToggle />
          <Button
            onClick={() =>
              window.open("https://github.com/r-sarathi", "_blank")
            }
          >
            Github
          </Button>
        </div>
      </nav>
      <h1 className="font-bold text-5xl text-center lg:text-6xl">
        Unlocking Insight: Summarizing Articles with{" "}
        <br className="max-md:hidden" />
        <span className="bg-gradient-to-r from-green-800 to-green-400 bg-clip-text text-transparent">
          OpenAI GPT-4
        </span>
      </h1>
      <div className="mt-10 mb-4 capitalize text-center text-muted-foreground font-medium text-lg lg:w-3/6">
        <h2>
          Save time and effort by letting OpenAI GPT-4 distill complex articles
          into easy-to-understand summaries, making information consumption
          faster and more efficient.
        </h2>
      </div>
    </header>
  );
};

export default Hero;
