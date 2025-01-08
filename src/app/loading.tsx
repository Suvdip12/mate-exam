export default function Loading() {
  return (
    <div className="mt-8 flex h-full flex-col items-center justify-center">
      <svg className="loading" viewBox="25 25 50 50">
        <circle className="circle" r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
}
