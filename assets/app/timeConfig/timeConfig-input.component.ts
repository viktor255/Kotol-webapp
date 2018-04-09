import { Component, OnInit } from "@angular/core";
import { TimeConfig } from "./timeConfig.model";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { TimeConfigService } from "./timeConfig.service";

@Component({
    selector: 'app-timeConfig-input',
    templateUrl: './timeConfig-input.component.html',
    styles: [`#error-msg {
        padding-bottom: 10px;
        color: red;
        display: none;
    }`]
})
export class TimeConfigInputComponent implements OnInit {
    timeConfig: TimeConfig;
    myForm: FormGroup;

    constructor(private timeConfigService: TimeConfigService) {
    }

    onClear() {
        this.timeConfig = null;
        this.toggleErrorMessage(false);
        this.myForm.reset();
        // form.resetForm();
    }

    toggleErrorMessage(showError) {
        if (showError)
            document.getElementById('error-msg').style.display = 'block';
        else
            document.getElementById('error-msg').style.display = 'none';


    }

    onSubmit() {
        if(this.timeConfig) {
            // Update
            this.timeConfig.time = this.myForm.value.time;
            this.timeConfig.temperature = this.myForm.value.temperature;
            this.timeConfigService.updateTimeConfig(this.timeConfig)
                .subscribe(
                    result => console.log(result)
                );
            this.timeConfig = null;
        }
        else {
            // Create
            this.timeConfig = new TimeConfig(this.myForm.value.time, this.myForm.value.temperature);
            console.log(this.timeConfig);

            this.timeConfigService.addTimeConfig(this.timeConfig)
                .subscribe(
                    data => {
                        console.log(data);
                        this.toggleErrorMessage(false);
                    },
                    error => {
                        console.error(error);
                        this.toggleErrorMessage(true);
                    },
                );
        }
        this.onClear();
        // this.myForm.reset();

    }

    ngOnInit() {
        this.myForm = new FormGroup({
            time: new FormControl(null, [
                Validators.required,
                // Validators.pattern("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$")
                Validators.pattern("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")
            ]),
            temperature: new FormControl(null, [
                Validators.required,
                Validators.pattern("[0-9]$")
            ])

        });
        this.timeConfigService.timeConfigIsEdit.subscribe(
            (timeConfig: TimeConfig) => this.timeConfig = timeConfig
        );
    }

}