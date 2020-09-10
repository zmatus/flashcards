---
layout: deck
title: Intro to HTTP
---

1a. Stateless
1b. A protocol designed so that each request/response is independent of previous ones.

2a. URL
2b. The address of a website.

3a. Scheme
3b. Protocol that tells the client how to access the resource.

4a. Host
4b. Tells the client where the resource is located.

5a. Port
5b. A communication endpoint for specific process or service.

6a. Query string
6b. String with parameters to send data to the server. Visibile in the URL and has a max length.

7a. Port 80
7b. Default port for HTTP.

8a. URL encoding
8b. Characters need to be encoded if they are unsafe, reserved, or have no corresponding character in standard ASCII.

9a. GET
9b. Request to retrieve resources. Visible in the URL.

10a. POST
10b. Request to initiate action on the server. Do not expose data and sidestep query string size limit.

11a. Request headers
11b. Allow the client and server to send additional information during request/response. Useful data include host, user-agent, and connection.

12a. 200
12b. Ok

13a. 302
13b. Redirect

14a. 404
14b. Not found

15a. 500
15b. Internal server error

16a. Response headers
16b. Offer more information about the resource being sent. Useful data include content-encoding, server, location.

17a. Sessions
17b. Server sends session identifier (unique token) to the client for identification. Incoming requests are checked for ID and server has rules regarding session storage and expiration.

18a. Cookies
18b. Small files stored in the browser that contain session information. Client cookie is compared with server session to identify client.

19a. Ajax
19b. Allow browser to issue requests and process responses without a full page refresh. Callback functions process the response instead of the browser.

20a. HTTPS
20b. Secure protocols that use certificates to encrypt every request/response before sending them on the network.

21a. Same-origin policy
21b. Permits unrestricted interaction between resources from the same origin but restrict those from other origins. Origin here means scheme, hostname, and port.

22a. Session hijacking
22b. An attack in which an attacker attempts to impersonate the user by stealing and using the session ID.

23a. Countermeasures to session hijacking
23b. Resetting sessions when sensitive action, such as changing password, is performed. Set expirations on sessions. Use HTTPS across entire web app.

24a. Cross-site scripting (XSS)
24b. Attack that injects scripts into the server to direct attacks at clients.

25a. Countermeasures to XSS
25b. Sanitize problematic input or disallowing HTML and JavaScript. Escape user input data when display it to prevent browser from executing the code.