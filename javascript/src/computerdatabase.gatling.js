import { simulation, scenario, pause, atOnceUsers, constantUsersPerSec } from "@gatling.io/core";
import { http } from "@gatling.io/http";
import { postman } from "@gatling.io/postman";

export default simulation((setUp) => {
  const httpProtocol = http;

  const collection = postman
    .fromResource("computerdatabase.postman_collection.json")
    .environment("computerdatabase-production.postman_environment.json");

  const users = collection.folder("User scenario").scenario("Users", { pauses: 1 });

  const admins = scenario("Admins").exec(
    collection.folder("User scenario").request("Search"),
    pause(1),
    collection.folder("User scenario").request("Browse"),
    pause(1),
    collection.request("Edit form"),
    pause(1),
    collection.request("Edit")
  );

  setUp(
    // Gatling Postman is limited to 5 users for local testing, unlimited on Gatling Enterprise - learn more on https://gatling.io
    users.injectOpen(constantUsersPerSec(1).during(4)),
    admins.injectOpen(atOnceUsers(1))
  ).protocols(httpProtocol);
});
