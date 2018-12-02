/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, setTestabilityGetter } from "@angular/core";
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

    }

    sendTable() {
        this.service.sendTable(this.table).subscribe((res) => {
            this.setTable(res);
        }, err => {
            console.log(err);
        });

    }

    setTable(data) {

        for (let index = 1; index < data.length; index++) {
            this.table.parcelas[index - 1] = data[index].prestacao.toString().split('.')[0];
            this.table.juros[index - 1] = data[index].juros.toString().split('.')[0];
        }
        this.setDates();
    }

    setDates() {
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        let dates = [];

        if (month == 12) { month = 1; year = 2019 }

        for (let index = 0; index < this.table.parcelas.length; index++) {
            let tempDate = day + '/' + month + '/' + year;
            dates.push(tempDate);
            month++;
        }
        this.table.date = dates;
    }

}