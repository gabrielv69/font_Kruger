import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PersonaService } from './services/personas/persona.service';
import { RecordService } from './services/records/record.service';
import { UserService } from './services/users/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Inventario';
  personaForm!: FormGroup;
  employers: any;
  usuarios:any;

  constructor(public fb: FormBuilder, public personaService: PersonaService, public recordService: RecordService,
    public userService: UserService) { }

  ngOnInit(): void {
    this.personaForm = this.fb.group({
      idPerson: [''],
      names: ['', Validators.required],
      surnames: ['', Validators.required],
      ci: ['', Validators.required],
      email: ['', Validators.required],
    });


    this.personaService.getAllPersonas().subscribe(data => {
      this.employers = data;
    }, error => { console.error(error); });

  }

  guardarPersona(): void { 
    this.personaService.savePersona(this.personaForm.value).subscribe(data => {
      this.personaForm.reset();
      this.employers = this.employers.filter((person: { idPerson: any; }) => person.idPerson != data.idPerson);
      this.employers.push(data);
    },
       error => { console.error(error); });
  }

  eliminarPersona(person:any):void {
    this.personaService.deletePersona(person.idPerson).subscribe(data => {
      if(data){this.employers.pop(person)}
    }, error => { console.error(error); });
  }

  editarPersona(person:any):void {
    this.personaForm.setValue(person);
  }

}

