import {
  Lightbulb,
  FileText,
  Briefcase,
  Clock3,
} from "lucide-react";

const TipsCard = () => {
  const tips = [
    {
      icon: FileText,
      title: "Upload a good resume",
      text: "Personalized questions are generated from your resume.",
      color: "text-violet-400",
    },
    {
      icon: Briefcase,
      title: "Choose the correct role",
      text: "Questions become more relevant to your target job.",
      color: "text-green-400",
    },
    {
      icon: Clock3,
      title: "Select your experience",
      text: "AI adjusts the difficulty level accordingly.",
      color: "text-orange-400",
    },
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-[#131522]/80 backdrop-blur-xl p-4">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="text-yellow-400" size={22} />
        <h2 className="text-xl font-semibold text-white">
          Interview Tips
        </h2>
      </div>

      <div className="space-y-5">
        {tips.map((tip) => {
          const Icon = tip.icon;

          return (
            <div key={tip.title} className="flex gap-4">
              <div className="mt-1">
                <Icon size={20} className={tip.color} />
              </div>

              <div>
                <h3 className="text-white font-medium">
                  {tip.title}
                </h3>

                <p className="text-sm text-zinc-500 mt-1">
                  {tip.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TipsCard;