import { StageComponent } from "aurelia-testing";
import { bootstrap } from 'aurelia-bootstrapper';

describe("droid-tile component test", () => {
    let component;
    let viewModel = {
        droid: {
            name: "R2-D2"
        }
    };

    beforeEach(() => {
        component = StageComponent
            .withResources("resources/elements/droid-tile")
            .inView("<droid-tile droid.bind='droid'></droid-tile>")
            .boundTo(viewModel);
    });

    it("should render name", done => {
        component.create(bootstrap).then(() => {
            let elem = document.querySelector(".name");
            expect(elem.innerHTML).toBe("R2-D2");
            done();
        })
    });

    afterEach(() => {
        component.dispose();
    })
});