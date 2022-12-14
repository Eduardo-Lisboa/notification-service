import { Content } from "./content";

describe("Notification Content", () => {
    it("should create a content", () => {
        const content = new Content("Você recebeu uma solicitação de amizade");

        expect(content).toBeTruthy();
    });

    it("should not be able to create a notification content whit less than 5 charactres", () => {
        expect(() => new Content("aaa")).toThrow();
    });

    it("should not be able to create a notification content whit moew than 240 charactres", () => {
        expect(() => new Content("a".repeat(241))).toThrow();
    });
});
