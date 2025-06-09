const Main: React.FC = () => {
  return (
    <>
      <Header />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div className="w-screen h-screen"></div>}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Main; // <-- crucial line
