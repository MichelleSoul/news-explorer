import AuthorImage from "@/assets/images/michelle.webp";

export default function Author() {
    return (
        <div className="px-4 flex flex-col md:flex-row md:px-10 md:gap-8 lg:gap-14 lg:px-26">
            <div
                className="w-68 h-68 bg-gray-400 mx-auto mt-8 mb-6 rounded-full md:shrink-0 md:w-58 md:h-58 md:my-15.25 lg:w-116 lg:h-116 lg:my-20"
                style={{
                    backgroundImage: `url(${AuthorImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <div className="mb-32 md:mb-0 md:mt-10 lg:mt-32.75">
                <h1 className="font-slab text-3xl mb-4 lg:text-[40px]">About the author</h1>
                <p className="font-roboto text-lg leading-6 mb-6">Hi, I’m Michelle an ultrasound sonographer technologist with a passion for both healthcare and technology. I learned the fundamentals of software engineering, including HTML, CSS, JavaScript, React, and both front-end and back-end development.</p>
                <p className="font-roboto text-lg leading-6 ">My goal is to combine my healthcare background with my technical skills.</p>
            </div>
        </div>
    )
}
