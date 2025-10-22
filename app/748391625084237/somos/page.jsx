"use client";

import React from 'react';
import Nosotros from '../somos/componentes/main1'
import Header from '../somos/componentes/header'
import CardNosotro from './componentes/cardNosotros'
import Elegirnos from './componentes/elejirnnos'
import Footer from '../components/footer'
import Menu from '../components/mainCards'
export default function Page() {
  return (
    <div>
        <Header />
    
      <CardNosotro />
      <Menu />
      <Elegirnos />
      <Footer />
    </div>
  );
}