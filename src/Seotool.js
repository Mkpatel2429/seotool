import React, { useState } from "react";
import "./css/index.css";
function Seotool() {
	const [results, setResults] = useState(null); // Replace with the URL you want to check
	const [url, setUrl] = useState("");
	const endpoint = "https://api.dataforseo.com/v3/on_page";
	const postArray = [];
	postArray.push({
		method: "POST",
		auth: {
			username: "pmanthan206@gmail.com",
			password: "@Mkpatel1112",
		},
		url: url,
		test: "enable_browser_rendering",
		max_crawl_pages: 1,
		load_resources: true,
		load_javascript: true,
		custom_js: "meta = {}; meta.url = document.URL; meta;",
		headers: {
			"Content-Type": "application/json",
		},
	});
	async function handleSubmit() {
		try {
			const response = await fetch(endpoint, postArray);
			const json = response.json();
			setResults(json);
		} catch (err) {
			console.log(err);
		}
	}

	function checkURL() {
		// Get the URL input from the user
		var url = document.getElementById("url").value;

		// Use regular expressions to check if it's a root or sub-folder URL
		var rootPattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})$/;
		var subfolderPattern =
			/^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}\/[^\s/]+\/?[^\s/]*)$/;

		if (rootPattern.test(url)) {
			// It's a root URL
			document.getElementById("result").innerHTML = "Root URL: " + url;
		} else if (subfolderPattern.test(url)) {
			// It's a sub-folder URL
			document.getElementById("result").innerHTML = "Sub-Folder URL: " + url;
		} else {
			// It's not a valid URL
			document.getElementById("result").innerHTML = "Invalid URL";
		}
	}

	return (
		<div>
			<form action="" id="form1" onSubmit={handleSubmit}>
				<input
					type="url"
					name="url"
					id="url"
					value={url}
					placeholder="Enter URL"
					onChange={(e) => setUrl(e.target.value)}
					required
				/>
				<button id="submit" type="submit" onClick={checkURL}>
					Submit
				</button>
			</form>
			<h1>On-Page SEO Checker</h1>
			{results ? (
				<pre>{JSON.stringify(setResults, null, 2)}</pre>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}

export default Seotool;
