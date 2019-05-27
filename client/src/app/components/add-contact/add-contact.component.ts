import { Component, OnInit, ViewChild } from "@angular/core";
import { ClrWizard } from "@clr/angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { ContactService } from "src/app/services/contact.service";
import { ContactStoreService } from "src/app/services/contact-store.service";

@Component({
  selector: "app-add-contact",
  templateUrl: "./add-contact.component.html",
  styleUrls: ["./add-contact.component.scss"]
})
export class AddContactComponent implements OnInit {
  @ViewChild("wizardmd") wizardMedium: ClrWizard;
  @ViewChild("wizardlg") wizardLarge: ClrWizard;
  @ViewChild("wizardxl") wizardExtraLarge: ClrWizard;

  mdOpen: boolean = false;
  lgOpen: boolean = true;
  xlOpen: boolean = false;
  showSuccess = false;
  showError = false;

  addContactForm = new FormGroup({
    first_name: new FormControl("", Validators.required),
    last_name: new FormControl("", Validators.required),
    email: new FormControl(""),
    phone: new FormControl(""),
    job_title: new FormControl(""),
    location: new FormControl("", Validators.required),
    company: new FormControl("", Validators.required),
    company_url: new FormControl(""),
    linkedin: new FormControl(""),
    github: new FormControl(""),
    facebook: new FormControl(""),
    labels: new FormControl("")
  });

  constructor(
    private contactService: ContactService,
    private contactStore: ContactStoreService
  ) {}

  ngOnInit() {}

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

    console.log(newContact);

    this.contactService.addContact(newContact).subscribe(contact => {
      this.contactStore.addContact(contact);
      this.showSuccess = true;
      this.resetForm();
    });
  }

  toggleSuccess() {
    this.showSuccess = !this.showSuccess;
  }
}
