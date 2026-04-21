import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-white font-['IBM_Plex_Sans',sans-serif]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
