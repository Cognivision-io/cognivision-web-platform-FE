import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="text-center">
        <h1 className="mb-2 text-5xl font-bold text-gray-900">404</h1>
        <p className="mb-6 text-lg text-gray-600">Oops! Page not found</p>
        <Link href="/" className="text-primary underline underline-offset-4 hover:text-primary/80">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
