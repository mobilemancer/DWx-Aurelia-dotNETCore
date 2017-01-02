import { StageComponent } from "aurelia-testing";
import { bootstrap } from 'aurelia-bootstrapper';

describe("droid-tile component test", () => {
    let component;
    let viewModel = {
        droid: {
            id: 55,
            name: "R2-D2",
            productSeries: "R-Series",
            height: 96
        }
    };

    beforeEach(() => {
        component = StageComponent
            .withResources("resources/elements/droid-tile")
            .inView("<droid-tile droid.bind='droid'></droid-tile>")
            .boundTo(viewModel);
    });

    it("should render id", done => {
        component.create(bootstrap).then(() => {
            let elem = document.querySelector(".t_id");
            expect(elem.innerHTML).toBe(viewModel.droid.id.toString());
            done();
        })
    });

    it("should render name", done => {
        component.create(bootstrap).then(() => {
            let elem = document.querySelector(".t_name");
            expect(elem.innerHTML).toBe(viewModel.droid.name);
            done();
        })
    });

    it("should render product series", done => {
        component.create(bootstrap).then(() => {
            let elem = document.querySelector(".t_model");
            expect(elem.innerHTML).toBe(viewModel.droid.productSeries);
            done();
        })
    });

    it("should render height", done => {
        component.create(bootstrap).then(() => {
            let elem = document.querySelector(".t_height");
            expect(elem.innerHTML).toBe(viewModel.droid.height.toString());
            done();
        })
    });

    afterEach(() => {
        component.dispose();
    })
});