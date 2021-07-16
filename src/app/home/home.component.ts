import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(public fb: FormBuilder, private http: HttpClient) {}
  value1: string;
  public formGroup2: FormGroup;
  public formGroup3: FormGroup;
  public formGroup4: FormGroup;
  public formGroup5: FormGroup;
  public isSet: any = false;
  public listClassifica: any = [];
  ngOnInit() {
    this.formGroup2 = this.fb.group({
      id: [""],
    });
    this.formGroup3 = this.fb.group({
      id: [""],
    });
    this.formGroup4 = this.fb.group({
      id: [""],
    });
    this.formGroup5 = this.fb.group({
      idGara: [""],
      idCorridore: [""],
      tempo:[null]
    });
  }

  invia() {
    this.getClassifica(this.formGroup2.value["id"]).subscribe(
      (e) => {
        this.listClassifica = e.response;
      },
      (e2) => {
        window.alert("errore " + e2);
      }
    );
    this.isSet = true;
  }

  squalificaClick() {
    this.squalifica(this.formGroup3.value["id"]).subscribe(
      (e) => {
        window.alert("corridore squalificato correttamente");
      },
      (e2) => {
        window.alert("errore " + e2);
      }
    );
  }

  togliSqualificaClick() {

      this.togliSqualifica(this.formGroup4.value["id"]).subscribe(
        (e) => {
          window.alert("squalifica tolta correttamente");
        },
        (e2) => {
          window.alert("errore " + e2);
        }
      );
    
  }

  salvaTempo(){
    console.log(this.formGroup5.value)
    this.salva({tempo : this.formGroup5.value["tempo"] , corridore:  this.formGroup5.value["idCorridore"] , gara: this.formGroup5.value["idGara"]}).subscribe((e)=>{
      window.alert(e.message);
    },(e2) => {
      window.alert("errore " + e2);
    })
  }

  public getClassifica(path: string): Observable<any> {
    return this.http.get("https://testdeploypanarotto.azurewebsites.net/api/tempo/classifica/" + path);
  }

  public squalifica(path: string): Observable<any> {
    return this.http.get("https://testdeploypanarotto.azurewebsites.net/api/tempo/squalifica/" + path);
  }

  public togliSqualifica(path: string): Observable<any> {
    return this.http.get(
      "https://testdeploypanarotto.azurewebsites.net/api/tempo/togliSqualifica/" + path
    );
  }

  public salva(body:any): Observable<any> {
    return this.http.post(
      "https://testdeploypanarotto.azurewebsites.net/api/tempo/GARA/" , body
    );
  }
}
