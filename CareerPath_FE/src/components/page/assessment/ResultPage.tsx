import { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Radar as RadarArea } from 'recharts';
import { useStore } from '../../../store/useStore';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  TrendingDown,
  Lightbulb,
  UserPlus,
  FileText,
  Loader2,
  Sparkles,
  Laptop,
  Palette,
  HeartPulse,
  Activity,
  GraduationCap,
  Scale,
  Wrench,
  Compass,
  Briefcase,
  UserCheck,
  BarChart3
} from 'lucide-react';

const MBTI_DETAILS: Record<
  string,
  { title: string; badge: string; description: string; traits: string[] }
> = {
  INTJ: {
    title: 'Nhà Chiến Lược (Architect)',
    badge: 'from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500',
    description: 'Có tư duy chiến lược, sắc bén, lập kế hoạch chi tiết và đam mê giải quyết các vấn đề phức tạp một cách độc lập.',
    traits: ['Chiến lược', 'Độc lập', 'Logic', 'Quyết đoán'],
  },
  INTP: {
    title: 'Nhà Tư Duy (Logician)',
    badge: 'from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500',
    description: 'Tò mò, sáng tạo, đam mê phân tích lý thuyết và luôn tìm kiếm giải pháp mang tính đột phá cho cuộc sống.',
    traits: ['Khách quan', 'Sáng tạo', 'Tò mò', 'Phân tích'],
  },
  ENTJ: {
    title: 'Nhà Điều Hành (Commander)',
    badge: 'from-violet-600 to-fuchsia-600 dark:from-violet-500 dark:to-fuchsia-500',
    description: 'Quyết đoán, có tầm nhìn xa trông rộng, có khả năng tổ chức xuất sắc và kỹ năng lãnh đạo bẩm sinh.',
    traits: ['Lãnh đạo', 'Tầm nhìn', 'Quyết tâm', 'Hiệu quả'],
  },
  ENTP: {
    title: 'Kẻ Thách Thức (Debater)',
    badge: 'from-pink-600 to-rose-600 dark:from-pink-500 dark:to-rose-500',
    description: 'Nhạy bén, thích thử thách các giới hạn, tư duy ngoài khuôn khổ và cực kỳ hào hứng với các ý tưởng mới.',
    traits: ['Sáng tạo', 'Nhạy bén', 'Nhiệt huyết', 'Tranh biện'],
  },
  INFJ: {
    title: 'Người Bảo Vệ (Advocate)',
    badge: 'from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500',
    description: 'Có lý tưởng sống cao đẹp, trực giác sâu sắc, đồng cảm mạnh mẽ và luôn hướng tới các giá trị nhân văn.',
    traits: ['Đồng cảm', 'Lý tưởng', 'Sâu sắc', 'Tận tụy'],
  },
  INFP: {
    title: 'Nhà Hòa Giải (Mediator)',
    badge: 'from-green-600 to-emerald-650 dark:from-green-500 dark:to-emerald-550',
    description: 'Nhạy cảm, giàu lòng trắc ẩn, trung thành với các giá trị cá nhân và sở hữu một thế giới nội tâm vô cùng phong phú.',
    traits: ['Trắc ẩn', 'Lý tưởng', 'Nghệ thuật', 'Nhạy cảm'],
  },
  ENFJ: {
    title: 'Người Chỉ Dẫn (Protagonist)',
    badge: 'from-teal-600 to-cyan-600 dark:from-teal-500 dark:to-cyan-500',
    description: 'Có sức hút lớn, khả năng truyền cảm hứng mạnh mẽ, luôn khích lệ và đồng hành cùng sự phát triển của người khác.',
    traits: ['Truyền cảm hứng', 'Lôi cuốn', 'Ấm áp', 'Tổ chức'],
  },
  ENFP: {
    title: 'Người Truyền Cảm Hứng (Campaigner)',
    badge: 'from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-500',
    description: 'Nhiệt huyết, sáng tạo, tự do, giàu năng lượng tích cực và luôn nhìn thấy tiềm năng tốt đẹp ở mọi người.',
    traits: ['Sáng tạo', 'Hòa đồng', 'Tự do', 'Lạc quan'],
  },
  ISTJ: {
    title: 'Người Giám Sát (Logistician)',
    badge: 'from-slate-600 to-zinc-700 dark:from-slate-500 dark:to-zinc-650',
    description: 'Thực tế, đáng tin cậy, coi trọng quy tắc, trật tự xã hội và luôn hướng tới sự chính xác tuyệt đối trong công việc.',
    traits: ['Trách nhiệm', 'Thực tế', 'Trật tự', 'Kiên định'],
  },
  ISFJ: {
    title: 'Người Nuôi Dưỡng (Defender)',
    badge: 'from-slate-500 to-blue-600 dark:from-slate-400 dark:to-blue-500',
    description: 'Chu đáo, tận tụy, ấm áp và luôn sẵn lòng âm thầm hỗ trợ, bảo vệ những người xung quanh họ.',
    traits: ['Tận tụy', 'Ấm áp', 'Chu đáo', 'Yêu thương'],
  },
  ESTJ: {
    title: 'Người Quản Lý (Executive)',
    badge: 'from-neutral-600 to-slate-700 dark:from-neutral-500 dark:to-slate-650',
    description: 'Tổ chức tốt, thực tiễn, kiên định với mục tiêu và thích đưa mọi thứ đi vào nếp sống ngăn nắp, kỷ luật.',
    traits: ['Tổ chức', 'Quyết đoán', 'Trách nhiệm', 'Thực tế'],
  },
  ESFJ: {
    title: 'Người Quan Tâm (Consul)',
    badge: 'from-amber-600 to-orange-600 dark:from-amber-500 dark:to-orange-500',
    description: 'Hòa đồng, tận tụy, coi trọng mối quan hệ xã hội, thích giúp đỡ và đem lại niềm vui cho cộng đồng.',
    traits: ['Hòa đồng', 'Chu đáo', 'Tận tụy', 'Trách nhiệm'],
  },
  ISTP: {
    title: 'Nhà Kỹ Thuật (Virtuoso)',
    badge: 'from-yellow-600 to-amber-600 dark:from-yellow-500 dark:to-amber-500',
    description: 'Thực tế, linh hoạt, giỏi chế tạo thủ công và luôn tò mò thử nghiệm các công cụ, máy móc.',
    traits: ['Thực tế', 'Thích nghi', 'Tự lập', 'Khéo léo'],
  },
  ISFP: {
    title: 'Nghệ Sĩ (Adventurer)',
    badge: 'from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400',
    description: 'Sống trọn khoảnh khắc, yêu tự do, trân trọng cái đẹp nghệ thuật và không thích bị gò bó bởi quy tắc.',
    traits: ['Nghệ sĩ', 'Tự do', 'Nhạy cảm', 'Thực tế'],
  },
  ESTP: {
    title: 'Người Khởi Xướng (Entrepreneur)',
    badge: 'from-red-650 to-rose-600 dark:from-red-550 dark:to-rose-500',
    description: 'Năng động, thực tế, thích mạo hiểm, tư duy nhạy bén và hành động ngay lập tức để đạt kết quả thực tế.',
    traits: ['Năng động', 'Thực tế', 'Mạo hiểm', 'Nhạy bén'],
  },
  ESFP: {
    title: 'Người Trình Diễn (Entertainer)',
    badge: 'from-rose-500 to-pink-500 dark:from-rose-450 dark:to-pink-450',
    description: 'Vui vẻ, nhiệt tình, ngẫu hứng, yêu thích sự chú ý và có khả năng khuấy động không khí xung quanh họ.',
    traits: ['Nhiệt huyết', 'Vui vẻ', 'Thích nghi', 'Hòa đồng'],
  },
};

