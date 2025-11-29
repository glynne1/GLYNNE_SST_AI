'use client'
import Header from './components/heder'
import Main1 from './components/main1'
import SocialShowcase from './components/Coontacto'
import Footer from './components/footer'
export default function Page() {
    return (
        <div className="w-full flex flex-col">
            {/* Sección principal */}

            <div>
                <Header />
            </div>
            <div>
                <Main1 />
            </div>

            {/* Sección de redes sociales */}
            <div className="mt-20">
                <SocialShowcase />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}
