import {
  ClipboardList,
  BarChart3,
  Trophy,
  Clock3,
} from "lucide-react";

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: "Total Interviews",
      value: stats.totalInterviews,
      subtitle: "Completed Interviews",
      icon: ClipboardList,
      iconBg: "bg-indigo-500/20",
      iconColor: "text-indigo-400",
    },
    {
      title: "Average Score",
      value: `${stats.averageScore}%`,
      subtitle: "Overall Performance",
      icon: BarChart3,
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400",
    },
    {
      title: "Best Score",
      value: `${stats.bestScore}%`,
      subtitle: "Highest Score",
      icon: Trophy,
      iconBg: "bg-yellow-500/20",
      iconColor: "text-yellow-400",
    },
    {
      title: "Practice Time",
      value: `${Math.floor(stats.practiceMinutes / 60)}h ${
        stats.practiceMinutes % 60
      }m`,
      subtitle: "Time Spent Practicing",
      icon: Clock3,
      iconBg: "bg-orange-500/20",
      iconColor: "text-orange-400",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="
                rounded-xl
                border
                border-white/10
                bg-[#131522]/80
                backdrop-blur-xl
                p-4
                transition-all
                duration-300
                hover:border-violet-500
              "
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>

                <div className="flex-1">
                  <p className="text-xs text-zinc-400">
                    {card.title}
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-white">
                    {card.value}
                  </h2>

                  <p className="mt-1 text-xs text-zinc-500">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsCards;