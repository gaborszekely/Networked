import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { ClrWizard } from "@clr/angular";
import { Validators, FormBuilder } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { ContactsState } from "@app/contacts/store/contacts.state";
import { AddContactRequested } from "@app/contacts/store/actions";
import {
  getAddContactSuccess,
  getAddContactError,
  getAddContactLoading
} from "@app/contacts/store/selectors";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-add-contact",
  templateUrl: "./add-contact.component.html",
  styleUrls: ["./add-contact.component.scss"]
})
export class AddContactComponent implements OnInit, OnDestroy {
  @ViewChild("wizardmd", { static: true }) wizardMedium: ClrWizard;
  @ViewChild("wizardlg", { static: true }) wizardLarge: ClrWizard;
  @ViewChild("wizardxl", { static: true }) wizardExtraLarge: ClrWizard;

  destroy$ = new Subject<null>();

  mdOpen = false;
  lgOpen = true;
  xlOpen = false;
  addSuccess$: Observable<boolean>;
  addError$: Observable<boolean>;
  loading$: Observable<boolean>;

  showSuccess: boolean = false;

  addContactForm = this.fb.group({
    first_name: ["", Validators.required],
    last_name: ["", Validators.required],
    email: [""],
    phone: [""],
    job_title: [""],
    location: ["", Validators.required],
    company: ["", Validators.required],
    company_url: [""],
    linkedin: [""],
    github: [""],
    facebook: [""],
    labels: [""]
  });

  constructor(private store: Store<ContactsState>, private fb: FormBuilder) {
    this.addSuccess$ = this.store.select(getAddContactSuccess);
    this.addError$ = this.store.select(getAddContactError);
    this.loading$ = this.store.select(getAddContactLoading);
  }

  ngOnInit() {
    this.addSuccess$.pipe(takeUntil(this.destroy$)).subscribe(success => {
      this.showSuccess = success;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  resetForm() {
    this.addContactForm.reset();
  }

  onSubmit() {
    const newContact = {
      ...this.addContactForm.value,
      labels: this.addContactForm.value.labels
        ? this.addContactForm.value.labels
            .split(",")
            .map((i: string) => i.trim())
        : []
    };

    // this.contactService.addContact(newContact).subscribe(contact => {
    //   this.contactStore.addContact(contact);
    //   this.showSuccess = true;
    //   this.resetForm();
    // });
    this.store.dispatch(new AddContactRequested(newContact));
    this.resetForm();
  }

  toggleSuccess() {
    this.showSuccess = !this.showSuccess;
  }
}
