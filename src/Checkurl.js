function checkURL() {
	// Get the URL input from the user
	var url = document.getElementById("urlInput").value;

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
