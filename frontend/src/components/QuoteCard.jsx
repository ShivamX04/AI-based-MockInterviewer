import { Quote } from "lucide-react";

const QuoteCard = () => {
  return (
    <div className="mt-2 rounded-xl border border-white/10 bg-[#131522]/80 backdrop-blur-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <Quote className="text-violet-400" size={20} />

        <h2 className="text-lg font-semibold text-white">
          Daily Motivation
        </h2>
      </div>

      <p className="text-zinc-300 leading-7 italic">
        "Success is where preparation and opportunity meet."
      </p>

      <p className="mt-0 text-right text-sm text-zinc-500">
        — Bobby Unser
      </p>
    </div>
  );
};

export default QuoteCard;