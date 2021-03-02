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

  constructor(
    private _projectService: ProjectService
  ) { }

  ngOnInit(): void {
    console.log(this.getProjects());
  }

  getProjects() {
    this._projectService.getProjects().subscribe(
      response=>console.log(response),
      error=> console.log(error)
    );
  }

}
