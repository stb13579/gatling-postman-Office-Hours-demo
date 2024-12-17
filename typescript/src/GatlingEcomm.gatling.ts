import { simulation, scenario, pause, atOnceUsers, constantUsersPerSec } from "@gatling.io/core";
import { http } from "@gatling.io/http";
import { postman } from "@gatling.io/postman";

export default simulation((setUp) => {
  const httpProtocol = http;

  const collection = postman
    .fromResource("GatlingEcomm.postman_collection.json")
    .environment("GatlingEcommSite.postman_environment.json");

  const browsers = collection.folder("Browse").scenario("Shopper Browsing", { pauses: 1 });

  const searchers = scenario("Shopper Searching").exec(collection.request("Search"));
  
  const buyers = scenario("Buyers").exec(
    collection.folder("Purchase").request("Login"),
      pause(1),
    collection.folder("Purchase").request("Add to cart"),
      pause(1),
    http("browse 2nd item").get("https://ecomm.gatling.io"),
      pause(1),
    collection.folder("Purchase").request("Checkout")
  );

  setUp(
    // Gatling Postman is limited to 5 users for local testing, unlimited on Gatling Enterprise - learn more on https://gatling.io
    browsers.injectOpen(constantUsersPerSec(5).during(60)),
    searchers.injectOpen(atOnceUsers(10)),
    buyers.injectOpen(constantUsersPerSec(3).during(60))
  ).protocols(httpProtocol);
});
