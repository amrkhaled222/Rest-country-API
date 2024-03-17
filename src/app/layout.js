"use client";
import { useState, useEffect } from "react";
import darkmodemoon from "../../public/darkmode.png";
import Image from "next/image";
import "./globals.css";

export default function RootLayout({ children }) {
	const [theme, setTheme] = useState("light");

	// get user preferd theme
	function getThemeFromLocalStorage() {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			setTheme(savedTheme);
		}
	}
	useEffect((ev) => {
		getThemeFromLocalStorage();
	}, []);
	//change theme
	function toggleTheme() {
		setTheme((prevTheme) => {
			const newTheme = prevTheme === "light" ? "dark" : "light";
			localStorage.setItem("theme", newTheme);
			return newTheme;
		});
	}

	return (
		<html
			className={theme == "dark" ? "dark" : "light"}
			lang="en">
			<head>
				<link
					rel="preconnect"
					href="https://fonts.googleapis.com"></link>
				<link
					rel="preconnxect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"></link>
				<link
					href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,300;6..12,400;6..12,600;6..12,700;6..12,800&display=swap"
					rel="stylesheet"></link>
			</head>
			<body>
				{/*  */}
				<div className=" dark:text-white font-display">
					<header className=" w-full   backdrop-blur-md shadow-sm bg-[#FFF]/80 dark:bg-[#2B3844]  top-0   fixed h-16 z-40">
						<div className="w-full relative">
							<div className="  container flex   justify-between p-5  items-center top-0 absolute  	left-1/2  -translate-x-1/2 ">
								<h1 className=" font-display  font-extrabold text-sm sm:text-2xl	">
									Where in the world?
								</h1>
								<button
									className="flex items-center cursor-pointer gap-2  font-semibold text-xs font-display sm:text-sm "
									name="switchMode"
									onClick={toggleTheme}>
									{" "}
									{theme != "dark" ? (
										<img
											className="w-4 h-4 sm:w-6 sm:h-6"
											src="https://img.icons8.com/sf-ultralight-filled/25/000000/moon-symbol.png"
											alt="moon-symbol"
										/>
									) : (
										<Image
											className="w-4 h-4 sm:w-6 sm:h-6"
											src={darkmodemoon}
											alt="moon-symbol"
										/>
									)}
									Dark Mode
								</button>
							</div>
						</div>
					</header>
					{children}
				</div>
			</body>
		</html>
	);
}
