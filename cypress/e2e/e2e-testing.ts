// Import necessary libraries and types
import axios from "axios";

/**
 * Feature: User Registration and API Testing
 *
 * Scenario: Successful user registration through UI
 *    GIVEN I navigate to the register page
 *    WHEN I enter name, username, email, password, confirm password and submit the form
 *    THEN a new user is registered and redirected to the success page
 */

describe("E2E Testing: User Registration and API", () => {
  const baseUrl = "http://localhost:8000";
  const frontendUrl = "http://localhost:3000";

  // Section 1: UI Test - Register a New User
  describe("UI Test: Register new user", () => {
    context("Successful registration", () => {
      it("GIVEN I navigate to the register page", () => {
        cy.visit(`${frontendUrl}/register`);
      });

      it("WHEN I enter name, username, email, password, confirm password and submit the form", () => {
        cy.visit(`${frontendUrl}/register`);
        cy.intercept("POST", `${baseUrl}/users`).as("registerUser");
        // Ensure the form fields are present before interacting with them
        cy.get('input[name="name"]', { timeout: 10000 })
          .should("be.visible")
          .type("Test User");
        cy.get('input[name="username"]').should("be.visible").type("testuser");
        cy.get('input[name="email"]')
          .should("be.visible")
          .type("testuser@example.com");
        cy.get('input[name="password"]').should("be.visible").type("Test@1234");
        cy.get('input[name="confirmpass"]')
          .should("be.visible")
          .type("Test@1234");

        // Debugging: Ensure the form has the correct inputs
        cy.get('input[name="name"]').should("have.value", "Test User");
        cy.get('input[name="username"]').should("have.value", "testuser");
        cy.get('input[name="email"]').should(
          "have.value",
          "testuser@example.com"
        );
        cy.get('input[name="password"]').should("have.value", "Test@1234");
        cy.get('input[name="confirmpass"]').should("have.value", "Test@1234");

        // Ensure the form is correctly identified and submitted
        cy.get("form").submit();
        it("THEN a new user is registered and a success message is displayed", () => {
          cy.url().should("include", "/success");
        });
      });
    });
  });

  // Section 2: API Test - Verify User Existence (GET)
  describe("API Test: Verify user existence", () => {
    it("GIVEN I have a user's email", async () => {
      const email = "testuser@example.com";
      const response = await axios.get(
        `${baseUrl}/users/email?email=${email}`,
        {
          withCredentials: true,
        }
      );

      it("WHEN I send a GET request to the /users/email endpoint", () => {
        // GET request already performed in the above step
      });

      it("THEN I should receive the user details if the user exists", () => {
        expect(response.status).to.equal(200);
        expect(response.data).to.have.length.greaterThan(0);
        expect(response.data[0].email).to.equal(email);
      });
    });
  });

  // Section 3: API Test - Add a New User (POST)
  describe("API Test: Add a new user with existence check", () => {
    const baseUrl = "http://localhost:8000";
    const userEmail = "testuser2@example.com";

    it("GIVEN I have user details", async () => {
      const newUser = {
        name: "Test User 2",
        username: "testuser2",
        email: userEmail,
        password: "API@1234",
      };

      // Check if the user already exists
      cy.request({
        method: "GET",
        url: `${baseUrl}/users?email=${userEmail}`,
        failOnStatusCode: false, // Allow handling of non-2xx status codes
      }).then((response) => {
        if (response.status === 500) {
          // User exists, check for the error message display
          cy.log("Account with this email already exists");
          // Assuming the error message is displayed on the page with class .error-message
          cy.get(".error-message").should(
            "contain",
            "Account with this email already exists"
          );
        } else {
          // User does not exist, proceed with the POST request to create a new user
          cy.request({
            method: "POST",
            url: `${baseUrl}/users`,
            body: newUser,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }).then((postResponse) => {
            // Check the POST response
            expect(postResponse.status).to.equal(201);
            expect(postResponse.body.name).to.equal(newUser.name);
            expect(postResponse.body.username).to.equal(newUser.username);
            expect(postResponse.body.email).to.equal(newUser.email);
          });
        }
      });
    });
  });
});
