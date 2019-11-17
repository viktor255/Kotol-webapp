import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {TimeConfigService} from "./timeConfig.service";
import {BoostConfig} from "./boostConfig.model";

@Component({
    selector: 'app-boostConfig',
    templateUrl: './boostConfig.component.html',
    styles: [`
        #error-msg {
            padding-bottom: 10px;
            color: red;
            display: none;
        }
    `]
})
export class BoostConfigComponent implements OnInit {
    boostConfig: BoostConfig;
    myForm: FormGroup;

    constructor(private timeConfigService: TimeConfigService) {
    }

    onClear() {
        this.boostConfig = null;
        this.toggleErrorMessage(false);
        this.myForm.reset();
    }

    toggleErrorMessage(showError) {
        if (showError)
            document.getElementById('error-msg').style.display = 'block';
        else
            document.getElementById('error-msg').style.display = 'none';


    }

    onSubmit() {
        if (this.boostConfig) {
            // Update
            this.boostConfig.duration = this.myForm.value.duration;
            this.boostConfig.temperature = this.myForm.value.temperature;
            this.timeConfigService.updateBoostConfig(this.boostConfig)
                .subscribe(
                    result => console.log(result)
                );
            this.boostConfig = null;
        } else {
            // Create
            this.boostConfig = new BoostConfig(this.myForm.value.duration, this.myForm.value.temperature);
            console.log(this.boostConfig);

            // this.timeConfigService.addBoostConfig(this.boostConfig)
            //     .subscribe(
            //         data => {
            //             console.log(data);
            //             this.toggleErrorMessage(false);
            //         },
            //         error => {
            //             console.error(error);
            //             this.toggleErrorMessage(true);
            //         },
            //     );
        }
        this.boostConfig = null;
        this.myForm.reset();

    }

    ngOnInit() {
        this.myForm = new FormGroup({
            duration: new FormControl(null, [
                Validators.required
            ]),
            temperature: new FormControl(null, [
                Validators.required,
                Validators.pattern("[0-9]$")
            ])

        });

        this.timeConfigService.getBoostConfig().subscribe(
            (boostConfig: BoostConfig) => {
                this.boostConfig = boostConfig;
                // console.log('this.boostConfig in component', this.boostConfig);
                this.timeConfigService.editBoostConfig(this.boostConfig);
                this.timeConfigService.boostConfigIsEdit.subscribe(
                    (boostConfig: BoostConfig) => {
                        this.boostConfig = boostConfig;
                        // console.log('this.boostConfig in component2', this.boostConfig);
                    }
                );
            }
        );

    }

}
