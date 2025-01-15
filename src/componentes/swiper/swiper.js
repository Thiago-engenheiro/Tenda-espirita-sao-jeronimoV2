import './swiper.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Scrollbar, A11y, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';


const SwiperComponent = () => {
    return (

            <section className='carrocel'>
                <Swiper
                modules={[Scrollbar, A11y, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
            
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                parallax={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
                <SwiperSlide>

                    <img className='Ilustração' src='/imagens/umbandaIlustração/DesignSemNome1.png' alt='Ilustração'></img>
                    
                </SwiperSlide>

                <SwiperSlide>

                    <img className='Ilustração' src='/imagens/umbandaIlustração/DesignSemNome2.png' alt='Ilustração'></img>
                    
                </SwiperSlide>

                <SwiperSlide>

                    <img className='Ilustração' src='/imagens/umbandaIlustração/DesignSemNome3.png' alt='Ilustração'></img>
               
                </SwiperSlide>

                <SwiperSlide>

                    <img className='Ilustração' src='/imagens/umbandaIlustração/DesignSemNome4.png' alt='Ilustração'></img>

                </SwiperSlide>
                
                </Swiper>

                <div className='connteudoSwiper'>
                    <h3 className='subtituloSwiper'>FÉ - AMOR - CARIDADE E FRATERNIDADE</h3>
                    <p className='TextoSwiper'>Fundada desde 1963</p>
                </div>


            </section>
     
    );
  };

  export default SwiperComponent;