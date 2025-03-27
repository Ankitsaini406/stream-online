import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";

export default function ChilddLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <>
            <Header />
            <SmoothScroll>
                <main>
                    {children}
                </main>
            </SmoothScroll>
            <Footer />
        </>
    )
}