const getCareerIcon = (name: string) => {
  const lowercase = name.toLowerCase();
  if (
    lowercase.includes('phần mềm') ||
    lowercase.includes('lập trình') ||
    lowercase.includes('công nghệ') ||
    lowercase.includes('it') ||
    lowercase.includes('developer') ||
    lowercase.includes('khoa học máy tính') ||
    lowercase.includes('hệ thống')
  ) {
    return <Laptop className="text-blue-500" size={20} />;
  }
  if (
    lowercase.includes('thiết kế') ||
    lowercase.includes('mỹ thuật') ||
    lowercase.includes('design') ||
    lowercase.includes('nghệ thuật') ||
    lowercase.includes('đồ họa') ||
    lowercase.includes('kiến trúc')
  ) {
    return <Palette className="text-pink-500" size={20} />;
  }
  if (
    lowercase.includes('y tế') ||
    lowercase.includes('bác sĩ') ||
    lowercase.includes('dược sĩ') ||
    lowercase.includes('nha sĩ') ||
    lowercase.includes('điều dưỡng') ||
    lowercase.includes('y khoa') ||
    lowercase.includes('sức khỏe')
  ) {
    return <HeartPulse className="text-rose-500" size={20} />;
  }
  if (
    lowercase.includes('kinh doanh') ||
    lowercase.includes('marketing') ||
    lowercase.includes('tài chính') ||
    lowercase.includes('quản trị') ||
    lowercase.includes('sales') ||
    lowercase.includes('ngân hàng') ||
    lowercase.includes('kinh tế') ||
    lowercase.includes('phân tích dữ liệu')
  ) {
    return <TrendingUp className="text-emerald-500" size={20} />;
  }
  if (
    lowercase.includes('giáo dục') ||
    lowercase.includes('giáo viên') ||
    lowercase.includes('giảng viên') ||
    lowercase.includes('sư phạm') ||
    lowercase.includes('đào tạo') ||
    lowercase.includes('nghiên cứu')
  ) {
    return <GraduationCap className="text-amber-500" size={20} />;
  }
  if (
    lowercase.includes('luật') ||
    lowercase.includes('pháp lý') ||
    lowercase.includes('luật sư') ||
    lowercase.includes('thẩm phán')
  ) {
    return <Scale className="text-purple-500" size={20} />;
  }
  if (
    lowercase.includes('kỹ thuật') ||
    lowercase.includes('cơ khí') ||
    lowercase.includes('chế tạo') ||
    lowercase.includes('xây dựng') ||
    lowercase.includes('điện')
  ) {
    return <Wrench className="text-cyan-500" size={20} />;
  }
  if (
    lowercase.includes('du lịch') ||
    lowercase.includes('hướng dẫn viên') ||
    lowercase.includes('khách sạn') ||
    lowercase.includes('ẩm thực') ||
    lowercase.includes('nhà hàng')
  ) {
    return <Compass className="text-orange-500" size={20} />;
  }
  return <Briefcase className="text-slate-500" size={20} />;
};

