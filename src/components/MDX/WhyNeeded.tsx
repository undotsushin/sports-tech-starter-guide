interface WhyNeededProps {
  children: React.ReactNode;
}

export default function WhyNeeded({ children }: WhyNeededProps) {
  return (
    <div className="my-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-3 !border-b-0 !pb-0 !mt-0">
        なぜ必要か
      </h2>
      <div className="text-gray-800 text-lg leading-relaxed">
        {children}
      </div>
    </div>
  );
}
