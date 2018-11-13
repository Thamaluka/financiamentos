/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component } from "@angular/core";
import { ServiceService } from "app/service/service.service";
import { Router } from "@angular/router";


@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    constructor(public service: ServiceService, private router: Router) { }

    ngOnInit() {
        this.service.getName('Jessica').subscribe((data) => {
            console.log(data);
        })
    }


}