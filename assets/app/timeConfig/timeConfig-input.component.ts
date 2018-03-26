import { Component, OnInit } from "@angular/core";
import { TimeConfig } from "./timeConfig.model";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { TimeConfigService } from "./timeConfig.service";

@Component({
    selector: 'app-timeConfig-input',
    templateUrl: './timeConfig-input.component.html'
})
export class TimeConfigInputComponent implements OnInit{
    timeConfig: TimeConfig;
    myForm: FormGroup;

    constructor(private timeConfigService: TimeConfigService) {}

    onClear(){
        this.timeConfig = null;
        this.myForm.reset();
        // form.resetForm();
    }

    onSubmit() {
        /*if(this.timeConfig && this.timeConfig.time == this.myForm.value.time) {
            // edit
            console.log(this.timeConfig);
            this.timeConfig.temperature = this.myForm.value.temperature;
            console.log(this.timeConfig);
            this.timeConfigService.updateTimeConfig(this.timeConfig);
            this.timeConfig = null;
        } else {
            // create
            this.timeConfig = new TimeConfig(this.myForm.value.time, this.myForm.value.temperature);
            console.log(this.timeConfig);
            this.timeConfigService.addTimeConfig(this.timeConfig);
            // this.timeConfig = null;
        }*/
        this.timeConfig = new TimeConfig(this.myForm.value.time, this.myForm.value.temperature);
        console.log(this.timeConfig);

        this.timeConfigService.addTimeConfig(this.timeConfig)
            .subscribe(
              data => console.log(data),
              error => console.error(error),
            );
        this.myForm.reset();

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
    }

}