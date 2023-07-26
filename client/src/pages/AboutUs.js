import React from 'react';
import Navbar from './Navbar';
import backend from '../functions/backend.js';

const AboutUsPage = () => {
    return (
        <div className="p-3">
            <Navbar />
            <div className="bg-[hsla(0,0%,100%,0.55)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] p-9 rounded-sm mb-3 text-lg">
                <h3 className="text-xl md:text-2xl font-bold truncate mb-4">About Us</h3>
                <p className="mb-4">
                    At 'Do You Have It Extra?', our prime mission is to achieve societal equality through even distribution of assets among people. We firmly believe that equitable resource distribution is vital and pivotal for creating a fair and just society. Our platform serves as a catalyst for change, connecting certified NGOs with generous individuals like you, facilitating the donation of surplus goods to those in need.
                </p>

                <p className="mb-4">
                    We are committed to fostering a culture of giving and social responsibility, empowering individuals to share their surplus resources with those less fortunate. Through our user-friendly interface, you can easily contribute to meaningful causes and make a significant impact on the lives of underserved communities.
                </p>

                <p className="mb-4">
                    Our team is dedicated to advocating for sustainable practices, eliminating waste, and channeling surplus resources to where they are most needed. We collaborate closely with NGOs and individuals to address pressing social challenges and work towards a greener planet.
                </p>

                <p className="mb-4">
                    Together, let's build an inclusive and equitable society where everyone has access to essential resources and opportunities. Our vision is to create a world where compassion and generosity are universal values, and no one is left behind. Join us in our mission to bring about lasting change and make a positive difference in the lives of countless people. Together, we can create a future where every individual has the opportunity to thrive and lead a dignified life.
                </p>
            </div>

            <div className="bg-[hsla(0,0%,100%,0.55)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] p-9 rounded-sm mb-3 text-lg">
                <h3 className="text-xl md:text-2xl font-bold truncate mb-4">Our Mission</h3>
                <p className="mb-4">
                    Our mission at 'Do You Have It Extra?' is driven by our unwavering commitment to societal equality. We aim to create a world where resources are distributed equitably, leaving no one behind. Our platform serves as a dynamic bridge, connecting compassionate donors with certified NGOs to facilitate the seamless donation of surplus goods.
                </p>

                <p className="mb-4">
                    We are dedicated to empowering individuals to take an active role in creating positive change. By encouraging the sharing of surplus resources, we enable our community to make a meaningful impact on the lives of those less fortunate. We believe that collective acts of kindness can lead to transformative results.
                </p>

                <p className="mb-4">
                    Through transparent and accountable practices, we strive to ensure that every contribution matters. Our focus is on amplifying the efforts of NGOs, enabling them to efficiently channel resources to beneficiaries in need. Together, we can address societal inequalities and promote a more balanced and compassionate world.
                </p>
            </div>

            <div className="bg-[hsla(0,0%,100%,0.55)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] p-9 rounded-sm text-lg">
                <h3 className="text-xl md:text-2xl font-bold truncate mb-4">Our Vision</h3>
                <p className="mb-4">
                    At 'Do You Have It Extra?', we envision a future where societal equality is not just a dream, but a reality. Our vision is centered around a world where assets are distributed fairly, irrespective of social background or economic status. We envision a society where every individual's basic needs are met, fostering an inclusive and compassionate community.
                </p>

                <p className="mb-4">
                    We aspire to be at the forefront of sustainable change, advocating for responsible practices and minimizing wastage of valuable resources. By collaborating with NGOs and individuals, we aim to tackle pressing social challenges, addressing issues related to hunger, poverty, and access to education and healthcare.
                </p>

                <p>
                    Our vision extends beyond charity; we strive to create long-lasting solutions that empower individuals to break free from the cycle of poverty. We firmly believe that by fostering a culture of giving and empathy, we can build a future where everyone has the opportunity to realize their full potential.
                </p>
            </div>
        </div>
    );
};

export default AboutUsPage;
