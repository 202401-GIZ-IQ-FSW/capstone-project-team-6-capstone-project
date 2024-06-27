import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function about() {
  return (
    <div className="bg-white text-black">
      <div className="container mx-auto p-6">
        <section className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Introduction</h1>
          <p>
          In today's fast-paced digital environment, effective IT support is crucial for maintaining smooth operations and ensuring user satisfaction. 
          Our state-of-the-art ticketing system is designed to streamline the IT support process, providing a centralized platform where users can submit, track, 
          and manage their technical issues and requests. This system enhances communication between users and IT staff, ensures timely resolution of issues, and allows for efficient 
          prioritization of tasks. With a user-friendly interface and robust features, our ticketing system is an indispensable tool for optimizing IT support workflows and delivering exceptional service.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Team Members</h2>
          <div className="flex flex-wrap justify-center">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4">
              <div className="text-center">
                <Image
                  src="https://avatars.githubusercontent.com/u/157487016?v=4"
                  alt="Shvan"
                  width={150}
                  height={150}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-lg font-semibold mt-2">Shvan</h3>
                <p className="text-sm">Full-Stack Developer</p>
                
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4">
              <div className="text-center">
                <Image
                  src="https://media.licdn.com/dms/image/D4D03AQEgZ6WcBwSCPA/profile-displayphoto-shrink_800_800/0/1699559643549?e=1724889600&v=beta&t=Mhpi53IOlDHQonS5SqWhyll2x5v5TK0G4sDfEyCJHF8"
                  alt="Didam Goran"
                  width={150}
                  height={150}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-lg font-semibold mt-2">Didam Goran</h3>
                <p className="text-sm">Full-Stack Developer</p>
              
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4">
              <div className="text-center">
                <Image
                  src="https://avatars.githubusercontent.com/u/147993556?v=4 "
                  alt="Omer"
                  width={150}
                  height={150}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-lg font-semibold mt-2">Omer Sardar</h3>
                <p className="text-sm">Full-Stack Developer</p>
                
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4">
              <div className="text-center">
                <Image
                  src="https://avatars.githubusercontent.com/u/60324410?v=4"
                  alt="Vinos"
                  width={150}
                  height={150}
                  className="rounded-full mx-auto"
                  unoptimized
                />
                <h3 className="text-lg font-semibold mt-2">Vinos</h3>
                <p className="text-sm">Full-Stack Developer</p>
                
              </div>
            </div>    
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4">
              <div className="text-center">
                <Image
                  src="https://avatars.githubusercontent.com/u/128333823?v=4"
                  alt="Jwan"
                  width={150}
                  height={150}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-lg font-semibold mt-2">Jwan</h3>
                <p className="text-sm">Full-Stack Developer</p>
                
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Mission & Vision</h2>
          <p>
          Our mission is to provide outstanding products and services while maintaining a strong commitment to integrity and innovation. 
          We strive to exceed customer expectations by continuously improving and embracing new ideas to stay at the forefront of our industry.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Company History</h2>
          <p>
          Established in 2024, Company Name has been at the forefront of industry advancements, 
          pioneering innovative technologies that redefine industry standards. 
          With milestones such as launching groundbreaking products and securing strategic partnerships, 
          we continue to lead the way in shaping the future of our field.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <address>
            <p>Address: 123 Company Street, City, Country</p>
            <p>Phone: +123 456 7890</p>
            <p>Email: info@company.com</p>
          </address>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-2xl">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="text-2xl">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="text-2xl">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
