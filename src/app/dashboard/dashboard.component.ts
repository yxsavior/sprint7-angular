import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Veiculo } from '../models/veiculo.model';
import { VehicleData } from '../models/vehicleData.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarroVin } from '../utils/carroVinInterface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MenuComponent } from "../menu/menu.component";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Marca o componente como standalone
  imports: [ReactiveFormsModule, CommonModule, MenuComponent], // Inclui os módulos necessários
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // Corrigido de styleUrl para styleUrls
})
export class DashboardComponent implements OnInit {
  vehicles: Veiculo[] = [];
  selectedVehicle!: Veiculo;
  vehicleData!: VehicleData;

  carVin!: CarroVin;
  reqVin!: Subscription;

  selectCarForms = new FormGroup({
    carId: new FormControl(''),
  });

  vinForm = new FormGroup({
    vin: new FormControl(''),
  });

  onChange() {
    this.vinForm.controls.vin.valueChanges.subscribe((value) => {
      this.reqVin = this.dashboardservice
        .buscarVin(value as string)
        .subscribe((res) => {
          this.carVin = res;
          if (this.carVin && this.carVin.id) {
            this.selectCarForms.controls.carId.setValue(
              String(this.carVin.id),
              { emitEvent: false }
            );
            this.selectedVehicle = this.vehicles[Number(this.carVin.id) - 1];
          }
        });
    });
  }

  constructor(private dashboardservice: DashboardService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.dashboardservice.getVehicles().subscribe((res) => {
      console.log(res.vehicles);
      this.vehicles = res.vehicles;
    });
    this.selectCarForms.controls.carId.valueChanges.subscribe((id) => {
      this.selectedVehicle = this.vehicles[Number(id) - 1];
      this.vinForm.controls.vin.setValue(this.selectedVehicle.vin);
    });
    this.onChange();
  }

  ngOnDestroy(): void {
    if (this.reqVin) {
      this.reqVin.unsubscribe();
    }
  }
}
