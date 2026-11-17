@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 40 20% 98%;
    --foreground: 24 10% 10%;
    --card: 0 0% 100%;
    --card-foreground: 24 10% 10%;
    --primary: 24 10% 10%;
    --primary-foreground: 40 20% 98%;
    --muted: 40 12% 94%;
    --muted-foreground: 24 6% 40%;
    --accent: 28 45% 38%;
    --accent-foreground: 40 20% 98%;
    --destructive: 0 70% 42%;
    --destructive-foreground: 0 0% 100%;
    --success: 152 45% 32%;
    --border: 40 12% 89%;
    --input: 40 12% 86%;
    --ring: 24 10% 10%;
    --radius: 0.625rem;
  }
  * { @apply border-border; }
  body {
    @apply bg-background text-foreground antialiased;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
}
