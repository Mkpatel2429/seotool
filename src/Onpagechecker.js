import React, { Component } from "react";
import axios from "axios";

class Onpagechecker extends Component {
	state = {
		url: "https://abc.com", // Replace with the URL you want to check
		results: null,
	};
	checkURL() {
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
	componentDidMount() {
		this.fetchOnPageData();
	}

	fetchOnPageData = async () => {
		const apiUrl = "https://api.dataforseo.com/v3/on_page/task_post";
		const postArray = [];
		postArray.push({
			target: this.state.url,
			load_resources: true,
			enable_javascript: true,
			max_crawl_pages: 10,
			custom_js: "meta = {}; meta.url = document.URL; meta;",
		});

		axios
			.post(apiUrl, postArray, {
				auth: {
					username: "login",
					password: "password",
				},
			})
			.then((response) => {
				this.setState({ results: response.data });
			})
			.catch((error) => {
				console.error(error);
			});
	};

	render() {
		const { results } = this.state;
		const { url } = this.state;

		return (
			<div>
				<form action="" id="form1">
					<input
						type="url"
						name="url"
						id="url"
						value={url}
						placeholder="Enter URL"
						onChange={(e) => this.setState({ url: e.target.value })}
						required
					/>
					<button id="submit" type="submit" onClick={this.checkURL}>
						Submit
					</button>
				</form>
				<h1>On-Page SEO Checker</h1>
				{results ? (
					<pre>{JSON.stringify(results, null, 2)}</pre>
				) : (
					<p>Loading...</p>
				)}
			</div>
		);
	}
}
export default Onpagechecker;
