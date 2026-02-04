import GithubLogo from "@/assets/icons/github.svg";
import LinkedInLogo from "@/assets/icons/linkedin.svg";

export default function Footer() {
    return (
        <>
            <div className="flex flex-col gap-5 mx-4 py-5.5 md:mx-10 md:py-5 md:flex-row-reverse md:justify-between md:items-center lg:mx-26 lg:py-7">
                <div className="flex md:gap-10">
                    <div className="flex flex-col gap-4 font-roboto text-lg text-[#1A1B22] md:flex-row">
                        <div>Home</div>
                        <div>TripleTen</div>
                    </div>
                    <div className="flex ml-auto gap-6">
                        <img
                            src={GithubLogo}
                            alt="GitHub"
                            className="h-6 w-6 cursor-pointer"
                        />
                        <img
                            src={LinkedInLogo}
                            alt="LinkedIn"
                            className="h-6 w-6 cursor-pointer"
                        />
                    </div>
                </div>
                <div className="font-roboto text-base text-[#B6BCBF] text-center ">© 2026 Supersite, Powered by News API</div>
            </div>
        </>
    )
}