import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { studentdata } from './student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  studentmodel:studentdata=new studentdata

  showadd!:boolean;
  showupdate!:boolean;
  formValue!:FormGroup;
  allstudentdata:any;
  constructor(private formBuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      mobile:['',Validators.required],
      city:['',Validators.required]
    })
    this.getdata();
  }

  add(){
    this.showadd = true;
    this.showupdate = false;
  }
  edit(data:any){
    this.showadd = false;
    this.showupdate = true;
    this.studentmodel.id = data.id;

    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['city'].setValue(data.city);
  }

  update(){
    this.studentmodel.name = this.formValue.value.name;
    this.studentmodel.email = this.formValue.value.email;
    this.studentmodel.mobile = this.formValue.value.mobile;
    this.studentmodel.city = this.formValue.value.city;

    this.api.updatestudent(this.studentmodel,this.studentmodel.id).subscribe(
      res=>{
        this.formValue.reset();
        this.getdata();
        alert("Record updated successfully!");
      },
      err=>{
        alert("something went wrong");
      }
    )
  }

  addstudent(){
    this.studentmodel.name = this.formValue.value.name;
    this.studentmodel.email = this.formValue.value.email;
    this.studentmodel.mobile = this.formValue.value.mobile;
    this.studentmodel.city = this.formValue.value.city;

    this.api.poststudent(this.studentmodel).subscribe(res=>{
      console.log(res)
      this.formValue.reset()
      this.getdata();
      alert("record add success");
    },
    err=>{
      alert("something went wrong!!!");
    }
    )
  }

  getdata(){
    this.api.getstudent()
    .subscribe(res=>{
      this.allstudentdata = res;
    })
  }

  deletestud(data:any){
    if(confirm('Are you sure to delete?'))
    this.api.deletestudent(data.id)
    .subscribe(res=>{
      alert("Record deleted successfully");
      this.getdata();
    })
  }

}
