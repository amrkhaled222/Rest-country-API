"use client";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

export default function CountrDetails(porps) {
	const [country, setCountry] = useState([]);
	const [islaoding, setLoading] = useState(true);
	const [newCountry, setNewCountry] = useState({
		countryData: "",
		countryCode: "",
	});

	const router = useRouter();
	useEffect(() => {
		const data = fetch(
			`https://restcountries.com/v3.1/name/${porps.params.countryName}`
		)
			.then((data) => {
				return data.json();
			})

			.then((res) => {
				setCountry(() => {
					setLoading(false);
					return res[0];
				});
			});
	}, []);

	useEffect(() => {
		if (newCountry.countryData != "") {
			router.push(`/country/${newCountry.countryData[0].name.common}`);
		}
	}, [newCountry.countryData]);

	useEffect(() => {
		if (newCountry.countryCode != "") {
			const data = fetch(
				`https://restcountries.com/v3.1/alpha/${newCountry.countryCode}`
			)
				.then((data) => {
					return data.json();
				})
				.then((res) => {
					setNewCountry((olddata) => {
						return {
							...olddata,
							countryData: res,
						};
					});
				});
		}
	}, [newCountry.countryCode]);

	const handlBorderButton = (code) => {
		setNewCountry((e) => {
			return { ...e, countryCode: code };
		});
	};

	const handleBackButton = () => {
		router.push(`/`);
	};
	//
	return islaoding ? (
		<div className=" min-h-lvh flex justify-center items-center dark:bg-[#202C36] ">
			{" "}
			<div className="w-52 h-52  border-transparent border-solid border-r-8 border-y-4   border-r-black animate-spin rounded-full dark:border-r-[#2B3844]">
				{" "}
			</div>
		</div>
	) : (
		<div className="pt-28 dark:bg-[#202C36] min-h-lvh  ">
			<div className="container m-auto px-8">
				<button
					onClick={handleBackButton}
					className=" flex items-center  hover:scale-110 transition-all shadow-md font-display justify-center w-36 h-11 dark:bg-[#2B3844] relative after:contents-[''] after:block after:absolute after:w-4 after:h-4 after:bg-contain after:bg-no-repeat after:bg-center after:bg-[url(../../public/right-arrow.png)] after:rotate-180 after:left-5 after:top-1/2 after:-translate-y-1/2 rounded-md">
					Back
				</button>
			</div>
			<div className="container flex  m-auto  flex-col lg:flex-row  gap-12 pt-20 px-8">
				<img
					className="  lg:basis-1/2  w-full  max-h-[400px] lg:max-w-[560px] rounded-t-md justify-center items-center  "
					src={country.flags.png}
					alt="flag photo"></img>
				<div className=" basis-1/2   lg:pl-16 lg:pt-8 grid   ">
					<h2 className="  font-bold    capitalize text-4xl  ">
						{" "}
						{country.name.common}
					</h2>
					<div className="flex   justify-start gap-8  text-m pt-4  sm:flex-row flex-col">
						{" "}
						<div className="flex flex-col gap-2 ">
							<p className="  font-thin capitalize">
								<strong className=" font-semibold "> native name</strong>:{" "}
								{Object.values(country.name.nativeName)[0].common}
							</p>
							<p className=" font-thin capitalize">
								<strong className=" font-semibold "> Population</strong>:{" "}
								{country.population.toLocaleString()}
							</p>
							<p className=" font-thin capitalize">
								<strong className=" font-semibold "> Region</strong>:{" "}
								{country.region}
							</p>
							<p className="  font-thin capitalize">
								<strong className=" font-semibold ">Sub Region</strong>:{" "}
								{country.subregion}
							</p>
							<p className=" font-thin capitalize">
								<strong className=" font-semibold ">Capital </strong>:{" "}
								{country?.["capital"]?.[0] ? country.capital[0] : "Unkown"}
							</p>
						</div>
						<div className="flex flex-col gap-2">
							<p className=" font-thin capitalize">
								<strong className=" font-semibold "> Top Level Domain</strong>:{" "}
								{typeof country.tld == "object" ? country.tld[0] : country.tld}
							</p>{" "}
							<p className=" font-thin capitalize">
								<strong className=" font-semibold ">Currencies </strong>:{" "}
								{Object.values(country.currencies)[0].name}
							</p>
							<p className="  font-thin capitalize">
								<strong className=" font-semibold "> Languages</strong>:{" "}
								{typeof country.languages == "object"
									? Object.values(country.languages).map((e) => {
											return e + ",";
									  })
									: country.languages}
							</p>
						</div>{" "}
					</div>
					<div className="flex self-end  gap-2 items-center   ">
						<strong className=" font-semibold  capitalize">
							border countries:{" "}
						</strong>
						<div className="flex flex-wrap gap-2">
							{typeof country.borders == "object" ? (
								country.borders.map((e) => {
									return (
										<button
											key={e}
											value={e}
											onClick={(e) => {
												handlBorderButton(e.target.value);
											}}
											className=" flex items-center  hover:scale-110 transition-all  gap-2 shadow-md  text-sm justify-center  p-2   dark:bg-[#2B3844] ">
											{e}
										</button>
									);
								})
							) : country?.borders ? (
								<button
									key={country.borders}
									value={country.borders}
									onClick={(e) => {
										handlBorderButton(e.target.value);
									}}
									className=" flex items-center  hover:scale-110 transition-all  gap-2 shadow-md  text-sm justify-center  p-2   dark:bg-[#2B3844] ">
									{country.borders}
								</button>
							) : (
								<div className=" capitalize flex items-center  hover:scale-110 transition-all  gap-2 shadow-md  text-sm justify-center  p-2   dark:bg-[#2B3844] ">
									no border country{" "}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
{
	/* {" "} */
}
