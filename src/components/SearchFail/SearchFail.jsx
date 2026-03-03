import NotFound from "@/assets/icons/not-found.svg";

export default function SearchLoad() {
    return (
        <div className="bg-[#F5F6F7] h-93.5 py-20">
            <img
                src={NotFound}
                alt="Not Found"
                className="mx-auto mb-8"
            />
            <h1 className="font-slab text-[26px] text-center text-[#6C707A] ">Nothing found</h1>
            <p className="font-roboto text-lg text-center text-[#6C707A] leading-6 ">Sorry, but nothing matched <br /> your search terms.</p>
        </div>
    )
}