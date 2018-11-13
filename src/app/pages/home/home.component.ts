/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component } from "@angular/core";
import { HomeServiceService } from "./home-service.service";
import { Table } from "app/models/table";


@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    private table = new Table;


    constructor(private service: HomeServiceService) { }
    
    ngOnInit() {
       /*  this.service.getTable().subscribe((res) => {
            this.teste = res;
            console.log(res);
        }, err => {
            console.log(err);
        }); */
    }

    teste(){
        console.log(this.table.valorDoImovel)
    }

}