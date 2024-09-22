import { Footer } from "../../../widgets/footer/ui";
import { Header } from "../../../widgets/header/ui";
import { LayoutProps } from "../model/types";

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen md:flex justify-center">
      <Header />
      <main className="pt-14 px-4 h-dvh max-w-[1280px]">{children}</main>
      <Footer />
    </div>
  );
}
