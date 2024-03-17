"use client";
import Country1 from "./_component/Country1";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
	// all data from APi
	const [countries, setCountries] = useState([]);
	//to handle error from search
	const [error, setError] = useState({ error: "", errorType: "" });
	//waiting the server res
	const [islaoding, setLoading] = useState(true);
	//handling serch
	const [query, setquery] = useState({ query: "", region: "" });
	//data after filterd by region and query
	const [displayedData, setDisplayedData] = useState([]);
	//menu used in filter by region
	const [dropmenu, droped] = useState(false);

	//api request
	useEffect(() => {
		const data = fetch(
			`https://restcountries.com/v3.1/${
				query.query ? `name/${query.query}` : "all"
			}`
		)
			.then((data) => {
				return data.json();
			})

			.then((res) => {
				if (res.status == 404) {
					//if there is no data returnd form respond
					setError(() => {
						setLoading(false);
						return { error: true, errorType: "Not Found" };
					});
				} else {
					setCountries(() => {
						setError({ error: false, errorType: "" });
						setLoading(false);
						return res;
					});
				}
			});
		//make request according to the name
	}, [query.query]);

	useEffect(
		(e) => {
			//filter data according to region as the server take one pram only
			setDisplayedData(() => {
				if (countries.length > 0) {
					return countries.filter((e) => {
						if (query.region === "" || query.region === "all") {
							setLoading(false);
							return e;
						} else {
							setLoading(false);
							return e.region == query.region && e;
						}
					});
				} else {
					return [];
				}
			});
		},
		[query, countries]
	);
	// if there is no data in match region and query set error
	useEffect(() => {
		if (displayedData.length <= 0 && islaoding == false) {
			setError(() => {
				return { error: true, errorType: "Not Found" };
			});
		}
	}, [displayedData]);

	//take the query
	const handlesearch = (ev) => {
		setquery((e) => {
			return { ...e, query: ev.target[0].value };
		});
	};
	// take the region
	const regionfilter = (ev) => {
		setquery((e) => {
			return { ...e, region: ev.target.value };
		});
	};

	return (
		<div className=" bg-[#F2F2F2] dark:bg-[#202C36] min-h-lvh pt-20">
			<div className="container  mx-auto p-4  flex justify-between flex-col sm:flex-row gap-8 sm:gap-0  2xl:px-6 ">
				{" "}
				<form
					className="  md:w-1/3  relative after:contents-[''] after:bg-no-repeat after:bg-cover dark:after:bg-[url(../../public/searchDarkMode.png)] after:bg-[url(../../public/search.png)] after:w-7 after:h-7  after:block  after:absolute after:top-1/2 after:-translate-y-1/2 after:left-3"
					method="Get"
					onSubmit={(ev) => {
						ev.preventDefault();
						handlesearch(ev);
					}}>
					<input
						className=" h-14  dark:focus:bg-bg-[#2B3844]   border-none outline-none pl-16  w-full rounded-md shadow-sm cursor-pointer dark:bg-[#2B3844] "
						type="text"
						name="search"
						placeholder="search for a country..."></input>
				</form>
				<div
					onClick={() => {
						droped((e) => !e);
					}}
					className={
						"lg:pl-8 lg:w-1/5 md:w-3/12	md:p-4 sm:w-1/3  w-2/3 p-4 cursor-pointer  	   max-w-48	sm:p-2 relative capitalize bg-[#ffff] dark:bg-[#2B3844] rounded-md after:contents-[''] after:block after:absolute after:bg-[url(../../public/blackArow.png)] after:w-[32px]  after:h-[32px]  after:bg-center  after:bg-cover after:bg-no-repeat after:right-2 after:top-1/2 after:-translate-y-1/2 transition-all  flex  items-center  "
					}>
					{query.region == "" || query.region == "all"
						? "Filter By region"
						: query.region}

					<div
						className={`${
							dropmenu ? "flex" : "hidden"
						}  flex-col absolute  bg-[#ffff] left-0 w-full top-16 gap-2 p-2 dark:bg-[#2B3844]	*:transition-all `}>
						<button
							onClick={(e) => {
								regionfilter(e);
							}}
							value="Africa"
							className=" hover:scale-110 cursor-pointer dark:bg-[#2B3844] ">
							Africa
						</button>
						<button
							value="Americas"
							onClick={(e) => {
								regionfilter(e);
							}}
							className=" hover:scale-110 cursor-pointer dark:bg-[#2B3844] ">
							{" "}
							Americas
						</button>
						<button
							value="Asia"
							onClick={(e) => {
								regionfilter(e);
							}}
							className=" hover:scale-110 cursor-pointer  dark:bg-[#2B3844]">
							Asia
						</button>
						<button
							value="Europe"
							onClick={(e) => {
								regionfilter(e);
							}}
							className=" hover:scale-110 cursor-pointer dark:bg-[#2B3844]">
							Europe
						</button>
						<button
							value="Oceania"
							onClick={(e) => {
								regionfilter(e);
							}}
							className=" hover:scale-110 cursor-pointer dark:bg-[#2B3844] ">
							Oceania
						</button>
						<button
							value="all"
							onClick={(e) => {
								regionfilter(e);
							}}
							className=" hover:scale-110 cursor-pointer  dark:bg-[#2B3844]">
							All
						</button>
					</div>
				</div>
			</div>

			{islaoding ? (
				<div className=" min-h-lvh flex justify-center items-center dark:bg-[#202C36] ">
					{" "}
					<div className="w-52 h-52  border-transparent border-solid border-r-8 border-y-4   border-r-black animate-spin rounded-full dark:border-r-[#2B3844]">
						{" "}
					</div>
				</div>
			) : error.error ? (
				<div className=" flex justify-center items-center ">
					<p className=" font-extrabold text-2xl ">Oops, can not found </p>{" "}
				</div>
			) : (
				<div className="m-auto container grid  p-4 2xl:px-6 lg:gap-8   self-start  md:gap-6 grid-cols-[repeat(auto-fill,minmax(180px,264px))] grid-rows-[repeat(auto-fill,minmax(320px,320px))]	 xl:gap-18 justify-center   sm:gap-5 gap-4  ">
					{displayedData.map((e) => {
						return (
							<Country1
								{...e}
								key={e.cca2}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
}
