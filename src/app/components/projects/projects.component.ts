import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {

  projects: Array<Project> = [];
  public url: string = Global.url;

  constructor(
    private _projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {

    this._projectService.getProjects().subscribe(
      response => {
       
        if (response) {
          this.projects = response;
          console.log(this.projects);
          return this.projects;
        }else{
          return undefined;
        };
      }
      ,
      error => console.log(error)
    );

  }  

}
