import useTheme from "../hooks/useTheme";

function DashboardPage() {
  const { theme } = useTheme();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className={`
          p-4 rounded 
          ${theme.secondary}
        `}>
        <p>This is a content section with theme-specific styling.</p>
      </div>

      <button className={`
          px-4 py-2 rounded
          ${theme.primary}
        `}>
        Primary Action
      </button>
    </div>
  );
}

export default DashboardPage;
