import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ApplicationBoardComponent } from "./application-board.component";

describe("ApplicationBoardComponent", () => {
  let component: ApplicationBoardComponent;
  let fixture: ComponentFixture<ApplicationBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationBoardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
