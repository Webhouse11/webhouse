import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-black/5 mb-4">404</h1>
        <div className="relative -mt-24">
          <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-black/60 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center px-8 py-3 bg-emerald-500 text-white font-bold rounded-full hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
