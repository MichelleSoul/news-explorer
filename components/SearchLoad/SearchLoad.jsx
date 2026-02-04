import Loader from "@/assets/icons/loading.svg";

export default function SearchLoad() {
    return (
        <div className="bg-[#F5F6F7] h-70.5 py-20">
            <img
                src={Loader}
                alt="Loader"
                className="mx-auto mb-6 animate-spin [animation-direction:reverse]"
            />
            <p className="font-roboto text-lg text-center text-[#6C707A] ">Searching for news...</p>
        </div>
    )
}