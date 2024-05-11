// Home.jsx
import React, { useState, useEffect } from "react";
import image1 from "../../assets/img/image1.jpg";
import image2 from "../../assets/img/image2.jpg";
import image3 from "../../assets/img/image3.jpg";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { Screen } from "../Screen";
import AboutSection from "../aboutus/AboutSection";
import Footer from "../footer/Footer";

export const Home = () => {
    const slides = [
        {
            url: image1
        },
        {
            url: image2
        },
        {
            url: image3
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div>
            <Screen>
                <div className="h-screen overflow-hidden">
                    <div className=" h-full w-full group ">
                        <div
                            style={{
                                backgroundImage: `url(${slides[currentIndex].url})`
                            }}
                            className="w-full h-full bg-center bg-cover duration-1000"
                        ></div>

                        <div className="hidden group-hover:block absolute top-[50%] transform left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                            <BsChevronCompactLeft
                                onClick={prevSlide}
                                size={30}
                            />
                        </div>
                        <div className="hidden group-hover:block absolute top-[50%] transform -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                            <BsChevronCompactRight
                                onClick={nextSlide}
                                size={30}
                            />
                        </div>
                        <div className="flex justify-center py-2 absolute bottom-4 w-full">
                            {slides.map((slide, slideIndex) => (
                                <div
                                    key={slideIndex}
                                    onClick={() => goToSlide(slideIndex)}
                                    className="text-2xl cursor-pointer"
                                >
                                    <RxDotFilled />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Screen>
            <AboutSection />
            <Footer />
        </div>
    );
};

export default Home;
