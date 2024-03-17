import { useRouter } from "next/navigation";
export default function Country1(country) {
	const router = useRouter();
	//used to navigate in the corder country details
	const showCountryDetails = () => {
		router.push(`/country/${country.name.common}`);
	};
	return (
		<div
			className="flex flex-col bg-[#FFF] dark:bg-[#2B3844]  gap-4  rounded-md pb-2 hover:scale-105  cursor-pointer  transition 	"
			onClick={showCountryDetails}>
			<img
				className="w-full  h-2/5  rounded-t-md "
				src={country.flags.png}
				alt="flag photo"></img>

			<h2 className="  font-semibold   capitalize text-lg px-3 ">
				{" "}
				{country.name.common}
			</h2>

			<div className="px-3 capitalize font-display  ">
				<p>
					<strong className="font-semibold  text-sm "> population</strong>:{" "}
					<span className=" font-thin">
						{" "}
						{country.population.toLocaleString()}{" "}
					</span>
				</p>
				<p>
					<strong className="font-semibold  text-sm ">region</strong>:{" "}
					<span className=" font-thin">{country.region}</span>{" "}
				</p>
				<p>
					<strong className="font-semibold  text-sm ">capital</strong>:{" "}
					<span className=" font-thin">
						{country?.["capital"]?.[0] ? country.capital[0] : "have no capital"}
					</span>
				</p>
			</div>
		</div>
	);
}
