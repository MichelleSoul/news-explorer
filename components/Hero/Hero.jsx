import { forwardRef } from "react";
import Button from "../Button/Button";
import HeroImage from "@/assets/images/hero.png";

const Hero = forwardRef((props, ref) => {
    const { onSearch = () => {}, error = "" } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        const search = e.target.search.value;
        onSearch(search);
    };

    return (
        <section ref={ref}>
            <div className="
                    bg-gray-500 bg-cover bg-center bg-blend-multiply
                    pt-21.5 pb-8 px-4

                    md:flex md:flex-col md:items-center
                    md:pt-26 md:pb-12
                    lg:pt-40 lg:pb-20
                " style={{ backgroundImage: `url(${HeroImage})`
            }}>
                <h1 className="font-slab text-4xl text-white mb-4 md:w-113 lg:w-152 lg:mb-8">What's going on in the world?</h1>
                <p className="font-roboto text-lg text-white mb-30.5 md:w-113 lg:w-152">Find the latest news on any topic and save them in your personal account.</p>
                <form className="relative md:w-113 lg:w-152" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            id="search"
                            placeholder="Nature"
                            className="w-full h-14 lg:h-16 bg-white border border-[#D1D2D6] rounded-full px-4 py-4.25 md:pr-28 font-inter text-base outline-none"
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-2 font-roboto">{error}</p>
                        )}
                    </div>
                    <Button type="submit" className="h-14 lg:h-16 mt-4 w-full md:mt-0 md:w-40 md:absolute md:right-0 md:top-0 " >Search</Button>
                </form>
            </div>

        </section>
    )
})

export default Hero;