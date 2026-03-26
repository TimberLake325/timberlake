import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import { getFooterData } from '@/actions/footer'
import { getNavbarServices } from '@/actions/servicesService'
import ScrollToTop from '@/components/common/ScrollToTop'
import CursorFollower from '@/components/ui/CursorFollower'

const WebPage = async ({ children }: { children: React.ReactNode }) => {
    const [footerDataRaw, serviceCategories] = await Promise.all([
        getFooterData(),
        getNavbarServices()
    ]);
    const footerData = JSON.parse(JSON.stringify(footerDataRaw));

    return (
        <>
            <Navbar serviceCategories={serviceCategories} />
            <main className="grow pt-28">
                {children}
            </main>
            <Footer data={footerData} />
            <ScrollToTop />
            <CursorFollower />
        </>
    )
}

export default WebPage