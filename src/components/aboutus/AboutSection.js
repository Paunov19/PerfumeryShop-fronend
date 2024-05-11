import React from "react";
import { Link } from "react-router-dom";

const AboutSection = () => {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-75 p-8 rounded-lg max-w-screen">
            <section id="about" className="py-8 text-center">
                <div className="container mx-auto">
                    <div className="w-full p-6 flex flex-col items-center">
                        <h2 className="text-4xl font-semibold mb-4 font-courgette text-black">
                            Добре дошли
                        </h2>
                        <p className="text-black-900 font-courgette">
                            Добре дошли в нашия магазин за подаръчни парфюмни
                            комплекти.
                        </p>
                    </div>
                    <Link to="/menu">
                        <button className="input-button" type="submit">
                            Разгледай нашите предложения
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AboutSection;
