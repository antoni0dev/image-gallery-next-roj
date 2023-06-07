import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Chivo_Mono } from "next/font/google";
import { Container, SSRProvider } from "@/components/bootstrap";
import NavBar from "./Navbar";

export const chivo_mono = Chivo_Mono({
  subsets: ["latin"],
});

export const metadata = {
  title: "Next JS 13.4 Image Gallery",
  description: "A cool image gallery",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={chivo_mono.className}>
        <NavBar />
        <main>
          <SSRProvider>
            <Container className="py-4">
              {/* The reason why all children that are Server Components still work even though we wrap them with a Client Component (i.e. Container) is because our Server Components are not imported in Container and returned there. Instead, we are passing them as a children prop. When we pass a component as a prop, React doesn't need to know in advance what the component type will be but instead creates an empty whole in the component. */}
              {children}
            </Container>
          </SSRProvider>
        </main>
      </body>
    </html>
  );
}