export default function ResultPage() {
  const { testResult, assessmentResult, preTestResult, theme } = useStore();

  if (!testResult || !assessmentResult) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400">
          <FileText size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Chưa có kết quả đánh giá</h2>
          <p className="text-slate-500 max-w-sm">
            Bạn cần hoàn thành bài kiểm tra năng lực để AI phân tích lộ trình phù hợp.
          </p>
        </div>
        <Link
          to="/full-test"
          className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-primary/20"
        >
          Làm bài test ngay
        </Link>
      </div>
    );
  }

  // Calculate MBTI Code
  const getMbtiType = (factorScores: Record<string, number>) => {
    if (!factorScores) return 'INFP';
    const e = factorScores['E'] ?? 0;
    const s = factorScores['S'] ?? 0;
    const t = factorScores['T'] ?? 0;
    const j = factorScores['J'] ?? 0;

    return [
      e >= 50 ? 'E' : 'I',
      s >= 50 ? 'S' : 'N',
      t >= 50 ? 'T' : 'F',
      j >= 50 ? 'J' : 'P',
    ].join('');
  };

  const mbti = getMbtiType(assessmentResult.factorScores);
  const mbtiDetail = MBTI_DETAILS[mbti] || {
    title: 'Nhà Hòa Giải (Mediator)',
    badge: 'from-green-600 to-emerald-650',
    description: 'Có lý tưởng sống cao đẹp, trực giác sâu sắc, luôn hướng tới giá trị nhân văn.',
    traits: ['Hòa giải', 'Đồng cảm', 'Trắc ẩn'],
  };

  const radarData = [
    { trait: 'LOGIC', actual: testResult.logic, perception: preTestResult?.logic || 50 },
    { trait: 'CREATIVITY', actual: testResult.creativity, perception: preTestResult?.creativity || 50 },
    { trait: 'COMMUNICATION', actual: testResult.communication, perception: preTestResult?.communication || 50 },
    { trait: 'DISCIPLINE', actual: testResult.discipline, perception: preTestResult?.discipline || 50 },
    { trait: 'TEAMWORK', actual: testResult.teamwork, perception: preTestResult?.teamwork || 50 },
    { trait: 'SELF-LEARNING', actual: testResult.selfLearning, perception: preTestResult?.selfLearning || 50 },
  ];

  const renderDimensionBar = (
    leftKey: string,
    rightKey: string,
    leftLabel: string,
    rightLabel: string
  ) => {
    const leftVal = assessmentResult.factorScores[leftKey] ?? 50;
    const rightVal = assessmentResult.factorScores[rightKey] ?? 50;

    return (
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-bold">
          <span
            className={
              leftVal >= 50
                ? 'text-primary dark:text-primary-light font-extrabold'
                : 'text-slate-400 dark:text-slate-500'
            }
          >
            {leftLabel} ({leftVal}%)
          </span>
          <span
            className={
              rightVal > 50 ? 'text-indigo-500 font-extrabold' : 'text-slate-400 dark:text-slate-500'
            }
          >
            ({rightVal}%) {rightLabel}
          </span>
        </div>
        <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800/80 rounded-full relative overflow-hidden flex">
          <div
            style={{ width: `${leftVal}%` }}
            className={`h-full transition-all duration-500 ${
              leftVal >= 50 ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'
            }`}
          />
          <div
            style={{ width: `${rightVal}%` }}
            className={`h-full transition-all duration-500 ${
              rightVal > 50 ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-755'
            }`}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 py-10 px-4 max-w-6xl mx-auto">
      {/* Header Info */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-8">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-wider">
            <Sparkles size={12} /> Phân tích chuyên sâu từ AI
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
            Kết quả đánh giá năng lực & tính cách
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-base md:text-lg">
            Hệ thống đã phân tích hồ sơ năng lực của bạn, đối chiếu với các nhóm tính cách MBTI và đề xuất lộ trình phù hợp nhất.
          </p>
        </div>
        <div className="flex flex-col md:items-end bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl p-4 shrink-0">
          <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            Độ lệch Bias tự nhận thức
          </span>
          <div className="text-3xl font-black text-primary flex items-center gap-2 mt-1">
            {assessmentResult.biasPercentage}% <TrendingDown className="text-green-500" />
          </div>
          <span className="text-[11px] text-slate-400 mt-1 max-w-[200px] md:text-right">
            Sự khác biệt giữa nhận thức ban đầu và điểm số thực tế.
          </span>
        </div>
      </header>

      {/* Main Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: MBTI Card & AI insight */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* Detailed MBTI Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-primary/5 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-500 text-xs font-bold uppercase tracking-wider">
                <UserCheck size={14} /> Nhóm tính cách của bạn
              </span>

              <div className="flex items-baseline gap-3">
                <span
                  className={`text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r ${mbtiDetail.badge}`}
                >
                  {mbti}
                </span>
                <span className="text-slate-400 font-medium">/ MBTI Type</span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
                  {mbtiDetail.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {mbtiDetail.description}
                </p>
              </div>

              {/* Traits Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {mbtiDetail.traits.map((trait) => (
                  <span
                    key={trait}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-primary/10 dark:bg-primary/20 text-primary border border-primary/20"
                  >
                    #{trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Dimension Progress Bars */}
            <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                Chi tiết các chiều tính cách
              </h4>
              <div className="space-y-3">
                {renderDimensionBar('E', 'I', 'Hướng ngoại (E)', 'Hướng nội (I)')}
                {renderDimensionBar('S', 'N', 'Giác quan (S)', 'Trực giác (N)')}
                {renderDimensionBar('T', 'F', 'Lý trí (T)', 'Cảm xúc (F)')}
                {renderDimensionBar('J', 'P', 'Nguyên tắc (J)', 'Linh hoạt (P)')}
              </div>
            </div>
          </div>

          {/* Next Exploration Paths */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-md">
            <h4 className="font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <ArrowRight className="text-amber-500" size={18} /> Khám phá các bước tiếp theo
            </h4>
            <div className="grid gap-3">
              <Link
                to="/careers"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-850 border border-transparent hover:border-slate-200/50 dark:hover:border-slate-800/80 transition-all group"
              >
                <div className="size-11 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                  <FileText size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-sm text-slate-800 dark:text-slate-150 group-hover:text-primary transition-colors">
                    Thư viện nghề nghiệp
                  </p>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    So sánh các lộ trình và mô tả vị trí chi tiết
                  </p>
                </div>
                <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/mentors"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-850 border border-transparent hover:border-slate-200/50 dark:hover:border-slate-800/80 transition-all group"
              >
                <div className="size-11 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <UserPlus size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-sm text-slate-800 dark:text-slate-150 group-hover:text-primary transition-colors">
                    Kết nối Mentor phù hợp
                  </p>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    Nhận hướng dẫn phát triển kỹ năng từ chuyên gia
                  </p>
                </div>
                <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Radar Chart & AI Insights */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Radar Chart Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-slate-850 dark:text-slate-100 flex items-center gap-2">
                <BarChart3 size={18} className="text-primary" /> Bản đồ thế mạnh năng lực (Radar Chart)
              </h3>
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1">
                  <span className="size-2 bg-primary rounded-full" /> Thực tế
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <span className="size-2 bg-slate-300 dark:bg-slate-650 rounded-full" /> Nhận thức
                </span>
              </div>
            </div>
            <div className="h-[360px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                  <PolarAngleAxis
                    dataKey="trait"
                    tick={{ fill: theme === 'dark' ? '#94a3b8' : '#64748b', fontSize: 11, fontWeight: 'bold' }}
                  />
                  <RadarArea
                    name="Perception"
                    dataKey="perception"
                    stroke={theme === 'dark' ? '#475569' : '#94a3b8'}
                    fill={theme === 'dark' ? '#475569' : '#94a3b8'}
                    fillOpacity={0.06}
                    strokeDasharray="4 4"
                  />
                  <RadarArea
                    name="Actual"
                    dataKey="actual"
                    stroke="#6467f2"
                    fill="#6467f2"
                    fillOpacity={0.25}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insights Card */}
          <div className="bg-gradient-to-br from-primary/5 via-indigo-500/5 to-purple-500/5 border border-primary/20 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                <Lightbulb size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Nhận xét của AI</span>
                <h3 className="font-extrabold text-base md:text-lg text-primary-dark dark:text-primary-light">
                  {assessmentResult.insight.headline}
                </h3>
              </div>
            </div>
            <p className="text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-350 font-medium italic pl-4 border-l-4 border-primary/30">
              "{assessmentResult.insight.summary}"
            </p>
            <div className="p-4 bg-white/70 dark:bg-slate-900/60 rounded-2xl text-sm leading-relaxed text-slate-650 dark:text-slate-400 border border-primary/10 shadow-sm">
              <strong className="block text-slate-800 dark:text-slate-200 mb-1">Gợi ý lộ trình phát triển:</strong>
              {assessmentResult.insight.recommendation}
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Careers Grid */}
      <section className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2">
              <Compass className="text-primary" /> Nghề nghiệp phù hợp nhất với bạn
            </h2>
            <p className="text-sm text-slate-500">
              Kết quả so sánh giữa hồ sơ năng lực của bạn với yêu cầu của hơn 100+ vị trí công việc.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessmentResult.recommendedCareers.map((career) => {
            const matchScore = career.matchScore;
            const isHighMatch = matchScore >= 80;

            return (
              <Link
                key={career.careerId}
                to={`/careers/${career.careerId}`}
                className="group relative flex flex-col justify-between p-6 bg-white/75 dark:bg-slate-900/75 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/80 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/45"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:scale-110 transition-transform shadow-sm">
                      {getCareerIcon(career.name)}
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-black tracking-wide ${
                        isHighMatch
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-primary/10 text-primary border border-primary/20'
                      }`}
                    >
                      {matchScore}% Tương thích
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors line-clamp-1">
                      {career.name}
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                      Bản đồ phát triển sự nghiệp
                    </p>
                  </div>

                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {career.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-primary transition-colors">
                  <span>Khám phá lộ trình chi tiết</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
