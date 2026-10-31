const myUrl = new URL(
    "https://www.example.com:8080/products?id=101&name=priya"
);

console.log("Protocol:", myUrl.protocol);
console.log("Host:", myUrl.host);
console.log("Hostname:", myUrl.hostname);
console.log("Port:", myUrl.port);
console.log("Pathname:", myUrl.pathname);
console.log("ID:", myUrl.searchParams.get("id"));
console.log("Name:", myUrl.searchParams.get("name"));