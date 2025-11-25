import { getStatistics } from '../../data/patients';

const StatisticsCard = () => {
  const stats = getStatistics();

  const cards = [
    {
      title: '오늘 검진 대상자',
      value: stats.total,
      icon: 'fa-users',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      textColor: 'text-gray-800'
    },
    {
      title: '생성 완료',
      value: stats.completed,
      icon: 'fa-check-circle',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      textColor: 'text-green-600'
    },
    {
      title: '생성 대기중',
      value: stats.pending + stats.processing,
      icon: 'fa-clock',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-6 card-shadow transition-all duration-300 hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">{card.title}</p>
              <h3 className={`text-3xl font-bold ${card.textColor}`}>
                {card.value}
              </h3>
            </div>
            <div className={`${card.bgColor} p-4 rounded-full`}>
              <i className={`fas ${card.icon} ${card.iconColor} text-2xl`}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCard;
