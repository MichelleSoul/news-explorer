export default function Author() {
    return (
        <div className="px-4 flex flex-col md:flex-row md:px-10 md:gap-8 lg:gap-14 lg:px-26">
            <div className="w-68 h-68 bg-gray-400 mx-auto mt-8 mb-6 rounded-full md:shrink-0 md:w-58 md:h-58 md:my-15.25 lg:w-116 lg:h-116 lg:my-20" />
            <div className="mb-32 md:mb-0 md:mt-10 lg:mt-32.75">
                <h1 className="font-slab text-3xl mb-4 lg:text-[40px]">About the author</h1>
                <p className="font-roboto text-lg leading-6 mb-6">This block describes the project author. Here you should indicate your name, what you do, and which development technologies you know.</p>
                <p className="font-roboto text-lg leading-6 ">You can also talk about your experience with TripleTen, what you learned there, and how you can help potential customers.</p>
            </div>
        </div>
    )
}