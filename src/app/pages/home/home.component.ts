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
    private taxas = [1.8, 2.0, 3.5];
    private parcelas = [10, 20, 30, 40, 50, 60, 70, 80, 90];


    constructor(private service: HomeServiceService) { }

    ngOnInit() {
        /*  this.service.getTable().subscribe((res) => {
             this.teste = res;
             console.log(res);
         }, err => {
             console.log(err);
         }); */
    }

    setTableData(parcela, taxa) {
        this.table.totalParcela = parcela;
        this.table.taxa = taxa;
        this.sendTable();
    }

    sendTable() {
        this.service.sendTable(this.table).subscribe((res) => {
            console.log(res);
        }, err => {
            console.log(err);
        });

    }

}