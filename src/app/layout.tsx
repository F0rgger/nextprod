import ReactQueryProvider from "@/components/ReactQueryProvider";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
        <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ReactQueryProvider>
            <Navbar />
            <main className="container mx-auto p-4">{children}</main>
        </ReactQueryProvider>
        </body>
        </html>
    );
}
