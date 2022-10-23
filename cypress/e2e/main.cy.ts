import { LIST_TYPE } from "../fixtures/type";
import items from "../fixtures/items.json";

describe("마켓보로 애플리케이션 테스트", () => {
  const getFirstProduct = () => {
    cy.get('[data-cy="product_unCheck"]')
      .contains(items[LIST_TYPE.first].name)
      .click();
  };

  beforeEach(() => {
    cy.viewport(1600, 1080);
    cy.intercept(
      { method: "GET", url: `/api/v1/rooms` },
      { fixture: "items.json" },
    );
    cy.visit("http://localhost:3000");

    getFirstProduct();
  });

  it("상품을 클릭하면 오른쪽 주문 목록에 상품이 추가됩니다.", () => {
    cy.get('[data-cy="product_unCheck"]')
      .contains(items[LIST_TYPE.second].name)
      .click();
    cy.get('[data-cy="order_list"]').should("have.length", 2);
  });

  it("상품 추가시 기본수량은 1개로 주문 목록에 추가됩니다.", () => {
    cy.get('[data-cy="input"]').invoke("val").should("eq", "1");
  });

  it("추가된 상품에는 JSON 파일(items.json)에 들어 있는 단위와 단가 정보를 표시합니다.", () => {
    cy.get('[data-cy="unitName"]').should(
      "have.text",
      items[LIST_TYPE.first].unitName,
    );
    cy.get('[data-cy="unitPrice"]').should(
      "have.text",
      items[LIST_TYPE.first].unitPrice,
    );
  });

  it("주문목록에서 수량은 사용자가 입력할 수 있습니다.", () => {
    cy.get('[data-cy="input"]').type("234");
    cy.get('[data-cy="input"]').invoke("val").should("eq", "1234");
  });

  it("input에 입력된 값은 자연수여야 합니다.", () => {
    cy.get('[data-cy="input"]').type("-11");
    cy.get('[data-cy="input"]').invoke("val").should("eq", "1");
    cy.get('[data-cy="input"]').clear();
    cy.get('[data-cy="input"]').invoke("val").should("eq", "1");
    cy.get('[data-cy="input"]').type("1.1");
    cy.get('[data-cy="input"]').invoke("val").should("eq", "11");
  });

  it("상품은 중복으로 추가될수 없습니다.", () => {
    cy.get('[data-cy="product_check"]')
      .contains(items[LIST_TYPE.first].name)
      .click();
    cy.get('[data-cy="input"]').invoke("val").should("eq", "1");
  });

  it("주문 목록을 보여주고 하단에는 총 주문 수량과 합계 금액을 보여줍니다.", () => {
    cy.get('[data-cy="input"]').type("234");
    cy.get('[data-cy="input"]')
      .invoke("val")
      .then((value) => {
        const countValue = Number(value);
        cy.get('[data-cy="totalCount"]').should(
          "have.text",
          `총 주문 수량: ${countValue}`,
        );
        cy.get('[data-cy="totalPrice"]').should(
          "have.text",
          `합계: ${(
            countValue * items[LIST_TYPE.first].unitPrice
          ).toLocaleString()}`,
        );
      });
  });

  it("X 버튼을 누르면 목록에서 삭제 됩니다.", () => {
    cy.get('[data-cy="order_list"]').should("have.length", 1);
    cy.get('[data-cy="remove_btn"]').click();
    cy.get('[data-cy="order_list"]').should("have.length", 0);
  });
});
