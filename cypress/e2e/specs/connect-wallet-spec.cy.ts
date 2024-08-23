describe("connect wallet spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  afterEach(() => {
    cy.disconnectMetamaskWalletFromAllDapps();
    cy.resetMetamaskAccount();
  });

  it("should connect wallet and redeem", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("admin_rpc"),
      body: {
        jsonrpc: "2.0",
        method: "tenderly_setErc20Balance",
        params: [
          "0xbeef01735c132ada46aa9aa4c54623caa92a64cb",
          "0x2559c131a50166f0fcf1ff3ce99eb9fb55c969e7",
          "0x3635c9adc5dea00000",
        ],
      },
    });

    cy.importMetamaskAccount(
      "add6a3f8076eacc3d030e575337ee798a57bef57b22459c9b4613002d41288ee"
    );

    cy.findAllByText("Connect wallet").click();
    cy.acceptMetamaskAccess();
    cy.findAllByText("0x2559...69e7").should("exist");
    cy.findAllByText("Wrong network");

    cy.changeMetamaskNetwork("mainnet");
    cy.addMetamaskNetwork({
      networkName: "tenderly",
      rpcUrl: Cypress.env("public_rpc"),
      chainId: 1,
      symbol: "ETH",
      isTestnet: false,
    });

    cy.findByPlaceholderText("0xabc...12345").type(
      "0xBEEF01735c132Ada46AA9aA4c54623cAA92A64CB"
    );
    cy.findByAltText("check-mark").should("exist");

    cy.findByText("Steakhouse USDC").should("exist");
    cy.findByText("Withdraw userMax").click();

    cy.confirmMetamaskSignatureRequest();

    cy.findByText("Success!").click();
    cy.findByText("Reset").click();
  });
});
